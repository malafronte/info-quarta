---
title: "TPL"
description: "Task Parallel Library: programmazione parallela e asincrona basata su task"

sidebar:
  order: 40

---
<style>{
  img {display: block; margin: 0 auto;}
}</style>

## Task Parallel Library (TPL)

[https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl)

La libreria Task Parallel Library (TPL) è un insieme di tipi e API pubblici negli spazi dei nomi [System.Threading](https://docs.microsoft.com/en-us/dotnet/api/system.threading) e [System.Threading.Tasks](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks). Lo scopo di TPL è rendere gli sviluppatori più produttivi semplificando l'aggiunta di parallelismo e concorrenza alle applicazioni. La libreria TPL adatta dinamicamente il grado di concorrenza per sfruttare efficacemente tutti i processori disponibili. Inoltre gestisce il partizionamento del lavoro, la schedulazione dei thread nel [ThreadPool](https://docs.microsoft.com/en-us/dotnet/api/system.threading.threadpool), il supporto per l'annullamento, la gestione dello stato e altri dettagli di basso livello. Usando TPL è possibile ottimizzare le prestazioni concentrandosi sulle operazioni applicative rilevanti.

A partire da .NET Framework 4, TPL è la soluzione consigliata per scrivere codice multithreading e parallelo. Tuttavia non tutto il codice è adatto alla parallelizzazione; ad esempio, se un ciclo esegue poco lavoro per iterazione o non esegue molte iterazioni, l'overhead della parallelizzazione può rallentare l'esecuzione. La parallelizzazione introduce anche complessità (blocchi, deadlock, race condition): avere una comprensione di base di questi concetti aiuta a usare TPL efficacemente.

## Task in C#

Un Task è uno degli elementi centrali del pattern asincrono basato su task in .NET. Un oggetto Task tipicamente esegue in modo asincrono su un thread del thread pool invece che sincronicamente sul thread principale dell'applicazione. Come visto nel capitolo precedente, possiamo spostare il lavoro su thread del pool usando QueueUserWorkItem, ma quel metodo ha limiti: non consente di sapere facilmente quando l'operazione è terminata né di ottenere un valore di ritorno. Un Task è utile perché può indicare se il lavoro è completato e può restituire un risultato. Un Task rappresenta un'operazione di lavoro da eseguire.

I Task forniscono strumenti avanzati per gestire operazioni asincrone o parallele offrendo, fra l'altro:

- la possibilità di cancellare un'operazione in corso
- il ritorno di un valore risultante dall'operazione
- gestione semplice delle eccezioni
- costrutti di alto livello come cicli paralleli
- continuazioni dei task

I Task possono rendere l'applicazione più reattiva: se il thread dell'interfaccia delega il lavoro a un thread del pool, può continuare a elaborare eventi utente. I Task permettono anche di parallelizzare operazioni CPU-bound su più processori.

### C# Task: Programmazione asincrona e/o parallela basata su attività

[https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)

La libreria TPL si basa sul concetto di attività (task), che rappresenta un'operazione asincrona. In qualche modo un task è analogo a un thread o a un elemento di lavoro del `ThreadPool`, ma a un livello di astrazione più elevato. Per "parallelismo delle attività" si intende l'esecuzione contemporanea di una o più attività indipendenti. I vantaggi principali delle attività sono:

- Leggerezza a livello di sistema: le attività vengono accodate nel `ThreadPool`, che dispone di algoritmi migliorati per determinare e adattare il numero di thread, bilanciando il carico e rendendo le attività relativamente leggere; è possibile crearne molte per ottenere parallelismo efficiente.
- Maggior controllo a livello applicativo: le API delle attività forniscono funzionalità di attesa, annullamento, continuazioni, gestione delle eccezioni, stato dettagliato e pianificazione personalizzata.

Per questi motivi, TPL è l'API preferita in .NET per codice multithreading, asincrono e parallelo.

Il metodo [Parallel.Invoke](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallel.invoke) consente di eseguire simultaneamente più azioni; si passano delegati `Action`, spesso come espressioni lambda. Esempio:

```cs
Parallel.Invoke(() => DoSomeWork(), () => DoSomeOtherWork());
```

Un'attività senza valore di ritorno è rappresentata da `Task`. Un'attività che restituisce un valore è `Task<`TResult`>` che eredita da `Task`.

L'oggetto `Task` gestisce i dettagli dell'infrastruttura e mette a disposizione metodi e proprietà (es. `Status`) per interrogare lo stato dell'attività (avviata, completata, annullata, faulted). Lo stato è rappresentato dall'enumerazione `TaskStatus`.

Quando si crea un task si assegna un delegato che incapsula il codice da eseguire: può essere un metodo nominato, un metodo anonimo o una lambda. Spesso si usa `Task.Wait` per assicurarsi che il task sia completato prima che termini l'applicazione console.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskIntro
{
    class Program
    {
        static void Main(string[] args)
        {
            Thread.CurrentThread.Name = "Main";

            // Create a task and supply a user delegate by using a lambda expression. 
            Task taskA = new Task(() => Console.WriteLine("Hello from taskA."));
            // Start the task.
            taskA.Start();

            // Output a message from the calling thread.
            Console.WriteLine("Hello from thread '{0}'.",
                              Thread.CurrentThread.Name);
            taskA.Wait();

        }
    }
}
// The example displays output like the following:
//       Hello from thread 'Main'.
//       Hello from taskA.
```

È possibile usare `Task.Run` per creare e avviare un task in un'unica operazione; Run usa lo scheduler predefinito e rappresenta il modo preferito quando non serve un controllo avanzato sulla creazione/schedulazione.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskRunDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            Thread.CurrentThread.Name = "Main";

            // Define and run the task.
            Task taskA = Task.Run(() => Console.WriteLine("Hello from taskA."));

            // Output a message from the calling thread.
            Console.WriteLine("Hello from thread '{0}'.",
                                Thread.CurrentThread.Name);
            taskA.Wait();

        }
    }
}
// The example displays output like the following:
//       Hello from thread 'Main'.
//       Hello from taskA.

```

`TaskFactory.StartNew` è un'altra opzione per creare e avviare un task in un'unica operazione quando servono opzioni avanzate o uno scheduler personalizzato, oppure per passare uno stato aggiuntivo accessibile tramite Task.AsyncState.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskWithCustomData
{
    class CustomData
    {
        public long CreationTime;
        public int Name;
        public int ThreadNum;
    }

    class Program
    {
        public static void Main()
        {
            Task[] taskArray = new Task[10];
            for (int i = 0; i < taskArray.Length; i++)
            {
                taskArray[i] = Task.Factory.StartNew((object obj) =>
                {
                    CustomData data = obj as CustomData;
                    if (data == null)
                        return;

                    data.ThreadNum = Thread.CurrentThread.ManagedThreadId;
                },new CustomData() { Name = i, CreationTime = DateTime.Now.Ticks });
            }
            Task.WaitAll(taskArray);
            foreach (var task in taskArray)
            {
                //AsyncState restituisce l'oggetto che è stato passato quando il Task è stato creato, oppure null se non è stato passato nulla
                var data = task.AsyncState as CustomData;
                if (data != null)
                    Console.WriteLine($"Task Name = {data.Name}, Task Id = {task.Id}, Task status = {task.Status},  created at {data.CreationTime}, ran on Thread Id = {data.ThreadNum}.");
            }
        }

    }
}
// The example displays output like the following:
// Task Name = 0, Task Id = 1, Task status = RanToCompletion,  created at 637737183135068576, ran on Thread Id = 5.
// Task Name = 1, Task Id = 2, Task status = RanToCompletion,  created at 637737183135317927, ran on Thread Id = 6.
// Task Name = 2, Task Id = 3, Task status = RanToCompletion,  created at 637737183135345356, ran on Thread Id = 4.
// Task Name = 3, Task Id = 4, Task status = RanToCompletion,  created at 637737183135369204, ran on Thread Id = 7.
// Task Name = 4, Task Id = 5, Task status = RanToCompletion,  created at 637737183135391197, ran on Thread Id = 11.
// Task Name = 5, Task Id = 6, Task status = RanToCompletion,  created at 637737183135415846, ran on Thread Id = 13.
// Task Name = 6, Task Id = 7, Task status = RanToCompletion,  created at 637737183135794745, ran on Thread Id = 8.
// Task Name = 7, Task Id = 8, Task status = RanToCompletion,  created at 637737183135879399, ran on Thread Id = 10.
// Task Name = 8, Task Id = 9, Task status = RanToCompletion,  created at 637737183135879724, ran on Thread Id = 12.
// Task Name = 9, Task Id = 10, Task status = RanToCompletion,  created at 637737183135879799, ran on Thread Id = 9.

```

Ogni task ha un Id univoco accessibile tramite Task.Id.

:::caution
Quando si usa una lambda in un ciclo, è importante prestare attenzione alle variabili catturate: la lambda può acquisire il valore finale della variabile di ciclo invece del valore per ogni iterazione; la soluzione è passare i dati necessari come stato al task invece di fare affidamento sulla variabile di ciclo.
:::

### Modello di esecuzione di un Task

Il delegato di un task viene eseguito in un thread separato. In macchine single-core ciò può implicare molti context switch; su macchine multicore i task possono essere distribuiti sui core disponibili e offrire vantaggio rispetto all'esecuzione sequenziale.

Nota di utilizzo: chiamare `t.Wait();` è equivalente a chiamare `Join` su un thread: il chiamante aspetta che il task termini.

### Task C# che restituisce un valore

.NET dispone di `Task<TResult>` per task che restituiscono valori. L'accesso alla proprietà Result forza l'attesa fino al completamento del task (comportamento equivalente a `Join`/`Wait`).

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskReturnsValue01
{
    class Program
    {
        static void Main(string[] args)
        {
            //qui int è il tipo restituito dal Task
            //si noti che in questo caso si è usato il costrutto Task.Run(lambda) e non new Task(lambda)
             Task<int> t = Task.Run(() =>
            {
                return 32;
            });

            //qui leggiamo il valore restituito dal Task
            //è come fare una Join sul thread del Task oppure come invocare la Wait sul Task
            Console.WriteLine(t.Result); 

            Console.WriteLine();
            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
    }
}
```

Leggere Result su un Task blocca il thread fino al termine del task.

### Aggiunta di continuazioni

Nella programmazione asincrona è comune che, dopo il completamento di un'operazione, venga eseguita una seconda operazione che riceve i dati prodotti. Tradizionalmente ciò si realizzava con callback; in TPL si usano le continuazioni tramite Task.ContinueWith. Le continuazioni permettono, fra l'altro:

- passare dati dall'attività precedente alla continuazione;
- specificare condizioni per l'esecuzione della continuazione;
- annullare una continuazione;
- suggerire come schedulare la continuazione;
- invocare più continuazioni da una stessa attività precedente;
- concatenare continuazioni arbitrariamente;
- gestire eccezioni dell'attività precedente.

Per creare una continuazione chiamare `Task.ContinueWith`. Esempio base:

```cs
using System;
using System.Threading.Tasks;

namespace ContinuationDemo01
{
    class Program
    {
        static void Main(string[] args)
        {
            // Execute the antecedent.
            Task<DayOfWeek> taskA = Task.Run(() => DateTime.Today.DayOfWeek);

            // Execute the continuation when the antecedent finishes.
             taskA.ContinueWith(antecedent => Console.WriteLine("Today is {0}.", antecedent.Result));
            Console.ReadLine();
        }
    }
}
```

Questo metodo è simile a chiamare un metodo di callback al termine di un'operazione. Esempio:

```cs
using System;
using System.Threading.Tasks;

namespace TaskContinuation01
{
    class Program
    {
        static void Main(string[] args)
        {
            Task<int> t = Task.Run(() =>
            {
                return 32;
            }).ContinueWith((i) =>
            {
                return i.Result * 2;
            });

            t.ContinueWith((i) =>
            {
                Console.WriteLine(i.Result);
            });

            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
    }
}
```

È possibile creare una continuazione che verrà eseguita al termine di una o tutte le attività di un gruppo di attività. Per eseguire una continuazione al termine di tutte le attività precedenti, chiamare il metodo statico [Task.WhenAll](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall) o il metodo [TaskFactory.ContinueWhenAll](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskfactory.continuewhenall) dell'istanza. Per eseguire una continuazione al termine di almeno una delle attività precedenti, chiamare il metodo statico [Task.WhenAny](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenany) o il metodo [TaskFactory.ContinueWhenAny](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskfactory.continuewhenany) dell'istanza.

Nell'esempio seguente viene chiamato il metodo [Task.WhenAll(IEnumerable&lt;Task&gt;)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall#System_Threading_Tasks_Task_WhenAll_System_Collections_Generic_IEnumerable_System_Threading_Tasks_Task__) per creare un'attività di continuazione che riflette il risultato delle 10 attività precedenti. Ogni attività precedente eleva al quadrato un valore di indice compreso tra uno e 10. Se le attività precedenti vengono completate correttamente (ovvero la relativa proprietà [Task.Status](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.status) è [TaskStatus.RanToCompletion](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskstatus#System_Threading_Tasks_TaskStatus_RanToCompletion)), la proprietà [Task&lt;TResult&gt;.Result](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result) della continuazione è una vettore dei valori [Task&lt;TResult&gt;.Result](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result) restituiti da ogni attività precedente. L'esempio somma tali valori per calcolare la somma dei quadrati per tutti i numeri compresi tra uno e 10.

```cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContinuationAllDemo01
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Task<int>> tasks = new List<Task<int>>();
            for (int ctr = 1; ctr <= 10; ctr++)
            {
                int baseValue = ctr;
                tasks.Add(Task.Factory.StartNew((b) => {
                    int i = (int)b;
                    return i * i;
                }, baseValue));
            }
            //continuation è di tipo Task<int[]>
            var continuation = Task.WhenAll(tasks);

            long sum = 0;
            for (int ctr = 0; ctr <= continuation.Result.Length - 1; ctr++)
            {
                Console.Write($"{continuation.Result[ctr]}{(ctr == continuation.Result.Length - 1 ? " = " : " + ")}");
                sum += continuation.Result[ctr];
            }
            Console.WriteLine(sum);
           
        }
    }
}
```

### Pianificazione di continuazioni diverse

`ContinueWith` offre overload per configurare quando la continuazione verrà eseguita (es. solo in caso di fault, solo se cancellata, solo se completata con successo), permettendo di definire comportamenti distinti per ciascun esito.

```cs
using System;
using System.Threading.Tasks;

namespace ContinuationWithExceptionHandling01
{
    class Program
    {
        static void Main(string[] args)
        {
            var t = Task.Run(() => {
                DateTime dat = DateTime.Now;
                if (dat == DateTime.MinValue)
                    throw new ArgumentException("The clock is not working.");

                if (dat.Hour > 17)
                    return "evening";
                else if (dat.Hour > 12)
                    return "afternoon";
                else
                    return "morning";
            });
            var c = t.ContinueWith((antecedent) => {
                if (antecedent.Status == TaskStatus.RanToCompletion)
                {
                    Console.WriteLine("Good {0}!",
                                      antecedent.Result);
                    Console.WriteLine("And how are you this fine {0}?",
                                   antecedent.Result);
                }
                else if (antecedent.Status == TaskStatus.Faulted)
                {
                    Console.WriteLine(t.Exception.GetBaseException().Message);
                }
            });
            c.Wait();
        }
    }
}
```

Altro esempio: continuazione condizionale.

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DifferentContinuationTasks
{
    class Program
    {
        static void Main(string[] args)
        {
            Task<int> t = Task.Run(() =>
            {
                //se il numero è messo a zero viene sollevata un'eccezione non gestita
                int numero = 1;
                if (numero==0) {
                    throw new Exception();
                }
                return 32;
            });
            t.ContinueWith((i) =>
            {
                Console.WriteLine("Faulted");
            }, TaskContinuationOptions.OnlyOnFaulted);
            t.ContinueWith((i) =>
            {
                Console.WriteLine("Canceled");
            },  TaskContinuationOptions.OnlyOnCanceled);

            var completedTask = t.ContinueWith((i) =>
            {
                Console.WriteLine(i.Result);
                Console.WriteLine("Completed");
            }, TaskContinuationOptions.OnlyOnRanToCompletion);

            Console.WriteLine("Press Enter to terminate!");
            Console.ReadLine();
        }
    }
}
```

Per l'esempio precedente, nel caso in cui viene sollevata un'eccezione Visual Studio blocca il programma nel punto in cui c'è l'eccezione non gestita. Se si fa partire l'applicazione direttamente dall'eseguibile il programma non si blocca e va direttamente nel continuation task che ha come impostazione `TaskContinuationOptions.OnlyOnFaulted`. Si può eventualmente andare nelle opzioni di gestione dell'eccezione di Visual Studio per modificarne il comportamento.

### Costrutti per la programmazione concorrente -- uso di Task

####  Costrutto fork/join

Gli esempi di fork/join visti nella sezione thread possono essere realizzati con TPL, usando `Task.Factory.StartNew` e `Wait/Task.WaitAll`.

```cs
using System;
using System.Threading.Tasks;

namespace CostruttiProgrammazioneConcorrenteTask
{
    class Program
    {
        static int A, B, C, D, E, F, G, H;
        static void Main(string[] args)
        {
            // Metodo classico di avvio di un nuovo task
            Task tsk1 = Task.Factory.StartNew(Proc1);
            Task tsk2 = Task.Factory.StartNew(Proc2);
           
            A = 10;
            D = A + 5;
            Console.WriteLine("D: {0}", D);
            tsk1.Wait(); // Attende il completamento del task tsk1
            G = E - D;
            Console.WriteLine("G: {0}", G);
            tsk2.Wait(); // Attende il completamento del task tsk2
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

#### Costrutto join(count)

Anche join(count) è realizzabile con `CountdownEvent` e `Task.Factory.StartNew`; il codice è analogo all'implementazione con thread.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace JoinCountDemoTask
{
    class Program
    {
        static int A, B, C, D, E, F, Z;
        static CountdownEvent L = new CountdownEvent(3);
        static void Main(string[] args)
        {
            A = 10;
            Task t = Task.Factory.StartNew(Proc1);
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
            Task t = Task.Factory.StartNew(Proc2);
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

#### Costrutto cobegin/coend

Cobegin/coend possono essere implementati con `Task` e `Task.WaitAll` o con `Parallel.Invoke`.

```cs
using System;
using System.Threading.Tasks;

namespace ParallelDemoTask
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
            Task tsk1 = Task.Factory.StartNew(Proc1);
            Task tsk2 = Task.Factory.StartNew(Proc2);
            Task tsk3 = Task.Factory.StartNew(Proc3);
            // Il main thread attende il completamento di tutti i task
            Task.WaitAll(tsk1, tsk2, tsk3);
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

Un esempio di utilizzo di Semafori con i Task:

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
                    Task.Delay(1000 + padding).Wait();

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

### Parallelismo dei dati (Task Parallel Library)

[https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library)

Con "parallelismo dei dati" si intende eseguire contemporaneamente la stessa operazione sugli elementi di una matrice o raccolta. La raccolta viene partizionata in segmenti eseguiti da thread diversi. TPL supporta il parallelismo dei dati tramite `System.Threading.Tasks.Parallel`, che fornisce cicli paralleli `Parallel.For` e `Parallel.ForEach`. La scrittura della logica è simile ai cicli sequenziali; non è necessario creare thread o gestire manualmente il lavoro di basso livello.

#### Esempi Parallel.For e Parallel.ForEach

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.IO;

namespace ParallelForDemo
{
    class Program
    {
        public static void Main()
        {
            long totalSize = 0;

            String[] args = Environment.GetCommandLineArgs();
            if (args.Length == 1)
            {
                Console.WriteLine("There are no command line arguments.");
                return;
            }
            if (!Directory.Exists(args[1]))
            {
                Console.WriteLine("The directory does not exist.");
                return;
            }

            String[] files = Directory.GetFiles(args[1]);
            Parallel.For(0, files.Length,
                         (index) => {
                             FileInfo fi = new FileInfo(files[index]);
                             long size = fi.Length;
                             Interlocked.Add(ref totalSize, size);
                         });
            Console.WriteLine("Directory '{0}':", args[1]);
            Console.WriteLine("{0:N0} files, {1:N0} bytes", files.Length, totalSize);
        }
    }
}

```

Nei cicli paralleli è possibile usare variabili partition-local per accumuli locali e poi combinare il risultato in modo thread-safe (es. `Interlocked.Add`).

```cs
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace ParallelMatricesMultiply
{
    class Program
    {
        #region Sequential_Loop
        static void MultiplyMatricesSequential(double[,] matA, double[,] matB, double[,] result)
        {
            int matACols = matA.GetLength(1);
            int matBCols = matB.GetLength(1);
            int matARows = matA.GetLength(0);

            for (int i = 0; i < matARows; i++)
            {
                for (int j = 0; j < matBCols; j++)
                {
                    double temp = 0;
                    for (int k = 0; k < matACols; k++)
                    {
                        // Accesso a matB[k, j] è lento per grandi matrici (salta righe)
                        temp += matA[i, k] * matB[k, j];
                    }
                    result[i, j] = temp;
                }
            }
        }
        #endregion

        #region Parallel_Loop_Optimized

        // Helper per trasporre la matrice.
        // Trasforma le colonne in righe per migliorare la "Cache Locality".
        static double[,] TransposeMatrixParallel(double[,] matrix)
        {
            int rows = matrix.GetLength(0);
            int cols = matrix.GetLength(1);
            double[,] result = new double[cols, rows];

            Parallel.For(0, rows, i =>
            {
                for (int j = 0; j < cols; j++)
                {
                    result[j, i] = matrix[i, j];
                }
            });

            return result;
        }

        static void MultiplyMatricesParallel(double[,] matA, double[,] matB, double[,] result)
        {
            int matACols = matA.GetLength(1);
            int matBCols = matB.GetLength(1);
            int matARows = matA.GetLength(0);

            // PASSO 1: Trasposizione
            // Costo iniziale aggiuntivo, ma guadagno massiccio durante i calcoli.
            // Ora scorrere una "colonna" di B equivale a scorrere una riga di matBTransposed.
            double[,] matBTransposed = TransposeMatrixParallel(matB);

            // PASSO 2: Moltiplicazione Parallela
            Parallel.For(0, matARows, i =>
            {
                for (int j = 0; j < matBCols; j++)
                {
                    double temp = 0;
                    for (int k = 0; k < matACols; k++)
                    {
                        // OTTIMIZZAZIONE QUI:
                        // Invece di matB[k, j], usiamo matBTransposed[j, k].
                        // Entrambi gli accessi (matA e matBTransposed) ora incrementano 'k' (l'indice destro).
                        // Questo significa che stiamo leggendo memoria contigua.
                        temp += matA[i, k] * matBTransposed[j, k];
                    }
                    result[i, j] = temp;
                }
            });
        }
        #endregion

        #region Main
        static void Main(string[] args)
        {
            // Set up matrices.
            int colCount = 1000;
            int rowCount = 1000;
            int colCount2 = 1000;

            Console.WriteLine($"Inizializzazione matrici {rowCount}x{colCount}...");
            double[,] m1 = InitializeMatrix(rowCount, colCount);
            double[,] m2 = InitializeMatrix(colCount, colCount2);
            double[,] result = new double[rowCount, colCount2];

            // --- SEQUENTIAL ---
            Console.Error.WriteLine("Executing sequential loop...");
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();

            MultiplyMatricesSequential(m1, m2, result);
            stopwatch.Stop();
            long sequentialTime = stopwatch.ElapsedMilliseconds;
            Console.Error.WriteLine("Sequential loop time in milliseconds: {0}", sequentialTime);

            // Reset timer and results matrix.
            stopwatch.Reset();
            result = new double[rowCount, colCount2];

            // Garbage Collection forzato per pulire la memoria prima del test parallelo
            GC.Collect();
            GC.WaitForPendingFinalizers();

            // --- PARALLEL (Optimized) ---
            Console.Error.WriteLine("Executing parallel loop (with Transposition)...");
            stopwatch.Start();

            // Nota: Il tempo includerà anche il tempo necessario per trasporre la matrice!
            MultiplyMatricesParallel(m1, m2, result);

            stopwatch.Stop();
            long parallelTime = stopwatch.ElapsedMilliseconds;
            Console.Error.WriteLine("Parallel loop time in milliseconds: {0}", parallelTime);

            // --- RESULTS ---
            double speedup = (double)sequentialTime / parallelTime;
            Console.WriteLine($"Speedup = {speedup:F2}; il calcolo parallelo ottimizzato è {speedup:F2} volte più veloce.");

            Console.Error.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
        #endregion

        #region Helper_Methods
        static double[,] InitializeMatrix(int rows, int cols)
        {
            double[,] matrix = new double[rows, cols];
            Random r = new Random();
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    matrix[i, j] = r.Next(100);
                }
            }
            return matrix;
        }
        #endregion
    }
}
```

### Child task attached e detached

Un child task (o nested task) è un Task creato all'interno del delegato di un altro Task (parent). Un child può essere detached o attached. Un detached child esegue indipendentemente dal parent; un attached child creato con `TaskCreationOptions.AttachedToParent` fa sì che il parent attenda il completamento dei figli e propaghi le eccezioni. Per la maggior parte degli scenari si raccomandano detached child perché relazioni meno complesse: i task creati dentro altri task sono detached per default.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var parent = Task.Factory.StartNew(() => {
         Console.WriteLine("Outer task executing.");

         var child = Task.Factory.StartNew(() => {
            Console.WriteLine("Nested task starting.");
            Thread.SpinWait(500000);
            Console.WriteLine("Nested task completing.");
         });
      });

      parent.Wait();
      Console.WriteLine("Outer has completed.");
   }
}
// The example produces output like the following:
//        Outer task executing.
//        Nested task starting.
//        Outer has completed.
//        Nested task completing.
```

Il metodo `Thread.SpinWait(500000)` serve a **simulare un carico di lavoro (o un ritardo)** mantenendo la CPU occupata.

1. Che cosa fa tecnicamente

    `Thread.SpinWait` forza il processore a eseguire un ciclo stretto (loop) per un numero specifico di iterazioni (in questo caso, 500.000).

    - **Busy Waiting:** A differenza di una pausa "classica", il thread non si "addormenta". Rimane **attivo** e continua a consumare cicli della CPU.

    - **Iterazioni, non Tempo:** Il numero `500000` non rappresenta millisecondi o secondi, ma **cicli di iterazione**. La durata reale in termini di tempo dipende dalla velocità del processore del computer su cui gira il codice.

2. Differenza tra `SpinWait` e `Sleep`

    È fondamentale distinguere questo metodo da `Thread.Sleep()`, che è molto più comune.

    | **Caratteristica** | **Thread.Sleep(x)** | **Thread.SpinWait(x)** |
    | --- |  --- |  --- |
    | **Stato della CPU** | Il thread cede la CPU ad altri processi ("riposa"). | Il thread tiene la CPU impegnata al 100% ("gira a vuoto"). |
    | **Utilizzo ideale** | Attese lunghe (es. database, download). | Attese brevissime (pochi microsecondi). |
    | **Costo** | Alto overhead (context switch). | Basso overhead (nessun context switch). |

3. Perché viene usato in questo esempio?

    In questo specifico codice, `SpinWait` viene usato per uno scopo didattico preciso: **Creare un ritardo prevedibile senza sospendere il thread.**

    L'obiettivo dell'esempio è dimostrare che il **Parent Task** (Task esterno) termina *prima* del **Child Task** (Task annidato).

    1. Il `Child Task` inizia.

    2. Esegue `SpinWait` (simula un lavoro breve).

    3. Nel frattempo, il `Parent Task` finisce la sua esecuzione perché, di default, i task annidati sono **indipendenti** (Detached).

    Se si usasse `Thread.Sleep`, il sistema operativo potrebbe decidere di mettere in pausa il thread del Child e dare priorità al Parent, rendendo l'ordine di output meno deterministico o semplicemente "rallentando" l'esecuzione in modo diverso. `SpinWait` assicura che quel thread stia "lavorando" per quel breve lasso di tempo, rendendo evidente che il Parent non lo sta aspettando.

4. Sintesi dell'output

    Il codice produce quell'output perché il `parent.Wait()` aspetta solo il task genitore. Poiché il task figlio non è "attaccato" (`AttachedToParent`), il genitore finisce, stampa "Outer has completed", e solo dopo il figlio finisce il suo "SpinWait" e stampa "Nested task completing".

Se il child task è un oggetto [Task&lt;TResult&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1) invece di un [Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task), è possibile assicurarsi che il parent attenda il completamento del child accedendo alla proprietà [Task&lt;TResult&gt;.Result](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result) del child anche se è un detached child task. La proprietà [Result](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result) blocca fino al completamento del task, come nell'esempio seguente.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

class Example
{
   static void Main()
   {
      var outer = Task<int>.Factory.StartNew(() => {
            Console.WriteLine("Outer task executing.");

            var nested = Task<int>.Factory.StartNew(() => {
                  Console.WriteLine("Nested task starting.");
                  Thread.SpinWait(5000000);
                  Console.WriteLine("Nested task completing.");
                  return 42;
            });

            // Parent will wait for this detached child.
            return nested.Result;
      });

      Console.WriteLine("Outer has returned {0}.", outer.Result);
   }
}
// The example displays the following output:
//       Outer task executing.
//       Nested task starting.
//       Nested task completing.
//       Outer has returned 42.
```

#### Attached child tasks

A differenza dei detached child tasks, gli attached child tasks sono strettamente sincronizzati con il parent. È possibile modificare il detached child task nell'esempio precedente in un attached child task usando l'opzione [TaskCreationOptions.AttachedToParent](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcreationoptions#System_Threading_Tasks_TaskCreationOptions_AttachedToParent) nella dichiarazione di creazione del task, come mostrato nel seguente esempio. In questo codice, l'attività figlia allegata viene completata prima del suo genitore. Di conseguenza, l'output dell'esempio è lo stesso ogni volta che si esegue il codice.

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var parent = Task.Factory.StartNew(() => {
            Console.WriteLine("Parent task executing.");
            var child = Task.Factory.StartNew(() => {
                  Console.WriteLine("Attached child starting.");
                  Thread.SpinWait(5000000);
                  Console.WriteLine("Attached child completing.");
            }, TaskCreationOptions.AttachedToParent);
      });
      parent.Wait();
      Console.WriteLine("Parent has completed.");
   }
}
// The example displays the following output:
//       Parent task executing.
//       Attached child starting.
//       Attached child completing.
//       Parent has completed.
```

È possibile utilizzare attached child tasks per creare grafi di operazioni asincrone strettamente sincronizzate.

Tuttavia, un'attività figlia può attaccarsi al suo genitore solo se quest'ultimo non lo proibisce. I task genitore possono esplicitamente impedire l'attacco di task figli a loro specificando l'opzione [TaskCreationOptions.DenyChildAttach](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcreationoptions#System_Threading_Tasks_TaskCreationOptions_DenyChildAttach) nel costruttore della classe del task genitore o nel metodo [TaskFactory.StartNew](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskfactory.startnew). I task genitore impediscono implicitamente l'attacco di task figli se vengono creati chiamando il metodo [Task.Run](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.run). L'esempio seguente illustra questo concetto. È identico al precedente, tranne per il fatto che il task genitore è creato chiamando il metodo [Task.Run(Action)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.run#System_Threading_Tasks_Task_Run_System_Action_) invece del metodo [TaskFactory.StartNew(Action)](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskfactory.startnew#System_Threading_Tasks_TaskFactory_StartNew_System_Action_). Poiché il task figlio non può attaccarsi al suo genitore, l'output dell'esempio è imprevedibile. Questo esempio è funzionalmente equivalente al primo esempio nella sezione "Detached child tasks".

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var parent = Task.Run(() => {
            Console.WriteLine("Parent task executing.");
            var child = Task.Factory.StartNew(() => {
                  Console.WriteLine("Child starting.");
                  Thread.SpinWait(5000000);
                  Console.WriteLine("Child completing.");
            }, TaskCreationOptions.AttachedToParent);
      });
      parent.Wait();
      Console.WriteLine("Parent has completed.");
   }
}
// The example displays output like the following:
//       Parent task executing
//       Parent has completed.
//       Attached child starting.
```

### Cancellazione di un'attività

[https://docs.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads](https://docs.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads)

A partire da .NET Framework 4 si usa un modello unificato per l'annullamento cooperativo basato su `CancellationTokenSource` e `CancellationToken`. Chi crea il token chiede l'annullamento; le operazioni che ricevono il token devono cooperare per osservare la richiesta e terminare in modo appropriato.

Linee guida generali:

- creare un'istanza di un oggetto [CancellationTokenSource](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource), che gestisce e invia la notifica di annullamento ai singoli token di annullamento.
- passare il token restituito dalla proprietà [CancellationTokenSource.Token](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource.token) a ogni attività o thread in attesa di annullamento.
- specificare un meccanismo per ogni attività o thread per rispondere all'annullamento.
- chiamare il metodo [CancellationTokenSource.Cancel](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource.cancel) per fornire la notifica di annullamento.

#### Esempi di cancellazione

```cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskCancellationDemo
{
    class Program
    {
//usare async Task al posto di void se si usa await task al posto di task.Wait()
        static async Task Main(string[] args)
        {
            var tokenSource = new CancellationTokenSource();
            CancellationToken ct = tokenSource.Token;

            var task = Task.Run(() =>
            {
                // Were we already canceled?
                ct.ThrowIfCancellationRequested();

                bool moreToDo = true;
                while (moreToDo)
                {
                    // Poll on this property if you have to do
                    // other cleanup before throwing.
                    if (ct.IsCancellationRequested)
                    {
                        // Clean up here, then...
                        ct.ThrowIfCancellationRequested();
                    }

                }
            }, ct); // Pass same token to Task.Run.
            Thread.Sleep(1000);
            tokenSource.Cancel();

            // Just continue on this thread, or await with try-catch:
            try
            {
                //https://stackoverflow.com/questions/13140523/await-vs-task-wait-deadlock
                //https://stackoverflow.com/questions/7340309/throw-exception-inside-a-task-await-vs-wait
                //task.Wait();
                await task;
            }
            catch (OperationCanceledException e)
            {
                Console.WriteLine($"{nameof(OperationCanceledException)} thrown with message: {e.Message}");
            }
            catch (AggregateException e)
            {
                Console.WriteLine($"{nameof(AggregateException)} thrown with message: {e.Message}");
            }
            finally
            {
                tokenSource.Dispose();
            }
        }


    }
}
```

:::note
Lanciare l'esempio precedente con CTRL+F5 (Avvia senza Debug), oppure se si lancia con F5 (Start Debug), Visual Studio Code si ferma sull'eccezione `OperationCanceledException` a meno che non si modifichi la configurazione di default di Visual Studio Code per le eccezioni.
:::

#### Cancellare un task e i suoi figli

È possibile creare task cancellabili passando il token al delegato e al metodo `Task.Run`; il delegato deve rilevare la richiesta e lanciare `OperationCanceledException` se opportuno. Se si usa `Wait` o `WhenAll` su task cancellati, è necessario gestire le eccezioni in try/catch (`AggregateException/OperationCanceledException`).

```cs
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace TaskAndSonsCancellationDemo
{
    public class Program
    {
        public static async Task Main()
        {
            var tokenSource = new CancellationTokenSource();
            var token = tokenSource.Token;

            // Store references to the tasks so that we can wait on them and
            // observe their status after cancellation.
            Task t;
            //https://docs.microsoft.com/en-us/dotnet/api/system.collections.concurrent.concurrentbag-1 
            var tasks = new ConcurrentBag<Task>();

            Console.WriteLine("Press any key to begin tasks...");
            Console.ReadKey(true);
            Console.WriteLine("To terminate the example, press 'c' to cancel and exit...");
            Console.WriteLine();

            // Request cancellation of a single task when the token source is canceled.
            // Pass the token to the user delegate, and optionally to the task instance.
            t = Task.Run(() => DoSomeWork(1, token), token);
            Console.WriteLine("Task {0} executing", t.Id);
            tasks.Add(t);

            // Request cancellation of a task and its children. Note the token is passed
            // to (1) the user delegate and (2) as the second argument to Task.Run, so
            // that the task instance can correctly handle the OperationCanceledException.
            t = Task.Run(() =>
            {
                // Create some cancelable child tasks.
                Task tc;
                for (int i = 3; i <= 10; i++)
                {
                    // For each child task, pass the same token
                    // to each user delegate and to Task.Run.
                    tc = Task.Run(() => DoSomeWork(i, token), token);
                    Console.WriteLine("Task {0} executing", tc.Id);
                    tasks.Add(tc);
                    // Pass the same token again to do work on the parent task.
                    // All will be signaled by the call to tokenSource.Cancel below.
                    //DoSomeWork(2, token);
                }
            }, token);

            Console.WriteLine("Task {0} executing", t.Id);
            tasks.Add(t);

            // Request cancellation from the UI thread. 
            char ch = Console.ReadKey().KeyChar;
            if (ch == 'c' || ch == 'C')
            {
                tokenSource.Cancel();
                Console.WriteLine("\nTask cancellation requested.");

                // Optional: Observe the change in the Status property on the task. 
                // It is not necessary to wait on tasks that have canceled. However, 
                // if you do wait, you must enclose the call in a try/catch block to 
                // catch the TaskCanceledExceptions that are thrown. If you do  
                // not wait, no exception is thrown if the token that was passed to the  
                // Task.Run method is the same token that requested the cancellation.
            }

            try
            {
                await Task.WhenAll(tasks.ToArray());
            }
            //in alternativa all’uso di await si può usare una Wait, ma in tal caso bisogna gestire l’AggregateException
            //try
            //{
            //    Task myTask = Task.WhenAll(tasks.ToArray());
            //    myTask.Wait();
            //}
            //catch (AggregateException ae)
            //{
            //    foreach (var e in ae.Flatten().InnerExceptions)
            //    {
            //        if (e is TaskCanceledException)
            //        {
            //            Console.WriteLine($"\n{nameof(TaskCanceledException)} thrown\n");
            //        }
            //        else if (e is CustomException)
            //        {
            //            Console.WriteLine($"\n{nameof(CustomException)} thrown\n");
            //        }
            //        else if (e is CustomSonException)
            //        {
            //            Console.WriteLine($"\n{nameof(CustomSonException)} thrown\n");
            //        }
            //        else
            //        {
            //            throw;
            //        }
            //    }
            //}
            catch (OperationCanceledException)
            {
                Console.WriteLine($"\n{nameof(OperationCanceledException)} thrown\n");
            }
            finally
            {
                tokenSource.Dispose();
            }

            // Display status of all tasks. 
            foreach (var task in tasks)
                Console.WriteLine("Task {0} status is now {1}", task.Id, task.Status);
        }

        static void DoSomeWork(int taskNum, CancellationToken ct)
        {
            // Was cancellation already requested?
            if (ct.IsCancellationRequested)
            {
                Console.WriteLine("Task {0} was cancelled before it got started.",
                                  taskNum);
                ct.ThrowIfCancellationRequested();
            }

            int maxIterations = 100;

            // NOTE!!! A "TaskCanceledException was unhandled
            // by user code" error will be raised here if "Just My Code"
            // is enabled on your computer. On Express editions JMC is
            // enabled and cannot be disabled. The exception is benign.
            // Just press F5 to continue executing your code.
            for (int i = 0; i <= maxIterations; i++)
            {
                // Do a bit of work. Not too much.
                var sw = new SpinWait();
                for (int j = 0; j <= 100; j++)
                    //https://stackoverflow.com/questions/1091135/whats-the-purpose-of-thread-spinwait-method
                    sw.SpinOnce();

                if (ct.IsCancellationRequested)
                {
                    Console.WriteLine("Task {0} cancelled", taskNum);
                    ct.ThrowIfCancellationRequested();
                }
            }
        }
    }

}
// The example displays output like the following:
//       Press any key to begin tasks...
//    To terminate the example, press 'c' to cancel and exit...
//    
//    Task 1 executing
//    Task 2 executing
//    Task 3 executing
//    Task 4 executing
//    Task 5 executing
//    Task 6 executing
//    Task 7 executing
//    Task 8 executing
//    c
//    Task cancellation requested.
//    Task 2 cancelled
//    Task 7 cancelled
//    
//    OperationCanceledException thrown
//    
//    Task 2 status is now Canceled
//    Task 1 status is now RanToCompletion
//    Task 8 status is now Canceled
//    Task 7 status is now Canceled
//    Task 6 status is now RanToCompletion
//    Task 5 status is now RanToCompletion
//    Task 4 status is now RanToCompletion
//    Task 3 status is now RanToCompletion
```

:::note
**Quando "Just My Code" è abilitato, Visual Studio in alcuni casi si interrompe sulla riga che genera l'eccezione e visualizza un messaggio di errore che indica "eccezione non gestita dal codice utente."** **Questo errore è benigno. È possibile premere F5 per continuare e vedere il comportamento di gestione delle eccezioni dimostrato in questi esempi**. Per evitare che Visual Studio si fermi al primo errore, è sufficiente deselezionare la casella **Enable Just My Code** sotto **Tools, Options, Debugging, General**.
:::

#### Attached child tasks e `AggregateException` annidate

Se un task ha un attached child task che genera un'eccezione, tale eccezione viene incapsulata in un'`AggregateException` prima di essere propagata al task genitore, che a sua volta la incapsula in una propria `AggregateException` prima di propagarsi al chiamante. In questi casi, la proprietà InnerExceptions dell'eccezione `AggregateException` catturata contiene una o più istanze di `AggregateException`, non le eccezioni originali. Per evitare di dover iterare su `AggregateException` annidate, è possibile utilizzare il metodo `Flatten` per rimuovere tutte le `AggregateException` annidate, in modo che la proprietà InnerExceptions contenga le eccezioni originali.

```cs
using System;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var task1 = Task.Run(() => {
                       var nested1 = Task.Run(() => {
                                          throw new CustomException("Attached child task faulted.");
                                     });

          // Here the exception will be escalated back to the calling thread.
          // We could use try/catch here to prevent that.
          nested1.Wait();
      });

      try {
         task1.Wait();
      }
      catch (AggregateException ae) {
         foreach (var e in ae.Flatten().InnerExceptions) {
            if (e is CustomException) {
               Console.WriteLine(e.Message);
            }
            else {
               throw;
            }
         }
      }
   }
}

public class CustomException : Exception
{
   public CustomException(String message) : base(message)
   {}
}
// The example displays the following output:
//    Attached child task faulted.
```

Altro esempio:

```cs
using System;
using System.Threading.Tasks;
namespace TaskExceptionsDemos
{
    internal class Program
    {
        static void Main(string[] args)
        {
            
            var task1 = Task.Factory.StartNew(() => { 
                var childTask1 = Task.Factory.StartNew(()=> { throw new CustomSonException("This son exception is expected!"); }, TaskCreationOptions.AttachedToParent);
                throw new CustomException("This exception is expected!");
            });

            try
            {
                task1.Wait();
            }
            catch (AggregateException ae)
            {
                foreach (var e in ae.Flatten().InnerExceptions)
                {
                    if (e is TaskCanceledException)
                    {
                        Console.WriteLine($"{nameof(TaskCanceledException)} thrown");
                        Console.WriteLine(e.Message);
                    }
                    else if (e is CustomException)
                    {
                        Console.WriteLine($"{nameof(CustomException)} thrown");
                        Console.WriteLine(e.Message);
                    }
                    else if (e is CustomSonException)
                    {
                        Console.WriteLine($"{nameof(CustomSonException)} thrown");
                        Console.WriteLine(e.Message);
                    }
                    else
                    {
                        throw;
                    }
                }
            }

        }
    }

  
    internal class CustomSonException : Exception
    {
        
        public CustomSonException(string? message) : base(message)
        {
        }

       
    }

    internal class CustomException : Exception
    {


        public CustomException(string? message) : base(message)
        {
        }

    }
}
```

#### Eccezioni da detached child tasks

Per default, i task figli sono creati come detached. Le eccezioni generate da task detached devono essere gestite o rilanciate nel task genitore immediato; non vengono propagate al chiamante allo stesso modo delle eccezioni generate da task attached. Il task genitore può rilanciare manualmente un'eccezione da un task detached per far sì che venga incapsulata in un'`AggregateException` e propagata al chiamante.

```cs
using System;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var task1 = Task.Run(() => {
                       var nested1 = Task.Run(() => {
                                          throw new CustomException("Detached child task faulted.");
                                     });

          // Here the exception will be escalated back to the calling thread.
          // We could use try/catch here to prevent that.
          nested1.Wait();
      });

      try {
         task1.Wait();
      }
      catch (AggregateException ae) {
         foreach (var e in ae.Flatten().InnerExceptions) {
            if (e is CustomException) {
               Console.WriteLine(e.Message);
            }
         }
      }
   }
}

public class CustomException : Exception
{
   public CustomException(String message) : base(message)
   {}
}
// The example displays the following output:
//    Detached child task faulted.
```
