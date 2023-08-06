<template>
    <!-- No any required -->
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/stores/LayoutStore";
import router from "@/router";
import Emitter from "@/service/Emitter";
import { useI18n } from "vue-i18n";
import { GlobalToastOptionsType } from "@/types";

const { t } = useI18n();

Emitter.emit("interactive:loading", true);

//route
router.isReady().then(() => {
    const hashParams = new URLSearchParams(window.location.hash !== "" ? window.location.hash.substring(1) : ""),
        action = hashParams.get("action");
    switch (action) {
        case "confirm":
            if (hashParams.has("platform") && hashParams.has("key"))
                useLayoutStore().urlHash = {
                    platform: String(hashParams.get("platform")),
                    hash: String(hashParams.get("key"))
                };
            goNext();
            break;

        case "login":
            // useMemberStore().loginByToken(String(hashParams.get("token")));
            break;

        case "register":
            router.push({ name: "Auth/SignUp" }).then(() => {
                Emitter.emit("route:params", {
                    platform: String(hashParams.get("platform") ?? ""),
                    open_id: String(hashParams.get("open_id")),
                    name: String(hashParams.get("name"))
                });
                Emitter.emit("interactive:loading", false);
            });
            break;

        case "error":
            const toastOptions: GlobalToastOptionsType = {
                severity: "warn",
                title: t("Notice"),
                messages: [t(hashParams.get("message") ?? hashParams.get("message") ?? "Error")],
                timeout: 3000,
                position: "bottom-center"
            };
            Emitter.emit("interactive:toast", toastOptions);
            goNext();
            break;

        default:
            goNext();
            break;
    }
});

function goNext() {
    return useLayoutStore().goHome().then(() => {
        Emitter.emit("interactive:loading", false);
    });
}
</script>
