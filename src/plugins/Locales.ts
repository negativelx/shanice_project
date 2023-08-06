import {App} from "vue";
import {createI18n} from "vue-i18n";
import Emitter from "@/service/Emitter";
import messages from "@intlify/unplugin-vue-i18n/messages";
import {getAppEnvConfig} from "@/service/Env";

const appEnv = getAppEnvConfig(),
    i18n = createI18n({
        locale: appEnv.DEFAULT_LOCALE,
        fallbackLocale: 'en',
        globalInjection: false,
        silentTranslationWarn: !appEnv.DEBUG_MODE, // 关闭警告信息
        messages
    }), setupLocales = {
        install(app: App) {
            app.use(i18n);
            Emitter.on("change-language", (lang) => {
                //@ts-ignore
                i18n.global.locale.value = lang;
            });
        }
    };

/**
 * 注册全局自定义指令
 * @param app
 */
export {setupLocales};
