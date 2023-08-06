<template>
    <BlockUI :blocked="blockedPanel" :fullScreen="true" @unblock="unblockUI">
        <div v-if="routeReady">
            <App :colorScheme="useLayoutStore().colorScheme"/>
            <div class="absolute loading-spinner" v-if="blockedPanel || !routeReady">
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
            </div>
        </div>
    </BlockUI>
    <ProgressBar :value="preLoaderPercent" :show-value="false" class="progress-load" v-if="preLoaderShow"/>
    <Toast :position="toastPosition"/>
</template>

<script lang="ts" setup>
import BlockUI from "primevue/blockui";
import ProgressBar from "primevue/progressbar";
import { onBeforeMount, ref } from "vue";
import App from "@/views/Page/Layout/Index.vue";

// noinspection ES6UnusedImports
import Toast from 'primevue/toast';
import type { ToastProps } from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Emitter from "@/service/Emitter";
import type { GlobalToastOptionsType, ObjectWithType } from "@/types";
import { useLayoutStore } from "@/stores/LayoutStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n(),
    toast = useToast(),
    toastPosition = ref<ToastProps["position"]>("bottom-right"),
    blockedPanel = ref(false), routeReady = ref(false),
    preLoaderPercent = ref<number>(0), preLoaderShow = ref<boolean>(false);

Emitter.once("router:ready", () => {
    routeReady.value = true;
});

Emitter.on("interactive:toast", (options: any) => {
    showToast(options);
});

Emitter.on("interactive:loading", (options: any) => {
    toggleLoadingSpinner(options);
});

Emitter.on("precache:loading", (payload: ObjectWithType<any>) => {
    if (preLoaderShow.value === false)
        preLoaderShow.value = true;
    preLoaderPercent.value = payload.data.current / payload.data.total * 100;
});

Emitter.on("precache:complete", () => {
    if (preLoaderShow.value === false)
        preLoaderShow.value = true;
    preLoaderPercent.value = 100;
    setTimeout(() => {
        preLoaderShow.value = false;
    }, 1000);
});

onBeforeMount(() => {
    Emitter.emit("change-language", useLayoutStore().language);
});

function toggleLoadingSpinner(options: any) {
    blockedPanel.value = options;
}

function unblockUI() {
    let block = document.getElementsByClassName("p-blockui");
    if (block.length > 0)
        for (let i = 0; i < block.length; i++)
            block[ i ].remove();
}

function showToast(toastOption: GlobalToastOptionsType) {
    if (!Array.isArray(toastOption.messages)) {
        if (toastOption.messages ?? "" !== "")
            toastOption.messages = new Array(toastOption.messages);
        else return;
    }
    toastPosition.value = toastOption.position ?? "bottom-right";
    toastOption.messages.forEach((message: string) => {
        toast.add({
            severity: toastOption.severity,
            summary: t(<string>toastOption.title, { silentTranslationWarn: true }),
            detail: t(<string>message, { silentTranslationWarn: true }),
            life: toastOption.timeout ?? 5000
        });
    });
}
</script>

<style scoped lang="scss">

.progress-load {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    width: 100vw;
    z-index: 1002;
}

.loading-spinner {
    top: 50vh;
    left: 50vw;
    z-index: 9999;
}

.spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;

    & .path {
        stroke: hsl(151, 69%, 55%);
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>
