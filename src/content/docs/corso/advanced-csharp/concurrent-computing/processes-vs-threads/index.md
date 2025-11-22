---
title: "Processes vs Threads"
# linkTitle:
date: 2023-11-04T09:52:46+01:00
draft: false
type: docs
description: "Concetti di processo e di thread. Caratteristiche principali dei descrittori di un processo e di un thread. Richiami di architetture di Sistemi Operativi"
noindex: false
comments: false
nav_weight: 10
# nav_icon:
#   vendor: bootstrap
#   name: toggles
#   color: '#e24d0e'
authors:
  - malafronte
series:
  - Docs
categories:
#  - 
tags:
#  - 
images:
#  - 
# menu:
#   main:
#     weight: 100
#     params:
#       icon:
#         vendor: bs
#         name: book
#         color: '#e24d0e'
---
<style>p {text-align: justify}</style>

## Concetto di Processo

In questa sezione si riprendono alcuni argomenti che dovrebbero essere già noti, dal corso di Sistemi Operativi. Un Sistema Operativo[^1] esegue una varietà di programmi. Più precisamente ***un programma in esecuzione*** si chiama **Processo**.  
Un processo è caratterizzato da:

* Codice
* Dati
* Flusso di controllo

Più precisamente le componenti di un **Processo** sono:

* **Codice** del programma (*text* o *code section*)
* **Dati** del programma
  * Variabili globali in memoria centrale (*data section*)
  * Variabili locali e non locali (*stack*)
  * Variabili temporanee generate dal compilatore
  (registri del processore)
  * Variabili allocate dinamicamente (*heap*)
    * anche se l'allocazione e la de-allocazione della memoria all'interno di questo segmento sono a carico del programmatore
* **Stato di evoluzione della computazione**
  * Program counter
  * Valore delle variabili
  * Informazioni di gestione del contesto della chiamata di procedure
(indirizzo di ritorno, frame pointer, stack pointer)

![Memory layout di un processo](Memory-layout-processo.png#center)

Si noti che un Processo non è un Programma:

* Un Programma è un'entità passiva e corrisponde ad una lista di istruzioni che implementa un dato algoritmo in un dato linguaggio.
* Un Processo è un'entità attiva con valori delle variabili e risorse in uso.
* Anche se due processi possono essere associati allo stesso programma, essi sono due differenti *istanze di esecuzione* dello stesso codice.
  
### Lo stato di un Processo

È lo stato di uso del processore da parte di un processo

* Possibili stati
  
* *Nuovo (new)*: Il processo è stato creato
* *In esecuzione (running)*: le istruzioni vengono eseguite
* *In attesa (waiting)*: il processo sta aspettando il verificarsi di qualche
evento
* *Pronto all’esecuzione (ready)*: il processo è in attesa di essere
assegnato ad un processore
* *Terminato (terminated)*: il processo ha terminato l’esecuzione

### Diagramma degli stati di un processo

![Diagramma degli stati di un processo](Diagrammi-stati-processo.png#center)

### Supporti per la gestione dei processi - PCB

{{% bootstrap/clearfix %}}
![Process Control Block - PCB](PCB.png#float-start)
Elementi presenti nel PCB:  
Struttura dati del kernel che mantiene le informazioni sul processo  
Stato del processo  
Identificatore del processo (Numero)  
Program counter  
Registri della CPU  
Info per la gestione della memoria centrale (limiti di memoria)  
Info sullo stato dell’I/O (ad es.: file aperti)  
Info per la schedulazione della CPU, etc.  
{{% /bootstrap/clearfix %}}

### Le code di schedulazione dei processi

I processi vengono gestiti mediante code:

* Coda di lavori (job queue) – contiene tutti i processi nel sistema
* Coda dei processi pronti (ready queue) – contiene tutti i processi che risiedono nella memoria centrale, pronti e in attesa di esecuzione
* Coda della periferica di I/O (device queues) – contiene i processi in attesa di una particolare periferica di I/O
* Il processo si muove fra le varie code

![Code dei processi nei vari stati](Code-processi-in-stati.png#center)

![Transizioni tra code](Transizioni-tra-code.png#center)

Esistono vari tipi di schedulatori:

* **Schedulatore a lungo termine (long-term scheduler)** – seleziona quale processo (attualmente in memoria di massa) deve essere inserito nella coda dei processi pronti
  * Controlla il grado di multi-programmazione
  * Richiamato solo quando un processo abbandona il sistema (termina)
* **Schedulatore a breve termine (Short-term scheduler)** – seleziona quale processo (in memoria) deve essere eseguito e alloca la CPU ad esso
* **Schedulatore a medio termine (Medium-term scheduler)** – SWAPPING rimuove un processo dalla memoria centrale e lo pone in memoria di massa
  * Supportato solo da alcuni Sistemi Operativi, come i sistemi basati su time-sharing

Nella figura seguente viene mostrato il diagramma delle code con l'aggiunta dello schedulatore a
medio termine

* Rimuove processi dalla memoria centrale: swapping out
* Reintroduce in memoria centrale i processi: swapping in

![Schedulatore a breve termine con schedulatore a medio termine](Schedulatore-Breve-Termine-Schedulatore-Medio-Termine.png#center)

* Lo schedulatore a breve termine è eseguito molto frequentemente (millisecondi) ⇒ (deve essere veloce)
* Lo schedulatore a lungo termine è eseguito molto meno frequentemente (secondi, minuti) ⇒ (può essere lento)
  * In alcuni SO può essere assente (ad es. in sistemi time-sharing,come Unix e MSWindows, il grado di multi-programmazione è regolato dallo schedulatore a medio termine)  
  * Ci si limita a caricare tutti i nuovi processi in memoria

### Context switch

E’ il passaggio della CPU da un processo ad un altro
**Context Switch** = sospensione del processo in esecuzione + caricamento del nuovo processo da mettere in esecuzione  

* Il *dispatcher* è il modulo che passa effettivamente il controllo della CPU ai processi scelti dallo scheduler a breve termine  
* Il tempo per il cambio di contesto (latenza di dispatch) è puro **tempo di gestione del sistema**, poiché durante il cambio non vengono compiute operazioni utili per la computazione dei processi  
* I tempi per i cambi di contesto dipendono sensibilmente dal supporto hardware: tipicamente sono inferiori ai 10 millisecondi  

![Cambio di contesto](Context-switch.png#center)

### Creazione di un processo

Il processo in esecuzione invoca una chiamata di sistema che crea e attiva un nuovo processo. Ad esempio, in SO Unix-like la chiamata è la `fork()`

* Processo generante ⇒ processo padre
* Processo generato ⇒ processo figlio

Il processo padre crea i processi figli, i quali a loro volta creano altri processi, formando un albero di processi

![Albero dei processi](Albero-processi.png#center)

### Risorse dei processi

Un nuovo processo può ottenere risorse in diversi modi:

* Condivise col padre
* Parzialmente condivise col padre
* Indipendenti dal padre (ottenute dal sistema)
  * Limitare le risorse del figlio ad un sottoinsieme di quelle del padre aiuta ad evitare che un processo crei troppi figli  

Inoltre, alla creazione, un processo figlio riceve dal padre i dati di inizializzazione  

* Parametri utili per l’esecuzione del processo
* Ad esempio, un processo che permette di visualizzare un'immagine riceverà dal padre il percorso del file

### Spazio di indirizzamento

Lo spazio di indirizzamento (memoria) del processo figlio è sempre distinto da quello del processo padre.  
Ci sono due possibili scenari:

* Il figlio è un **duplicato del padre**
  * stesso programma
  * stessi dati all’atto della creazione
* Il figlio ha un **nuovo programma** caricato nel proprio spazio di indirizzamento
* In Unix la chiamata `fork()` crea un duplicato del padre
* Lo spazio degli indirizzi può essere successivamente sovrascritto

### Esecuzione dei processi

Due scenari possibili:

* Il padre continua l’esecuzione in modo concorrente ai figli -  ***modalità asincrona***
* Il padre attende finché tutti (o alcuni) i suoi figli sono terminati - ***modalità sincrona***  
In entrambi i casi (sincrono e asincrono) viene invocata la funzione `fork()`, tuttavia, nel caso di modalità sincrona, la chiamata di sistema `exec`, usata dopo la `fork`, carica un nuovo programma nello spazio di memoria del processo che la esegue[^2].

![Esecuzione dei processi](Process-execution-model.png#center)

## Concetto di Thread

Anche chiamati ***lightweight process*** perché possiedono un contesto più snello rispetto ai processi.  

* Flusso di esecuzione indipendente
  * ***interno ad un processo***
  * condivide lo spazio di indirizzamento con gli altri thread del processo
  * Rappresentato da un **thread control block (TCB)** che punta al PCB del processo contenitore
* Esempio di applicazione multi-thread: programma di elaborazione
dei testi:
  * Thread per l’input da tastiera
  * Thread per la rappresentazione del testo
  * Thread per la correzione ortografica

Un thread[^3] è l'unità di base in cui un sistema operativo alloca il tempo del processore. Ogni thread ha una priorità di pianificazione e un insieme di strutture usate dal sistema per salvare il contesto del thread quando viene sospesa l'esecuzione del thread. Nel contesto del thread sono presenti tutte le informazioni necessarie per riprendere senza problemi l'esecuzione, incluso il set di registri della CPU del thread e lo stack. Nel contesto di un processo possono essere eseguiti più thread. Tutti i thread di un processo ne condividono lo spazio degli indirizzi virtuali. Un thread può eseguire qualsiasi parte del codice del programma, comprese le parti attualmente eseguite da un altro thread.  
Per impostazione predefinita, viene avviato un programma .NET con un thread singolo, spesso chiamato thread primario. Tuttavia, è possibile creare thread aggiuntivi per eseguire il codice in parallelo o contemporaneamente al thread primario. Questi thread sono spesso chiamati thread di lavoro. L'uso di più thread consente di aumentare la velocità di risposta dell'applicazione e di usare un sistema multiprocessore o multicore per aumentare la velocità effettiva dell'applicazione.  
Si consideri un'applicazione desktop in cui il thread primario è responsabile degli elementi dell'interfaccia utente e risponde alle azioni dell'utente. Usare i thread di lavoro per eseguire operazioni che richiedono molto tempo e che altrimenti occuperebbero il thread primario e impedirebbero all'interfaccia utente di rispondere. È anche possibile usare un thread dedicato per fare in modo che la comunicazione di rete o del dispositivo sia maggiormente reattiva ai messaggi in ingresso o agli eventi.
Se il programma esegue operazioni che possono essere eseguite in parallelo, il tempo di esecuzione totale può essere ridotto eseguendo queste operazioni in thread separati ed eseguendo il programma in un sistema multiprocessore o multicore. In un sistema di questo tipo, l'uso del multithreading potrebbe aumentare la velocità effettiva e la velocità di risposta.

Confronto tra processo e thread:

![Threads vs Processes](Threads-vs-Processes.png#center)

Rappresentazione di un processo nella memoria centrale:

![Processo in memoria](Processo-in-memoria.png#center)

Rappresentazione di più thread nella memoria centrale:

![Thread in memoria](Thread-in-memoria.png#center)

### Contesto: Thread vs Processi

* Contesto di un Thread
  * stato della computazione (registri, stack, PC…)
  * attributi (schedulazione, priorità)
  * descrittore di thread (tid, priorità, segnali pendenti, …)
  * memoria privata (TSD)
* Contesto di un processo; tutto quello che è nel contesto di un thread, ed inoltre:
  * spazio di memoria
  * risorse private (con le corrispondenti tabelle dei descrittori)

In un programma non-concorrente, o sequenziale. In ogni momento è possibile interrompere il programma e dire esattamente quale task si stava eseguendo, quale era la sequenza di chiamate, ecc. ⇒ Esecuzione deterministica
In un programma concorrente, si individuano un certo numero di task da eseguire come “flussi indipendenti”. Ogni task ha un compito specifico da portare avanti:

* I task possono comunicare tra loro: “flussi cooperanti”
* Regioni differenti del codice eseguite allo stesso tempo
* Lo stato di un programma ha più di una dimensione ⇒ Esecuzione non deterministica

### Vantaggi dei Thread

* **Semplicità di comunicazione inter-thread**. Condivisione di risorse più naturale, programmazione più semplice

  * I thread condividono per default la memoria e le risorse del processo che li genera (cioè, molti thread nello stesso spazio di indirizzi)
  * I thread quindi comunicano tramite condivisione di informazioni nella memoria del processo contenitore
  * I processi comunicano invece tramite meccanismi di scambio di messaggi messi in atto esplicitamente (dal programmatore)  

  Esempio: in un editor di testo almeno 3 thread condividono lo stesso file: il paginatore, il thread che legge i caratteri battuti sulla tastiera e il correttore ortografico. Con 3 processi, l’effetto non sarebbe lo stesso: i processi richiederebbero l’uso esclusivo del file e “cambi di contesto”

* **Efficienza e scalabilità**
  * Creazione e distruzione di thread in tempi rapidi
  * Context switch rapido e quindi scheduling più veloce dello scheduling dei processi
  * La comunicazione inter-thread è il più veloce dei meccanismi di comunicazione tra processi
  * Un programma multi-thread può continuare la computazione anche se uno dei suoi thread è bloccato (per esempio in attesa di I/O)
  * Rendere multi-thread un’applicazione reattiva ne migliora il tempo di risposta!
  * Su architetture multiprocessore i thread possono essere eseguiti in parallelo su distinti core di elaborazione ⇒ Maggior scalabilità

### Svantaggi dei Thread

* Difficoltà di ottenere risorse private.  
  * Per ottenere memoria privata all'interno di un thread esistono appositi meccanismi
* Pericolo di interferenza maggiore
  * la condivisione delle risorse accentua il pericolo di interferenza
  * gli accessi concorrenti alle risorse del processo contenitore devono essere sincronizzati per evitare interferenze (**thread safety**)

### Modelli di supporto dei Thread: User vs Kernel

I thread si possono implementare:

* **User-Level**: thread all’interno del processo utente gestiti da una libreria specifica (da un supporto run-time)
* il kernel non è a conoscenza dell’esistenza dei thread
* lo switch non richiede chiamate al kernel
* **Kernel-Level**: gestione dei thread affidata al sistema operativo
tramite chiamate di sistema
* gestione integrata processi e thread dal kernel
* lo switch è provocato da chiamate al kernel
In entrambi i casi, deve esistere una relazione tra i thread a livello
user e a livello kernel per permettere l’accesso alle risorse!

### Modelli multi-thread

Esistono diversi tipi di relazione tra thread a livello utente e thread a livello kernel:

* Molti-a-uno
* Uno-a-uno
* Molti-a-molti
* A due livelli  

A titolo di esempio si riporta il caso di mapping uno a uno, utilizzato in Linux e Windows:

![One to one thread mapping](One-to-One-ThreadMapping.png#center)

[^1]: [Corso di Informatica 2 - Modulo Sistemi Operativi - Prof. Alberto Caselli e Prof.ssa Patrizia Scandurra](https://homes.di.unimi.it/ceselli/SO/slides)
[^2]: [Differenze tra fork e exec](https://www.geeksforgeeks.org/difference-fork-exec/)
[^3]: [Threads and threading](https://docs.microsoft.com/en-us/dotnet/standard/threading/threads-and-threading)
