<template>
    <div class="layout-menu-wrapper">
        <div class="layout-menu-container flex flex-column align-items-center justify-content-center ">
            <ul role="menu" v-if="appStore.topMenu.length > 0"
                class="pl-0 menu-ul flex flex-row align-items-center justify-content-evenly w-full lg:w-6 xl:w-5 mb-2 navbar-height">
                <li role="menuitem"
                    v-for="item in appStore.topMenu"
                    @mouseover="item.to!== '' ? onMouseEnterMenu(item.to) : ''"
                    @mouseout="item.to!== '' ? onMouseOutMenu(router.currentRoute.value.name) : ''"
                    @click="item.to!== '' ? activateMenu(item.to) : ''">
                    <router-link v-if="item.to !== ''" :to="{name: item.to}" exact v-ripple>
                        <div class="flex flex-column align-items-center justify-content-center white-space-nowrap w-4rem md:w-5rem pt-2 relative">
                            <div :class="iconColor[item.to] === '#3BB34A' ? 'active-bg' : 'hover-bg'">
                                <component v-if="iconComponents[item.component]" :is="iconComponents[item.component]"
                                           :color="iconColor[item.to]"></component>
                            </div>
                            <span class="layout-menuitem-text menu-title absolute"
                                  :style="{color:iconColor[item.to],top:'40px'}">{{ t(item.title) }}</span>
                        </div>
                    </router-link>
                    <div v-if="item.to === ''"
                         class="flex flex-column align-items-center justify-content-center w-4rem md:w-5rem pt-2 relative">
                        <div :class="iconColor[item.to] === '#3BB34A' ? 'active-bg' : 'hover-bg'">
                            <component v-if="iconComponents[item.component]" :is="iconComponents[item.component]"
                                           :color="iconColor[item.to]"></component>
                        </div>
                        <span class="layout-menuitem-text menu-title absolute"
                              :style="{color:iconColor[item.to],top:'40px'}">{{ t(item.title) }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, watch} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router";
import { useLayoutStore } from "@/stores/LayoutStore";
import { useAppStore } from "@/stores/AppStore";

const {t} = useI18n(),
    coloring = {
        highlight: "#869D8A",
        active: "#3BB34A",
        inactive: "#869D8A"
    },
    homeName = useLayoutStore().homeRoute.name,
    appStore = useAppStore(),
    iconColor = reactive({
        homeName : coloring.inactive,
        "Member/Tier": coloring.inactive,
        "Member/Redeem": coloring.inactive,
        "Member/ProductReview": coloring.inactive,
        //taskIcon: '#869D8A',
        "": "#800"
    }),
    iconComponents = {

    };
    // menu = {
    //     dashboard: {
    //         title: "Home",
    //         name: "dashboardIcon",
    //         component: dashboardIcon,
    //         to: homeName
    //     },
    //     profile: {
    //         title: "Me",
    //         name: "profileIcon",
    //         component: profileIcon,
    //         to: "Member/Tier"
    //     },
    //     redeem: {
    //         title: "Redeem",
    //         name: "redeemIcon",
    //         component: redeemIcon,
    //         to: "Member/Redeem"
    //     },
    //     // task: {
    //     //     title: "Task",
    //     //     name: "taskIcon",
    //     //     component: taskIcon,
    //     //     to: ""
    //     // }
    // };

watch(
    () => router.currentRoute.value,
    () => {
        activateMenu(router.currentRoute.value.name);
    }
);
onMounted(() => {
    activateMenu(router.currentRoute.value.name);
});

function colorReset() {
    iconColor[homeName] = coloring.inactive;
    iconColor["Member/Tier"] = coloring.inactive;
    iconColor["Member/Redeem"] = coloring.inactive;
    iconColor["Member/ProductReview"] = coloring.inactive;
    iconColor[""] = coloring.inactive;
}

function activateMenu(target) {
    if (target === "")
        return;

    colorReset();
    if (!iconColor[target])
        return;
    iconColor[target] = coloring.active;
}

function onMouseEnterMenu(target) {
    if (target !== "" && iconColor[target] && target !== router.currentRoute.value.name)
        iconColor[target] = coloring.highlight;
}

function onMouseOutMenu(target) {
    if (target === "")
        return;

    colorReset();
    if (iconColor[target])
        iconColor[target] = coloring.active;
}


</script>
<style lang="scss">
.menu-title {
    line-height: 1rem;
    color: #869D8A;
    font-weight: 600;
    text-align: center;
}

.menu-ul {
    list-style-type: none;
    margin: 0;
}

.navbar-height {
    min-height: 4.5rem;
}
</style>
