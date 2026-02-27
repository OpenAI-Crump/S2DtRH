(function (global) {
    "use strict";

    // ============================================================
    //  KONFIGURACE – upravte tyto hodnoty podle svých potřeb
    // ============================================================

    // Šifrovací klíč pro soubory zařízení.
    // Po změně je nutné znovu zašifrovat všechny soubory v admin rozhraní!
    var PASSPHRASE = "s2dtrh-default-key-CHANGE-ME";

    // SHA-256 hash hesla administrátora (výchozí heslo: "admin")
    // Pro změnu: v konzoli prohlížeče spusťte
    //   S2DtRH.sha256("vase-nove-heslo").then(console.log)
    // a výsledný hash sem vložte.
    var ADMIN_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

    // GitHub repozitář (pro admin rozhraní)
    var GITHUB_OWNER = "OpenAI-Crump";
    var GITHUB_REPO = "S2DtRH";

    // ============================================================

    var enc = new TextEncoder();
    var dec = new TextDecoder();
    var SALT = "s2dtrh-aes-salt-v1";

    function deriveKey() {
        return crypto.subtle.importKey(
            "raw", enc.encode(PASSPHRASE), "PBKDF2", false, ["deriveKey"]
        ).then(function (km) {
            return crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: enc.encode(SALT), iterations: 100000, hash: "SHA-256" },
                km,
                { name: "AES-GCM", length: 256 },
                false,
                ["encrypt", "decrypt"]
            );
        });
    }

    function toBase64(bytes) {
        var parts = [];
        for (var i = 0; i < bytes.length; i += 8192) {
            parts.push(String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)));
        }
        return btoa(parts.join(""));
    }

    function fromBase64(str) {
        var b = atob(str);
        var a = new Uint8Array(b.length);
        for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
        return a;
    }

    global.S2DtRH = {
        ADMIN_HASH: ADMIN_HASH,
        GITHUB_OWNER: GITHUB_OWNER,
        GITHUB_REPO: GITHUB_REPO,

        encrypt: function (text) {
            var iv = crypto.getRandomValues(new Uint8Array(12));
            return deriveKey().then(function (key) {
                return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(text));
            }).then(function (ct) {
                var buf = new Uint8Array(12 + ct.byteLength);
                buf.set(iv);
                buf.set(new Uint8Array(ct), 12);
                return toBase64(buf);
            });
        },

        decrypt: function (b64) {
            var raw = fromBase64(b64);
            return deriveKey().then(function (key) {
                return crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: raw.slice(0, 12) },
                    key,
                    raw.slice(12)
                );
            }).then(function (pt) {
                return dec.decode(pt);
            });
        },

        formatText: function (text) {
            var d = document.createElement("div");
            d.textContent = text;
            var safe = d.innerHTML;
            return safe.replace(/_(.*?)_/g, "<strong>$1</strong>");
        },

        sha256: function (text) {
            return crypto.subtle.digest("SHA-256", enc.encode(text)).then(function (buf) {
                return Array.from(new Uint8Array(buf)).map(function (b) {
                    return b.toString(16).padStart(2, "0");
                }).join("");
            });
        },

        parseDeviceData: function (decrypted) {
            try {
                var data = JSON.parse(decrypted);
                if (typeof data === "object" && data !== null && typeof data.content === "string") {
                    return {
                        content: data.content,
                        inventoryLink: data.inventoryLink || "",
                        serviceTag: data.serviceTag || ""
                    };
                }
            } catch (e) {}
            return { content: decrypted, inventoryLink: "", serviceTag: "" };
        },

        serializeDeviceData: function (content, inventoryLink, serviceTag) {
            return JSON.stringify({
                content: content,
                inventoryLink: inventoryLink || "",
                serviceTag: serviceTag || ""
            });
        }
    };
})(window);
