import { format } from "date-fns";
import losash from "lodash";
import { useI18n } from "vue-i18n";

class Utilities {
    public static getClassName(obj: any): string {
        return obj.constructor.name;
    }

    public static trim(string: string) {
        return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
    }

    public static genCode(length: number): string {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }

    public static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static randomColor(): string {
        return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    }

    public static randomColorRGB(): string {
        return `rgb(${this.randomInt(0, 255)}, ${this.randomInt(0, 255)}, ${this.randomInt(0, 255)})`;
    }

    public static randomColorRGBA(): string {
        return `rgba(${this.randomInt(0, 255)}, ${this.randomInt(0, 255)}, ${this.randomInt(
            0,
            255
        )}, ${this.randomFloat(0, 1)})`;
    }

    public static formatThousand(num: number): string {
        return num >= 1000 ? (Math.floor(num / 1000) + "k+") : num.toString();
    }

    public static formatNumber(num: number): string {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    public static formatNumberToStr(num: number, digits = 1): string {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "B" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        let item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";

    }

    public static formatCurrency(num: number): string {
        return "$" + this.formatNumber(num);
    }

    public static formatPercentage(num: number): string {
        return this.formatNumber(num) + "%";
    }

    public static formatTime(time: number): string {
        return new Date(time).toLocaleString();
    }

    public static formatDate(date: number | Date, formatStr = "YYYY-MM-DD"): string {
        return format(date, formatStr);
    }

    public static formatDateTime(date: number | Date, formatStr = "YYYY-MM-DD HH:mm"): string {
        return format(date, formatStr);
    }

    public static convertDate(str: string | null): string | null {
        if (str) {
            const { t, locale } = useI18n();
            let d = new Date(str);
            let today = new Date();
            let yesterday = new Date(today.getTime() - (86400 * 1000));
            if (d.toDateString() === today.toDateString()) {
                return t("Today");
            } else if (d.toDateString() === yesterday.toDateString()) {
                return t("Yesterday");
            } else {
                if (locale.value === "cn")
                    return Utilities.formatDate(d, "yyyy年M月d日");
                return d.toLocaleString("default", { month: "long" }) + Utilities.formatDate(d, " dd, yyyy");
            }
        } else {
            return str;
        }
    }

    public static convertYearMonthInLang(str: string): string {
        const { t } = useI18n();
        let d = new Date(str);
        return t("Year {year} " + Utilities.formatDate(d, "MMM") + " Format", { year: Utilities.formatDate(d, "yyyy") });
    }

    public static convertDateInLang(str: string, lang: string): string {
        const { t } = useI18n();
        let d = new Date(str);
        if (lang === "cn") {
            return t("Year {year} " + Utilities.formatDate(d, "MMM") + " Format", { year: Utilities.formatDate(d, "yyyy") }) + Utilities.formatDate(d, " dd ") + t("Day");
        } else {
            return d.toLocaleString("default", { month: "long" }) + Utilities.formatDate(d, " dd, yyyy");
        }
    }

    public static pluralize(time: number, label: string): string {
        if (time === 1) return time + label;
        return time + label + "s";
    }

    public static timeAgo(time: number): string {
        const between = Date.now() / 1000 - Number(time);
        if (between < 3600) {
            return this.pluralize(~~(between / 60), " minute");
        } else if (between < 86400) {
            return this.pluralize(~~(between / 3600), " hour");
        } else {
            return this.pluralize(~~(between / 86400), " day");
        }
    }

    public static getQueryStrings(): any {
        const url = window.location.href;
        const index = url.indexOf("?");
        const queryStr = url.substring(index + 1);
        const queryArr = queryStr.split("&");
        const queryObj: any = {};
        for (let i = 0; i < queryArr.length; i++) {
            const item = queryArr[ i ];
            const arr = item.split("=");
            queryObj[ arr[ 0 ] ] = arr[ 1 ];
        }
        return queryObj;
    }

    public static getQueryString(key: string): string {
        return this.getQueryStrings()[ key ];
    }

    public static getQueryInt(key: string): number {
        return parseInt(this.getQueryString(key));
    }

    public static getQueryFloat(key: string): number {
        return parseFloat(this.getQueryString(key));
    }

    public static getQueryBool(key: string): boolean {
        return this.getQueryString(key) === "true";
    }

    public static getQueryDate(key: string): Date {
        return new Date(this.getQueryString(key));
    }

    public static getQueryDateTime(key: string): Date {
        return new Date(this.getQueryString(key));
    }

    public static getQueryTime(key: string): Date {
        return new Date(this.getQueryString(key));
    }

    public static getCookie(name: string): string | null {
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        const arr = document.cookie.match(reg);
        if (arr) return decodeURIComponent(arr[ 2 ]);
        return null;
    }

    public static setCookie(name: string, value: string, expires: number): void {
        const date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString();
    }

    public static delCookie(name: string): void {
        document.cookie = name + "=;expires=" + new Date(0).toUTCString();
    }

    public static getLocalStorage(name: string, defaultValue: any = null): string | null {
        return localStorage.getItem(name) ?? defaultValue;
    }

    public static getLocalStorageObject(name: string, defaultValue: any = null): any {
        return JSON.parse(<string>localStorage.getItem(name) ?? "null") ?? defaultValue;
    }

    public static setLocalStorage(name: string, value: string): void {
        localStorage.setItem(name, value);
    }

    public static setLocalStorageObject(name: string, value: any): void {
        localStorage.setItem(name, <string>JSON.stringify(value));
    }

    public static delLocalStorage(name: string): void {
        localStorage.removeItem(name);
    }

    public static clearLocalStorage(): void {
        localStorage.clear();
    }

    public static getSessionStorage(name: string, defaultValue: any = null): string | null {
        return sessionStorage.getItem(name) ?? defaultValue;
    }

    public static getSessionStorageObject(name: string, defaultValue: any = null): any {
        return JSON.parse(<string>sessionStorage.getItem(name) ?? "null") ?? defaultValue;
    }

    public static setSessionStorage(name: string, value: string): void {
        sessionStorage.setItem(name, value);
    }

    public static setSessionStorageObject(name: string, value: any): void {
        sessionStorage.setItem(name, <string>JSON.stringify(value));
    }

    public static delSessionStorage(name: string): void {
        sessionStorage.removeItem(name);
    }

    public static clearSessionStorage(): void {
        sessionStorage.clear();
    }

    public static isEmpty(value: any): boolean {
        return value === null || value === undefined || value === "";
    }

    public static isRefEmpty(value: any): boolean {
        for (let key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                return false;
            }
        }
        return true;
    }

    public static isEmail(email: string): boolean {
        const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(email);
    }

    public static isMobile(): boolean {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    }

    public static isPC(): boolean {
        return !this.isMobile();
    }

    private static is(val: unknown, type: string) {
        return Object.prototype.toString.call(val) === `[object ${type}]`;
    }

    public static isFunction<T = Function>(val: unknown): val is T {
        return Utilities.is(val, "Function") || Utilities.is(val, "AsyncFunction");
    }

    public static isDefined<T = unknown>(val?: T): val is T {
        return typeof val !== "undefined";
    }

    public static isUndefined<T = unknown>(val?: T): val is T {
        return !Utilities.isDefined(val);
    }

    public static isObject(val: any): val is Record<any, any> {
        return val !== null && Utilities.is(val, "Object");
    }

    public static isDate(val: unknown): val is Date {
        return Utilities.is(val, "Date");
    }

    public static isNumber(val: unknown): val is number {
        return Utilities.is(val, "Number");
    }

    public static isAsyncFunction<T = any>(val: unknown): val is () => Promise<T> {
        return Utilities.is(val, "AsyncFunction");
    }

    public static isPromise<T = any>(val: unknown): val is Promise<T> {
        return (
            Utilities.is(val, "Promise") &&
            Utilities.isObject(val) &&
            Utilities.isFunction(val.then) &&
            Utilities.isFunction(val.catch)
        );
    }

    public static isString(val: unknown): val is string {
        return Utilities.is(val, "String");
    }

    public static isBoolean(val: unknown): val is boolean {
        return Utilities.is(val, "Boolean");
    }

    public static isArray(val: any): val is Array<any> {
        return val && Array.isArray(val);
    }

    public static isElement(val: unknown): val is Element {
        return Utilities.isObject(val) && !!val.tagName;
    }

    public static isNull(val: unknown): val is null {
        return val === null;
    }

    public static hasWindow(val: any): val is Window {
        return typeof window !== "undefined" && Utilities.is(val, "Window");
    }

    public static buildQuery(baseUrl: string, obj: object): string {
        let parameters = "";
        let url;
        for (const key in obj) {
            parameters += key + "=" + encodeURIComponent(obj[ key ]) + "&";
        }
        parameters = parameters.replace(/&$/, "");
        if (/\?$/.test(baseUrl)) {
            url = baseUrl + parameters;
        } else {
            url = baseUrl.replace(/\/?$/, "?") + parameters;
        }
        return url;
    }

    public static downloadFile({
                                   url,
                                   target = "_blank",
                                   fileName
                               }: {
        url: string;
        target?: "_self" | "_blank";
        fileName?: string;
    }): Promise<boolean> {
        const isSameOrigin = new URL(url).origin == location.origin;
        return new Promise<boolean>((resolve, reject) => {
            if (isSameOrigin) {
                const link = document.createElement("a");
                link.href = url;
                link.target = target;

                if (link.download !== undefined) {
                    link.download =
                        fileName ||
                        ((url) => {
                            const num = url.lastIndexOf("/") + 1;
                            let fileName = url.substring(num);
                            fileName = decodeURI(fileName.split("?")[ 0 ]);
                            return fileName;
                        })(url);
                }

                if (link.dispatchEvent) {
                    const mouseEvents = new Event("MouseEvents", { bubbles: true, cancelable: false });
                    link.dispatchEvent(mouseEvents);
                    return resolve(true);
                }

                if (url.indexOf("?") === -1) {
                    url += "?download";
                }

                window.open(url, target);
                return resolve(true);
            } else {
                const canvas = document.createElement("canvas");
                const img = document.createElement("img");
                img.setAttribute("crossOrigin", "Anonymous");
                img.src = url;
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const context = canvas.getContext("2d")!;
                    context.drawImage(img, 0, 0, img.width, img.height);
                    canvas.toBlob((blob) => {
                        const link = document.createElement("a");
                        if (blob !== null) {
                            link.href = window.URL.createObjectURL(blob);
                            link.download = Utilities.getFileName(url);
                            link.click();
                            URL.revokeObjectURL(link.href);
                            resolve(true);
                        } else reject(false);
                    }, "image/png");
                };
                img.onerror = (e) => reject(e);
            }
        });
    }

    public static getFileName(url) {
        const num = url.lastIndexOf("/") + 1;
        let fileName = url.substring(num);
        fileName = decodeURI(fileName.split("?")[ 0 ]);
        return fileName;
    }

    public static clone(val) {
        return losash.clone(val);
    }

    public static cloneDeep(val) {
        return losash.cloneDeep(val);
    }

    public static getObjectKey(val, key) {
        return losash.get(val, key);
    }

    public static debounce(fn, wait, options) {
        return losash.debounce(fn, wait, options);
    }

    public static throttle(fn, wait, options) {
        return losash.throttle(fn, wait, options);
    }

    public static ucFirst(content: String): string {
        return content.charAt(0).toUpperCase() + content.slice(1);
    }

    public static urlify(text, target = "_blank") {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return "<a href=\"" + url + "\" target=\"" + target + "\">" + url + "</a>";
        });
    }

    public static invertColor(hex, bw = false) {
        if (hex.indexOf("#") === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ];
        }
        if (hex.length !== 6) {
            throw new Error("Invalid HEX color.");
        }
        let r: string | number = parseInt(hex.slice(0, 2), 16),
            g: string | number = parseInt(hex.slice(2, 4), 16),
            b: string | number = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? "#000000"
                : "#FFFFFF";
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }

    public static padZero(str, len = 2) {
        const zeros = new Array(len).join("0");
        return (zeros + str).slice(-len);
    }

    public static compareVersion(version1: string, version2: string) {
        const v1Parts = version1.split("."),
            v2Parts = version2.split(".");
        let longestLength: number = Math.max(v1Parts.length, v2Parts.length);

        for (let i = 0; i < longestLength; i++) {
            let v1Part = Number(v1Parts[ i ] || 0),
                v2Part = Number(v2Parts[ i ] || 0);
            if (v1Part < v2Part)
                return -1;
            else if (v1Part > v2Part)
                return 1;
        }
        return 0;
    }

    public static bytesToFormatSize(bytes){
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    public static loadScript(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                resolve();
            };

            script.onerror = (error) => {
                reject(error);
            };

            document.head.appendChild(script);
        });
    }

    public static mosaicEmail(email: string, visibleChars: number = 3): string {
        const atSymbolIndex = email.indexOf('@');
        if (atSymbolIndex === -1) {
            // Invalid email, return the original email
            return email;
        }

        const username = email.substring(0, atSymbolIndex);
        const visibleUsername = username.substring(0, visibleChars);
        const mosaicUsername = '*'.repeat(6);

        const domain = email.substring(atSymbolIndex + 1);

        return `${visibleUsername}${mosaicUsername}@${domain}`;
    }

    public static shortenFileName(fileName: string, desiredLength: number) {
        const extension = fileName.split('.').pop(); // Get the file extension
        const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.')); // Get the file name without the extension

        if (fileNameWithoutExtension.length > desiredLength) {
            // Shorten the file name and append the extension
            return `${fileNameWithoutExtension.substring(0, desiredLength)}... (.${extension})`;
        } else {
            // Return the original file name
            return fileName;
        }
    }
}

export default Utilities;
