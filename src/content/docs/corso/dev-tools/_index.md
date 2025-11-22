---
title: "Development Tools"
# linkTitle:
date: 2023-09-12T19:13:12+02:00
type: docs
draft: false
description: "Development Environment Setup"
noindex: false
comments: false
nav_weight: 5
nav_icon:
  vendor: bootstrap
  name: tools
  color: '#e24d0e'
authors:
  - malafronte
series:
  - Docs
categories:
  - Dev-Tools
tags:
  - tools, git, winget, PowerShell, Visual-Studio
images:
featured: true
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
<sub>Attribuzione immagine[^1]</sub>
[^1]:Image designed by [Freepik](http://www.freepik.com)

In questa sezione si mostrerà come installare, configurare e utilizzare alcuni strumenti necessari per lo sviluppo del software in maniera professionale. Alcuni strumenti non sono strettamente necessari, altri invece, come Git, Visual Studio Code e Visual Studio sono indispensabili per le attività di laboratorio. In particolare, verranno trattati i seguenti argomenti:

* La differenza tra il Command Prompt (CMD), Windows PowerShell e PowerShell
* il comando winget per l’installazione e l’aggiornamento degli applicativi di Windows.
* L'installazione di Windows Terminal (se non già presente). Non essenziale, ma utile.
* L'installazione di Powershell (diversa da Windows PowerShell).
* Come abilitare Windows Sandbox. Non essenziale, ma utile in alcuni contesti
* La personalizzazione di PowerShell mediante OhMyPosh. Non essenziale, ma interessante per coloro che vogliono una personalizzazione accattivante del proprio terminale.
* L'installazione di Visual Studio Community 2022 con i workload necessari per lo sviluppo di ASP.NET Core e di .NET MAUI. Importante per gli argomenti sviluppati durante il corso
* Git. Fondamentale per qualunque sviluppatore di codice.
