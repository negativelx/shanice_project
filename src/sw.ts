import { addPlugins, precacheAndRoute } from "workbox-precaching";
import { getAppEnvConfig } from "@/service/Env";
import { EnvTypes, ObjectWithType } from "@/types";

declare const clients: Clients, self: ServiceWorkerGlobalScope;

let precacheCount: number = 0;
const appEnv: EnvTypes = getAppEnvConfig(),
    manifest = self.__WB_MANIFEST,
    postMessage = (type: string, data: any = undefined) => {
        const message = {
            type: type.toUpperCase(),
            timestamp: Date.now(),
            data,
        };
        return self.skipWaiting()
            .then(() => clients.matchAll({ type: "window", includeUncontrolled: true }))
            .then((windowClients: WindowClient[]) => {
                try {
                    windowClients.forEach((client: WindowClient) => {
                        client.postMessage(message);
                    });
                } catch (e) {
                }
                return Promise.resolve();
            });
    }, clearCache = () => {
        return caches.keys()
            .then((cacheNames: string[]) => Promise.all(cacheNames.map((cacheName: string) => caches.delete(cacheName))))
            .then(() => postMessage("PAGE_RELOAD"))
            .then(() => self.registration.unregister());
    }, handleMessage = (payload: ObjectWithType<any>, defaultType: string = "UNKNOWN") => {
        if (payload) {
            const { type = defaultType.toUpperCase() } = payload;
            switch (type) {
                case "CACHE_CLEAR":
                    return clearCache();

                case "NOTIFICATION_SHOW":
                    const { title, options } = payload;
                    return postMessage(type, payload).then(() => self.registration.showNotification(title, options));

                default:
                    return postMessage(type, payload);
            }
        } else
            return Promise.resolve();
        //@ts-ignore
    }, handlerDidComplete = ({ request, error, event }) => {
        if (event.type === "install") {
            if (error)
                return postMessage("PRECACHE_ERROR", { url: request.url, error: error });
            else {
                precacheCount++;
                if (precacheCount >= manifest.length)
                    return postMessage("PRECACHE_COMPLETE", { total: manifest.length });
                else
                    return postMessage("PRECACHE_LOADING", {
                        total: manifest.length,
                        current: precacheCount,
                        url: request.url,
                        base: request.base,
                    });
            }
        } else {
            return Promise.resolve(null);
        }
    };

self["__WB_DISABLE_DEV_LOGS"] = !appEnv.DEBUG_MODE;
addPlugins([{ handlerDidComplete }]);
precacheAndRoute(manifest);

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

//Message event
self.addEventListener("message", (event: ExtendableMessageEvent) => {
    if (event.data)
        event.waitUntil(handleMessage(event.data, "CACHE_CLEAR"));
});

//Push event
self.addEventListener("push", (event: PushEvent) => {
    if (event.data)
        event.waitUntil(handleMessage(event.data.json(), "NOTIFICATION_SHOW"));
});

//Notification click event
self.addEventListener("notificationclick", (event) => {

    let targetUrl: string | URL = "";
    if (event.notification.data) {
        if (event.action && event.notification.data.urls && event.notification.data.urls[event.action])
            targetUrl = event.notification.data.urls[event.action];
        else if (event.notification.data.defaultUrl)
            targetUrl = event.notification.data.defaultUrl;
    }

    if (!targetUrl || typeof targetUrl !== "string")
        return;

    let targetHostname;
    try {
        targetHostname = new URL(targetUrl).hostname;
    } catch (error) {
        return;
    }

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((windowClients) => {
                for (const client of windowClients) {
                    let clientHostname;
                    try {
                        clientHostname = new URL(client.url).hostname;
                    } catch (error) {
                        continue;
                    }
                    if (clientHostname === targetHostname && "focus" in client)
                        return client.focus();
                }

                if (clients.openWindow)
                    return clients.openWindow(targetUrl).catch();
            }).then(() => {
            event.notification.close();
            return Promise.resolve();
        }));
});


export {};
