import router from "@/router";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import Emitter from "@/service/Emitter";
import type { GlobalToastOptionsType } from "@/types";
import { ToastMessageOptions, ToastProps } from "primevue/toast";
import { getAppEnvConfig } from "./Env";
import { useLayoutStore } from "@/stores/LayoutStore";
import Utilities from "@/service/Utilities";
import { getDeviceId } from "@/service/DeviceId";

const appEnv = getAppEnvConfig(),
    loadingIndicateTime = 800,
    visitorCacheName = "_wm_visitorId";
let visitorId = localStorage.getItem(visitorCacheName) || "-";

class FetchManager {
    #defaultTimeout = 3000;

    static lastToastOption: GlobalToastOptionsType | null = null;

    #prepareOption(
        DeviceId,
        method: string,
        url: string | undefined,
        params: any,
        headers: any,
        onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined,
        onDownloadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined,
    ) {
        const options: AxiosRequestConfig = {
            baseURL: appEnv.API_URL,
            method,
            url,
            timeout: 100000,
            headers: {
                ...headers,
                ...{
                    "X-Requested-With": "XMLHttpRequest",
                    version: appEnv.APP_VERSION,
                    visitorId: visitorId,
                    DeviceId,
                    platform: useLayoutStore().platform,
                    Lang: useLayoutStore().language,
                },
            },
            onUploadProgress,
            onDownloadProgress,
            params,
        };
        return options;
    }

    #toastMessage(severity: ToastMessageOptions["severity"], title: string, messages: string[] | string, timeout?: number, pos?: ToastProps["position"]) {
        if (!Array.isArray(messages)) messages = new Array(messages);
        const toastOptions: GlobalToastOptionsType = {
            severity: severity,
            title: title,
            messages: messages,
            timeout: timeout ?? this.#defaultTimeout,
            position: pos ?? "bottom-center",
        };
        if (
            FetchManager.lastToastOption &&
            FetchManager.lastToastOption.severity === toastOptions.severity &&
            FetchManager.lastToastOption.title === toastOptions.title &&
            FetchManager.lastToastOption.timeout === toastOptions.timeout &&
            FetchManager.lastToastOption.position === toastOptions.position &&
            FetchManager.lastToastOption.messages.length === toastOptions.messages.length &&
            FetchManager.lastToastOption.messages.every((element, index) => element === toastOptions.messages[index])
        )
            return;
        FetchManager.lastToastOption = toastOptions;
        setTimeout(() => {
            FetchManager.lastToastOption = null;
        }, 1000);
        Emitter.emit("interactive:toast", toastOptions);
    }

    #toggleLoading(show: boolean): any {
        Emitter.emit("interactive:loading", show);
    }

    /**
     *
     * @param method
     * @param url
     * @param params
     * @param headers
     * @param resolve
     * @param showLoading
     * @param silent
     * @param onUploadProgress
     * @param onDownloadProgress
     * @private
     */
    #request(method: string, url: string | undefined, params: any, headers: any, resolve: any, showLoading: boolean = true, silent: boolean = false, onUploadProgress, onDownloadProgress) {
        let toggleLoading;
        if (showLoading) toggleLoading = setTimeout(() => this.#toggleLoading(true), loadingIndicateTime);
        return getDeviceId().then((deviceId) => {
            let configOption = this.#prepareOption(deviceId, method, url, method === "GET" || method === "HEAD" ? params : null, headers, onUploadProgress, onDownloadProgress);
            if ((method === "POST" || method === "PUT" || method === "PATCH") && params && (Object.keys(params).length > 0 || params instanceof FormData)) {
                let formData;
                if (params instanceof FormData) formData = params;
                else {
                    formData = new FormData();
                    Object.keys(params).forEach(key => formData.append(key, params[key]));
                }
                configOption.data = formData;
            }
            return this.#afterRequest(axios(configOption), resolve, showLoading, silent, toggleLoading);
        });
    }

    #jsonRequest(method: string, url: string, params: any, headers: any, resolve: any, showLoading: boolean = true, silent: boolean = false, onUploadProgress, onDownloadProgress) {
        let toggleLoading;
        if (showLoading) toggleLoading = setTimeout(() => this.#toggleLoading(true), loadingIndicateTime);

        getDeviceId().then((deviceId) => {
            let configOption = this.#prepareOption(deviceId, method, url, method === "GET" || method === "HEAD" ? params : null, headers, onUploadProgress, onDownloadProgress);
            if ((method === "POST" || method === "PUT" || method === "PATCH") && params && Object.keys(params).length > 0) {
                if (configOption.headers === undefined) configOption.headers = {};
                configOption.headers["Content-Type"] = "application/json";
                configOption.data = params;
            }
            return this.#afterRequest(axios(configOption), resolve, showLoading, silent, toggleLoading);
        });
    }

    #afterRequest = (promise, resolve, showLoading, silent, toggleLoading) => {
        return promise
            .then((response) => {
                if (showLoading) {
                    clearTimeout(toggleLoading);
                    this.#toggleLoading(false);
                }
                if ((visitorId = String(response.headers["visitorid"]))) localStorage.setItem(visitorCacheName, visitorId);
                return this.#responseHandler(response.data, response, resolve, silent);
            })
            .catch((error) => {
                if (showLoading) {
                    clearTimeout(toggleLoading);
                    this.#toggleLoading(false);
                }
                if (appEnv.DEBUG_MODE) console.log(error);
                if (error.response && error.response.data.status) {
                    return this.#responseHandler(error.response.data, error.response, resolve, silent);
                } else if (error.code && error.message) {
                    if (!silent) this.#errorHandle(toggleLoading, error);
                    return resolve(false);
                } else return this.#responseHandler(error, error.response, resolve, silent);
            });
    };

    #errorHandle = (toggleLoading, error) => {
        clearTimeout(toggleLoading);
        this.#toggleLoading(false);
        this.#toastMessage(
            error.severity ?? "warn",
            error.title ?? "Network Error",
            ["Please check your connection and try again."],
            error.timeout ?? this.#defaultTimeout,
            error.position ?? "bottom-center",
        );
    };

    #isRoute(value) {
        if (typeof value === "string" && value.trim().length !== 0) return true;
        else return typeof value === "object" && value !== null && Object.keys(value).length !== 0 && value.hasOwnProperty("name");
    }

    #responseHandler = (result, response: Response, resolve: Function, silent: boolean) => {
        if (this.#isRoute(result.route)) {
            const delay = parseInt(result.route.delay, 10);
            setTimeout(
                async () => {
                    return router.push(result.route).then(() => {
                        if ((result.route.name || result.route.path) && result.route.params && Object.keys(result.route.params).length > 0 && Object.keys(result.route.params).length > 0)
                            Emitter.emit("route:params", result.route.name || result.route.path, result.route.params || {});
                    });
                },
                isNaN(delay) || delay <= 0 ? 0 : delay,
            );
        }
        let position = "top-right", responseData = null;
        if (typeof result.data !== "undefined") responseData = result.data;
        switch (result.status) {
            case "warn":
            case "warning":
            case "success":
            case "info": {
                switch (result.status) {
                    case "warning":
                        position = "bottom-left";
                        break;
                    case "success":
                        position = "bottom-right";
                        break;
                    default:
                        position = "top-right";
                        break;
                }
                this.#sendToastMessage(result.status, result.title ?? result.status, silent, result, response, position);
                resolve(responseData ?? true);
            }
                break;
            case "login": {
                // return useMemberStore()
                //     .logout(true)
                //     .then(() => useLayoutStore().goHome())
                //     .then(() => {
                //         this.#sendToastMessage("warn", result.title ?? "Session Expired", silent, result, response, "bottom-center");
                //     });
            }
            case "comingsoon": {
                router.push({ name: "Misc/ComingSoon" }).then(() => {
                    this.#sendToastMessage("warn", result.title ?? "Coming Soon", silent, result, response, "bottom-center");
                });
                resolve(responseData ?? false);
                break;
            }
            case "maintenance": {
                router.push({ name: "Misc/Maintenance" }).then(() => {
                    this.#sendToastMessage("warn", result.title ?? "Maintenance", silent, result, response, "bottom-center");
                });
                resolve(responseData ?? false);
                break;
            }
            case "error": {
                this.#sendToastMessage("error", result.title ?? "Error", silent, result, response, "bottom-center");
                resolve(responseData ?? false);
                break;
            }
            default: {
                resolve(responseData ?? false);
                Emitter.emit(`fetch:${result.status}`, responseData ?? false);
                break;
            }
        }
    };

    #sendToastMessage(type, name, silent, result, response, defaultPosition) {
        if (!silent) {
            if (!Array.isArray(result.messages)) result.messages = [];
            if (result.messages.length <= 0) {
                if ((result.message ?? "") !== "") result.messages.push(result.message);
                else if (type === "error") result.messages.push(response.statusText ?? "Sorry, we encountered an error while processing your request.");
            }
            if (result.messages.length > 0)
                result.messages.forEach((message) => {
                    this.#toastMessage(type, Utilities.ucFirst(result.title ?? name), <string>message, result.timeout ?? this.#defaultTimeout, result.position ?? defaultPosition);
                });
        }
    }

    jsonPost(url: string, params?: object, headers?: object, showLoading: boolean = true, silent: boolean = false, onUploadProgress = undefined, onDownloadProgress = undefined): Promise<any> {
        return new Promise((resolve) => {
            return this.#jsonRequest("POST", url, params, headers, resolve, showLoading, silent, onUploadProgress, onDownloadProgress);
        }).catch((error) => {
            if (appEnv.DEBUG_MODE) console.log(error);
        });
    }

    jsonGet(url: string, params?: object, headers?: object, showLoading: boolean = true, silent: boolean = false, onUploadProgress = undefined, onDownloadProgress = undefined): Promise<any> {
        return new Promise((resolve) => {
            return this.#jsonRequest("GET", url, params, headers, resolve, showLoading, silent, onUploadProgress, onDownloadProgress);
        }).catch((error) => {
            if (appEnv.DEBUG_MODE) console.log(error);
        });
    }

    post(url: string, params?: object, headers?: object, showLoading: boolean = true, silent: boolean = false, onUploadProgress = undefined, onDownloadProgress = undefined): Promise<any> {
        return new Promise((resolve) => {
            return this.#request("POST", url, params, headers, resolve, showLoading, silent, onUploadProgress, onDownloadProgress);
        }).catch((error) => {
            if (appEnv.DEBUG_MODE) console.log(error);
        });
    }

    get(url: string, params?: object, headers?: object, showLoading: boolean = true, silent: boolean = false, onUploadProgress = undefined, onDownloadProgress = undefined): Promise<any> {
        return new Promise((resolve) => {
            return this.#request("GET", appEnv.API_URL + url, params, headers, resolve, showLoading, silent, onUploadProgress, onDownloadProgress);
        }).catch((error) => {
            if (appEnv.DEBUG_MODE) console.log(error);
        });
    }
}

export default FetchManager;
