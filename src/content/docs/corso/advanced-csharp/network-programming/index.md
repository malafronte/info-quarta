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
La sezione propone quindi un percorso progressivo: dai fondamenti (URI, ruoli client/server) alle richieste HTTP, ai principi REST, fino agli strumenti di collaudo e a servizi reali su cui esercitarsi.

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

### [Architettura REST](./rest-architecture)

- La pagina definisce REST come stile architetturale (non protocollo e non standard) introdotto da Roy Fielding.
- Vengono presentati principi e vincoli (client-server, stateless, cacheable, layered system, uniform interface, code on demand).
- Si pone al centro il concetto di risorsa, identificata da URI e scambiata tramite rappresentazioni (JSON, XML, ecc.).
- Si introduce una guida al naming delle risorse con convenzioni per document, collection, store e controller.
- Si raccomanda coerenza nella progettazione delle URI, con indicazioni su slash, trattini, minuscole e assenza di estensioni.
- Si sottolinea che le URI devono rappresentare “cose” (sostantivi) e non azioni, lasciando l’operazione al metodo HTTP.
- Si mostra l’uso della query string per filtro, ordinamento e paginazione, evitando proliferazione di endpoint.
- Vengono discussi i metodi HTTP (GET/POST/PUT/DELETE/PATCH) in relazione a sicurezza, idempotenza e risultati attesi.
- Si collegano metodi e CRUD con una tabella di riepilogo per collezioni e risorse singole.
- Si introduce HATEOAS come vincolo distintivo, tramite link inseriti nella rappresentazione per guidare la navigazione.
- Si presenta il Richardson Maturity Model per classificare il livello di “maturità REST” di un servizio.
- Si richiamano concetti di auto-descrittività e negoziazione del contenuto tramite MIME type e header `Accept`.
- Si ribadisce la comunicazione stateless come leva di scalabilità e semplificazione della gestione server-side.
- La pagina include un esempio di consumo di REST API in C# con `HttpClient`, includendo header e User-Agent.
- Viene richiamata anche la necessità di rispettare i media type e le convenzioni imposte dai provider (es. GitHub).
- L’obiettivo complessivo è fornire criteri di progettazione e valutazione, oltre che tecniche di implementazione.

### [Consumo, Test e Mock di API REST](./consume-test-and-mock-rest-api)

- La pagina introduce Postman come strumento per inviare richieste HTTP e collaudare API durante sviluppo e verifica.
- Vengono indicate risorse di apprendimento e collezioni di esempio (Postman Echo) per esercitarsi sui metodi HTTP.
- Si descrive la procedura di import/export e la possibilità di “fork” di collection pubbliche nel proprio workspace.
- Si presenta l’uso delle Postman API, che richiedono API key e l’invio dell’header `X-Api-Key`.
- Si spiega come gestire variabili d’ambiente in Postman per rendere riutilizzabili chiavi e identificativi (es. collection uid).
- Si affronta la sezione Authorization in Postman (No Auth, API key, Basic, Bearer) come base del testing autenticato.
- Si introduce cURL come alternativa da riga di comando per eseguire richieste e per automatizzare test ripetibili.
- In ambiente Windows si evidenziano differenze tra `curl.exe` e l’alias `curl` di Windows PowerShell (Invoke-WebRequest).
- Si discute l’installazione di cURL, la risoluzione del PATH e l’individuazione dell’eseguibile effettivo in uso.
- Viene trattata la validazione dei certificati SSL/TLS e la differenza tra build che usano Schannel e build “custom”.
- Si presentano opzioni operative (ad es. `--ca-native`, `--cacert`) e si motiva perché disabilitare la validazione non è raccomandato.
- Si dedica attenzione agli ambienti con proxy (tipici in ambito scolastico), con configurazione via variabili d’ambiente.
- Si introduce la realizzazione di Mock Server e si spiega il concetto di mock object come sostituto controllato.
- Viene illustrata la creazione di un Postman Mock Server, la definizione di esempi e l’uso di `Content-Type: application/json`.
- Si mostrano differenze tra mock server pubblici e privati, con test tramite cURL (incluso `--verbose`).
- La pagina culmina con l’avvio di un client console che consuma le mock API, costruendo i model dal JSON.

### [Esempi di servizi REST](./rest-services-examples)

- La pagina propone servizi reali utilizzabili a scopo didattico per esercitarsi su richieste HTTP e deserializzazione JSON.
- Il primo caso è Open-Meteo, servizio meteo accessibile via REST spesso senza chiave, utile per prototipi e laboratori.
- Vengono richiamati vincoli d’uso e buone pratiche (fair use, attribuzione, limiti consigliati) da rispettare in classe.
- Si introduce l’URL encoding per costruire query valide, con riferimento alla necessità di evitare spazi e caratteri non ASCII.
- Si spiega l’utilità della pagina di configurazione di Open-Meteo per comporre correttamente i parametri della richiesta.
- Si evidenzia l’importanza del parametro `timezone` per ottenere risposte coerenti e funzionanti.
- Si descrive la costruzione del data model C# a partire dal JSON, con attenzione a tipi nullable per gestire campi assenti.
- Si segnala il rischio di mappature errate (ad es. valori talvolta interi ma concettualmente double) e le conseguenze in deserializzazione.
- Si presentano modelli “completi” e “minimali” per mostrare approcci diversi alla selezione dei parametri.
- Viene introdotto il servizio di geocoding di Open-Meteo per ottenere coordinate GPS a partire dal nome di una località.
- Si propone una classe di utilità con metodi per geocoding, conversione da Unix timestamp e interpretazione dei codici meteo.
- Si discute la gestione del tempo in API di terze parti, spesso espressa come Unix timestamp, e la conversione in orario locale.
- Si affronta l’interpretazione dei codici WMO per trasformare codici numerici in descrizioni testuali (anche in italiano).
- Si fornisce un esempio di applicazione client console che compone l’URL in modo robusto (cultura invariant) e stampa risultati.
- La pagina introduce anche MediaWiki API, mostrando che servizi complessi espongono funzionalità (search, parsing, ecc.) via web service.
- Il messaggio didattico è che la competenza si costruisce su casi reali, rispettando specifiche, limiti e formati del provider.


