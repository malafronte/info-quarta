---
title: "Concurrent Programming"
# linkTitle:
date: 2023-11-04T10:12:13+01:00
draft: false
type: docs
description: "Tecniche di sincronizzazione tra thread. Semafori. Concetto di deadlock. Costrutti per la programmazione concorrente"
noindex: false
comments: false
nav_weight: 40
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

## Thread synchronization techniques

Thread synchronization refers to the act of shielding against multithreading issues such as data races, deadlocks and starvation. Se più thread sono in grado di effettuare chiamate alle proprietà e ai metodi di un singolo oggetto, è essenziale che tali chiamate siano sincronizzate. In caso contrario un thread potrebbe interrompere le operazioni eseguite da un altro thread e l'oggetto potrebbe rimanere in uno stato non valido. Una classe i cui membri sono protetti da tali interruzioni è detta thread-safe. .NET offre diverse strategie per sincronizzare l'accesso a membri statici e di istanza:  

* Aree di codice sincronizzate. È possibile usare la classe Monitor o il supporto del compilatore per questa classe per sincronizzare solo il codice di blocco necessario, migliorando le prestazioni.
* Sincronizzazione manuale. È possibile usare gli oggetti di sincronizzazione della libreria di classi .NET.
