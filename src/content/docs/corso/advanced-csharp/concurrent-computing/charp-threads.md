---
title: "C# Threads"
description: "Creazione di un thread. Ciclo di vita di un thread. Concetto di Thread Pool. Problemi comuni alla gestione di più thread. Concetti di race condition e sezione critica. Stati transienti e interferenze"
sidebar:
  order: 20

---
<style>
img {display: block; margin: 0 auto;}
</style>

In queste note si fa riferimento al [threading gestito dal .NET CLR](https://docs.microsoft.com/en-us/dotnet/standard/threading) e alle [API per la programmazione parallela di .NET](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming).  

È possibile utilizzare i thread nei seguenti casi:  

* **Scalabilità (essere paralleli)** - Se si hanno operazioni CPU-bound di lunga durata, per esempio verificare se un numero di 80 cifre è primo, è possibile scalare l'operazione parallelizzandola su più thread.
* **Reattività** - Si può mantenere l'applicazione client reattiva spostando operazioni lunghe fuori dal thread principale (ad esempio operazioni CPU-bound) e si ottiene anche il vantaggio di poter annullare il task.
* **Sfruttare tecniche asincrone** - Se si hanno operazioni I/O-bound come la lettura di contenuti web che possono richiedere molto tempo, si può usare un altro thread per attendere l'operazione mentre si svolgono altre attività e mantenere l'interfaccia reattiva. Tuttavia, C# fornisce la sintassi async/await per questo tipo di operazioni asincrone.

Inoltre, essere asincrono non significa essere parallelo: serve solo a mantenere l'applicazione reattiva. Asincrono significa non attendere il completamento di un'operazione, ma registrare un listener.

:::note
In generale usare thread paralleli (usando la classe Thread e la classe Task in C#) o tecniche asincrone (usando async/await) a seconda che il problema sia CPU-bound o I/O-bound. Regola empirica: usare thread per operazioni CPU-bound e async per operazioni I/O-bound nelle applicazioni client, e usare sempre async per le applicazioni server.
:::

## Thread in C#

I thread in C# sono modellati dalla classe Thread[^1]. Quando un processo viene avviato (si esegue un programma) si ottiene un singolo thread (noto anche come thread principale) per eseguire il codice dell'applicazione. Per avviare esplicitamente un altro thread (diverso dal thread principale) bisogna creare un'istanza della classe Thread e chiamare il suo metodo Start per eseguirlo in C#. Vediamo un esempio:

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

È possibile che, eseguendo questo programma, venga visualizzato prima il messaggio "Press Enter to terminate!" e poi "Hello World!", poiché i due thread vengono eseguiti in parallelo; non è garantito quale venga eseguito per primo.

Per questo si può usare il metodo Thread.Join() per sospendere il thread chiamante (Main) fino a quando il thread di riferimento (la variabile t nel nostro caso) non termina.

```cs
t.Join(); //👈👈👈 with Join the caller thread (Main) will wait until t thread terminates
Console.WriteLine("Press Enter to terminate!");
Console.ReadLine();
```

Un altro metodo per ottenere lo stesso risultato è usare la proprietà booleana IsAlive del thread, che fornisce un'istantanea dello stato del thread (se è in esecuzione o meno).

Ora, Thread non inizia l'esecuzione finché non si chiama thread.Start(), quindi prima di chiamare Start è possibile impostare alcune proprietà del thread come il nome e la priorità. Impostare il nome aiuta nel debug; impostare la priorità può influenzare l'ordine di esecuzione. Esempio:

```cs
Thread t = new(SomeMethod)
{
    Name = "My Parallel Thread",

    Priority = ThreadPriority.BelowNormal
};
```

## Differenza tra thread foreground e background

Esiste anche una proprietà di thread chiamata `IsBackground`. Se impostata a true il thread sarà un background thread, altrimenti sarà un foreground thread. **Per default è false, quindi sarà sempre un foreground thread**. Esempio:

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

Supponiamo che un thread foreground sia l'unico thread rimasto (il tuo thread principale ha terminato l'esecuzione e si è chiuso). Tuttavia, il processo non si chiuderà, **il processo attenderà che il thread foreground completi la sua esecuzione**. Pertanto, impedirà all'applicazione di chiudersi fino a quando il thread foreground non avrà terminato l'esecuzione. Tuttavia, se il thread è un background thread, il processo si chiuderà anche se il thread in background non ha completato completamente l'esecuzione.

## Avviare un thread con parametri

Come visto, al costruttore di Thread si passa il nome del metodo da eseguire:

```cs
Thread t = new Thread(SomeMethod);
```

Questo è possibile perché il costruttore accetta un delegate. Supporta due tipi di delegate. La prima definizione è:

```cs
public delegate void ThreadStart()
```

L'altra è:

```cs
public delegate void ParameterizedThreadStart(object obj)
```

Se il metodo richiede un argomento è possibile usare `ParameterizedThreadStart` e passare il parametro al metodo `Start`. Esempio:

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

Si noti che ora è necessario passare l'argomento del metodo Speak al metodo Start. Finora abbiamo usato solo metodi statici, ma è possibile usare anche metodi di istanza, come nell'esempio seguente:

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

## Ciclo di vita del thread

Un thread in C# in ogni istante si trova in uno dei seguenti stati. Un thread occupa uno solo degli stati mostrati in un dato istante:

| Aborted          | 256 | Lo stato del thread include [AbortRequested] e il thread è ora terminato, ma il suo stato non è ancora cambiato in [Stopped]. |
| ---------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AbortRequested   | 128 | È stato invocato il metodo [Abort(Object)] sul thread, ma il thread non ha ancora ricevuto la pendente [ThreadAbortException] che tenterà di terminarlo.                                                                                                                                     |
| Background       | 4   | Il thread viene eseguito come background thread, in contrapposizione a un foreground thread. Questo stato è controllato impostando la proprietà [IsBackground].                                                                                                                               |
| Running          | 0   | Il thread è stato avviato e non è ancora terminato.                                                                                                                                                                                                                                          |
| Stopped          | 16  | Il thread si è fermato.                                                                                                                                                                                                                                                                         |
| StopRequested    | 1   | È stata richiesta l'arresto del thread. Questo è per uso interno.                                                                                                                                                                                                                             |
| Suspended        | 64  | Il thread è stato sospeso.                                                                                                                                                                                                                                                                     |
| SuspendRequested | 2   | È stata richiesta la sospensione del thread.                                                                                                                                                                                                                                                  |
| Unstarted        | 8   | Il metodo [Start()] non è stato invocato sul thread.                                                                                                                                                                                                                                          |
| WaitSleepJoin    | 32  | Il thread è bloccato. Questo può essere dovuto a chiamate a [Sleep(Int32)] o [Join()], a una richiesta di lock (ad esempio con [Enter(Object)] o [Wait(Object, Int32, Boolean)]) o all'attesa su un oggetto di sincronizzazione come [ManualResetEvent].                                  |

L'enumerazione ThreadState definisce l'insieme degli stati possibili per i thread. È utile solo in alcuni scenari di debug. Il codice non dovrebbe usare lo stato del thread per sincronizzare le attività dei thread.

Una volta creato, un thread si trova in uno degli stati fino a quando non termina. I thread creati all'interno del CLR sono inizialmente nello stato [Unstarted], mentre i thread esterni (non gestiti) che entrano nel runtime sono già nello stato [Running]. Un thread passa da [Unstarted] a [Running] chiamando [Thread.Start]. Una volta lasciato lo stato [Unstarted] tramite Start, un thread non può più tornare in [Unstarted]. Un thread può trovarsi in più di uno stato contemporaneamente.

![Thread states](./csharp-threads/ThreadState.png)

In C#, per ottenere lo stato attuale del thread usare la proprietà `ThreadState` o `IsAlive` fornite dalla classe `Thread`.
Sintassi:

```cs
public ThreadState ThreadState{ get; }
```

Oppure

```cs
public bool IsAlive { get; }
```

La classe `Thread` fornisce metodi per gestire gli stati dei thread. `Thread.Sleep()` è un metodo statico che sospende temporaneamente l'esecuzione del thread corrente per un numero specificato di millisecondi, permettendo ad altri thread di eseguire.  

`Join()` viene usato per far sì che il thread chiamante attenda il completamento del thread su cui è chiamato.  

`Start()` manda un thread nello stato eseguibile.  
Un thread può terminare per esecuzione normale o per eventi speciali:

**Eccezione sincrona**  
Un thread termina anche se genera un'eccezione non gestita (es. IndexOutOfRangeException).

**Eccezione asincrona**  
È un'eccezione generata esplicitamente da un altro thread che chiama `Abort` o `Interrupt` sul thread in esecuzione. Questo metodo non è raccomandato perché può lasciare il programma in uno stato inconsistente.

## Sospensione e interruzione di thread

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

In questo esempio è stato utilizzato un campo booleano per segnalare al metodo Speak di un altro thread di terminare l'esecuzione quando `_cancel` viene impostato a true. Si noti che il campo `_cancel` è dichiarato `volatile` per evitare che il JIT lo memorizzi nella cache, poiché può essere modificato da un altro thread. È possibile adottare un meccanismo di comunicazione alternativo per segnalare al metodo ThreadStart di terminare, che rappresenta l'approccio consigliato.

## Threadpool

Come abbiamo appreso nella sezione precedente, il thread si arresta dopo aver completato il proprio lavoro, il che è positivo: il CLR libera le risorse dopo l'arresto del thread, liberando spazio per un'esecuzione fluida del programma senza che sia necessario scrivere codice per la gestione del thread e la raccolta dei rifiuti. **Tuttavia, la creazione di un thread comporta un costo in termini di tempo e risorse ed è difficile da gestire quando si lavora con un gran numero di thread. Il thread pool viene utilizzato in questo tipo di scenario**.  
**Quando si lavora con il thread pool in .NET, si mette in coda il proprio elemento di lavoro nel thread pool, da dove viene elaborato da un thread disponibile. Tuttavia, dopo che il lavoro è stato completato, questo thread non viene arrestato. Invece di essere arrestato, il thread torna nel thread pool, dove attende un altro elemento di lavoro. La creazione e la distruzione di questi thread sono gestite dal thread pool in base all'elemento di lavoro messo in coda nel thread pool**. Se non ci sono lavori nel thread pool, potrebbe decidere di terminare quei thread in modo che non consumino più risorse.

### Coda del Thread Pool

`ThreadPool.QueueUserWorkItem` è un metodo statico che è usato per mettere in coda l'unità di lavoro dell'utente nel thread pool. Proprio come si passa un delegate a un costruttore di Thread per creare un thread, si deve passare un delegate a questo metodo per mettere in coda il proprio lavoro.
Ecco un esempio:

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

Si osservi che è possibile passare direttamente il metodo `Speak` al metodo `QueueUserWorkItem`, poiché tale metodo accetta un `WaitCallback` come parametro.
Ecco la definizione di questo delegate:

```cs 
public delegate void WaitCallback(object state);
```

Si noti come esso abbia la stessa firma del metodo `Speak`, con `void` come tipo di ritorno e un oggetto come parametro. `QueueUserWorkItem` ha anche un'overload per i metodi con parametri, come questo:

```cs 
QueueUserWorkItem(WaitCallback, Object)
```

Qui il primo parametro è il nome del tuo metodo e il secondo parametro è l'oggetto che vuoi passare al tuo metodo.
Ecco un esempio:  

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

### Limitazioni della coda del Thread Pool

`ThreadPool.QueueUserWorkItem` è un modo semplice per schedulare lavoro nel thread pool, ma ha limitazioni: non si può sapere direttamente quando una specifica operazione è completata e non restituisce un valore. Al contrario, un `Task` può indicare il completamento di un'operazione e restituire un valore; vedremo i Task più avanti.

## Race condition

**Una race condition si verifica quando due o più thread possono accedere a dati condivisi e cercano di modificarli contemporaneamente**. Per comprendere appieno la race condition, parliamo prima di risorse condivise e poi della condizione stessa.

### Risorse condivise

Non tutte le risorse sono adatte all'uso concorrente. Risorse come interi e collezioni devono essere gestite con attenzione quando sono accessibili da più thread; le risorse che vengono lette e aggiornate da più thread sono dette risorse condivise. Esempio:

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

Tuttavia, c'è un problema con il codice sopra perché **ogni volta che lo eseguiamo vediamo un'uscita diversa**.
Per capire veramente il problema dobbiamo prima capire cos'è una race condition.

### Cos'è una race condition?

Una race condition è uno scenario in cui l'esito del programma dipende dal timing.
**Una race condition si verifica quando due o più thread possono accedere a dati condivisi e cercano di modificarli allo stesso tempo. Poiché l'algoritmo di pianificazione dei thread può passare da un thread all'altro in qualsiasi momento, non si conosce l'ordine in cui i thread tenteranno di accedere ai dati condivisi. Pertanto, il risultato della modifica dei dati dipende dall'algoritmo di pianificazione dei thread, cioè entrambi i thread stanno "correndo" per accedere/modificare i dati.**  
Nel nostro caso, la riga che causa la race condition è `sum++`, anche se questa riga sembra essere un'istruzione singola e non dovrebbe essere influenzata dalla concorrenza, a livello di esecuzione viene trasformata in più istruzioni da parte del JIT, ad esempio

```asm 
mov eax, dword ptr [sum]
inc eax
mov dword ptr [sum], eax
```

Quindi, cosa succede quando i nostri thread multipli eseguono questa parte del codice. Supponiamo che ci sia questo thread `X` e thread `Y`. Supponiamo che il thread `X` legga il valore di una variabile e lo memorizzi nel registro `X.eax` per l'incremento, ma dopo aver incrementato il valore da 0 a 1, il thread `X` venga sospeso dallo scheduler e inizi l'esecuzione del thread `Y`, dove anche il thread `Y` legge il valore della variabile `sum` nel registro `Y.eax` e fa l'incremento da 0 a 1 e ora, dopo aver fatto questo incremento, entrambi i thread aggiorneranno la variabile `sum` a 1, quindi il suo valore sarà 1 anche se entrambi i thread hanno incrementato il valore.
Quindi, in parole semplici, **è solo una corsa tra i thread X e Y per leggere e aggiornare il valore della variabile `sum` e quindi causare la race condition**. Ma possiamo superare questo tipo di problemi utilizzando alcune tecniche di sincronizzazione dei thread che sono:  

* `Aggiornamento atomico`  
* `Partizionamento dei dati`  
* `Tecnica basata su attesa`  

Impareremo di più su queste tecniche di sincronizzazione dei thread nella sezione successiva

## Sezione critica

Nella programmazione concorrente, gli accessi concorrenti a risorse condivise possono portare a comportamenti imprevisti o errati, quindi **le parti del programma in cui viene acceduta la risorsa condivisa devono essere protette in modi che evitino l'accesso concorrente. Questa sezione protetta è la sezione critica o regione critica[^6]. Non può essere eseguita da più di un processo/thread alla volta**. Tipicamente, la sezione critica accede a una risorsa condivisa, come una struttura dati, un dispositivo periferico o una connessione di rete, che non funzionerebbe correttamente nel contesto di più accessi concorrenti.  
**La sezione critica è un pezzo di programma che richiede l'esclusione mutua di accesso.**
Nel caso di esclusione mutua (Mutex/Monitor), un thread blocca una sezione critica utilizzando tecniche di blocco quando ha bisogno di accedere alla risorsa condivisa e gli altri thread devono attendere il loro turno per entrare nella sezione. Questo previene conflitti quando due o più thread condividono lo stesso spazio di memoria e vogliono accedere a una risorsa comune.

## Stati transienti e interferenze

Le strutture dati accedute da un programma multithread sono oggetto di aggiornamenti da parte di più thread

* Gli aggiornamenti non avvengono atomicamente, ma sono decomponibili in varie operazioni di modifica intermedie e di una certa durata  
* Durante il transitorio la struttura dati “perde significato” (inconsistente), e passa per una serie di **stati transienti**  
* Un tale stato non dovrebbe essere visibile a thread diversi dal thread che esegue l'aggiornamento, altrimenti si generano **interferenze**.

![Origini interferenze](./csharp-threads/Origini-Interferenze-Thread.png)

Si ha interferenza in presenza di

* due o più flussi di esecuzione
* almeno un flusso di esecuzione esegue scritture (aggiorna la struttura dati!)
* Perché
  * un flusso esegue un cambio di stato dell’area di memoria in maniera non atomica
  * gli stati transienti che intercorrono tra quello iniziale a quello finale
sono visibili a flussi di esecuzione diversi da quello che li sta producendo

Esempio di interferenza  
La disponibilità di un volo di una compagnia aerea è memorizzata in
`POSTI=1`. Due signori nel medesimo istante ma da due postazioni distinte, chiedono rispettivamente di prenotare l'ultimo posto e di disdire la prenotazione già effettuata.  

* Le due richieste vengono tradotte in queste sequenze di istruzioni
elementari indivisibili:

![Prenota e disdici fig. 1](./csharp-threads/Prenota-Disdici1.png)

Inizialmente `POSTI=1`  

* L’esecuzione concorrente dà luogo ad una qualsiasi delle possibili
sequenze di interleaving  
* Consideriamo un campione di tre sequenze:

![Prenota e disdici fig. 2](./csharp-threads/Prenota-Disdici2.png)

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

![Procedura P](./csharp-threads/Procedure-P.png)

### Condizioni di Bernstein

Quando è lecito eseguire
concorretemene due istruzioni ia e ib?

* se valgono le seguenti condizioni, dette
**Condizioni di Bernstein**:

![Condizioni di Bernstein](./csharp-threads/Condizioni-di-Bernstein.png)

Si osservi che non si impone alcuna condizione su

![Intersezione](./csharp-threads/Intersezione.png)

Sono banalmente estendibili al caso di tre o più istruzioni

Esempi di violazione per le due istruzioni

![Esempio di violazione](./csharp-threads/Esempio-violazione-Bernstein.png)

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
