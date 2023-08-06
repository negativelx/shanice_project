<template>
  <div class="select-none" :class="layoutContainerClass" @click="onDocumentClick">
    <div class="layout-main" v-if="!route.meta['emptyLayout']">
      <TopBar
        :colorScheme="props.colorScheme"
        :topBarMenuActive="topBarMenuActive"
        @topbar-item-click="onTopBarItemClick"
      />
      <div class="layout-main-content md:mb-1 select-none" :class="{'mb-8': !route.meta['emptyFooter']}">
        <RouterView />
      </div>
    </div>
    <div style="margin: 0;padding: 0;" v-else>
      <TopBar
        v-if="route.meta['hasTopbar']"
        :colorScheme="props.colorScheme"
        :topBarMenuActive="topBarMenuActive"
        @topbar-item-click="onTopBarItemClick"
      />
      <RouterView />
    </div>
  </div>
  <DynamicDialog />
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from "vue";
import DynamicDialog from "primevue/dynamicdialog";
import TopBar from "@/views/Page/Layout/Components/Topbar.vue";
import router from "@/router";
import { useToast } from "primevue/usetoast";
import Emitter from "@/service/Emitter";
import { useRoute } from "vue-router";

const
    liveChat = ref(false),
    topBarMenuActive = ref(false),
    topBarItemClick = ref(false),
    staticMenuMobileActive = ref(false),
    props = defineProps<{
        colorScheme: string;
    }>(),
    route = useRoute(),
    layoutContainerClass = computed(() => {
        return [
            { "layout-wrapper": true },
            { "layout-horizontal": true },
            { "layout-mobile-active": staticMenuMobileActive.value }
        ];
    });

watch(
    () => router,
    () => {
        useToast().removeAllGroups();
    }
);

onMounted(() => {
    onWindowResize();
    Emitter.on("window:resize", onWindowResize);
});

function onWindowResize() {
    staticMenuMobileActive.value = isMobile();
}

function onDocumentClick() {
    if (!topBarItemClick.value)
        topBarMenuActive.value = false;
    topBarItemClick.value = false;
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 991;
}

function onTopBarItemClick(event) {
    topBarItemClick.value = true;
    topBarMenuActive.value = !topBarMenuActive.value;
    event.preventDefault();
}
</script>

<style scoped lang="scss">
.icon-livechat {
    bottom: 3rem;
    right: 2rem;
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    cursor: pointer;
    z-index: 1001;
}

@media screen and (max-width: 576px) {
    .icon-livechat {
        bottom: 6rem;
        right: 1rem;
    }
}

@keyframes floating {
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(0, 15px);
    }
    100% {
        transform: translate(0, -0);
    }
}
</style>
