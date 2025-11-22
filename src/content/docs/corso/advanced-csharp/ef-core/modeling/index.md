---
title: "Modeling"
# linkTitle:
date: 2023-09-30T19:10:53+02:00
draft: false
type: docs
description: "Creazione del modello dei dati"
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

## Creazione di modelli di dati con EF Core

La creazione di un modello dei dati[^1] è un’operazione molto importante perché definisce la struttura dei dati all’interno del database che andremo ad utilizzare. EF Core è un ORM, ossia un Object Relational Mapper: è un framework che permette di mappare oggetti su tabelle di un database relazionale. I Relational DBMS (RDBMS) saranno oggetto di studio dettagliato l’anno prossimo, ma per il momento si può immaginare un database relazionale come un insieme di file che memorizzano tabelle collegate tra di loro, mediante il meccanismo delle chiavi esterne come, ad esempio, le fatture sono collegate ai clienti, mediante il ClienteId all’interno della fattura.  
Per semplicità[^2] si potrà assumere che ogni istanza di una classe sia mappata in una riga di una tabella che corrisponde alla classe:  

Classe &rarr; Tabella  

Oggetto &rarr; Riga di una tabella.  

Nell’esempio precedente di `GestioneFattureClienti` il modello creato con EF Core ha prodotto un database con le tabelle `Fatture` e `Clienti`. Aprendo il file di database `FattureClienti.db` con un programma come SQLite browser si può vedere la struttura del database:

![GestioneFattureClienti struttura DB](DB-Structure-GestioneFattureClienti.png#center)

![GestioneFattureClienti Clienti](GestioneFattureClienti-Clienti.png#center)

![GestioneFattureClienti Fatture](GestioneFattureClienti-Fatture.png#center)

Per creare una tabella nel database si parte dalla definizione del modello come classe. Ad esempio, nel caso dei clienti siamo partiti dalla definizione della classe:

```cs
public class Cliente
{
    public int ClienteId { get; set; }
    public string RagioneSociale { get; set; } = null!;
    public string PartitaIVA { get; set; } = null!;
    public string? Citta { get; set; }
    public string? Via { get; set; }
    public string? Civico { get; set; }
    public string? CAP { get; set; }
    public List<Fattura> Fatture { get; } = [];

    public override string ToString()
    {
        return $"{{{nameof(ClienteId)} = {ClienteId}, " +
            $"{nameof(RagioneSociale)} = {RagioneSociale}, " +
            $"{nameof(PartitaIVA)} = {PartitaIVA}, " +
            $"{nameof(Citta)} = {Citta}, " +
            $"{nameof(Via)} = {Via}, " +
            $"{nameof(Civico)} = {Civico}, " +
            $"{nameof(CAP)} = {CAP}}}";
    }
}
```

Si noti che EF Core utilizza alcune convenzioni e impostazioni di default (che possono essere modificate a patto di conoscere le caratteristiche di EF Core). Ad esempio, per creare una chiave primaria, ossia un campo che permette di identificare univocamente un’istanza di un oggetto all’interno di una tabella (ad esempio una riga all’interno della tabella dei `Clienti`) bisogna utilizzare la convenzione **NomeClasseId**, oppure solamente **Id**, oppure **ID**. Ad esempio, il campo `ClienteId` è chiave primaria (ad auto incremento) nella tabella che memorizzerà gli oggetti di tipo `Cliente`.
Quando bisogna creare i collegamenti tra le tabelle del database occorre indicare dei legami tra gli oggetti delle classi che rappresentano le righe delle tabelle. Ad esempio, per esprimere il fatto che un cliente può avere molte fatture (una associazione 1 a molti) si è inserito all’interno della classe `Cliente` la property:  

```cs
 public List<Fattura> Fatture { get; } = [];
```

Questa property verrà usata da EF Core per capire il tipo di collegamento da fare tra la tabella dei `Clienti` e la tabella delle `Fatture`.  
Analogamente la classe che descrive le fatture è del tipo:

```cs
public class Fattura
{
    public int FatturaId { get; set; }
    public DateTime Data { get; set; }
    public decimal Importo { get; set; }
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;

    public override string ToString()
    {
        return $"{{{nameof(FatturaId)} = {FatturaId}, " +
            $"{nameof(Data)} = {Data.ToShortDateString()}, " +
            $"{nameof(Importo)} = {Importo}, " +
            $"{nameof(ClienteId)} = {ClienteId}}}";
    }
}
```

Nella classe `Fattura` si notano alcuni elementi importantissimi:  

La chiave primaria `FatturaId`: è un campo di tipo intero che permette di individuare univocamente una fattura. Si può impostare da codice C# il valore da inserire nel database, ma solitamente è più comodo affidarsi alla proprietà di auto incremento che il database attribuisce alla chiave primaria, come si può vedere dallo schema della tabella che è stata creata da SQLite quando è stata fatta la migrazione.  

La chiave esterna (foreign key) `ClienteId`: è un campo che non è chiave primaria nella tabella in cui compare, ma lo è nella tabella riferita. In questo caso il campo `ClienteId` all'interno della classe `Fattura` permette di individuare univocamente il cliente intestatario della fattura. EF Core ha bisogno anche del campo `Cliente` di tipo `Cliente` nella classe `Fattura` per creare la chiave esterna nella tabella delle `Fatture` che punta alla chiave primaria della tabella dei `Clienti`. Il campo `Cliente` è usato da EF Core per definire il tipo di mapping tra la tabella delle `Fatture` e la tabella dei `Clienti`.

### Creating and configuring a model

EF Core uses a metadata model to describe how the application's entity types are mapped to the underlying database[^1]. This model is built using a set of *[conventions](https://learn.microsoft.com/en-us/ef/core/modeling/#built-in-conventions)* - heuristics that look for common patterns. The model can then be customized using *[mapping attributes (also known as data annotations)](https://learn.microsoft.com/en-us/ef/core/modeling/#use-data-annotations-to-configure-a-model)* and/or calls to the [ModelBuilder](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.modelbuilder) methods *[(also known as fluent API)](https://learn.microsoft.com/en-us/ef/core/modeling/#use-fluent-api-to-configure-a-model)* in [OnModelCreating](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onmodelcreating), both of which will override the configuration performed by conventions.

{{< bs/alert >}}
{{< markdownify >}}
Per la configurazione del modello dei dati con EF Core si deve fare riferimento alla [documentazione ufficiale relativa al modeling](https://learn.microsoft.com/en-us/ef/core/modeling/), **da studiare nella parte generale e nella discussione dei casi generali di mapping**:  

* ***uno a uno***
* ***uno  a molti***
* ***molti a molti***
{{< /markdownify >}}
{{< /bs/alert >}}

[^1]:[EF Core Modeling](https://docs.microsoft.com/en-us/ef/core/modeling)
[^2]:[LearEntityFrameworkCore.com](https://www.learnentityframeworkcore.com)
