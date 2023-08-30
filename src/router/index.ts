import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { DefaultRoute } from "@/router/Modules/Default";
import { getAppEnvConfig } from "@/service/Env";
import Emitter from "@/service/Emitter";

const modules = import.meta.globEager("./Modules/**/*.ts"), routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
    //@ts-ignore
    const mod = modules[key].default || {},
        modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

const constantRouter: any[] = [...DefaultRoute, ...routeModuleList],
    appEnv = getAppEnvConfig(),
    router = createRouter({
        history: createWebHashHistory(import.meta.env.BASE_URL),
        routes: constantRouter,
        strict: true,
        scrollBehavior: () => ({ left: 0, top: 0 })
    });

router.beforeEach((to, _from, next) => {
    console.log("router.beforeEach")
    if (appEnv.MAINTENANCE && to.name !== "Misc/Maintenance")
        next({ name: "Misc/Maintenance" });
    else if (appEnv.COMING_SOON && to.name !== "Misc/ComingSoon")
        next({ name: "Misc/ComingSoon" });
    next()
});

router.isReady().then(() => {
    Emitter.emit("router:ready", router);
});

export default router;
