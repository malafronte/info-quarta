---
title: "DbContext"
# linkTitle:
date: 2023-09-30T19:10:35+02:00
draft: false
type: docs
description: "A session with the database that can be used to query and save instances of your entities"
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

## Overview[^1]

A DbContext instance represents a session with the database and can be used to query and save instances of your entities. DbContext is a combination of the [Unit Of Work](https://dotnettutorials.net/lesson/unit-of-work-csharp-mvc/) and [Repository patterns](https://www.codeguru.com/csharp/repository-pattern-c-sharp/).
**Entity Framework Core does not support multiple parallel operations being run on the same DbContext instance**. This includes both parallel execution of async queries and any explicit concurrent use from multiple threads. **Therefore, always await async calls immediately, or use separate DbContext instances for operations that execute in parallel**. See [Avoiding DbContext threading issues](https://aka.ms/efcore-docs-threading) for more information and examples.

Typically you create a class that derives from DbContext and contains [`DbSet<TEntity>`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbset-1) properties for each entity in the model. If the [`DbSet<TEntity>`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbset-1) properties have a public setter, they are automatically initialized when the instance of the derived context is created.

Override the [`OnConfiguring(DbContextOptionsBuilder)`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onconfiguring#microsoft-entityframeworkcore-dbcontext-onconfiguring(microsoft-entityframeworkcore-dbcontextoptionsbuilder)) method to configure the database (and other options) to be used for the context. Alternatively, if you would rather perform configuration externally instead of inline in your context, you can use [`DbContextOptionsBuilder<TContext>`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptionsbuilder-1) (or [`DbContextOptionsBuilder`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptionsbuilder)) to externally create an instance of [`DbContextOptions<TContext>`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptions-1) (or [`DbContextOptions`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontextoptions)) and pass it to a base constructor of [`DbContext`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext).

The model is discovered by running a set of conventions over the entity classes found in the [`DbSet<TEntity>`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbset-1) properties on the derived context. To further configure the model that is discovered by convention, you can override the [`OnModelCreating(ModelBuilder)`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onmodelcreating#microsoft-entityframeworkcore-dbcontext-onmodelcreating(microsoft-entityframeworkcore-modelbuilder)) method.

## DbContext Lifetime, Configuration, and Initialization

The lifetime of a DbContext begins when the instance is created and ends when the instance is disposed. A DbContext instance is designed to be used for a single unit-of-work. This means that the lifetime of a DbContext instance is usually very short.  
A typical unit-of-work when using Entity Framework Core (EF Core) involves:

* Creation of a DbContext instance
* Tracking of entity instances by the context. Entities become tracked by  
  * Being returned from a query
  * Being added or attached to the context
* Changes are made to the tracked entities as needed to implement the business rule
* [`SaveChanges`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.savechanges) or [`SaveChangesAsync`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.savechangesasync) is called. EF Core detects the changes made and writes them to the database.
* The DbContext instance is disposed

It is very important to dispose the DbContext after use. This ensures both that any unmanaged resources are freed, and that any events or other hooks are unregistered so as to prevent memory leaks in case the instance remains referenced.

* DbContext is not thread-safe. Do not share contexts between threads. Make sure to await all async calls before continuing to use the context instance.
* An [`InvalidOperationException`](https://learn.microsoft.com/en-us/dotnet/api/system.invalidoperationexception) thrown by EF Core code can put the context into an unrecoverable state. Such exceptions indicate a program error and are not designed to be recovered from.

{{< bs/alert >}}
{{< markdownify >}}
Quando si crea un DBContext specifico per un determinato dominio applicativo, si crea una classe che discende dalla classe [`DbContext`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext). In questa classe, sono molto importanti i metodi:

[**OnConfiguring(DbContextOptionsBuilder)**](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onconfiguring#microsoft-entityframeworkcore-dbcontext-onconfiguring(microsoft-entityframeworkcore-dbcontextoptionsbuilder))  
  Override this method to configure the database (and other options) to be used for this context. This method is called for each instance of the context that is created. The base implementation does nothing.

  Questo metodo, di solito, contiene informazioni importanti che servono al DBContext per sapere dove si trova il Data Source, quali sono i parametri di connessione, etc. 

[**OnModelCreating(ModelBuilder)**](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onmodelcreating#microsoft-entityframeworkcore-dbcontext-onmodelcreating(microsoft-entityframeworkcore-modelbuilder))  
  Override this method to further configure the model that was discovered by convention from the entity types exposed in `DbSet<TEntity>` properties on your derived context. The resulting model may be cached and re-used for subsequent instances of your derived context.
  
  Questo metodo viene usato per completare la definizione del modello dei dati, aggiungendo vincoli e parametri che non sono ricavati automaticamente da EF Core mediante l’ispezione delle classi del modello dei dati.
{{< /markdownify >}}
{{< /bs/alert >}}

[^1]:[DbContext](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext)
