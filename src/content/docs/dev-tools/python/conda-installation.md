---
title: "Anaconda Installation and Setup"
description: "Anaconda Installation and Setup"
sidebar:
  label: "Anaconda Installation and Setup"
  order: 20
---
<style>
img {display: block; margin: 0 auto;}
</style>

![Overview Image](./conda-installation/conda_installation_overview_3d_gem.png)

## Installazione di Anaconda/Miniconda (Windows, WSL, Linux), analisi comparativa e integrazione con VS Code

### 1. Introduzione e Analisi Comparativa

In questa sezione si illustrano le procedure per l'installazione e la configurazione della distribuzione **Anaconda** (o della sua controparte leggera, **Miniconda**).

Prima di procedere all'aspetto operativo, è fondamentale comprendere la distinzione rispetto all'interprete Python nativo discusso in precedenza.

#### 1.1 Conda vs Python Nativo (pip/venv)

La scelta tra un'installazione nativa e l'uso di Conda dipende dalla tipologia di sviluppo.

**Vantaggi dell'ambiente Conda:**

- **Gestione dei Binari:** Conda non gestisce solo pacchetti Python, ma anche librerie di sistema (C, C++, Fortran). Questo è cruciale in ambito *Data Science* (es. NumPy, SciPy, TensorFlow) dove la compilazione manuale delle dipendenze può risultare complessa.

- **Ambienti Isolati Completi:** Un ambiente Conda è completamente indipendente, includendo una propria versione di Python, slegata da quella di sistema.

- **Pre-installazione:** La versione "Anaconda Full" include oltre 1500 pacchetti scientifici pronti all'uso.

**Svantaggi:**

- **Pesantezza:** L'installazione completa di Anaconda può occupare diversi GB.

- **Velocità:** Il risolutore di dipendenze di Conda può risultare più lento rispetto a `pip`.

- **Complessità del PATH:** Richiede una gestione attenta delle variabili d'ambiente per non entrare in conflitto con altri software.

:::note
Per ambienti di produzione web leggeri, si preferisce spesso Python nativo. Per Data Science, Machine Learning e calcolo scientifico, Anaconda è lo standard *de facto*.
:::

### 2. Installazione su Windows (PowerShell)

#### 2.1 Download della Risorsa

Si consiglia di scaricare l'installer grafico ufficiale:

- **URL:** <https://www.anaconda.com/download>

Se si predilige un'installazione minimale (consigliata per utenti esperti), si opti per **Miniconda**:

- **URL:** <https://docs.anaconda.com/miniconda/>

#### 2.2 Procedura di Installazione

Eseguire l'installer `.exe` con privilegi amministrativi e osservare le seguenti direttive:

1. **Destinazione:** Installare preferibilmente in un percorso senza spazi (es. `C:\Anaconda3`).

2. **Opzioni Avanzate (Critico):**

    - **NON** selezionare "Add Anaconda3 to my PATH environment variable". Questa opzione è deprecata e può causare instabilità di sistema.

    - Selezionare **"Register Anaconda3 as my default Python 3.x"**.

3. Completare l'installazione.

#### 2.3 Inizializzazione della Shell e Prevenzione Conflitti

Poiché non abbiamo aggiunto Anaconda al PATH, è necessario inizializzare PowerShell affinché strumenti esterni come VS Code possano interagire con gli ambienti `Conda`. Tuttavia, è imperativo prevenire la sovrapposizione con l'interprete Python nativo.

1. Aprire il menu Start e cercare **"Anaconda Powershell Prompt"**.

2. Eseguire il seguente comando per abilitare `Conda` su tutte le future istanze di PowerShell standard:

    ```ps1
    conda init powershell

    ```

3. **Passaggio Critico:** Di default, il comando precedente imposta Anaconda per attivarsi automaticamente all'apertura di ogni terminale, mascherando l'installazione nativa di Python. Per evitare questo comportamento (*Path Pollution*) e warning relativi alla deprecazione di vecchi comandi, eseguire:

    ```ps1
    conda config --set auto_activate false

    ```

    :::note
    Con questa configurazione, all'apertura di PowerShell il comando `python` punterà all'interprete di sistema (nativo), mentre il comando `conda` rimarrà disponibile per attivare specifici ambienti quando necessario.

    *Nota:* Nelle versioni precedenti di `Conda` il parametro era noto come `auto_activate_base`. Oggi è un alias del più moderno `auto_activate`. L'uso del nuovo comando previene la comparsa di avvisi (warning) nel terminale.
    :::

4. Chiudere e riaprire una normale finestra di PowerShell. Verificare che il prefisso `(base)` **non** sia presente.

#### 2.4 Coesistenza con Python Nativo

A questo punto, l'ambiente Conda è installato e configurato per coesistere senza conflitti con l'installazione nativa di Python.

##### Stato della shell con la configurazione `auto_activate false`

Con la configurazione seguente:

```ps1
  conda init powershell
  conda config --set auto_activate false
```

Quando si apre PowerShell si ha:

- Conda **disponibile**, ma **non attivo**

- Nessun ambiente Conda attivato

- Il `PATH` punta al **Python di sistema** (se installato)

Quindi il comando `python --version` usa:

- Python installato tramite:

    - python.org

    - Microsoft Store

    - Chocolatey

    - altro installer di sistema

**NON** il Python di Conda.

##### Quando viene usato Python di Conda?

Il Python di Conda entra in gioco **solo** quando si attiva esplicitamente un ambiente:

```ps1
conda activate base

```

oppure

```ps1
conda activate myenv

```

In quel momento:

- Il `PATH` viene modificato

- `python` punta all'interprete dell'ambiente `Conda` attivo

- Le librerie disponibili sono solo quelle di quell'ambiente

Alla disattivazione:

```ps1
conda deactivate

```

si torna automaticamente al Python di sistema.

##### Confronto pratico

###### Scenario 1 -- Nessun ambiente Conda attivo

```ps1
python

```

✔ Python di sistema

✔ Pacchetti installati globalmente o in `venv` classici

###### Scenario 2 -- Ambiente Conda attivo

```ps1
conda activate myenv
python

```

✔ Python di Conda

✔ Pacchetti isolati dell'ambiente `myenv`

##### Convivenza consigliata (best practice)

La configurazione **ottimale** usa Conda **solo quando necessario**:

- Si usano due gestori di ambienti distinti:

    - `venv` / `virtualenv` per progetti Python "standard"

    - Conda per:

        - data science

        - `numpy` / `pandas` / `pytorch` / `tensorflow`

        - ambienti con dipendenze native complesse

- Si vuole evitare che Conda "invada" ogni terminale

##### Come verificare quale Python si sta usando?

Comando chiave:

```ps1
# PowerShell
where.exe python

```

- Senza Conda attivo → percorso di sistema

- Con Conda attivo → percorso dentro `miniconda` / `anaconda`

##### Schema di utilizzo degli ambienti Python

###### 1. Stato iniziale -- PowerShell appena aperta

```ps1
PowerShell
│
├─ Python di sistema (attivo)
│   └─ python.exe (installazione standard)
│
└─ Conda (disponibile ma inattivo)

```

- Nessun ambiente Conda attivo

- `python` → **Python di sistema**

- `pip` → pacchetti globali / venv standard

* * * *

###### 2. Uso di un ambiente `venv` (Python "classico")

```ps1
PowerShell
│
├─ Python di sistema
│   └─ venv\Scripts\activate
│       └─ Ambiente venv attivo

```

Comandi tipici:

```ps1
python -m venv .venv
.\.venv\Scripts\activate
python

```

- Isolamento gestito da `venv`

- Conda **non coinvolta**

- Ottimo per progetti backend, scripting, didattica base

###### 3. Uso di Conda (solo su richiesta)

```ps1
PowerShell
│
└─ Conda
    └─ conda activate myenv
        └─ Ambiente Conda attivo

```

Comandi:

```ps1
conda activate myenv
python

```

- Python e librerie forniti da Conda

- Ideale per:

    - numpy / pandas

    - machine learning

    - librerie con dipendenze native

###### 4. Uscita da Conda

```ps1
conda deactivate

```

Si ritorna automaticamente a:

```ps1
Python di sistema

```

##### Tabella riassuntiva

| Situazione | `python` usato | Gestione pacchetti |
| --- | --- | --- |
| Shell appena aperta | Python di sistema | pip |
| `venv` attivo | Python di sistema (isolato) | pip |
| Conda attivo | Python Conda | conda / pip |
| Conda disattivato | Python di sistema | pip |

Verifica rapida (consigliata in aula o debug)

```ps1
where.exe python

```

| Output principale | Significato |
| --- | --- |
| `C:\Python...` | Python di sistema |
| `...\venv\Scripts\python.exe` | venv attivo |
| `...\miniconda3\envs...` | Conda attivo |

##### Configurazione consigliata

- **Default**

    - Python di sistema

    - `venv` per ambienti isolati

    - `pip` per gestione classica dei pacchetti (globali o venv)

    - [`uv`](/info-quarta/dev-tools/python/tools-and-workflows/#8-metodologie-di-nuova-generazione-ladozione-di-uv) per la gestione moderna dei progetti Python

    - `Ruff` per qualità del codice

- **Eccezioni**

    - Conda solo per:

        - data science

        - ML

        - stack scientifici complessi

Questo approccio:

- riduce la complessità

- evita conflitti

- riflette lo stato dell'arte dell'ecosistema Python

### 3. Installazione su WSL e Linux Nativo

La procedura per i sistemi basati su Linux (incluso WSL Ubuntu) è identica e avviene tramite riga di comando.

#### 3.1 Acquisizione dello Script di Installazione

Si utilizzi il comando `wget` per scaricare l'ultima versione dello script installer (si consiglia di verificare l'URL per l'ultima versione, qui riportiamo un esempio generico per l'architettura x86_64):

```bash
# Per Anaconda Standard
wget https://repo.anaconda.com/archive/Anaconda3-latest-Linux-x86_64.sh

# OPPURE, per Miniconda (Consigliato per server/WSL)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

```

#### 3.2 Esecuzione dello Script

Si proceda all'installazione eseguendo lo script tramite `bash`:

```bash
# Sostituire con il nome del file scaricato
bash Anaconda3-latest-Linux-x86_64.sh

```

Durante l'esecuzione:

1. Premere **Invio** per scorrere la licenza e digitare **"yes"** per accettarla.

2. Confermare la directory di installazione predefinita (solitamente `/home/username/anaconda3` o `miniconda3`).

3. Alla domanda *"Do you wish the installer to initialize Anaconda3 by running conda init?"*, digitare **"yes"**.

4. Anche in ambiente Linux, si raccomanda di disabilitare l'attivazione automatica utilizzando la nuova sintassi:

    ```bash
    conda config --set auto_activate false

    ```

#### 3.3 Attivazione

Affinché le modifiche abbiano effetto, ricaricare la configurazione della shell:

```bash
source ~/.bashrc

```

Verificare l'installazione digitando:

```bash
conda --version

```

#### 3.4 Gestione degli Ambienti (Best Practices)

:::note
Si raccomanda di **non** installare mai pacchetti nell'ambiente `base`. Si deve sempre operare in ambienti dedicati.
:::

```bash
# Creazione di un nuovo ambiente con una versione specifica di Python
conda create --name corso_python python=3.11

# Attivazione dell'ambiente
conda activate corso_python

# Installazione di pacchetti (esempio)
conda install numpy pandas

```

## 5. Configurazione dell'IDE: Visual Studio Code

L'integrazione di Conda in VS Code richiede passaggi specifici per garantire che l'IDE riconosca correttamente gli interpreti isolati.

### 5.1 Prerequisiti

Assicurarsi di aver effettuato la configurazione dell'estensione **Python (Microsoft)** e di **Ruff (charliermarsh/ruff)** come descritto nella pagina relativa all'[integrazione degli strumenti di sviluppo](/info-quarta/dev-tools/python/python-installation/#5-configurazione-dellide-visual-studio-code).

### 5.2 Selezione dell'Interprete Conda

1. Aprire VS Code all'interno della cartella del progetto.

2. Assicurarsi di aver creato e attivato l'ambiente Conda desiderato (es. `corso_python`) tramite terminale *prima* di lanciare VS Code, oppure averlo già disponibile.

3. Premere `F1` o `Ctrl+Shift+P` e digitare: **"Python: Select Interpreter"**.

4. VS Code dovrebbe elencare automaticamente gli ambienti Conda rilevati. Selezionare quello corrispondente (es. `Python 3.11.x ('corso_python': conda)`).

### 5.3 Configurazione del Terminale Integrato

Se selezionando l'interprete il terminale integrato non attiva automaticamente l'ambiente (non mostra il prefisso tra parentesi), modificare le impostazioni:

1. Aprire le Impostazioni (`Ctrl + ,`).

2. Cercare **"Terminal: Integrated > Default Profile"**.

3. Assicurarsi che sia selezionato il profilo corretto (es. `PowerShell` su Windows o `bash`/`zsh` su Linux/WSL) che è stato inizializzato con `conda init`.

### 5.4 Nota su Linting e Formatting

Anche in ambiente Conda, si raccomanda l'uso dell'estensione **Ruff**. Essendo Ruff un tool esterno (scritto in Rust), funziona indipendentemente dal fatto che i pacchetti Python siano gestiti da pip o conda. La configurazione illustrata nella guida precedente rimane valida ed efficace.

## 6. Conclusione

L'ambiente Anaconda offre una piattaforma robusta per il calcolo scientifico. La corretta separazione degli ambienti tramite `conda create` è la chiave per mantenere un sistema pulito e riproducibile. Si invita il lettore a prestare massima attenzione alla gestione del PATH su Windows per evitare conflitti con altre installazioni software.
