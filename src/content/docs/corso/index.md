---
title: Panoramica del corso
description: Una descrizione degli argomenti e degli obiettivi principali del corso di informatica per le classi quarte dell'Istituto Greppi di Monticello Brianza
sidebar:
  label: "Panoramica del corso"
  order: 1
---

## Guida di riferimento per il corso di Informatica nella classe quarta

Il presente corso di Informatica, progettato per gli studenti del quarto anno dell'indirizzo informatico, si pone l'ambizioso obiettivo di consolidare ed espandere le competenze di programmazione maturate negli anni precedenti, introducendo paradigmi avanzati, metodologie di sviluppo professionale e tecnologie all'avanguardia. L'intento formativo primario è quello di plasmare figure tecniche dotate di una solida preparazione teorica e pratica, capaci di progettare, sviluppare e documentare sistemi software di elevata complessità, operando con piena consapevolezza sia in contesti di lavoro individuale che all'interno di team di sviluppo strutturati. Il percorso didattico si articola in moduli tematici interconnessi che spaziano dall'ingegneria del software alla programmazione di sistema, dallo sviluppo di servizi backend alla creazione di moderne interfacce per dispositivi mobili.

### Controllo di Versione e Collaborazione

Un pilastro trasversale e imprescindibile della formazione moderna riguarda la gestione del ciclo di vita del codice sorgente. Il corso introduce in modo approfondito **Git**, lo standard industriale *de facto* per il controllo di versione distribuito. Gli studenti acquisiranno una conoscenza dettagliata delle funzionalità core, comprendendo la distinzione tra *Working Directory*, *Staging Area* e *Repository*. Verrà analizzato e messo in pratica il *Git Workflow* professionale, padroneggiando operazioni fondamentali quali la creazione di *commit* atomici, la gestione delle ramificazioni tramite *branching*, e la successiva integrazione del codice tramite *merging*. Particolare enfasi sarà posta sugli strumenti di analisi delle differenze (*diff*), sulla gestione temporanea delle modifiche (*stash*) e sulla risoluzione dei conflitti, competenza critica per il lavoro di squadra.

Parallelamente all'uso della riga di comando, il corso integra l'utilizzo di **GitHub** come piattaforma di hosting remoto e collaborazione. Questo permette di simulare scenari reali di sviluppo distribuito, introducendo concetti quali *remote repository* (origin), operazioni di sincronizzazione bidirezionale (*fetch* e *pull*) e, soprattutto, le dinamiche di collaborazione tramite *Pull Request*. L'obiettivo è rendere lo studente autonomo nella gestione di progetti complessi e capace di contribuire efficacemente a repository condivisi.

### Programmazione Avanzata in C#

Il nucleo centrale del corso è dedicato all'approfondimento del linguaggio C# e dell'ecosistema .NET. Si parte dall'analisi di costrutti funzionali avanzati come i **delegati**, le **espressioni lambda** e la gestione degli **eventi**, elementi fondamentali per la scrittura di codice modulare, disaccoppiato e reattivo. Viene introdotto **LINQ** (Language Integrated Query), uno strumento potente che permette di interrogare e manipolare dati provenienti da sorgenti eterogenee con una sintassi uniforme ed espressiva.

Un focus significativo è riservato all'interazione con le basi di dati. Superando l'approccio classico basato su query SQL incorporate nel codice, il corso adotta **Entity Framework Core (EF Core)**, un moderno *Object-Relational Mapper (ORM)*. Gli studenti impareranno a modellare il dominio applicativo attraverso classi C#, definendo le corrispondenze tra oggetti e tabelle relazionali (*mapping* delle entità). Verranno trattate in dettaglio le associazioni tra entità (uno-a-molti, uno-a-uno, molti-a-molti) e l'implementazione delle operazioni **CRUD** (Create, Read, Update, Delete) sfruttando le *Fluent API* di LINQ. Questo approccio permette di astrarre la complessità del database sottostante (spesso SQLite per scopi didattici) e di concentrarsi sulla logica di business dell'applicazione.

La complessità dei moderni sistemi di calcolo richiede inoltre una profonda comprensione della **Programmazione Concorrente**. Il corso affronta la distinzione teorica e pratica tra *processi* e *thread*, esplorando il ciclo di vita dei thread in ambiente gestito. Vengono analizzate le problematiche tipiche dell'esecuzione parallela, come le *Race Condition*, l'accesso a risorse condivise e la corretta gestione delle *Sezioni Critiche*. Per garantire la consistenza dei dati e la *Thread Safety*, si studiano le principali tecniche di sincronizzazione: dall'uso di `Monitor` e `lock`, fino a primitive più complesse come *Semafori* e *Mutex*.
L'evoluzione verso il parallelismo moderno viene trattata attraverso la **Task Parallel Library (TPL)**. Gli studenti apprenderanno a utilizzare i *Task* come astrazione di livello superiore, implementando pattern di programmazione asincrona mediante le parole chiave `async` e `await`. Questo paradigma è essenziale per sviluppare applicazioni reattive che non bloccano l'interfaccia utente durante operazioni lunghe o di I/O.

Il modulo di **Programmazione di Rete** estende ulteriormente le capacità delle applicazioni. Si analizzano i meccanismi per effettuare richieste di dati verso endpoint remoti, gestendo protocolli come HTTP e FTP. L'uso degli *Stream* di rete viene approfondito per comprendere il trasferimento efficiente dei dati, sempre in un'ottica di esecuzione asincrona per garantire performance e scalabilità.

### Programmazione Avanzata in Python

Accanto all'ecosistema Microsoft, il corso dedica ampio spazio alla **Programmazione Avanzata in Python**, linguaggio divenuto standard in ambiti backend, data science e automazione. Dopo un richiamo ai fondamenti, si approfondisce il paradigma della **Programmazione ad Oggetti (OOP)** in Python: definizione di classi, costruttori (`__init__`), incapsulamento, ereditarietà (singola e multipla) e polimorfismo (*duck typing*). Vengono esplorati i "magic methods" per rendere le classi perfettamente integrate con la sintassi del linguaggio.

L'organizzazione del codice su larga scala è trattata attraverso la creazione di *moduli* e *pacchetti*, introducendo le best practices per la gestione delle dipendenze tramite ambienti virtuali (*venv*) e il gestore di pacchetti *pip*.
Il culmine di questo modulo è lo sviluppo di servizi web e **API REST** utilizzando il framework moderno **FastAPI**. Gli studenti impareranno a progettare architetture backend scalabili, definire il *routing*, gestire i verbi HTTP (GET, POST, PUT, DELETE) e validare rigorosamente i dati in ingresso e uscita tramite **Pydantic**. Si tratterà l'implementazione di server ASGI (come Uvicorn) e la gestione asincrona delle richieste, competenze chiave per lo sviluppo di microservizi moderni e performanti.

### Sviluppo Mobile

Per completare il panorama delle piattaforme, viene introdotto lo sviluppo di applicazioni mobili, focalizzandosi sull'ambiente **Android** tramite la piattaforma **.NET MAUI** (o tecnologie affini nell'ecosistema .NET). Vengono presentati i concetti cardine del sistema operativo Android, come le *Activity*, il ciclo di vita delle applicazioni e la gestione delle risorse. La definizione dell'interfaccia grafica (Layout) avviene separando la presentazione dalla logica, spesso mediante XML. Gli studenti affronteranno la gestione degli eventi utente, la persistenza dei dati locale sul dispositivo e lo scambio di informazioni tra diverse schermate dell'app. Un aspetto cruciale sarà la capacità dell'app mobile di connettersi a risorse di rete, chiudendo il cerchio con i servizi backend sviluppati nei moduli precedenti.

### Metodologia didattica

La metodologia didattica prevede una forte componente pratica ed esperienziale. Oltre alle lezioni teoriche, sono previste numerose **Esercitazioni e Verifiche** in laboratorio, volte a consolidare le abilità tecniche e la capacità di problem solving. Vengono attivati progetti individuali e di gruppo che simulano contesti lavorativi reali, incoraggiando l'autonomia, la collaborazione e la capacità di redigere documentazione tecnica accurata. Queste attività sono spesso propedeutiche o integrate con i percorsi di *FSL* (Formazione Scuola Lavoro - ex PCTO), permettendo agli studenti di applicare le competenze acquisite in progetti concreti (*Project Work*) e di prepararsi efficacemente all'ingresso nel mondo del lavoro o al proseguimento degli studi universitari.



