---
title: "Programmazione concorrente in C#"
description: "Programmazione concorrente in C#"
sidebar:
  label: "Generalità"
  order: 1
---
<style>p {text-align: justify}</style>

La programmazione concorrente costituisce un pilastro fondamentale dell'ingegneria del software moderna, permettendo la creazione di applicazioni reattive, efficienti e capaci di sfruttare appieno le potenzialità delle architetture hardware multi-core. Questa sezione del corso si propone di analizzare in dettaglio i meccanismi che regolano l'esecuzione simultanea di più sequenze di istruzioni, partendo dalle fondamenta gestite dal sistema operativo fino alle astrazioni di alto livello offerte dal framework .NET.

Inizialmente, viene introdotto il concetto di **Thread** come unità base di esecuzione, distinguendolo dal concetto di Processo e illustrandone il ciclo di vita all'interno dell'ambiente gestito. Si esamina l'utilizzo della classe `System.Threading.Thread` per la creazione e gestione esplicita dei thread, discutendo la differenza tra thread in foreground e background e l'importanza del **ThreadPool** per l'ottimizzazione delle risorse e la riduzione dell'overhead di creazione dei thread.

L'esecuzione concorrente introduce inevitabilmente complessità legate alla condivisione delle risorse e all'interferenza tra flussi di esecuzione. Vengono pertanto trattate le problematiche critiche quali le **Race Condition**, che si verificano quando il risultato di un'operazione dipende dall'ordine temporale di esecuzione non deterministico, e la corretta gestione delle **Sezioni Critiche**. Per garantire la consistenza dei dati e la *Thread Safety*, si approfondiscono le principali tecniche di sincronizzazione: dall'uso di operazioni atomiche con la classe `Interlocked`, ai costrutti di blocco esclusivo come `lock` e la classe `Monitor`, fino a primitive più avanzate come i **Semafori**. Si analizzano inoltre i rischi associati a una sincronizzazione errata o eccessiva, come il **Deadlock**, illustrato attraverso classici problemi di informatica teorica come quello del "Barbiere addormentato" o del modello "Produttore-Consumatore".

L'evoluzione del framework .NET ha introdotto astrazioni più potenti e flessibili per semplificare la scrittura di codice concorrente e parallelo. La sezione dedica ampio spazio alla **Task Parallel Library (TPL)** e al concetto di **Task**, che rappresenta un'operazione asincrona di livello superiore rispetto al semplice thread fisico. Vengono esplorati i pattern di parallelismo dei dati, attraverso costrutti come `Parallel.For` e `Parallel.ForEach`, e i meccanismi per la gestione del flusso di esecuzione parallelo (pattern fork/join), permettendo di decomporre problemi complessi in attività più piccole eseguibili in parallelo.

Infine, si affronta il moderno modello di **programmazione asincrona** basato sulle parole chiave `async` e `await`. Questo paradigma, divenuto essenziale per mantenere l'interfaccia utente reattiva e ottimizzare le operazioni di I/O (come l'accesso a file o risorse di rete), permette di scrivere codice asincrono mantenendo una struttura logica e sequenziale, delegando al compilatore la gestione della complessa macchina a stati sottostante. Vengono discussi i pattern TAP (*Task-based Asynchronous Pattern*), la gestione delle eccezioni in contesti asincroni e le strategie per la cancellazione cooperativa delle attività tramite `CancellationToken`.

Per approfondire ulteriormente gli argomenti trattati e consultare le specifiche tecniche dettagliate, si rimanda alla documentazione ufficiale Microsoft:

*   [Threading gestito](https://learn.microsoft.com/en-us/dotnet/standard/threading/) - Panoramica completa sui concetti di base del threading in .NET.
*   [Task Parallel Library (TPL)](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl) - Guida all'uso dei Task, del parallelismo dei dati e dei flussi di lavoro.
*   [Programmazione asincrona con async e await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/) - Modelli, sintassi e best practices per il codice asincrono moderno.
*   [Primitive di sincronizzazione](https://learn.microsoft.com/en-us/dotnet/standard/threading/overview-of-synchronization-primitives) - Approfondimento su lock, monitor, mutex e semafori.

