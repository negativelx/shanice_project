import Utilities from "@/service/Utilities";
import {useMemberStore} from "@/stores/Member/Member";
import {computed} from "vue";
import { useLayoutStore } from "@/stores/LayoutStore";

class BiometricsAuth {

    private isBioSupport = false;
    private textEncoder = new TextEncoder();
    public isSupport = computed(() => {
        return this.isBioSupport;
    });

    constructor() {
        if (typeof (PublicKeyCredential) == "undefined")
            this.isBioSupport = false;
        else
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((result: boolean) => {
                this.isBioSupport = result;
            }).catch(() => {
                this.isBioSupport = false;
            });
    }

    arrayBufferToBase64(buffer) {
        let binary = "", bytes = new Uint8Array(buffer), len = bytes.byteLength;
        for (let i = 0; i < len; i++)
            binary += String.fromCharCode(bytes[i]);
        return window.btoa(binary);
    }

    base64ToArrayBuffer(base64) {
        const binary = window.atob(base64), length = binary.length, buffer = new ArrayBuffer(length);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < length; i++)
            view[i] = binary.charCodeAt(i);
        return buffer;
    }


    recursiveArrayBufferToBase64(obj) {
        let newObj = {};
        if (typeof obj === "object")
            for (let key in obj) {
                if (obj[key] instanceof ArrayBuffer) {
                    newObj[key] = this.arrayBufferToBase64(obj[key]);
                } else if (typeof (obj[key]) === "object") {
                    newObj[key] = this.recursiveArrayBufferToBase64(obj[key]);
                } else
                    newObj[key] = obj[key];
            }
        return newObj;
    }

    async register() {
        if (!this.isSupport || !useMemberStore().member.hasOwnProperty("email") || useMemberStore().member.email === "")
            return Promise.reject(new Error("Biometrics authentication is not supported"));
        const creationOptions: PublicKeyCredentialCreationOptions = {
            challenge: this.textEncoder.encode(Utilities.genCode(32)),
            rp: {
                id: window.location.hostname,
                name: `${Utilities.ucFirst(useLayoutStore().platform)} Membership`
            },
            user: {
                id: this.textEncoder.encode(Utilities.genCode(64)),
                name: useMemberStore().member.email,
                displayName: useMemberStore().member.name
            },
            pubKeyCredParams: [
                {alg: -7, type: "public-key"},
                {alg: -257, type: "public-key"}
            ],
            timeout: 60000,
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "preferred"
            },
            attestation: "none"
        };
        return navigator.credentials.create({publicKey: creationOptions}).then((credential: PublicKeyCredential) => {
            if (credential && (credential.id ?? "") !== "") {
                let newCredential = this.recursiveArrayBufferToBase64(credential);
                return Promise.resolve(newCredential);
            } else
                return Promise.reject(new Error("No credential data"));
        }).catch((err) => {
            return Promise.reject(err);
        });
    }

    async authenticate() {
        if (!this.isSupport || useMemberStore().biometricsId === '')
            return Promise.reject(new Error("Biometric authentication is not supported"));
        const authOptions: PublicKeyCredentialRequestOptions = {
            challenge: this.textEncoder.encode(Utilities.genCode(32)),
            rpId: window.location.hostname,
            userVerification: "preferred",
            allowCredentials: [
                {
                    transports: ["internal"],
                    type: "public-key",
                    id: this.base64ToArrayBuffer(useMemberStore().biometricsId), // actually provided by the server
                },
            ],
            timeout: 60000
        };
        return navigator.credentials.get({publicKey: authOptions}).then((credential: PublicKeyCredential) => {
            let newCredential = this.recursiveArrayBufferToBase64(credential);
            return Promise.resolve(newCredential);
        }).catch((err) => {
            return Promise.reject(err);
        });
    }
}

export default BiometricsAuth;
