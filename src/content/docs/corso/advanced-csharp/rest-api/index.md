---
title: "Rest API in C#"
description: "Rest API in C#: architettura, consumo, test e casi pratici"
sidebar:
  label: "Rest API in C#"
  order: 1
---

## Presentazione generale

Questa sezione introduce i concetti fondamentali delle **API REST** e la loro implementazione in C#, partendo dai principi architetturali fino alla realizzazione pratica di client e servizi.

**REST** (Representational State Transfer) è uno stile architetturale che definisce come progettare servizi web scalabili, stateless e basati su risorse identificate da URI. La comprensione dei vincoli REST (client-server, uniform interface, HATEOAS) e delle convenzioni di naming è essenziale per costruire API coerenti e manutenibili.

In ambiente .NET/C#, la classe `HttpClient` offre gli strumenti per consumare API REST, ma richiede attenzione nella gestione delle risorse, nella configurazione degli header e nella deserializzazione delle risposte JSON.

Il percorso didattico proposto copre:

- **Architettura REST**: principi, vincoli, metodi HTTP, CRUD, Richardson Maturity Model
- **Strumenti di test**: Postman per il collaudo interattivo, cURL per l'automazione, Mock Server per simulare endpoint
- **Casi pratici**: servizi reali (Open-Meteo, MediaWiki API) per esercitarsi su richieste, deserializzazione e gestione di formati standard

L'obiettivo è fornire sia le basi teoriche per progettare e valutare API REST, sia le competenze pratiche per integrarle efficacemente in applicazioni C#.

## Sintesi delle pagine

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
