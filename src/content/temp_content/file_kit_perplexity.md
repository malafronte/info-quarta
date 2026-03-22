Di seguito è riportato un kit completo di file markdown e di configurazione, pronto da copiare nel repository del modulo finale.
L’impianto è coerente con il percorso già svolto su .NET MAUI, che include architettura, XAML, layout, Shell, persistenza locale, data binding, theming e permessi, e con i progetti finali precedenti orientati ad Android, API REST, qualità del codice e attenzione alla user experience.

La scelta di includere sia AGENTS.md sia un file dedicato a Copilot è allineata alla documentazione di OpenCode, che usa AGENTS.md come file di regole del progetto, e alla documentazione di GitHub Copilot in VS Code e Visual Studio, che prevede istruzioni contestuali e uso agentico del contesto di progetto.

La presenza di un template di deployment separato è inoltre coerente con la documentazione Microsoft, che distingue il rilascio Android in APK per installazione diretta e AAB per distribuzione tramite Google Play.

Struttura del kit
Il kit seguente è organizzato come mini-pacchetto documentale completo, con file radice, template per la documentazione tecnica, log di iterazione e materiali per demo e deployment.

text
ProjectRoot/
├─ README.md
├─ AGENTS.md
├─ .github/
│  └─ copilot-instructions.md
├─ docs/
│  ├─ spec.template.md
│  ├─ plan.template.md
│  ├─ architecture.template.md
│  ├─ prompt-log.template.md
│  ├─ test-matrix.template.md
│  ├─ deployment.template.md
│  ├─ demo-script.template.md
│  ├─ api-notes.template.md
│  └─ iterations/
│     └─ it-template.md
File radice
I file radice definiscono il modulo, le regole di progetto e il comportamento atteso degli strumenti AI lungo tutto il ciclo di sviluppo.

README.md
text
# Modulo finale – Sviluppo di una applicazione .NET MAUI completa con supporto AI

## Descrizione

Questo repository raccoglie il materiale operativo per il modulo finale dedicato allo sviluppo assistito da AI di una applicazione completa in .NET MAUI.  
Il target principale del progetto è Android, con possibilità di adattamento a iOS per chi dispone della relativa toolchain.

L’obiettivo del modulo è introdurre una modalità di lavoro **spec-driven**, nella quale l’AI viene usata come supporto alla progettazione, all’implementazione, alla revisione del codice e al testing, senza sostituire il controllo umano.

## Obiettivi formativi

- Definire specifiche funzionali e non funzionali realistiche.
- Pianificare il lavoro in iterazioni brevi e verificabili.
- Usare strumenti AI in modo consapevole.
- Sviluppare una applicazione MAUI completa.
- Integrare API REST e persistenza locale.
- Preparare una consegna tecnica documentata e presentabile.

## Struttura del repository

```text
.
├─ AGENTS.md
├─ README.md
├─ .github/
│  └─ copilot-instructions.md
├─ docs/
│  ├─ spec.md
│  ├─ plan.md
│  ├─ architecture.md
│  ├─ prompt-log.md
│  ├─ test-matrix.md
│  ├─ deployment.md
│  ├─ demo-script.md
│  ├─ api-notes.md
│  └─ iterations/
│     ├─ it-01.md
│     ├─ it-02.md
│     └─ it-03.md
├─ src/
└─ assets/
Flusso di lavoro
Il progetto dovrebbe seguire il ciclo:

definizione della specifica;

pianificazione tecnica;

design preliminare;

sviluppo iterativo con AI;

review del codice;

testing;

packaging e demo finale.

Deliverable minimi
applicazione funzionante;

documentazione di progetto;

log delle iterazioni;

prompt log ragionato;

matrice di test;

APK finale Android;

screenshot principali;

demo finale.

Convenzioni
Architettura consigliata: MVVM.

Navigazione consigliata: Shell.

Persistenza minima: Preferences e/o SQLite.

Gestione degli stati della UI obbligatoria: loading, errore, empty state, dati caricati.

Ogni modifica importante deve essere tracciata nella documentazione.

Ordine di compilazione dei file iniziali
Copiare i template da docs/*.template.md.

Rinominarli senza .template.

Compilare spec.md.

Compilare plan.md.

Preparare AGENTS.md e copilot-instructions.md.

Avviare la prima iterazione documentata.

text

### `AGENTS.md`

```md
# AGENTS.md

## Project context

Questo progetto è una applicazione .NET MAUI con target principale Android.  
L’eventuale supporto iOS è opzionale e secondario.

L’obiettivo didattico non è la generazione rapida di codice, ma lo sviluppo controllato e documentato di una applicazione completa.

## Technical preferences

- Framework UI: .NET MAUI
- Architettura preferita: MVVM
- Navigazione preferita: Shell
- Persistenza locale: Preferences e/o SQLite
- Chiamate remote: HttpClient
- Parsing dati: JSON
- Focus: robustezza, leggibilità, coerenza del codice

## Rules

- Proporre sempre un piano prima di modifiche ampie.
- Limitare ogni iterazione a una feature ben definita.
- Non introdurre nuove librerie senza motivazione esplicita.
- Non spostare logica nei code-behind se può stare in un ViewModel o in un Service.
- Gestire sempre loading state, error state ed empty state.
- Non rimuovere codice esistente senza spiegazione.
- Evitare duplicazioni inutili.
- Preferire nomi chiari e coerenti.
- Aggiornare la documentazione quando cambia il comportamento del progetto.
- Non generare grandi blocchi di codice non richiesti.
- Indicare sempre rischi, dipendenze e test suggeriti.

## Documentation policy

Quando viene implementata una feature significativa, aggiornare almeno uno tra:

- docs/spec.md
- docs/plan.md
- docs/iterations/it-xx.md
- docs/test-matrix.md

## Output format preferred

Per ogni richiesta importante restituire:

1. piano breve;
2. file da creare o modificare;
3. implementazione richiesta;
4. rischi o punti da controllare;
5. test manuali suggeriti.

## Coding style

- classi piccole e con responsabilità chiara;
- servizi separati dai ViewModel;
- ViewModel con proprietà di stato esplicite;
- metodi asincroni dove appropriato;
- gestione degli errori non silenziosa;
- commenti solo quando davvero utili.

## Anti-patterns to avoid

- logica REST dentro la View;
- gestione confusa della navigazione;
- campi e proprietà con naming incoerente;
- dipendenze aggiunte senza controllo;
- refactor troppo ampi in una sola iterazione;
- codice non spiegabile dagli autori del progetto.
.github/copilot-instructions.md
text
# Copilot Instructions

## Scopo

Questo repository è usato per un progetto didattico .NET MAUI con sviluppo assistito da AI.  
Le risposte devono supportare uno sviluppo spec-driven e documentato.

## Regole di comportamento

- Prima di generare codice, proporre un piano sintetico.
- Non implementare più di una feature significativa per volta.
- Rispettare l’architettura MVVM.
- Usare Shell per la navigazione, salvo esplicita richiesta diversa.
- Evitare di introdurre pacchetti o framework non richiesti.
- Tenere separati View, ViewModel, Model e Service.
- Gestire stati di caricamento, errore e dati vuoti.
- Segnalare eventuali rischi di regressione.

## Formato preferito delle risposte

Per richieste tecniche importanti, restituire:

1. Obiettivo.
2. Piano.
3. File coinvolti.
4. Codice richiesto.
5. Test da eseguire.
6. Possibili problemi.

## Limiti

- Non riscrivere l’intera applicazione se viene richiesto un intervento locale.
- Non aggiungere codice non necessario.
- Non rimuovere funzionalità esistenti senza motivazione.
- Non ignorare nullability, error handling e async/await.

## Convenzioni del progetto

- Target principale: Android.
- UI: XAML.
- Architettura: MVVM.
- REST: HttpClient.
- Storage locale: Preferences e/o SQLite.
- Design: semplice, leggibile, mobile-first.

## Esempi di richieste ben formate

- "Proporre il piano per aggiungere la pagina dei preferiti."
- "Implementare solo il service REST."
- "Revisionare questo ViewModel senza riscriverlo."
- "Generare i test manuali per questa feature."

## Esempi di richieste da evitare

- "Costruire tutta l’app completa."
- "Rifare tutto meglio."
- "Aggiungere qualsiasi libreria utile."
- "Sistemare tutto il progetto."
Template documentali
Questi template permettono di avviare il progetto in modo uniforme e rendono più semplice valutare sia il prodotto finale sia il processo, in linea con l’attenzione già presente nel corso verso funzionalità, UX, correttezza e organizzazione del lavoro.

docs/spec.template.md
text
# Specifica del progetto

## Titolo del progetto

Nome dell’applicazione.

## Descrizione sintetica

Descrizione breve del problema che l’app risolve.

## Utente target

Descrivere:
- chi usa l’app;
- in quale contesto;
- con quale obiettivo.

## Problema affrontato

Spiegare il bisogno concreto a cui l’app risponde.

## Obiettivi del progetto

- O1
- O2
- O3

## Funzionalità obbligatorie

- F1
- F2
- F3
- F4

## Funzionalità opzionali

- O1
- O2
- O3

## Requisiti non funzionali

- UI leggibile e coerente
- Gestione errori
- Responsività
- Persistenza locale minima
- Compatibilità Android
- Codice ordinato e manutenibile

## Schermate principali

| Schermata | Scopo | Dati mostrati | Azioni possibili |
|---|---|---|---|
| Home |  |  |  |
| Search |  |  |  |
| Detail |  |  |  |
| Settings |  |  |  |

## Navigazione prevista

Descrivere il flusso tra le schermate.

## API esterne

| API | Scopo | Endpoint principali | Autenticazione | Limiti noti |
|---|---|---|---|---|
|  |  |  |  |  |

## Dati locali

Indicare quali dati verranno salvati localmente:
- preferiti;
- cronologia;
- impostazioni;
- cache;
- note;
- statistiche.

## Permessi richiesti

- Nessuno / rete
- Posizione
- Fotocamera
- Galleria
- Altro

## Vincoli

- tempo disponibile;
- complessità massima;
- niente backend custom;
- target principale Android.

## Criteri di accettazione

- Dato ...
- Quando ...
- Allora ...

## Casi limite da considerare

- input vuoto;
- rete assente;
- risposta API incompleta;
- dati duplicati;
- permesso negato.

## Rischi principali

- R1
- R2
- R3

## Versione MVP

Descrivere con precisione il prodotto minimo considerato sufficiente.
docs/plan.template.md
text
# Piano di lavoro

## Titolo del progetto

Nome dell’applicazione.

## Obiettivo del piano

Descrivere come si intende trasformare la specifica in un progetto sviluppabile.

## Architettura prevista

- MVVM
- Shell
- Services per API e storage
- DTO / Models separati
- Eventuale SQLite o Preferences

## Struttura prevista delle cartelle

```text
src/
├─ Models/
├─ Services/
├─ ViewModels/
├─ Views/
├─ Resources/
└─ Platforms/
Dipendenze previste
Dipendenza	Motivo	Obbligatoria / opzionale
Iterazioni previste
Iterazione 1
Obiettivo:
File coinvolti:
Risultato atteso:

Iterazione 2
Obiettivo:
File coinvolti:
Risultato atteso:

Iterazione 3
Obiettivo:
File coinvolti:
Risultato atteso:

Iterazione 4
Obiettivo:
File coinvolti:
Risultato atteso:

Iterazione 5
Obiettivo:
File coinvolti:
Risultato atteso:

Rischi tecnici
API non disponibile

JSON inatteso

UI troppo complessa

tempi stretti di rifinitura

problemi con permessi o device

Strategia di testing
test manuale su feature singole;

casi limite;

test finale end-to-end;

eventuali test automatici su logica non UI.

Strategia di documentazione
Dopo ogni iterazione aggiornare:

docs/iterations/it-xx.md

docs/prompt-log.md

docs/test-matrix.md, se necessario

Definition of Done
Una iterazione si considera conclusa quando:

il codice compila;

la feature è testata;

la documentazione minima è aggiornata;

il codice è stato revisionato;

i prompt importanti sono stati tracciati.

text

### `docs/architecture.template.md`

```md
# Architettura del progetto

## Obiettivo

Descrivere l’organizzazione tecnica dell’applicazione.

## Pattern architetturale

Indicare il pattern usato, ad esempio:
- MVVM

## Componenti principali

| Componente | Responsabilità |
|---|---|
| Views | UI XAML |
| ViewModels | Stato, comandi, logica di presentazione |
| Services | API REST, storage, sensori, utilità |
| Models / DTO | Strutture dati |

## Navigazione

Descrivere:
- struttura Shell;
- route principali;
- parametri di navigazione;
- comportamento back navigation.

## Flusso dati

Descrivere il flusso tipico:
1. input utente;
2. comando ViewModel;
3. service;
4. risposta;
5. aggiornamento stato UI.

## Gestione stato UI

Indicare le proprietà comuni:
- IsBusy
- ErrorMessage
- HasData
- IsEmptyState

## Gestione errori

Descrivere:
- errori di rete;
- errori di validazione;
- errori di parsing;
- fallback previsti.

## Persistenza locale

Specificare:
- dati salvati;
- tecnologia usata;
- struttura minima.

## Sicurezza

Indicare come verranno trattati:
- API key;
- dati locali;
- eventuali input sensibili.

## Estendibilità

Descrivere in che modo l’architettura consente estensioni future.
docs/prompt-log.template.md
text
# Prompt log

## Scopo

Questo file raccoglie i prompt realmente significativi usati durante il progetto.  
Non deve contenere tutto, ma solo gli scambi che hanno influenzato decisioni, codice, struttura o test.

---

## Prompt 01

### Data
AAAA-MM-GG

### Strumento
- Copilot / OpenCode / altro

### Obiettivo
Descrivere lo scopo del prompt.

### Prompt
```text
...
Output utile
Riassumere la parte davvero utile della risposta.

Decisione presa
Spiegare se il suggerimento è stato:

accettato;

modificato;

rifiutato.

Motivazione
Spiegare il perché.

Prompt 02
Data
AAAA-MM-GG

Strumento
Copilot / OpenCode / altro

Obiettivo
...

Prompt
text
...
Output utile
...

Decisione presa
...

Motivazione
...

Osservazioni finali
Quali prompt si sono rivelati più efficaci.

Quali prompt hanno generato codice meno utile.

In che modo l’AI ha migliorato il processo.

In quali casi è stato necessario correggere o rifiutare l’output.

text

## Test, deployment e demo

I template seguenti coprono la parte spesso trascurata del progetto: verifica, rilascio e presentazione finale, che nel materiale precedente risultano già elementi importanti della valutazione.[2]

### `docs/test-matrix.template.md`

```md
# Matrice di test

## Obiettivo

Documentare le verifiche eseguite sul progetto.

| ID | Area | Caso di test | Passi | Risultato atteso | Esito | Note |
|---|---|---|---|---|---|---|
| T01 | Input | Campo vuoto |  |  |  |  |
| T02 | API | Richiesta valida |  |  |  |  |
| T03 | API | Nessuna connessione |  |  |  |  |
| T04 | UI | Stato loading |  |  |  |  |
| T05 | UI | Stato errore |  |  |  |  |
| T06 | Persistenza | Salvataggio dati |  |  |  |  |
| T07 | Persistenza | Riapertura app |  |  |  |  |
| T08 | Navigazione | Apertura dettaglio |  |  |  |  |
| T09 | Navigazione | Ritorno |  |  |  |  |
| T10 | Device | Tema scuro |  |  |  |  |

## Casi limite aggiuntivi

- input molto lungo;
- caratteri speciali;
- risposta JSON incompleta;
- permesso negato;
- doppio tap su pulsante;
- lista molto lunga.

## Bug trovati

| ID bug | Descrizione | Gravità | Stato |
|---|---|---|---|
| B01 |  |  |  |

## Esito complessivo

Descrivere il livello di stabilità raggiunto prima della consegna.
docs/deployment.template.md
text
# Deployment

## Obiettivo

Documentare la preparazione del progetto per la distribuzione finale.

## Target previsti

- Android APK
- Android AAB
- iOS opzionale

## Configurazioni

| Piattaforma | Modalità | Note |
|---|---|---|
| Android | Release |  |
| iOS | facoltativa |  |

## Checklist pre-release

- [ ] versione aggiornata
- [ ] nome app corretto
- [ ] icona definitiva
- [ ] splash screen verificata
- [ ] permessi controllati
- [ ] build Release eseguita
- [ ] test finale su device o emulatore
- [ ] screenshot acquisiti
- [ ] README aggiornato

## APK

### Scopo
Installazione diretta su dispositivi Android.

### Note
Indicare:
- nome file;
- percorso;
- versione;
- firma usata.

## AAB

### Scopo
Distribuzione tramite Google Play.

### Note
Indicare:
- nome file;
- versione;
- configurazione di firma.

## Keystore

Descrivere in modo sintetico:
- se è stato creato;
- dove viene gestito;
- come viene protetto.

## Permessi e privacy

Elencare i permessi usati dall’app e motivarne brevemente la presenza.

## Risultato finale

Descrivere cosa è stato effettivamente consegnato:
- APK;
- AAB;
- screenshot;
- video demo;
- note store.
docs/demo-script.template.md
text
# Script demo finale

## Durata prevista

8–12 minuti

## Obiettivo

Guidare una presentazione tecnica ordinata, breve e chiara.

## Sequenza della demo

### 1. Introduzione
- Nome del progetto
- Problema affrontato
- Utente target

### 2. Specifica iniziale
- Funzionalità principali
- Vincoli
- MVP

### 3. Architettura
- MVVM
- Services
- Shell
- Storage locale

### 4. Uso dell’AI
- Strumenti usati
- Un esempio di prompt efficace
- Una decisione corretta dopo review

### 5. Demo applicazione
- Home
- Ricerca / input principale
- Pagina dettaglio
- Salvataggio locale
- Gestione errore o caso limite

### 6. Testing
- Due o tre casi significativi
- Problemi trovati e risolti

### 7. Conclusione tecnica
- Limiti residui
- Possibili sviluppi futuri

## Materiale da preparare prima della demo

- APK installabile
- screenshots
- repository ordinato
- file docs aggiornati
- device o emulatore pronto
- connessione verificata oppure piano di fallback

## Piano B

Descrivere cosa mostrare in caso di:
- rete assente;
- problema con emulatore;
- crash inatteso.
docs/api-notes.template.md
text
# Note sulle API esterne

## API 1

### Nome
...

### Scopo
...

### Endpoint usati
- ...
- ...
- ...

### Parametri principali
- ...
- ...
- ...

### Autenticazione
- nessuna / API key / altro

### Limiti noti
- quota gratuita
- rate limit
- campi opzionali
- possibili errori

### Struttura della risposta
Descrivere i campi davvero usati nell’app.

### Strategie di fallback
- messaggio utente;
- retry;
- cache;
- stato errore.

---

## API 2

### Nome
...

### Scopo
...

### Endpoint usati
- ...

### Parametri principali
- ...

### Autenticazione
- ...

### Limiti noti
- ...

### Struttura della risposta
...

### Strategie di fallback
...
docs/iterations/it-template.md
text
# Iterazione XX

## Titolo

Nome sintetico dell’iterazione.

## Obiettivo

Descrivere la feature o il miglioramento previsto.

## Piano concordato

- passo 1
- passo 2
- passo 3
- passo 4

## File creati

- ...
- ...

## File modificati

- ...
- ...

## Prompt principali

### Prompt 1
```text
...
Prompt 2
text
...
Decisioni progettuali
...

...

...

Problemi incontrati
...

...

...

Correzioni effettuate
...

...

...

Test eseguiti
...

...

...

Esito
completato / parziale / da rifinire

Note per la prossima iterazione
...

...

text

## Ordine d’uso

L’ordine più efficace è: compilare `spec`, poi `plan`, poi `architecture`, quindi predisporre `AGENTS.md` e `copilot-instructions.md`, e solo dopo avviare le iterazioni documentate.  
Questo ordine riflette bene il passaggio da una base MAUI già strutturata a un modulo più avanzato centrato su sviluppo assistito da AI, senza perdere il controllo su Shell, storage locale, UI e qualità progettuale.[10][1]

