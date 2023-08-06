import {EnvTypes, ObjectWithType} from "@/types";

const appName: string = 'WELLOUS_MEMBERSHIP',
    appVersion: string = '1.0.28';

export function getAppEnvConfig(): EnvTypes {
    let Env: ObjectWithType<any> = {};
    Object.keys(import.meta.env).forEach((oriKey) => {
        const key = oriKey.replace('VITE_', '').toUpperCase();
        try {
            Env[key] = JSON.parse(import.meta.env[oriKey]);
        } catch (e) {
            Env[key] = import.meta.env[oriKey];
        }
    });
    Env.APP_NAME = appName;
    Env.APP_VERSION = appVersion;
    return <EnvTypes>Env;
}

export function isByPassRoute(name: string): boolean {
    console.log(name);
    const byPassRoute: string[] = [
        "Index",

        "Misc/Tnc",
        "Misc/TncWithBack",
        "Misc/Pnc",
        "Misc/PncWithBack",

        "Misc/AccessDenied",
        "Misc/Error",
        "Misc/NotFound",
        "Misc/ComingSoon",
        "Misc/Maintenance",

        "Auth",
        "Auth/Home",
        "Auth/SignIn",
        "Auth/Connect",
        "Auth/ForgetPass",
        "Auth/CreateNewPass",

        "Member/Post/Single"
    ];
    return byPassRoute.includes(name);
}