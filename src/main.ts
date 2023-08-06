import { App, createApp, h } from "vue";
import VueGtag from "vue-gtag";
import router from "./router";
import { setupStore } from "@/stores";
import { setupDirectives } from "@/plugins";
import { setupLocales } from "@/plugins";
import { registerSW } from "virtual:pwa-register";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import AppWrapper from "@/views/Page/Layout/Wrapper.vue";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";

import utilities from "@/service/Utilities";
import { getAppEnvConfig } from "@/service/Env";
import registerEvents from "@/service/Events";

async function bootstrap(): Promise<void> {
    const appEnv = getAppEnvConfig(), intervalMS: number = 3600 * 1000, registerSw1 = registerSW({
        onOfflineReady(): void {
            if (appEnv.DEBUG_MODE)
                console.log("offline ready");
        },
        onNeedRefresh(): void {
            location.reload();
        },
        onRegisterError(error): void {
            if (appEnv.DEBUG_MODE)
                console.log(error);
        },
        onRegisteredSW(swUrl: string, swRegistration): void {
            if (swRegistration) {
                setInterval(async (): Promise<void> => {
                    if (!(swRegistration.installing && navigator))
                        return;

                    if (("connection" in navigator) && !navigator.onLine)
                        return;

                    const resp: Response = await fetch(swUrl, {
                        cache: "no-store",
                        headers: {
                            "cache": "no-store",
                            "cache-control": "no-cache"
                        }
                    });

                    if (resp?.status === 200)
                        await swRegistration.update();
                }, intervalMS);
            }
        }
    }), render = () => h(AppWrapper), app: App<Element> = createApp({ render });

    app
        .use(setupStore)
        .use(setupLocales)
        .use(PrimeVue, { ripple: true })
        .use(ConfirmationService)
        .use(DialogService)
        .use(ToastService)
        .use(setupDirectives)
        .use(router);
    if (appEnv.GTAG_ID !== "")
        app.use(VueGtag, { config: { id: appEnv.GTAG_ID } }, router);
    app.mount("#app", true);

    registerEvents();

    await registerSw1();
    if (appEnv.TRACK_JS_SCR !== "")
        await utilities.loadScript(appEnv.TRACK_JS_SCR);
}

void bootstrap();
