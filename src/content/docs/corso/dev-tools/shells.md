---
title: "Vari tipi di shell"
description: "Vari tipi di shell nei sistemi operativi"
sidebar:
  label: "Le shell"
  order: 20
---
<style>
img {display: block; margin: 0 auto;}
</style>

## Il Command Prompt (CMD)

[Il prompt dei comandi CMD](https://it.wikipedia.org/wiki/Cmd.exe) è l\'interfaccia a riga di comando fornita da Microsoft a partire da Windows NT (a partire dal 1993). L'interfaccia è richiamabile digitando CMD oppure Command Prompt dalla barra di ricerca globale di Windows. Può essere lanciata co me utente normale, oppure come amministratore:

![CMD](./shells/image1.png)

I comandi del CMD sono richiamabili inviando il comando HELP. Per ottenere una descrizione dettagliata dei comandi si può scrivere help command-name. Una descrizione dei comandi del CMD si trova anche all'indirizzo: <https://ss64.com/nt/>

## Windows PowerShell

[Windows PowerShell](https://it.wikipedia.org/wiki/PowerShell) è una shell basata su .NET Framework, introdotta dal 2006, con una serie di comandi che permettono di automatizzare attività e ad eseguire alcune operazioni di sistema che non possono essere fatte con il classico CMD. Ad esempio, gli amministratori di sistema, possono utilizzare script di Windows PowerShell per la gestione di Active Directory. Le caratteristiche di Windows Powershell sono descritte nella [documentazione Microsoft](https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/starting-windows-powershell):

![Windows PowerShell](./shells/image2.png)

## PowerShell

[PowerShell](https://learn.microsoft.com/en-us/powershell) è
l'evoluzione di Windows PowerShell, anche se su Windows è possibile avere installate sia Windows PowerShell che PowerShell. PowerShell è basata su .NET Core ed è un progetto Open Source introdotto con PowerShell 6. Nella [documentazione Microsoft](https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell) viene evidenziata la differenza tra Windows PowerShell e PowerShell:

"*Windows PowerShell 5.1 is built on top of the .NET Framework v4.5. With the release of PowerShell 6.0, PowerShell became an open source project built on .NET Core 2.0. Moving from the .NET Framework to .NET Core allowed PowerShell to become a cross-platform solution. PowerShell runs on Windows, macOS, and Linux.*

*There are few differences in the PowerShell language between Windows PowerShell and PowerShell. The most notable differences are in the availability and behavior of PowerShell cmdlets between Windows and non-Windows platforms and the changes that stem from the differences between the .NET Framework and .NET Core*."

L'installazione di PowerShell puo essere fatta utilizzando uno dei modi descritti nella [documentazione Microsoft](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows), ed in particolare, usando il comando winget (vedi sotto).
