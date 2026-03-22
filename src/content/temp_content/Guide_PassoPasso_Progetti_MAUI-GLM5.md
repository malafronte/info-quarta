**GUIDE PASSO-PASSO**

**Sviluppo di Applicazioni MAUI**

**con Assistenza AI**

Documentazione Dettagliata per i Quattro Progetti

CryptoTracker - PokeDex - MovieExplorer - NASA Space Explorer


1\. Progetto CryptoTracker - Monitor Criptovalute
=================================================

1.1 Panoramica del Progetto
---------------------------

CryptoTracker è un'applicazione che consente agli utenti di monitorare i prezzi delle criptovalute in tempo reale, visualizzare grafici storici e gestire un portfolio personale di investimenti. Il progetto introduce concetti fondamentali come il consumo di API REST con HttpClient, la deserializzazione JSON di strutture dati complesse, la visualizzazione di dati con grafici interattivi tramite librerie come LiveCharts2, e la gestione di persistenza locale con SQLite per le preferenze utente e il portfolio.

1.2 Iterazione 1: Setup e Architettura Base
-------------------------------------------

**Obiettivo:** Creare la struttura del progetto e definire l'architettura di base.

**Prompt AI consigliato per la creazione struttura:**

*"Crea un progetto MAUI con navigazione Shell per un'app di monitoraggio criptovalute. La struttura deve includere: cartelle Models per Cryptocurrency e MarketData, Services per CoinGeckoService con HttpClient, ViewModels con CommunityToolkit.Mvvm, Views per le pagine principali. Configura la dependency injection in MauiProgram.cs e imposta una TabBar con tre tab: Market, Search, Portfolio."*

**Passi di implementazione:**

1.      Creare il progetto MAUI in Visual Studio selezionando il template .NET MAUI App

2.      Installare i pacchetti NuGet necessari: CommunityToolkit.Mvvm, Microsoft.Extensions.Http, Newtonsoft.Json o System.Text.Json

3.      Definire la classe Cryptocurrency con proprietà: Id, Name, Symbol, CurrentPrice, PriceChangePercentage24h, MarketCap, ImageUrl, TotalVolume

4.      Definire la classe MarketData per i dati storici: Prices (lista di tuple data/valore), MarketCaps, TotalVolumes

5.      Creare CoinGeckoService con metodo GetCryptocurrenciesAsync(int count) che chiama l'endpoint /coins/markets

6.      Configurare HttpClient come servizio singleton in MauiProgram.cs

**Specifica tecnica da salvare in docs/iterations/01-spec.md:**

\## Iterazione 1: Setup Architettura ### Requisiti - Progetto MAUI con .NET 8 - Shell navigation con TabBar - Dependency Injection configurata - Modelli dati definiti - Service layer con HttpClient  \### Criteri Accettazione - Progetto compila senza errori - Navigation funziona tra tab - HttpClient iniettato correttamente

1.3 Iterazione 2: Lista Criptovalute
------------------------------------

**Obiettivo:** Implementare la visualizzazione della lista delle criptovalute con caricamento dati dall'API.

**Prompt AI consigliato:**

*"Implementa un ViewModel per la lista criptovalute usando CommunityToolkit.Mvvm. Deve avere una ObservableProperty Cryptocurrencies di tipo ObservableCollection<Cryptocurrency>, un ICommand LoadCommand per il caricamento, un ICommand RefreshCommand per pull-to-refresh. Il ViewModel deve iniettare ICoinGeckoService e gestire stati di caricamento e errori. Crea anche la View XAML con CollectionView, ActivityIndicator, e gestisci la visualizzazione di variazioni positive/negative con colori verde/rosso."*

**Passi di implementazione:**

1.      Creare MarketViewModel con \[ObservableProperty\] per Cryptocurrencies, IsLoading, ErrorMessage

2.      Implementare \[RelayCommand\] LoadCryptocurrenciesAsync che chiama il service e popola la collezione

3.      Creare MarketPage.xaml con CollectionView bindata alla collezione

4.      Definire DataTemplate per mostrare nome, simbolo, prezzo, variazione 24h con Convertitore per i colori

5.      Implementare RefreshView con pull-to-refresh

6.      Testare il caricamento dati e gestire errori di rete con try-catch

1.4 Iterazione 3: Dettaglio e Grafici
-------------------------------------

**Obiettivo:** Implementare la pagina di dettaglio con grafico storico e statistiche complete.

**Prompt AI consigliato:**

*"Crea una pagina di dettaglio per una criptovaluta con navigazione Shell parametrizzata. La pagina deve mostrare: immagine e nome in header, prezzo corrente con variazione 24h, grafico storico usando LiveCharts2 con selettore periodo (7/30/90 giorni), sezione statistiche con Market Cap, Volume 24h, Supply. Implementa il ViewModel con caricamento dati storici dall'endpoint /coins/{id}/market\_chart di CoinGecko e usa CartesianChart per il grafico lineare."*

**Passi di implementazione:**

1.      Installare LiveCharts2.SkiaSharpView.Maui NuGet package

2.      Creare DetailPage.xaml con Grid layout per organizzare le sezioni

3.      Implementare DetailViewModel con \[QueryProperty\] per ricevere l'ID dalla navigazione

4.      Aggiungere metodo GetMarketChartAsync al service per dati storici

5.      Creare SeriesCollection per il grafico con dati Prices convertiti

6.      Implementare selettori periodo con RadioButton o SegmentedControl

7.      Registrazione route: Routing.RegisterRoute("detail", typeof(DetailPage))

1.5 Iterazione 4: Portfolio e Finalizzazione
--------------------------------------------

**Obiettivo:** Implementare funzionalità avanzate e finalizzare l'applicazione.

**Prompt AI consigliato:**

*"Implementa la funzionalità Portfolio con SQLite. Crea una tabella PortfolioItem con campi: Id, CryptocurrencyId, Quantity, PurchasePrice, PurchaseDate. Implementa un PortfolioDatabase con operazioni CRUD usando sqlite-net-pcl. Crea una pagina Portfolio che mostri le holdings calcolando il valore attuale (Quantity \* CurrentPrice) e il profitto/perdita. Aggiungi funzionalità per aggiungere nuove transazioni e implementa tema chiaro/scuro con AppThemeBinding."*

**Passi di implementazione:**

1.      Installare sqlite-net-pcl NuGet package

2.      Creare PortfolioDatabase con connessione async e metodi GetItemsAsync, SaveItemAsync, DeleteItemAsync

3.      Implementare PortfolioViewModel con calcolo valore totale e P/L

4.      Creare AddTransactionPage come popup o pagina modale

5.      Applicare AppThemeBinding per colori adattivi al tema sistema

6.      Testing finale e ottimizzazione performance

2\. Progetto PokeDex - Enciclopedia Pokemon
===========================================

2.1 Panoramica del Progetto
---------------------------

PokeDex è un'applicazione che funge da enciclopedia interattiva dei Pokemon, permettendo agli utenti di esplorare l'universo Pokemon attraverso la visualizzazione di schede dettagliate, ricerca avanzata e confronto tra diverse creature. Il progetto è ideale come primo approccio allo sviluppo MAUI AI-assistito perché l'API PokeAPI è completamente gratuita senza limiti, con una struttura dati ben definita e documentata.

2.2 Iterazione 1: Setup e Architettura Base
-------------------------------------------

**Prompt AI consigliato:**

*"Crea un progetto MAUI per un PokeDex che consumi l'API PokeAPI.* *Definisci i modelli: Pokemon (id, name, height, weight, sprites, stats, types, abilities), PokemonListItem (name, url), Type, Stat. Crea PokeApiService con metodi: GetPokemonListAsync(limit, offset), GetPokemonAsync(id/name), GetTypeAsync(id). Configura Shell con Flyout per navigazione e imposta pagine: AllPokemon, Search, Favorites."*

**Passi di implementazione:**

1.      Creare il progetto MAUI e installare i pacchetti necessari

2.      Definire tutti i modelli dati mappando la struttura JSON di PokeAPI

3.      Implementare PokeApiService con HttpClient e deserializzazione

4.      Configurare la Shell con Flyout e pagine registrate

5.      Testare le chiamate API con alcuni ID Pokemon noti

2.3 Iterazione 2: Lista Pokemon con Infinite Scroll
---------------------------------------------------

**Prompt AI consigliato:**

*"Implementa una lista Pokemon con caricamento progressivo.* *Usa CollectionView con RemainingItemsThreshold per implementare infinite scroll. Il ViewModel deve caricare 20 Pokemon alla volta, cachare i risultati, e mostrare un ActivityIndicator durante il caricamento. Crea un DataTemplate con Grid che mostri lo sprite front\_default, nome con maiuscola, e tipi come Badge colorati. Implementa anche una modalità visualizzazione Griglia con 2 colonne usando FlexLayout."*

**Passi di implementazione:**

1.      Creare AllPokemonViewModel con ObservableCollection e logica di paginazione

2.      Implementare ICommand LoadMoreCommand scatenato da RemainingItemsThresholdReached

3.      Per ogni PokemonListItem, estrarre l'ID dall'URL per caricare sprite

4.      Creare PokemonCardTemplate con immagine, nome, e tipi

5.      Implementare switch visualizzazione lista/griglia

2.4 Iterazione 3: Dettaglio Pokemon e Ricerca
---------------------------------------------

**Prompt AI consigliato:**

*"Crea una pagina dettaglio Pokemon completa. Mostra: sprite animato (front\_default), nome e ID, altezza/peso, tutti i tipi con colori tematici (fire=rosso, water=blu, grass=verde, etc.), statistiche base con ProgressBar (HP, Attack, Defense, SpecialAttack, SpecialDefense, Speed), abilità list. Implementa anche una funzione di ricerca live con SearchBar che filtri per nome mentre l'utente digita, e filtri per tipo con un Picker."*

**Passi di implementazione:**

1.      Creare DetailPage.xaml con ScrollView e layout a sezioni

2.      Definire un Converter per colorare i tipi Pokemon

3.      Implementare visualizzazione statistiche con ProgressBar personalizzate

4.      Creare SearchPage con SearchBar e filtri

5.      Implementare ricerca live con TextChanged event

2.5 Iterazione 4: Confronto e Team Builder
------------------------------------------

**Prompt AI consigliato:**

*"Implementa una funzione di confronto tra due Pokemon. La pagina deve permettere di selezionare due Pokemon e mostrare i loro dati affiancati. Includi un grafico radar per le statistiche usando LiveCharts2. Implementa anche un Team Builder dove l'utente può selezionare fino a 6 Pokemon e vedere un riepilogo dei tipi presenti nel team con indicazione di punti deboli e forze. Salva i team localmente con SQLite."*

**Passi di implementazione:**

1.      Creare ComparePage con layout a due colonne

2.      Implementare grafico radar con LiveCharts2

3.      Creare TeamBuilderPage con selezione Pokemon

4.      Implementare analisi copertura tipi del team

5.      Persistenza team con SQLite

3\. Progetto MovieExplorer - Catalogo Film e Serie TV
=====================================================

3.1 Panoramica del Progetto
---------------------------

MovieExplorer è un'applicazione che permette agli utenti di esplorare il mondo del cinema e delle serie TV attraverso un'interfaccia moderna e intuitiva. Il progetto introduce concetti avanzati come la gestione di immagini remote, la paginazione di contenuti, e l'implementazione di funzionalità social come liste personalizzate e valutazioni locali.

3.2 Iterazione 1: Setup e API TMDB
----------------------------------

**Nota preliminare:** Registrarsi su themoviedb.org per ottenere una API key gratuita.

**Prompt AI consigliato:**

*"Crea un progetto MAUI per esplorare film e serie TV usando TMDB API. Definisci i modelli: Movie, TvShow, Person, Credits con tutte le proprietà necessarie.* *Crea TmdbService con configurazione API key come header. Implementa metodi: GetPopularMoviesAsync, GetPopularTvShowsAsync, GetTrendingAsync, GetDetailsAsync, SearchMultiAsync. Configura Shell con tab: Home, Search, Watchlist, Profile."*

**Passi di implementazione:**

1.      Ottenere API key da TMDB e memorizzarla in modo sicuro

2.      Definire modelli dati con attributi JsonProperty per mappatura

3.      Creare TmdbService con HttpClient e apiKey come parametro

4.      Configurare base address: https://api.themoviedb.org/3/

5.      Testare gli endpoint principali

3.3 Iterazione 2: Homepage con Carousel e Sezioni
-------------------------------------------------

**Prompt AI consigliato:**

*"Crea una homepage per MovieExplorer con: CarouselView per i film trending del giorno con indicatori, sezioni orizzontali scrollabili per 'Popular Movies', 'Top Rated', 'Now Playing', 'Upcoming'. Usa CollectionView con ItemsLayout='HorizontalList' per le sezioni. Ogni card deve mostrare poster\_path (URL base: https://image.tmdb.org/t/p/w500/), titolo, voto con stelle. Implementa caching delle immagini per performance."*

**Passi di implementazione:**

1.      Creare HomeViewModel con proprietà per ogni sezione

2.      Implementare CarouselView con indicatori

3.      Creare MediaCardTemplate per film e serie

4.      Gestire URL immagini complete con concatenazione

5.      Implementare caricamento parallelo delle sezioni

3.4 Iterazione 3: Dettaglio e Ricerca
-------------------------------------

**Prompt AI consigliato:**

*"Implementa pagina dettaglio per film/serie TV con: backdrop come header con gradiente, poster, titolo e info (anno, durata, generi), rating con voto medio, trama, cast orizzontale scrollabile, video trailer (apre YouTube). Per la ricerca, implementa una pagina con SearchBar, filtri per tipo (film/serie), genere, anno, ordinamento. Usa CollectionView con GridItemsLayout per risultati a 2 colonne."*

**Passi di implementazione:**

1.      Creare DetailPage con layout a sezioni

2.      Implementare chiamata GetCreditsAsync per cast

3.      Integrare video trailer con Launcher.OpenAsync

4.      Creare SearchPage con filtri avanzati

5.      Implementare ricerca debounced

3.5 Iterazione 4: Watchlist e Preferiti
---------------------------------------

**Prompt AI consigliato:**

*"Implementa funzionalità watchlist con SQLite.* *Crea tabelle: WatchlistItem (MediaId, MediaType, AddedDate, Status), UserRating (MediaId, MediaType, Rating, Notes). Implementa pagina Watchlist con filtri per stato (To Watch, Watching, Completed), ordinamento per data aggiunta. Permetti all'utente di aggiungere valutazioni personali e note. Implementa anche una pagina Profile con statistiche utente."*

**Passi di implementazione:**

1.      Creare database SQLite con tabelle necessarie

2.      Implementare WatchlistService per operazioni CRUD

3.      Creare WatchlistPage con filtri e azioni

4.      Implementare RatingDialog per valutazioni

5.      Aggiungere pulsante 'Add to Watchlist' nella DetailPage

4\. Progetto NASA Space Explorer
================================

4.1 Panoramica del Progetto
---------------------------

NASA Space Explorer è un'applicazione educativa che permette agli utenti di esplorare lo spazio attraverso i dati e le immagini fornite dalle diverse missioni NASA. Questo progetto rappresenta la maggiore complessità, introducendo la gestione di multiple API con strutture dati diverse e la visualizzazione di dati scientifici.

4.2 Iterazione 1: Setup e API NASA
----------------------------------

**Nota preliminare:** Registrarsi su api.nasa.gov per ottenere una API key gratuita.

**Prompt AI consigliato:**

*"Crea un progetto MAUI per esplorare dati NASA. Definisci servizi separati per ogni API: ApodService (Astronomy Picture of the Day), MarsRoverService (foto rover con filtri), NeoService (asteroidi near-Earth), EpicService (immagini Earth). Ogni servizio deve gestire il proprio endpoint con parametri appropriati.* *Configura Shell con Flyout e pagine: APOD, Mars, Asteroids, Earth. Implementa caching intelligente per rispettare i limiti API."*

**Passi di implementazione:**

1.      Ottenere API key da NASA e configurarla

2.      Creare modelli per ogni tipo di risposta API

3.      Implementare servizi separati con HttpClient

4.      Creare CacheService con scadenza temporale

5.      Configurare Shell con navigazione

4.3 Iterazione 2: APOD Gallery
------------------------------

**Prompt AI consigliato:**

*"Implementa la galleria APOD (Astronomy Picture of the Day). La pagina principale deve mostrare l'immagine del giorno con titolo, data, spiegazione. Implementa un calendario per navigare date passate (limite: ultimi 30 giorni con API gratuita). Gestisci sia immagini che video (YouTube embed o link). Crea una galleria a griglia per visualizzare multiple APOD con miniature. Permetti all'utente di salvare le immagini preferite nella galleria del dispositivo."*

**Passi di implementazione:**

1.      Creare ApodViewModel con caricamento immagine giorno

2.      Implementare DatePicker per selezione data

3.      Gestire media\_type image/video

4.      Implementare salvataggio immagine con FileSystem

5.      Creare galleria con CollectionView

4.4 Iterazione 3: Mars Rover Photos
-----------------------------------

**Prompt AI consigliato:**

*"Implementa la visualizzazione foto dei Mars Rover. Crea un selettore per scegliere tra Curiosity, Opportunity, Spirit (se disponibili). Permetti di selezionare una data solare (sol) o terrestre. Mostra i rover con statistiche (data lancio, atterraggio, stato). Crea una galleria filtrabile per camera (FHAZ, RHAZ, MAST, etc.). Implementa zoom sulle immagini con pinch gesture e possibilità di condividere le foto preferite."*

**Passi di implementazione:**

1.      Creare MarsViewModel con proprietà per rover, data, camera

2.      Implementare selettore rover con Picker

3.      Creare filtro camera dinamiche in base al rover

4.      Implementare galleria con CollectionView

5.      Aggiungere funzionalità share con Share.RequestAsync

4.5 Iterazione 4: Asteroid Tracker e Finalizzazione
---------------------------------------------------

**Prompt AI consigliato:**

*"Implementa Asteroid Tracker per asteroidi near-Earth. Mostra una lista degli asteroidi che passeranno vicino alla Terra oggi/prossimi 7 giorni. Per ogni asteroide visualizza: nome, diametro stimato (min/max in km), velocità relativa, distanza dalla Terra, indicatore di pericolosità. Implementa un grafico che mostri la distribuzione delle dimensioni o velocità. Crea una pagina di dettaglio asteroide con informazioni complete dalla API. Implementa preferiti locale per asteroidi 'interessanti'."*

**Passi di implementazione:**

1.      Creare AsteroidViewModel con caricamento feed

2.      Implementare lista con indicatore pericolosità

3.      Creare grafico distribuzione con LiveCharts2

4.      Implementare pagina dettaglio asteroide

5.      Aggiungere preferiti con SQLite

6.      Testing finale e ottimizzazione

Appendice A: Riepilogo API Utilizzate
=====================================

| **API** | **Autenticazione** | **Limiti Piano Gratuito** | **Progetto** |
| --- |  --- |  --- |  --- |
| CoinGecko | Nessuna (rate limit) | 10-50 chiamate/min | CryptoTracker |
| --- |  --- |  --- |  --- |
| PokeAPI | Nessuna | Nessun limite | PokeDex |
| TMDB | API Key richiesta | 40 richieste/10 sec | MovieExplorer |
| NASA APIs | API Key richiesta | 1000 richieste/ora | NASA Explorer |
| Open-Meteo | Nessuna | Nessun limite | Meteo (ref) |

*Tabella A.1: Riepilogo API utilizzate nei progetti*

Appendice B: Checklist Pre-Consegna
===================================

La seguente checklist deve essere completata prima della consegna del progetto per garantire che tutti i requisiti minimimi siano soddisfatti e che l'applicazione sia pronta per la presentazione.

B.1 Requisiti Tecnici
---------------------

-         Il progetto compila senza errori in modalità Release

-         L'applicazione si avvia correttamente su dispositivo/emulatore Android

-         La navigazione tra le pagine funziona correttamente

-         Le chiamate API sono funzionanti e gestiscono gli errori

-         Il data binding è implementato correttamente

-         La persistenza dati SQLite funziona (se richiesta)

-         I permessi sono gestiti correttamente (se necessari)

B.2 Requisiti Documentali
-------------------------

-         File README.md con descrizione del progetto presente

-         Cartella docs/iterations/ con specifiche per ogni iterazione

-         Cartella docs/reviews/ con log delle review effettuate

-         Prompt utilizzati con l'AI documentati

-         Decisioni architetturali motivate nella documentazione

B.3 Requisiti UI/UX
-------------------

-         L'interfaccia è intuitiva e user-friendly

-         Il tema chiaro/scuro è implementato correttamente

-         Gli stati di loading sono gestiti con indicatori

-         Gli errori sono comunicati all'utente in modo chiaro

-         Le immagini sono caricate e cachate correttamente

B.4 Requisiti Presentazione
---------------------------

-         Demo funzionante preparata su dispositivo reale

-         Slide di presentazione pronte (opzionale)

-         Punti chiave del processo di sviluppo identificati

-         Sfide incontrate e soluzioni adottate documentate

-         Possibili miglioramenti futuri identificati