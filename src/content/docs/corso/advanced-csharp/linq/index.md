---
title: "LINQ"
# linkTitle:
date: 2023-09-26T19:06:49+02:00
draft: false
type: docs
description: "LINQ (Language Integrated Query)"
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

## What is LINQ?

LINQ (Language Integrated Query) is uniform query syntax in C# to retrieve data from different sources and formats. It is integrated in C#, thereby eliminating the mismatch between programming languages and databases, as well as providing a single querying interface for different types of data sources.
For example, SQL is a Structured Query Language used to save and retrieve data from a database. In the same way, LINQ is a structured query syntax built in C# to retrieve data from different types of data sources such as collections, ADO.Net DataSet, XML Docs, web service and MS SQL Server and other databases.

LINQ queries return results as objects. It enables you to uses object-oriented approach on the result set and not to worry about transforming different formats of results into objects.  

The following example demonstrates a simple LINQ query that gets all strings from an array which contains `a`.

```cs
namespace ArgomentiAvanzati
{
  internal class Program
  {
      static void Main()
      {
          // Data source
          string[] names = { "Bill", "Steve", "James", "Johan" };

          // LINQ Query 
          var myLinqQuery = from name in names
                            where name.Contains('a')
                            select name;
          // Query execution
          foreach (var name in myLinqQuery)
              Console.Write(name + " ");
      }
  }
}
```

In the above example, string array names is a data source. The following is a LINQ query which is assigned to a variable myLinqQuery.

```cs
from name in names
where name.Contains('a')
select name;
```

The above query uses query syntax of LINQ. You will learn more about it in the Query Syntax chapter. You will not get the result of a LINQ query until you execute it. LINQ query can be execute in multiple ways, here we used foreach loop to execute our query stored in myLinqQuery. The foreach loop executes the query on the data source and get the result and then iterates over the result set. Thus, every LINQ query must query to some kind of data sources whether it can be array, collections, XML or other databases. After writing LINQ query, it must be executed to get the result.

## Why LINQ?

To understand why we should use LINQ, let's look at some examples. Suppose you want to find list of teenage students from an array of Student objects.
Before C# 2.0, we had to use a 'foreach' or a 'for' loop to traverse the collection to find a particular object. For example, we had to write the following code to find all Student objects from an array of Students where the age is between 12 and 20 (for teenage 13 to 19):

### Example 1 - Use for loop to find elements from the collection

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/LINQDemo/LINQDemo" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQDemo/Program.cs" >}}

Use of for loop is cumbersome, not maintainable and readable. C# 2.0 introduced delegate, which can be used to handle this kind of a scenario, as shown below.

### Example 2 - Use Delegates to Find Elements from the Collection

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/LINQDemo/LINQDemo2" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQDemo2/Program.cs" >}}

So, with C# 2.0, you got the advantage of delegate in finding students with any criteria. You don't have to use a for loop to find students using different criteria. For example, you can use the same delegate function to find a student whose StudentId is 5 or whose name is Bill, as below:

```cs
List<Student> students = StudentExtension.where(studentArray, delegate(Student std) {
        return std.StudentID == 5;
    });

//Also, use another criteria using same delegate
List<Student> students = StudentExtension.where(studentArray, delegate(Student std) {
        return std.StudentName == "Bill";
    });
```

The C# team felt that they still needed to make the code even more compact and readable. So they introduced the extension method, lambda expression, expression tree, anonymous type and query expression in C# 3.0. You can use these features of C# 3.0, which are building blocks of LINQ to query to the different types of collection and get the resulted element(s) in a single statement.

### Example 3 - Use LINQ to Find Elements from the Collection

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/LINQDemo/LINQDemo3" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQDemo3/Program.cs" >}}

As you can see in the above example, we specify different criteria using LINQ operator and lambda expression in a single statement. Thus, LINQ makes code more compact and readable and it can also be used to query different data sources. For example, if you have a student table in a database instead of an array of student objects as above, you can still use the same query to find students using the Entity Framework.

## Advantages of LINQ

• Familiar language: Developers don’t have to learn a new query language for each type of data source or data format.  
• Less coding: It reduces the amount of code to be written as compared with a more traditional approach.  
• Readable code: LINQ makes the code more readable so other developers can easily understand and maintain it.  
• Standardized way of querying multiple data sources: The same LINQ syntax can be used to query multiple data sources.  
• Compile time safety of queries: It provides type checking of objects at compile time.  
• IntelliSense Support: LINQ provides IntelliSense for generic collections.  
• Shaping data: You can retrieve data in different shapes.  

## LINQ API

We can write LINQ queries for the classes that implement `IEnumerable<T>` or `IQueryable<T>` interface.

{{< bs/alert >}}
{{< markdownify >}}
LINQ queries uses extension methods for classes that implement IEnumerable or IQueryable interface.
{{< /markdownify >}}
{{< /bs/alert >}}

### System.Linq.Enumerable

The [System.Linq.Enumerable](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable) class includes extension methods for the classes that implement `IEnumerable<T>` interface, for example all the built-in collection classes implement `IEnumerable<T>` interface and so we can write LINQ queries to retrieve data from the built-in collections.

### System.Linq.Queryable

The [System.Linq.Queryable](https://learn.microsoft.com/en-us/dotnet/api/system.linq.queryable) class includes extension methods for classes that implement `IQueryable<t>` interface. The `IQueryable<T>` interface is used to provide querying capabilities against a specific data source where the type of the data is known. For example, Entity Framework api implements `IQueryable<T>` interface to support LINQ queries with underlying databases such as MS SQL Server.
Also, there are APIs available to access third party data; for example, LINQ to Amazon provides the ability to use LINQ with Amazon web services to search for books and other items. This can be achieved by implementing the IQueryable interface for Amazon.
The following figure shows the extension methods available in the Queryable class can be used with various native or third party data providers.

## Come usare LINQ?

Ci sono due modi per usare LINQ: mediante l’uso delle "LINQ query" oppure mediante l’uso dei "LINQ methods".

### LINQ Query (Query Expression Syntax)

Query syntax is similar to SQL (Structured Query Language) for the database. It is defined within the C#.

LINQ Query Syntax:

```cs
from <range variable> in <IEnumerable<T> or IQueryable<T> Collection>

<Standard Query Operators> <lambda expression>

<select or groupBy operator> <result formation>
```

The LINQ query syntax starts with from keyword and ends with select keyword. The following is a sample LINQ query that returns a collection of strings which contains a word "Tutorials".

```cs
namespace ArgomentiAvanzati
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // string collection
            IList<string> stringList = new List<string>() 
            {
              "C# Tutorials",
              "VB.NET Tutorials",
              "Learn C++",
              "MVC Tutorials" ,
              "Java"
            };
            // LINQ Query Syntax
            var result = from s in stringList
                         where s.Contains("Tutorials")
                         select s;

            foreach (var str in result)
            {
                Console.WriteLine(str);
            }
        }
    }
}
```

Query syntax starts with a `from` clause followed by a Range variable. The `from` clause is structured like "From rangeVariableName in IEnumerableCollection". In English, this means, from each object in the collection. It is similar to a foreach loop: `foreach(Student s in studentList)`.
After the From clause, you can use different Standard Query Operators to filter, group, join elements of the collection. There are around 50 Standard Query Operators available in LINQ. In the above figure, we have used `where` operator (aka clause) followed by a condition. This condition is generally expressed using lambda expression.
LINQ query syntax always ends with a `select` or `group` clause. The `select` clause is used to shape the data. You can select the whole object as it is or only some properties of it. In the above example, we selected the each resulted string elements.  
In the following example, we use LINQ query syntax to find out teenager students from the Student collection (sequence).

```cs
namespace ArgomentiAvanzati
{
  public class Student
  {
      public int StudentID { get; set; }
      public string? StudentName { get; set; }
      public int Age { get; set; }
  }
  internal class Program
  {
      static void Main(string[] args)
      {
          // Student collection
          IList<Student> studentList = new List<Student>() 
          {
            new () { StudentID = 1, StudentName = "John", Age = 13},
            new () { StudentID = 2, StudentName = "Mario",  Age = 21},
            new () { StudentID = 3, StudentName = "Bill",  Age = 18},
            new () { StudentID = 4, StudentName = "Ram" , Age = 20},
            new () { StudentID = 5, StudentName = "Ron" , Age = 15}
          };

          // LINQ Query Syntax to find out teenager students
          var teenAgerStudent = from s in studentList
                                where s.Age > 12 && s.Age < 20
                                select s;
          Console.WriteLine("Teen age Students:");

          foreach (Student std in teenAgerStudent)
          {
              Console.WriteLine(std.StudentName);
          }
      }
  }
}
```

### Points to Remember on Query Syntax

1. As name suggest, Query Syntax is same like SQL (Structure Query Language) syntax.
2. Query Syntax starts with from clause and can be end with Select or GroupBy clause.
3. Use various other operators like filtering, joining, grouping, sorting operators to construct the desired result.
4. Implicitly typed variable - var can be used to hold the result of the LINQ query.

## LINQ Methods (Fluent)

Method syntax (also known as fluent syntax) uses extension methods included in the Enumerable or Queryable static class, similar to how you would call the extension method of any class.
The following is a sample LINQ method syntax query that returns a collection of strings which contains a word "Tutorials".

```cs
// string collection
IList<string> stringList = new List<string>() 
{ 
    "C# Tutorials",
    "VB.NET Tutorials",
    "Learn C++",
    "MVC Tutorials" ,
    "Java" 
};

// LINQ Method Syntax
var result = stringList.Where(s => s.Contains("Tutorials"));
```

The extension method Where() is defined in the Enumerable class. If you check the signature of the Where extension method, you will find the Where method accepts a predicate delegate as `Func<Student, bool>`. This means you can pass any delegate function that accepts a Student object as an input parameter and returns a Boolean value as shown in the below figure. The lambda expression works as a delegate passed in the Where clause.
The following example shows how to use LINQ method syntax query with the `IEnumerable<T>` collection.

```cs
// Student collection
IList<Student> studentList = new List<Student>() 
    { 
      new () { StudentID = 1, StudentName = "John", Age = 13},
      new () { StudentID = 2, StudentName = "Mario",  Age = 21},
      new () { StudentID = 3, StudentName = "Bill",  Age = 18},
      new () { StudentID = 4, StudentName = "Ram" , Age = 20},
      new () { StudentID = 5, StudentName = "Ron" , Age = 15} 
    };

// LINQ Method Syntax to find out teenager students
var teenAgerStudents = studentList.Where(s => s.Age > 12 && s.Age < 20)
                                  .ToList<Student>();

```

Altro esempio:

```cs
namespace ArgomentiAvanzati
{
  public class Program
  {
      public static void Main()
      {
          // Student collection
          IList<Student> studentList = new List<Student>() 
          {
              new () { StudentID = 1, StudentName = "John", Age = 13},
              new () { StudentID = 2, StudentName = "Mario", Age = 21},
              new () { StudentID = 3, StudentName = "Bill", Age = 18},
              new () { StudentID = 4, StudentName = "Ram" , Age = 20},
              new () { StudentID = 5, StudentName = "Ron" , Age = 15}
          };

          Func<Student, bool> isStudentTeenAger = s => s.Age > 12 && s.Age < 20;
          var teenAgerStudent = studentList.Where(isStudentTeenAger);

          Console.WriteLine("Teen age Students:");

          foreach (Student std in teenAgerStudent)
          {
              Console.WriteLine(std.StudentName);
          }

          //oppure
          var teenAgerStudents = from s in studentList
                                  where isStudentTeenAger(s)
                                  select s;

          Console.WriteLine("Teen age Students:");
          foreach (Student std in teenAgerStudents)
          {
              Console.WriteLine(std.StudentName);
          }
      }
  }

  public class Student
  {
      public int StudentID { get; set; }
      public string? StudentName { get; set; }
      public int Age { get; set; }

  }
}
```

### Standard Query Operators

Standard Query Operators in LINQ are actually extension methods for the `IEnumerable<T>` and `IQueryable<T>` types. They are defined in the `System.Linq.Enumerable` and `System.Linq.Queryable` classes. There are over 50 standard query operators available in LINQ that provide different functionalities like filtering, sorting, grouping, aggregation, concatenation, etc.

**Standard Query Operators in `Query Syntax`**:

```cs
var teenAgerStudents = from s in studentList
                                  where s.Age > 12 && s.Age < 20
                                  select s;
```

**Standard Query Operators in `Method Syntax (Fluent)`**:

```cs
var teenAgerStudents = studentList.Where(s => s.Age > 12 && s.Age < 20)
                                  .ToList<Student>();
```

{{< bs/alert >}}
{{< markdownify >}}
Standard query operators in query syntax is converted into extension methods at compile time. So both are same.
{{< /markdownify >}}
{{< /bs/alert >}}

Standard Query Operators can be classified based on the functionality they provide. The following table lists all the classification of Standard Query Operators:
| **Classification** | **Standard Query Operators** |
| --- | --- |
| **Filtering** | Where, OfType |
| **Sorting** | OrderBy, OrderByDescending, ThenBy, ThenByDescending, Reverse |
| **Grouping** | GroupBy, ToLookup |
| **Join** | GroupJoin, Join |
| **Projection** | Select, SelectMany |
| **Aggregation** | Aggregate, Average, Count, LongCount, Max, Min, Sum |
| **Quantifiers** | All, Any, Contains |
| **Elements** | ElementAt, ElementAtOrDefault, First, FirstOrDefault, Last, LastOrDefault, Single, SingleOrDefault |
| **Set** | Distinct, Except, Intersect, Union |
| **Partitioning** | Skip, SkipWhile, Take, TakeWhile |
| **Concatenation** | Concat |
| **Equality** | SequenceEqual |
| **Generation** | DefaultEmpty, Empty, Range, Repeat |
| **Conversion** | AsEnumerable, AsQueryable, Cast, ToArray, ToDictionary, ToList |

Gli esempi di tutte le funzioni presenti nella tabella precedente sono reperibili [qui](https://www.tutorialsteacher.com/linq/linq-standard-query-operators)

### Points to Remember on LINQ Method Syntax

1. As name suggest, Method Syntax is like calling extension method.
2. LINQ Method Syntax aka Fluent syntax because it allows series of extension methods call.
3. Implicitly typed variable `var` can be used to hold the result of the LINQ query.

## Esercitazione guidata 1 - LINQ Gym

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/LINQDemo/LINQGym" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

{{< bs/alert >}}
{{< markdownify >}}
Negli esempi ed esercizi proposti sul LINQ si assume che in una collection non possano esserci due oggetti con lo stesso `ID`; in altri termini il campo indicato come `ID`, o `Id`, oppure come `NomeClasseID`, o `NomeClasseId`, dovrà essere considerato univoco all'interno della collection. Questo campo è ciò che si chiama **chiave primaria** per la collection o base di dati considerata.
{{< /markdownify >}}
{{< /bs/alert >}}

{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQGym/Program.cs" >}}

## Esercitazione guidata 2 – LINQ al Museo

<a class="btn btn-primary" href="https://github.com/malafronte/malafronte-doc-samples/tree/main/samples-quarta/LINQDemo/LINQAlMuseo" role="button">{{< icons/icon vendor=bootstrap name=github height=1em width=1em >}}&nbsp; Ottieni il codice</a>

Creare i seguenti [POCO](https://en.wikipedia.org/wiki/Plain_old_CLR_object):

* `Artista (Id, Nome, Cognome, Nazionalità)`
* `Opera (Id, Titolo, Quotazione, FkArtistaId)`
* `Personaggio (Id, Nome, FkOperaId)`  

Creare per ciascun POCO una collection (lista) di tali oggetti:  

* `artisti` è una lista di oggetti di tipo `Artista`;
* `opere` è una lista di oggetti di tipo `Opera`;
* `personaggi` è una lista di oggetti di tipo `Personaggio`;  
Nota: le property che iniziano con `Fk` indicano una `foreign key` ossia una una property che "punta" ad una property di un altro oggetto. Ad esempio, i valori di `FkOperaId` devono corrispondere a valori dell’`Id` nella collection delle `opere`. In altri termini una foreign key è una property i cui valori devono corrispondere a valori già presenti nella collection a cui puntano.  

Effettuare le seguenti query:

1. Stampare le opere di un dato autore (ad esempio Picasso)
2. Riportare per ogni nazionalità (raggruppare per nazionalità) gli artisti
3. Contare quanti sono gli artisti per ogni nazionalità (raggruppare per nazionalità e contare)
4. Trovare la quotazione media, minima e massima delle opere di Picasso
5. Trovare la quotazione media, minima e massima di ogni artista
6. Raggruppare le opere in base alla nazionalità e in base al cognome dell’artista (Raggruppamento in base a più proprietà)
7. Trovare gli artisti di cui sono presenti almeno 2 opere
8. Trovare le opere che hanno personaggi
9. Trovare le opere che non hanno personaggi
10. Trovare l’opera con il maggior numero di personaggi

### Creazione del modello

* **Classe Artista**
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQAlMuseo/Artista.cs" >}}

* **Classe Opera**
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQAlMuseo/Opera.cs" >}}

* **Classe Personaggio**
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQAlMuseo/Personaggio.cs" >}}

### Scrittura delle query in LINQ

* **Program.cs**
{{< ghcode "https://raw.githubusercontent.com/malafronte/malafronte-doc-samples/main/samples-quarta/LINQDemo/LINQAlMuseo/Program.cs" >}}
