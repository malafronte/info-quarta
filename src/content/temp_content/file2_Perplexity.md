# Guida allo sviluppo assistito da AI di applicazioni .NET MAUI

## Introduzione

Questo modulo affronta lo sviluppo di una applicazione completa in .NET MAUI con il supporto di strumenti di AI generativa e agentica.  
L’obiettivo non è delegare la realizzazione del progetto a un sistema automatico, ma imparare a guidare l’AI in modo controllato, tracciabile e verificabile.

L’approccio adottato è di tipo **spec-driven**.  
Ciò significa che ogni iterazione di lavoro parte da specifiche esplicite, passa attraverso un piano operativo e produce modifiche limitate, controllate e testate.

## Presupposti

Il percorso si inserisce dopo un corso introduttivo che ha già affrontato i fondamenti di .NET MAUI, l’uso di XAML, i layout, le risorse condivise, la navigazione con Shell, la persistenza locale, il data binding, i temi, i permessi e l’analisi di sample ufficiali Microsoft [file:1].  
Il nuovo modulo estende quindi un impianto già esistente e non sostituisce i fondamenti acquisiti [file:1].

## Obiettivi del modulo

Al termine del modulo il progetto sviluppato dovrebbe mostrare la capacità di:

- definire specifiche realistiche;
- pianificare il lavoro in iterazioni;
- usare l’AI per generare e rivedere codice senza rinunciare al controllo umano;
- integrare API esterne, persistenza locale e navigazione;
- documentare il percorso;
- preparare una versione finale installabile e dimostrabile.

## L’idea chiave: AI come supporto, non come sostituto

Uno strumento AI può produrre codice plausibile in pochi secondi, ma non garantisce automaticamente correttezza, coerenza architetturale, sicurezza, qualità della UX o affidabilità del risultato finale.  
Per questo motivo il ruolo umano rimane centrale in tutte le fasi: definizione del problema, controllo delle scelte, review del codice, validazione dei test e presentazione del progetto.

L’uso corretto dell’AI in questo modulo si basa su quattro principi:

- contesto chiaro;
- richieste precise;
- iterazioni brevi;
- verifica continua.

## Strumenti disponibili

Gli strumenti previsti nel modulo comprendono:

- GitHub Copilot Pro per studenti;
- Visual Studio 2026;
- Visual Studio Code;
- OpenCode con supporto a regole e skills;
- eventuali marketplace o provider di modelli aggiuntivi come Ollama Cloud, KiloCode e ZenCode.

La documentazione ufficiale di Visual Studio descrive GitHub Copilot come componente integrato nell’ambiente di sviluppo per assistenza alla programmazione, completamento e supporto conversazionale [web:12].  
La panoramica ufficiale di VS Code descrive Copilot anche come agente capace di pianificare, scrivere e verificare modifiche sul progetto, con possibilità di inizializzare contesto e istruzioni [web:18].  
La documentazione di OpenCode presenta il sistema come agente di coding utilizzabile da terminale, desktop o editor, e indica `AGENTS.md` come file principale per le regole di progetto [web:13][web:16].

## Approccio spec-driven

### Definizione

Per sviluppo spec-driven si intende un processo in cui il codice non viene richiesto all’AI in modo diretto e indistinto, ma sempre a partire da una specifica.  
La specifica stabilisce cosa deve fare il sistema, con quali limiti, per quali utenti e con quali criteri di accettazione.

### Vantaggi

Questo approccio offre diversi vantaggi:

- riduce il rischio di modifiche casuali o incoerenti;
- facilita la revisione del lavoro;
- consente di documentare il processo;
- rende più facile il testing;
- aiuta a mantenere il controllo del progetto anche quando l’AI produce molto codice.

### Rischi evitati

Lo sviluppo non guidato può portare rapidamente a:

- file generati senza struttura;
- dipendenze inutili;
- naming incoerente;
- logica dispersa tra View e code-behind;
- regressioni difficili da spiegare;
- impossibilità di motivare le scelte in sede di valutazione.

## Modello operativo: human in the loop

Il modello di lavoro adottato è di tipo **human in the loop**.  
In questo schema l’AI non opera da sola, ma interviene dentro una pipeline controllata.

### Ciclo di una iterazione

Ogni iterazione dovrebbe seguire cinque fasi:

1. **Planning**  
   Viene definito l’obiettivo dell’iterazione e viene richiesto all’AI un piano breve e motivato.

2. **Build**  
   Vengono implementate soltanto le modifiche necessarie per quella iterazione.

3. **Review**  
   Il codice generato viene letto, confrontato con la specifica e corretto se necessario.

4. **Testing**  
   La feature viene verificata con casi di test normali e casi limite.

5. **Documentazione**  
   Si aggiornano il log di iterazione, i file di specifica e la traccia dei prompt significativi.

## Struttura documentale del progetto

Per mantenere il progetto ordinato è consigliata una struttura minima come la seguente:

```text
ProjectRoot/
├─ AGENTS.md
├─ README.md
├─ docs/
│  ├─ spec.md
│  ├─ plan.md
│  ├─ architecture.md
│  ├─ test-matrix.md
│  ├─ prompt-log.md
│  ├─ deployment.md
│  └─ iterations/
│     ├─ it-01.md
│     ├─ it-02.md
│     └─ it-03.md
├─ src/
│  ├─ Models/
│  ├─ Services/
│  ├─ ViewModels/
│  ├─ Views/
│  ├─ Resources/
│  └─ Platforms/
└─ assets/
   ├─ mockups/
   ├─ screenshots/
   └─ store/

File obbligatori
docs/spec.md
La specifica dovrebbe contenere almeno:

obiettivo del progetto;

utente target;

funzionalità obbligatorie;

funzionalità opzionali;

requisiti non funzionali;

API esterne;

vincoli;

criteri di accettazione.

Esempio:

text
# Specifica

## Obiettivo
Descrivere il problema che l'applicazione risolve.

## Utente target
Indicare chi userà l'app e in quale contesto.

## Funzionalità obbligatorie
- ...
- ...
- ...

## Requisiti non funzionali
- UI responsiva
- gestione errori
- supporto Android
- persistenza locale minima

## API esterne
- Nome API
- endpoint principali
- formato dati
- limiti noti

## Criteri di accettazione
- Dato ...
- Quando ...
- Allora ...
docs/plan.md
Il piano dovrebbe contenere:

architettura prevista;

suddivisione del lavoro in iterazioni;

rischi principali;

definition of done.

docs/prompt-log.md
Questo file serve a documentare i prompt davvero significativi e le decisioni prese in seguito.
Non è una semplice cronologia completa della chat, ma una selezione ragionata dei prompt che hanno influito sul progetto.

docs/test-matrix.md
La matrice di test serve a dimostrare che il progetto non è stato soltanto costruito, ma anche verificato.

Architettura consigliata
MVVM
Nel contesto di un progetto MAUI introduttivo, l’architettura consigliata è MVVM.
Questo approccio aiuta a separare interfaccia, stato e logica applicativa e rende più semplice lavorare sia con l’AI sia con la revisione manuale.

Separazione delle responsabilità
Una possibile convenzione è la seguente:

Views/ per le pagine XAML;

ViewModels/ per stato, comandi e logica di presentazione;

Services/ per API REST, persistenza locale, preferenze, sensori o servizi di piattaforma;

Models/ per DTO e modelli interni.

Navigazione
Nel syllabus del corso la navigazione con Shell è trattata come riferimento principale, mentre alcune forme di navigazione ereditate da Xamarin sono esplicitamente sconsigliate in presenza di Shell [file:1].
Per questo motivo, salvo necessità particolari, è opportuno basare la navigazione del progetto su Shell e su route chiare e documentate [file:1].

Fase 1 – Analisi e definizione delle specifiche
Prima di scrivere codice, occorre chiarire:

problema da risolvere;

profilo dell’utente;

schermate necessarie;

flussi di navigazione;

API da usare;

dati da salvare localmente;

possibili errori o vincoli.

Domande guida
Qual è il valore principale dell’app?

Quali sono le tre funzionalità senza le quali il progetto non avrebbe senso?

Quali dati arrivano dall’esterno?

Quali dati devono restare sul dispositivo?

Quali permessi servono?

L’app deve funzionare parzialmente anche offline?

Quale sarà la demo finale?

Uso dell’AI in questa fase
L’AI può essere usata per:

trasformare un’idea grezza in user story;

suggerire casi limite;

proporre struttura iniziale delle cartelle;

generare una bozza di specifica;

verificare la completezza della checklist.

Prompt esempio:

text
Analizzare l'idea di una app MAUI chiamata BookScout Mobile.
Restituire:
1) obiettivo,
2) utente target,
3) 5 user story,
4) requisiti non funzionali,
5) rischi principali.
Non generare codice.
Fase 2 – Design e mockup
La progettazione della UI dovrebbe precedere l’implementazione.
Una schermata anche semplice dovrebbe essere pensata in termini di gerarchia visiva, leggibilità, spaziatura, stati e coerenza.

Attività consigliate
elenco delle schermate;

bozza di navigazione;

wireframe a bassa fedeltà;

definizione di palette e stile base;

scelta dei componenti MAUI realistici.

Uso di strumenti AI per il design
Possono essere usati strumenti generativi per creare bozze di interfaccia o mockup, purché il risultato sia poi reinterpretato in modo realistico per MAUI.
Un mockup non deve essere copiato ciecamente: deve essere tradotto in layout, Grid, StackLayout, CollectionView, stili e risorse compatibili con l’applicazione reale.

Mini style guide consigliata
un colore primario;

un colore secondario;

un set coerente di margini e padding;

uno stile per pulsanti;

uno stile per card;

supporto al tema chiaro/scuro.

Nel syllabus del corso sono già presenti riferimenti a stili, risorse condivise, theming e gestione dei temi a runtime, con esempi basati su documentazione Microsoft e sample MAUI [file:1].
Ciò rende naturale includere anche nel progetto finale una piccola style guide coerente con tema chiaro e scuro [file:1].

Fase 3 – Pianificazione iterativa
Una volta definita la specifica, il lavoro deve essere diviso in iterazioni piccole.
Ogni iterazione deve avere un obiettivo verificabile in modo netto.

Esempio di roadmap
Setup progetto, cartelle, Shell e pagina iniziale.

Integrazione della prima API.

Visualizzazione dei dati in UI.

Persistenza locale.

Gestione errori e stati della UI.

Rifinitura, test finali e packaging.

Definition of Done di una iterazione
Una iterazione può essere considerata completata quando:

il codice compila;

la feature prevista è disponibile;

la review è stata eseguita;

i test minimi sono stati fatti;

la documentazione è stata aggiornata.

Prompt esempio per la pianificazione
text
Proporre un piano di lavoro in 6 iterazioni per una app MAUI Android.
Vincoli:
- architettura MVVM;
- navigazione Shell;
- persistenza locale minima;
- niente backend custom.
Restituire solo il piano, senza codice.
Fase 4 – Uso di GitHub Copilot
La documentazione ufficiale di Visual Studio e quella di VS Code mostrano che Copilot non va usato solo come completamento automatico di singole righe, ma può essere impiegato anche per pianificare, spiegare, rifattorizzare e verificare modifiche più ampie [web:12][web:18].
Per ottenere risultati migliori è importante fornire contesto, vincoli e obiettivi limitati [web:12][web:18].

Regole operative
una chat per una feature;

richieste precise;

file o classi chiaramente indicati;

richiesta del piano prima dell’implementazione;

review del diff dopo ogni proposta.

Richieste efficaci
Un buon prompt per Copilot contiene:

contesto del progetto;

file coinvolti;

obiettivo dell’iterazione;

vincoli tecnici;

formato della risposta atteso.

Esempi di prompt
text
Analizzare il progetto MAUI corrente e proporre un piano per aggiungere la gestione dei preferiti.
Vincoli:
- usare MVVM;
- evitare nuove dipendenze;
- non cambiare la navigazione esistente.
Restituire:
1) piano,
2) file da toccare,
3) rischi,
4) test manuali.
text
Scrivere solo il service REST per SearchBooksAsync.
Vincoli:
- usare HttpClient asincrono;
- gestire timeout ed errori;
- non scrivere ancora la View;
- separare DTO e service.
text
Revisionare il file seguente.
Indicare:
- problemi di naming,
- logica mal collocata,
- nullability,
- possibili refactor,
- test suggeriti.
Non riscrivere ancora il codice.
Cosa evitare
prompt del tipo “costruisci tutta l’app completa”;

richieste prive di vincoli;

accettazione immediata del codice proposto;

generazione di più feature insieme;

uso dell’AI senza documentazione del processo.

Fase 5 – Uso di OpenCode
La documentazione di OpenCode indica che il progetto può essere inizializzato con un file AGENTS.md, che serve a fornire regole permanenti all’agente [web:13][web:16].
Lo stesso materiale raccomanda di usare istruzioni contestuali, esempi e richieste progressive invece di prompt monolitici [web:10][web:13][web:16].

Ruolo di AGENTS.md
AGENTS.md dovrebbe contenere:

descrizione del progetto;

convenzioni architetturali;

regole di stile;

limiti sulle dipendenze;

modalità di output richieste all’agente.

Esempio:

text
# AGENTS.md

## Project context
Applicazione .NET MAUI con target principale Android.
Architettura preferita: MVVM.
Navigazione: Shell.
Persistenza locale: Preferences e/o SQLite.

## Rules
- Proporre sempre un piano prima di modifiche ampie.
- Non introdurre librerie non richieste senza motivazione.
- Tenere separati ViewModel e Service.
- Gestire errori di rete e loading state.
- Aggiornare la documentazione di iterazione quando cambia il comportamento.
Prompt esempio per OpenCode
text
Analizzare il progetto e proporre la struttura iniziale.
Obiettivo: app MAUI per Android.
Vincoli:
- usare Shell;
- usare MVVM;
- niente librerie extra non motivate;
- restituire prima solo il piano.
text
Implementare soltanto l'iterazione 2:
- REST service,
- DTO,
- SearchViewModel,
- gestione base di loading ed errori.
Aggiornare anche docs/iterations/it-02.md.
text
Eseguire una review architetturale del progetto.
Segnalare:
- duplicazioni,
- code smell,
- responsabilità non separate,
- punti fragili,
- test mancanti.
Non applicare fix automatici.
Fase 6 – Implementazione del progetto MAUI
Struttura di base consigliata
Il progetto dovrebbe includere almeno:

AppShell.xaml;

una o più pagine principali;

relativi ViewModel;

uno o più servizi dati;

modelli o DTO;

risorse condivise;

eventuale servizio locale per SQLite o Preferences.

Convenzioni utili
nomi chiari e coerenti;

una responsabilità principale per ogni classe;

uso limitato del code-behind;

stato della UI esposto dal ViewModel;

servizi isolati dalla View.

Stato della UI
Ogni pagina che carica dati remoti dovrebbe prevedere almeno:

IsBusy;

ErrorMessage;

HasData;

IsEmptyState.

Questi stati aiutano sia la qualità dell’esperienza utente sia la leggibilità del codice.

Persistenza locale
Nel syllabus del corso sono già presenti riferimenti a Preferences, file system helpers e SQLite come opzioni tipiche per la persistenza in MAUI [file:1].
Per il progetto finale è consigliabile usare almeno una di queste tecniche in modo esplicito e motivato [file:1].

Possibili casi d’uso:

preferiti;

cronologia ricerche;

impostazioni;

cache locale;

dati di quiz o statistiche.

Fase 7 – Testing
Obiettivo
Il testing serve a dimostrare che il progetto non è soltanto compilabile, ma utilizzabile in modo credibile.
Una feature va considerata completata solo dopo una verifica concreta.

Matrice minima di test
Area	Verifiche
Input	campi vuoti, input non valido, input molto lungo
API	successo, errore HTTP, timeout, risposta inattesa
UI	loading, errore, lista vuota, lista lunga
Navigazione	apertura, ritorno, passaggio dati
Persistenza	salvataggio, riapertura, modifica
Device	tema chiaro/scuro, rotazione, permessi negati
Testing con supporto AI
L’AI può aiutare a:

generare checklist di test;

suggerire casi limite;

proporre test unitari per la logica non UI;

analizzare possibili regressioni dopo un refactor.

Prompt esempio:

text
Dato questo ViewModel, proporre:
- 8 casi di test manuale;
- 5 edge case;
- eventuali test unitari utili.
Non generare ancora codice.
Fase 8 – Android e iOS
Il target principale del modulo è Android.
Tuttavia, il progetto può essere pensato in modo da risultare adattabile anche a iOS per chi dispone della toolchain Apple.

Android
Su Android è opportuno verificare sempre:

permessi effettivi richiesti;

comportamento in assenza di rete;

responsività della UI;

qualità delle immagini e delle icone;

corretto funzionamento su emulatore e su device reale.

iOS
Per chi sviluppa anche per iOS, occorre:

verificare i permessi specifici;

controllare il layout sulle dimensioni del dispositivo;

testare le differenze di comportamento di alcuni servizi di piattaforma;

adattare eventuali parti sensibili alla piattaforma.

Fase 9 – Packaging e deployment
La documentazione ufficiale Microsoft specifica che per Android il publishing di una app .NET MAUI produce APK o AAB, e che AAB è il formato previsto per la distribuzione tramite Google Play [web:4][web:5].
La documentazione Microsoft fornisce inoltre indicazioni sia per il publishing generale sia per la pubblicazione via riga di comando, inclusa la firma dell’app e l’uso del keystore [web:4][web:6].

Consegna minima consigliata
repository completo;

APK installabile;

README con istruzioni;

screenshot principali;

documentazione di progetto.

Consegna avanzata
AAB per Google Play;

icone e immagini store;

descrizione breve e lunga;

note sui permessi;

video demo;

privacy note essenziali.

Pubblicazione diretta
Per una distribuzione didattica o interna, la forma più pratica è spesso l’APK firmato.
Questo consente l’installazione diretta sul dispositivo senza passare dallo store.

Pubblicazione su store
Per una simulazione realistica di rilascio è possibile preparare anche un AAB.
Questa opzione è particolarmente utile per comprendere la differenza tra sviluppo, packaging e distribuzione.

Sicurezza e uso corretto dell’AI
Alcune regole devono essere sempre rispettate:

non inserire chiavi API direttamente nel repository pubblico;

non accettare codice generato senza lettura critica;

non usare prompt che espongano dati personali reali;

non presentare come “compreso” codice che non si è in grado di spiegare;

non confondere la rapidità di generazione con la qualità del software.

Errori tipici da evitare
partire dal codice invece che dalla specifica;

chiedere all’AI di sviluppare troppe parti in una sola volta;

mescolare logica, UI e chiamate REST nello stesso file;

non documentare i prompt rilevanti;

testare solo il caso ideale;

trascurare stati di errore e stati vuoti;

ignorare il packaging finale fino agli ultimi minuti.

Modello di iterazione consigliato
text
# Iterazione 03

## Obiettivo
Aggiungere il dettaglio del contenuto selezionato.

## Piano
- creare DetailPage
- creare DetailViewModel
- aggiungere route Shell
- passare l'id dell'elemento
- gestire stato loading

## Prompt principali
- ...
- ...

## File creati o modificati
- ...
- ...

## Test eseguiti
- apertura da lista
- id non valido
- errore API
- ritorno alla pagina precedente

## Problemi trovati
- ...

## Correzioni effettuate
- ...

## Esito
Completato / parziale / da rifinire
Presentazione finale del progetto
La demo finale dovrebbe mostrare:

problema affrontato;

specifica iniziale;

struttura del progetto;

una o due iterazioni significative;

esempio di uso ragionato dell’AI;

demo dell’app;

limiti residui;

possibili evoluzioni.

Una buona presentazione non si limita a dire che “l’app funziona”, ma spiega anche perché il progetto è stato costruito in quel modo.

Conclusione
Lo sviluppo assistito da AI può migliorare in modo significativo la produttività, ma solo se è inserito in un processo rigoroso.
Nel contesto di un progetto MAUI introduttivo, il vero obiettivo non è produrre più codice possibile, ma costruire una applicazione comprensibile, ordinata, verificata e ben presentata.