<template>
    <div v-if="route.meta['isLogoMiddle']">
        <div class="layout-topbar justify-content-center card topbar-fixed topbar-border">
            <div class="layout-topbar-left">
                <a href="#" @click="onTopBarSubItemClick($event);layoutStore.goHome();" class="logo m-0">
                    <BrandLogo class="max-w-10rem w-full h-full" />
                    <Badge :value="sdlcState" severity="danger" class="vertical-align-top"
                           v-if="sdlcState !== ''"></Badge>
                </a>
            </div>
        </div>
    </div>
    <div v-else class="layout-topbar card topbar-fixed border-round-bottom-3xl topbar-border">
        <div class="layout-topbar-left">
            <a href="#" @click="onTopBarSubItemClick($event);layoutStore.goHome();" class="logo ml-2 md:ml-6">
                <BrandLogo class="max-w-10rem w-full h-full" />
                <Badge :value="sdlcState" severity="danger" class="vertical-align-top" v-if="sdlcState !== ''"></Badge>
            </a>
        </div>
        <Navbar />
    </div>
</template>

<script setup lang="ts">
import Badge from "primevue/badge";
import { useLayoutStore } from "@/stores/LayoutStore";
import Navbar from "@/views/Page/Layout/Components/Navbar.vue";
import { ref } from "vue";
import { getAppEnvConfig } from "@/service/Env";
import { useRoute } from "vue-router";

const
    appEnv = getAppEnvConfig(),
    layoutStore = useLayoutStore(),
    sdlcState = ref<string>(appEnv.SDLC_STATE),
    route = useRoute();

defineProps({
    colorScheme: String,
    topBarMenuActive: {
        type: Boolean,
        default: false
    }
});

function onTopBarSubItemClick(event) {
    event.preventDefault();
}
</script>

