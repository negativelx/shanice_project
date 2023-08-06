import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import FetchManager from "@/service/FetchManager";
import { getAppEnvConfig } from "@/service/Env";
import Emitter from "@/service/Emitter";
import Utilities from "@/service/Utilities";
import { ObjectWithType } from "@/types";
import { useLayoutStore } from "@/stores/LayoutStore";

export const useAppStore = defineStore("App", () => {
    const fetchManager: FetchManager = new FetchManager(),
        appEnv = getAppEnvConfig(),
        mobilePrefixList = ref(),
        topMenu = ref(),
        icRegex = ref(),
        appConfig = reactive({ loaded: false, data: {} }),
        countryList = ref();

    function getPermissions(): string[] {
        return [];
    }

    async function initConfig(): Promise<any> {
        if (appConfig.loaded)
            return appConfig;
        const referralCode = Utilities.getSessionStorage("referral_code", "");
        let params: ObjectWithType<string> = {};
        if (referralCode)
            params[ 'referral_code' ] = <string>Utilities.getSessionStorage("referral_code", "");
        return await fetchManager.jsonPost("member/initial", params).then((data) => {
            if (data.config)
                appConfig.data = data.config;

            if (data.topMenu) topMenu.value = data.topMenu || {};
            else topMenu.value = {};

            appConfig.loaded = true;
            if(appConfig.data["home_route"])
                useLayoutStore().homeRoute = appConfig.data["home_route"];
            useLayoutStore().initialize(data.config);
            if (Utilities.compareVersion(appConfig.data[ "version" ] || appEnv.APP_VERSION, appEnv.APP_VERSION) > 0) {
                Emitter.emit("interactive:loading", true);
                Emitter.emit("navigator:sendMessage", "CACHE_CLEAR");
            }
        });
    }

    async function initProfileData(): Promise<any> {
        return await fetchManager.jsonGet("member/profile/initData").then((data) => {
            mobilePrefixList.value = data.mobilePrefix;
            countryList.value = data.country;
            icRegex.value = data.icRegex;
            return data;
        });
    }

    function getIcRegex(country) {
        return icRegex.value[ country ];
    }

    function getConfig(name, defaultValue: any = null) {
        return appConfig.data[ name ] ?? defaultValue;
    }

    async function dealerAuthentication(params): Promise<any> {
        return await fetchManager.jsonGet("member/dealer/verify", params);
    }

    async function uploadMedia(param, onUploadProgress)
    {
        return  await fetchManager.post('member/uploadTempFile', param, {},  false, true, onUploadProgress);
    }

    const config = computed(() => {
        return appConfig.data;
    });

    return {
        config,
        getConfig,
        getPermissions,
        initProfileData,
        initConfig,
        getIcRegex,
        dealerAuthentication,
        topMenu,
        uploadMedia
    };
});
