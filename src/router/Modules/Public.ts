import {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/product-distribution",
        name: "Public/ProductDistribution",
        meta: {
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Public/ProductDistribution.vue")
    },
    {
        path: "/product-distribution2",
        name: "Public/ProductDistribution2",
        meta: {
            isLogoMiddle: true
        },
        component: () => import("@/views/Page/Public/ProductDistribution2.vue")
    },
];
export default routes;