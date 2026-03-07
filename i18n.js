(function (global) {
    "use strict";

    var translations = {
        en: {
            // index.html
            pageTitle: "Device Info",
            scanPrompt: "Scan the QR code on the device to view its info.",
            scanBtn: "Scan QR code",
            scanHint: "Or use your Camera app directly — it reads QR codes automatically.",
            scanNotFound: "QR code not found in the photo. Try again.",
            scanPhotoError: "Could not load the photo.",
            authPrompt: "Enter the code to go down the rabbit hole.",
            authSubmit: "ENTER",
            authError: "Wrong code. Try again.",
            deviceNotFound: "Device not found. Check the QR code or contact the administrator.",
            showInventory: "Show in inventory",
            showDell: "Show in Dell support",
            metaCustomer: "Customer",
            metaDeployed: "Deployed",
            metaWarranty: "Warranty until",

            // admin.html
            adminTitle: "Administration",
            adminPrompt: "Log in to manage devices.",
            adminPassPlaceholder: "Administrator password",
            adminPatPlaceholder: "GitHub Personal Access Token",
            adminLogin: "Log in",
            loginInvalidPass: "Invalid password.",
            loginEnterPat: "Enter GitHub PAT.",

            navDevices: "Devices",
            navCustomers: "Customers",

            devicesPanelTitle: "Devices",
            newDeviceBtn: "+ New",
            filterAll: "All / Filter by customer",
            listEmpty: "No devices. Add the first one.",
            listFilterEmpty: "No devices for this customer.",
            loadingText: "Loading...",

            exportBtn: "Export backup (.zip)",
            importBtn: "Import backup (.zip)",
            exportInProgress: "Exporting...",
            importInProgress: "Importing...",
            importConfirm: "Import backup? Existing files will be overwritten.",
            importDone: "Import completed.",
            importFail: "Import failed: ",
            exportFail: "Export failed: ",

            editorNewTitle: "New device",
            editorEditTitle: "Edit: ",
            labelDeviceId: "Device ID",
            placeholderDeviceId: "e.g. pump-A-S04",
            labelContent: "Content",
            placeholderContent: "Device text...",
            labelInventory: "Inventory link (optional)",
            labelServiceTag: "Dell Service Tag (optional)",
            labelWarranty: "Warranty end (optional)",
            labelDeployment: "Deployment date (optional)",
            labelCustomer: "Customer (optional)",
            customerNone: "— not selected —",
            customerAddNew: "+ Add new customer",
            boldHint: "Text between _underscores_ is shown <strong>bold</strong>.",
            previewLabel: "Preview",
            deviceLinkLabel: "Device link",
            copyTooltip: "Copy to clipboard",
            copiedTooltip: "Copied!",
            saveBtn: "Save",
            deleteBtn: "Delete",
            backBtn: "Back",
            saving: "Saving...",
            saved: "Saved.",
            deleting: "Deleting...",
            deleteConfirm: 'Really delete device "{name}"?',
            enterDeviceId: "Enter device ID.",
            idFormatError: "ID can only contain letters, numbers, hyphens and underscores.",
            contentEmpty: "Content must not be empty.",
            errorPrefix: "Error: ",
            loadError: "Failed to load: ",
            deleteError: "Error deleting: ",
            emptyFile: "Empty file",

            // customers
            customersPanelTitle: "Customers",
            newCustomerBtn: "+ New",
            noCustomers: "No customers.",
            custEditorNew: "New customer",
            custEditorEdit: "Edit: ",
            labelCin: "CIN",
            labelVat: "VAT",
            labelName: "Name",
            placeholderName: "Company name",
            cinError: "CIN must be exactly 8 digits.",
            vatError: "VAT must be in format CZ + 8–10 digits (e.g. CZ12345678).",
            nameError: "Enter the customer name.",
            custDeleteConfirm: 'Really delete customer "{name}"?',
            custSaved: "Saved.",
            aresLoaded: "Loaded from ARES.",
            aresNotFound: "ARES: Subject not found",
            aresNoResults: "ARES: no results.",
            aresSearchFail: "ARES: search failed.",
            aresCinHint: "Enter a valid CIN (up to 8 digits).",
            aresNameHint: "Enter at least 2 characters to search.",
            aresUnavailable: "ARES unavailable – set ARES_PROXY_URL (see ares-worker.js)"
        },
        cs: {
            pageTitle: "Informace o zařízení",
            scanPrompt: "Naskenujte QR kód na zařízení pro zobrazení informací.",
            scanBtn: "Skenovat QR kód",
            scanHint: "Nebo použijte přímo aplikaci Fotoaparát — čte QR kódy automaticky.",
            scanNotFound: "QR kód nebyl na fotografii nalezen. Zkuste to znovu.",
            scanPhotoError: "Nepodařilo se načíst fotografii.",
            authPrompt: "Zadejte kód pro vstup do králičí nory.",
            authSubmit: "VSTUP",
            authError: "Špatný kód. Zkuste to znovu.",
            deviceNotFound: "Zařízení nenalezeno. Zkontrolujte QR kód nebo kontaktujte administrátora.",
            showInventory: "Zobrazit v inventáři",
            showDell: "Zobrazit v Dell podpoře",
            metaCustomer: "Zákazník",
            metaDeployed: "Nasazeno",
            metaWarranty: "Záruka do",

            adminTitle: "Administrace",
            adminPrompt: "Přihlaste se pro správu zařízení.",
            adminPassPlaceholder: "Heslo administrátora",
            adminPatPlaceholder: "GitHub Personal Access Token",
            adminLogin: "Přihlásit",
            loginInvalidPass: "Neplatné heslo.",
            loginEnterPat: "Zadejte GitHub PAT.",

            navDevices: "Zařízení",
            navCustomers: "Zákazníci",

            devicesPanelTitle: "Zařízení",
            newDeviceBtn: "+ Nové",
            filterAll: "Všichni / Filtr dle zákazníka",
            listEmpty: "Žádná zařízení. Přidejte první.",
            listFilterEmpty: "Žádná zařízení pro tohoto zákazníka.",
            loadingText: "Načítání...",

            exportBtn: "Export zálohy (.zip)",
            importBtn: "Import zálohy (.zip)",
            exportInProgress: "Exportování...",
            importInProgress: "Importování...",
            importConfirm: "Importovat zálohu? Existující soubory se přepíší.",
            importDone: "Import dokončen.",
            importFail: "Import selhal: ",
            exportFail: "Export selhal: ",

            editorNewTitle: "Nové zařízení",
            editorEditTitle: "Upravit: ",
            labelDeviceId: "ID zařízení",
            placeholderDeviceId: "např. cerpadlo-A-S04",
            labelContent: "Obsah",
            placeholderContent: "Text zařízení...",
            labelInventory: "Odkaz na inventář (volitelné)",
            labelServiceTag: "Dell Service Tag (volitelné)",
            labelWarranty: "Konec záruky (volitelné)",
            labelDeployment: "Datum nasazení (volitelné)",
            labelCustomer: "Zákazník (volitelné)",
            customerNone: "— nevybráno —",
            customerAddNew: "+ Přidat nového zákazníka",
            boldHint: "Text mezi _podtržítky_ se zobrazí <strong>tučně</strong>.",
            previewLabel: "Náhled",
            deviceLinkLabel: "Odkaz na zařízení",
            copyTooltip: "Kopírovat do schránky",
            copiedTooltip: "Zkopírováno!",
            saveBtn: "Uložit",
            deleteBtn: "Smazat",
            backBtn: "Zpět",
            saving: "Ukládání...",
            saved: "Uloženo.",
            deleting: "Mazání...",
            deleteConfirm: 'Opravdu smazat zařízení "{name}"?',
            enterDeviceId: "Zadejte ID zařízení.",
            idFormatError: "ID může obsahovat pouze písmena, čísla, pomlčky a podtržítka.",
            contentEmpty: "Obsah nesmí být prázdný.",
            errorPrefix: "Chyba: ",
            loadError: "Nepodařilo se načíst: ",
            deleteError: "Chyba při mazání: ",
            emptyFile: "Prázdný soubor",

            customersPanelTitle: "Zákazníci",
            newCustomerBtn: "+ Nový",
            noCustomers: "Žádní zákazníci.",
            custEditorNew: "Nový zákazník",
            custEditorEdit: "Upravit: ",
            labelCin: "IČO",
            labelVat: "DIČ",
            labelName: "Název",
            placeholderName: "Název společnosti",
            cinError: "IČO musí být přesně 8 číslic.",
            vatError: "DIČ musí být ve formátu CZ + 8–10 číslic (např. CZ12345678).",
            nameError: "Zadejte název zákazníka.",
            custDeleteConfirm: 'Opravdu smazat zákazníka "{name}"?',
            custSaved: "Uloženo.",
            aresLoaded: "Načteno z ARES.",
            aresNotFound: "ARES: Subjekt nenalezen",
            aresNoResults: "ARES: žádné výsledky.",
            aresSearchFail: "ARES: vyhledávání selhalo.",
            aresCinHint: "Zadejte platné IČO (až 8 číslic).",
            aresNameHint: "Zadejte alespoň 2 znaky pro vyhledávání.",
            aresUnavailable: "ARES nedostupný – nastavte ARES_PROXY_URL (viz ares-worker.js)"
        },
        de: {
            pageTitle: "Geräteinformation",
            scanPrompt: "Scannen Sie den QR-Code auf dem Gerät, um seine Informationen anzuzeigen.",
            scanBtn: "QR-Code scannen",
            scanHint: "Oder verwenden Sie direkt Ihre Kamera-App — sie liest QR-Codes automatisch.",
            scanNotFound: "QR-Code im Foto nicht gefunden. Versuchen Sie es erneut.",
            scanPhotoError: "Foto konnte nicht geladen werden.",
            authPrompt: "Geben Sie den Code ein, um den Kaninchenbau zu betreten.",
            authSubmit: "EINGABE",
            authError: "Falscher Code. Versuchen Sie es erneut.",
            deviceNotFound: "Gerät nicht gefunden. Überprüfen Sie den QR-Code oder kontaktieren Sie den Administrator.",
            showInventory: "Im Inventar anzeigen",
            showDell: "Im Dell-Support anzeigen",
            metaCustomer: "Kunde",
            metaDeployed: "Bereitgestellt",
            metaWarranty: "Garantie bis",

            adminTitle: "Verwaltung",
            adminPrompt: "Melden Sie sich an, um Geräte zu verwalten.",
            adminPassPlaceholder: "Administratorkennwort",
            adminPatPlaceholder: "GitHub Personal Access Token",
            adminLogin: "Anmelden",
            loginInvalidPass: "Ungültiges Passwort.",
            loginEnterPat: "GitHub PAT eingeben.",

            navDevices: "Geräte",
            navCustomers: "Kunden",

            devicesPanelTitle: "Geräte",
            newDeviceBtn: "+ Neu",
            filterAll: "Alle / Nach Kunde filtern",
            listEmpty: "Keine Geräte. Fügen Sie das erste hinzu.",
            listFilterEmpty: "Keine Geräte für diesen Kunden.",
            loadingText: "Laden...",

            exportBtn: "Backup exportieren (.zip)",
            importBtn: "Backup importieren (.zip)",
            exportInProgress: "Exportiere...",
            importInProgress: "Importiere...",
            importConfirm: "Backup importieren? Bestehende Dateien werden überschrieben.",
            importDone: "Import abgeschlossen.",
            importFail: "Import fehlgeschlagen: ",
            exportFail: "Export fehlgeschlagen: ",

            editorNewTitle: "Neues Gerät",
            editorEditTitle: "Bearbeiten: ",
            labelDeviceId: "Geräte-ID",
            placeholderDeviceId: "z.B. pumpe-A-S04",
            labelContent: "Inhalt",
            placeholderContent: "Gerätetext...",
            labelInventory: "Inventarlink (optional)",
            labelServiceTag: "Dell Service Tag (optional)",
            labelWarranty: "Garantieende (optional)",
            labelDeployment: "Bereitstellungsdatum (optional)",
            labelCustomer: "Kunde (optional)",
            customerNone: "— nicht ausgewählt —",
            customerAddNew: "+ Neuen Kunden hinzufügen",
            boldHint: "Text zwischen _Unterstrichen_ wird <strong>fett</strong> dargestellt.",
            previewLabel: "Vorschau",
            deviceLinkLabel: "Gerätelink",
            copyTooltip: "In Zwischenablage kopieren",
            copiedTooltip: "Kopiert!",
            saveBtn: "Speichern",
            deleteBtn: "Löschen",
            backBtn: "Zurück",
            saving: "Speichern...",
            saved: "Gespeichert.",
            deleting: "Löschen...",
            deleteConfirm: 'Gerät "{name}" wirklich löschen?',
            enterDeviceId: "Geben Sie die Geräte-ID ein.",
            idFormatError: "ID darf nur Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten.",
            contentEmpty: "Inhalt darf nicht leer sein.",
            errorPrefix: "Fehler: ",
            loadError: "Laden fehlgeschlagen: ",
            deleteError: "Fehler beim Löschen: ",
            emptyFile: "Leere Datei",

            customersPanelTitle: "Kunden",
            newCustomerBtn: "+ Neu",
            noCustomers: "Keine Kunden.",
            custEditorNew: "Neuer Kunde",
            custEditorEdit: "Bearbeiten: ",
            labelCin: "IČO",
            labelVat: "DIČ",
            labelName: "Name",
            placeholderName: "Firmenname",
            cinError: "IČO muss genau 8 Ziffern haben.",
            vatError: "DIČ muss im Format CZ + 8–10 Ziffern sein (z.B. CZ12345678).",
            nameError: "Geben Sie den Kundennamen ein.",
            custDeleteConfirm: 'Kunden "{name}" wirklich löschen?',
            custSaved: "Gespeichert.",
            aresLoaded: "Aus ARES geladen.",
            aresNotFound: "ARES: Subjekt nicht gefunden",
            aresNoResults: "ARES: keine Ergebnisse.",
            aresSearchFail: "ARES: Suche fehlgeschlagen.",
            aresCinHint: "Geben Sie eine gültige IČO ein (bis 8 Ziffern).",
            aresNameHint: "Geben Sie mindestens 2 Zeichen für die Suche ein.",
            aresUnavailable: "ARES nicht verfügbar – ARES_PROXY_URL setzen (siehe ares-worker.js)"
        }
    };

    // Flag SVGs (inline, no external files)
    var flags = {
        en: '<svg viewBox="0 0 60 30" width="20" height="10"><clipPath id="ec"><rect width="60" height="30"/></clipPath><g clip-path="url(#ec)"><rect width="60" height="30" fill="#00247d"/><path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#cf142b" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#cf142b" stroke-width="6"/></g></svg>',
        cs: '<svg viewBox="0 0 6 4" width="20" height="13"><rect width="6" height="2" fill="#fff"/><rect y="2" width="6" height="2" fill="#d7141a"/><polygon points="0,0 3,2 0,4" fill="#11457e"/></svg>',
        de: '<svg viewBox="0 0 5 3" width="20" height="12"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#d00"/><rect y="2" width="5" height="1" fill="#fc0"/></svg>'
    };

    // Detect language: check localStorage, then browser language, default to en
    function detectLang() {
        var stored = localStorage.getItem("s2dtrh-lang");
        if (stored && translations[stored]) return stored;
        var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
        if (nav.indexOf("cs") === 0 || nav.indexOf("sk") === 0) return "cs";
        if (nav.indexOf("de") === 0) return "de";
        return "en";
    }

    var currentLang = detectLang();

    function t(key) {
        var lang = translations[currentLang] || translations.en;
        return lang[key] || translations.en[key] || key;
    }

    function setLang(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem("s2dtrh-lang", lang);
        // Dispatch event for pages to re-render
        document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
    }

    function createLangSwitcher() {
        var div = document.createElement("div");
        div.className = "lang-switcher";
        var langs = ["en", "cs", "de"];
        langs.forEach(function (lang) {
            var btn = document.createElement("button");
            btn.className = "lang-btn" + (lang === currentLang ? " active" : "");
            btn.setAttribute("data-lang", lang);
            btn.innerHTML = flags[lang];
            btn.title = lang.toUpperCase();
            btn.addEventListener("click", function () {
                setLang(lang);
                div.querySelectorAll(".lang-btn").forEach(function (b) {
                    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
                });
            });
            div.appendChild(btn);
        });
        return div;
    }

    global.S2DtRH_i18n = {
        t: t,
        setLang: setLang,
        currentLang: function () { return currentLang; },
        createLangSwitcher: createLangSwitcher,
        flags: flags
    };
})(window);
