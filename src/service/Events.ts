import Emitter from "@/service/Emitter";
import { MessageType } from "@/types";
import { Router } from "vue-router";
import Utilities from "@/service/Utilities";

const pendingMessages: Set<MessageType> = new Set();
let sw: ServiceWorker | null = null, sendTimeOut: number | null = null;

export default function registerEvent() {

    Emitter.once("router:ready", (router: Router) => {
        if (router.currentRoute.value.query.ref) {
            const referralCode = <string>router.currentRoute.value.query.ref;
            Utilities.setSessionStorage("referral_code", <string>referralCode);
            Utilities.setLocalStorage("last_referral_code", <string>referralCode);
        }
    });
    Emitter.on("navigator:message", (payload: MessageType) => {
        const { type = "" } = payload;
        switch (type) {
            case "PAGE_RELOAD":
                location.reload();
                break;
            case "PRECACHE_LOADING":
                Emitter.emit("precache:loading", payload);
                break;
            case "PRECACHE_COMPLETE":
                Emitter.emit("precache:complete");
                break;
        }
    });

    Emitter.on("navigator:sendMessage", (type: string, data: any) => {
        const message: MessageType = { type, timestamp: Date.now(), data };
        pendingMessages.add(message);
        sendMessage();
    });

    Emitter.on("interactive:scroll-to-top", () => {
        window.scrollTo(0, 0);
    });

    function sendMessage() {
        if (sendTimeOut) {
            clearTimeout(sendTimeOut);
            sendTimeOut = null;
        }
        if (pendingMessages.size > 0) {
            if (sw instanceof ServiceWorker) {
                pendingMessages.forEach((value) => {
                    sw?.postMessage(value);
                    pendingMessages.delete(value);
                });
            }
            if (pendingMessages.size > 0)
                //@ts-ignore
                sendTimeOut = setTimeout(sendMessage, 100);
            else if (sendTimeOut) {
                clearTimeout(sendTimeOut);
                sendTimeOut = null;
            }
        }
    }

    // Install prompt
    window.addEventListener("beforeinstallprompt", (e): void => {
        e.preventDefault();
        Emitter.emit("pwa:install", e);
    });

    //Window Resize
    window.addEventListener("resize", (e: UIEvent): void => {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        Emitter.emit("window:resize", { e, width, height });
    });

    //Document Click
    document.addEventListener("click", (e: MouseEvent): void => Emitter.emit("document:click", { e }));

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", (event: MessageEvent) => {
            if (event.data)
                Emitter.emit("navigator:message", event.data);
        });
        navigator.serviceWorker.ready.then((swRegistration) => {
            if (swRegistration.active) {
                sw = swRegistration.active;
                Emitter.emit("navigator.ready", sw);
            }
        });
    }
}
