---
title: "Sviluppo di applicazioni mobili"
description: "Sviluppo di applicazioni mobili con .NET MAUI e integrazione dell'Intelligenza Artificiale"
sidebar:
  label: "Applicazioni mobili"
  order: 1
---

## Presentazione generale

Lo sviluppo di applicazioni mobili rappresenta una delle competenze più richieste e stimolanti nell'odierno panorama informatico. 
A differenza del software tradizionale desktop o web, le applicazioni mobili devono operare in un contesto caratterizzato da risorse limitate (batteria, connettività fluttuante, dimensioni dello schermo) e offrire un'esperienza utente (UX) estremamente fluida e reattiva.

In questo modulo, lo studio si concentra su **.NET MAUI** (Multi-platform App UI), il framework moderno di Microsoft che consente di scrivere una singola codebase in C# e XAML per generare applicazioni native per Android, iOS, macOS e Windows.
L'apprendimento di MAUI permette agli studenti di applicare concetti avanzati come il pattern architetturale MVVM (Model-View-ViewModel), il Data Binding e la Dependency Injection in uno scenario reale e tangibile.

Un aspetto innovativo di questo modulo è l'integrazione strutturata dello **sviluppo assistito da Intelligenza Artificiale (AI)**.
Anziché trattare l'AI come una scorciatoia (il cosiddetto _vibe coding_), il percorso inquadra gli strumenti generativi (come GitHub Copilot, OpenCode o LLM locali) all'interno di un flusso di lavoro ingegneristico rigoroso noto come approccio _Spec-Driven_ e _Man-in-the-Loop_. 
L'obiettivo è formare sviluppatori capaci di progettare architetture solide, dirigere gli agenti AI per velocizzare la scrittura del codice ripetitivo e verificare costantemente i risultati tramite test rigorosi.

## Sintesi delle pagine

### [Introduzione a .NET MAUI](./maui-101)

- La pagina fornisce le basi teoriche e pratiche per iniziare lo sviluppo multipiattaforma con .NET MAUI.
- Si introduce l'evoluzione del framework (da Xamarin a MAUI) e i concetti fondamentali dello sviluppo nativo vs multipiattaforma.
- Si analizza la struttura di un progetto MAUI standard, dal file `MauiProgram.cs` alla gestione delle risorse condivise.
- Viene spiegato dettagliatamente il pattern MVVM (Model-View-ViewModel), fondamentale per separare l'interfaccia utente dalla logica di business.
- Si illustrano i concetti di Data Binding, Comandi (`ICommand`) e il ruolo vitale dell'interfaccia `INotifyPropertyChanged`.
- Vengono presentati i principali layout (Grid, StackLayout, FlexLayout) e i controlli visuali di base in XAML.
- Si affrontano temi come la navigazione (Shell Navigation), il passaggio di parametri tra le pagine e l'accesso alle API del dispositivo (sensori, geolocalizzazione).
- L'obiettivo è dotare lo studente delle competenze architetturali minime per poter comprendere e governare il codice che andrà a scrivere o a generare.

### [Sviluppo assistito da AI in MAUI](./ai-assisted-development)

- Questa guida avanzata sposta il focus sulle metodologie moderne di AI-Assisted Development applicate a MAUI.
- Si contrappone il _Vibe Coding_ caotico allo _Spec-Driven coding_, dove lo sviluppatore definisce requisiti rigorosi prima di far generare codice all'AI.
- Si introduce il ciclo "Man-in-the-Loop" composto da 5 fasi: Pianificazione, Contesto, Esecuzione, Verifica e Documentazione.
- Viene descritto il concetto di "Docs-as-Code" proponendo un albero di documenti (`AGENTS.md`, `spec.md`, `plan.md`) che funge da memoria e istruzione per i coding agent.
- Si passano in rassegna i principali strumenti disponibili (Copilot, OpenCode, KiloCode, Ollama) e le specifiche "Skills" per istruire l'AI su MAUI.
- Viene illustrato un workflow completo per la generazione della UI/UX, integrando strumenti come *Google Stitch* e il formato *DESIGN.md* per un design system portabile.
- Si affronta il tema cruciale del **Testing basato su AI**, mostrando come far generare test xUnit, mockare servizi con Moq/Appium e scoprire edge cases critici.
- La pagina mira a trasformare lo studente da semplice programmatore a "direttore d'orchestra" del software, capace di delegare l'implementazione mantenendo il pieno controllo architetturale.

### [Progetti didattici MAUI](./maui-student-projects)

- Questa pagina offre una selezione di 6 progetti completi, pensati come "capolavori" finali per gli studenti.
- I progetti proposti sono: *CityClimate Companion*, *BookScout Mobile*, *PokeDex MAUI*, *MealPlanner*, *SpaceWatch* e *GeoQuiz*.
- Ognuno richiede l'integrazione di un'API pubblica (REST) reale, interfacce utente reattive e l'uso della persistenza locale (SQLite/Preferences).
- Per ogni progetto viene fornita una specifica dei requisiti (base e opzionali), link alla documentazione dell'API ed esempi di risposta JSON.
- Si delinea una guida passo per passo (da 8 step) per affrontare lo sviluppo, includendo esempi di *Prompt AI* da utilizzare nelle varie fasi.
- Viene inclusa un'ampia dimostrazione tangibile su come applicare il testing AI-Assisted (usando l'esempio di *BookScout*).
- Viene fornita una rubrica di valutazione completa con descrittori di livello (Insufficiente -> Eccellente) per valutare oggettivamente i lavori, includendo metriche sull'uso consapevole dell'AI.
- L'obiettivo del documento è fornire al docente casi d'uso immediatamente spendibili in classe e allo studente una traccia chiara verso un prodotto finito di alta qualità.
