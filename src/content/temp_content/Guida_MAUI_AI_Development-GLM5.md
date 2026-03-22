**MODULO AVANZATO**

**Sviluppo di Applicazioni MAUI**

**Assistito da Intelligenza Artificiale**

1\. Introduzione al Modulo
==========================

1.1 Obiettivi Formativi
-----------------------

Questo modulo avanzato rappresenta un'evoluzione naturale del percorso formativo su .NET MAUI, introducendo gli studenti alle moderne metodologie di sviluppo software assistito da intelligenza artificiale. L'obiettivo principale consiste nel formare sviluppatori capaci di integrare in modo consapevole e critico gli strumenti di AI nel proprio flusso di lavoro, evitando la semplice dipendenza da suggerimenti automatici e promuovendo invece un approccio strutturato e metodologico alla generazione di codice. Gli studenti apprenderanno a definire specifiche tecniche precise, a validare il codice generato dall'AI, e a mantenere sempre il controllo architetturale del progetto software.

Il corso si propone di colmare il divario tra le competenze di programmazione tradizionale acquisite nei moduli precedenti e le nuove esigenze del mercato del lavoro, dove la capacità di collaborare efficacemente con strumenti di AI è diventata una competenza fondamentale. Particolare attenzione viene dedicata alla comprensione dei limiti degli strumenti di AI, alla necessità di revisione critica del codice generato, e all'importanza di mantenere una solida comprensione dei principi fondamentali della programmazione e dell'architettura software.

1.2 Prerequisiti e Competenze Necessarie
----------------------------------------

Prima di affrontare questo modulo, gli studenti devono aver consolidato le seguenti competenze attraverso i moduli precedenti del corso MAUI:

-         Conoscenza approfondita del framework .NET MAUI e della sua architettura multipiattaforma

-         Padronanza di XAML per la definizione di interfacce utente dichiarative

-         Comprensione del pattern MVVM (Model-View-ViewModel) e data binding

-         Esperienza con la navigazione basata su Shell e gestione delle risorse

-         Conoscenza delle tecniche di persistenza dati con SQLite e Preferences

-         Familiarità con il consumo di API REST e gestione di operazioni asincrone

-         Comprensione della gestione dei permessi e integrazione con funzionalità native

1.3 Strumenti e Ambiente di Sviluppo
------------------------------------

Il modulo utilizza un ecosistema di strumenti AI integrati nell'ambiente di sviluppo, selezionati per offrire agli studenti un'esperienza completa e rappresentativa delle tecnologie attualmente disponibili nel settore. La combinazione di diversi strumenti permette di esplorare varie modalità di interazione con l'AI, dal completamento contestuale alla generazione di codice a partire da specifiche, fino alla documentazione automatica e alla refactoring intelligente.

| **Strumento** | **Descrizione e Utilizzo** |
| --- |  --- |
| **GitHub Copilot Pro** | Assistente AI integrato in Visual Studio 2022 e VS Code. Offre completamento codice contestuale, generazione di funzioni intere da commenti, e supporto per refactoring. Disponibile gratuitamente per gli studenti tramite GitHub Student Developer Pack. |
| --- |  --- |
| **OpenCode** | Piattaforma AI con integrazione di skills specializzate. Permette lo sviluppo guidato da specifiche e offre funzionalità avanzate per la generazione di codice strutturato e documentazione automatica. |
| **Ollama Cloud** | Marketplace di LLM che offre accesso a modelli open source gratuiti. Utile per sperimentare con diversi modelli linguistici e comprendere le differenze nelle risposte generate. |
| **KiloCode** | Piattaforma che fornisce modelli AI gratuiti per lo sviluppo software. Offre un'alternativa a Copilot con focus su codice ottimizzato e best practices. |
| **ZenCode** | Marketplace di modelli LLM specializzati in programmazione. Fornisce accesso gratuito a modelli ottimizzati per diversi linguaggi e framework, incluso C# e .NET. |

*Tabella 1: Strumenti AI disponibili per lo sviluppo*

2\. Sviluppo Spec-Driven con AI
===============================

2.1 Fondamenti Teorici dell'Approccio Spec-Driven
-------------------------------------------------

L'approccio spec-driven allo sviluppo software rappresenta un'evoluzione delle metodologie tradizionali, adattata al contesto dell'AI generativa. A differenza del cosiddetto 'vibe coding' dove lo sviluppatore si affida interamente ai suggerimenti dell'AI senza una struttura definita, lo sviluppo spec-driven richiede una fase preliminare di analisi e definizione delle specifiche tecniche che fungono da contratto vincolante per l'AI. Questo approccio garantisce che l'intelligenza artificiale operi all'interno di confini ben definiti, producendo codice che rispetta requisiti architetturali precisi e standard di qualità predeterminati.

Il termine 'spec-driven' deriva dalla concatenazione di 'specification' e 'driven', indicando una metodologia in cui le specifiche tecniche guidano l'intero processo di sviluppo. Nel contesto dell'AI assistita, questo significa che prima di generare qualsiasi riga di codice, lo sviluppatore deve aver definito chiaramente cosa il codice deve fare, come deve farlo, e quali vincoli deve rispettare. Le specifiche diventano quindi il punto di partenza per ogni interazione con l'AI, e il codice generato viene sistematicamente validato rispetto a queste specifiche.

Questo approccio presenta vantaggi significativi rispetto al coding assistito tradizionale. In primo luogo, riduce drasticamente il rischio di generare codice che, sebbene sintatticamente corretto, non rispetta i requisiti funzionali del progetto. In secondo luogo, promuove una maggiore consapevolezza architetturale, costringendo lo sviluppatore a pensare in termini di struttura e relazioni prima di passare all'implementazione. Infine, facilita la manutenibilità del codice, poiché le specifiche documentano le intenzioni progettuali e possono essere utilizzate come riferimento per future modifiche.

2.2 Ciclo di Sviluppo Iterativo Man-in-the-Loop
-----------------------------------------------

Il modello 'man-in-the-loop' rappresenta il cuore operativo dell'approccio spec-driven. Questo paradigma prevede che l'essere umano mantenga sempre il controllo decisionale nelle fasi critiche del processo di sviluppo, mentre l'AI si occupa delle attività ripetitive e della generazione di codice bozza. La figura umana agisce come supervisore, validatore e direttore artistico del processo, garantendo che ogni output dell'AI sia allineato con gli obiettivi del progetto e gli standard di qualità stabiliti.

Il ciclo iterativo si articola in quattro fasi distinte che si ripetono fino al completamento del progetto. La fase di Planning prevede la definizione dettagliata delle specifiche per l'iterazione corrente, inclusi i requisiti funzionali, i vincoli tecnici e i criteri di accettazione. La fase di Build vede l'AI generare il codice basandosi sulle specifiche fornite, con lo sviluppatore che guida il processo attraverso prompt mirati. La fase di Testing richiede la verifica sistematica del codice generato, sia attraverso test automatici che revisione manuale. Infine, la fase di Review prevede l'analisi critica dei risultati e l'identificazione delle aree di miglioramento per l'iterazione successiva.

### 2.2.1 Fase di Planning

Durante la fase di planning, lo sviluppatore produce un documento di specifiche in formato Markdown che descrive in dettaglio cosa deve essere implementato nell'iterazione corrente. Questo documento, denominato 'iteration-spec.md', deve includere una descrizione funzionale della feature da implementare, i requisiti tecnici specifici, i vincoli architetturali da rispettare, i criteri di accettazione che definiranno il successo dell'implementazione, e eventuali note su dipendenze o integrazioni necessarie. La qualità di questo documento determina direttamente la qualità del codice che verrà generato.

### 2.2.2 Fase di Build

Nella fase di build, le specifiche vengono utilizzate per guidare l'AI nella generazione del codice. Lo sviluppatore non si limita a copiare le specifiche nel prompt, ma le adatta e le arricchisce con contesto aggiuntivo rilevante per l'AI. È fondamentale mantenere un dialogo iterativo con l'AI, chiedendo chiarimenti, proponendo alternative, e guidando la generazione verso la soluzione desiderata. L'AI può generare multiple alternative, che lo sviluppatore valuta e combina secondo le esigenze del progetto.

### 2.2.3 Fase di Testing

La fase di testing nel contesto AI-assistito assume un'importanza critica. Il codice generato dall'AI, per quanto sofisticato, può contenere errori logici, problemi di performance, o violazioni sottili delle specifiche. Lo sviluppatore deve implementare una strategia di testing che includa test unitari per le singole componenti, test di integrazione per verificare le interazioni tra componenti, test di UI per validare l'esperienza utente, e test manuali esplorativi per identificare problemi imprevisti. I risultati dei test vengono documentati e utilizzati per guidare la fase successiva.

### 2.2.4 Fase di Review

La fase di review conclude ogni iterazione e prepara il terreno per quella successiva. Lo sviluppatore analizza il codice prodotto, identifica le parti riuscite e quelle che necessitano di miglioramento, e aggiorna le specifiche per riflettere eventuali cambiamenti nei requisiti o nelle comprensioni tecniche. La review deve essere documentata in un file 'iteration-log.md' che traccia l'evoluzione del progetto e le decisioni prese, creando una memoria storica preziosa per la manutenzione futura e per il processo di apprendimento.

2.3 Documentazione del Processo di Sviluppo
-------------------------------------------

Una caratteristica distintiva dello sviluppo spec-driven è l'attenzione alla documentazione continua del processo. Ogni progetto deve includere una struttura di cartelle dedicata alla documentazione che traccia l'evoluzione del codice e le decisioni prese. La cartella 'docs/' contiene la documentazione tecnica generale, inclusa l'architettura del sistema e le API utilizzate. La sottocartella 'docs/iterations/' ospita i documenti di specifiche per ogni iterazione, numerati progressivamente. Infine, la cartella 'docs/reviews/' contiene i report delle review effettuate al termine di ogni iterazione.

Questa struttura documentale serve a molteplici scopi. Permette allo sviluppatore di mantenere una visione chiara dell'evoluzione del progetto, facilita la collaborazione in team fornendo un riferimento condiviso, e costituisce evidenza del processo di sviluppo per scopi valutativi. Nel contesto didattico, la documentazione diventa parte integrante della valutazione, permettendo di apprezzare non solo il prodotto finale ma anche il percorso metodologico seguito.

3\. Guida agli Strumenti AI
===========================

3.1 GitHub Copilot Pro
----------------------

GitHub Copilot Pro rappresenta lo standard industriale per l'assistenza AI nello sviluppo software. Sviluppato da GitHub in collaborazione con OpenAI, Copilot si integra nativamente negli ambienti di sviluppo più diffusi, offrendo suggerimenti contestuali in tempo reale mentre lo sviluppatore digita il codice. La versione Pro, disponibile gratuitamente per gli studenti attraverso il GitHub Student Developer Pack, offre funzionalità avanzate incluso l'accesso ai modelli più recenti e capacità di analisi di interi progetti.

### 3.1.1 Installazione e Configurazione in Visual Studio 2026

Per installare GitHub Copilot in Visual Studio 2026, procedere secondo i seguenti passaggi:

1.      Aprire Visual Studio 2026 e accedere al menu 'Estensioni' > 'Gestisci estensioni'

2.      Cercare 'GitHub Copilot' nella sezione 'Online' del marketplace

3.      Cliccare 'Scarica' e riavviare Visual Studio al termine dell'installazione

4.      Alla riapertura, accedere con le credenziali GitHub quando richiesto

5.      Verificare l'attivazione cercando l'icona di Copilot nella barra degli strumenti

Per uno sviluppo ottimale di applicazioni MAUI, si consiglia la seguente configurazione:

-         Attivare i suggerimenti automatici nelle impostazioni di Copilot

-         Configurare le scorciatoie da tastiera per accettare (Tab) o rifiutare (Esc) i suggerimenti

-         Abilitare 'Copilot Chat' per interazioni conversazionali con l'AI

-         Impostare il linguaggio preferito su C# per suggerimenti più pertinenti

### 3.1.2 Installazione e Configurazione in Visual Studio Code

L'installazione in VS Code segue un processo analogo:

1.      Aprire VS Code e accedere alla vista 'Estensioni' (Ctrl+Shift+X)

2.      Cercare 'GitHub Copilot' e installare l'estensione ufficiale

3.      Installare anche 'GitHub Copilot Chat' per la funzionalità di chat

4.      Effettuare l'accesso con GitHub quando richiesto

5.      Verificare la corretta installazione tramite la status bar

### 3.1.3 Tecniche di Prompting Efficaci per MAUI

L'efficacia di Copilot dipende significativamente dalla qualità dei prompt forniti. Per lo sviluppo MAUI, i prompt più efficaci seguono una struttura che include il contesto dell'applicazione, il framework utilizzato, i requisiti specifici della funzionalità, e eventuali vincoli o preferenze stilistiche. È fondamentale fornire a Copilot informazioni sufficienti sul contesto del progetto affinché i suggerimenti siano pertinenti e allineati con l'architettura esistente.

**Esempi di prompt efficaci per scenari MAUI comuni:**

| **Scenario** | **Prompt Esempio** |
| --- |  --- |
| Creazione ViewModel | // Crea un ObservableObject per gestire la lista prodotti con proprietà Name, Price, Category. Implementa ICommand per aggiungere/rimuovere elementi |
| --- |  --- |
| XAML Layout |  |
| API Client | // HttpClient con gestione errori e retry per API REST. Includi cancellazione token e deserializzazione JSON |
| Shell Navigation | // Registra route per DetailPage con parametro id. Implementa GoToAsync con query parameters |

*Tabella 2: Esempi di prompt per scenari MAUI*

3.2 OpenCode con Skills
-----------------------

OpenCode rappresenta una piattaforma innovativa che estende le capacità dei tradizionali assistenti di coding attraverso un sistema di skills specializzate. A differenza di Copilot che opera principalmente come completamento di codice contestuale, OpenCode permette di definire workflow strutturati che guidano l'intero processo di sviluppo, dalla definizione delle specifiche fino alla generazione di documentazione e test. Le skills sono moduli specializzati che possono essere configurati per specifici tipi di progetti o metodologie di sviluppo.

### 3.2.1 Configurazione dell'Ambiente OpenCode

Per configurare OpenCode per lo sviluppo MAUI:

1.      Installare OpenCode seguendo le istruzioni del provider istituzionale

2.      Configurare le credenziali di accesso nel file di configurazione ~/.opencode/config

3.      Attivare le skills pertinenti: 'dotnet-maui', 'xaml-designer', 'api-client'

4.      Impostare il modello linguistico preferito per il coding C#

5.      Configurare l'integrazione con il sistema di versioning Git

### 3.2.2 Workflow con OpenCode per Progetti MAUI

OpenCode eccelle nella gestione di progetti complessi attraverso workflow strutturati. Un tipico workflow per un progetto MAUI inizia con la skill 'project-scaffolder' che genera la struttura di cartelle e file di base, seguendo le best practices MAUI. Successivamente, la skill 'spec-analyzer' aiuta a trasformare i requisiti funzionali in specifiche tecniche formattate. Durante lo sviluppo, la skill 'code-reviewer' analizza il codice generato e suggerisce miglioramenti. Infine, la skill 'doc-generator' produce documentazione automatica partendo dal codice e dai commenti.

3.3 Marketplace LLM Alternativi
-------------------------------

### 3.3.1 Ollama Cloud

Ollama Cloud offre accesso a modelli linguistici open source attraverso un'interfaccia cloud user-friendly. 

### 3.3.2 KiloCode

KiloCode si distingue per la sua attenzione alle best practices di programmazione. I modelli offerti dalla piattaforma sono stati addestrati con particolare focus sulla produzione di codice pulito, documentato e manutenibile. 

### 3.3.3 ZenCode

ZenCode completa l'ecosistema di strumenti AI con una collezione di modelli specializzati per diversi linguaggi e framework. 

4\. Idee Progetto per Applicazioni MAUI
=======================================

Questa sezione presenta quattro idee di progetto complete, ciascuna pensata per essere implementata nel corso del modulo. I progetti sono stati selezionati per offrire una progressione di complessità, dall'applicazione prevalentemente read-only con un'API semplice, fino a applicazioni che richiedono integrazione di multiple API, gestione di stato complesso e funzionalità native del dispositivo. Tutti i progetti utilizzano API gratuite con limiti generosi per scopi didattici.

4.1 Progetto A: CryptoTracker - Monitor Criptovalute
----------------------------------------------------

### 4.1.1 Descrizione Generale

CryptoTracker è un'applicazione che permette agli utenti di monitorare i prezzi delle criptovalute in tempo reale, visualizzare grafici storici e gestire un portfolio personale di investimenti. L'applicazione rappresenta un caso d'uso ideale per introdurre gli studenti al consumo di API REST complesse, alla visualizzazione di dati con grafici interattivi, e alla gestione di persistenza locale per le preferenze utente. La complessità del progetto è moderata, rendendolo adatto come primo progetto completo per studenti che si affacciano allo sviluppo AI-assistito.

### 4.1.2 API Reference: CoinGecko

L'applicazione utilizza le API gratuite di CoinGecko (documentazione: https://www.coingecko.com/api/documentation), che offrono accesso a dati real-time sulle criptovalute senza richiedere una chiave API per gli endpoint di base. Il piano gratuito permette fino a 10-50 chiamate al minuto, più che sufficienti per un'applicazione didattica. Gli endpoint principali utilizzati includono /coins/markets per la lista delle criptovalute con prezzi attuali, /coins/{id}/market\_chart per i dati storici necessari ai grafici, e /search per la funzionalità di ricerca.

### 4.1.3 Funzionalità Richieste

L'applicazione deve implementare le seguenti funzionalità organizzate per priorità:

| **Priorità** | **Funzionalità** | **Descrizione** |
| --- |  --- |  --- |
| Core | Lista Criptovalute | Visualizzazione delle top 100 criptovalute per capitalizzazione con prezzo, variazione 24h, icona |
| --- |  --- |  --- |
| Core | Dettaglio Moneta | Pagina dedicata con grafico storico (7/30/90 giorni), statistiche complete, descrizione |
| Core | Ricerca | Barra di ricerca con autocompletamento per trovare criptovalute per nome o simbolo |
| Avanzato | Portfolio | Gestione portfolio personale con aggiunta transazioni e calcolo valore totale |
| Avanzato | Preferiti | Lista watchlist con notifiche (simulate) per variazioni significative di prezzo |

*Tabella 3: Funzionalità CryptoTracker organizzate per priorità*

4.2 Progetto B: PokeDex - Enciclopedia Pokemon
----------------------------------------------

### 4.2.1 Descrizione Generale

PokeDex è un'applicazione che funge da enciclopedia interattiva dei Pokemon, permettendo agli utenti di esplorare l'universo Pokemon attraverso la visualizzazione di schede dettagliate, ricerca avanzata, e confronto tra diverse creature. Il progetto è particolarmente adatto come primo approccio allo sviluppo MAUI AI-assistito perché l'API utilizzata (PokeAPI) è completamente gratuita, senza limiti di richieste, e i dati restituiti hanno una struttura ben definita e documentata. Questo permette agli studenti di concentrarsi sull'implementazione dell'interfaccia utente e sulla gestione dei dati senza preoccuparsi di limitazioni delle API.

### 4.2.2 API Reference: PokeAPI

PokeAPI (https://pokeapi.co/) è un'API REST pubblica e gratuita che fornisce dati strutturati sull'universo Pokemon. Non richiede autenticazione e non ha limiti di richieste, rendendola ideale per scopi didattici. Gli endpoint principali includono /pokemon per la lista paginata dei Pokemon, /pokemon/{id or name} per i dettagli di un singolo Pokemon, /type per i tipi elementali, e /generation per raggruppamenti per generazione. La API restituisce dati JSON con informazioni su statistiche, abilità, mosse, sprite e molto altro.

### 4.2.3 Funzionalità Richieste

| **Priorità** | **Funzionalità** | **Descrizione** |
| --- |  --- |  --- |
| Core | Lista Pokemon | Griglia/Lista scrollabile con caricamento lazy loading e infinite scroll |
| --- |  --- |  --- |
| Core | Scheda Dettaglio | Pagina con immagine, statistiche (HP, Attack, Defense...), tipi, abilità |
| Core | Filtri e Ricerca | Filtro per tipo, generazione, ricerca per nome con risultati live |
| Avanzato | Confronto Pokemon | Modalità confronto affiancato di due Pokemon con grafici radar per statistiche |
| Avanzato | Team Builder | Creazione e salvataggio di team personalizzati con analisi copertura tipi |

*Tabella 4: Funzionalità PokeDex organizzate per priorità*

4.3 Progetto C: MovieExplorer - Catalogo Film e Serie TV
--------------------------------------------------------

### 4.3.1 Descrizione Generale

MovieExplorer è un'applicazione che permette agli utenti di esplorare il mondo del cinema e delle serie TV attraverso un'interfaccia moderna e intuitiva. L'applicazione si connette a TMDB (The Movie Database), una delle più complete banche dati di contenuti multimediali, per fornire informazioni su film, serie TV, attori e recensioni. Il progetto introduce concetti avanzati come la gestione di immagini remote, la paginazione di contenuti, e l'implementazione di funzionalità social come liste personalizzate e valutazioni locali.

### 4.3.2 API Reference: TMDB

TMDB API (https://developers.themoviedb.org/3) richiede una registrazione gratuita per ottenere una chiave API. Il piano gratuito permette fino a 40 richieste ogni 10 secondi, adeguato per un'applicazione didattica con caching appropriato. Gli endpoint principali includono /movie/popular e /tv/popular per i contenuti di tendenza, /search/multi per la ricerca unificata, /movie/{id} e /tv/{id} per i dettagli completi, e /discover per query avanzate con filtri per genere, anno, rating.

### 4.3.3 Funzionalità Richieste

| **Priorità** | **Funzionalità** | **Descrizione** |
| --- |  --- |  --- |
| Core | Homepage | Sezioni per film/serie popolari, in arrivo, top rated con carousel orizzontali |
| --- |  --- |  --- |
| Core | Scheda Contenuto | Dettagli con poster, trama, cast, trailer YouTube, recensioni |
| Core | Ricerca Avanzata | Ricerca con filtri per genere, anno, lingua, ordinamento per rating/popularità |
| Avanzato | Watchlist | Gestione liste personalizzate (da vedere, visti, preferiti) salvate localmente |
| Avanzato | Scheda Attore | Biografia attore con filmografia ordinata cronologicamente |

*Tabella 5: Funzionalità MovieExplorer organizzate per priorità*

4.4 Progetto D: NASA Space Explorer
-----------------------------------

### 4.4.1 Descrizione Generale

NASA Space Explorer è un'applicazione educativa che permette agli utenti di esplorare lo spazio attraverso i dati e le immagini fornite dalle diverse missioni NASA. L'applicazione offre accesso all'Astronomy Picture of the Day, alle foto dei rover su Marte, ai dati degli asteroidi near-Earth, e molto altro. Questo progetto rappresenta la maggiore complessità tra quelli proposti, introducendo la gestione di multiple API con strutture dati diverse, il caching intelligente per minimizzare le chiamate di rete, e la visualizzazione di dati scientifici.

### 4.4.2 API Reference: NASA APIs

Le NASA APIs (https://api.nasa.gov/) sono un insieme di servizi REST gratuiti che richiedono una chiave API ottenibile istantaneamente tramite registrazione sul portale. La chiave demo permette 30 richieste all'ora, mentre la chiave personale aumenta il limite a 1000 richieste orarie. Gli endpoint principali includono APOD (Astronomy Picture of the Day) per l'immagine astronomica giornaliera con spiegazione, Mars Rover Photos per le immagini scattate dai rover su Marte, NeoWs (Near Earth Object Web Service) per i dati sugli asteroidi, e EPIC per le immagini della Terra dallo spazio.

### 4.4.3 Funzionalità Richieste

| **Priorità** | **Funzionalità** | **Descrizione** |
| --- |  --- |  --- |
| Core | APOD Gallery | Visualizzazione APOD giornaliera con archivio navigabile per data |
| --- |  --- |  --- |
| Core | Mars Rover | Galleria foto dai rover con selezione per data e tipo di camera |
| Core | Asteroid Tracker | Lista asteroidi near-Earth con dimensioni, distanza, velocità, pericolosità |
| Avanzato | Earth Images | Immagini Earth Polychromatic Imaging Camera con visualizzazione data |
| Avanzato | Favorites & Cache | Salvataggio preferiti e caching intelligente per ottimizzare le chiamate API |

*Tabella 6: Funzionalità NASA Space Explorer organizzate per priorità*

5\. Fase di Design e Prototipazione
===================================

5.1 Utilizzo di Google Stitch per Mockup AI-Generated
-----------------------------------------------------

Google Stitch rappresenta uno strumento innovativo per la generazione di mockup UI partendo da descrizioni testuali. Nel contesto dello sviluppo spec-driven, questo strumento permette di trasformare le specifiche funzionali in rappresentazioni visive prima di passare all'implementazione. Il workflow consigliato prevede di descrivere la schermata desiderata usando un linguaggio naturale dettagliato, generare multiple alternative di design, selezionare e raffinare la soluzione più adatta, e utilizzare il mockup come riferimento durante l'implementazione MAUI.

### 5.1.1 Processo di Generazione Mockup

Per generare mockup efficaci con Google Stitch:

1.      Preparare una descrizione dettagliata della schermata includendo layout, componenti, colori e interazioni

2.      Specificare il contesto mobile (Android/iOS) e le dimensioni tipiche di uno smartphone

3.      Includere riferimenti a pattern di design MAUI (Shell, TabBar, NavigationPage)

4.      Richiedere multiple alternative per confrontare diverse soluzioni stilistiche

5.      Esportare il mockup selezionato come riferimento per l'implementazione

5.2 Traduzione da Mockup a XAML
-------------------------------

La traduzione di un mockup in codice XAML MAUI richiede un approccio sistematico. Partendo dall'immagine del mockup, si identifica la struttura gerarchica dei layout necessari, tipicamente una combinazione di Grid per il posizionamento preciso e StackLayout per raggruppamenti logici. Successivamente si definiscono le risorse necessarie come colori, stili e template. Infine si implementa il data binding per rendere l'interfaccia dinamica e reattiva ai dati dell'applicazione. L'AI può assistere significativamente in questa fase, ma la comprensione dei principi di layout MAUI rimane fondamentale per validare e perfezionare il codice generato.

6\. Deployment e Distribuzione
==============================

6.1 Deployment su Google Play Store
-----------------------------------

Il deployment su Google Play Store rappresenta il canale di distribuzione principale per le applicazioni Android sviluppate con MAUI. Il processo richiede la creazione di un account sviluppatore Google (costo una tantum di 25 USD), la preparazione del package in formato AAB (Android App Bundle), e il completamento di tutti i requisiti del store inclusi screenshot, descrizioni e policy sulla privacy. La documentazione ufficiale Microsoft fornisce una guida dettagliata per la pubblicazione di applicazioni MAUI su Google Play Store.

### 6.1.1 Preparazione del Package Android

Per preparare un'applicazione MAUI per il deployment Android:

1.      Configurare il file MauiProgram.cs con le impostazioni di release

2.      Impostare la versione e il version code nel file di progetto .csproj

3.      Generare un keystore per la firma dell'applicazione

4.      Configurare la firma nel file di progetto o tramite Visual Studio

5.      Compilare in modalità Release per generare l'AAB

6.      Testare il package su dispositivi reali prima della sottomissione

6.2 Deployment su Apple App Store (iOS)
---------------------------------------

Il deployment su iOS richiede un ambiente di sviluppo Mac con Xcode e un account Apple Developer (costo annuale di 99 USD). Il processo è più complesso rispetto ad Android e richiede la gestione dei profili di provisioning, dei certificati di sviluppo e distribuzione, e il rispetto delle linee guida rigorose di Apple. Per gli studenti che hanno accesso alla toolchain macOS, questo rappresenta un'opportunità preziosa per comprendere le differenze tra gli ecosistemi mobili.

6.3 Distribuzione Diretta (Sideloading)
---------------------------------------

Per scopi didattici e di testing, la distribuzione diretta mediante file APK (Android) rappresenta un'alternativa valida alla pubblicazione sugli store. Questo metodo permette di condividere l'applicazione direttamente con altri utenti senza passare attraverso i processi di revisione degli store ufficiali. È importante notare che la distribuzione diretta richiede che gli utenti abilitino l'installazione da fonti sconosciute nelle impostazioni di sicurezza del dispositivo Android.

7\. Guide Passo-Passo per i Progetti
====================================

7.1 Guida Progetto CryptoTracker
--------------------------------

Il seguente workflow descrive il processo di sviluppo completo per CryptoTracker:

### Iterazione 1: Setup e Architettura Base

1.      Creare il progetto MAUI con template Shell e configurare la struttura cartelle

2.      Definire i modelli dati (Cryptocurrency, MarketData, PortfolioItem)

3.      Implementare CoinGeckoService con HttpClient per le chiamate API

4.      Configurare la dependency injection in MauiProgram.cs

5.      Creare la struttura di navigazione con TabBar (Market, Search, Portfolio)

### Iterazione 2: Lista Criptovalute

1.      Implementare CryptocurrenciesViewModel con ObservableProperty e ICommand

2.      Creare CryptocurrencyListItemTemplate come DataTemplate riutilizzabile

3.      Implementare la CollectionView con virtualizzazione e pull-to-refresh

4.      Aggiungere indicatori di variazione prezzo con colori dinamici

5.      Testare il caricamento dati e gestire errori di connessione

### Iterazione 3: Dettaglio e Grafici

1.      Creare DetailPage con navigazione parametrizzata via Shell

2.      Implementare il grafico storico usando LiveCharts2 o Microcharts

3.      Aggiungere selettori per periodo temporale (7, 30, 90 giorni)

4.      Visualizzare statistiche complete con layout Grid organizzato

5.      Implementare il caching delle immagini per performance

### Iterazione 4: Portfolio e Finalizzazione

1.      Implementare PortfolioDatabase con SQLite per persistenza locale

2.      Creare UI per aggiunta/modifica/rimozione transazioni

3.      Calcolare valore totale portfolio e variazione giornaliera

4.      Implementare tema chiaro/scuro con AppThemeBinding

5.      Test finale, bug fixing e ottimizzazione performance

8\. Griglia di Valutazione
==========================

La valutazione dei progetti sviluppati con assistenza AI richiede un approccio multidimensionale che tenga conto non solo del prodotto finale, ma anche del processo di sviluppo seguito, della comprensione del codice prodotto, e della capacità di presentare e motivare le scelte effettuate. La seguente griglia di valutazione è strutturata in quattro aree principali, ciascuna con criteri specifici e livelli di performance definiti.

8.1 Criteri di Valutazione
--------------------------

| **Area** | **Peso** | **Descrizione** |
| --- |  --- |  --- |
| Prodotto Finale | 30% | Funzionalità implementate, qualità del codice, user experience, stabilità |
| --- |  --- |  --- |
| Processo di Sviluppo | 25% | Documentazione iterazioni, uso consapevole dell'AI, metodologia spec-driven |
| Comprensione del Codice | 25% | Capacità di spiegare, modificare e debuggare il codice prodotto |
| Presentazione | 20% | Qualità della demo, capacità argomentative, risposta alle domande |

*Tabella 7: Aree di valutazione e relativi pesi*

8.2 Rubrica di Valutazione Dettagliata
--------------------------------------

### 8.2.1 Area: Prodotto Finale (30%)

| **Voto** | **Descrizione** | **Indicatori** |
| --- |  --- |  --- |
| 9-10 | Eccellente: tutte le funzionalità core e avanzate implementate correttamente | UI professionale, zero crash, performance ottimali, extra features |
| --- |  --- |  --- |
| 7-8 | Buono: tutte le funzionalità core implementate, qualche funzionalità avanzata | UI curata, stabilità generale, qualche problema minore di performance |
| 6 | Sufficiente: funzionalità core base implementate con alcuni limiti | UI funzionale, qualche bug non critico, performance accettabili |
| <6 | Insufficiente: funzionalità core mancanti o gravemente incomplete | UI confusa, crash frequenti, problemi architetturali significativi |

*Tabella 8: Rubrica valutazione Prodotto Finale*

### 8.2.2 Area: Processo di Sviluppo (25%)

| **Voto** | **Descrizione** | **Indicatori** |
| --- |  --- |  --- |
| 9-10 | Eccellente: metodologia spec-driven seguita rigorosamente con documentazione completa | Specs dettagliate, log iterazioni, review documentate, uso critico AI |
| --- |  --- |  --- |
| 7-8 | Buono: metodologia seguita con documentazione adeguata | Specs presenti, log parziale, uso appropriato ma non sempre critico dell'AI |
| 6 | Sufficiente: documentazione minima ma presente | Specs sommarie, dipendenza dall'AI con poca revisione critica |
| <6 | Insufficiente: processo non documentato o completamente assente | Nessuna specifica, vibe coding senza struttura, AI usata acriticamente |

*Tabella 9: Rubrica valutazione Processo di Sviluppo*

### 8.2.3 Area: Comprensione del Codice (25%)

Questa area viene valutata attraverso un colloquio tecnico individuale dove lo studente deve dimostrare di comprendere il codice prodotto. Le domande possono riguardare la spiegazione di specifiche sezioni di codice, la modifica di funzionalità esistenti su richiesta del docente, l'identificazione e correzione di bug introdotti appositamente, e la discussione di alternative implementative e relativi trade-off.

| **Voto** | **Descrizione** | **Indicatori** |
| --- |  --- |  --- |
| 9-10 | Eccellente: comprensione profonda di tutto il codice, capacità di estensione | Spiega ogni parte, modifica correttamente, propone alternative motivate |
| --- |  --- |  --- |
| 7-8 | Buono: comprensione generale con alcune aree di approfondimento | Spiega la maggior parte, modifica con qualche difficoltà, conosce le alternative |
| 6 | Sufficiente: comprensione di base delle parti principali | Spiega le parti principali, difficoltà nelle modifiche, conoscenza limitata |
| <6 | Insufficiente: comprensione lacunosa o assente | Non spiega il codice, non riesce a modificare, sembra non aver scritto il codice |

*Tabella 10: Rubrica valutazione Comprensione del Codice*

### 8.2.4 Area: Presentazione (20%)

La presentazione del progetto costituisce un momento fondamentale per la valutazione complessiva. Lo studente deve dimostrare di saper comunicare efficacemente il lavoro svolto, illustrando le scelte architetturali, le difficoltà incontrate e le soluzioni adottate. La presentazione deve includere una demo funzionante dell'applicazione, l'illustrazione del processo di sviluppo seguito, e la risposta a domande tecniche poste dal docente.

| **Voto** | **Descrizione** | **Indicatori** |
| --- |  --- |  --- |
| 9-10 | Eccellente: presentazione professionale, demo fluida, risposte precise | Esposizione chiara, gestione imprevisti, approfondimenti spontanei |
| --- |  --- |  --- |
| 7-8 | Buono: presentazione organizzata, demo funzionante, risposte adeguate | Esposizione coerente, qualche incertezza nelle risposte |
| 6 | Sufficiente: presentazione essenziale ma completa | Demo funzionante, difficoltà nel rispondere a domande complesse |
| <6 | Insufficiente: presentazione disorganizzata o incompleta | Demo problematica, incapacità di rispondere a domande base |

*Tabella 11: Rubrica valutazione Presentazione*

9\. Riferimenti e Risorse
=========================

9.1 Documentazione Ufficiale
----------------------------

-         Microsoft .NET MAUI Documentation: https://learn.microsoft.com/dotnet/maui/

-         GitHub Copilot Documentation: https://docs.github.com/copilot/

-         Community Toolkit MAUI: https://learn.microsoft.com/dotnet/communitytoolkit/maui/

-         MVVM Community Toolkit: https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/

9.2 API Utilizzate nei Progetti
-------------------------------

-         CoinGecko API: https://www.coingecko.com/api/documentation

-         PokeAPI: https://pokeapi.co/docs/v2

-         TMDB API: https://developers.themoviedb.org/3

-         NASA APIs: https://api.nasa.gov/

-         Open-Meteo API: https://open-meteo.com/en/docs

9.3 Risorse Aggiuntive per lo Sviluppo AI-Assistito
---------------------------------------------------

-         GitHub Skills - Copilot: https://skills.github.com/

-         Prompt Engineering Guide: https://www.promptingguide.ai/

-         OpenAI Best Practices: https://platform.openai.com/docs/guides/prompt-engineering

-         Microsoft Learn - AI Development: https://learn.microsoft.com/ai/

9.4 Librerie e Componenti MAUI Raccomandati
-------------------------------------------

-         LiveCharts2: https://livecharts.dev/docs/maui/2.0.0-rc2/overview

-         Microcharts.Maui: https://github.com/microcharts-dotnet/Microcharts

-         Mopups (Popups): https://github.com/LuckyDucko/Mopups

-         Plugin.Maui.Audio: https://github.com/jfversluis/Plugin.Maui.Audio

-         Camera.MAUI: https://github.com/hjam40/Camera.MAUI