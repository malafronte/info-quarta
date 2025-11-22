---
title: "Data Types"
# linkTitle:
date: 2023-10-07T14:52:27+02:00
draft: false
type: docs
description: "Tipi di dato nei database: come avviene il mapping dei tipi del C# in tipi del database sottostante"
noindex: false
comments: false
nav_weight: 60
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

## Overview

*When using a relational database, the database provider selects a data type based on the .NET type of the property[^1]. It also takes into account other metadata, such as the configured maximum length, whether the property is part of a primary key, etc. For example, SQL Server maps DateTime properties to `datetime2(7)` columns, and string properties to `nvarchar(max)` columns (or to `nvarchar(450)` for properties that are used as a key).
You can also configure your columns to specify an exact data type for a column.*
{{< bs/alert >}}
{{< markdownify >}}
I tipi di dato dipendono dal database utilizzato.
{{< /markdownify >}}
{{< /bs/alert >}}
You can use [Data Annotations](https://learn.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cwithout-nrt) to specify an exact data type for a column.

```cs
public class Blog
{
    public int BlogId { get; set; }

    [Column(TypeName = "varchar(200)")] //👈 data annotation
    public string? Url { get; set; }

    [Column(TypeName = "decimal(5, 2)")] //👈 data annotation
    public decimal Rating { get; set; }
}
```

You can also use the [Fluent API](https://learn.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=fluent-api%2Cwithout-nrt) to specify the same data types for the columns.

```cs
class MyContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>(eb =>
        {
            eb.Property(b => b.Url).HasColumnType("varchar(200)");//👈 Fluent API
            eb.Property(b => b.Rating).HasColumnType("decimal(5, 2)");//👈 Fluent API
        });
    }
}

public class Blog
{
    public int BlogId { get; set; }
    public string? Url { get; set; }
    public decimal Rating { get; set; }
}
```

[^1]: [Column data types](https://learn.microsoft.com/en-us/ef/core/modeling/entity-properties?tabs=data-annotations%2Cwithout-nrt#column-data-types)
