---
title: "Delegates"
# linkTitle:
date: 2023-09-10T19:00:29+02:00
type: docs
draft: false
# type: docs
description: "Functions delegates"
noindex: false
comments: false
nav_weight: 10
# nav_icon:
#   vendor: bootstrap
#   name: toggles
#   color: '#e24d0e'
featured: true

authors:
  - malafronte
series:
  - Docs
categories:
  - Language-Feature
tags:
  - delegate
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
A function can have one or more parameters of different data types, but what if you want to pass a function itself as a parameter? How does C# handle the callback functions or event handler? The answer is - **delegate**.

A delegate is like a pointer to a function. It is a reference type data type and it holds the reference of a method. All the delegates are [implicitly derived from System.Delegate class](https://www.tutorialsteacher.com/csharp/csharp-delegates).  

A delegate can be declared using **delegate** keyword followed by a function signature as shown below.

```cs
<access_modifier> delegate <return_type> <delegate_name>(<parameters>)

```

In C#, delegates form the basic building blocks for events. A delegate is a type that defines a method signature. In C# you can instantiate a delegate and let it point to another method. You can invoke the method through the delegate.

## Primo esempio

```cs
internal class Program
{
    // declare delegate
    public delegate void Print(int value);
    static void Main(string[] args)
    {
    // Print delegate points to PrintNumber
    Print printDel = PrintNumber;
    // or
    // Print printDel = new Print(PrintNumber);
    printDel(100000);
    printDel(200);
    // Print delegate points to PrintMoney
    // Print delegate points to PrintMoney
    Console.OutputEncoding = Encoding.UTF8;
    printDel = PrintMoney;
    printDel(10000);
    printDel(200);
    Console.ReadLine();
    }

    public static void PrintNumber(int num)
    {
        Console.WriteLine("Number: {0,-12:N0}",num);
    }

    public static void PrintMoney(int money)
    {
        Console.WriteLine("Money: {0:C}", money);
    }
}
```

In the above example, we have declared Print delegate that accepts `int` type parameter and returns void. In the Main() method, a variable of Print type is declared and assigned a PrintNumber method name. Now, invoking Print delegate will in-turn invoke PrintNumber method. In the same way, if the Print delegate variable is assigned to the PrintMoney method, then it will invoke the PrintMoney method.

The following image illustrates the delegate.

![image](Picture1.png#center)

Optionally, a delegate object can be created using the new operator and specify a method name, as shown below:

```cs
Print printDel = new Print(PrintNumber);
```

## Invoking Delegate

The delegate can be invoked like a method because it is a reference to a method. Invoking a delegate will in-turn invoke a method which id referred to. The delegate can be invoked by two ways: using () operator or using the Invoke() method of delegate as shown below.

```cs
Print printDel = PrintNumber;
printDel.Invoke(10000);
//or
printDel(10000);
```

## Secondo esempio

```cs
internal class Program
{
    public delegate double MathDelegate(double value1, double value2);
    public static double Add(double value1, double value2)
    {
        return value1 + value2;
    }

    public static double Subtract(double value1, double value2)
    {
        return value1 - value2;
    }

    static void Main(string[] args)
    {
        MathDelegate mathDelegate = Add;
        var result = mathDelegate(5, 2);
        Console.WriteLine(result);
        // output: 7
        mathDelegate = Subtract;
        result = mathDelegate(5, 2);
        Console.WriteLine(result);
        // output: 3
        Console.ReadLine();
    }
}
```

As you can see, we use the delegate keyword to tell the compiler that we are creating a delegate type. Instantiating delegates is easy with the automatic creation of a new delegate type.

You can also use the new keyword method of instantiating a delegate

```cs
MathDelegate mathDelegate = new MathDelegate(Add);
```

An instantiated delegate is an object; you can pass it around and give it as an argument to other methods.

## Multicast Delegates

Another great feature of delegates is that you can combine them together. This is called multicast. You can use the + or += operator to add another method to the invocation list of an existing delegate instance. Similarly, you can also remove a method from an invocation list by using the decrement assignment operator (- or -=). This feature forms the base for events in C#. Below is a multicast delegate example.

```cs
internal class Program
{
    static void Hello(string s)
    {
        Console.WriteLine(" Hello, {0}!", s);
    }

    static void Goodbye(string s)
    {
        Console.WriteLine(" Goodbye, {0}!", s);
    }

    delegate void Del(string s);
    static void Main(string[] args)
    {
        Del a, b, c;
        Del? d, k;
        // Create the delegate object a that references
        // the method Hello:
        a = new Del(Hello);
        // Create the delegate object b that references
        // the method Goodbye:
        b = Goodbye;

        // The two delegates, a and b, are composed to form c:
        c = a + b;
        //allo stesso modo possiamo inizializzare una variabile delegate Del a null
        //e usare += per aggiungere un metodo
        k = null;
        //aggiungo un metodo
        k += a;
        //aggiungo un altro metodo
        k += b;
        // Remove a from the composed delegate, leaving d,
        // which calls only the method Goodbye:
        d = c - a;
        Console.WriteLine("Invoking delegate a:");
        a("A");
        Console.WriteLine("Invoking delegate b:");
        b("B");
        Console.WriteLine("Invoking delegate c:");
        c("C");
        Console.WriteLine("Invoking delegate d:");
        d("D");
        Console.WriteLine("Invoking delegate k:");
        k("K");
        // Output:
        // Invoking delegate a:
        // Hello, A!
        // Invoking delegate b:
        // Goodbye, B!
        // Invoking delegate c:
        // Hello, C!
        // Invoking delegate d:
        // Goodbye, D!
        // Invoking delegate k:
        // Hello, K!
        // Goodbye, K!
        //quanti sono i delegati associati a a k?
        Console.WriteLine("quanti sono i delegati associati a k?");
        int invocationCount = k.GetInvocationList().GetLength(0);
        Console.WriteLine($"Sono esattamente {invocationCount}");
        Console.ReadLine();
    }
}
```

All this is possible because delegates inherit from the System.MulticastDelegate class that in turn inherits from System.Delegate. Because of this, you can use the members that are defined in those base classes on your delegates.

For example, to find out how many methods a multicast delegate is going to call, you can use the following code:

```cs
int invocationCount = d.GetInvocationList().GetLength(0);
```

### Covariance and Contravariance

When you assign a method to a delegate, the method signature does not have to match the delegate exactly. This is called covariance and contravariance. Covariance makes it possible that a method has a return type that is more derived than that defined in the delegate. Contravariance permits a method that has parameter types that are less derived than those in the delegate type.

### Covariance With Delegates

Here is an example of covariance:

```cs
class Program
{
    public delegate TextWriter CovarianceDel();
    public static StreamWriter MethodStream() { return null; }
    public static StringWriter MethodString() { return null; }

    static void Main(string[] args)
    {
        CovarianceDel del;
        del = MethodStream;
        del = MethodString;
        Console.ReadLine();
    }
}
```

Because both StreamWriter and StringWriter inherit from TextWriter, you can use the CovarianceDel with both methods.

### Contravariance With Delegates

Below is an example of contravariance.

```cs
internal class Program
{
    public static void DoSomething(TextWriter textWriter) { }
    public delegate void ContravarianceDel(StreamWriter streamWriter);

    static void Main(string[] args)
    {
        ContravarianceDel del = DoSomething;
        Console.ReadLine();
    }
}
```

Because the method DoSomething can work with a TextWriter, it surely can also work with a StreamWriter. Because of contravariance, you can call the delegate and pass an instance of StreamWriter to the DoSomething method

You can learn more about this concept [here](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/covariance-contravariance/).

## Points to Remember

1. Delegate is a function pointer. It is reference type data type.
2. Syntax: _public delegate void `<function name>(<parameters>)`
3. A method that is going to assign to delegate must have same signature as delegate.
4. Delegates can be invoke like a normal function or Invoke() method.
5. Multiple methods can be assigned to the delegate using "+" operator. It is called multicast delegate.

Delegate is also used with [Event](https://www.tutorialsteacher.com/csharp/csharp-event), [Anonymous method](https://www.tutorialsteacher.com/csharp/csharp-anonymous-method), [Func delegate](https://www.tutorialsteacher.com/csharp/csharp-func-delegate), [Action delegate](https://www.tutorialsteacher.com/csharp/csharp-action-delegate).
