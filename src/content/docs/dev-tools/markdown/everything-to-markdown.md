---
title: "Convertire qualsiasi formato in Markdown"
description: "Guida all'uso di MarkItDown per convertire PDF, DOCX, immagini, audio e altri formati in Markdown, con installazione, plugin OCR e casi d'uso pratici."
sidebar:
  label: "Convertire qualsiasi formato in Markdown"
  order: 30
---
<style>
img {display: block; margin: 0 auto;}
</style>

## Introduzione

La conversione di documenti eterogenei — PDF, presentazioni PowerPoint, fogli di calcolo Excel, immagini, file audio — in Markdown rappresenta un'operazione sempre più rilevante nell'ambito dell'analisi testuale, della preparazione di dati per modelli di intelligenza artificiale e della documentazione tecnica. **MarkItDown** è uno strumento open source sviluppato da Microsoft che risponde a questa esigenza, offrendo un'unica utility in grado di convertire decine di formati in Markdown mantenendo la struttura originale del documento: titoli, elenchi, tabelle, collegamenti e formattazione vengono preservati nella misura del possibile.

A differenza di strumenti come `textract`, MarkItDown si concentra sulla produzione di Markdown pulito e semanticamente corretto, ideale per essere consumato da Large Language Model (LLM), pipeline di text analysis e sistemi RAG (Retrieval-Augmented Generation). La presente guida illustra l'installazione, la configurazione dei plugin, l'utilizzo da riga di comando e tramite API Python, nonché i casi d'uso più comuni con esempi concreti.

---

## 🛠️ 1. Installazione

MarkItDown ([github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)) è un'utility Python sviluppata da Microsoft. L'installazione può avvenire in due modalità, a seconda dell'uso previsto:

* **`pipx`** — consigliato per l'uso come **strumento CLI globale**: isola il pacchetto in un ambiente virtuale dedicato rendendolo accessibile da qualunque terminale, senza conflitti con altri progetti Python.
* **`venv` locale** — consigliato quando si usa MarkItDown come **libreria Python** all'interno di un progetto specifico, ad esempio per integrarlo in pipeline di elaborazione dati.

### Prerequisiti

* **Python 3.10** o superiore.

### Installazione globale con pipx (uso CLI)

Se `pipx` non è presente nel sistema:

```powershell
pip install pipx
python -m pipx ensurepath
```

#### Configurazione del PATH

Il comando `python -m pipx ensurepath` aggiunge automaticamente la directory dei pacchetti pipx al **PATH utente** di Windows. Su Windows, pipx installa gli eseguibili dei pacchetti in `%USERPROFILE%\.local\bin` (ad esempio `C:\Users\utente\.local\bin\markitdown.exe`), mentre pipx stesso viene installato da pip in `%APPDATA%\Python\Scripts`. Entrambe queste directory devono trovarsi nel PATH affinché il comando `markitdown` sia raggiungibile da qualunque terminale.

Dopo l'esecuzione del comando, **chiudere e riaprire completamente il terminale** (non basta aprire una nuova scheda) affinché le modifiche al PATH abbiano effetto.

Verifica rapida della disponibilità del comando:

```powershell
where markitdown
```

Output atteso:

```
C:\Users\utente\.local\bin\markitdown.exe
```

Se il comando non viene trovato, aggiungere manualmente la directory al PATH utente tramite PowerShell:

```powershell
$binPath = "$env:USERPROFILE\.local\bin"
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$parts = if ([string]::IsNullOrWhiteSpace($userPath)) { @() } else { $userPath -split ';' }
if (-not ($parts -contains $binPath)) {
    $parts += $binPath
    [Environment]::SetEnvironmentVariable('Path', (($parts | Select-Object -Unique) -join ';'), 'User')
    Write-Host "Aggiunto $binPath al PATH utente. Riavviare il terminale."
}
```

Installare MarkItDown con il supporto a tutti i formati disponibili:

```powershell
pipx install "markitdown[all]"
```

L'opzione `[all]` installa tutte le dipendenze opzionali necessarie per i diversi formati. In alternativa, è possibile installare solo i formati specifici richiesti:

```powershell
pipx install "markitdown[pdf,docx,pptx]"
```

### Installazione in un venv locale (uso come libreria)

Per progetti che utilizzano MarkItDown come libreria Python — ad esempio all'interno di script di automazione o pipeline di elaborazione documenti — è preferibile installarlo in un ambiente virtuale dedicato al progetto:

```powershell
# Creare e attivare il venv
python -m venv .venv
.\.venv\Scripts\Activate

# Installare con tutte le dipendenze
pip install "markitdown[all]"

# Oppure solo le dipendenze necessarie
pip install "markitdown[pdf,docx]"
```

A questo punto MarkItDown è importabile come libreria nel codice Python del progetto:

```python
from markitdown import MarkItDown
```

Le dipendenze opzionali sono le stesse per entrambe le modalità di installazione:

| Dipendenza | Formati supportati |
| :-- | :-- |
| `[pdf]` | Documenti PDF |
| `[docx]` | Documenti Word |
| `[pptx]` | Presentazioni PowerPoint |
| `[xlsx]` | Fogli di calcolo Excel moderni |
| `[xls]` | Fogli di calcolo Excel legacy |
| `[outlook]` | Messaggi Outlook (.msg) |
| `[audio-transcription]` | File audio (MP3, WAV, MP4) |
| `[youtube-transcription]` | Trascrizioni YouTube |
| `[all]` | Tutti i formati sopra elencati |

### Verifica dell'installazione

```powershell
markitdown --version
```

### Dipendenze di sistema aggiuntive

Per la conversione di file audio è necessario **ffmpeg**:

```powershell
winget install --id=Gyan.FFmpeg -e --accept-package-agreements
```

---

## 💻 2. Utilizzo da riga di comando (CLI)

MarkItDown offre un'interfaccia a riga di comando minimale e intuitiva. La sintassi base prevede la specifica del file di input e, opzionalmente, del file di output.

### Sintassi base

```powershell
markitdown <file-input> -o <file-output>
```

### Esempi pratici

* **PDF → Markdown:**

  ```powershell
  markitdown documento.pdf -o documento.md
  ```

* **Word → Markdown:**

  ```powershell
  markitdown relazione.docx -o relazione.md
  ```

* **PowerPoint → Markdown:**

  ```powershell
  markitdown presentazione.pptx -o presentazione.md
  ```

* **Excel → Markdown:**

  ```powershell
  markitdown dati.xlsx -o dati.md
  ```

* **Immagine → Markdown:**

  > [!NOTE]
  > Per le immagini singole (JPG, PNG, ecc.) non serve il plugin OCR: MarkItDown dispone di un **convertitore immagini integrato** che invia l'immagine a un LLM vision per ottenerne una descrizione testuale. Tuttavia la CLI non permette di specificare il modello LLM: serve quindi uno script Python o il file `convert.py` descritto nella sezione [Script personalizzati](#-6-script-personalizzati-per-lautomazione).

  ```powershell
  # Con script Python (serve llm_client + llm_model)
  python convert.py foto.png -o descrizione.md
  ```

* **File audio → Markdown (trascrizione):**

  ```powershell
  markitdown registrazione.mp3 -o trascrizione.md
  ```

* **URL YouTube → Markdown:**

  ```powershell
  markitdown https://www.youtube.com/watch?v=VIDEO_ID -o video.md
  ```

> [!CAUTION]
> **Encoding dei caratteri su Windows**: non utilizzare il redirect della shell (`>`) per salvare l'output, poiché il terminale Windows sostituisce i caratteri non-ASCII (accenti, apostrofi) con il simbolo ``. Utilizzare sempre l'opzione `-o` per scrivere direttamente su file con encoding UTF-8.

### Opzioni della CLI

| Opzione | Descrizione |
| :-- | :-- |
| `-o, --output` | File di output |
| `-c, --charset` | Suggerimento sul charset del file di input (es. `UTF-8`) |
| `-p, --use-plugins` | Abilita i plugin di terze parti |
| `--list-plugins` | Elenca i plugin installati |
| `--keep-data-uris` | Mantiene i data URI (es. immagini base64) nell'output |
| `-d, --use-docintel` | Usa Azure Document Intelligence per l'estrazione |

---

## 🐍 3. Utilizzo tramite API Python

MarkItDown può essere utilizzato come libreria Python, offrendo un controllo più granulare rispetto alla CLI. L'API è particolarmente indicata per l'integrazione in pipeline automatizzate e script personalizzati.

### Utilizzo base

```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("documento.pdf")
print(result.text_content)
```

### Utilizzo con LLM per immagini

Per convertire immagini o per estrarre testo da immagini embedded in PDF e documenti Office, è necessario fornire un client LLM compatibile con l'API OpenAI:

```python
from markitdown import MarkItDown
from openai import OpenAI

md = MarkItDown(
    llm_client=OpenAI(
        api_key="chiave-api",
        base_url="https://endpoint-compatibile/v1",
    ),
    llm_model="nome-modello",
)

result = md.convert("immagine.png")
print(result.text_content)
```

### Utilizzo con plugin abilitati

```python
from markitdown import MarkItDown
from openai import OpenAI

md = MarkItDown(
    enable_plugins=True,
    llm_client=OpenAI(),
    llm_model="gpt-4o",
)

result = md.convert("documento-con-immagini.pdf")
print(result.text_content)
```

---

## 📄 4. Formati supportati

MarkItDown supporta nativamente una vasta gamma di formati. La tabella seguente elenca i principali, indicando le dipendenze richieste, la necessità di un client LLM e l'eventuale necessità del plugin OCR.

| Formato | Estensioni | Dipendenza | LLM richiesto | Plugin OCR |
| :-- | :-- | :-- | :-- | :-- |
| PDF | `.pdf` | `[pdf]` | No | Solo per OCR immagini embedded o PDF scansionati |
| Word | `.docx` | `[docx]` | No | Solo per OCR immagini embedded |
| PowerPoint | `.pptx` | `[pptx]` | No | Solo per OCR immagini embedded |
| Excel | `.xlsx`, `.xls` | `[xlsx]` / `[xls]` | No | Solo per OCR immagini embedded |
| Immagini | `.jpg`, `.png`, `.gif`, `.webp` | — | **Sì** | **No** — convertitore integrato |
| Audio | `.mp3`, `.wav`, `.m4a`, `.mp4` | `[audio-transcription]` | No | No |
| HTML | `.html`, `.htm` | — | No | No |
| CSV | `.csv` | — | No | No |
| JSON | `.json` | — | No | No |
| XML | `.xml` | — | No | No |
| EPub | `.epub` | — | No | No |
| Archivi ZIP | `.zip` | — | No | No |
| Messaggi Outlook | `.msg` | `[outlook]` | No | No |
| YouTube | URL | `[youtube-transcription]` | No | No |

> [!NOTE]
> **Differenza chiave tra immagini singole e immagini embedded:**
>
> * **Immagini singole** (JPG, PNG, ecc.): MarkItDown ha un convertitore immagini *integrato* che invia il file a un LLM vision. Non serve alcun plugin, ma serve un `llm_client` configurato.
> * **Immagini embedded** dentro PDF/DOCX/PPTX/XLSX: per estrarre testo da queste immagini serve il **plugin OCR** (`markitdown-ocr`), anch'esso basato su LLM vision.
> * **PDF scansionati** (solo immagini, senza testo estraibile): richiedono il plugin OCR.

---

## 🔌 5. Plugin OCR

MarkItDown supporta plugin di terze parti che estendono le funzionalità dei convertitori integrati. Il plugin più rilevante è **markitdown-ocr**.

### Quando serve il plugin OCR (e quando no)

È fondamentale distinguere due meccanismi diversi:

| Meccanismo | Cosa fa | Quando si attiva | Serve plugin? |
| :-- | :-- | :-- | :-- |
| **Convertitore immagini integrato** | Invia un'immagine singola a un LLM vision e restituisce una descrizione testuale | File `.jpg`, `.png`, `.gif`, `.webp` | **No** — basta un `llm_client` |
| **Plugin OCR** (`markitdown-ocr`) | Estrae testo da immagini *embedded* dentro PDF, DOCX, PPTX e XLSX, o da PDF interamente scansionati | PDF/DOCX/PPTX/XLSX che contengono immagini con testo al loro interno | **Sì** |

In sintesi:

* Vuoi convertire una **foto** o uno **screenshot** in testo? → Serve solo un `llm_client`, **non** serve il plugin.
* Vuoi estrarre testo da **immagini dentro un PDF o un DOCX**? → Serve il **plugin OCR** + un `llm_client`.
* Il PDF contiene testo selezionabile? → Non serve né il plugin né un LLM.

### Installazione del plugin

Il plugin va installato all'interno dell'ambiente virtuale pipx di MarkItDown:

```powershell
pipx inject markitdown markitdown-ocr openai
```

### Verifica dell'installazione del plugin

```powershell
markitdown --list-plugins
```

Output atteso:

```powershell
Installed MarkItDown 3rd-party Plugins:

  * ocr             	(package: markitdown_ocr)

Use the -p (or --use-plugins) option to enable 3rd-party plugins.
```

### Come funziona il plugin

Quando il plugin è attivo e un client LLM è configurato:

1. MarkItDown estrae le immagini embedded dal documento.
2. Ciascuna immagine viene inviata al modello vision con un prompt di estrazione.
3. Il testo restituito dal modello viene inserito inline nel documento Markdown, preservando il flusso strutturale.
4. Se la chiamata LLM fallisce, la conversione prosegue senza il testo dell'immagine interessata.

Per i **PDF scansionati** (privi di testo estraibile), il plugin rileva automaticamente la situazione e invia l'intera pagina come immagine al modello.

### Utilizzo da riga di comando con plugin

```powershell
markitdown -p documento.pdf -o output.md
```

### Utilizzo da Python con plugin e LLM

```python
from markitdown import MarkItDown
from openai import OpenAI

md = MarkItDown(
    enable_plugins=True,
    llm_client=OpenAI(
        api_key="chiave-api",
        base_url="https://endpoint-compatibile/v1",
    ),
    llm_model="nome-modello-vision",
)

result = md.convert("documento_con_immagini.pdf")
print(result.text_content)
```

### Endpoint compatibili

Il plugin utilizza il pattern `llm_client` / `llm_model` basato sull'API OpenAI. Qualunque provider che offra un endpoint compatibile può essere utilizzato:

* **OpenAI**: `https://api.openai.com/v1`
* **Azure OpenAI**: endpoint personalizzato Azure
* **Provider alternativi**: qualunque endpoint che implementi il protocollo `chat.completions.create()` di OpenAI

### Variabili d'ambiente

La libreria `openai` legge automaticamente le seguenti variabili d'ambiente, eliminando la necessità di specificarle nel codice:

```powershell
$env:OPENAI_API_KEY = "chiave-api"
$env:OPENAI_BASE_URL = "https://endpoint-compatibile/v1"
```

---

## 🧩 6. Script personalizzati per l'automazione

Quando l'utilizzo da riga di comando non è sufficiente — ad esempio per integrare il client LLM o per automatizzare conversioni di massa — è possibile creare script Python dedicati.

### Script monofile con supporto LLM

Il seguente script accetta un file di input e un opzionale file di output, leggendo il modello dalla variabile d'ambiente `Z_AI_MODEL`:

```python
from markitdown import MarkItDown
from openai import OpenAI
import sys
import os

input_file = sys.argv[1]
output_file = None
model = os.environ.get("Z_AI_MODEL", "gpt-4o")

args = sys.argv[2:]
for i, arg in enumerate(args):
    if arg == "-o" and i + 1 < len(args):
        output_file = args[i + 1]
        break

md = MarkItDown(
    enable_plugins=True,
    llm_client=OpenAI(),
    llm_model=model,
)
result = md.convert(input_file)

if output_file:
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(result.text_content)
    print(f"Salvato in {output_file}")
else:
    print(result.text_content)
```

### Wrapper batch per Windows

Per semplificare l'uso su Windows, si può creare un file `.bat` che imposta le variabili d'ambiente e invoca lo script Python con l'interprete corretto:

```batch
@echo off
set OPENAI_API_KEY=la-tua-chiave
set OPENAI_BASE_URL=https://endpoint-compatibile/v1
set Z_AI_MODEL=nome-modello
C:\Users\utente\pipx\venvs\markitdown\Scripts\python.exe convert.py %*
```

Utilizzo:

```powershell
.\convert.bat documento.pdf -o output.md
```

### Conversione batch di più file

Per convertire tutti i file di una cartella:

```python
from markitdown import MarkItDown
from pathlib import Path

md = MarkItDown()
cartella = Path("./documenti")
output = Path("./output")
output.mkdir(exist_ok=True)

for file in cartella.iterdir():
    if file.suffix in [".pdf", ".docx", ".pptx", ".xlsx"]:
        try:
            result = md.convert(str(file))
            out_file = output / f"{file.stem}.md"
            out_file.write_text(result.text_content, encoding="utf-8")
            print(f"Convertito: {file.name} -> {out_file.name}")
        except Exception as e:
            print(f"Errore con {file.name}: {e}")
```

---

## 🔍 7. Risoluzione dei problemi

Nel corso dell'utilizzo di MarkItDown possono verificarsi diverse problematiche. La tabella seguente riassume le più comuni con le relative soluzioni.

| Problema | Causa comune | Soluzione |
| :-- | :-- | :-- |
| **Caratteri `�` nel file di output** | Utilizzo del redirect `>` su Windows | Usare sempre `-o file.md` invece del redirect |
| **Warning `ffmpeg not found`** | ffmpeg non installato o non nel PATH | Installare con `winget install Gyan.FFmpeg` |
| **`command not found: markitdown`** | PATH non aggiornato dopo installazione pipx | Chiudere e riaprire il terminale |
| **Plugin OCR non carica** | Plugin non installato nel venv pipx | `pipx inject markitdown markitdown-ocr` |
| **OCR non estrae testo** | `llm_client` o `llm_model` mancanti | Passare entrambi i parametri al costruttore |
| **Errore 404 dalle API** | Endpoint o chiave API errati | Verificare `OPENAI_API_KEY` e `OPENAI_BASE_URL` |
| **Librerie non trovate negli script** | Python globale invece del venv pipx | Usare `C:\Users\utente\pipx\venvs\markitdown\Scripts\python.exe` |
| **PDF con testo vuoto** | PDF scansionato (solo immagini) | Abilitare il plugin OCR (`-p`) con un LLM vision |
| **Tabelle mal formattate** | Layout complesso nel PDF originale | Il formato Markdown non supporta merge di celle |

---

## ✅ 8. Tabella riassuntiva dei casi d'uso

| Scenario | Comando | Plugin OCR | LLM |
| :-- | :-- | :-- | :-- |
| PDF con testo → MD | `markitdown file.pdf -o out.md` | No | No |
| PDF con immagini embedded → MD | `markitdown -p file.pdf -o out.md` | **Sì** | **Sì** |
| PDF scansionato → MD | `markitdown -p file.pdf -o out.md` | **Sì** | **Sì** |
| Word → MD | `markitdown file.docx -o out.md` | No | No |
| Word con immagini → MD | `markitdown -p file.docx -o out.md` | **Sì** | **Sì** |
| PowerPoint → MD | `markitdown file.pptx -o out.md` | No | No |
| Excel → MD | `markitdown file.xlsx -o out.md` | No | No |
| Immagine singola → MD | `python convert.py foto.png -o out.md` | No | **Sì** |
| Audio → MD | `markitdown file.mp3 -o out.md` | No | No |
| YouTube → MD | `markitdown URL -o out.md` | No | No |
| HTML → MD | `markitdown file.html -o out.md` | No | No |
| Archivio ZIP → MD | `markitdown file.zip -o out.md` | No | No |
