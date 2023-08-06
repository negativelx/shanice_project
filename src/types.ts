import {ComponentPublicInstance, FunctionalComponent} from "vue";
import type {ToastProps} from "primevue/toast";
import {ToastMessageOptions} from "primevue/toast";

export interface MessageType {
    type: string,
    timestamp: number,
    data: any,
}

export interface GlobalToastOptionsType {
    severity?: ToastMessageOptions["severity"];
    messages: string[];
    title?: string;
    timeout?: number;
    position: ToastProps["position"];
    group?: string;
}

export interface NotificationAction {
    action: string;
    title: string;
    icon?: string;
}

export interface Notification {
    title: string;
    body: string;
    icon: string;
    image?: string;
    badge?: string;
    vibrate?: number[];
    sound?: string;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    tag?: string;
    renotify?: boolean;
    silent?: boolean;
    requireInteraction?: boolean;
    data?: any;
    actions?: NotificationAction[];
    click_action?: string;
}

export interface EnvTypes {
    SDLC_STATE: string;
    APP_NAME: string;
    APP_VERSION: string;
    DEBUG_MODE: boolean;
    COMING_SOON: boolean;
    MAINTENANCE: boolean;
    DEFAULT_LOCALE: string;
    API_URL: string;
    CDN_URL: string;
    TRACK_JS_SCR: string;
    GTAG_ID: string;
}

export interface PostItem {
    id: number;
    viewer: number;
    image: string;
    title: string;
    type: string;
    mediaType: string;
    link: string;
    author: string;
    date: string;
    content: string;
    hashtag: string[];
    category: string;
}

export interface ObjectWithType<T> {
    [key: string]: T
}

//@ts-ignore
declare module "*.vue" {
    import {DefineComponent} from "vue";
    const Component: DefineComponent<{}, {}, any>;
    export default Component;
}

//@ts-ignore
declare module "virtual:*" {
    const result: any;
    export default result;
}

declare module "vue" {
    export type JSXComponent<Props = any> =
        | { new(): ComponentPublicInstance<Props> }
        | FunctionalComponent<Props>;
}
