---
title: "Esercizi"
# linkTitle:
date: 2023-09-30T19:11:58+02:00
draft: false
type: docs
description: "Esercitazioni guidate sulla creazione di database e sull'esecuzione di query da programma C#, mediante LINQ"
noindex: false
comments: false
nav_weight: 90
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

## Introduzione

In questa sezione verranno mostrati alcuni esercizi completamente svolti relativamente alla creazione di un database mediante EF Core e all'esecuzione di query con il linguaggio LINQ, nella variante Fluent Method.

## Database *Romanzi*

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/EFCore/Romanzi" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

1. Creare un progetto per un'applicazione `Console .Net Core`, chiamata `Romanzi` che utilizzi il Framework EF Core per implementare il database (`Romanzi.db`) con le seguenti classi:  

   **Autore**`(`<ins>`AutoreId`</ins>`, Nome, Cognome, Nazionalità )`  

   **Romanzo**`(`<ins>`RomanzoId`</ins>`, Titolo, AutoreId*, AnnoPubblicazione )`

   **Personaggio**`(`<ins>`PersonaggioId`</ins>`, Nome, RomanzoId*, Sesso, Ruolo )`  

    Dove l'attributo sottolineato rappresenta la `Primary Key`, mentre l’attributo con l’asterisco rappresenta una `Foreign Key`.  
    Assumere che:  
    * `Nome`, `Cognome`, `Nazionalità` nella la classe `Autore` siano di tipo `string`  
    * `Titolo` in `Romanzo` sia di tipo `string`;  
    * `AnnoPubblicazione` in `Romanzo` sia di tipo `int`  
    * `Nome`, `Sesso`, `Ruolo` in `Personaggio` siano di tipo `string`  

    Nota N1: creare un progetto Console denominato `Romanzi` da Visual Studio Code  
    Nota N2: installare le librerie per l’utilizzo di EF Core con SQLite:

    ```ps1
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    ```  
  
2. Creare la cartella `Model` con dentro le classi del modello dei dati  
3. Creare la cartella `Data` con al suo interno la classe `RomanziContext`  
   Nota N3: la classe `RomanziContext` discende da `DbContext` ed espone una property per ciascuna tabella del database, come esemplificato di seguito:  

   ```cs
    public DbSet<NomeClasse> NomeTabella { get; set; }  
   ```

   Nota N4: la classe `RomanziContext` potrebbe, se richiesto, implementare i metodi:

   ```cs  
   protected override void OnConfiguring(DbContextOptionsBuilder options);  
   protected override void OnModelCreating(ModelBuilder modelBuilder);  
   ```

4. Effettuare la migration del database e la creazione fisica del file di database di SQLite:  

   ```ps1
    dotnet ef migrations add InitialCreate
    dotnet ef database update
   ```

5. Creare un metodo `static void PopulateDB()` nella classe `Program` che inserisce:  
Almeno 5 autori di nazionalità compresa tra "Americana", "Belga", "Inglese".  
Almeno 10 romanzi degli autori precedentemente inseriti  
Almeno 5 personaggi presenti nei romanzi precedentemente inseriti.

### Query sul database *Romanzi*

Q1: creare un metodo che prende in input la nazionalità e stampa gli autori che hanno la nazionalità specificata  
Q2: creare un metodo che prende in input il nome e il cognome di un autore e stampa tutti i romanzi di quell'autore  
Q3: creare un metodo che prende in input la nazionalità e stampa quanti romanzi di quella nazionalità sono presenti nel database  
Q4: creare un metodo che per ogni nazionalità stampa quanti romanzi di autori di quella nazionalità sono presenti nel database  
Q5: creare un metodo che stampa il nome dei personaggi presenti in romanzi di autori di una data nazionalità  

Seguendo lo stesso procedimento visto negli esempi precedenti si creino i file relativi alle classi `Romanzo`, `Autore`, `Personaggio` nella cartella `Model`:  
File `Romanzo.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Romanzi/Romanzi/Model/Romanzo.cs" >}}  

File `Autore.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Romanzi/Romanzi/Model/Autore.cs" >}}  

File `Personaggio.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Romanzi/Romanzi/Model/Personaggio.cs" >}}  

Si installino i pacchetti necessari per l'utilizzo di EF Core con SQLite:  

```ps1
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```  

Si crei la cartella `Data` con dentro il file `RomanziContext.cs`, relativo alla definizione della classe `RomanziContext`:  
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Romanzi/Romanzi/Data/RomanziContext.cs" >}}  

Dal terminale di Visual Studio Code si eseguano i comandi per la generazione della migrazione e la creazione del database.

```ps1
   dotnet ef migrations add InitialCreate
   dotnet ef database update
```

La struttura del progetto dovrebbe essere simile a quella riportata nella figura seguente:

![Struttura Progetto Romanzi](ProgettoRomanzi-Struttura-File.png#center)

Si scriva nel file `Program.cs` il codice relativo a:

* Popolamento del database
* Gestione dell'input
* Esecuzione delle query richieste dalla traccia  

File `Program.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Romanzi/Romanzi/Program.cs" >}}

## Database *DBUtilizziPC*

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/EFCore/DbUtilizziPC" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

1. Creare un progetto per un'applicazione `Console .Net Core`, chiamata `DbUtilizziPC` che utilizzi il Framework EF Core per implementare il database (`DbUtilizziPC.db`) con le seguenti classi:  

   **Classe**`(`<ins>`Id`</ins>`, Nome, Aula )`  
   **Studente**`(`<ins>`Id`</ins>`, Nome, Cognome, ClasseId* )`  
   **Utilizza**`(`<ins>`StudenteId*`</ins>`,`<ins>`ComputerId*`</ins>`,`<ins>`DataOraInizioUtilizzo`</ins>`, DataOraFineUtilizzo )`  
   **Computer**`(`<ins>`Id`</ins>`, Modello, Collocazione )`  

    Dove l'attributo sottolineato rappresenta la `Primary Key`, mentre l’attributo con l’asterisco rappresenta una `Foreign Key`.  
    Assumere che:  

    * Gli `Id` siano di tipo intero ad auto-incremento
    * `Nome`, `Aula` nell'entità `Classe` siano di tipo `string`  
    * `Nome` in `Cognome` nell'entità `Studente` siano di tipo `string`;  
    * `DataOraInizioUtilizzo` e `DataOraFineUtilizzo` nell'entità `Utilizza` siano di tipo `DateTime`  
    * `Modello` e `Collocazione` nell'entità `Computer` siano di tipo `string`  
  
    Nota N1: creare un progetto Console denominato `DbUtilizziPC` da Visual Studio Code
    Nota N2: installare le librerie per l’utilizzo di EF Core con SQLite:

    ```ps1
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.EntityFrameworkCore.Sqlite
    ```  
  
2. Creare la cartella `Model` con dentro le classi del modello dei dati  
3. Creare la cartella `Data` con al suo interno la classe `UtilizziPCContext`  
   Nota N3: la classe `UtilizziPCContext` discende da `DbContext` ed espone una property per ciascuna tabella del database, come esemplificato di seguito:  

   ```cs
    public DbSet<NomeClasse> NomeTabella { get; set; }  
   ```

   Nota N4: la classe `UtilizziPCContext` potrebbe, se richiesto, implementare i metodi:

   ```cs  
   protected override void OnConfiguring(DbContextOptionsBuilder options);  
   protected override void OnModelCreating(ModelBuilder modelBuilder);  
   ```

4. Effettuare la migration del database e la creazione fisica del file di database di SQLite:  

   ```ps1
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. Creare un metodo `static void PopulateDB()` nella classe `Program` che inserisce:

* Almeno 6 classi, con le relative aule  
* Almeno 10 studenti distribuiti su più classi (non necessariamente devono esserci studenti di ogni classe)  
* Almeno 20 computer
* Almeno una quindicina di utilizzi

La creazione del `Model` e del `DBContext` procede in maniera del tutto analoga a quanto già visto negli esempi precedenti.  
Per il Model i file sono:  
File `Classe.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Model/Classe.cs" >}}
File `Studente.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Model/Studente.cs" >}}
File `Computer.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Model/Computer.cs" >}}
File `Utilizza.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Model/Utilizza.cs" >}}

Il `DbContext` è definito attraverso il file `UtilizziPCContext.cs` relativo alla definizione della classe `UtilizziPCContext`:  
File `UtilizziPCContext.cs`:  
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Data/UtilizziPCContext.cs" >}}

### Query sul database DBUtilizziPC

Dopo aver fatto la migration e la creazione del database, si scriva il codice delle query seguenti, espresse mediante metodi:  
`Q1(string classe)`: Stampa a Console il numero di alunni della classe in input; ad esempio, stampa il numero di alunni della 4IA  
`Q2()`: Stampa a Console il numero di alunni per ogni classe  
`Q3()`: Stampa gli studenti che non hanno ancora restituito i computer (sono quelli collegati a Utilizza con DataOraFineUtilizzo pari a null)  
`Q4(string classe)`: Stampa l'elenco dei computer che sono stati utilizzati dagli studenti della classe specificata in input. Ad esempio, stampare l'elenco dei computer utilizzati dalla 4IA. Non mostrare ripetizioni nella stampa.  
`Q5(int computerId)`: Dato un computer (di cui si conosce l'Id) riporta l'elenco degli studenti che lo hanno usato negli ultimi 30 giorni, con l'indicazione della DataOraInizioUtilizzo, ordinando i risultati per classe e, a parità di classe, per data (mostrando prima le date più recenti)  
`Q6()`: Stampa per ogni classe quanti utilizzi di computer sono stati fatti negli ultimi 30 giorni.  
`Q7()`: Stampa la classe che ha utilizzato maggiormente i computer (quella con il maggior numero di utilizzi) negli ultimi 30 giorni.  
File `Program.cs`:  
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/DbUtilizziPC/DbUtilizziPC/Program.cs" >}}

## Database *Università*

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/EFCore/Universita" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

Creare un'applicazione `.Net Core` per la gestione dei corsi di laurea universitari.
Usando il framework EF Core creare il database dei corsi di laurea e degli studenti, sapendo che nel Model sono previste le seguenti classi:  

**Studente** `(`<ins>`Matricola`</ins>`, Nome, Cognome, CorsoLaureaId*, AnnoNascita )`  
**CorsoLaurea**`(`<ins>`CorsoLaureaId`</ins>`, TipoLaurea, Facoltà )`  
**Frequenta** `(`<ins>`Matricola*`</ins>,<ins>`CodCorso*`</ins> `)`  
**Corso** `(`<ins>`CodiceCorso`</ins>`, Nome, CodDocente* )`  
**Docente**`(`<ins>`CodDocente`</ins>`, Nome, Cognome, Dipartimento )`  
Dove:

* Facoltà è un enumerativo che contiene i valori: `Medicina`, `Ingegneria`, `MatematicaFisicaScienze`, `Economia`  
* `Dipartimento` è un enumerativo che contiene i valori: `Matematica`, `Fisica`, `Economia`, `IngegneriaCivile`, `IngegneriaInformatica`, `Medicina`.  
* `TipoLaurea` è un enumerativo che contiene i valori: `Triennale`, `Magistrale`  

Nello schema precedente si è usata la convenzione di indicare la chiave primaria con attributi sottolineati, mentre la chiave esterna è indicata con un asterisco.

La creazione del modello e del DBContext procede in maniera del tutto analoga a quanto già visto negli esempi precedenti.  
Per il Model i file sono:  
File `Corso.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/Corso.cs" >}}
File `CorsoLaurea.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/CorsoLaurea.cs" >}}
File `Docente.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/Docente.cs" >}}
File `Frequenta.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/Frequenta.cs" >}}
File `SharedEnums.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/SharedEnums.cs" >}}
File `Studente.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Model/Studente.cs" >}}

Il DbContext è definito attraverso il file `UniversitàContext.cs` relativo alla definizione della classe `UniversitàContext`:  
File `UniversitàContext.cs`:  
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Data/UniversitaContext.cs" >}}

### Query sul database Università

Dopo aver fatto la Migration del database, si scriva il codice delle query seguenti:  
Q1: Stampare l'elenco degli studenti  
Q2: Stampare l'elenco dei corsi  
Q3: Modificare il docente di un corso di cui è noto l'id  
Q4: Stampare il numero di corsi seguiti dallo studente con id = 1  
Q5: Stampare il numero di corsi seguiti dallo studente con Nome="Giovanni" e Cognome ="Casiraghi"  
Q6: Stampare il numero di corsi seguiti da ogni studente  
Q7: Stampare i corsi seguiti dallo studente con Nome="Piero" e Cognome ="Gallo"  

File `Program.cs`:
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/EFCore/Universita/Universita/Program.cs" >}}
