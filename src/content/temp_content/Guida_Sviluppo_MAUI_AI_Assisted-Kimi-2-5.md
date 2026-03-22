# Sviluppo di Applicazioni .NET MAUI con Assistenza AI
## Modulo Avanzato - Guida Completa per lo Sviluppo Spec-Driven

---

## Indice

1. [Introduzione al Modulo](#1-introduzione-al-modulo)
2. [Fondamenti dello Sviluppo AI-Assisted Spec-Driven](#2-fondamenti-dello-sviluppo-ai-assisted-spec-driven)
3. [Strumenti AI Disponibili](#3-strumenti-ai-disponibili)
4. [Il Pattern Man-in-the-Loop](#4-il-pattern-man-in-the-loop)
5. [Proposte di Progetti](#5-proposte-di-progetti)
6. [Guide Passo-Passo per Progetti](#6-guide-passo-passo-per-progetti)
7. [Deployment di Applicazioni MAUI](#7-deployment-di-applicazioni-maui)
8. [Griglia di Valutazione](#8-griglia-di-valutazione)
9. [Risorse e Riferimenti](#9-risorse-e-riferimenti)

---

## 1. Introduzione al Modulo

### 1.1 Obiettivi Formativi

Questo modulo rappresenta il culmine del percorso di apprendimento su .NET MAUI, introducendo metodologie avanzate di sviluppo assistito da Intelligenza Artificiale. Al termine del modulo, lo studente sarà in grado di:

- Comprendere e applicare il paradigma dello **sviluppo spec-driven**, distinguendolo chiaramente dal *vibe coding* generico
- Utilizzare efficacemente **GitHub Copilot Pro** e **OpenCode** per lo sviluppo di applicazioni mobili
- Implementare il pattern **Man-in-the-Loop** per un ciclo di sviluppo iterativo controllato
- Progettare, sviluppare e deployare applicazioni MAUI complete utilizzando API di terze parti
- Valutare criticamente il codice generato dall'AI e integrarlo in modo consapevole nell'architettura dell'applicazione

### 1.2 Prerequisiti

Per affrontare con profitto questo modulo, è necessario possedere:

- Conoscenza solida del linguaggio C# e del framework .NET
- Familiarità con XAML e i principali layout di MAUI
- Comprensione del pattern MVVM e del data binding
- Esperienza base con chiamate HTTP e gestione di JSON
- Capacità di utilizzo di SQLite per la persistenza locale

### 1.3 Differenza tra Vibe Coding e Spec-Driven Development

#### Vibe Coding

Il *vibe coding* rappresenta un approccio informale allo sviluppo con AI, caratterizzato da:

- Prompt generici e poco strutturati
- Accettazione passiva del codice generato
- Mancanza di pianificazione architetturale
- Difficoltà nel mantenimento e nella scalabilità

#### Spec-Driven Development

Lo sviluppo **spec-driven** si fonda invece su principi ingegneristici rigorosi:

- **Specifiche chiare**: Ogni funzionalità è preceduta da una documentazione dettagliata
- **Architettura consapevole**: Le decisioni di design sono deliberate e documentate
- **Iterazioni controllate**: Ogni ciclo di sviluppo include fasi di planning, build e testing
- **Code review sistematica**: Il codice generato dall'AI viene sempre verificato e compreso
- **Tracciabilità**: Ogni componente del sistema è riconducibile a una specifica di requisito

---

## 2. Fondamenti dello Sviluppo AI-Assisted Spec-Driven

### 2.1 Principi Fondamentali

Lo sviluppo spec-driven con assistenza AI si basa su cinque principi fondamentali:

#### Principio 1: La Specifica è la Fonte della Verità

Prima di scrivere qualsiasi riga di codice, deve esistere una specifica chiara che descriva:
- Cosa deve fare la funzionalità
- Quali sono gli input e gli output attesi
- Come si integra con il resto dell'applicazione
- Quali sono i criteri di accettazione

#### Principio 2: L'AI è uno Strumento, non un Sostituto

L'Intelligenza Artificiale deve essere considerata come un **pair programmer** esperto ma che richiede supervisione:
- Verificare sempre la correttezza del codice generato
- Comprendere il funzionamento prima di integrarlo
- Non accettare mai codice che non si è in grado di spiegare
- Adattare il codice generato alle convenzioni del progetto

#### Principio 3: Iterazioni Corte e Feedback Rapido

Il ciclo di sviluppo deve essere organizzato in iterazioni brevi (tipicamente 30-60 minuti) che includano:
- Definizione di un obiettivo specifico e misurabile
- Generazione o scrittura del codice
- Testing immediato della funzionalità
- Refactoring se necessario

#### Principio 4: Documentazione Come Codice

La documentazione non è un'attività separata ma parte integrante del processo:
- Il piano di lavoro è scritto in Markdown
- Ogni iterazione produce aggiornamenti alla documentazione
- Le decisioni architetturali sono registrate
- Il codice include commenti che spiegano il "perché", non solo il "cosa"

#### Principio 5: Qualità sul Codice Generato

Il codice generato dall'AI deve rispettare gli stessi standard del codice scritto manualmente:
- Convenzioni di naming consistenti
- Gestione appropriata degli errori
- Ottimizzazione delle performance
- Testabilità del codice

### 2.2 Il Workflow Spec-Driven

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     PLAN        │────▶│     BUILD       │────▶│     TEST        │
│  (Pianificazione)│     │  (Sviluppo)     │     │  (Verifica)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲                                               │
         │                                               │
         └───────────────────────────────────────────────┘
                          (Iterazione)
```

#### Fase PLAN

Durante la fase di pianificazione si definisce:

1. **Obiettivo dell'iterazione**: Una singola funzionalità o componente
2. **Requisiti funzionali**: Cosa deve fare in dettaglio
3. **Requisiti non funzionali**: Performance, usabilità, accessibilità
4. **Dipendenze**: Cosa è necessario avere già implementato
5. **Criteri di accettazione**: Quando si considera completata la funzionalità

**Esempio di specifica per un'iterazione:**

```markdown
## Iterazione 3.2: Implementazione della ricerca città

### Obiettivo
Aggiungere la possibilità di cercare una città e visualizzarne le previsioni meteo.

### Requisiti Funzionali
- Campo di input per il nome della città
- Validazione dell'input (minimo 2 caratteri)
- Chiamata all'API Open-Meteo Geocoding
- Visualizzazione lista risultati con nome, regione, stato
- Selezione città per visualizzare previsioni

### Requisiti Non Funzionali
- Tempo di risposta massimo: 3 secondi
- Feedback visivo durante il caricamento
- Gestione errore connessione

### Dipendenze
- Iterazione 3.1 (Configurazione HttpClient completata)
- Iterazione 2.4 (UI base della pagina meteo)

### Criteri di Accettazione
- [ ] L'utente può digitare il nome di una città
- [ ] I risultati appaiono entro 3 secondi
- [ ] Cliccando un risultato si vedono le previsioni
- [ ] Se l'API non risponde, appare un messaggio di errore
```

#### Fase BUILD

Nella fase di sviluppo:

1. **Preparazione del prompt**: Basandosi sulla specifica, si crea un prompt dettagliato per l'AI
2. **Generazione del codice**: L'AI produce il codice iniziale
3. **Review del codice**: Si verifica che il codice rispetti la specifica
4. **Integrazione**: Il codice viene integrato nel progetto
5. **Adattamento**: Eventuali modifiche per conformità al progetto

**Esempio di prompt per Copilot:**

```
Implementa un ViewModel per la ricerca città in MAUI usando MVVM Community Toolkit.

Requisiti:
- Proprietà SearchQuery con ObservableProperty
- Comando SearchCommand che chiama l'API Open-Meteo Geocoding
- Proprietà ObservableCollection<GeocodingResult> Results
- Proprietà IsLoading per il feedback visivo
- Gestione errori con try-catch e messaggio all'utente

L'endpoint API è: https://geocoding-api.open-meteo.com/v1/search?name={query}&count=5

Usa async/await e HttpClient iniettato.
```

#### Fase TEST

La fase di verifica include:

1. **Test funzionale**: La funzionalità funziona come specificato?
2. **Test edge cases**: Cosa succede con input non validi?
3. **Test integrazione**: Funziona con il resto dell'app?
4. **Test UI/UX**: L'interfaccia è usabile e responsive?
5. **Regressione**: Non ha rotto funzionalità esistenti?

### 2.3 Best Practices per i Prompt

#### Struttura di un Prompt Efficace

Un prompt efficace per l'AI deve contenere:

1. **Contesto**: Dove questo codice andrà inserito
2. **Obiettivo**: Cosa deve fare chiaramente
3. **Vincoli**: Limitazioni o requisiti specifici
4. **Esempi**: Eventuali esempi di codice simile nel progetto
5. **Formato output**: Come si desidera ricevere il codice

**Esempio di prompt strutturato:**

```
CONTEXTO:
Sto sviluppando un'app MAUI per tracciare le spese. Ho già implementato il modello Expense 
e il database SQLite. Uso MVVM Community Toolkit.

OBIETTIVO:
Crea un ViewModel per la pagina di aggiunta spesa (AddExpenseViewModel).

REQUISITI:
- Proprietà per: Amount (decimal), Description (string), Date (DateTime), Category (string)
- Comando SaveCommand che salva nel database
- Validazione: Amount > 0, Description non vuota
- Dopo il salvataggio, navigazione indietro alla lista

VINCOLI:
- Usa ObservableProperty e RelayCommand
- Il database è accessibile tramite IExpenseRepository iniettato
- Usa Shell.Current.GoToAsync per la navigazione

ESEMPIO:
Guarda il ViewModel ExpenseListViewModel nel progetto per lo stile da seguire.

FORMATO:
Fornisci solo il codice C# del ViewModel completo.
```

---

## 3. Strumenti AI Disponibili

### 3.1 GitHub Copilot Pro

#### Panoramica

GitHub Copilot Pro rappresenta lo strumento di assistenza alla programmazione più avanzato per l'ecosistema .NET. Attraverso il **GitHub Student Developer Pack**, gli studenti verificati possono accedere gratuitamente a tutte le funzionalità premium.

#### Attivazione di Copilot Student

1. Verificare lo status di studente su GitHub Education
2. Accedere a https://github.com/settings/education/benefits
3. Attivare GitHub Copilot Student
4. Configurare le preferenze d'uso

#### Installazione in Visual Studio 2022/2026

1. Aprire Visual Studio Installer
2. Selezionare "Modifica" sulla propria installazione
3. Nella scheda "Singoli componenti", cercare "GitHub Copilot"
4. Selezionare e installare
5. Al riavvio, accedere con il proprio account GitHub

#### Installazione in Visual Studio Code

1. Aprire il marketplace estensioni (Ctrl+Shift+X)
2. Cercare "GitHub Copilot"
3. Installare l'estensione ufficiale
4. Autenticarsi con l'account GitHub

#### Funzionalità Principali

##### Inline Completions (Completamenti Inline)

Copilot suggerisce codice in tempo reale mentre si scrive:

```csharp
// Digitando il commento, Copilot suggerisce l'implementazione
// Metodo per calcolare la media di una lista di decimali
public decimal CalculateAverage(List<decimal> values)
{
    // Copilot suggerisce automaticamente:
    if (values == null || values.Count == 0)
        return 0;
    
    return values.Average();
}
```

**Best Practice**: Premere `Tab` per accettare un suggerimento, `Esc` per rifiutarlo, `Alt+[` e `Alt+]` per navigare tra le alternative.

##### Copilot Chat

La finestra di chat permette interazioni più complesse:

- **/explain**: Spiega il codice selezionato
- **/fix**: Propone correzioni per errori
- **/tests**: Genera unit test per il codice
- **/doc**: Aggiunge documentazione XML

**Esempio di utilizzo in MAUI:**

```
Utente: Crea un servizio per chiamare l'API Open-Meteo in MAUI

Copilot: Ecco un esempio di implementazione:

public interface IWeatherService
{
    Task<WeatherResponse?> GetWeatherAsync(double lat, double lon);
}

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api.open-meteo.com/v1";

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<WeatherResponse?> GetWeatherAsync(double lat, double lon)
    {
        var url = $"{BaseUrl}/forecast?latitude={lat}&longitude={lon}&current=temperature_2m";
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<WeatherResponse>();
    }
}
```

##### Copilot per XAML

Copilot è particolarmente utile per la generazione di interfacce XAML:

```xml
<!-- Prompt: Crea una pagina di login con email, password e bottone -->
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.Pages.LoginPage"
             Title="Login">
    <VerticalStackLayout Spacing="20" Padding="30">
        <Image Source="logo.png" HeightRequest="100" HorizontalOptions="Center"/>
        
        <Entry Placeholder="Email" 
               Keyboard="Email"
               Text="{Binding Email}"/>
        
        <Entry Placeholder="Password" 
               IsPassword="True"
               Text="{Binding Password}"/>
        
        <Button Text="Accedi" 
                Command="{Binding LoginCommand}"
                IsEnabled="{Binding CanLogin}"/>
    </VerticalStackLayout>
</ContentPage>
```

#### Configurazione Ottimale per MAUI

Per ottenere i migliori risultati con Copilot in progetti MAUI:

1. **Aggiungere file .copilotignore** per escludere file generati automaticamente
2. **Utilizzare commenti descrittivi** prima di classi e metodi importanti
3. **Mantenere una struttura coerente** nel progetto per aiutare il contesto
4. **Usare nomi significativi** per classi, metodi e proprietà

**File .github/copilot-instructions.md:**

```markdown
# Istruzioni per Copilot - Progetto MAUI

## Convenzioni del Progetto

- Usa MVVM Community Toolkit (ObservableProperty, RelayCommand)
- Preferisci async/await per operazioni asincrone
- Usa Shell navigation per la navigazione tra pagine
- Implementa INotifyPropertyChanged tramite attributi

## Pattern Comuni

### ViewModel Base
```csharp
public partial class BaseViewModel : ObservableObject
{
    [ObservableProperty]
    private bool _isBusy;
    
    [ObservableProperty]
    private string _title = string.Empty;
}
```

### Servizio HTTP
- Usa HttpClient iniettato
- Gestisci errori con try-catch
- Usa System.Text.Json per la serializzazione
```

### 3.2 OpenCode

#### Panoramica

OpenCode è un assistente AI open-source per il terminale che supporta molteplici modelli LLM. A differenza di Copilot, OpenCode offre maggiore flessibilità nella scelta del modello e funziona direttamente da riga di comando.

#### Installazione

**Windows (PowerShell):**
```powershell
# Installazione via winget
winget install opencode

# Oppure via PowerShell script
irm https://opencode.ai/install.ps1 | iex
```

**macOS/Linux:**
```bash
# Installazione via script
curl -fsSL https://opencode.ai/install.sh | bash

# Oppure via Homebrew
brew install opencode
```

#### Configurazione dei Provider

OpenCode supporta diversi provider LLM. Per configurarli:

```bash
# Configurazione interattiva
opencode config

# Impostazione API key per OpenAI
opencode config set openai.api_key YOUR_API_KEY

# Impostazione per Ollama (modelli locali)
opencode config set ollama.enabled true
opencode config set ollama.url http://localhost:11434
```

#### Integrazione con VS Code

OpenCode offre un'estensione per VS Code disponibile su Open VSX:

1. Installare l'estensione da https://open-vsx.org/extension/sst-dev/opencode
2. Configurare il percorso di OpenCode nelle impostazioni
3. Usare il comando palette (Ctrl+Shift+P) → "OpenCode: Start"

#### Modalità di Lavoro

OpenCode opera in due modalità principali:

##### Plan Mode (Modalità Pianificazione)

In questa modalità, OpenCode analizza la richiesta e produce un piano di implementazione senza modificare i file:

```bash
$ opencode
> Voglio aggiungere una funzionalità di ricerca alla mia app meteo

OpenCode analizzerà il progetto e proporrà:

Piano di implementazione:
1. Creare un modello SearchResult per i risultati
2. Aggiungere metodo SearchAsync in IWeatherService
3. Implementare la UI di ricerca in XAML
4. Creare SearchViewModel con comando di ricerca

Vuoi procedere con questo piano? (y/n)
```

##### Build Mode (Modalità Costruzione)

In questa modalità, OpenCode implementa direttamente le modifiche:

```bash
$ opencode --build
> Implementa il ViewModel per la ricerca città

OpenCode creerà/modificherà i file necessari.
```

#### Comandi Utili per MAUI

```bash
# Analisi del progetto
opencode analyze

# Generazione ViewModel
opencode generate viewmodel --name CitySearchViewModel

# Refactoring
opencode refactor --file Services/WeatherService.cs --target "extract interface"

# Spiegazione codice
opencode explain --file ViewModels/MainViewModel.cs
```

#### Best Practices per OpenCode

1. **Usare sempre Plan Mode prima di Build Mode** per verificare l'approccio
2. **Fare riferimento a file specifici** con `@nomefile`
3. **Fornire contesto sufficiente** nelle richieste
4. **Verificare le modifiche** prima di committarle

### 3.3 Altri Strumenti AI

#### Ollama Cloud

Ollama permette di eseguire modelli LLM localmente o tramite cloud:

**Installazione:**
```bash
# Windows
winget install Ollama.Ollama

# macOS
brew install ollama
```

**Modelli consigliati per sviluppo:**
- `codellama:7b-code` - Ottimo per completamenti codice
- `deepseek-coder:6.7b` - Buon bilanciamento qualità/velocità
- `qwen2.5-coder:7b` - Eccellente per codice C#

#### KiloCode e ZenCode

Queste piattaforme offrono accesso a modelli gratuiti con limiti giornalieri:

- **KiloCode**: Accesso gratuito a modelli GPT-4o, Claude 3.5 Sonnet
- **ZenCode**: Focus su modelli ottimizzati per coding

**Utilizzo tipico:**
1. Registrarsi sulla piattaforma
2. Ottenere API key
3. Configurare in OpenCode o usare direttamente l'interfaccia web

---

## 4. Il Pattern Man-in-the-Loop

### 4.1 Concetto Fondamentale

Il pattern **Man-in-the-Loop** (MITL) rappresenta un approccio al ciclo di sviluppo dove l'umano mantiene il controllo decisionale ad ogni passaggio critico, utilizzando l'AI come strumento di supporto piuttosto che come agente autonomo.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   HUMAN     │◄──►│    AI       │◄──►│   HUMAN     │◄──►│   OUTPUT    │
│  (Decision) │    │  (Generate) │    │  (Review)   │    │  (Deploy)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 4.2 Applicazione nel Ciclo di Sviluppo

#### Iterazione Tipo con MITL

```markdown
# Piano di Lavoro - Sprint 1

## Iterazione 1.1: Setup progetto e modello dati

### Fase PLAN (15 min)
- [x] Definire struttura del progetto
- [x] Identificare modelli necessari
- [x] Scrivere specifiche modello

### Fase BUILD (30 min)
- [ ] Prompt AI per generazione modello
- [ ] Review codice generato
- [ ] Integrazione nel progetto
- [ ] Adattamento se necessario

### Fase TEST (15 min)
- [ ] Verifica compilazione
- [ ] Test creazione istanza
- [ ] Validazione proprietà

## Checkpoint Umano
Prima di procedere, verificare:
- [ ] Il modello rispetta i requisiti
- [ ] Le convenzioni di naming sono corrette
- [ ] La struttura è coerente con il resto del progetto
```

### 4.3 Punti di Controllo Obbligatori

Durante lo sviluppo, l'intervento umano è obbligatorio nei seguenti punti:

1. **Prima della generazione**: Approvazione del piano
2. **Dopo la generazione**: Review del codice prodotto
3. **Prima dell'integrazione**: Verifica compatibilità
4. **Dopo il testing**: Decisione sul proseguimento
5. **Prima del deployment**: Approvazione finale

### 4.4 Documentazione delle Decisioni

Ogni decisione significativa deve essere documentata:

```markdown
## Decision Log - 2025-03-20

### Decisione: Utilizzo di SQLite-net-pcl vs Entity Framework

**Contesto**: Scelta della libreria per accesso database

**Opzioni considerate**:
1. SQLite-net-pcl - Più leggero, raccomandato da Microsoft per MAUI
2. EF Core - Più potente, ma overhead maggiore

**Decisione**: SQLite-net-pcl

**Motivazione**: 
- Migliore performance su dispositivi mobili
- Documentazione Microsoft specifica per MAUI
- Overhead minore per operazioni CRUD semplici

**Impatto**: Richiede scrittura manuale di query SQL per operazioni complesse

**Presa da**: [Nome Studente]
**Data**: 2025-03-20
```

---

## 5. Proposte di Progetti

Di seguito vengono presentate quattro proposte di progetto complete, progettate per essere sviluppate con il metodo spec-driven e l'assistenza AI. Ogni progetto utilizza API gratuite con limiti sufficienti per scopi didattici.

### 5.1 Progetto 1: WeatherHub - App Meteo Avanzata

#### Descrizione

Un'applicazione meteo completa che utilizza l'API Open-Meteo per fornire previsioni dettagliate, con supporto per multiple località, grafici storici e notifiche.

#### API Utilizzate

| API | Endpoint | Limiti | Documentazione |
|-----|----------|--------|----------------|
| Open-Meteo Forecast | `https://api.open-meteo.com/v1/forecast` | Nessun limite, uso gratuito | https://open-meteo.com/en/docs |
| Open-Meteo Geocoding | `https://geocoding-api.open-meteo.com/v1/search` | Nessun limite | https://open-meteo.com/en/docs/geocoding-api |
| Open-Meteo Historical | `https://archive-api.open-meteo.com/v1/archive` | Nessun limite | https://open-meteo.com/en/docs/historical-weather-api |

#### Funzionalità Richieste

**Livello Base (6-7):**
- Ricerca città con autocomplete
- Visualizzazione meteo attuale (temperatura, umidità, vento)
- Previsioni per i prossimi 7 giorni
- Persistenza località preferite con SQLite

**Livello Intermedio (7-9):**
- Previsioni orarie dettagliate
- Grafici temperatura/giorno (LiveCharts2)
- Tema chiaro/scuro con persistenza
- Geolocalizzazione per rilevamento automatico

**Livello Avanzato (9-10):**
- Dati storici con confronto anno precedente
- Widget Android (se supportato)
- Esportazione dati in CSV
- Multi-lingua support

#### Architettura Suggerita

```
WeatherHub/
├── Models/
│   ├── WeatherResponse.cs
│   ├── GeocodingResult.cs
│   └── FavoriteCity.cs
├── Services/
│   ├── IWeatherService.cs
│   ├── WeatherService.cs
│   ├── IGeocodingService.cs
│   └── GeocodingService.cs
├── ViewModels/
│   ├── BaseViewModel.cs
│   ├── MainViewModel.cs
│   ├── SearchViewModel.cs
│   └── ForecastViewModel.cs
├── Views/
│   ├── MainPage.xaml
│   ├── SearchPage.xaml
│   └── ForecastPage.xaml
└── Data/
    ├── DatabaseConstants.cs
    └── WeatherRepository.cs
```

#### Esempio di Chiamata API

```csharp
// Servizio Meteo
public async Task<WeatherResponse?> GetForecastAsync(double latitude, double longitude)
{
    var url = $"https://api.open-meteo.com/v1/forecast?" +
              $"latitude={latitude}&longitude={longitude}" +
              $"&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
              $"&daily=temperature_2m_max,temperature_2m_min,weather_code" +
              $"&timezone=auto";
    
    var response = await _httpClient.GetAsync(url);
    response.EnsureSuccessStatusCode();
    
    return await response.Content.ReadFromJsonAsync<WeatherResponse>();
}
```

---

### 5.2 Progetto 2: PokeDex MAUI - Enciclopedia Pokémon

#### Descrizione

Un'applicazione enciclopedia che utilizza PokeAPI per esplorare il mondo Pokémon, con ricerca, filtri, preferiti e statistiche dettagliate.

#### API Utilizzate

| API | Endpoint | Limiti | Documentazione |
|-----|----------|--------|----------------|
| PokeAPI | `https://pokeapi.co/api/v2/` | ~100 req/IP/ora (fair use) | https://pokeapi.co/docs/v2 |

#### Funzionalità Richieste

**Livello Base (6-7):**
- Lista Pokémon con paginazione
- Dettaglio singolo Pokémon (immagine, tipo, statistiche)
- Ricerca per nome
- Persistenza preferiti con SQLite

**Livello Intermedio (7-9):**
- Filtri per tipo e generazione
- Confronto tra due Pokémon
- Grafico statistiche (radar chart)
- Cache locale delle risposte API

**Livello Avanzato (9-10):**
- Lista mosse con dettagli
- Catene evolutive visualizzate
- Quiz "Indovina il Pokémon"
- Condivisione su social

#### Architettura Suggerita

```
PokeDex/
├── Models/
│   ├── Pokemon.cs
│   ├── PokemonType.cs
│   ├── PokemonStats.cs
│   └── EvolutionChain.cs
├── Services/
│   ├── IPokemonService.cs
│   ├── PokemonService.cs
│   └── CacheService.cs
├── Converters/
│   ├── TypeToColorConverter.cs
│   └── StatToWidthConverter.cs
├── ViewModels/
│   ├── PokemonListViewModel.cs
│   ├── PokemonDetailViewModel.cs
│   └── CompareViewModel.cs
└── Views/
    ├── PokemonListPage.xaml
    ├── PokemonDetailPage.xaml
    └── ComparePage.xaml
```

#### Esempio di Modello

```csharp
public class Pokemon
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ImageUrl => $"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{Id}.png";
    public List<PokemonType> Types { get; set; } = new();
    public PokemonStats Stats { get; set; } = new();
    public int Height { get; set; }
    public int Weight { get; set; }
}
```

---

### 5.3 Progetto 3: CurrencyPro - Convertitore Valute Avanzato

#### Descrizione

Un'applicazione per il tracciamento e la conversione di valute con storico, grafici e calcolatrice integrata.

#### API Utilizzate

| API | Endpoint | Limiti | Documentazione |
|-----|----------|--------|----------------|
| ExchangeRate-API | `https://api.exchangerate-api.com/v4/latest/{base}` | 1500 req/mese (free tier) | https://www.exchangerate-api.com/docs |
| REST Countries | `https://restcountries.com/v3.1/` | Nessun limite | https://restcountries.com/ |

#### Funzionalità Richieste

**Livello Base (6-7):**
- Conversione tra due valute selezionate
- Lista completa delle valute con bandiere
- Tasso di cambio aggiornato
- Calcolatrice integrata

**Livello Intermedio (7-9):**
- Storico conversioni in SQLite
- Grafico andamento tasso (ultimi 30 giorni)
- Conversione multi-valuta simultanea
- Preferiti rapidi

**Livello Avanzato (9-10):**
- Alert quando il tasso supera una soglia
- Esportazione storico in Excel/CSV
- Calcolo "spesa viaggio" (budget in valuta estera)
- Offline mode con ultimi dati scaricati

#### Architettura Suggerita

```
CurrencyPro/
├── Models/
│   ├── ExchangeRate.cs
│   ├── Currency.cs
│   ├── ConversionHistory.cs
│   └── RateHistory.cs
├── Services/
│   ├── IExchangeRateService.cs
│   ├── ExchangeRateService.cs
│   └── ICountryService.cs
├── Helpers/
│   └── CurrencyHelper.cs
├── ViewModels/
│   ├── ConverterViewModel.cs
│   ├── HistoryViewModel.cs
│   └── ChartsViewModel.cs
└── Views/
    ├── ConverterPage.xaml
    ├── HistoryPage.xaml
    └── ChartsPage.xaml
```

---

### 5.4 Progetto 4: WordMaster - Dizionario Interattivo

#### Descrizione

Un'applicazione dizionario con definizioni, pronuncia, sinonimi e funzionalità di apprendimento vocabolario.

#### API Utilizzate

| API | Endpoint | Limiti | Documentazione |
|-----|----------|--------|----------------|
| Free Dictionary API | `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` | Nessun limite | https://dictionaryapi.dev/ |
| JokeAPI (bonus) | `https://v2.jokeapi.dev/joke/Any` | 120 req/min | https://jokeapi.dev/ |

#### Funzionalità Richieste

**Livello Base (6-7):**
- Ricerca parole con definizioni
- Visualizzazione fonetica
- Audio pronuncia (se disponibile)
- Lista parole recenti in SQLite

**Livello Intermedio (7-9):**
- Sinonimi e antonimi
- Esempi di utilizzo
- "Parola del giorno"
- Lista parole salvate

**Livello Avanzato (9-10):**
- Flashcards per memorizzazione
- Quiz vocabolario
- Analisi statistiche apprendimento
- Esportazione liste personali

#### Architettura Suggerita

```
WordMaster/
├── Models/
│   ├── WordDefinition.cs
│   ├── Meaning.cs
│   ├── Phonetic.cs
│   └── SavedWord.cs
├── Services/
│   ├── IDictionaryService.cs
│   ├── DictionaryService.cs
│   └── ITextToSpeechService.cs
├── ViewModels/
│   ├── SearchViewModel.cs
│   ├── WordDetailViewModel.cs
│   └── FlashcardsViewModel.cs
└── Views/
    ├── SearchPage.xaml
    ├── WordDetailPage.xaml
    └── FlashcardsPage.xaml
```

---

## 6. Guide Passo-Passo per Progetti

### 6.1 WeatherHub - Guida Completa

#### Fase 1: Setup Iniziale (Iterazione 1)

**Obiettivo**: Creare il progetto MAUI e configurare l'architettura base

**Prompt per Copilot:**
```
Crea un nuovo progetto .NET MAUI chiamato WeatherHub con:
- Target framework .NET 8.0
- Supporto Android e iOS
- Pacchetti NuGet: CommunityToolkit.Mvvm, sqlite-net-pcl, LiveCharts2.Maui
- Struttura cartelle: Models, Services, ViewModels, Views, Data
```

**Checklist:**
- [ ] Progetto creato e compilabile
- [ ] Pacchetti installati
- [ ] Struttura cartelle definita
- [ ] MauiProgram.cs configurato con dependency injection

#### Fase 2: Modelli Dati (Iterazione 2)

**Obiettivo**: Definire i modelli per le risposte API e il database

**Prompt per Copilot:**
```
Crea i modelli per l'API Open-Meteo in MAUI:

1. WeatherResponse - per la risposta forecast
2. CurrentWeather - per i dati attuali
3. DailyForecast - per le previsioni giornaliere
4. FavoriteCity - modello database SQLite

Usa System.Text.Json per la deserializzazione.
Esempio risposta API:
{
  "current": {
    "temperature_2m": 22.5,
    "relative_humidity_2m": 65,
    "weather_code": 1,
    "wind_speed_10m": 12.3
  },
  "daily": {
    "time": ["2025-03-20", "2025-03-21"],
    "temperature_2m_max": [24.0, 25.5],
    "temperature_2m_min": [15.2, 16.0],
    "weather_code": [1, 2]
  }
}
```

**Verifica:**
- [ ] Modelli compilano correttamente
- [ ] Attributi JsonPropertyName corretti
- [ ] FavoriteCity ha attributi SQLite

#### Fase 3: Servizi (Iterazione 3)

**Obiettivo**: Implementare i servizi per chiamate API e database

**Prompt per Copilot:**
```
Crea IWeatherService e WeatherService per MAUI:

Requisiti:
- Metodo GetCurrentWeatherAsync(double lat, double lon)
- Metodo GetForecastAsync(double lat, double lon, int days = 7)
- HttpClient iniettato nel costruttore
- Gestione errori con try-catch
- URL base: https://api.open-meteo.com/v1/forecast

Parametri da includere:
- current: temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m
- daily: temperature_2m_max,temperature_2m_min,weather_code
- timezone: auto
```

#### Fase 4: UI Principale (Iterazione 4)

**Obiettivo**: Creare la pagina principale con visualizzazione meteo

**Prompt per Copilot:**
```
Crea MainPage.xaml per app meteo MAUI con:

Layout:
- SearchBar in alto per ricerca città
- Label grande per temperatura attuale
- Grid con: umidità, vento, condizione
- CollectionView per previsioni giornaliere

Stile:
- Usa Material Design colors
- FontSize adattivo
- Spacing consistente (15-20)
- Icone FontAwesome per condizioni meteo

Binding:
- Temperatura: {Binding CurrentTemperature}
- Previsioni: {Binding DailyForecasts}
- Comando ricerca: {Binding SearchCommand}
```

#### Fase 5: ViewModel (Iterazione 5)

**Obiettivo**: Implementare MainViewModel con logica completa

**Prompt per Copilot:**
```
Crea MainViewModel per app meteo usando MVVM Community Toolkit:

Proprietà:
- [ObservableProperty] CurrentTemperature: double
- [ObservableProperty] CurrentHumidity: int
- [ObservableProperty] CurrentWindSpeed: double
- [ObservableProperty] ObservableCollection<DailyForecast> DailyForecasts
- [ObservableProperty] bool IsLoading
- [ObservableProperty] string SearchQuery

Comandi:
- [RelayCommand] async Task SearchAsync()
- [RelayCommand] async Task LoadWeatherAsync(double lat, double lon)

Servizi iniettati:
- IWeatherService
- IGeocodingService
- IWeatherRepository (per preferiti)

Logica:
- SearchAsync chiama geocoding, poi carica meteo
- LoadWeatherAsync chiama API e popola proprietà
- Gestione errori con UserDialogs
```

#### Fase 6: Persistenza (Iterazione 6)

**Obiettivo**: Aggiungere SQLite per preferiti

**Prompt per Copilot:**
```
Crea repository SQLite per città preferite in MAUI:

Interfaccia IWeatherRepository:
- Task<List<FavoriteCity>> GetFavoritesAsync()
- Task AddFavoriteAsync(FavoriteCity city)
- Task RemoveFavoriteAsync(int cityId)
- Task<bool> IsFavoriteAsync(int cityId)

Implementazione WeatherRepository:
- Usa sqlite-net-pcl
- Database in FileSystem.AppDataDirectory
- Metodi async con ConfigureAwait(false)

Inizializzazione in MauiProgram.cs
```

#### Fase 7: Tema e Polish (Iterazione 7)

**Obiettivo**: Aggiungere tema chiaro/scuro e rifiniture finali

**Prompt per Copilot:**
```
Aggiungi supporto tema chiaro/scuro a MAUI app:

1. Crea ThemeService che gestisce il tema
2. Aggiungi risorse LightTheme e DarkTheme in Resources/Styles
3. Implementa cambio tema runtime
4. Persisti preferenza in Preferences
5. Aggiungi toggle in UI (Switch o Picker)

Usa AppThemeBinding per colori dinamici.
```

---

### 6.2 PokeDex - Guida Completa

#### Fase 1: Setup e Configurazione

**Prompt iniziale:**
```
Crea progetto MAUI PokeDex con:
- .NET 8.0
- Pacchetti: CommunityToolkit.Mvvm, sqlite-net-pcl, LiveCharts2.Maui, Microsoft.Maui.Controls
- Struttura: Models, Services, Converters, ViewModels, Views
- Configura HttpClient in MauiProgram.cs con BaseAddress = "https://pokeapi.co/api/v2/"
```

#### Fase 2: Modelli Pokémon

**Prompt:**
```
Crea modelli per PokeAPI in MAUI:

Models:
1. PokemonListResponse - per lista con risultati
2. Pokemon - dettaglio completo
3. PokemonType - tipo con nome e URL
4. PokemonStats - statistiche base
5. FavoritePokemon - per SQLite (Id, Name, AddedDate)

Proprietà Pokemon:
- Id, Name, Height, Weight
- Types: List<PokemonType>
- Stats: PokemonStats
- Sprites con URL immagini

Usa JsonPropertyName per mappare nomi API (es. "base_experience").
```

#### Fase 3: Servizio API con Cache

**Prompt:**
```
Crea PokemonService con cache in MAUI:

Interfaccia IPokemonService:
- Task<PokemonListResponse> GetPokemonListAsync(int offset, int limit)
- Task<Pokemon?> GetPokemonAsync(int id)
- Task<Pokemon?> GetPokemonAsync(string name)
- Task<List<Pokemon>> GetPokemonByTypeAsync(string type)

Implementazione:
- HttpClient iniettato
- Cache in memoria (Dictionary<int, Pokemon>)
- Cache persistente in SQLite per preferiti
- Rate limiting: max 2 req/sec

Gestione errori:
- Return null se Pokemon non trovato
- Log errori con Debug.WriteLine
```

#### Fase 4: Lista con Paginazione

**Prompt:**
```
Crea PokemonListPage.xaml con paginazione:

UI:
- CollectionView con 2 colonne (grid layout)
- DataTemplate con: Image, Label nome, Label tipo
- ActivityIndicator in alto durante caricamento
- Button "Carica altri" in fondo

ViewModel:
- ObservableCollection<Pokemon> PokemonList
- int CurrentOffset (inizia da 0)
- int PageSize = 20
- Command LoadMoreCommand
- Command SelectPokemonCommand

Logica:
- Carica primo batch al caricamento
- LoadMore aggiunge alla lista esistente
- IsLoading previene chiamate multiple
```

#### Fase 5: Dettaglio Pokémon

**Prompt:**
```
Crea PokemonDetailPage.xaml:

Layout:
- ScrollView contenitore
- Grande immagine Pokémon centrata
- Nome grande (24pt) e numero (#001)
- Chip per tipi (colorati diversamente)
- Sezione "Informazioni": altezza, peso, base exp
- CollectionView statistiche con barre progresso
- Button "Aggiungi ai preferiti"

Converter:
- TypeToColorConverter (fire=rosso, water=blu, etc.)
- StatToPercentageConverter (max 255)

ViewModel:
- Pokemon property
- bool IsFavorite
- Command ToggleFavoriteCommand
- Command NavigateBackCommand
```

#### Fase 6: Grafico Statistiche

**Prompt:**
```
Aggiungi grafico radar statistiche Pokémon con LiveCharts2:

1. Installa LiveCharts2.Maui
2. Crea RadarChart in PokemonDetailPage
3. Configura serie con 6 statistiche (hp, attack, defense, special-attack, special-defense, speed)
4. Binding a Pokemon.Stats
5. Stile: colori tipo Pokémon, animazione

Esempio configurazione:
- Max value: 255
- Labels: HP, ATK, DEF, SPA, SPD, SPE
- Fill: colore tipo con opacità 0.3
```

---

### 6.3 CurrencyPro - Guida Completa

#### Fase 1: Setup Progetto

**Prompt:**
```
Crea progetto MAUI CurrencyPro:
- .NET 8.0
- Pacchetti: CommunityToolkit.Mvvm, sqlite-net-pcl, LiveCharts2.Maui
- Struttura standard MAUI
- Configura HttpClient per exchangerate-api.com
```

#### Fase 2: Modelli e Servizi

**Prompt:**
```
Crea modelli e servizi per convertitore valute:

Models:
1. ExchangeRateResponse - risposta API
2. Currency - codice, nome, simbolo, flag
3. ConversionHistory - record conversione SQLite
4. RateHistory - storico tassi

Services:
- IExchangeRateService con:
  - Task<ExchangeRateResponse> GetLatestRatesAsync(string baseCurrency)
  - Task<decimal> ConvertAsync(decimal amount, string from, string to)
  - Task<Dictionary<string, string>> GetCurrenciesAsync()

- IHistoryRepository per SQLite:
  - Task SaveConversionAsync(ConversionHistory history)
  - Task<List<ConversionHistory>> GetHistoryAsync(int limit = 50)
```

#### Fase 3: UI Convertitore

**Prompt:**
```
Crea ConverterPage.xaml:

Layout:
- Picker "Da valuta" (con bandiere)
- Picker "A valuta" (con bandiere)
- Entry importo (numeric keyboard)
- Label grande risultato
- Button "Converti"
- Button "Scambia" (swap valute)
- Label tasso corrente

Picker con bandiere:
- Usa FontAwesome o emoji bandiere
- Display: "🇺🇸 USD - US Dollar"
- SelectedValue: codice valuta

ViewModel:
- ObservableCollection<Currency> Currencies
- Currency SelectedFrom, SelectedTo
- decimal Amount, Result
- DateTime LastUpdated
- Command ConvertCommand, SwapCommand
```

#### Fase 4: Grafico Storico

**Prompt:**
```
Aggiungi grafico storico tassi:

1. Crea metodo GetHistoricalRatesAsync in servizio
2. Usa endpoint: https://api.exchangerate-api.com/v4/latest/{base}
   (nota: API gratuita ha dati giornalieri)
3. Crea pagina ChartsPage con LineChart
4. Asse X: date, Asse Y: tasso
5. Selezione coppia valute da visualizzare
6. Range: 7, 30, 90 giorni

Nota: Per dati storici reali servirebbe piano a pagamento.
Alternativa: salvare tassi giornalieri in SQLite.
```

---

### 6.4 WordMaster - Guida Completa

#### Fase 1: Setup e Modelli

**Prompt:**
```
Crea progetto MAUI WordMaster:
- .NET 8.0
- Pacchetti: CommunityToolkit.Mvvm, sqlite-net-pcl
- Struttura standard

Models:
1. WordDefinition - parola con definizioni
2. Meaning - significato con definizioni ed esempi
3. Definition - definizione singola
4. Phonetic - pronuncia con audio
5. SavedWord - SQLite (Word, AddedDate, Notes)
```

#### Fase 2: Servizio Dizionario

**Prompt:**
```
Crea DictionaryService per Free Dictionary API:

Interfaccia IDictionaryService:
- Task<List<WordDefinition>> SearchAsync(string word)
- Task<WordDefinition?> GetRandomWordAsync()
- Task<bool> WordExistsAsync(string word)

Implementazione:
- Endpoint: https://api.dictionaryapi.dev/api/v2/entries/en/{word}
- Gestione 404 (parola non trovata)
- Parsing risposta complessa
- Cache in memoria per parole recenti

Esempio risposta:
[{
  "word": "hello",
  "phonetic": "/həˈləʊ/",
  "phonetics": [{"text": "/həˈləʊ/", "audio": "..."}],
  "meanings": [{
    "partOfSpeech": "noun",
    "definitions": [{"definition": "...", "example": "..."}]
  }]
}]
```

#### Fase 3: UI Ricerca e Dettaglio

**Prompt:**
```
Crea SearchPage e WordDetailPage:

SearchPage:
- SearchBar in alto
- ListView risultati (parola + fonetica)
- Suggerimenti recenti
- Button "Parola casuale"

WordDetailPage:
- Header: parola grande, fonetica, button audio
- CollectionView significati:
  - Part of speech (verbo, nome, etc.)
  - Lista definizioni numerate
  - Esempi in corsivo
- Button "Salva parola"
- Button "Condividi"

Audio pronuncia:
- Usare MediaElement o aprire URL
- Fallback: text-to-speech se audio non disponibile
```

#### Fase 4: Flashcards

**Prompt:**
```
Crea sistema flashcards per memorizzazione:

FlashcardsPage:
- CarouselView o SwipeView per scorrere
- Card front: parola
- Card back: definizione principale
- Button "Conosco" / "Da ripassare"
- Progress bar percentuale conosciute

ViewModel:
- ObservableCollection<SavedWord> WordsToStudy
- int CurrentIndex
- bool IsFlipped
- Command FlipCommand
- Command KnownCommand
- Command ReviewCommand

Logica:
- Filtra parole non ancora memorizzate
- Algoritmo ripetizione spaziata semplice
- Statistiche: totali, conosciute, in corso
```

---

## 7. Deployment di Applicazioni MAUI

### 7.1 Preparazione al Deployment

Prima di distribuire un'applicazione MAUI, è necessario completare alcune operazioni preliminari:

#### Configurazione dell'Applicazione

**Assembly Info:**
```csharp
// In Platforms/Android/AssemblyInfo.cs e Platforms/iOS/AssemblyInfo.cs
[assembly: AssemblyTitle("WeatherHub")]
[assembly: AssemblyDescription("Applicazione meteo avanzata")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]
```

**App Icon e Splash Screen:**
- Sostituire le immagini in `Resources/AppIcon` e `Resources/Splash`
- Assicurarsi che rispettino le dimensioni richieste
- Verificare la corretta configurazione in `.csproj`:

```xml
<MauiIcon Include="Resources\AppIcon\appicon.svg" Color="#512BD4" />
<MauiSplashScreen Include="Resources\Splash\splash.svg" Color="#512BD4" />
```

#### Ottimizzazione delle Performance

**Abilitare AOT (Ahead of Time) Compilation:**
```xml
<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <RunAOTCompilation>true</RunAOTCompilation>
  <AndroidEnableProfiledAot>true</AndroidEnableProfiledAot>
</PropertyGroup>
```

**Ridurre la dimensione dell'APK:**
```xml
<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <PublishTrimmed>true</PublishTrimmed>
  <TrimMode>link</TrimMode>
</PropertyGroup>
```

### 7.2 Deployment Android

#### Generazione APK (Sideloading)

L'APK (Android Package Kit) è il formato per la distribuzione diretta dell'applicazione:

**Comando CLI:**
```bash
dotnet publish -f net8.0-android -c Release -p:AndroidPackageFormat=apk
```

**Output:**
Il file APK si troverà in:
```
bin/Release/net8.0-android/publish/com.companyname.weatherhub-Signed.apk
```

**Installazione su dispositivo:**
```bash
# Abilitare USB debugging sul dispositivo
# Connettere via USB
adb install "path/to/app-Signed.apk"
```

#### Generazione AAB (Google Play Store)

L'AAB (Android App Bundle) è il formato richiesto per Google Play Store:

**Comando CLI:**
```bash
dotnet publish -f net8.0-android -c Release -p:AndroidPackageFormat=aab
```

**Configurazione necessaria in .csproj:**
```xml
<PropertyGroup Condition="'$(TargetFramework)' == 'net8.0-android'">
  <AndroidPackageFormat>aab</AndroidPackageFormat>
  <AndroidUseAapt2>true</AndroidUseAapt2>
  <AndroidCreatePackagePerAbi>false</AndroidCreatePackagePerAbi>
</PropertyGroup>
```

#### Firma dell'Applicazione

**Creazione Keystore:**
```bash
keytool -genkey -v -keystore weatherhub.keystore -alias weatherhub -keyalg RSA -keysize 2048 -validity 10000
```

**Configurazione in .csproj:**
```xml
<PropertyGroup Condition="'$(TargetFramework)' == 'net8.0-android'">
  <AndroidSigningKeyStore>weatherhub.keystore</AndroidSigningKeyStore>
  <AndroidSigningKeyAlias>weatherhub</AndroidSigningKeyAlias>
  <AndroidSigningKeyPass>password</AndroidSigningKeyPass>
  <AndroidSigningStorePass>password</AndroidSigningStorePass>
</PropertyGroup>
```

### 7.3 Deployment iOS

#### Requisiti

- Mac con macOS (per compilazione)
- Xcode installato
- Apple Developer Account (99$/anno per distribuzione App Store)
- Provisioning Profile e Certificate

#### Generazione IPA (Sideloading)

**Comando CLI:**
```bash
dotnet publish -f net8.0-ios -c Release -p:BuildIpa=true
```

**Output:**
```
bin/Release/net8.0-ios/publish/WeatherHub.ipa
```

#### Distribuzione TestFlight/App Store

1. **Archiviare in Xcode:**
   - Aprire il progetto generato in `bin/Release/net8.0-ios/`
   - Product → Archive

2. **Distribute App:**
   - Selezionare l'archive
   - Distribute App → App Store Connect
   - Seguire la procedura guidata

3. **Su App Store Connect:**
   - Completare le informazioni dell'app
   - Caricare screenshot
   - Sottomettere per review

### 7.4 Distribuzione Alternativa

#### Microsoft Intune (Enterprise)

Per distribuzione interna aziendale:

1. Registrare l'app in Microsoft Endpoint Manager
2. Configurare policies di distribuzione
3. Caricare l'APK/AAB o IPA
4. Assegnare a gruppi di utenti

#### Firebase App Distribution

Per beta testing:

1. Creare progetto Firebase
2. Aggiungere app Android/iOS
3. Caricare build in App Distribution
4. Invitare tester via email

```bash
# Installare Firebase CLI
npm install -g firebase-tools

# Login e distribuzione
firebase login
firebase appdistribution:distribute app.apk --app 1:1234567890:android:abc123 --groups testers
```

### 7.5 Checklist Pre-Release

#### Testing
- [ ] Test su dispositivi fisici (almeno 2-3 dimensioni schermo)
- [ ] Test in modalità offline
- [ ] Test rotazione schermo
- [ ] Test tema chiaro/scuro
- [ ] Verifica permessi richiesti

#### Sicurezza
- [ ] API key non hardcoded (usare secrets o config)
- [ ] Nessuna informazione sensibile nei log
- [ ] Validazione input utente
- [ ] Gestione errori appropriata

#### Performance
- [ ] Dimensione APK/AAB < 100MB
- [ ] Tempo avvio < 3 secondi
- [ ] Nessun memory leak rilevato
- [ ] Animazioni fluide (60fps)

#### Documentazione
- [ ] Privacy Policy aggiornata
- [ ] Descrizione app per store
- [ ] Screenshot per tutti i formati
- [ ] Video demo (opzionale)

---

## 8. Griglia di Valutazione

### 8.1 Principi di Valutazione per Progetti AI-Assisted

La valutazione di progetti sviluppati con assistenza AI richiede un approccio che consideri non solo il prodotto finale, ma l'intero processo di sviluppo. La griglia seguente è progettata per valutare:

1. **Comprensione** del codice prodotto
2. **Qualità** del processo di sviluppo
3. **Completezza** funzionale del prodotto
4. **Presentazione** del lavoro svolto

### 8.2 Griglia Dettagliata

#### Sezione A: Processo di Sviluppo (25%)

| Criterio | Punteggio | Descrizione |
|----------|-----------|-------------|
| **Documentazione Planning** | 0-5 | Presenza di piano di lavoro in Markdown con iterazioni chiare |
| | 5 | Piano completo con tutte le iterazioni, obiettivi, criteri di accettazione |
| | 3 | Piano presente ma incompleto o poco dettagliato |
| | 1 | Piano assente o minimale |
| **Uso Consapevole AI** | 0-5 | Dimostrazione di comprensione del codice generato |
| | 5 | Spiega ogni componente, modifica il codice AI in modo appropriato |
| | 3 | Utilizza codice AI con modifiche superficiali |
| | 1 | Copia codice AI senza comprenderlo |
| **Iterazioni Documentate** | 0-5 | Tracciamento delle iterazioni PLAN-BUILD-TEST |
| | 5 | Ogni iterazione documentata con decisioni e risultati |
| | 3 | Alcune iterazioni documentate |
| | 1 | Nessuna traccia del processo iterativo |
| **Decision Log** | 0-5 | Registrazione decisioni architetturali significative |
| | 5 | Decision Log completo con contesto, opzioni, decisione, motivazione |
| | 3 | Alcune decisioni documentate |
| | 1 | Nessuna documentazione delle decisioni |
| **Version Control** | 0-5 | Uso appropriato di Git con commit significativi |
| | 5 | Commit frequenti, messaggi descrittivi, branch per feature |
| | 3 | Commit regolari ma messaggi generici |
| | 1 | Commit sporadici o unico commit finale |

#### Sezione B: Qualità del Codice (25%)

| Criterio | Punteggio | Descrizione |
|----------|-----------|-------------|
| **Architettura** | 0-5 | Struttura del progetto e separazione delle responsabilità |
| | 5 | Architettura MVVM corretta, servizi ben separati, dependency injection |
| | 3 | Struttura base corretta ma alcune criticità |
| | 1 | Codice disorganizzato, logica nel code-behind |
| **Convenzioni** | 0-5 | Rispetto delle convenzioni C# e MAUI |
| | 5 | Naming consistente, async/await corretto, proprietà con backing field appropriato |
| | 3 | Alcune incongruenze nelle convenzioni |
| | 1 | Naming casuale, pattern non riconoscibili |
| **Gestione Errori** | 0-5 | Gestione appropriata di eccezioni e casi limite |
| | 5 | Try-catch ovunque necessario, messaggi utente appropriati, logging |
| | 3 | Gestione errori base ma incompleta |
| | 1 | Nessuna gestione errori o crash silenziosi |
| **Performance** | 0-5 | Ottimizzazioni e buone pratiche |
| | 5 | ConfigureAwait, lazy loading, caching dove appropriato |
| | 3 | Codice funzionante ma senza ottimizzazioni |
| | 1 | Problemi di performance evidenti |
| **Commenti** | 0-5 | Documentazione del codice |
| | 5 | Commenti XML per metodi pubblici, commenti per logica complessa |
| | 3 | Alcuni commenti presenti |
| | 1 | Codice privo di commenti |

#### Sezione C: Funzionalità (30%)

| Criterio | Punteggio | Descrizione |
|----------|-----------|-------------|
| **Requisiti Base** | 0-10 | Implementazione funzionalità di base |
| | 10 | Tutte le funzionalità base implementate e funzionanti |
| | 7 | La maggior parte delle funzionalità base presenti |
| | 4 | Alcune funzionalità base mancanti |
| | 0 | Funzionalità base largamente incomplete |
| **Requisiti Intermedi** | 0-10 | Implementazione funzionalità intermedie |
| | 10 | Tutte le funzionalità intermedie implementate |
| | 7 | La maggior parte delle funzionalità intermedie presenti |
| | 4 | Alcune funzionalità intermedie mancanti |
| | 0 | Nessuna funzionalità intermedia |
| **Requisiti Avanzati** | 0-10 | Implementazione funzionalità avanzate |
| | 10 | Funzionalità avanzate complete e ben integrate |
| | 7 | Alcune funzionalità avanzate implementate |
| | 4 | Funzionalità avanzate minime o mal implementate |
| | 0 | Nessuna funzionalità avanzata |

#### Sezione D: UI/UX (10%)

| Criterio | Punteggio | Descrizione |
|----------|-----------|-------------|
| **Design** | 0-5 | Aspetto visivo e coerenza |
| | 5 | UI professionale, coerente, Material Design |
| | 3 | UI funzionale ma basilare |
| | 1 | UI confusa o non curata |
| **Usabilità** | 0-5 | Esperienza utente e intuitività |
| | 5 | App intuitiva, feedback chiari, gestione stati di caricamento |
| | 3 | App utilizzabile ma con alcune frizioni |
| | 1 | UX frustrante o confusionaria |

#### Sezione E: Presentazione (10%)

| Criterio | Punteggio | Descrizione |
|----------|-----------|-------------|
| **Demo Funzionante** | 0-5 | Dimostrazione dell'applicazione |
| | 5 | Demo fluida, tutte le funzionalità mostrate |
| | 3 | Demo con alcuni problemi minori |
| | 1 | Demo con problemi significativi |
| **Spiegazione Processo** | 0-5 | Capacità di spiegare il lavoro svolto |
| | 5 | Spiega architettura, scelte tecniche, uso AI |
| | 3 | Spiegazione generica del funzionamento |
| | 1 | Incapacità di spiegare il proprio codice |

### 8.3 Formula di Calcolo

```
Punteggio Totale = (A × 0.25) + (B × 0.25) + (C × 0.30) + (D × 0.10) + (E × 0.10)

Conversione in votazione:
- 90-100: 10 (Eccellente)
- 80-89: 9 (Ottimo)
- 70-79: 8 (Buono)
- 60-69: 7 (Discreto)
- 50-59: 6 (Sufficiente)
- <50: Insufficiente
```

### 8.4 Criteri di Valutazione Specifici per Progetto

#### WeatherHub - Checklist Funzionalità

**Base (6-7):**
- [ ] Ricerca città con risultati
- [ ] Visualizzazione meteo attuale
- [ ] Previsioni 7 giorni
- [ ] Preferiti in SQLite

**Intermedio (7-9):**
- [ ] Previsioni orarie
- [ ] Grafico temperatura
- [ ] Tema chiaro/scuro
- [ ] Geolocalizzazione

**Avanzato (9-10):**
- [ ] Dati storici
- [ ] Widget (se applicabile)
- [ ] Esportazione CSV
- [ ] Multi-lingua

#### PokeDex - Checklist Funzionalità

**Base (6-7):**
- [ ] Lista Pokémon paginata
- [ ] Dettaglio Pokémon
- [ ] Ricerca per nome
- [ ] Preferiti SQLite

**Intermedio (7-9):**
- [ ] Filtri tipo/generazione
- [ ] Confronto Pokémon
- [ ] Grafico statistiche
- [ ] Cache API

**Avanzato (9-10):**
- [ ] Lista mosse
- [ ] Catene evolutive
- [ ] Quiz
- [ ] Condivisione

#### CurrencyPro - Checklist Funzionalità

**Base (6-7):**
- [ ] Conversione valute
- [ ] Lista valute con bandiere
- [ ] Tasso aggiornato
- [ ] Calcolatrice

**Intermedio (7-9):**
- [ ] Storico conversioni
- [ ] Grafico andamento
- [ ] Conversione multi-valuta
- [ ] Preferiti rapidi

**Avanzato (9-10):**
- [ ] Alert tassi
- [ ] Esportazione Excel
- [ ] Budget viaggio
- [ ] Offline mode

#### WordMaster - Checklist Funzionalità

**Base (6-7):**
- [ ] Ricerca definizioni
- [ ] Visualizzazione fonetica
- [ ] Audio pronuncia
- [ ] Parole recenti

**Intermedio (7-9):**
- [ ] Sinonimi/antonimi
- [ ] Esempi utilizzo
- [ ] Parola del giorno
- [ ] Parole salvate

**Avanzato (9-10):**
- [ ] Flashcards
- [ ] Quiz vocabolario
- [ ] Statistiche
- [ ] Esportazione liste

---

## 9. Risorse e Riferimenti

### 9.1 Documentazione Ufficiale

| Risorsa | URL | Descrizione |
|---------|-----|-------------|
| .NET MAUI Docs | https://learn.microsoft.com/dotnet/maui | Documentazione ufficiale Microsoft |
| MVVM Community Toolkit | https://learn.microsoft.com/dotnet/communitytoolkit/mvvm | Toolkit MVVM ufficiale |
| Open-Meteo API | https://open-meteo.com/en/docs | Documentazione API meteo |
| PokeAPI Docs | https://pokeapi.co/docs/v2 | Documentazione API Pokémon |
| GitHub Copilot | https://docs.github.com/copilot | Guida all'uso di Copilot |

### 9.2 Tutorial e Corsi

| Risorsa | Tipo | Livello |
|---------|------|---------|
| .NET MAUI Workshop | Video/Codice | Intermedio |
| James Montemagno YouTube | Video | Tutti i livelli |
| Gerald Versluis MAUI Series | Video | Principiante |
| MAUI Samples GitHub | Codice | Tutti i livelli |

### 9.3 Strumenti AI

| Strumento | URL | Note |
|-----------|-----|------|
| GitHub Copilot | https://github.com/features/copilot | Richiede account studente |
| OpenCode | https://opencode.ai | Open source, multi-modello |
| Ollama | https://ollama.com | Modelli locali |
| KiloCode | https://kilocode.ai | Accesso gratuito a modelli premium |

### 9.4 API Gratuite per Progetti

| API | Endpoint | Limiti | Uso |
|-----|----------|--------|-----|
| Open-Meteo | open-meteo.com | Nessun limite | Meteo |
| PokeAPI | pokeapi.co | ~100 req/h | Pokémon |
| ExchangeRate-API | exchangerate-api.com | 1500/mese | Valute |
| Free Dictionary | dictionaryapi.dev | Nessun limite | Dizionario |
| REST Countries | restcountries.com | Nessun limite | Info paesi |
| JokeAPI | jokeapi.dev | 120 req/min | Battute |
| Nager.Date | date.nager.at | Nessun limite | Festività |

### 9.5 Librerie Consigliate

| Libreria | NuGet | Scopo |
|----------|-------|-------|
| CommunityToolkit.Mvvm | CommunityToolkit.Mvvm | MVVM pattern |
| sqlite-net-pcl | sqlite-net-pcl | Database locale |
| LiveCharts2.Maui | LiveChartsCore.SkiaSharpView.Maui | Grafici |
| Microsoft.Maui.Controls | Microsoft.Maui.Controls | UI base |

---

## Appendice A: Template Piano di Lavoro

```markdown
# Piano di Lavoro - [Nome Progetto]

## Informazioni Generali
- **Studente**: [Nome]
- **Data inizio**: [Data]
- **Data fine prevista**: [Data]
- **API utilizzata**: [Nome API]

## Architettura

### Struttura Progetto
```
NomeProgetto/
├── Models/
├── Services/
├── ViewModels/
├── Views/
├── Converters/ (se necessario)
└── Data/
```

### Diagramma Componenti
```
[View] ←→ [ViewModel] ←→ [Service] ←→ [API]
              ↓
         [Repository] ←→ [SQLite]
```

## Iterazioni

### Iterazione 1: Setup
**Obiettivo**: Creare progetto e configurazione base
**Durata stimata**: 1 ora
**Criteri accettazione**:
- [ ] Progetto compilabile
- [ ] Pacchetti installati
- [ ] Struttura cartelle definita

### Iterazione 2: Modelli
...

## Decision Log

### Decisione 1: [Titolo]
**Data**: [Data]
**Contesto**: [Descrizione]
**Opzioni**: [Elenco]
**Decisione**: [Scelta]
**Motivazione**: [Perché]
```

---

## Appendice B: Prompt Templates

### Template ViewModel
```
Crea un ViewModel per [NomePagina] in MAUI usando MVVM Community Toolkit:

Proprietà richieste:
- [Elenco proprietà con tipo]

Comandi richiesti:
- [Elenco comandi]

Servizi iniettati:
- [Elenco servizi]

Requisiti:
- Usa ObservableProperty e RelayCommand
- Implementa INotifyPropertyChanged tramite attributi
- Gestione errori con try-catch
```

### Template Servizio
```
Crea un servizio per [Funzionalità] in MAUI:

Interfaccia [INomeServizio]:
- [Elenco metodi con signature]

Implementazione:
- HttpClient iniettato
- URL base: [endpoint]
- Gestione errori appropriata
- Usa System.Text.Json

Modelli risposta:
- [Descrizione modelli necessari]
```

### Template Pagina XAML
```
Crea [NomePagina].xaml per MAUI:

Layout:
- [Descrizione layout]

Controlli:
- [Elenco controlli con binding]

Stile:
- [Requisiti stilistici]

Binding:
- [Proprietà ViewModel da bindare]
```

---

*Documento generato per il corso di Sviluppo Applicazioni Mobili con .NET MAUI e AI Assistance*
*Ultimo aggiornamento: Marzo 2025*
