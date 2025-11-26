---
title: "Tecniche di sincronizzazione"
description: "Tecniche di sincronizzazione tra thread. Semafori. Concetto di deadlock. Costrutti per la programmazione concorrente"
sidebar:
  order: 30

---
<style>
p {text-align: justify}
img {display: block; margin: 0 auto;}
</style>

## Thread synchronization techniques

**Thread synchronization refers to the act of shielding against multithreading issues such as data races, deadlocks and starvation**. Se più thread sono in grado di effettuare chiamate alle proprietà e ai metodi di un singolo oggetto, è essenziale che tali chiamate siano sincronizzate. In caso contrario un thread potrebbe interrompere le operazioni eseguite da un altro thread e l'oggetto potrebbe rimanere in uno stato non valido. Una classe i cui membri sono protetti da tali interruzioni è detta thread-safe. .NET offre diverse strategie per sincronizzare l'accesso a membri statici e di istanza:  

* Aree di codice sincronizzate. È possibile usare la classe Monitor o il supporto del compilatore per questa classe per sincronizzare solo il codice di blocco necessario, migliorando le prestazioni.
* Sincronizzazione manuale. È possibile usare gli oggetti di sincronizzazione della libreria di classi .NET.
