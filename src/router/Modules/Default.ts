import {RouteRecordRaw} from "vue-router";

export const DefaultRoute: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Index",
        meta: {
            emptyLayout: true
        },
        component: () => import("@/views/Page/Index.vue")
    },
    {
        path: "/tnc",
        name: "Misc/Tnc",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        props: route => ({showBack: Boolean(route.params.showBack ?? false)}),
        component: () => import("@/views/Page/Misc/Tnc.vue")
    },
    {
        path: "/tnc",
        name: "Misc/TncWithBack",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true,
            showBack: true
        },
        props: route => ({showBack: Boolean(route.params.showBack ?? false)}),
        component: () => import("@/views/Page/Misc/Tnc.vue")
    },
    {
        path: "/policy",
        name: "Misc/Pnc",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/Pnc.vue")
    },
    {
        path: "/policy",
        name: "Misc/PncWithBack",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true,
            showBack: true
        },
        component: () => import("@/views/Page/Misc/Pnc.vue")
    },
    {
        path: "/product-distribution",
        name: "Public/ProductDistribution",
        meta: {
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Public/ProductDistribution.vue")
    },
    {
        path: "/:catchAll(.*)", // 匹配任何未定义的路由
        redirect: "/"
    }
];
