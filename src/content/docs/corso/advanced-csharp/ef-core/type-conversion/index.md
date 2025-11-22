---
title: "Type Conversion"
# linkTitle:
date: 2023-10-07T14:52:49+02:00
draft: false
type: docs
description: "Conversioni dai tipi .NET ai tipi del database utilizzato"
noindex: false
comments: false
nav_weight: 70
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
Value converters allow property values to be converted when reading from or writing to the database. This conversion can be from one value to another of the same type (for example, encrypting strings) or from a value of one type to a value of another type (for example, converting enum values to and from strings in the database).  

Value conversions are defined on properties in the `OnModelCreating` of your `DbContext`. For example[^1], consider an enum and entity type defined as:

```cs
public class Rider
{
    public int Id { get; set; }
    public EquineBeast Mount { get; set; }
}

public enum EquineBeast
{
    Donkey,
    Mule,
    Horse,
    Unicorn
}
```

Conversions can be configured in [OnModelCreating](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.onmodelcreating) to store the `enum` values as strings such as "Donkey", "Mule", etc. in the database; you simply need to provide one function which converts from the `ModelClrType` to the `ProviderClrType`, and another for the opposite conversion:

```cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(
            v => v.ToString(),
            v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v));
}
```

The `ValueConverter` can instead be created explicitly. For example:

```cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new ValueConverter<EquineBeast, string>(
        v => v.ToString(),
        v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v));

    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(converter);
}
```

## Built-in converters

EF Core ships with a set of pre-defined `ValueConverter<TModel,TProvider>` classes, found in the `Microsoft.EntityFrameworkCore.Storage.ValueConversion` namespace. In many cases EF will choose the appropriate built-in converter based on the type of the property in the model and the type requested in the database, as shown above for enums. For example, using `.HasConversion<int>()` on a `bool` property will cause EF Core to convert `bool` values to numerical zero and one values:

```cs
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<User>()
        .Property(e => e.IsActive)
        .HasConversion<int>();
}
```

A list of predefined type converters can be found on the [EF Core docs pages](https://learn.microsoft.com/en-us/ef/core/modeling/value-conversions?tabs=data-annotations#built-in-converters).

## Pre-defined conversions

**For common conversions for which a built-in converter exists there is no need to specify the converter explicitly. Instead, just configure which provider type should be used and EF will automatically use the appropriate built-in converter**. Enum to string conversions are used as an example above, but EF will actually do this automatically if the provider type is configured:

```cs
modelBuilder
    .Entity<Rider>()
    .Property(e => e.Mount)
    .HasConversion<string>();
```

The same thing can be achieved by explicitly specifying the column type. For example, if the entity type is defined like so:

```cs
public class Rider
{
    public int Id { get; set; }

    [Column(TypeName = "varchar(24)")]
    public EquineBeast Mount { get; set; }
}
```

Then the enum values will be saved as strings in the database without any further configuration in OnModelCreating.

[^1]: [Value conversion](https://learn.microsoft.com/en-us/ef/core/modeling/value-conversions?tabs=data-annotations )
