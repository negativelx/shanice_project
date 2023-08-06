import { getAppEnvConfig } from "@/service/Env";

class DeviceId {

    private readonly fontList: string[] = ["monospace", "sans-serif", "serif", "Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono",
        "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia",
        "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode",
        "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype",
        "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2",
        "Wingdings 3", "Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT",
        "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting",
        "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang",
        "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD",
        "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand",
        "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur",
        "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT",
        "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone",
        "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant",
        "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong",
        "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER",
        "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT",
        "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM",
        "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington",
        "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow",
        "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC",
        "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script",
        "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold",
        "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le",
        "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20",
        "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS",
        "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN",
        "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB",
        "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman",
        "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard",
        "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT",
        "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal",
        "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium",
        "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT",
        "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"
    ];
    private deviceId: string | null = null;

    constructor(private readonly appName: string = "") {
    }

    async get(): Promise<string> {
        const me = this;
        if (me.deviceId)
            return me.deviceId;
        const collects: any[] = [
            me.appName,
            new Date().getTimezoneOffset(),
            typeof (window["openDatabase"] || undefined),
            navigator["platform"] || "NOT_AVAILABLE",
            navigator.hardwareConcurrency || "NOT_AVAILABLE",
            navigator.userAgent,
            screen.colorDepth,
            me.collectScreenResolution(),
            me.collectAvailableScreenResolution(),
            me.collectUserAgentData(),
            me.hasSessionStorage(),
            me.hasLocalStorage(),
            me.hasIndexDb(),
            me.collectDoNotTrack(),
            me.collectWebGLRendererInfo(),
            me.collectAvailableFonts(),
            me.collectDeviceMemory(),
            me.collectPixelRatio(),
            me.isCanvasSupported() ? me.collectCanvas() : "NO_SUPPORTED",
            me.isWebGlSupported() ? me.collectWebGL() : "NO_SUPPORTED",
            await me.collectAudioContext()
        ];
        me.deviceId = me.x64hash128(collects.join("#|#"), 31) + me.x64hash128(collects.join("#|#"), 31);
        return me.deviceId;
    }

    hasLocalStorage(): boolean {
        try {
            return !!window.localStorage;
        } catch (e) {
            return false;
        }
    }

    hasSessionStorage(): boolean {
        try {
            return !!window.sessionStorage;
        } catch (e) {
            return false;
        }
    }

    hasIndexDb(): boolean {
        try {
            return !!window.indexedDB;
        } catch (e) {
            return false;
        }
    }

    collectUserAgentData(): any {
        try {
            return JSON.stringify(navigator["userAgentData"]);
        } catch (e) {
            return "USER_AGENT_DATA_NOT_SUPPORTED";
        }
    }


    collectScreenResolution(): number[] {
        return (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
    }

    collectAvailableScreenResolution() {
        if (window.screen.availWidth && window.screen.availHeight)
            return [window.screen.availHeight, window.screen.availWidth].join(",");
        return "NOT_AVAILABLE";
    }

    collectCanvas(): string {
        const me = this,
            canvas: HTMLCanvasElement = document.createElement("canvas"),
            ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

        if (ctx !== null && canvas.toDataURL !== undefined) {
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#246d2d";
            ctx.fillRect(0, 0, ctx.measureText(me.appName).width + 5, 23);
            ctx.fillStyle = "#8CC541";
            ctx.fillText(me.appName, 2, 15);
            ctx.fillStyle = "#fff";
            ctx.fillText(me.appName, 4, 17);
            return canvas.toDataURL();
        } else {
            return "CANVAS_NOT_SUPPORTED";
        }
    }

    collectWebGLRendererInfo(): string {
        try {
            const canvas = document.createElement("canvas"),
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (!gl)
                return "WEBGL_NOT_SUPPORTED";

            const validParams = [
                // @ts-ignore
                gl.RENDERER,
                // @ts-ignore
                gl.VERSION,
                // @ts-ignore
                gl.VENDOR,
                // @ts-ignore
                gl.SHADING_LANGUAGE_VERSION
            ];

            let info: any = {};
            for (const param of validParams) {
                // @ts-ignore
                const value = gl.getParameter(param);
                if (value)
                    info[param] = value;
            }

            return JSON.stringify(info);
        } catch (e) {
            return "WEBGL_NOT_SUPPORTED";
        }
    }

    isFontAvailable(font: string): boolean {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context)
            return false;

        const text = "abcdefghijklmnopqrstuvwxyz0123456789";
        context.font = `72px '${font}', monospace`;

        const initialWidth = context.measureText(text).width;
        context.font = `72px monospace`;
        const monospaceWidth = context.measureText(text).width;
        return initialWidth !== monospaceWidth;
    }

    collectAvailableFonts(): string {
        return this.fontList.filter(font => this.isFontAvailable(font)).join(",");
    }

    collectDoNotTrack() {
        if (navigator.doNotTrack)
            return navigator.doNotTrack;
        else if (navigator["msDoNotTrack"])
            return navigator["msDoNotTrack"];
        else if (window["doNotTrack"])
            return window["doNotTrack"];
        else
            return "NOT_AVAILABLE";
    }

    collectDeviceMemory() {
        return navigator["deviceMemory"] || "NOT_AVAILABLE";
    }

    collectPixelRatio() {
        return window.devicePixelRatio || "NOT_AVAILABLE";
    }

    x64hash128(key, seed) {
        const x64Add = (m, n) => {
                m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
                n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
                const o = [0, 0, 0, 0];
                o[3] += m[3] + n[3];
                o[2] += o[3] >>> 16;
                o[3] &= 0xffff;
                o[2] += m[2] + n[2];
                o[1] += o[2] >>> 16;
                o[2] &= 0xffff;
                o[1] += m[1] + n[1];
                o[0] += o[1] >>> 16;
                o[1] &= 0xffff;
                o[0] += m[0] + n[0];
                o[0] &= 0xffff;
                return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
            }, x64Multiply = (m, n) => {
                m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
                n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
                const o = [0, 0, 0, 0];
                o[3] += m[3] * n[3];
                o[2] += o[3] >>> 16;
                o[3] &= 0xffff;
                o[2] += m[2] * n[3];
                o[1] += o[2] >>> 16;
                o[2] &= 0xffff;
                o[2] += m[3] * n[2];
                o[1] += o[2] >>> 16;
                o[2] &= 0xffff;
                o[1] += m[1] * n[3];
                o[0] += o[1] >>> 16;
                o[1] &= 0xffff;
                o[1] += m[2] * n[2];
                o[0] += o[1] >>> 16;
                o[1] &= 0xffff;
                o[1] += m[3] * n[1];
                o[0] += o[1] >>> 16;
                o[1] &= 0xffff;
                o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
                o[0] &= 0xffff;
                return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
            },
            x64Rotl = (m, n) => {
                n %= 64;
                if (n === 32) {
                    return [m[1], m[0]];
                } else if (n < 32) {
                    return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
                } else {
                    n -= 32;
                    return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
                }
            },
            x64LeftShift = (m, n) => {
                n %= 64;
                if (n === 0) {
                    return m;
                } else if (n < 32) {
                    return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
                } else {
                    return [m[1] << (n - 32), 0];
                }
            },
            x64Xor = (m, n) => {
                return [m[0] ^ n[0], m[1] ^ n[1]];
            },
            x64Fmix = (h) => {
                h = x64Xor(h, [0, h[0] >>> 1]);
                h = x64Multiply(h, [0xff51afd7, 0xed558ccd]);
                h = x64Xor(h, [0, h[0] >>> 1]);
                h = x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
                h = x64Xor(h, [0, h[0] >>> 1]);
                return h;
            };

        key = key || "";
        seed = seed || 0;
        const remainder = key.length % 16, bytes = key.length - remainder, c1 = [0x87c37b91, 0x114253d5],
            c2 = [0x4cf5ad43, 0x2745937f];
        let h1 = [0, seed], h2 = [0, seed], k1 = [0, 0], k2 = [0, 0], i;
        for (i = 0; i < bytes; i = i + 16) {
            k1 = [
                (key.charCodeAt(i + 4) & 0xff) |
                ((key.charCodeAt(i + 5) & 0xff) << 8) |
                ((key.charCodeAt(i + 6) & 0xff) << 16) |
                ((key.charCodeAt(i + 7) & 0xff) << 24),
                (key.charCodeAt(i) & 0xff) |
                ((key.charCodeAt(i + 1) & 0xff) << 8) |
                ((key.charCodeAt(i + 2) & 0xff) << 16) |
                ((key.charCodeAt(i + 3) & 0xff) << 24)
            ];
            k2 = [
                (key.charCodeAt(i + 12) & 0xff) |
                ((key.charCodeAt(i + 13) & 0xff) << 8) |
                ((key.charCodeAt(i + 14) & 0xff) << 16) |
                ((key.charCodeAt(i + 15) & 0xff) << 24),
                (key.charCodeAt(i + 8) & 0xff) |
                ((key.charCodeAt(i + 9) & 0xff) << 8) |
                ((key.charCodeAt(i + 10) & 0xff) << 16) |
                ((key.charCodeAt(i + 11) & 0xff) << 24)
            ];
            k1 = x64Multiply(k1, c1);
            k1 = x64Rotl(k1, 31);
            k1 = x64Multiply(k1, c2);
            h1 = x64Xor(h1, k1);
            h1 = x64Rotl(h1, 27);
            h1 = x64Add(h1, h2);
            h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
            k2 = x64Multiply(k2, c2);
            k2 = x64Rotl(k2, 33);
            k2 = x64Multiply(k2, c1);
            h2 = x64Xor(h2, k2);
            h2 = x64Rotl(h2, 31);
            h2 = x64Add(h2, h1);
            h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
        }
        k1 = [0, 0];
        k2 = [0, 0];
        switch (remainder) {
            case 15:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
            // fallthrough
            case 14:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
            // fallthrough
            case 13:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
            // fallthrough
            case 12:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
            // fallthrough
            case 11:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
            // fallthrough
            case 10:
                k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
            // fallthrough
            case 9:
                k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
                k2 = x64Multiply(k2, c2);
                k2 = x64Rotl(k2, 33);
                k2 = x64Multiply(k2, c1);
                h2 = x64Xor(h2, k2);
            // fallthrough
            case 8:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
            // fallthrough
            case 7:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
            // fallthrough
            case 6:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
            // fallthrough
            case 5:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
            // fallthrough
            case 4:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
            // fallthrough
            case 3:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
            // fallthrough
            case 2:
                k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
            // fallthrough
            case 1:
                k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
                k1 = x64Multiply(k1, c1);
                k1 = x64Rotl(k1, 31);
                k1 = x64Multiply(k1, c2);
                h1 = x64Xor(h1, k1);
            // fallthrough
        }
        h1 = x64Xor(h1, [0, key.length]);
        h2 = x64Xor(h2, [0, key.length]);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        h1 = x64Fmix(h1);
        h2 = x64Fmix(h2);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        return (
            ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) +
            ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) +
            ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) +
            ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8)
        );
    }

    isCanvasSupported() {
        const elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
    }

    getWebglCanvas() {
        const canvas = document.createElement("canvas");
        let gl;
        try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        } catch (e) {
        }
        if (!gl)
            gl = null;
        return gl;
    }

    isWebGlSupported() {
        // code taken from Modernizr
        if (!this.isCanvasSupported()) {
            return false;
        }

        const glContext = this.getWebglCanvas(), isSupported = !!window.WebGLRenderingContext && !!glContext;
        this.loseWebglContext(glContext);
        return isSupported;
    }

    loseWebglContext(context) {
        const loseContextExtension = context.getExtension("WEBGL_lose_context");
        if (loseContextExtension != null)
            loseContextExtension.loseContext();
    }

    collectWebGL() {

        let gl, result: string[] = [];
        const me = this,
            fa2s = (fa) => {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                return "[" + fa[0] + ", " + fa[1] + "]";
            },
            maxAnisotropy = (gl) => {
                const ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
                if (ext) {
                    let anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                    if (anisotropy === 0)
                        anisotropy = 2;
                    return anisotropy;
                } else
                    return null;
            };

        gl = me.getWebglCanvas();
        if (!gl)
            return [];
        // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
        // First it draws a gradient object with shaders and convers the image to the Base64 string.
        // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
        // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.

        const vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}",
            fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}",
            vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]),
            program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER),
            fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        vertexPosBuffer.itemSize = vertexPosBuffer.numItems = 3;
        gl.shaderSource(vshader, vShaderTemplate);
        gl.compileShader(vshader);
        gl.shaderSource(fshader, fShaderTemplate);
        gl.compileShader(fshader);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        gl.useProgram(program);
        program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
        program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
        gl.enableVertexAttribArray(program.vertexPosArray);
        gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
        gl.uniform2f(program.offsetUniform, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
        try {
            result.push(gl.canvas.toDataURL());
        } catch (e) {
            /* .toDataURL may be absent or broken (blocked by extension) */
        }
        result.push("extensions:" + (gl.getSupportedExtensions() || []).join(";"));
        result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
        result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
        result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
        result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
        result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
        result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
        result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
        result.push("webgl max anisotropy:" + maxAnisotropy(gl));
        result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
        result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
        result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
        result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
        result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
        result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
        result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
        result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
        result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
        result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
        result.push("webgl version:" + gl.getParameter(gl.VERSION));

        try {
            // Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
            const extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (extensionDebugRendererInfo) {
                result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
                result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
            }
        } catch (e) { /* squelch */
        }

        if (!gl.getShaderPrecisionFormat) {
            me.loseWebglContext(gl);
            return result;
        }

        ["FLOAT", "INT"].forEach((numType) => {
            ["VERTEX", "FRAGMENT"].forEach((shader) => {
                ["HIGH", "MEDIUM", "LOW"].forEach((numSize) => {
                    ["precision", "rangeMin", "rangeMax"].forEach((key) => {
                        const format = gl.getShaderPrecisionFormat(gl[shader + "_SHADER"], gl[numSize + "_" + numType])[key];
                        if (key !== "precision")
                            key = "precision " + key;
                        const line = ["webgl ", shader.toLowerCase(), " shader ", numSize.toLowerCase(), " ", numType.toLowerCase(), " ", key, ":", format].join("");
                        result.push(line);
                    });
                });
            });
        });
        me.loseWebglContext(gl);
        return result;
    }

    async collectAudioContext() {
        return new Promise((resolve) => {
            if (navigator.userAgent.match(/OS 11.+Version\/11.+Safari/))
                return resolve("EXCLUDED");
            const AudioContext = window.OfflineAudioContext || window["webkitOfflineAudioContext"];

            if (AudioContext == null)
                return resolve("NOT_AVAILABLE");

            let context = new AudioContext(1, 44100, 44100);
            const oscillator = context.createOscillator();
            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(10000, context.currentTime);

            const compressor = context.createDynamicsCompressor();
            [
                ["threshold", -50],
                ["knee", 40],
                ["ratio", 12],
                ["reduction", -20],
                ["attack", 0],
                ["release", 0.25]
            ].forEach((item) => {
                if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === "function") {
                    compressor[item[0]].setValueAtTime(item[1], context.currentTime);
                }
            });

            oscillator.connect(compressor);
            compressor.connect(context.destination);
            oscillator.start(0);
            context.startRendering();

            const audioTimeoutId = setTimeout(function() {
                context.oncomplete = () => {
                };
                // @ts-ignore
                context = null;
                return resolve("audioTimeout");
            }, 1000);

            context.oncomplete = function(event) {
                let fingerprint;
                try {
                    clearTimeout(audioTimeoutId);
                    fingerprint = event.renderedBuffer.getChannelData(0)
                        .slice(4500, 5000)
                        .reduce(function(acc, val) {
                            return acc + Math.abs(val);
                        }, 0)
                        .toString();
                    oscillator.disconnect();
                    compressor.disconnect();
                } catch (error) {
                    return resolve("ERROR");
                }
                return resolve(fingerprint.toString());
            };
        });
    }
}

const appEnv = getAppEnvConfig(),
    deviceId: DeviceId = new DeviceId(appEnv.APP_NAME);

export const getDeviceId = async (): Promise<string> => await deviceId.get();
