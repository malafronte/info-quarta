---
title: "Programmazione asincrona"
description: "Tecniche di programmazione asincrona"
sidebar:
  label: "Programmazione asincrona"
  order: 50

---
<style>
img {display: block; margin: 0 auto;}
</style>

## Programmazione asincrona

<https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/>

Il modello di programmazione asincrona Task (TAP) offre un'astrazione su codice asincrono. È possibile leggere il codice come se ogni istruzione venisse completata prima che venga iniziata quella successiva. Il compilatore esegue una serie di trasformazioni poiché alcune delle istruzioni potrebbero essere eseguite e restituire [Task](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task) che rappresenta il lavoro in corso.

L'obiettivo di questa sintassi consiste nell'abilitare un codice che viene letto come una sequenza di istruzioni ma viene eseguito in un ordine più complesso in base all'allocazione delle risorse esterne e al completamento dell'attività. Si tratta di un funzionamento analogo a quello in cui gli utenti specificano istruzioni per i processi che includono attività asincrone. In questo articolo verrà usato un esempio di istruzioni per la preparazione di una colazione per osservare in che modo le parole chiave async e await consentono di motivare in modo più semplice un codice che include una serie di istruzioni asincrone. Si procederà a scrivere istruzioni come quelle dell'elenco seguente per descrivere come preparare una colazione:

1.       Versare una tazza di caffè.

2.       Scaldare una padella e friggere due uova.

3.       Friggere tre fette di pancetta.

4.       Tostare due fette di pane.

5.       Aggiungere burro e marmellata alla fetta di pane tostata.

6.       Versare un bicchiere di succo d'arancia.

Se si ha esperienza in cucina, queste istruzioni verranno eseguite **in modo asincrono**. Si inizierà a scaldare la padella per le uova e si inizierà a cuocere la pancetta. Si inserirà il pane nel tostapane, quindi si inizieranno a cuocere le uova. A ogni passaggio del processo si inizia un'attività, quindi ci si dedica alle attività che man mano richiedono attenzione.

La preparazione della colazione è un buon esempio di lavoro asincrono non parallelo. Tutte le attività possono essere gestite da una sola persona (o thread). Continuando con l'analogia della colazione, una sola persona può preparare la colazione in modo asincrono iniziando l'attività successiva prima che l'attività precedente venga completata. La preparazione procede indipendentemente dal fatto che venga controllata da qualcuno. Non appena si inizia a scaldare la padella per le uova, è possibile iniziare a friggere la pancetta. Dopo aver iniziato a cuocere la pancetta, è possibile inserire il pane nel tostapane.

In un algoritmo parallelo sarebbero necessari più cuochi (o thread). Un cuoco cucinerebbe le uova, un cuoco cucinerebbe la pancetta e così via. Ogni cuoco si dedicherebbe a una singola attività. Ogni cuoco (o thread) verrebbe bloccato in modo sincrono in attesa che la pancetta sia pronta per essere girata o che la tostatura del pane venga completata.

A questo punto, si prendano in esame le stesse istruzioni scritte sotto forma di istruzioni C#:

```cs
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics;
namespace AsyncBreakfast
{

    internal class Bacon
    {
    }
    internal class Egg
    {
    }
    internal class Coffee
    {
    }
    internal class Juice
    {
    }
    internal class Toast
    {
    }
    class Program
    {
        static void Main(string[] args)
        {
                        //Prepariamo la colazione - versione sincrona
            Console.WriteLine("Prepariamo la colazione - versione sincrona");
            ColazioneSincrona();

            //Console.WriteLine("\n\nPrepariamo la colazione - versione parallela");
            //ColazioneParallela();

            ////Prepariamo la colazione - versione asincrona
            //Console.WriteLine("\n\nPrepariamo la colazione - versione asincrona");
            //await ColazioneAsincrona();

            ////Prepariamo la colazione - versione asincrona ottimizzata
            //Console.WriteLine("\n\nPrepariamo la colazione - versione asincrona ottimizzata");
            //await ColazioneAsincronaOttimizzata();
        }

private static void ColazioneSincrona()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            Coffee cup = PourCoffee();
            Console.WriteLine("coffee is ready");
            List<Egg> eggs = FryEggs(2);
            Console.WriteLine("eggs are ready");
            List<Bacon> bacon = FryBacon(3);
            Console.WriteLine("bacon is ready");
            List<Toast> toast = ToastBread(2);
            ApplyButter(toast);
            ApplyJam(toast);
            Console.WriteLine("toast is ready");
            Juice oj = PourOJ();
            Console.WriteLine("oj is ready");
            Console.WriteLine("Breakfast is ready!");
            sw.Stop();
            Console.WriteLine($"Il tempo per la colazione sincrona è {sw.ElapsedMilliseconds} ms");
        }

        private static Coffee PourCoffee()
        {
            Console.WriteLine($"Sto iniziando a preparare il caffè");
            Task.Delay(1000).Wait();
            return new Coffee();
        }

private static List<Egg> FryEggs(int v)
        {
            Console.WriteLine($"Sto iniziando a friggere {v} uova");

            List<Egg> uova = new List<Egg>();
            for (int i = 0; i < v; i++)
            {
                // https://stackoverflow.com/questions/20082221/when-to-use-task-delay-when-to-use-thread-sleep
  Task.Delay(200).Wait();
                uova.Add(new Egg());
            }
            return uova;
        }

private static List<Bacon> FryBacon(int v)
        {
            Console.WriteLine($"Sto iniziando a friggere {v} fette di pancetta");

            List<Bacon> fetteDiPancetta = new List<Bacon>();
            for (int i = 0; i < v; i++)
            {
                Task.Delay(200).Wait();
                fetteDiPancetta.Add(new Bacon());
            }
            return fetteDiPancetta;
        }

private static List<Toast> ToastBread(int v)
        {
            Console.WriteLine($"Sto iniziando a tostare {v} fette di pane");
            List<Toast> toasts = new List<Toast>();
            for (int i = 0; i < v; i++)
            {
                Console.WriteLine($"\tTosto la {i+1}-ma fetta");
                Task.Delay(200).Wait();
                toasts.Add(new Toast());
            }
            return toasts;
        }
private static void ApplyButter(List<Toast> toast)
        {
            Console.WriteLine("Sto iniziando a spalmare il burro ");
            for (int i = 0; i < toast.Count; i++)
            {
                Task.Delay(300).Wait();
                Console.WriteLine($"\tSto spalmando il burro sulla {i + 1}-ma fetta ");
            }

        }

private static void ApplyJam(List<Toast> toast)
        {
            Console.WriteLine("Sto iniziando a spalmare la marlellata ");
            for (int i = 0; i < toast.Count; i++)
            {
                Task.Delay(500).Wait();
                Console.WriteLine($"\tSto spalmando la marmellata sulla {i+1}-ma fetta");
            }

        }

private static Juice PourOJ()
        {
            Console.WriteLine("Sto iniziando a spremere le arance");
            Task.Delay(1000).Wait();
            return new Juice();
        }

    }
}

```

I computer non interpretano le istruzioni allo stesso modo delle persone. Il computer si bloccherà in corrispondenza di ogni istruzione fino a quando non verrà completata prima di passare all'istruzione successiva. In questo modo non verrà preparata una colazione soddisfacente. Le attività successive non verranno iniziate prima del completamento delle attività precedenti. La preparazione della colazione richiederà più tempo e alcuni alimenti si raffredderanno prima di essere serviti.

Se si vuole che il computer esegua le istruzioni precedenti in modo asincrono, è necessario scrivere codice asincrono.

Queste considerazioni sono importanti per l'attuale scrittura dei programmi. Quando si scrivono programmi client, si vuole che l'interfaccia utente risponda all'input dell'utente. L'applicazione non deve bloccare l'uso del telefono durante il download di dati dal Web. Quando si scrivono programmi server, non si vuole che i thread vengano bloccati. I thread potrebbero essere impegnati a rispondere ad altre richieste. L'uso di codice sincrono quando sono presenti alternative asincrone riduce la possibilità di aumentare le istanze in modo meno costoso. I thread bloccati hanno un costo.

Per applicazioni moderne efficienti è necessario creare codice asincrono. Senza supporto del linguaggio, la scrittura di codice asincrono richiedeva callback, eventi di completamento o altri elementi che nascondevano la finalità originale del codice. Il vantaggio del codice sincrono risiede nella semplicità di comprensione. Le azioni passo passo rendono più semplice l'analisi e la comprensione. Nei modelli asincroni tradizionali era necessario porre l'attenzione sulla natura asincrona del codice anziché sulle azioni fondamentali del codice.

### Versione parallela, veloce ma non sempre ottimizzata

Utilizzando una versione parallela del precedente programma è come se avessimo a disposizione tanti cuochi che in parallelo preparano alcune della attività previste per la colazione, come, ad esempio, friggere le uova, preparare il bacon e tostare il pane. Questo modo di procedere sicuramente riduce i tempi, ma a scapito delle risorse utilizzate, soprattutto quando i singoli thread non sono sempre impegnati ad utilizzare cicli macchina del processore, ma attendono il verificarsi di un evento asincrono. Ad esempio, i cuochi che preparano la colazione starebbero ad attendere che il pane si tosti, che le uova si friggano e così via. In questo caso ci sarebbe un grande dispendio di thread che per gran parte del tempo starebbero solo ad attendere il verificarsi di eventi esterni. La versione seguente del metodo che prepara la colazione usa i Task per far partire in parallelo le attività relative alla preparazione delle uova, del bacon e dei toast. Viene fatto un wait sul task relativo al toast perché le attività sincrone successive (ApplyButter e ApplyJam) richiedono che i toast siano pronti per poter procedere. L'uso dei task è già un miglioramento rispetto a quello dell'uso diretto dei thread perché la libreria TPL ottimizza l'utilizzo dei thread sottostanti ai task impiegati; tuttavia, il modello di programmazione seguito nell'esempio della programmazione parallela è quello di un cobegin/coend della programmazione parallela.

```cs
private static void ColazioneParallela()
        {
            //in questo esempio ci sono alcune attività che sono svolte in parallelo
            //e alcune attività che sono svolte in maniera sincrona
            Stopwatch sw = new Stopwatch();
            sw.Start();
            PourCoffee();//attività sincrona
            Console.WriteLine("coffee is ready");
            Task<List<Egg>> eggs = Task.Factory.StartNew(() => FryEggs(2));
            Task<List<Bacon>> bacon = Task.Factory.StartNew(() => FryBacon(3));
            Task<List<Toast>> toast = Task.Factory.StartNew(() => ToastBread(2));
            toast.Wait();
            ApplyButter(toast);//attività sincrona
            ApplyJam(toast);//attività sincrona
            Console.WriteLine("toast is ready");
            Juice oj = PourOJ();//attività sincrona
            Console.WriteLine("oj is ready");
            //quando tutto è pronto la colazione è pronta
            Task.WaitAll(eggs, bacon, toast);
            Console.WriteLine("eggs are ready");
            Console.WriteLine("bacon is ready");
            Console.WriteLine("Breakfast is ready!");
            sw.Stop();
            Console.WriteLine($"Il tempo per la colazione parallela è {sw.ElapsedMilliseconds} ms");
        }


//usa gli stessi metodi della versione sincrona, ma in task paralleli, ad eccezione dei seguenti metodi:
private static void ApplyButter(Task<List<Toast>> toast)
        {
            Console.WriteLine("Sto iniziando a spalmare il burro ");
            for (int i = 0; i < toast.Result.Count; i++)
            {
                Task.Delay(300).Wait();
                Console.WriteLine($"\tSto spalmando il burro sulla {i + 1}-ma fetta ");
            }
        }

        private static void ApplyJam(Task<List<Toast>> toast)
        {
            Console.WriteLine("Sto iniziando a spalmare la marlellata ");
            for (int i = 0; i < toast.Result.Count; i++)
            {
                Task.Delay(500).Wait();
                Console.WriteLine($"\tSto spalmando la marmellata sulla {i + 1}-ma fetta");
            }
        }
```

### Non bloccare, ma attendere

Si procederà ora ad aggiornare il codice in modo che il thread non venga bloccato mentre sono in esecuzione altre attività.La parola chiave await consente di iniziare un'attività senza alcun blocco e di continuare l'esecuzione al completamento dell'attività. Una versione asincrona semplice del codice della preparazione della colazione sarebbe simile al frammento seguente:

```cs
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics;
namespace AsyncBreakfast
{

    internal class Bacon
    {
    }
    internal class Egg
    {
    }
    internal class Coffee
    {
    }
    internal class Juice
    {
    }
    internal class Toast
    {
    }
    class Program
    {
        static async Task Main(string[] args)
        {
            //Prepariamo la colazione - versione sincrona
            Console.WriteLine("Prepariamo la colazione - versione sincrona");
            ColazioneSincrona();

            //Prepariamo la colazione - versione parallela
            Console.WriteLine("\n\nPrepariamo la colazione - versione parallela");
            ColazioneParallela();

            //Prepariamo la colazione - versione asincrona
            Console.WriteLine("\n\nPrepariamo la colazione - versione asincrona");
            await ColazioneAsincrona();

            //Prepariamo la colazione - versione asincrona
            //Console.WriteLine("\n\nPrepariamo la colazione - versione asincrona ottimizzata");
            //await ColazioneAsincronaOttimizzata();
        }

private static async Task ColazioneAsincrona()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            PourCoffee();
            //un metodo asincrono restituisce un Task
            //Il task può non restituire nulla, nel caso di azione asincrona (operazione che non restituisce alcun valore al chiamante)
            //oppure può restituire un oggetto, come ad esempio nel caso di una lista di Egg o di Bacon

            //ci sono due modi per utilizzare un metodo asincrono:
            //1) aspettare il completamento del task restituito dal metodo asincrono, come nel caso di:
            //Task<List<Egg>> eggs =  FryEggsAsync(2);
            //2) aspettare in maniera asincrona direttamente il risultato del task, come nel caso di 
            //List<Toast> toast = await MakeToastWithButterAndJamAsync();
            //in questo secondo caso si utilizza la keyword await, che vuol dire asyncronous wait.
            //con l'utilizzo della keyword await dopo il segno di = si ottiene non un Task, ma direttamente il valore restituito 
            //dal task, se esiste, oppure si attende la fine del task se questo non restituisce nessun valore
            Task<List<Egg>> eggs =  FryEggsAsync(2);
            Task<List<Bacon>> bacon = FryBaconAsync(3);
            List<Toast> toast = await MakeToastWithButterAndJamAsync(2);
            await bacon;
            Console.WriteLine("bacon is ready");
            await eggs;
            Console.WriteLine("eggs are ready");
            
            Console.WriteLine("toast is ready");


            Juice oj = PourOJ();
            Console.WriteLine("oj is ready");
            //quando tutto è pronto la colazione è pronta
            Console.WriteLine("Breakfast is ready!");
            sw.Stop();
            Console.WriteLine($"Il tempo per la colazione asincrona è {sw.ElapsedMilliseconds} ms");
        }

private static Coffee PourCoffee()
        {
            Console.WriteLine($"Sto iniziando a preparare il caffè");
            Task.Delay(1000).Wait();
            return new Coffee();
        }

        //Un metodo asincrono è definito tramite la keyword async e restituisce un Task<TResult> oppure Task se non restituisce nulla
        //la keyword async si utilizza in combinazione con la keyword await all'interno del metodo
        private static async Task<List<Egg>> FryEggsAsync(int v)
        {
            Console.WriteLine($"Sto iniziando a friggere {v} uova");

            List<Egg> uova = new List<Egg>();
            for (int i = 0; i < v; i++)
            {
                await Task.Delay(200);
                uova.Add(new Egg());
            }
            return uova;
        }
        private static async Task<List<Bacon>> FryBaconAsync(int v)
        {
            Console.WriteLine($"Sto iniziando a friggere {v} fette di pancetta");

            List<Bacon> fetteDiPancetta = new List<Bacon>();
            for (int i = 0; i < v; i++)
            {
                await Task.Delay(200);
                fetteDiPancetta.Add(new Bacon());
            }
            return fetteDiPancetta;
        }
        private static async Task<List<Toast>> MakeToastWithButterAndJamAsync(int v)
        {
            List<Toast> toast = await ToastBreadAsync(v);
            //await toast;
            ApplyButter(toast);//attività sincrona
            ApplyJam(toast);//attività sincrona
            return toast;
        }
        private static async Task<List<Toast>> ToastBreadAsync(int v)
        {
                Console.WriteLine($"Sto iniziando a tostare {v} fette di pane");
                List<Toast> toasts = new List<Toast>();
                for (int i = 0; i < v; i++)
                {
                    Console.WriteLine($"\tTosto la {i + 1}-ma fetta");
                    await Task.Delay(200);
                    toasts.Add(new Toast());
                }
                return toasts;
         
        }
         private static Juice PourOJ()
        {
            Console.WriteLine("Sto iniziando a spremere le arance");
            Task.Delay(1000).Wait();
            return new Juice();
        }

    }
}
```

Questo codice non si blocca durante la cottura delle uova o della pancetta. Il codice, tuttavia, non inizia altre attività. Si inserisce il pane nel tostapane e si rimane a osservarlo fino al completamento della cottura. Ma almeno si risponde a un interlocutore che richiede attenzione. In un ristorante in cui vengono fatte più ordinazioni, il cuoco può iniziare a preparare un'altra colazione mentre la prima è in cottura.

Il thread impegnato nella preparazione della colazione non è bloccato in attesa che venga completata un'attività iniziata. Per alcune applicazioni, questa modifica è tutto ciò che serve. Un'applicazione GUI risponde sempre all'utente solo con questa modifica. Tuttavia, per questo scenario si desidera un altro funzionamento. Non si vuole che ogni attività del componente venga eseguita in modo sequenziale. È preferibile iniziare ogni attività del componente prima del completamento dell'attività precedente.

### Iniziare più attività contemporaneamente

In molti scenari si vuole iniziare immediatamente più attività indipendenti. Quindi, man mano che ogni attività viene terminata, è possibile passare ad altre operazioni da eseguire. Nell'analogia della colazione, questa modalità consente di preparare la colazione più rapidamente. Inoltre, tutte le operazioni vengono terminate quasi nello stesso momento. Si otterrà una colazione calda.

[System.Threading.Tasks.Task](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task) e i tipi correlati sono classi che è possibile usare per gestire le attività in corso. In questo modo è possibile scrivere codice più simile al modo in cui effettivamente si prepara una colazione. Si inizia a cuocere uova, pancetta e pane contemporaneamente. Man mano che ogni attività richiederà un'azione, si porrà l'attenzione su quell'attività, quindi sull'azione successiva e infine si rimarrà in attesa di altra attività da eseguire.

Si inizia un'attività e la si mantiene nell'oggetto [Task](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task) che rappresenta il lavoro. Si rimarrà in attesa (await) di ogni attività prima di utilizzarne il risultato.

Il codice precedente ha un funzionamento migliore. Tutte le attività asincrone vengono iniziate contemporaneamente. Si rimane in attesa di ogni attività solo quando è necessario avere a disposizione il risultato dell'attività. Il codice precedente potrebbe essere simile al codice di un'applicazione Web che effettua le richieste di diversi microservizi, quindi unisce i risultati in una singola pagina. Si eseguiranno tutte le richieste immediatamente, quindi si rimarrà in attesa (await) di tutte le attività e si comporrà la pagina Web.

### Composizione di attività

Tutti gli alimenti della colazione sono pronti contemporaneamente ad eccezione del pane. La preparazione del pane rappresenta la composizione di un'operazione asincrona (tostatura del pane) e di operazioni sincrone (aggiunta del burro e della marmellata). L'aggiornamento di questo codice illustra un concetto importante:

:::note
La composizione di un'operazione asincrona, seguita da un lavoro sincrono è un'operazione asincrona. In altre parole, se una parte di un'operazione è asincrona, l'intera operazione è asincrona.
:::

Il codice precedente ha mostrato che è possibile usare gli oggetti [Task](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task) o [Task<TResult>](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task-1) per attività in esecuzione. Si rimane in attesa (await) di ogni attività prima di usarne il risultato. Il passaggio successivo consiste nel creare metodi che rappresentano la combinazione di altre operazioni. Prima di servire la colazione, si vuole attendere l'attività che rappresenta la tostatura del pane prima dell'aggiunta del butto e della marmellata. È possibile rappresentare queste operazioni con il codice seguente:

```cs
private static async Task<List<Toast>> MakeToastWithButterAndJamAsync(int v)
        {
            List<Toast> toast = await ToastBreadAsync(v);
            ApplyButter(toast);//attività sincrona
            ApplyJam(toast);//attività sincrona
            return toast;
        }
private static async Task<List<Toast>> ToastBreadAsync(int v)
        {
                Console.WriteLine($"Sto iniziando a tostare {v} fette di pane");
                List<Toast> toasts = new List<Toast>();
                for (int i = 0; i < v; i++)
                {
                    Console.WriteLine($"\tTosto la {i + 1}-ma fetta");
                    await Task.Delay(200);
                    toasts.Add(new Toast());
                }
                return toasts;
         
        }
```

Il metodo precedente include il modificatore async nella firma. Il modificatore segnala al compilatore che il metodo contiene un'istruzione await; contiene operazioni asincrone. Questo metodo rappresenta l'attività di tostatura del pane, quindi aggiunge il burro e la marmellata. Questo metodo restituisce [Task<TResult>](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task-1) che rappresenta la composizione di queste tre operazioni.

La modifica precedente ha illustrato una tecnica importante per l'uso di codice asincrono. Si compongono le attività separando le operazioni in un nuovo metodo che restituisce un'attività. È possibile scegliere quando rimanere in attesa dell'attività. È possibile iniziare altre attività contemporaneamente.

### Attendere le attività in modo efficiente

La serie di istruzioni await alla fine del codice precedente può essere migliorata usando i metodi della classe Task. Una delle API è [WhenAll](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task.whenall) che restituisce [Task](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task) che viene completata quando tutte le attività del relativo elenco di argomenti sono state completate, come illustrato nel codice seguente:

```cs
await Task.WhenAll(eggsTask, baconTask, toastTask);
Console.WriteLine("eggs are ready");
Console.WriteLine("bacon is ready");
Console.WriteLine("toast is ready");
Console.WriteLine("Breakfast is ready!");
```

Un'altra opzione consiste nell'usare [WhenAny](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task.whenany) che restituisce Task<Task> che viene completata quando una delle attività fornite sarà completata. È possibile attendere l'attività restituita, sapendo che è già stata completata. Il codice seguente illustra come è possibile usare [WhenAny](https://docs.microsoft.com/it-it/dotnet/api/system.threading.tasks.task.whenany) per attendere il completamento della prima attività e quindi elaborarne il risultato. Dopo aver elaborato il risultato dell'attività completata, si rimuove l'attività completata dall'elenco delle attività passate a WhenAny.

```cs
private static async Task ColazioneAsincronaOttimizzata()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            Coffee cup = PourCoffee();
            Console.WriteLine("coffee is ready");

            var eggsTask = FryEggsAsync(2);
            var baconTask = FryBaconAsync(3);
            var toastTask = MakeToastWithButterAndJamAsync(2);

            var breakfastTasks = new List<Task> { eggsTask, baconTask, toastTask };
            while (breakfastTasks.Count > 0)
            {
                Task finishedTask = await Task.WhenAny(breakfastTasks);
                if (finishedTask == eggsTask)
                {
                    Console.WriteLine("eggs are ready");
                }
                else if (finishedTask == baconTask)
                {
                    Console.WriteLine("bacon is ready");
                }
                else if (finishedTask == toastTask)
                {
                    Console.WriteLine("toast is ready");
                }
                breakfastTasks.Remove(finishedTask);
            }

            Juice oj = PourOJ();
            Console.WriteLine("oj is ready");
            Console.WriteLine("Breakfast is ready!");
            sw.Stop();
            Console.WriteLine($"Il tempo per la colazione asincrona è {sw.ElapsedMilliseconds} ms");
        }
```

Il codice finale è asincrono. Riflette con maggior precisione il modo in cui viene preparata una colazione. Confrontare il codice precedente con il primo esempio di codice di questo articolo. Le azioni principali risultano ancora chiare dalla lettura del codice. È possibile leggere il codice allo stesso modo in cui si leggerebbero le istruzioni per preparare una colazione riportate all'inizio di questo articolo. Le funzionalità del linguaggio per async e await offrono la traduzione che ogni persona farebbe per seguire le istruzioni scritte: iniziare le attività non appena possibile e non bloccarsi in attesa del completamento delle attività

###  I/O di file asincrono

<https://docs.microsoft.com/it-it/dotnet/standard/io/>

<https://docs.microsoft.com/it-it/dotnet/standard/io/asynchronous-file-i-o>

A partire da .NET Framework 4.5, i tipi di I/O includono metodi async per semplificare le operazioni asincrone. Un metodo asincrono contiene Async nel nome, ad esempio [ReadAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.stream.readasync), [WriteAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.stream.writeasync), [CopyToAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.stream.copytoasync), [FlushAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.stream.flushasync), [ReadLineAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.textreader.readlineasync) e [ReadToEndAsync](https://docs.microsoft.com/it-it/dotnet/api/system.io.textreader.readtoendasync). Questi metodi asincroni sono implementati nelle classi di flusso, come [Stream](https://docs.microsoft.com/it-it/dotnet/api/system.io.stream), [FileStream](https://docs.microsoft.com/it-it/dotnet/api/system.io.filestream)e [MemoryStream](https://docs.microsoft.com/it-it/dotnet/api/system.io.memorystream), e nelle classi usate per la lettura o la scrittura nei flussi, come [TextReader](https://docs.microsoft.com/it-it/dotnet/api/system.io.textreader) e [TextWriter](https://docs.microsoft.com/it-it/dotnet/api/system.io.textwriter).

L'esempio seguente mostra come usare due oggetti [FileStream](https://docs.microsoft.com/it-it/dotnet/api/system.io.filestream) per copiare i file in modo asincrono da una directory a un'altra.

Copiare file in modalità asincrona

```cs
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace CopyAsyncDemo
{
    class Program
    {
        static async Task CopyFiles(string startDirectory, string endDirectory)
        {
            foreach (string fileName in Directory.EnumerateFiles(startDirectory))
            {

                using (FileStream SourceStream = File.Open(fileName, FileMode.Open))
                {
                    using (FileStream DestinationStream = File.Create(endDirectory + fileName.Substring(fileName.LastIndexOf('\\'))))
                    {
                        await SourceStream.CopyToAsync(DestinationStream);
                        //introduco appositamente un ritardo per poter apprezzare il tempo che passa
                        //Thread.Sleep(20);
                        await Task.Delay(20);
                    }
                }

            }
            foreach (string directoryName in Directory.EnumerateDirectories(startDirectory))
            {
                //creo la cartella destinazione
                DirectoryInfo destinationDir = Directory.CreateDirectory(endDirectory + directoryName.Substring(directoryName.LastIndexOf('\\')));
                //chiamata ricorsiva del metodo
                await CopyFiles(directoryName, destinationDir.FullName);
            }

            //la copia poteva essere fatta anche come descritto qui:
            // https://docs.microsoft.com/en-us/dotnet/api/system.io.directoryinfo

        }


        static async Task Main(string[] args)
        {
            //creo un task che copia i file
            //i percorsi sorgente e destinazione devono esistere
            string StartDirectory = @"C:\Users\genna\source\repos\2020-2021";
            string EndDirectory = @"C:\Users\genna\Documents\Temp";
            Task copyTask = CopyFiles(StartDirectory, EndDirectory);

            //creo un task che perde tempo, ma che interrompo appena ho finito a copiare i task
            var tokenSource = new CancellationTokenSource();
            CancellationToken ct = tokenSource.Token;
            //lancio il task perdiTempo
            Task perdiTempo = Task.Run(() => {
                ct.ThrowIfCancellationRequested();
                int count = 0;
                while (true)
                {
                    Console.SetCursorPosition(0, 0);
                    Console.WriteLine($"Sono le ore {DateTime.Now} e tutto va bene, è la {count++} volta");
                    Thread.Sleep(100);
                    // Poll on this property if you have to do
                    // other cleanup before throwing.
                    if (ct.IsCancellationRequested)
                    {
                        // Clean up here, then...
                        ct.ThrowIfCancellationRequested();
                    }


                }
            }, ct);
            //avvio il copytask
            await copyTask;
            Console.WriteLine("Copia effettuata correttamente");
            //appena ho finito di copiare interrompo il task perdiTempo
            tokenSource.Cancel();
            try
            {
                await perdiTempo;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine($"Interrotto il Task Perditempo");
            }
            finally
            {
                tokenSource.Dispose();
            }




        }
    }
}
```

#### Processare a blocchi un file di testo

In questo esempio viene copiato un file di testo con un metodo asincrono che effettua un processamento a blocchi.

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProcessAsyncFile
{
    class Program
    {
        /// <summary>
        /// Copia un file di testo da Source a Destination effettuando un processamento a blocchi del file
        /// </summary>
        /// <param name="Source"></param>
        /// <param name="Destination"></param>
        /// <returns></returns>
        public static async Task CopyFilesAsync(StreamReader Source, StreamWriter Destination)
        {
            //buffer di char utilizzato per copiare il file di testo
            char[] buffer = new char[0x1000];
            int numRead;
            //ReadAsync legge un blocco di byte di grandezza massima buffer.Length dallo stream Souce 
            //e lo inserisce in buffer a partire dalla posizione 0 di buffer. ReadAsync restituisce 
            //il numero di byte letti e avanza nello stream del numero di byte letti
            while ((numRead = await Source.ReadAsync(buffer, 0, buffer.Length)) != 0)
            {
                //WriteDestination scrive in Destination i byte di buffer dalla 
                //posizione 0 fino a numRead
                await Destination.WriteAsync(buffer, 0, numRead);
            }
        }
        static async Task Main(string[] args)
        {

            string UserDirectory = @"C:\Temp\";
            //il file sorgente deve esistere
            using StreamReader SourceReader = File.OpenText(UserDirectory + "dante.txt");
            using StreamWriter DestinationWriter = File.CreateText(UserDirectory + "dante-copia.txt");
            await CopyFilesAsync(SourceReader, DestinationWriter);
        }
    }
}
```
