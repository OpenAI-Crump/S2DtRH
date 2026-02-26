# S2DtRH - Informace o zařízeních přes QR kódy

Statická webová stránka pro zobrazování provozních informací o zařízeních.
Na každé zařízení se nalepí QR kód s odkazem — po naskenování a zadání
přístupového kódu se zobrazí příslušný text.

https://openai-crump.github.io/S2DtRH/?id=

## Jak to funguje

1. V složce `devices/` leží `.txt` soubory — každý soubor = jedno zařízení.
2. Název souboru (bez `.txt`) je zároveň ID zařízení v URL.
3. QR kód odkazuje na: `https://<doména>/?id=nazev-souboru`
4. Návštěvník zadá přístupový kód a uvidí obsah souboru.

## Přidání nového zařízení

1. Otevřete složku `devices/` v repozitáři na GitHubu.
2. Klikněte na **Add file → Create new file**.
3. Název souboru zadejte ve formátu `nazev-zarizeni.txt` (bez diakritiky a mezer, povolené znaky: `a-z`, `0-9`, `-`, `_`).
4. Do obsahu napište informace o zařízení (prostý text).
5. Commitněte soubor.
6. Vygenerujte QR kód s URL: `https://<vaše-doména>/?id=nazev-zarizeni`

## Nasazení

Stránka je čistě statická (HTML + CSS + JS). Stačí povolit **GitHub Pages**
v nastavení repozitáře (Settings → Pages → Source: branch `main`, folder `/ (root)`).

Poté bude web dostupný na:
```
https://<uživatel>.github.io/S2DtRH/?id=cerpadlo-A-S04
```

## Struktura projektu

```
├── index.html              Hlavní stránka (bezp. brána + zobrazení)
├── style.css               Styly
├── devices/                Složka s .txt soubory zařízení
│   └── cerpadlo-A-S04.txt  Ukázkové zařízení
└── README.md
```
