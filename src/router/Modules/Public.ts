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
];
export default routes;