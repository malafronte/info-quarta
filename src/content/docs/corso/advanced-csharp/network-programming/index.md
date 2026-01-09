---
title: "Programmazione di rete in C#"
description: "Programmazione di rete in C#"
sidebar:
  label: "Programmazione di rete"
  order: 1
---

## Presentazione generale

La programmazione di rete costituisce un ambito fondamentale dell’informatica moderna, poiché la maggior parte dei sistemi software interagisce con risorse remote e con servizi distribuiti.
In tale contesto, l’applicazione non opera più in isolamento, ma diventa un nodo di una rete di componenti che comunicano mediante protocolli condivisi.
Comprendere i concetti di identificazione delle risorse (URI/URL), i meccanismi del protocollo HTTP e i principi architetturali delle REST API consente di progettare soluzioni affidabili e interoperabili.
L’attenzione non riguarda soltanto “come inviare una richiesta”, ma anche come interpretare correttamente le risposte, gestire errori e condizioni di rete, rispettare vincoli di sicurezza e adottare pratiche di testing.
Nello sviluppo professionale, la padronanza di tali aspetti incide direttamente su prestazioni, scalabilità, manutenibilità e qualità del software.
In ambiente .NET/C#, la disponibilità di librerie mature (ad esempio `HttpClient`) facilita l’implementazione, ma richiede disciplina nell’uso delle risorse e nella gestione della concorrenza.

## Sintesi delle pagine

### [Aspetti generali della programmazione di rete](./general-aspects)

- La pagina introduce la programmazione di rete in .NET come insieme di API gestite e stratificate per l’accesso a servizi Internet.
- Viene chiarita la distinzione tra applicazioni client e server, evidenziando il modello client-server come base del Web.
- Si descrive il ruolo dei sistemi “intermedi” (middle-tier) che agiscono contemporaneamente da client e da server.
- Si definisce il concetto di risorsa e si spiega come il client costruisca una richiesta individuando risorsa e protocollo.
- Si introduce l’URI come identificatore generale e si colloca l’URL come sottoinsieme orientato alla localizzazione.
- Si presenta anche l’URN come identificatore per nome, distinto dall’URL e non necessariamente “raggiungibile”.
- Si analizza la sintassi standard dell’URI (scheme, authority, path, query, fragment) e il significato delle componenti.
- Si forniscono esempi di URI non limitati al Web (mailto, urn, tel), utili a comprendere la generalità del concetto.
- Viene discussa la differenza pratica tra URI e URL, con tabella riassuntiva e criteri di riconoscimento.
- Si introduce l’uso di `UriBuilder` per costruire URI in modo controllato e coerente.
- Si chiarisce la nozione di host come nome di dominio o indirizzo IP, mettendo in relazione leggibilità e instradamento.
- Si fornisce una descrizione introduttiva del protocollo IP e del suo carattere connectionless e best effort.
- Si richiamano, in modo semplificato, le strutture dei pacchetti IPv4 e IPv6 per collegare teoria e pratica.
- L’obiettivo didattico è fornire un vocabolario tecnico minimo per leggere e progettare comunicazioni in rete.
- La pagina prepara il lettore ai capitoli operativi su HTTP e sui client applicativi.
- Il contenuto insiste sull’importanza di distinguere identificatori, protocolli e ruoli dei componenti distribuiti.

### [Richieste e risposte HTTP](./http-requests-and-responses)

- La pagina presenta le richieste e le risposte HTTP in ambiente .NET come fondamento dell’interazione con servizi Web.
- Viene richiamata la costruzione di URI e il ruolo degli oggetti `Uri` e `UriBuilder` nella composizione corretta degli indirizzi.
- Si introduce `HttpClient` come sessione di comunicazione, con pool di connessioni e configurazioni riutilizzabili.
- Si evidenzia la best practice di riutilizzare `HttpClient` per evitare esaurimento di socket e problemi sotto carico.
- Si fornisce un primo esempio di download di testo via GET e di gestione delle eccezioni `HttpRequestException`.
- Viene mostrata una variante ottimizzata basata su concorrenza e `Task.WhenAll` per scaricare più risorse in parallelo.
- Si illustra come analizzare una risposta HTTP tramite `HttpResponseMessage`, status code e intestazioni (headers).
- Si distinguono gli headers generali dagli headers del contenuto e si richiamano charset e media type.
- Si affronta la configurazione del proxy, con logica specifica per Windows (registro di sistema) e alternativa per altri sistemi.
- Si propone un confronto didattico con cattura di rete (WireShark) per collegare il codice ai pacchetti osservabili.
- Si presenta l’esempio di salvataggio su file di una pagina web scaricata, come caso d’uso frequente.
- Vengono poi introdotte lettura e scrittura asincrone su file per evitare blocchi e migliorare reattività.
- Si evidenzia la necessità di gestire correttamente encoding e buffer quando si scrivono contenuti testuali.
- Il percorso insiste sulla comprensione del ciclo richiesta/risposta, non solo sull’uso “meccanico” dell’API.
- La pagina fornisce riferimenti esterni per esercizi e approfondimenti su `HttpClient`.
- L’obiettivo è rendere lo studente autonomo nell’ispezione delle risposte e nella diagnosi di problemi di rete.
