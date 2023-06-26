**Vlastnosti aplikacie:**
- React + hooks (`useState`, `useRef`, `forwardRef`, `useEffect`, `useCallback`).
- jeden globalny `index.css` subor pre zakladny layout. Kazdy komponent pouziva vlastne 'scoped' styly vytvorene pomocou *CSS modules*.
- aplikacia je plne responzivna a pouzitelna na mobilnych zariadeniach (optimalizovane do min. rozlisenia displeja 320px na sirku).
- pouziva package s nazvom `json-server`, ktory vytvara jednoduchy dev server s 'routami' a fake uloziskom (`db.json`).
- pouziva dve *custom hooks* v adresari `/hooks`. Hook s nazvom `useTranslate.jsx` sa stara o vsetky preklady (kontroluje vsetko co je zobrazene v komponente `Output.jsx`). Hook s nazvom `useFetchInitialData.jsx` hned po starte aplikacie automaticky 'fetch-uje' a nastavuje max. limit a podporovane jazyky, do ktorych je mozne preklad uskutocnit (zdrojom vsetkych tychto dat je fake databaza `db.json`).
- pouziva cloudovy preklad (*Azure Cognitive Services*), na ktory sa pripaja formou API. Realizuje aj preklad na tzv. runy, ktory sa vykonava iba na strane klienta. Tieto preklady zabezpecuju skripty v adresari `helpers`, resp. custom hook s nazvom `useTranslate.jsx`.
- komponent `Input.jsx` ma zaujimavu vlastnost, t.j. ze vie dynamicky menit svoju vysku na zaklade svojho obsahu. Vyuziva nato `useEffect` hook. Taktiez stlacenim klavesi *Esc* sa vymaze vsetok text v `textarea` (ale iba v pripade, ze je v stave *focused*). Tato funkcionalita je implementovana v rodicovskom `App.jsx`. Komponent `Input.jsx` pouziva aj `forwardRef` vdaka comu vie preposlat `ref` priamo z `App.jsx` na svoj element `textarea`. Obsahuje aj tzv. *counter* (premenna `counterValue`), kt. pocita kolko znakov este ostava do naplnenia max. limitu pre uskutocnenie prekladu (neplati pre preklad na runy).
- samotny cloudovy preklad sa spusta automaticky ak pouzivatel prestane na kratky cas pisat do `textarea`. Tato funkcionalita je implementovana v custom hook `useTranslate.jsx` a pouziva nato `useEffect` a timer.
- komponent `Select.jsx` sluzi na vyber jazykov. Tento komponent sa pouziva dva krat, pre detekciu zdrojoveho jazyka a potom na manualny vyber cieloveho jazyka. Zdrojovy `Select.jsx` je vzdy v stave `disabled`, t.j. sluzi iba na zobrazenie detekovaneho zdrojoveho jazyka. Potom ako sa uskutocni uspesny cloudovy preklad, zdrojovy select zobrazi nazov detekovaneho jazyka. Tato vlastnost ale funguje iba v pripade, ze detekovany jazyk sa nachadza v zozname podporovanych jazykov (premenna `supportedLangCodes`). Ak sa v tomto zozname detekovany jazyk nenachadza, tak zdrojovy select vypise *Unknown*. Ak pouzivatel vyberie preklad na runy, tak automaticky sa ako zdrojovy jazyk uvedie 'English'.
- komponent `Output.jsx` zobrazuje vsetok preklad, alebo *placeholder* s nazvom *Translation*. Tento komponent je realizovany iba pomocou el. `div`, do ktoreho sa vsetok text uklada. V pripade, ze sa v `div` el. nachadza prelozeny text (alebo runy), tak tento text je mozne aj rychlo skopirovat kliknutim na tlacidlo *Copy*.

**Poznamky:**
- `debouncing` vieme uskutocnit aj bez pomoci externych kniznic. Konkretne pomocou `useEffect` hook spolu s cleaup funkciou a timer-om.
- `document.activeElement` vracia element v document objekte, ktory je prave v stave 'focused'.
- API kluce vieme *vizualne* schovat v `.env` subore, pricom nie je potrebna dodatocna instalacia `dotenv`. Kedze pouzivame Vite bundler (kt. uz obsahuje `dotenv`), tak premenne prostredia su dostupne cez `import.meta.env`. Pricom kazda vlastna premenna musi zacinat s `VITE_`, inak nebude viditelna. Napr. `import.meta.env.VITE_API_KEY`. Takto pristupime k obsahu premennej prostredia s nazvom `VITE_API_KEY`.

**Informacie**
- je nutne si vytvorit vlastny *subscription* na Azure Portal.
- vytvorit resource *Translator*, kt. je sucastou *Azure Cognitive Services*.
- zvolit Free plan (2M znakov za mesiac).
- ziskat *API kluc* a *Location* hodnoty.
- vytvorit `.env` subor v najvyssom adresari tejto aplikacie.
- umiestnit tam premenne (aj s hodnotami) s nazvami: `VITE_API_KEY` a `VITE_SERVICE_LOCATION`.