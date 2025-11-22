---
title: "C# Threads"
# linkTitle:
date: 2023-11-04T09:54:46+01:00
draft: false
type: docs
description: "Creazione di un thread. Ciclo di vita di un thread. Concetto di Thread Pool. Problemi comuni alla gestione di più thread. Concetti di race condition e sezione critica. Stati transienti e interferenze"
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
In queste note si fa riferimento al [threading gestito dal .NET CLR](https://docs.microsoft.com/en-us/dotnet/standard/threading) e alle [API per la programmazione parallela di .NET](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming).  

You can use threads in the following cases:  

* **Scalability (Be parallel)** - If you have long running CPU bound operations, like to compute if 80 digit number is prime or not, you can scale this operation by paralleling this operation to multiple threads
* **Responsive** - You can keep client application responsive by keeping off lengthy operations from main thread (like CPU bound operation) and thus can also leverage the benefit of canceling the task
* **Leverage asynchronous technique** - If you have IO bound operation such reading a web content it may require some time in order of minutes, so you can leverage another thread to wait for this operation while you perform other task and thus even keep UI responsive. However, C# provides async await syntax for this kind of asynchronous technique.
Also, being asynchronous is not parallel it just keeps the application responsive. Asynchronous means not waiting for an operation to finish, but registering a listener instead.  
{{< bs/alert >}}
{{< markdownify >}}

In general use parallel threads (using Thread class and Task class in C#) or asynchronous technique (using C# async await keyword) depending upon whether the problem is CPU bound or IO bound respectively. Thumb rule is to use threads for CPU bound operation and async for IO bound operation for a client application, and always use async for a server application.
{{< /markdownify >}}
{{< /bs/alert >}}

## C# Thread

Threads in C# are modelled by Thread Class[^1]. When a process starts (you run a program) you get a single thread (also known as the main thread) to run your application code. To explicitly start another thread (other than your application main thread) you have to create an instance of thread class and call its Start method to run the thread using C#, Let’s see an example:

```cs
namespace ThreadsDemo
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //initialize a thread class object 
            //And pass your custom method name to the constructor parameter
            Thread t = new Thread(SomeMethod);
            //start running your thread
            t.Start();
            //while thread is running in parallel 
            //you can carry out other operations here        
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
        private static void SomeMethod()
        {
            //your code here that you want to run parallel
            //most of the time it will be a CPU bound operation
            Console.WriteLine("Hello World!");
        }

    }
}
```

When you run this program you may see Press Enter to terminate! message first and then Hello World! as they both run in parallel, so it is not guaranteed which execute first.
So,
We can use Thread’s Join() method to halt our main thread until reference thread (that is `t` variable in our case) is truly shutdown.

```cs
t.Join(); //👈👈👈 with Join the caller thread (Main) will wait until t thread terminates
Console.WriteLine("Press Enter to terminate!");
Console.ReadLine();
```

Another method to do this would be by using boolean IsAlive property of thread which gives instantaneous snapshot of thread’s state whether it is running or not.  
Now, Thread doesn’t start running until you call thread.Start() method, So before calling this Start method you can set some properties of a thread like its name and priority. Setting name of the thread will only help you in debugging, by setting name you can easily point out your thread in Visual Studio Thread window. You can also set the thread priority Let’s see an example:  

```cs
Thread t = new(SomeMethod)
{
    Name = "My Parallel Thread",

    Priority = ThreadPriority.BelowNormal
};
```

## Difference Between Foreground And Background Thread

There is also this another thread property `IsBackground`[^2]. If set to true your thread will be a background thread otherwise it will be a foreground thread, **by default its false so it will always be a foreground thread**, Let’s see an example.

```cs
namespace ThreadsDemo
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //initialize a thread class object 
            //And pass your custom method name to the constructor parameter
            Thread t = new(SomeMethod)
            {
                IsBackground = true//👈👈👈 Background thread -- see what happens with and without the property
            };
            //start running your thread
            t.Start();
            Console.WriteLine("Main thread exits");
        }
        private static void SomeMethod()
        {
            Console.WriteLine("Hello World!");
            Console.WriteLine("Still working");
            Thread.Sleep(1000);//👈👈👈 just make this thread sleep for a certain amount of milliseconds
            Console.WriteLine("Just finished");
        }
    }
}
```

Suppose if a foreground thread is the only thread (your main thread is done with execution and terminated) in your process, so your process is about to exit. However, it won’t, **your process will wait for foreground thread to complete its execution**. Thus, It will prevent application to exit until the foreground thread is done with the execution. However, if the thread is a background thread the process will exit even though background thread is not completely done with the execution.

## Start Thread With Parameters

As you saw in example before that we pass method name to thread constructor parameter like this,

```cs
Thread t = new Thread(SomeMethod);
```

We are able to do this because this thread constructor takes delegate as parameter. Its supports two type of delegates, Here is the definition of first delegate

```cs
public delegate void ThreadStart()
```

this we already saw in the above example, other is

```cs
public delegate void ParameterizedThreadStart(object obj)
```

If your custom method takes argument you can pass a ParameterizedThreadStart delegate to constructor, Let’s see an example:

```cs
namespace StartWithParameters
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //initialize a thread class object 
            //And pass your custom method name to the constructor parameter
            Thread t = new(Speak!);
            //start running your thread
            //dont forget to pass your parameter for the Speak method 
            //in Thread's Start method below
            t.Start("Hello World!");
            //wait until Thread "t" is done with its execution.
            t.Join();
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
        private static void Speak(object s)
        {
            //your code here that you want to run parallel
            //most of the time it will be a CPU bound operation
            string? say = s as string;
            Console.WriteLine(say);
        }
    }
}
```

Did you notice now we need to pass the Speak method argument to Start method. So far we have used only static method. However, you can also use instance methods as a thread constructor parameter, Let’s see an example:  

```cs
namespace StartWithParameters
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Person person = new();
            //initialize a thread class object 
            //And pass your custom method name to the constructor parameter
            Thread t = new(person.Speak!);
            //start running your thread
            //dont forget to pass your parameter for 
            //the Speak method in Thread's Start method below
            t.Start("Hello World!");
            //wait until Thread "t" is done with its execution.
            t.Join();
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
    }

    public class Person
    {
        public void Speak(object s)
        {
            //your code here that you want to run parallel
            //most of the time it will be a CPU bound operation
            string? say = s as string;
            Console.WriteLine(say);

        }

    }

}
```

In the above example, we used ParameterizedThreadStart delegate however same applies to ThreadStart delegate, both of them can be used with an instance method.

## Thread Life Cycle

A thread in C# at any point of time exists in any one of the following states. A thread lies only in one of the shown states at any instant:

| Aborted | 256 | The thread state includes [AbortRequested](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-abortrequested) and the thread is now dead, but its state has not yet changed to [Stopped](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-stopped). |
| --- | --- | --- |
| AbortRequested | 128 | The [Abort(Object)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.abort?view=net-8.0#system-threading-thread-abort(system-object)) method has been invoked on the thread, but the thread has not yet received the pending [ThreadAbortException](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadabortexception?view=net-8.0) that will attempt to terminate it. |
| Background | 4 | The thread is being executed as a background thread, as opposed to a foreground thread. This state is controlled by setting the [IsBackground](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.isbackground?view=net-8.0#system-threading-thread-isbackground) property. |
| Running | 0 | The thread has been started and not yet stopped. |
| Stopped | 16 | The thread has stopped. |
| StopRequested | 1 | The thread is being requested to stop. This is for internal use only. |
| Suspended | 64 | The thread has been suspended. |
| SuspendRequested | 2 | The thread is being requested to suspend. |
| Unstarted | 8 | The [Start()](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.start?view=net-8.0#system-threading-thread-start) method has not been invoked on the thread. |
| WaitSleepJoin | 32 | The thread is blocked. This could be the result of calling [Sleep(Int32)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.sleep?view=net-8.0#system-threading-thread-sleep(system-int32)) or [Join()](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.join?view=net-8.0#system-threading-thread-join), of requesting a lock - for example, by calling [Enter(Object)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.monitor.enter?view=net-8.0#system-threading-monitor-enter(system-object)) or [Wait(Object, Int32, Boolean)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.monitor.wait?view=net-8.0#system-threading-monitor-wait(system-object-system-int32-system-boolean)) - or of waiting on a thread synchronization object such as [ManualResetEvent](https://learn.microsoft.com/en-us/dotnet/api/system.threading.manualresetevent?view=net-8.0). |

The ThreadState enumeration defines a set of all possible execution states for threads. It's of interest only in a few debugging scenarios. Your code should never use the thread state to synchronize the activities of threads.

Once a thread is created, it's in at least one of the states until it terminates. Threads created within the common language runtime are initially in the [Unstarted](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-unstarted) state, while external, or unmanaged, threads that come into the runtime are already in the [Running](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-running) state. A thread is transitioned from the [Unstarted](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-unstarted) state into the [Running](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-running) state by calling [Thread.Start](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.start?view=net-8.0). Once a thread leaves the [Unstarted](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-unstarted) state as the result of a call to [Start](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.start?view=net-8.0), it can never return to the [Unstarted](https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadstate?view=net-8.0#system-threading-threadstate-unstarted) state.  
A thread can be in more than one state at a given time.

![Thread states](ThreadState.png#center)

In C#, to get the current state of the thread[^3], use `ThreadState` or `IsAlive` property provided by the `Thread` class.
Syntax:

```cs
public ThreadState ThreadState{ get; }
```

OR

```cs
public bool IsAlive { get; }
```

`Thread` class provides different types of methods to implement the states of the threads.
`Thread.Sleep()` method is a static used to temporarily suspend the current execution of the thread for specified milliseconds, so that other threads can get the chance to start the execution, or may get the CPU for execution.  

`Join()` method is used to make all the calling thread to wait until the main thread, i.e. joined thread complete its work.  

`Start()` method is used to send a thread into runnable State.  
A thread can finish its normal execution or can be shutdown in case of some special events:  

**Synchronous exception**  
Thread also gets exit if it runs into an unhandled exception. This exception is considered as synchronous exception which occurs in normal sequential program like `IndexOutOfRangeException`.  
**Asynchronous exception**  
This exception is an explicit exception raised by calling thread’s `Abort` or `Interrupt` method in the running thread by some other thread which has reference to the running thread. This exception also exits thread execution. However, **this is not a recommended method to shutdown a thread as it leaves the program to some improper state**.

## Sospensione e interruzione di thread[^4]

Se si chiama il metodo `Thread.Sleep`, il thread corrente viene bloccato immediatamente per il numero di millisecondi o l'intervallo di tempo passato al metodo, cedendo il resto della porzione di tempo a un altro thread. Una volta trascorso tale intervallo, il thread inattivo riprende l'esecuzione.
Un thread non può chiamare `Thread.Sleep` su un altro thread. `Thread.Sleep` è un metodo statico che determina sempre il thread corrente da sospendere.
Se si chiama `Thread.Sleep` con un valore di `Timeout.Infinite`, un thread rimarrà sospeso finché non verrà interrotto da un altro thread tramite una chiamata al metodo `Thread.Interrupt` nel thread sospeso. Si analizzi l'esempio seguente per comprendere la dinamica di questo modo di interazione con i thread:

```cs
namespace SleepingDemo01
{
    class Program
    {
        static void Main(string[] args)
        {
            // Interrupt a sleeping thread. 
            var sleepingThread = new Thread(Program.SleepIndefinitely);
            sleepingThread.Name = "Sleeping";
            sleepingThread.Start();
            Thread.Sleep(2000);
            sleepingThread.Interrupt();

            //Abort è deprecato nelle ultime versioni di .NET

        }
        private static void SleepIndefinitely()
        {
            Console.WriteLine("Thread '{0}' about to sleep indefinitely.",
                              Thread.CurrentThread.Name);
            try
            {
                Thread.Sleep(Timeout.Infinite);
            }
            catch (ThreadInterruptedException)
            {
                Console.WriteLine("Thread '{0}' awoken.",
                                  Thread.CurrentThread.Name);
            }

            finally
            {
                Console.WriteLine("Thread '{0}' executing finally block.",
                                  Thread.CurrentThread.Name);
            }
            Console.WriteLine("Thread '{0}' finishing normal execution.",
                              Thread.CurrentThread.Name);
            Console.WriteLine();
        }
    }
}
```

Il risultato è:  

```ps1
Thread 'Sleeping' about to sleep indefinitely.
Thread 'Sleeping' awoken.
Thread 'Sleeping' executing finally block.
Thread 'Sleeping' finishing normal execution.
```

È possibile interrompere un thread in attesa, chiamando il metodo `Thread.Interrupt` sul thread bloccato per generare un'eccezione `ThreadInterruptedException`, che fa uscire il thread dalla chiamata che lo blocca. Il thread dovrebbe intercettare l'eccezione `ThreadInterruptedException` ed eseguire le operazioni appropriate per continuare a funzionare. **Se il thread ignora l'eccezione, l'ambiente di esecuzione la intercetta e interrompe il thread. È consigliato non ricorrere al metodo Interrupt per interrompere un thread perché potrebbe lasciarlo in uno stato inconsistente**[^5].  

Si può definire comunque un **approccio cooperativo** nel quale, il thread, che esegue un certo task, controlla se ha il permesso di eseguire una certa operazione, come nell’esempio seguente:

```cs
namespace StopThread
{
    namespace StopThread
    {
        class Program
        {
            //set to volatile as its liable to change so we JIT to don't cache the value
            private static volatile bool _cancel = false;
            public static void Main()
            {
                //initialize a thread class object 
                //And pass your custom method name to the constructor parameter
                Thread t = new Thread(Speak!);
                //start running your thread
                //dont forget to pass your parameter for the 
                //Speak method (ParameterizedThreadStart delegate) in Start method
                t.Start("Hello World!");
                //wait for 5 secs while Speak method print Hello World! for multiple times
                Thread.Sleep(5000);
                //signal thread to terminate
                _cancel = true;
                //wait until CLR confirms that thread is shutdown
                t.Join();
                Console.WriteLine("\nSono il main thread, ho aspettato per 5 secondi che l'altro thread si divertisse a scrivere \"Hello World\", ma ora esco!");
                Console.ReadLine();
            }

            private static void Speak(object s)
            {
                while (!_cancel)
                {
                    string? say = s as string;
                    Console.WriteLine(say);
                }
            }
        }
    }
}
```

Here we used a boolean field to signal another thread Speak method to stop running when `_cancel` is set to true. Did you notice how we need to set the_cancel field as volatile. JIT usually cache this kind of fields as it doesn’t seem to change within Speak method in the loop. **By setting it to volatile we are signaling JIT not to cache this field because it is liable to change**. You can use your own communication mechanism to tell the ThreadStart method to finish, which is recommended method.

## Threadpool

As we learned in previous section thread shutdown after its work is done which is a great thing, CLR clears the resource after thread shutdown and thus free up space for smooth program execution without you to write any code for thread management and garbage collection. **However, creation of thread is something that costs time and resource and thus will be difficult to manage when dealing with a large number of threads. Thread pool is used in this kind of scenario**.  
**When you work with thread pool from .NET you queue your work item in thread pool from where it gets processed by an available thread in the thread pool. But, after work is done this thread doesn’t get shutdown. Instead of shutting down this thread get back to thread pool where it waits for another work item. The creation and deletion of this threads are managed by thread pool depending upon the work item queued in the thread pool**. If no work is there in the thread pool it may decide to kill those threads so they no longer consume the resources.

### Thread Pool Queue

`ThreadPool.QueueUserWorkItem` is a static method that is used to queue the user work item in the thread pool. Just like you pass a delegate to a thread constructor to create a thread you have to pass a delegate to this method to queue your work.
Here is an example:

```cs
namespace ThreadPoolDemo
{
    class Program
    {
        public static void Main()
        {
            // call QueueUserWorkItem to queue your work item
            ThreadPool.QueueUserWorkItem(Speak);
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }

        //your custom method you want to run in another thread
        public static void Speak(object? stateInfo)
        {
            // No state object was passed to QueueUserWorkItem, so stateInfo is null.
            Console.WriteLine("Hello World!");
        }
    }

}
```

As you can see we can directly pass this `Speak` method name to the `QueueUserWorkItem` method as it takes `WaitCallback delegate` as a parameter.
Here is the definition of this delegate:

```cs
public delegate void WaitCallback(object state);
```

See how it share the same signature like our `Speak` method with void as return type and take object as parameter. `QueueUserWorkItem` also has overload for parameterized method like this:

```cs
QueueUserWorkItem(WaitCallback, Object)
```

Here the first parameter is your method name and the second parameter is the object that you want to pass to your method.
Here is an example:  

```cs
namespace ThreadPoolDemo
{
    class Program
    {
        public static void Main()
        {
            // call QueueUserWorkItem to queue your work item
            ThreadPool.QueueUserWorkItem(Speak, "Hello World!");
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
        //your custom method you want to run in another thread
        public static void Speak(object? s)
        {
            string? say = s as string;
            Console.WriteLine(say);
        }
    }
}
```

### Limitations To Thread Pool Queue

`ThreadPool.QueueUserWorkItem` is really easy way to schedule your work into thread pool however it has its limitation, like **you cannot tell whether a particular work operation is finished and also it does not return a value**. However, a Task is something that you can use in place of ThreadPool.QueueUserWorkItem. It tells whether an operation is completed and also returns a value after the task is completed. We will learn more about Tasks later. But, before that we’ll learn what is a Race Condition in a multithreaded program and how much it is critical to synchronize a multithreaded program having Shared Resources.

## Race Condition

**A race condition occurs when two or more threads are able to access shared data and they try to change it at the same time**. To fully understand a race condition we will first talk about shared resources and than discuss about what is a race condition in threading.

### Shared Resources

Not all resources are meant to be used concurrently.Resources like integers and collection must be handled carefully when accessed through multiple threads, resources that are accessed and updated within multiple threads are known as Shared Resources**. Let’s see an example:  

```cs
namespace SharedResources01
{
    class Program
    {
        private static int sum;
        static void Main(string[] args)
        {
            //create thread t1 using anonymous method
            Thread t1 = new(() => {
                for (int i = 0; i < 10000000; i++)
                {
                    //increment sum value
                    sum++;
                }
            });
            //create thread t2 using anonymous method
            Thread t2 = new(() => {
                for (int i = 0; i < 10000000; i++)
                {
                    //increment sum value
                    sum++;
                }
            });
            //start thread t1 and t2
            t1.Start();
            t2.Start();
            //wait for thread t1 and t2 to finish their execution
            t1.Join();
            t2.Join();
            //write final sum on screen
            Console.WriteLine("sum: " + sum);
            Console.WriteLine("Press enter to terminate!");
            Console.ReadLine();
        }
    }

}
```

However, there is really some problem with the code above because **every time we run it we see different output**.
To truly understand the problem we must first understand what is a Race condition.

### What Is Race Condition?

Race Condition is a scenario where the outcome of the program is affected because of timing.
**A race condition occurs when two or more threads can access shared data and they try to change it at the same time. Because the thread scheduling algorithm can swap between threads at any time, you don’t know the order in which the threads will attempt to access the shared data. Therefore, the result of the change in data is dependent on the thread scheduling algorithm, i.e. both threads are "racing" to access/change the data.**  
In our case, the line which is causing race condition is sum++, though this line seems to single line code and must not affect with concurrency but this single line of code gets transformed into multiline processor level instructions by JIT at the time of execution, below is the example

```asm
mov eax, dword ptr [sum]
inc eax
mov dword ptr [sum], eax
```

So what happens when our multiple threads execute this part of the code. Let’s assume there is this thread `X` and thread `Y`. Suppose thread `X` reads the value of some variable and store in register `X.eax` for increment but after doing increment from value 0 to 1, `X` thread got suspended by Thread scheduler and `Y` thread start executing this part of the code where `Y` thread also reads the value of variable sum in register `Y.eax` and does the increment from value 0 to 1 and now after doing this increment both thread will update `sum` variable to 1 thus its value will be 1 even though both the threads incremented the value.
So in simple words, **it’s just the race between threads X and Y to read and update the value of variable sum and thus cause the race condition**. But we can overcome this kind of problems using some of the thread synchronization techniques that are:  

* `Atomic Update`  
* `Data Partitioning`  
* `Wait-Based Technique`  

We will learn more about these thread synchronization techniques in the next section

## Sezione Critica

In concurrent programming, concurrent accesses to shared resources can lead to unexpected or erroneous behavior, so **parts of the program where the shared resource is accessed need to be protected in ways that avoid the concurrent access. This protected section is the critical section or critical region[^6]. It cannot be executed by more than one process/thread at a time**. Typically, the critical section accesses a shared resource, such as a data structure, a peripheral device, or a network connection, that would not operate correctly in the context of multiple concurrent accesses.  
**Critical section is a piece of a program that requires mutual exclusion of access.**
In the case of mutual exclusion (Mutex/Monitor), one thread blocks a critical section by using locking techniques when it needs to access the shared resource and other threads have to wait to get their turn to enter into the section. This prevents conflicts when two or more threads share the same memory space and want to access a common resource.

## Stati transienti e interferenze[^7]

Le strutture dati accedute da un programma multithread sono oggetto di aggiornamenti da parte di più thread

* Gli aggiornamenti non avvengono atomicamente, ma sono decomponibili in varie operazioni di modifica intermedie e di una certa durata  
* Durante il transitorio la struttura dati “perde significato” (inconsistente), e passa per una serie di **stati transienti**  
* Un tale stato non dovrebbe essere visibile a thread diversi dal thread che esegue l’aggiornamento, altrimenti si generano **interferenze**.

![Origini interferenze](Origini-Interferenze-Thread.png#center)

Si ha interferenza in presenza di

* due o più flussi di esecuzione
* almeno un flusso di esecuzione esegue scritture (aggiorna la struttura dati!)
* Perché
  * un flusso esegue un cambio di stato dell’area di memoria in maniera non atomica
  * gli stati transienti che intercorrono tra quello iniziale a quello finale
sono visibili a flussi di esecuzione diversi da quello che li sta producendo

Esempio di interferenza  
La disponibilità di un volo di una compagnia aerea è memorizzata in
`POSTI=1`. Due signori nel medesimo istante ma da due postazioni distinte, chiedono rispettivamente di prenotare l’ultimo posto e di disdire la prenotazione già effettuata.  

* Le due richieste vengono tradotte in queste sequenze di istruzioni
elementari indivisibili:

![Prenota e disdici fig. 1](Prenota-Disdici1.png#center)

Inizialmente `POSTI=1`  

* L’esecuzione concorrente dà luogo ad una qualsiasi delle possibili
sequenze di interleaving  
* Consideriamo un campione di tre sequenze:

![Prenota e disdici fig. 2](Prenota-Disdici2.png#center)

### Thread Safeness

Definizione di programma thread-safe: **Un programma si dice thread safe se garantisce che nessun thread possa accedere a dati in uno stato inconsistente**.  

* Un programma thread safe protegge l’accesso alle strutture in stato inconsistente da parte di altri thread per evitare interferenze, costringendoli in attesa (passiva) del suo ritorno in uno stato consistente
* Il termine thread safeness si applica anche a librerie ed a strutture dati ad indicare la loro predisposizione ad essere inseriti in programmi multithread

### Dominio e Rango

Indichiamo con A, B, … X, Y, … un’area di memoria

* Una istruzione i
  * dipende da una o più aree di memoria che denotiamo `domain(i)`,ovvero dominio di i
  * altera il contenuto di una o più aree di memoria che denotiamo `range(i)` di i, ovvero rango di i

Ad es. per la procedura P:

![Procedura P](Procedure-P.png#center)

### Condizioni di Bernstein

Quando è lecito eseguire
concorretemene due istruzioni ia e ib?

* se valgono le seguenti condizioni, dette
**Condizioni di Bernstein**:

![Condizioni di Bernstein](Condizioni-di-Bernstein.png#center)

Si osservi che non si impone alcuna condizione su

![Intersezione](Intersezione.png#center)

Sono banalmente estendibili al caso di tre o più istruzioni

Esempi di violazione per le due istruzioni

![Esempio di violazione](Esempio-violazione-Bernstein.png#center)

Quando un insieme di istruzioni soddisfa le condizioni di Bernstein, il loro esito complessivo sarà sempre lo stesso indipendentemente dall'ordine e dalle velocità relative con
cui vengono eseguite, ovvero, sarà sempre equivalente ad una loro esecuzione seriale. Al contrario, **in caso di violazione, gli errori dipendono dall'ordine e dalle velocità relative** generando il fenomeno delle `interferenze`.  
Un programma che (implicitamente od esplicitamente) basa la propria correttezza su ipotesi circa la velocità relativa dei vari processori virtuali o sulla sequenza di interleaving eseguita, è scorretto. Esiste una sola assunzione che possono fare i programmatori sulla
velocità dei processori virtuali: ***Tutti i processori virtuali hanno una velocità finita non nulla***.   Questa assunzione è l’unica che si può fare sui processori virtuali e sulle loro velocità relative.  
**Dato un programma multithread, quali strutture dati bisogna proteggere per garantire la thread safeness? ⇒ Tutte le strutture dati oggetto di accessi concorrenti che violano le condizioni di Bernstein**.  
In altre parole, **le strutture dati oggetto di scritture concorrenti da parte di due o più thread**.

[^1]: [Creating threads and passing data](https://learn.microsoft.com/en-us/dotnet/standard/threading/creating-threads-and-passing-data-at-start-time)
[^2]: [Foreground and background threads](https://learn.microsoft.com/en-us/dotnet/standard/threading/foreground-and-background-threads)
[^3]: [Thread States](http://www.albahari.com/threading/part2.aspx)
[^4]: [Pausing and resuming threads](https://learn.microsoft.com/en-us/dotnet/standard/threading/pausing-and-resuming-threads)
[^5]: [Interrupt and Abort](http://www.albahari.com/threading/part3.aspx#_Interrupt_and_Abort)
[^6]: [Critical Section](https://en.wikipedia.org/wiki/Critical_section)
[^7]: [Teoria sui Thread](https://homes.di.unimi.it/ceselli/SO/slides/04a-thread.pdf)
