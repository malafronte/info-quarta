---
title: "Migrations"
# linkTitle:
date: 2024-10-29T14:49:30+02:00
draft: false
type: docs
description: " Generazione e aggiornamento dello schema di un database - Migrations "
noindex: false
comments: false
nav_weight: 50
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
Dagli esempi mostrati precedentemente si è visto come **sia possibile generare un database a partire dal modello dei dati**. Ad esempio, nel caso dell'esempio `GestioneFattureClienti` trattato in precedenza, il mapping delle classi (Entity) sulle corrispondenti tabelle del database relazionale (Relational DBMS) viene eseguito per mezzo dell’operazione di migration:  

 ```ps1
  dotnet ef migrations add InitialCreate
  ```

Una volta fatta la migration per creare il database fisico si può impartire il comando:  

 ```ps1
  dotnet ef database update
  ```

Oppure, da codice (ad esempio nel `Main`), scrivendo una sequenza di istruzioni come la seguente (vedremo in seguito alcuni esempi…):

```cs
 using (var db = new BloggingContext())
          {
              db.Database.Migrate();
          }
```

In generale il meccanismo di migration è più sofisticato di quello che può apparire dagli esempi riportati precedentemente. Infatti, leggendo la [documentazione Microsoft](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations) si evince che **il meccanismo delle migrations è stato concepito per poter seguire l’evoluzione dello schema (ossia il modello) dei dati**:  

*In real world projects, data models change as features get implemented: new entities or properties are added and removed, and database schemas need to be changed accordingly to be kept in sync with the application. The migrations feature in EF Core provides a way to incrementally update the database schema to keep it in sync with the application's data model while preserving existing data in the database.*  

*At a high level, migrations function in the following way:*  

* *When a data model change is introduced, the developer uses EF Core tools to add a corresponding migration describing the updates necessary to keep the database schema in sync. EF Core compares the current model against a snapshot of the old model to determine the differences, and generates migration source files; the files can be tracked in your project's source control like any other source file.*
* *Once a new migration has been generated, it can be applied to a database in various ways. EF Core records all applied migrations in a special history table, allowing it to know which migrations have been applied and which haven't.*  

Di seguito si riporta un esempio di generazione di database con più migrations:  
*Let's assume you've just completed your first EF Core application, which contains the following simple model:*

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/EFCore/MigrationsTest" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

```cs
//File Blog.cs
namespace MigrationsTest.Model;
public class Blog
{
    public int Id { get; set; }
    public string? Name { get; set; }
}

//File BloggingContext.cs
using Microsoft.EntityFrameworkCore;
using MigrationsTest.Model;

namespace MigrationsTest.Data;
public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; } = null!;
    public string DbPath { get; }
    public BloggingContext()
    {
        //https://www.hanselman.com/blog/how-do-i-find-which-directory-my-net-core-console-application-was-started-in-or-is-running-from
        var folder = AppContext.BaseDirectory;
        //La BaseDirectory restituisce la cartella dove si trova l'assembly (.dll e .exe del programma compilato)
        //il database, per comodità, è inserito nella cartella di progetto, dove si trova anche il file Program.cs 
        var path = Path.Combine(folder, "../../../blogs.db");
        DbPath = path;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite($"Data Source = {DbPath}");
    }
}
```

Si aggiungano i pacchetti per EF Core con SQLite:  

```ps1
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Sqlite

```

Si proceda alla creazione della prima migration:  

```ps1
dotnet ef migrations add InitialCreate
```

Si potrà notare che nel progetto è stata creata la cartella Migrations con all'interno il codice per la creazione del database. La creazione del database fisico avviene con l'istruzione:  

```ps1
dotnet ef database update
```

*That's all there is to it - your application is ready to run on your new database, and you didn't need to write a single line of SQL. Note that this way of applying migrations is ideal for local development, but is less suitable for production environments - see the [Applying Migrations page](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying) for more info.*  

Supponiamo ora di dover modificare il modello dei dati...

***A few days have passed, and you're asked to add a creation timestamp to your blogs. You've done the necessary changes to your application, and your model now looks like this:***

```cs
namespace MigrationsTest.Model;
public class Blog
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime CreatedTimestamp { get; set; }//👈 new property added
}
```

*Your model and your production database are now out of sync - we must add a new column to your database schema. Let's create a new migration for this:*

```ps1
dotnet ef migrations add AddBlogCreatedTimestamp
```

Note that we give migrations a descriptive name, to make it easier to understand the project history later. Since this isn't the project's first migration, **EF Core now compares your updated model against a snapshot of the old model, before the column was added**; the model snapshot is one of the files generated by EF Core when you add a migration, and is checked into source control. **Based on that comparison, EF Core detects that a column has been added, and adds the appropriate migration**.
You can now apply your migration as before:

```ps1
dotnet ef database update
```

{{< bs/alert >}}
{{< markdownify >}}
Note that this time, EF detects that the database already exists. In addition, when our first migration was applied above, this fact was recorded in a special migrations history table in your database; this allows EF to automatically apply only the new migration.

[È anche possibile escludere dei tipi (Entity) da una migrazione](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=vs#excluding-parts-of-your-model).
{{< /markdownify >}}
{{< /bs/alert >}}
