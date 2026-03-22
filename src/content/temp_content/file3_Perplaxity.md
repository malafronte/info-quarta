
## File 3

Questo terzo file formalizza consegna, roadmap, tracce operative e griglia di valutazione, mantenendo continuità con i criteri già usati nei progetti precedenti, che valorizzavano correttezza, completezza, efficienza, aspetti estetici e attenzione alla user experience.[3]

```md
# Consegna, guida operativa e valutazione del progetto finale MAUI con AI

## Finalità del progetto

Il progetto finale richiede lo sviluppo di una applicazione completa in .NET MAUI con target principale Android.  
L’applicazione deve essere progettata e realizzata con il supporto di strumenti di AI, ma all’interno di un processo documentato, consapevole e verificabile.

La valutazione non riguarda soltanto il prodotto finito.  
Viene considerato anche il percorso seguito per arrivare al risultato.

## Requisiti minimi comuni

Ogni progetto deve includere almeno:

- una specifica iniziale;
- una pianificazione in iterazioni;
- una applicazione MAUI funzionante;
- almeno una API esterna;
- almeno una forma di persistenza locale;
- gestione degli stati principali della UI;
- documentazione del processo;
- presentazione finale.

## Struttura della consegna

La consegna finale deve comprendere:

- repository completo del progetto;
- file `README.md`;
- `docs/spec.md`;
- `docs/plan.md`;
- almeno tre log di iterazione;
- `docs/test-matrix.md`;
- `docs/prompt-log.md`;
- APK finale Android;
- screenshot principali;
- eventuale AAB come estensione avanzata.

## Guida operativa comune

Ogni gruppo o studente dovrebbe seguire il percorso seguente.

### Fase 1 – Scelta e definizione del progetto

- scegliere una delle idee proposte oppure una variante approvata;
- definire obiettivo, utente target e funzionalità minime;
- individuare API e dati locali;
- elencare vincoli e rischi principali.

### Fase 2 – Specifica

Redigere `docs/spec.md` con:

- descrizione del problema;
- schermate principali;
- funzionalità obbligatorie;
- funzionalità opzionali;
- requisiti non funzionali;
- criteri di accettazione.

### Fase 3 – Piano di lavoro

Redigere `docs/plan.md` con:

- architettura prevista;
- cartelle e componenti principali;
- iterazioni;
- rischi;
- definition of done.

### Fase 4 – Design iniziale

- produrre wireframe o mockup;
- definire palette e stile minimo;
- mappare la navigazione;
- decidere il comportamento delle schermate in stato loading, errore e dati vuoti.

### Fase 5 – Sviluppo iterativo

Ogni iterazione deve seguire il ciclo:

- planning;
- build;
- review;
- test;
- aggiornamento documentazione.

### Fase 6 – Rifinitura e packaging

- migliorare la UX;
- correggere bug evidenti;
- preparare asset finali;
- generare APK;
- predisporre la demo finale.

## Guide passo passo per i progetti proposti

## Progetto 1 – CityClimate Companion

### Passo 1
Creare il progetto MAUI e impostare la navigazione Shell.

### Passo 2
Realizzare le pagine principali:
- Home;
- Search;
- Favorites;
- Settings.

### Passo 3
Implementare il servizio REST per geocoding e meteo.

### Passo 4
Mostrare il meteo attuale e la previsione giornaliera.

### Passo 5
Aggiungere il dettaglio orario e i parametri principali.

### Passo 6
Integrare preferiti e località predefinita.

### Passo 7
Aggiungere tema chiaro/scuro e gestione errori.

### Passo 8
Rifinire UI, testare e generare APK.

### Obiettivi tecnici
- uso di HttpClient;
- gestione JSON;
- salvataggio locale;
- navigazione Shell;
- qualità della UI.

## Progetto 2 – BookScout Mobile

### Passo 1
Creare il progetto e predisporre SearchPage, DetailPage, FavoritesPage.

### Passo 2
Implementare il service di ricerca libri.

### Passo 3
Visualizzare i risultati con card contenenti copertina e informazioni essenziali.

### Passo 4
Creare la pagina di dettaglio con informazioni estese.

### Passo 5
Aggiungere preferiti e cronologia locale.

### Passo 6
Gestire stati di caricamento, errori e ricerca vuota.

### Passo 7
Rifinire il layout e ottimizzare la leggibilità.

### Passo 8
Preparare materiale per demo e rilascio.

### Obiettivi tecnici
- liste e card;
- immagini remote;
- persistenza locale;
- separazione tra ViewModel e Service.

## Progetto 3 – MealPlanner Recipes

### Passo 1
Creare il progetto con SearchPage, RecipeDetailPage, PlannerPage.

### Passo 2
Implementare il service per la ricerca ricette.

### Passo 3
Mostrare elenco ricette e dettaglio.

### Passo 4
Aggiungere preferiti.

### Passo 5
Implementare il piano settimanale.

### Passo 6
Generare una lista della spesa locale.

### Passo 7
Gestire temi, errori e stati vuoti.

### Passo 8
Rifinire esperienza utente e packaging finale.

### Obiettivi tecnici
- CollectionView;
- dettaglio con immagini e testo;
- persistenza locale multipla;
- organizzazione lineare del progetto.

## Progetto 4 – SpaceWatch Explorer

### Passo 1
Creare il progetto con HomePage, ArchivePage, DetailPage.

### Passo 2
Integrare il service per il contenuto del giorno.

### Passo 3
Mostrare contenuto principale con immagine e descrizione.

### Passo 4
Aggiungere archivio per data.

### Passo 5
Implementare preferiti e salvataggio locale.

### Passo 6
Curare layout, leggibilità e comportamento con rete assente.

### Passo 7
Testare su diversi dispositivi o emulatori.

### Passo 8
Preparare demo finale.

### Obiettivi tecnici
- uso di immagini remote;
- caching e persistenza;
- rifinitura visuale;
- pagine informative ben organizzate.

## Progetto 5 – GeoQuiz Nations

### Passo 1
Creare il progetto con SearchPage, CountryDetailPage, QuizPage, StatsPage.

### Passo 2
Integrare il service per i dati dei Paesi.

### Passo 3
Mostrare schede informative.

### Passo 4
Implementare il quiz a risposta multipla.

### Passo 5
Salvare punteggi e cronologia.

### Passo 6
Aggiungere modalità studio e preferiti.

### Passo 7
Curare UX, colori, leggibilità e semplicità d’uso.

### Passo 8
Preparare APK e presentazione.

### Obiettivi tecnici
- logica applicativa;
- persistenza locale;
- organizzazione del flusso di gioco;
- chiarezza della UI.

## Come usare l’AI durante il progetto

L’uso dell’AI deve essere visibile e documentato.  
Per ogni iterazione dovrebbero essere conservati almeno:

- obiettivo dell’iterazione;
- prompt principali;
- output rilevanti;
- modifiche accettate;
- modifiche corrette manualmente;
- test eseguiti.

## Indicatori di buon uso dell’AI

Un uso corretto dell’AI si riconosce quando:

- il codice generato è coerente con la specifica;
- le modifiche sono piccole e controllate;
- le scelte sono spiegabili;
- gli errori individuati vengono corretti;
- il risultato finale è comprensibile dagli autori del progetto.

## Indicatori di uso debole dell’AI

Un uso debole dell’AI si riconosce quando:

- il codice viene accettato senza review;
- le classi risultano incoerenti o duplicate;
- non esiste documentazione del processo;
- gli autori non sanno spiegare il funzionamento;
- la struttura dell’app cambia in modo casuale tra una iterazione e l’altra.

## Griglia di valutazione

| Area | Peso | Descrizione |
|---|---:|---|
| Specifiche e analisi | 15% | Chiarezza della specifica, obiettivi definiti, criteri di accettazione |
| Pianificazione | 10% | Piano realistico, iterazioni sensate, rischi individuati |
| Uso consapevole dell’AI | 15% | Prompt adeguati, review del codice, correzioni motivate, documentazione del processo |
| Qualità tecnica | 20% | Architettura, naming, separazione responsabilità, error handling, ordine del codice |
| Implementazione funzionale | 15% | Completezza delle funzionalità richieste |
| Testing e validazione | 10% | Presenza di test, casi limite, verifica reale del comportamento |
| UX e design | 10% | Coerenza grafica, navigazione, stati UI, chiarezza dell’interfaccia |
| Presentazione finale | 5% | Efficacia della demo e qualità dell’esposizione |

## Descrittori di livello

### Voto 9–10
- progetto completo o quasi completo;
- ottima qualità del processo;
- uso maturo e consapevole dell’AI;
- codice ordinato e spiegato correttamente;
- demo efficace e ben controllata.

### Voto 7–8
- progetto valido con alcune mancanze non gravi;
- documentazione presente;
- buon uso dell’AI, anche se non sempre approfondito;
- presentazione chiara.

### Voto 6
- MVP funzionante ma essenziale;
- documentazione minima ma presente;
- uso dell’AI accettabile;
- comprensione del progetto sufficiente.

### Voto inferiore a 6
- funzionalità troppo incomplete o instabili;
- documentazione assente o insufficiente;
- processo non tracciabile;
- scarsa comprensione del codice presentato.

## Requisiti minimi per fasce di valutazione

In continuità con una logica già adottata in precedenti progetti del corso, la valutazione può essere collegata a soglie minime di completezza funzionale, oltre che alla qualità del processo [file:2].

### Fascia 6–7
- specifica presente;
- almeno 3 funzionalità core funzionanti;
- persistenza locale minima;
- UI utilizzabile;
- APK consegnato;
- almeno 2 iterazioni documentate.

### Fascia 7–9
- buona copertura delle funzionalità previste;
- stati di errore e loading gestiti;
- struttura ordinata;
- test documentati;
- almeno 3 iterazioni documentate;
- presentazione tecnica solida.

### Fascia 9–10
- progetto molto completo;
- UX curata;
- scelte tecniche ben motivate;
- uso dell’AI maturo e trasparente;
- documentazione accurata;
- eventuali estensioni personali pertinenti.

## Presentazione finale

La presentazione finale dovrebbe durare indicativamente tra 8 e 12 minuti e mostrare:

- problema affrontato;
- specifica iniziale;
- architettura scelta;
- due iterazioni significative;
- esempio concreto di uso dell’AI;
- demo dell’app;
- limiti residui;
- sviluppi futuri.

## Checklist finale prima della consegna

- il progetto compila;
- l’app è installabile;
- il repository è ordinato;
- README e documentazione sono presenti;
- i prompt principali sono stati tracciati;
- i test minimi sono stati eseguiti;
- la demo è stata provata;
- gli autori sanno spiegare codice, architettura e limiti.

## Conclusione

Nel progetto finale conta il risultato, ma conta altrettanto il modo in cui quel risultato è stato costruito.  
Uno sviluppo assistito da AI di qualità si riconosce dalla presenza di specifiche chiare, iterazioni controllate, revisioni ragionate, test espliciti e capacità di spiegare il software realizzato.
