import { reactive, computed, ref, Ref } from "vue";
import { defineStore } from "pinia";
import Emitter from "@/service/Emitter";
import { InstallPromptEvent } from "@/interface";
import { getAppEnvConfig } from "@/service/Env";
import router from "@/router";
import { ObjectWithType } from "@/types";
import { useI18n } from "vue-i18n";
import Utilities from "@/service/Utilities";

export const useLayoutStore = defineStore("layout", () => {

    const appEnv = getAppEnvConfig(),
        setting = reactive({
            ripple: "0",
            language: "en",
            theme: "blue",
            colorScheme: "blue",
            menuMode: "horizontal",
            componentTheme: "horizontal",
        }), data = reactive({
            urlHash: { platform: "", hash: "" },
            needInstall: ref<boolean>(false),
            installPromptEvent: ref<InstallPromptEvent | null>(null),
        }),
        platform = computed((): string => {
            if (location.hostname.includes("afyaa"))
                return "afyaa";
            else
                return "wellous";
        }),
        homeRouteData = ref({ name: "Member/Home" }),
        homeRoute = computed({
            get() {
                return useMemberStore().isLogin ? homeRouteData.value : { name: "Auth/Home" };
            },
            set(value) {
                if (value)
                    homeRouteData.value = value;
            },
        }),
        landingPageData = ref({}),
        languageList: Ref<string[]> = ref([]),
        availableLanguage = computed(() => {
            return languageList.value;
        }),
        themeList = computed(() => {
            return ["light", "dark"];
        }),
        { te } = useI18n();

    function initialize(config: ObjectWithType<any>) {
        if (config === undefined)
            config = {};
        languageList.value = config.available_language || [];
        if (!Array.isArray(languageList.value) || languageList.value.length === 0)
            languageList.value = ["en"];
        languageList.value = languageList.value.filter((item: string) => te(`language.${item}`, item));
        setting.language = localStorage.getItem("member_language") || (config.default_language || "en");
        setting.colorScheme = localStorage.getItem("member_colorScheme") || (config.colorScheme || "light");
        setting.theme = "blue";
        setting.colorScheme = "horizontal";
        setting.componentTheme = "blue";
        setting.menuMode = "horizontal";
        setting.ripple = "1";
        if (!availableLanguage.value.includes(setting.language))
            setting.language = "en";
        if (!themeList.value.includes(setting.colorScheme))
            setting.colorScheme = "light";

        Emitter.emit("change-language", setting.language);
    }

    function goHome() {
        return router.push(homeRoute.value);
    }

    function install() {
        if (installPromptEvent.value !== null) {
            installPromptEvent.value.prompt().then(r => {
                if (appEnv.DEBUG_MODE)
                    console.log(r);
            });
            installPromptEvent.value.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted")
                    installPromptEvent.value = null;
            });
        }
    }

    const theme = computed({
        get() {
            return setting.theme;
        },
        set(value) {
            if (themeList.value.includes(value)) {
                setting.theme = value;
                localStorage.setItem("member_theme", value);
            }
        },
    });

    const ripple = computed({
        get() {
            return setting.ripple === "1";
        },
        set(value) {
            setting.ripple = value ? "1" : "0";
            localStorage.setItem("member_ripple", value ? "1" : "0");
        },
    });

    const componentTheme = computed({
        get() {
            return setting.componentTheme;
        },
        set(value) {
            setting.componentTheme = value;
            localStorage.setItem("member_componentTheme", value);
        },
    });

    const colorScheme = computed({
        get() {
            return setting.colorScheme;
        },
        set(value) {
            setting.colorScheme = value;
            localStorage.setItem("member_colorScheme", value);
        },
    });

    const menuMode = computed({
        get() {
            return setting.menuMode;
        },
        set(value) {
            setting.menuMode = value;
            localStorage.setItem("member_menuMode", value);
        },
    });

    const language = computed({
        get() {
            return setting.language;
        },
        set(value) {
            if (availableLanguage.value.includes(value)) {
                setting.language = value;
                localStorage.setItem("member_language", value);
                Emitter.emit("change-language", setting.language);
            }
        },
    });

    const urlHash = computed({
        get() {
            return data.urlHash;
        },
        set(value) {
            data.urlHash = value;
        },
    });

    const needInstall = computed({
        get() {
            return data.needInstall;
        },
        set(value) {
            data.needInstall = Boolean(value);
        },
    });

    const installPromptEvent = computed({
        get() {
            return data.installPromptEvent;
        },
        set(value: InstallPromptEvent | null) {
            data.installPromptEvent = value;
        },
    });

    const landingPage = computed({
        get(){
            if (Utilities.isRefEmpty(landingPageData.value)) {
                let landingPageSession = localStorage.getItem("landing_page") ?? '';
                if (landingPageSession !== '')
                    landingPageData.value = JSON.parse(landingPageSession);
            }
            console.log(landingPageData.value, Utilities.isRefEmpty(landingPageData.value));
            return landingPageData.value;
        },
        set(value) {
            if (value) {
                landingPageData.value = value;
                localStorage.setItem("landing_page", JSON.stringify(value));
            }
        },
    });

    return {
        initialize,
        platform,
        setting,
        colorScheme,
        theme,
        componentTheme,
        ripple,
        menuMode,
        language,
        urlHash,
        needInstall,
        installPromptEvent,
        homeRoute,
        availableLanguage,
        goHome,
        install,
        landingPage
    };
});
