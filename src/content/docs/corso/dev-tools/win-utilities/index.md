---
title: "Win Utilities"
# linkTitle:
date: 2023-09-17T18:02:46+02:00
draft: false
type: docs
description: " "
noindex: false
comments: false
nav_weight: 30
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

## Windows Terminal

[Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) è un terminale evoluto presente nelle versioni più recenti di Windows.

"*Windows Terminal is a modern host application for the command-line shells you already love, like Command Prompt, PowerShell, and bash (via Windows Subsystem for Linux (WSL)). Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU accelerated text rendering engine, and the ability to create your own themes and customize text, colors, backgrounds, and shortcuts*."

L'[installazione di Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install) si può fare a partire dal Microsoft Sore (se presente sul proprio sistema), oppure utilizzando altri modi alternativi, ad esempio winget, come descritto nella [documentazione di Windows Terminal su GitHub](https://github.com/microsoft/terminal#via-windows-package-manager-cli-aka-winget):

```ps1
winget install --id Microsoft.WindowsTerminal -e
```

## Windows SandBox

*[Windows Sandbox](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview) provides a lightweight desktop environment to safely run applications in isolation. Software installed inside the Windows Sandbox environment remains \"sandboxed\" and runs separately from the host machine*.

Per installare Windows Sandbox occorre:

* *"Windows 10 Pro or Enterprise, build version 18305 or Windows 11* (non funziona su Windows Home)

* *Enable virtualization on the machine*

* *Use the search bar on the task bar and type Turn Windows Features on
    or off to access the Windows Optional Features tool. Select Windows
    Sandbox and then OK. Restart the computer if you\'re prompted."*

Per i dettagli sull'installazione di Windows SandBox si rimanda alla [documentazione Microsoft](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview#installation).

## OhMyPosh, la shell con stile

[OhMyPosh](https://ohmyposh.dev/) è una utility che permette un elevato grado di personalizzazione della propria shell (sia per Windows che per Linux).

L'installazione di OhMyPosh si può fare seguendo la documentazione ufficiale, oppure seguendo gli ottimi tutorial di Scott Hanselman, in particolare quello intitolato "[My Ultimate PowerShell prompt with Oh My Posh and the Windows Terminal](https://www.hanselman.com/blog/my-ultimate-powershell-prompt-with-oh-my-posh-and-the-windows-terminal)" e quello intitolato "[Adding Predictive IntelliSense to my Windows Terminal PowerShell Prompt with PSReadline](https://www.hanselman.com/blog/adding-predictive-intellisense-to-my-windows-terminal-powershell-prompt-with-psreadline)".
Nel primo viene mostrata, passo passo la procedura per installare e configurare OhMyPosh; nel secondo viene abilitata una funzione di predizione della shel che suggerisce il completamento dei comandi. La personalizzazione della console passa anche attraverso l'adozione di font particolari come [Nerd Fonts](https://www.nerdfonts.com/font-downloads).
