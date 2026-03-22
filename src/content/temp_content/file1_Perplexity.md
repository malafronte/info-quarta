# Progetti finali MAUI con sviluppo assistito da AI

## Introduzione

Il modulo finale propone lo sviluppo di una applicazione completa in .NET MAUI con target principale Android e supporto opzionale a iOS.  
L’obiettivo non consiste nell’uso passivo di strumenti di generazione automatica del codice, ma nell’impiego consapevole di sistemi AI per supportare analisi, progettazione, implementazione, verifica e rifinitura del prodotto software.

Le proposte seguenti sono pensate per un contesto didattico introduttivo ma realistico.  
Ogni progetto consente di consolidare competenze già affrontate nel corso, come XAML, Shell, API REST, persistenza locale, gestione dei permessi, theming e organizzazione del codice.

## Criteri di scelta del progetto

Un buon progetto finale dovrebbe soddisfare i seguenti requisiti:

- essere realizzabile in un tempo limitato;
- avere un’interfaccia sufficientemente ricca da richiedere una progettazione reale;
- usare almeno una API di terze parti documentata e utilizzabile gratuitamente per finalità didattiche;
- prevedere almeno una forma di persistenza locale;
- consentire iterazioni progressive e verificabili;
- prestarsi a una presentazione finale chiara.

## Progetto 1 – CityClimate Companion

### Idea generale

**CityClimate Companion** è una applicazione che unisce previsioni meteo, qualità dell’aria, geolocalizzazione, località preferite e impostazioni utente.  
Il progetto rappresenta una naturale evoluzione del classico tema “app meteo”, ma con una struttura più completa e moderna.

### Perché è adatto

Questo progetto è particolarmente adatto perché estende una tipologia di esercizio già nota nel corso e permette di lavorare su dati remoti, navigazione, preferenze, UX e organizzazione architetturale.  
Risulta inoltre immediato da dimostrare durante la presentazione finale.

### Funzionalità minime

- Ricerca di una città tramite nome.
- Visualizzazione del meteo attuale.
- Visualizzazione delle previsioni giornaliere.
- Visualizzazione delle previsioni orarie del giorno corrente.
- Gestione di una località preferita.
- Supporto al tema chiaro e scuro.

### Funzionalità avanzate

- Uso della posizione corrente.
- Visualizzazione della qualità dell’aria.
- Salvataggio di più città tra i preferiti.
- Cache locale degli ultimi dati ricevuti.
- Schermata di dettaglio per i singoli parametri atmosferici.

### API suggerite

- Open-Meteo per dati meteo.
- Un servizio di geocoding compatibile per convertire il nome della città in coordinate.

### Competenze esercitate

- HttpClient e chiamate REST.
- Deserializzazione JSON.
- Preferences e/o SQLite.
- Shell e navigazione.
- Gestione degli stati della UI: loading, errore, dati vuoti, dati caricati.

### Complessità

Media.

## Progetto 2 – BookScout Mobile

### Idea generale

**BookScout Mobile** è una applicazione per la ricerca e la consultazione di libri, con dettaglio, copertina, informazioni editoriali, salvataggio dei preferiti e cronologia locale.  
Il progetto è adatto a chi desidera realizzare una applicazione informativa con interfaccia pulita e focus sulla qualità della navigazione.

### Funzionalità minime

- Ricerca per titolo o autore.
- Elenco dei risultati.
- Pagina dettaglio con informazioni estese.
- Salvataggio dei preferiti.
- Cronologia delle ricerche.

### Funzionalità avanzate

- Filtri per lingua o categoria.
- Scansione ISBN tramite barcode.
- Note personali sui libri salvati.
- Ordinamento dei risultati.
- Modalità offline per i libri già memorizzati localmente.

### API suggerite

- Google Books.
- Open Library.

### Competenze esercitate

- Liste, card e immagini remote.
- Gestione del caching base.
- Persistenza locale.
- Architettura MVVM.
- Separazione tra servizio dati e logica di presentazione.

### Complessità

Media.

## Progetto 3 – MealPlanner Recipes

### Idea generale

**MealPlanner Recipes** è una applicazione di ricette e pianificazione pasti.  
L’utente può cercare ricette per ingrediente, visualizzarne il dettaglio, salvarle tra i preferiti e costruire un piano settimanale con una lista della spesa locale.

### Funzionalità minime

- Ricerca ricette per ingrediente o categoria.
- Visualizzazione del dettaglio di una ricetta.
- Salvataggio dei preferiti.
- Piano pasti settimanale.
- Lista della spesa generata localmente.

### Funzionalità avanzate

- Filtri per area geografica o tipologia di piatto.
- Note personali per ciascuna ricetta.
- Pianificazione per singolo giorno.
- Cronologia delle ricette consultate.
- Esportazione testuale della lista della spesa.

### API suggerite

- TheMealDB o servizio equivalente con quota gratuita.

### Competenze esercitate

- UI basata su CollectionView.
- Gestione di immagini remote.
- Persistenza strutturata.
- Modellazione di dati semplici ma multipli.
- Progettazione progressiva di funzionalità correlate.

### Complessità

Media.

## Progetto 4 – SpaceWatch Explorer

### Idea generale

**SpaceWatch Explorer** è una applicazione divulgativa dedicata allo spazio e all’astronomia.  
Può mostrare l’immagine astronomica del giorno, contenuti informativi, archivio per data e schede di approfondimento.

### Funzionalità minime

- Home con contenuto principale del giorno.
- Archivio per data.
- Pagina dettaglio.
- Preferiti locali.
- Supporto a tema chiaro e scuro.

### Funzionalità avanzate

- Download locale dell’immagine.
- Sezione curiosità o approfondimenti.
- Confronto tra giorni diversi.
- Condivisione di un contenuto tramite funzionalità di sistema.

### API suggerite

- NASA APOD.
- Eventuali API pubbliche complementari per contenuti astronomici.

### Competenze esercitate

- Layout visuali.
- Gestione di immagini.
- Caching.
- Navigazione tra schermate informative.
- Rifinitura estetica dell’applicazione.

### Complessità

Medio-bassa.

## Progetto 5 – GeoQuiz Nations

### Idea generale

**GeoQuiz Nations** è una applicazione educativa che combina dati sui Paesi del mondo con modalità quiz.  
L’utente può cercare un Paese, studiarne le informazioni principali e poi mettersi alla prova con domande su capitali, bandiere, continenti e lingue.

### Funzionalità minime

- Ricerca di un Paese.
- Scheda informativa.
- Quiz a risposta multipla.
- Salvataggio del punteggio locale.
- Cronologia delle sessioni.

### Funzionalità avanzate

- Modalità studio e modalità test.
- Quiz filtrati per continente.
- Statistiche locali.
- Preferiti.
- Generazione casuale di serie di domande.

### API suggerite

- REST Countries o servizio equivalente.

### Competenze esercitate

- Modellazione dati.
- Logica di quiz.
- Persistenza locale.
- UI multi-schermata.
- Presentazione chiara del contenuto informativo.

### Complessità

Medio-bassa.

## Tabella sintetica

| Progetto | Dominio | API esterne | Persistenza locale | Funzioni speciali | Complessità |
|---|---|---|---|---|---|
| CityClimate Companion | Meteo e ambiente | Sì | Sì | Geolocalizzazione, qualità aria | Media |
| BookScout Mobile | Libri | Sì | Sì | Copertine, eventuale ISBN | Media |
| MealPlanner Recipes | Ricette | Sì | Sì | Piano pasti, lista spesa | Media |
| SpaceWatch Explorer | Astronomia | Sì | Sì | Archivio immagini e dettaglio | Medio-bassa |
| GeoQuiz Nations | Educazione geografica | Sì | Sì | Quiz e statistiche | Medio-bassa |

## Quale progetto scegliere

La scelta dovrebbe basarsi su tre fattori:

- interesse personale per il dominio del progetto;
- equilibrio tra ambizione e tempo disponibile;
- capacità di presentare il prodotto finale in modo chiaro e convincente.

In generale:

- CityClimate Companion è consigliato a chi desidera continuità con il classico progetto meteo.
- BookScout Mobile è consigliato a chi preferisce una UI ordinata e una struttura dati chiara.
- MealPlanner Recipes è consigliato a chi vuole un progetto completo ma lineare.
- SpaceWatch Explorer è consigliato a chi vuole curare particolarmente l’aspetto visivo.
- GeoQuiz Nations è consigliato a chi preferisce una logica applicativa semplice ma ben strutturata.

## Estensioni opzionali comuni

Indipendentemente dal progetto scelto, possono essere introdotte alcune estensioni comuni:

- gestione del tema chiaro/scuro;
- schermata impostazioni;
- supporto a preferiti o cronologia;
- cache locale;
- indicatori di caricamento e stati di errore;
- validazione degli input;
- screenshot e asset per una possibile pubblicazione store.

## Conclusione

Il progetto finale non deve essere inteso come semplice esercizio di programmazione, ma come sviluppo di un piccolo prodotto software completo.  
Per questo motivo la qualità della progettazione, del processo e della presentazione finale conta quanto il numero di funzionalità implementate.
