---
title: "Data Seeding"
# linkTitle:
date: 2023-10-07T14:50:33+02:00
draft: false
type: docs
description: "The process of populating a database with an initial set of data"
noindex: false
comments: false
nav_weight: 80
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
Data seeding is the process of populating a database with an initial set of data.
There are several ways this can be accomplished in EF Core:

* Model seed data
* Manual migration customization
* Custom initialization logic

For example, the following are some available strategies:

* **Use migrations**: In EF Core, seeding data can be associated with an entity type as part of the model configuration. Then EF Core [migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) can automatically compute what insert, update or delete operations need to be applied when upgrading the database to a new version of the model.
  * **Important: any changes to the data performed outside of migrations might be lost or cause an error.**
As an example, this will configure seed data for a Blog in `OnModelCreating`:

  ```cs
  modelBuilder.Entity<Blog>().HasData(new Blog { BlogId = 1, Url = "http://sample.com" });
  //To add entities that have a relationship the foreign key values need to be specified:
  modelBuilder.Entity<Post>().HasData(
      new Post { BlogId = 1, PostId = 1, Title = "First post", Content = "Test 1" });
  ```

  :bulb: If you need to apply migrations as part of an automated deployment you can create a SQL script that can be previewed before execution. (**questo aspetto verrà ripreso nella seconda parte del corso**)

* **Use custom initialization logic**: you can use `context.Database.EnsureCreated()` to create a new database containing the seed data, for example for a test database or when using the in-memory provider or any non-relational database. Note that if the database already exists, `EnsureCreated()` will neither update the schema nor seed data in the database. For relational databases you shouldn't call `EnsureCreated()` if you plan to use Migrations.
{{< bs/alert >}}
{{< markdownify >}}
Durante il testing può essere utile un metodo che ripulisce il database e lo ricrea da capo per poi popolarlo tramite appositi metodi che inseriscono i valori opportuni mediante query.
{{< /markdownify >}}
{{< /bs/alert >}}

  ```cs
  protected static void CleanDatabase(DbContext context)
      {
          ConsoleWriteLines("Deleting and re-creating database...");
          context.Database.EnsureDeleted();
          context.Database.EnsureCreated();
          ConsoleWriteLines("Done. Database is clean and fresh.");
      }
  ```

  Si veda anche la [documentazione specifica Microsoft](https://learn.microsoft.com/en-us/ef/core/modeling/data-seeding#limitations-of-model-seed-data ).
