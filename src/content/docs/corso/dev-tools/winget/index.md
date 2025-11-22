---
title: "winget"
# linkTitle:
date: 2023-09-17T18:01:19+02:00
draft: false
type: docs
description: " "
noindex: false
comments: false
nav_weight: 20
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

## Windows Package Manager

*"[Windows Package Manager](https://learn.microsoft.com/en-us/windows/package-manager/) is a comprehensive package manager solution that consists of a command line tool and set of services for installing applications on Windows 10 and Windows 11. Developers use the winget command line tool to discover, install, upgrade, remove and configure a curated set of applications. After it is installed, developers can access winget via the Windows Terminal, PowerShell, or the Command Prompt"*.

### Il command-line winget

[winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
è uno strumento da riga di comando che permette di installare, aggiornare, rimuovere applicazioni per Windows, eseguendo direttamente uno script da riga di comando. L'esperienza d'uso per l'utente è, per certi versi, simile a quella di alcuni packet manager di distribuzioni Linux (`apt-get` ad esempio).

Il command-line tool winget è disponile a partire da alcune versioni recenti di Windows 10 e in tutte le versioni di Windows 11 come parte dell'App installer.

Normalmente winget è già installato su Windows, ma nel caso non lo fosse, si può trovare il dettaglio su come installare winget nella [documentazione Microsoft](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget).

Ad esempio, per installare un'applicazione con winget, il flusso di lavoro procede con un comando search per trovare l'applicazione che si vuole installare, seguito da un comando install con l'Id dell'app da installare.

Supponendo di voler installare il pacchetto Microsoft PowerToys:

![Esempio installazione powertoys](image3.png#center)

Il comando per installare la versione corretta del programma è:

```ps1
winget install Microsoft.PowerToys
```

Per installare l'ultima versione di PowerShell il modo più semplice è quello di eseguire il comando:

```ps1
winget install --id Microsoft.Powershell --source winget
```

Per verificare l'elenco dei programmi aggiornabili con winget basta digitare

```ps1
winget upgrade
```

Per aggiornare un programma specifico basta eseguire il comando

```ps1
winget upgrade packageId
```

Per aggiornare tutte le applicazioni gestite da winget è possibile lanciare un comando come il seguente, in una shell con privilegi di amministratore:

```ps1
winget upgrade --all --force --silent
```

**Nota**: per installare winget in una Windows Sandbox, procedere comedescritto nella [documentazione Microsoft specifica](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget-on-windows-sandbox).
