import {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/accessdenied",
        name: "Misc/AccessDenied",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/AccessDenied.vue")
    },
    {
        path: "/error",
        name: "Misc/Error",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/Error.vue")
    },
    {
        path: "/nofound",
        name: "Misc/NotFound",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/NotFound.vue"),
    },
    {
        path: "/comingsoon",
        name: "Misc/ComingSoon",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/ComingSoon.vue"),
    },
    {
        path: "/maintenance",
        name: "Misc/Maintenance",
        meta: {
            emptyLayout: false,
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Misc/Maintenance.vue")
    },
];

export default routes;
