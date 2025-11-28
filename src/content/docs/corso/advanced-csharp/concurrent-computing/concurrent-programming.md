---
title: "Tecniche di sincronizzazione"
description: "Tecniche di sincronizzazione tra thread. Semafori. Concetto di deadlock. Costrutti per la programmazione concorrente"
sidebar:
  order: 30

---
<style>
img {display: block; margin: 0 auto;}
</style>

## Thread synchronization techniques

**Thread synchronization refers to the act of shielding against multithreading issues such as data races, deadlocks and starvation**. Se più thread sono in grado di effettuare chiamate alle proprietà e ai metodi di un singolo oggetto, è essenziale che tali chiamate siano sincronizzate. In caso contrario un thread potrebbe interrompere le operazioni eseguite da un altro thread e l'oggetto potrebbe rimanere in uno stato non valido. Una classe i cui membri sono protetti da tali interruzioni è detta thread-safe. .NET offre diverse strategie per sincronizzare l'accesso a membri statici e di istanza:  

* Aree di codice sincronizzate. È possibile usare la classe Monitor o il supporto del compilatore per questa classe per sincronizzare solo il codice di blocco necessario, migliorando le prestazioni.
* Sincronizzazione manuale. È possibile usare gli oggetti di sincronizzazione della libreria di classi .NET.

### C# Interlocked

So as we saw in previous chapter processor increments the variable, written in a single line of C# code in three steps (three line of code) in processor-specific language, that is read, increment and update the variable. One way to tackle this problem is to carry out all this three operation in one single atomic operation. This can be done only on data that is word-sized. Here, by atomic I mean uninterruptable and word-sized means value that can fit in a register for the update, which is a single integer in our case. However, today's processors already provide lock feature to carry out an atomic update on word-sized data. However, we can't use this processor specific instruction directly in C# code but there is Interlocked Class in DotNet Framework that is a wrapper around this processor-level instruction that can be used to carry out atomic operations like increment and decrement on a word-sized data.

Let's see an updated version of the buggy code we saw in the previous chapter:

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace AtomicUpdate01
{
    class Program
    {
        private static int sum;
        static void Main(string[] args)
        {

            //create thread t1 using anonymous method
            Thread t1 = new Thread(() =>
            {
                for (int i = 0; i < 10000000; i++)
                {
                    //use threading Interlocked class for atomic update
                    Interlocked.Increment(ref sum);
                }
            });

            //create thread t2 using anonymous method
            Thread t2 = new Thread(() =>
            {
                for (int i = 0; i < 10000000; i++)
                {
                    //use threading Interlocked class for atomic update
                    Interlocked.Increment(ref sum);
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

### Data Partitioning

Data Partitioning is actually kind of strategy where you decide to process data by partitioning it for multiples threads. Its kind of "you do that and I will do that" strategy.

To use data partitioning you must have some domain-specific knowledge of data (such as an array or multiple files manipulation), where you decide that one thread will process just one slice of data while other thread will work on another slice. Let's see an example

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace DataPartition01
{
    class Program
    {
        private static int[] array;
        private static int sum1;
        private static int sum2;

        static void Main(string[] args)
        {
            //set length for the array size
            int length = 1000000;
            //create new array of size lenght
            array = new int[length];

            //initialize array element with value of their respective index
            for (int i = 0; i < length; i++)
            {
                array[i] = i;
            }

            //index to split on
            int dataSplitAt = length / 2;

            //create thread t1 using anonymous method
            Thread t1 = new Thread(() =>
            {
                //calculate sum1
                for (int i = 0; i < dataSplitAt; i++)
                {
                    sum1 = sum1 + array[i];
                }
            });


            //create thread t2 using anonymous method
            Thread t2 = new Thread(() =>
            {
                //calculate sum2
                for (int i = dataSplitAt; i < length; i++)
                {
                    sum2 = sum2 + array[i];
                }
            });


            //start thread t1 and t2
            t1.Start();
            t2.Start();

            //wait for thread t1 and t2 to finish their execution
            t1.Join();
            t2.Join();

            //calculate final sum
            int sum = sum1 + sum2;

            //write final sum on screen
            Console.WriteLine("Sum:" + sum);

            Console.WriteLine("Press enter to terminate!");
            Console.ReadLine();
        }
    }
}

```

However, this technique can't be adapted for every scenario there may be a situation where one slice of data depends on the output of the previous slice of data; one example of this scenario is Fibonacci series where, data\[n\]=data\[n-1\]+data\[n-2\] in such a situation data partitioning can't be adopted.

### Wait Based Synchronization

Now, the third technique is a Wait-Based technique which is a very sophisticated way to handle the race condition, used in a situation where above two methods can't be adopted that easily. **In this technique, a thread is blocked until someone decides its safe for them to proceed.**

Suppose there are two threads namely X and Y and both want to access some resource R. Now to protect this resource we choose some lock primitive or synchronization primitive as LR (primitive here is some primitive type like int or array). Now when thread X want to access resource R it will first acquire the lock ownership of LR, once this thread got ownership of LR it can access the resource R safely. As long as thread X has this ownership no other thread can access the LR ownership

While X has ownership if Y request to acquire the ownership of lock LR it requests will get block until thread X releases its ownership.

#### Panoramica delle primitive di sincronizzazione in .NET

<https://docs.microsoft.com/it-it/dotnet/standard/threading/overview-of-synchronization-primitives>

.Net has following Wait Based Primitives that you can use to apply Wait-Based technique. They all share the same basic usage:

-         **Access the lock ownership**

-         **Manipulate the protected resource**

-         **Release the lock ownership**

.NET offre una gamma di tipi che è possibile usare per sincronizzare l'accesso a una risorsa condivisa o coordinare l'interazione tra thread.

-         **Classe WaitHandle e tipi di sincronizzazione leggeri**

Più primitive di sincronizzazione .NET derivano dalla classe [System.Threading.WaitHandle](https://docs.microsoft.com/it-it/dotnet/api/system.threading.waithandle), che incapsula un handle di sincronizzazione del sistema operativo nativo e usa un meccanismo di segnalazione per l'interazione tra thread. Tali classi includono:

-         [System.Threading.Mutex](https://docs.microsoft.com/it-it/dotnet/api/system.threading.mutex), che concede l'accesso esclusivo a una risorsa condivisa. Lo stato di un mutex viene segnalato se nessun thread lo possiede.

-         [System.Threading.Semaphore](https://docs.microsoft.com/it-it/dotnet/api/system.threading.semaphore), che limita il numero di thread che possono accedere simultaneamente a una risorsa condivisa o a un pool di risorse. Lo stato di un semaforo denominato è impostato come segnalato quando il relativo conteggio è maggiore di zero e come non segnalato quando il relativo conteggio è zero.

I tipi di sincronizzazione leggeri non si basano su handle del sistema operativo sottostanti e in genere offrono prestazioni migliori. Tuttavia, non possono essere usati per la sincronizzazione interprocesso. Usare tali tipi per la sincronizzazione dei thread all'interno di un'applicazione.

I tipi di sincronizzazione leggera che verranno illustrati in questa guida sono:

-          [SemaphoreSlim](https://docs.microsoft.com/it-it/dotnet/api/system.threading.semaphoreslim) è un'alternativa leggera a [Semaphore](https://docs.microsoft.com/it-it/dotnet/api/system.threading.semaphore).

-         La classe [System.Threading.Monitor](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor) concede l'accesso con esclusione reciproca a una risorsa condivisa tramite l'acquisizione o il rilascio di un blocco sull'oggetto che identifica la risorsa. Mentre è attivo un blocco, il thread che contiene il blocco può ancora acquisire e rilasciare il blocco. Gli altri thread non possono acquisire il blocco e il metodo [Monitor.Enter](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.enter) attende il rilascio del blocco. Il metodo [Enter](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.enter) acquisisce un blocco rilasciato. È anche possibile usare il metodo [Monitor.TryEnter](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.tryenter) per specificare l'intervallo di tempo durante il quale un thread cerca di acquisire un blocco. Poiché la classe [Monitor](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor) presenta affinità di thread, il thread che ha acquisito un blocco deve rilasciare il blocco chiamando il metodo [Monitor.Exit](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.exit). È possibile coordinare l'interazione tra i thread che acquisiscono un blocco sullo stesso oggetto usando i metodi [Monitor.Wait](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.wait), [Monitor.Pulse](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.pulse) e [Monitor.PulseAll](https://docs.microsoft.com/it-it/dotnet/api/system.threading.monitor.pulseall).

<http://www.albahari.com/threading/part2.aspx>

**Comparison of Locking Constructs**

| **Construct** | **Purpose** | **Cross-process?** | **Overhead\*** |
| --- |  --- |  --- |  --- |
| [lock](http://www.albahari.com/threading/part2.aspx#_Locking) (`**Monitor.Enter**` / `**Monitor.Exit**`) | Ensures just one thread can access a resource, or section of code at a time | \- | 20ns |
| [Mutex](http://www.albahari.com/threading/part2.aspx#_Mutex) | Yes | 1000ns |
| [SemaphoreSlim](http://www.albahari.com/threading/part2.aspx#_Semaphore) (introduced in Framework 4.0) | Ensures not more than a specified number of concurrent threads can access a resource, or section of code | \- | 200ns |
| [Semaphore](http://www.albahari.com/threading/part2.aspx#_Semaphore) | Yes | 1000ns |

\*Time taken to lock and unlock the construct once on the same thread (assuming no blocking), as measured on an Intel Core i7 860.

#### C# Lock Keyword

Some high-level languages have syntactic sugar which reduces the amount of code that must be written in some common situation like above. C# has this lock syntax for the same code we wrote above. Here is the code

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace LockKeyword
{
    class Program
    {
        private static int sum;
        private static readonly object _lock = new object();

        static void Main(string[] args)
        {

            //create thread t1 using anonymous method
            Thread t1 = new Thread(() => {
                for (int i = 0; i < 10000000; i++)
                {
                    lock (_lock)
                    {
                        //increment sum value
                        sum++;
                    }
                }
            });

            //create thread t2 using anonymous method
            Thread t2 = new Thread(() => {
                for (int i = 0; i < 10000000; i++)
                {
                    lock (_lock)
                    {
                        //increment sum value
                        sum++;
                    }
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

So we simply use the lock keyword syntax and write critical section code in its body and compiler will generate the Exception Aware Monitor code for us. Sweet!

#### Semafori

<https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim>

Semaphores are of two types: local semaphores and named system semaphores. Local semaphores are local to an application, system semaphores are visible throughout the operating system and are suitable for inter-process synchronization. The [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-5.0) is a lightweight alternative to the [Semaphore](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphore?view=net-5.0) class that doesn't use Windows kernel semaphores. Unlike the [Semaphore](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphore?view=net-5.0) class, the [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-5.0) class doesn't support named system semaphores. You can use it as a local semaphore only. The [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-5.0) class is the recommended semaphore for synchronization within a single app.

A lightweight semaphore controls access to a pool of resources that is local to your application. When you instantiate a semaphore, you can specify the maximum number of threads that can enter the semaphore concurrently. You also specify the initial number of threads that can enter the semaphore concurrently. This defines the semaphore's count.

The count is decremented each time a thread enters the semaphore, and incremented each time a thread releases the semaphore. To enter the semaphore, a thread calls one of the [Wait](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.wait?view=net-5.0) or [WaitAsync](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.waitasync?view=net-5.0) overloads. To release the semaphore, it calls one of the [Release](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.release?view=net-5.0) overloads. When the count reaches zero, subsequent calls to one of the Wait methods block until other threads release the semaphore. If multiple threads are blocked, there is no guaranteed order, such as FIFO or LIFO, that controls when threads enter the semaphore.

The basic structure for code that uses a semaphore to protect resources is:

```cs
// Enter semaphore by calling one of the Wait or WaitAsync methods.  
SemaphoreSlim.Wait()     
//Execute code protected by the semaphore.   
SemaphoreSlim.Release()
```

SemaphoreSlim.Release()

When all threads have released the semaphore, the count is at the maximum value specified when the semaphore was created. The semaphore's count is available from the [CurrentCount](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.currentcount?view=net-5.0) property.

| **CONSTRUCTORS** ||
| --- | --- |
| [SemaphoreSlim(Int32)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.-ctor?view=net-5.0#System_Threading_SemaphoreSlim__ctor_System_Int32_) | Initializes a new instance of the [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-5.0) class, specifying the initial number of requests that can be granted concurrently. |
| [SemaphoreSlim(Int32, Int32)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.-ctor?view=net-5.0#System_Threading_SemaphoreSlim__ctor_System_Int32_System_Int32_) | Initializes a new instance of the [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-5.0) class, specifying the initial and maximum number of requests that can be granted concurrently. |

A thread can enter the semaphore multiple times by calling the [System.Threading.Semaphore](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphore) object's [WaitOne](https://docs.microsoft.com/en-us/dotnet/api/system.threading.waithandle.waitone) method or the [SemaphoreSlim](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim) object's [Wait](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.wait) method repeatedly. To release the semaphore, the thread can either call the [Semaphore.Release()](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphore.release#System_Threading_Semaphore_Release) or [SemaphoreSlim.Release()](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.release#System_Threading_SemaphoreSlim_Release) method overload the same number of times, or call the [Semaphore.Release(Int32)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphore.release#System_Threading_Semaphore_Release_System_Int32_) or [SemaphoreSlim.Release(Int32)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim.release#System_Threading_SemaphoreSlim_Release_System_Int32_) method overload and specify the number of entries to be released.

Esempio con i thread:

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ThreadGym
{
    class Program
    {
        private static SemaphoreSlim semaphore;
        // A padding interval to make the output more orderly.
        private static int padding;

        public static void Main()
            {
            // Create the semaphore.
            semaphore = new SemaphoreSlim(0, 3);
            Console.WriteLine("{0} Thread can enter the semaphore.",
                              semaphore.CurrentCount);
            Thread[] threads = new Thread[5];

            // Create and start five numbered tasks.
            for (int i = 0; i <= 4; i++)
            {
                threads[i] =  new Thread(() => {
                    // Each task begins by requesting the semaphore.
                    Console.WriteLine("Thread {0} begins and waits for the semaphore.",
                                      Thread.CurrentThread.ManagedThreadId);

                    //blocca il thread/task corrente in attesa di entrare nel semaforo
                    semaphore.Wait();
                    //https://docs.microsoft.com/en-us/dotnet/api/system.threading.interlocked?view=netframework-4.8
                    //Adds two integers and replaces the first integer with the sum, as an atomic operation.
                    Interlocked.Add(ref padding, 100);

                    Console.WriteLine("Thread {0} enters the semaphore.", Thread.CurrentThread.ManagedThreadId);

                    // The task just sleeps for 1+ seconds.
                    Thread.Sleep(1000 + padding);
                    //rilascio il semaforo e incrementa il contatore
                    Console.WriteLine("Thread {0} releases the semaphore; previous count: {1}.",
                                      Thread.CurrentThread.ManagedThreadId, semaphore.Release());
                });
            }
            foreach (var thread in threads)
            {
                thread.Start();
            }
            // Wait for half a second, to allow all the tasks to start and block.
            Thread.Sleep(500);

            // Restore the semaphore count to its maximum value.
            Console.Write("Main thread calls Release(3) --> ");
            //rilascia il semaforo del numero specificato di valori
            semaphore.Release(3);
            Console.WriteLine("{0} Threads can enter the semaphore.",
                              semaphore.CurrentCount);
            // Main thread waits for the tasks to complete.
            foreach (var thread in threads)
            {
                thread.Join();
            }

            Console.WriteLine("Main thread exits.");
            Console.ReadLine();
        }

    }

}

```

Esempio con in task (i task saranno introdotti nei prossimi paragrafi):

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SemaforoDemo01
{
    class Program
    {
        private static SemaphoreSlim semaphore;
        // A padding interval to make the output more orderly.
        private static int padding;

        public static void Main()
        {
            // Create the semaphore.
            semaphore = new SemaphoreSlim(0, 3);
            Console.WriteLine("{0} tasks can enter the semaphore.",
                              semaphore.CurrentCount);
            Task[] tasks = new Task[5];

            // Create and start five numbered tasks.
            for (int i = 0; i <= 4; i++)
            {
                tasks[i] = Task.Run(() => {
                    // Each task begins by requesting the semaphore.
                    Console.WriteLine("Task {0} begins and waits for the semaphore.",
                                      Task.CurrentId);
                    
                    //blocca il thread/task corrente in attesa di entrare nel semaforo
                    semaphore.Wait();
                    //https://docs.microsoft.com/en-us/dotnet/api/system.threading.interlocked?view=netframework-4.8
                    //Adds two integers and replaces the first integer with the sum, as an atomic operation.
                    Interlocked.Add(ref padding, 100);

                    Console.WriteLine("Task {0} enters the semaphore.", Task.CurrentId);

                    // The task just sleeps for 1+ seconds.
                    Thread.Sleep(1000 + padding);

                    Console.WriteLine("Task {0} releases the semaphore; previous count: {1}.",
                                      Task.CurrentId, semaphore.Release());//rilascio il semaforo e incrementa il contatore
                });
            }

            // Wait for half a second, to allow all the tasks to start and block.
            Thread.Sleep(500);

            // Restore the semaphore count to its maximum value.
            Console.Write("Main thread calls Release(3) --> ");
            //rilascia il semaforo del numero specificato di valori
            semaphore.Release(3);
            Console.WriteLine("{0} tasks can enter the semaphore.",
                              semaphore.CurrentCount);
            // Main thread waits for the tasks to complete.
            Task.WaitAll(tasks);

            Console.WriteLine("Main thread exits.");
            Console.ReadLine();
        }
    }
}

```

<https://docs.microsoft.com/en-us/dotnet/standard/threading/semaphore-and-semaphoreslim>

#### Produttore consumatore

Prima versione: buffer a gestione LIFO (Stack)

```cs
namespace ProducerConsumerLIFO
{
    class Program
    {
        static readonly object _lock = new ();
        static int BufferSize = 10;
        static SemaphoreSlim emptyPosCount = new (BufferSize,BufferSize);
        static SemaphoreSlim fillPosCount = new (0,BufferSize);
        static int firstEmptyPos = 0;
        static int[] buffer = new int[BufferSize];
        static void Main(string[] args)
        {
            Thread producer = new (ProducerWork) { Name = "Producer" };
            Thread consumer = new (ConsumerWork) { Name = "Consumer" };
            producer.Start();
            consumer.Start();

            //attendo la fine dei thread producer e consumer
            producer.Join();
            consumer.Join();

            Console.WriteLine("Fine");

        }

        private static void ConsumerWork()
        {
            while (true)
            {
                fillPosCount.Wait();//passo il semaforo - ci sono celle piene
                lock (_lock)
                {
                    buffer[--firstEmptyPos] = 0;//simulo la lettura del dato
                    Console.WriteLine("Consumato prodotto alla posizione {0} da thread id = {1}, thread name = {2}", 
                        firstEmptyPos,
                        Environment.CurrentManagedThreadId, 
                        Thread.CurrentThread.Name);
                    PrintArray(buffer);
                }
                emptyPosCount.Release();
                Thread.Sleep(2500);
            }
        }

        private static void ProducerWork()
        {
            while (true)
            {
                emptyPosCount.Wait();//passo il semaforo - ci sono celle vuote
                lock (_lock)//sezione critica
                {
                    buffer[firstEmptyPos] = 1;
                    Console.WriteLine("Aggiunto prodotto alla posizione {0} da thread id = {1}, thread name = {2}", 
                        firstEmptyPos,
                        Environment.CurrentManagedThreadId, 
                        Thread.CurrentThread.Name);
                    PrintArray(buffer);
                    firstEmptyPos++;
                }
                fillPosCount.Release();
                Thread.Sleep(1000);
            }
        }

        static void PrintArray(int[] array)
        {
            foreach (var item in array)
            {
                Console.Write(item + " ");
            }
            Console.WriteLine();
        }

    }
}

```

Seconda versione: buffer gestito con tecnica FIFO, con coda circolare

```cs
namespace ProducerConsumerFIFO
{
    class Program
    {
        static readonly object _lock = new ();
        static int bufferSize = 10;
        static int[] buffer = new int[bufferSize];
        static SemaphoreSlim emptyPosCount = new (bufferSize, bufferSize);
        static SemaphoreSlim fillPosCount = new (0, bufferSize);
        static int writePos = 0;
        static int readPos = 0;

        static void Main(string[] args)
        {
            Thread producer = new (ProducerWork) { Name = "Producer" };
            Thread consumer = new (ConsumerWork) { Name = "Consumer" };
            producer.Start();
            consumer.Start();

            //attendo la fine dei thread producer e consumer
            producer.Join();
            consumer.Join();

            Console.WriteLine("Fine");
        }

        private static void ConsumerWork()
        {
            while (true)
            {
                fillPosCount.Wait();//passo il semaforo - ci sono celle piene
                lock (_lock)
                {
                    buffer[readPos] = 0;
                    Console.WriteLine("Consumato prodotto alla posizione {0} da thread id = {1}, thread name = {2}", 
                        readPos,
                        Environment.CurrentManagedThreadId, 
                        Thread.CurrentThread.Name);
                    Console.WriteLine("Numero celle libere {0}", emptyPosCount.CurrentCount + 1);
                    PrintArray(buffer);
                    //incremento modulo BufferSize - coda circolare
                    readPos = (readPos + 1) % bufferSize;

                }
                emptyPosCount.Release();
                Thread.Sleep(2500);
            }
        }

        private static void ProducerWork()
        {
            while (true)
            {
                emptyPosCount.Wait();//passo il semaforo - ci sono celle vuote
                lock (_lock)//sezione critica
                {
                    buffer[writePos] = 1;
                    Console.WriteLine("Aggiunto prodotto alla posizione {0} da thread id = {1}, thread name = {2}", 
                        writePos,
                        Environment.CurrentManagedThreadId, 
                        Thread.CurrentThread.Name);
                    Console.WriteLine("Numero celle occupate {0}", fillPosCount.CurrentCount + 1);
                    PrintArray(buffer);
                    //incremento modulo BufferSize - coda circolare
                    writePos = (writePos+1)%bufferSize;
                }
                fillPosCount.Release();
                Thread.Sleep(1000);
            }
        }

        static void PrintArray(int[] array)
        {
            foreach (var item in array)
            {
                Console.Write(item + " ");
            }
            Console.WriteLine();
        }
    }
}

```

#### Algoritmo del barbiere

Concetti ed esempi fondamentali:

[https://en.wikipedia.org/wiki/Sleeping\_barber\_problem](https://en.wikipedia.org/wiki/Sleeping_barber_problem)

Imagine a hypothetical barbershop with one barber, one barber chair, and a waiting room with *n* chairs (*n* may be 0) for waiting customers. The following rules apply:[^\[4\]^](https://en.wikipedia.org/wiki/Sleeping_barber_problem#cite_note-4)

-         If there are no customers, the barber falls asleep in the chair

-         A customer must wake the barber if he is asleep

-         If a customer arrives while the barber is working, the customer leaves if all chairs are occupied and sits in an empty chair if it's available

-         When the barber finishes a haircut, he inspects the waiting room to see if there are any waiting customers and falls asleep if there are none[^\[3\]^](https://en.wikipedia.org/wiki/Sleeping_barber_problem#cite_note-ewd-3)[^\[5\]^](https://en.wikipedia.org/wiki/Sleeping_barber_problem#cite_note-5)

There are two main complications. First, there is a risk that a [race condition](https://en.wikipedia.org/wiki/Race_condition "Race condition"), where the barber sleeps while a customer waits for the barber to get them for a haircut, arises because all of the actions---checking the waiting room, entering the shop, taking a waiting room chair---take a certain amount of time. Specifically, a customer may arrive to find the barber cutting hair so they return to the waiting room to take a seat but while walking back to the waiting room the barber finishes the haircut and goes to the waiting room, which he finds empty (because the customer walks slowly or went to the restroom) and thus goes to sleep in the barber chair. Second, another problem may occur when two customers arrive at the same time when there is only one empty seat in the waiting room and both try to sit in the single chair; only the first person to get to the chair will be able to sit.

Prima versione -- per la gestione della sezione critica si utilizza un semaforo

```cs
using System;
using System.Threading;

namespace BarberShopV1
{
    class Program
    {
        //per la gestione della sezione critica si utilizza un semaforo
        const int numberOfSeats = 10;
        static int freeSeats = numberOfSeats;
        static SemaphoreSlim seatAccess = new SemaphoreSlim(1, 1);
        static SemaphoreSlim barberReady = new SemaphoreSlim(1, 1);
        static SemaphoreSlim clientReady = new SemaphoreSlim(0, numberOfSeats);
        static void Main(string[] args)
        {
            //Attivazione del thread del barbiere
            //il barbiere dorme sulla sua sedia da lavoro
            //quando arriva un cliente, il barbiere si sveglia e gli taglia i capelli
            //quando ha finito di tagliare i capelli, se c'è un altro cliente seduto 
            //su una delle sedie del negozio, lo serve immediatamente, altrimenti ritorna a dormine
            //il barbiere si sveglia appena arriva un nuovo cliente
            Thread barber = new Thread(Barber);
            barber.Start();

            //Attivazione dei thread dei clienti
            //un cliente arriva in un momento qualsiasi, se trova un posto libero nella
            //sala d'attesa si siede e aspetta fino a che non viene servito; se arriva e trova
            //tutte le sedie occupate, se ne va via
            int numberOfClients = 30;
            for (int i = 0; i < numberOfClients; i++)
            {
                new Thread(Client).Start();
                //i clienti arrivano con una certa frequenza al negozio
                Thread.Sleep(500);
            }
            barber.Join();
        }

        private static void Client(object obj)
        {
            //il cliente deve verificare se c'è posto
            //per farlo deve controllare il numero di posti liberi e quindi deve accedere alla
            //sezione critica
            seatAccess.Wait();
            if (freeSeats > 0)
            {
                //il cliente si siede ed occupa un posto
                freeSeats--;
                Console.WriteLine($"Il cliente con Thread Id = {Thread.CurrentThread.ManagedThreadId} trova posto e attende di essere servito; posti disponibili = {freeSeats}");
                seatAccess.Release();//esce dalla sezione critica
                clientReady.Release();//aumenta il numero di clienti disponibili
                barberReady.Wait();//attende che il barbiere sia disponibile
                //il cliente viene servito
                Console.WriteLine($"Sono il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} " +
                    $". Il Barbiere mi sta tagliando i capelli.");
            }
            else
            {
                //libero la sezione critica
                seatAccess.Release();
                //il cliente se ne va
                Console.WriteLine($"Il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} non ha trovato posto e se ne va");
            }

        }

        private static void Barber (object obj)
        {
            while (true)
            {
                clientReady.Wait();//attendo che ci sia un cliente
                //il cliente si accomoda sulla sedia del barbiere e libera un posto
                seatAccess.Wait();//il barbiere deve accedere alla sezione critica
                freeSeats++;//il barbiere libera un posto
                Console.WriteLine("Il barbiere libera un posto");
                seatAccess.Release();//il barbiere esce dalla sezione critica
                Console.WriteLine($"Il Barbiere sta tagliando i capelli");
                Thread.Sleep(2000);//il barbiere sta tagliando in capelli; questo è il tempo impiegato per tagliare i capelli
                barberReady.Release(); //il barbiere è nuovamente disponibile
            }
        }
    }
}

```

Seconda versione - per la gestione della sezione critica si utilizza un Monitor (lock)

```cs
using System;
using System.Threading;

namespace BarberShopV2
{
    class Program
    {
        //per la gestione della sezione critica si utilizza un Monitor (lock)
        const int numberOfSeats = 10;
        static int freeSeats = numberOfSeats;
        private static readonly object _lock = new object();
        static SemaphoreSlim barberReady = new SemaphoreSlim(1, 1);
        static SemaphoreSlim clientReady = new SemaphoreSlim(0, numberOfSeats);

        static void Main(string[] args)
        {
            //Attivazione del thread del barbiere
            //il barbiere dorme sulla sua sedia da lavoro
            //quando arriva un cliente, il barbiere si sveglia e gli taglia i capelli
            //quando ha finito di tagliare i capelli, se c'è un altro cliente seduto 
            //su una delle sedie del negozio, lo serve immediatamente, altrimenti ritorna a dormine
            //il barbiere si sveglia appena arriva un nuovo cliente
            Thread barber = new Thread(Barber);
            barber.Start();

            //Attivazione dei thread dei clienti
            //un cliente arriva in un momento qualsiasi, se trova un posto libero nella
            //sala d'attesa si siede e aspetta fino a che non viene servito; se arriva e trova
            //tutte le sedie occupate, se ne va via
            int numberOfClients = 30;
            for (int i = 0; i < numberOfClients; i++)
            {
                new Thread(Client).Start();
                //i clienti arrivano con una certa frequenza al negozio
                Thread.Sleep(500);
            }
            barber.Join();
        }

        private static void Client(object obj)
        {
            //il cliente deve verificare se c'è posto
            //per farlo deve controllare il numero di posti liberi e quindi deve accedere alla
            bool clienteSiSiede = false;
            //sezione critica
            //le operazioni in sezione critica devono durare il minimo possibile
            lock (_lock)
            {
                if (freeSeats > 0)
                {
                    //il cliente si siede ed occupa un posto
                    freeSeats--;
                    Console.WriteLine($"Il cliente con Thread Id = {Thread.CurrentThread.ManagedThreadId} trova posto e attende di essere servito;" +
                        $" posti disponibili = {freeSeats}");
                    clienteSiSiede = true;
                }
            }
            if (clienteSiSiede)
            {
                clientReady.Release();//aumenta il numero di clienti disponibili
                barberReady.Wait();//attende che il barbiere sia disponibile
                                   //il cliente viene servito
                Console.WriteLine($"Sono il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} " +
                    $". Il Barbiere mi sta tagliando i capelli.");
            }
            else
            {
                //il cliente se ne va
                Console.WriteLine($"Il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} non ha trovato posto e se ne va");
            }
        }




        private static void Barber(object obj)
        {
            while (true)
            {
                clientReady.Wait();//attendo che ci sia un cliente
                //il cliente si accomoda sulla sedia del barbiere e libera un posto
                lock (_lock)
                {
                    freeSeats++;//il barbiere libera un posto
                    Console.WriteLine("Il barbiere libera un posto");
                }//il barbiere deve accedere alla sezione critica
                Console.WriteLine($"Il Barbiere sta tagliando i capelli");
                Thread.Sleep(2000);//il barbiere sta tagliando in capelli; questo è il tempo impiegato per tagliare i capelli
                barberReady.Release(); //il barbiere è nuovamente disponibile
            }
        }
    }
}

```

Qualche spunto:

<https://github.com/meysam81/Sleeping-Barber-Problem>

<https://github.com/meysam81/Networked-Sleeping-Barber-Problem>

###  Deadlock

<http://www.diag.uniroma1.it/~salza/SO/SO-III-2p.pdf>

![alt text](./concurrent-programming/image.png)

![alt text](./concurrent-programming/image2.png)

![alt text](./concurrent-programming/image3.png)

![alt text](./concurrent-programming/image4.png)

![alt text](./concurrent-programming/image5.png)

####  Un esempio di deadlock: il barbiere sbagliato

La seguente versione dell'Algoritmo del Barbiere va in deadlock. Si è introdotto appositamente un errore:

```cs
using System;
using System.Threading;

namespace BarberShopDeadLock
{
    class Program
    {
        //per la gestione della sezione critica si utilizza un Monitor (lock)
        const int numberOfSeats = 10;
        static int freeSeats = numberOfSeats;
        private static readonly object _lock = new object();
        static SemaphoreSlim barberReady = new SemaphoreSlim(1, 1);
        static SemaphoreSlim clientReady = new SemaphoreSlim(0, numberOfSeats);

        static void Main(string[] args)
        {
            //Attivazione del thread del barbiere
            //il barbiere dorme sulla sua sedia da lavoro
            //quando arriva un cliente, il barbiere si sveglia e gli taglia i capelli
            //quando ha finito di tagliare i capelli, se c'è un altro cliente seduto 
            //su una delle sedie del negozio, lo serve immediatamente, altrimenti ritorna a dormine
            //il barbiere si sveglia appena arriva un nuovo cliente
            Thread barber = new Thread(Barber);
            barber.Start();

            //Attivazione dei thread dei clienti
            //un cliente arriva in un momento qualsiasi, se trova un posto libero nella
            //sala d'attesa si siede e aspetta fino a che non viene servito; se arriva e trova
            //tutte le sedie occupate, se ne va via
            int numberOfClients = 30;
            for (int i = 0; i < numberOfClients; i++)
            {
                new Thread(Client).Start();
                //i clienti arrivano con una certa frequenza al negozio
                Thread.Sleep(500);
            }
            barber.Join();
        }

        private static void Client(object obj)
        {
            //il cliente deve verificare se c'è posto
            //per farlo deve controllare il numero di posti liberi e quindi deve accedere alla

            //sezione critica
            //QUESTA VERSIONE VA IN DEADLOCK - QUESTO E' VOLUTO PER MOSTRARE IL PROBLEMA DELL'ATTESA CIRCOLARE
            //IL DEADLOCK E' DOVUTO AL FATTO CHE QUANDO IL CLIENT PRENDE IL LOCK RIMANE IN ATTESA CHE IL BARBIERE SIA DISPONIBILE
            //MA IL BARBIERE PER TAGLIARE I CAPELLI DEVE PRENDERE IL LOCK CHE NON ARRIVERA' MAI
            lock (_lock)
            {
                if (freeSeats > 0)
                {
                    //il cliente si siede ed occupa un posto
                    freeSeats--;
                    Console.WriteLine($"Il cliente con Thread Id = {Thread.CurrentThread.ManagedThreadId} trova posto e attende di essere servito;" +
                        $" posti disponibili = {freeSeats}");
                    clientReady.Release();//aumenta il numero di clienti disponibili
                    barberReady.Wait();//attende che il barbiere sia disponibile
                                       //il cliente viene servito
                    Console.WriteLine($"Sono il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} " +
                        $". Il Barbiere mi sta tagliando i capelli. Posti disponibili = {freeSeats}");
                }
                else
                {
                    //il cliente se ne va
                    Console.WriteLine($"Il cliente con ThreadId = {Thread.CurrentThread.ManagedThreadId} non ha trovato posto e se ne va");
                }
            }
        }




        private static void Barber(object obj)
        {
            while (true)
            {
                clientReady.Wait();//attendo che ci sia un cliente
                //il cliente si accomoda sulla sedia del barbiere e libera un posto
                Console.WriteLine("Barbiere: Sono in attesa di entrare in sezione critica");
                lock (_lock)
                {
                    freeSeats++;//il barbiere libera un posto
                    Console.WriteLine("Il barbiere libera un posto");
                }//il barbiere deve accedere alla sezione critica
                Console.WriteLine($"Il Barbiere sta tagliando i capelli");
                Thread.Sleep(2000);//il barbiere sta tagliando in capelli; questo è il tempo impiegato per tagliare i capelli
                barberReady.Release(); //il barbiere è nuovamente disponibile
            }
        }
    }
}

```

## Costrutti per la programmazione concorrente -- uso di thread

Gli esempi in questa sezione sono tratti da: "ITT "Giacomo Fauser" -- Novara Tecnologia e progettazione di sistemi informatici e di telecomunicazioni prof. R. Fuligni"

### Costrutto fork/join

Il costrutto fork permette a un processo/thread di creare un porcesso/thread figlio a cui far eseguire un'attività.

Il costrutto join permette a un processo/thread di attendere la fine di un processo/thread figlio.

#### Costrutto fork/join: esempio 1

Scrivere un programma concorrente che, utilizzando il costrutto *fork/join*, esegua le operazioni indicate di seguito esprimendo il massimo grado di parallelismo.

![alt text](./concurrent-programming/image6.png)

Pesudocodifica

![alt text](./concurrent-programming/image7.png)

Codifica con l’uso dei Thread

```cs
using System;
using System.Threading;

namespace CostruttiProgrammazioneConcorrente
{
    class Program
    {
        static int A, B, C, D, E, F, G, H;
        static void Main(string[] args)
        {
            Thread t1 = new Thread(Proc1);
            Thread t2 = new Thread(Proc2);
            t1.Start();
            t2.Start();
            A = 10;
            D = A + 5;
            Console.WriteLine("D: {0}", D);
            t1.Join(); // Il main thread attende prima la fine di t1...
            G = E - D;
            Console.WriteLine("G: {0}", G);
            t2.Join(); // ... e poi quella di t2.
            H = F + G;
            Console.WriteLine("H: {0}", H);
        }

        static void Proc1()
        {
            B = 20;
            E = B * 2;
            Console.WriteLine("E: {0}", E);
        }
        static void Proc2()
        {
            C = 30;
            F = C * C;
            Console.WriteLine("F: {0}", F);
        }
    }
}

```

### Costrutto join(count)

Riferimenti: *J. Albahari, Threading in C#* \- Part 2: Basic Synchronization -- CountdownEvent

Il costrutto *join(count)* è un particolare tipo di join che permette di attendere un numero prefissato di processi/thread mediante l'utilizzo di un contatore speciale.

In C# il costrutto *join(count)* è realizzabile utilizzando uno speciale contatore costituito da un'istanza della classe *CountdownEvent*: esso è inizialmente impostato a un valore pari al numero di specificato da *count* ed è decrementato di un'unità ogni volta che uno dei thread da sincronizzare termina il proprio compito. Per decrementare il contatore si usa il metodo *Signal*.

#### Costrutto join(count): esempio 1

Scrivere, utilizzando il costrutto *join(count)*, un algoritmo concorrente per il seguente diagramma delle precedenze.

![alt text](./concurrent-programming/image8.png)

Pseudocodifica:

![alt text](./concurrent-programming/image9.png)

Codifica in C# con i thread:

```cs
using System;
using System.Threading;

namespace JoinCountDemo
{
    class Program
    {
        static int A, B, C, D, E, F, Z;
        static CountdownEvent L = new CountdownEvent(3);
        static void Main(string[] args)
        {
            A = 10;
            Thread t = new Thread(Proc1);
            t.Start();
            D = A * 4;
            Console.WriteLine("D: {0}", D);
            L.Signal(); // Decrementa il contatore L
            L.Wait(); // Attende che il contatore L sia uguale a zero
            Z = D + E + F;
            Console.WriteLine("Z: {0}", Z);
        }
        static void Proc1()
        {
            Console.WriteLine("Procedura n. 1");
            B = A + 20;
            Thread t = new Thread(Proc2);
            t.Start();
            E = B - 5;
            Console.WriteLine("E: {0}", E);
            L.Signal(); // Decrementa il contatore L
        }
        static void Proc2()
        {
            Console.WriteLine("Procedura n. 2");
            C = A + B;
            F = C + 6;
            Console.WriteLine("F: {0}", F);
            L.Signal(); // Decrementa il contatore L
        }
    }
}

```

### Costrutto cobegin/coend

Il costrutto cobegin si ha quando si fanno partire in parallelo più flussi di esecuzione mediante thread/processi.

Il costrutto coend si ha quando si attende la fine di più flussi di esecuzione paralleli

In C# il costrutto cobegin/coend si può realizzare per mezzo della classe Parallel.

#### Costrutto cobegin/coend: esempio 1

Scrivere un programma concorrente a partire dal seguente diagramma, usando il costrutto *cobegin/coend*

![alt text](./concurrent-programming/image10.png)

Pseudocodifica:

![alt text](./concurrent-programming/image11.png)

Codifica in C#:

```cs
using System;
using System.Threading.Tasks;

namespace ParallelDemo
{
    class Program
    {
        static int A, B, C, D, E, F, G, Z;
        static void Main(string[] args)
        {
            A = 1;
            // Esecuzione parallela delle tre procedure, equivalente a:
            // cobegin
            // Proc1();
            // Proc2();
            // Proc3();
            // coend
            // Il metodo Invoke esegue le tre procedure, normalmente in parallelo.
            // Il main thread attende il completamento di tutte le procedure indicate.
            Parallel.Invoke(Proc1, Proc2, Proc3);
            Z = E + F + G;
            Console.WriteLine("Z: {0}", Z);
        }

        static void Proc1()
        {
            B = 2;
            E = A + B;
            Console.WriteLine("E: {0}", E);
        }
        static void Proc2()
        {
            C = 3;
            F = A + 3 * C;
            Console.WriteLine("F: {0}", F);
        }
        static void Proc3()
        {
            D = 4;
            G = 2 * D - A;
            Console.WriteLine("G: {0}", G);
        }
    }
}

```
