---
title: "Programmazione avanzata in C#"
description: "Programmazione avanzata in C#"
sidebar:
  label: "Generalità"
  order: 1
---
<style>p {text-align: justify}</style>

Questa sezione del corso è dedicata alla **Programmazione Avanzata in C#**.

Il percorso formativo è stato strutturato per elevare le competenze di sviluppo software, superando le basi della sintassi e i concetti fondamentali della programmazione orientata agli oggetti. L'obiettivo è fornire una padronanza completa di strumenti, pattern e paradigmi essenziali per la creazione di applicazioni moderne, robuste, scalabili e manutenibili.

Verranno approfonditi concetti che costituiscono l'ossatura delle applicazioni .NET professionali, permettendo la scrittura di codice efficiente e performante. La conoscenza di questi aspetti avanzati rappresenta un vantaggio competitivo significativo per chi aspira a ruoli di Senior Developer o Software Architect. Si consoliderà la conoscenza di meccanismi profondi del linguaggio come i **Generics**, per il riutilizzo del codice in sicurezza, e i **Delegati ed Eventi**, pilastri della programmazione a eventi e del disaccoppiamento dei componenti.

Un'attenzione particolare sarà riservata a due pilastri dello sviluppo dati in .NET: **LINQ** ed **Entity Framework Core**, trattati in modo estensivo nella documentazione del corso.

### LINQ (Language Integrated Query)

**LINQ** rappresenta una componente rivoluzionaria del framework .NET che unifica l'accesso ai dati da diverse sorgenti. Non ci si limiterà alla sintassi di base, ma si analizzeranno a fondo:
*   La distinzione tra **Query Syntax** e **Method Syntax**, valutando quando preferire l'una o l'altra per massimizzare leggibilità ed espressività.
*   Il concetto cruciale di **Deferred Execution** (esecuzione differita) contrapposto alla **Immediate Execution**, fondamentale per l'ottimizzazione delle performance e la corretta gestione della memoria.
*   L'utilizzo avanzato degli operatori standard di query per filtrare, ordinare, raggruppare e proiettare dati complessi in modo dichiarativo e fortemente tipizzato.
*   L'integrazione fluida con collezioni in memoria (LINQ to Objects) e altre sorgenti dati, rendendo il codice più manutenibile e meno soggetto a errori rispetto ai cicli imperativi tradizionali.

### Entity Framework Core (EF Core)

Parallelamente, verrà trattato in modo approfondito **Entity Framework Core**, l'ORM (Object-Relational Mapper) moderno, cross-platform e open source di Microsoft. Questa sezione coprirà aspetti critici per lo sviluppo enterprise:
*   La configurazione del **DbContext** e la modellazione avanzata delle entità, sfruttando sia le Data Annotations che la potenza della **Fluent API** per un controllo granulare sullo schema del database.
*   La gestione efficiente delle **Relazioni** (uno-a-uno, uno-a-molti, molti-a-molti) e le strategie di caricamento dei dati correlati (*Eager Loading*, *Explicit Loading* e *Lazy Loading*), analizzando l'impatto sulle performance.
*   Il sistema delle **Migrazioni**, strumento essenziale per evolvere lo schema del database in sincronia con il modello dei dati nel codice, gestendo il versionamento e il deploy in ambienti di produzione.
*   Tecniche di ottimizzazione delle query e gestione delle transazioni per garantire l'integrità dei dati.

### Programmazione Concorrente, Parallela e Asincrona

Un aspetto cruciale dello sviluppo moderno è la capacità di eseguire molteplici operazioni simultaneamente per sfruttare al meglio le risorse hardware (CPU multi-core) e migliorare la reattività delle applicazioni. Questa vasta sezione esplorerà in profondità:

*   **Multithreading**: Si analizzeranno i concetti fondamentali di **Thread** e **Processo**, il ciclo di vita dei thread e l'uso efficiente del **ThreadPool**. Verranno trattate le problematiche critiche della concorrenza come le **Race Condition**, gli stati transienti e i **Deadlock**, approfondendo le tecniche di sincronizzazione necessarie per garantire la *Thread Safety* (interlocked, monitor, lock, semafori).
*   **Costrutti di Concorrenza**: Verranno illustrati costrutti teorici e pratici come fork/join, cobegin/coend e le loro implementazioni in ambiente .NET.
*   **Task Parallel Library (TPL)**: Verrà introdotto il concetto di **Task** come astrazione di livello superiore rispetto ai thread. Si studieranno i pattern di parallelismo dei dati (**Parallel.For**, **Parallel.ForEach**), la gestione delle continuazioni, la cancellazione delle attività tramite `CancellationToken` e la gestione complessa delle eccezioni aggregate.
*   **Programmazione Asincrona**: Si approfondirà il pattern **async/await**, essenziale per mantenere l'interfaccia utente reattiva e gestire operazioni di I/O (come l'accesso a file o database) senza bloccare il thread principale. Verranno esaminati i modelli di programmazione asincrona (TAP) e il flusso di controllo in contesti asincroni.

### Programmazione di Rete e Architetture REST

Il panorama dello sviluppo software richiede inoltre competenze specifiche nella comunicazione tra sistemi. Pertanto, il corso include moduli dedicati alla **Programmazione di Rete**:

*   **Protocolli di Rete**: Analisi teorica e pratica della suite TCP/IP, con focus specifico su HTTP e HTTPS.
*   **HttpClient**: Studio approfondito della classe `HttpClient`, standard de facto per le richieste web in .NET. Si analizzeranno la gestione degli header, la serializzazione JSON e le best practices per la gestione del ciclo di vita delle connessioni (evitando il *Socket Exhaustion*).
*   **Architettura REST**: Studio dei principi REST (Representational State Transfer) per la progettazione e il consumo di API web scalabili, stateless e interoperabili.

### Sviluppo Mobile e Cross-Platform con .NET MAUI

Infine, verrà introdotto **.NET MAUI (Multi-platform App UI)**, l'evoluzione di Xamarin.Forms. Questa tecnologia consente la creazione di applicazioni native per Android, iOS, macOS e Windows partendo da un'unica base di codice condivisa (C# e XAML).
Si esplorerà come definire interfacce utente responsive, accedere alle funzionalità native del dispositivo (GPS, sensori, file system) e gestire la navigazione, massimizzando il riutilizzo del codice senza sacrificare le prestazioni native.

### Riferimenti e Guide Ufficiali

Per supportare lo studio e garantire un apprendimento continuo, è indispensabile fare riferimento alla documentazione ufficiale Microsoft. Di seguito sono riportati i collegamenti alle guide relative agli argomenti trattati:

*   [Guida completa a C#](https://learn.microsoft.com/en-us/dotnet/csharp/): La documentazione di riferimento sul linguaggio.
*   [LINQ (Language Integrated Query)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/): Guida completa all'uso di LINQ per l'interrogazione dei dati.
*   [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/): Documentazione ufficiale dell'ORM moderno per .NET.
*   [Threading in C#](https://learn.microsoft.com/en-us/dotnet/standard/threading/): Panoramica completa sul multithreading e la gestione dei thread.
*   [Task Parallel Library (TPL)](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl): Guida alla libreria per il parallelismo dei dati e delle attività.
*   [Programmazione asincrona con async e await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/): Best practices e pattern per la programmazione asincrona.
*   [Classe HttpClient](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient): Documentazione API per le richieste HTTP.
*   [Introduzione a .NET MAUI](https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui): Panoramica del framework per lo sviluppo di interfacce multipiattaforma.
*   [Architettura delle applicazioni .NET](https://learn.microsoft.com/en-us/dotnet/architecture/): Guida ai microservizi e alle applicazioni cloud-native.

Si incoraggia vivamente la consultazione regolare di queste risorse e la sperimentazione diretta con il codice per consolidare la comprensione teorica.
