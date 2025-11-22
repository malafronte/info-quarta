---
title: "SQLite"
# linkTitle:
date: 2023-09-30T19:03:16+02:00
draft: false
type: docs
description: "A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine"
noindex: false
comments: false
nav_weight: 10
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

## What Is SQLite?

*SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. **SQLite is the most used database engine in the world**. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day.[^1]*
{{< bs/alert >}}
{{< markdownify >}}
SQLite è una libreria scritta in C che implementa un database contenuto all'interno di un file. La libreria SQLite definisce i metodi di accesso a tale file e fornisce alle applicazioni che ne fanno uso una astrazione logica dei dati sotto forma di tabelle collegate mediante chiavi esterne (il concetto di chiave verrà descritto più avanti).  
È possibile interagire con SQLite mediante il linguaggio SQL, come descritto in [questa guida](https://www.sqlitetutorial.net), tuttavia **l'utilizzo del framework EF Core permette di utilizzare SQLite senza dover scrivere nemmeno una riga di SQL**.
{{< /markdownify >}}
{{< /bs/alert >}}

## SQLite Storage Classes and Datatypes

Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes[^2]:

* **NULL**. The value is a NULL value.

* **INTEGER**. The value is a signed integer, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.

* **REAL**. The value is a floating point value, stored as an 8-byte IEEE floating point number.

* **TEXT**. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).

* **BLOB**. The value is a blob of data, stored exactly as it was input.

A storage class is more general than a datatype. The INTEGER storage class, for example, includes 7 different integer datatypes of different lengths. This makes a difference on disk. But as soon as INTEGER values are read off of disk and into memory for processing, they are converted to the most general datatype (8-byte signed integer). And so for the most part, "storage class" is indistinguishable from "datatype" and the two terms can be used interchangeably.

Any column in an SQLite version 3 database, except an INTEGER PRIMARY KEY column, may be used to store a value of any storage class.

## DB Browser for SQLite

*DB Browser for SQLite (DB4S) is a high quality, visual, open source tool to create, design, and edit database files compatible with SQLite*[^3]. Il programma *DB Browser for SQLite* fornisce un'interfaccia grafica per interagire con un database di SQLIte. L'installer può essere scaricato dalla [pagina di download](https://sqlitebrowser.org/dl/) di DB Browser for SQLite, scegliendo la versione appropriata per il proprio sistema operativo. Ad esempio, per le versioni più recenti di Windows la versione a 64 bit. Il programma può essere utilizzato anche senza effettuare l'installazione (versione zip), oppure si può optare per la versione *PortableApp*.

[^1]: [SQLite](https://www.sqlite.org/index.html)
[^2]: [SQLite Storage Classes and Datatypes](https://www.sqlite.org/datatype3.html)
[^3]: [DB Browser for SQLite](https://sqlitebrowser.org/)
