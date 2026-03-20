---
title: "Convertire Markdown in altri formati"
description: "Metodi e strumenti per convertire documenti Markdown in HTML, PDF, DOCX e altri formati comuni, con esempi pratici e best practice."
sidebar:
  label: "Convertire Markdown in altri formati"
  order: 20
---
<style>
img {display: block; margin: 0 auto;}
</style>

## Introduzione

La conversione di documenti Markdown in formati quali PDF, DOCX ed EPUB rappresenta un'operazione fondamentale nel flusso di lavoro di chiunque produca documentazione tecnica, articoli scientifici o materiale didattico. La presente guida, specificamente rivolta agli utenti del sistema operativo Windows, illustra come configurare un ambiente di lavoro completo all'interno di VS Code e AntiGravity per trasformare documenti Markdown in formati professionali adatti alla distribuzione, nonché come visualizzarli senza uscire dall'editor. Il documento si articola in sezioni che coprono l'installazione degli strumenti di base, la configurazione delle estensioni dell'editor, le best practice per l'esportazione e la risoluzione dei problemi più comuni.

---

## 🛠️ 1. Installazione degli strumenti di sistema

La conversione di documenti Markdown in formati diversi richiede l'installazione di specifici software che fungano da motori di conversione. Tali strumenti operano a livello di sistema operativo e costituiscono il fondamento tecnico su cui si basano tutte le operazioni successive. La presente sezione descrive ciascuno strumento, la sua funzione e le procedure di installazione.

### Pandoc: il convertitore universale

Pandoc costituisce il motore principale per la trasformazione di Markdown in una molteplicità di formati. Sviluppato da John MacFarlane, questo strumento open source supporta la conversione tra oltre quaranta formati diversi, inclusi HTML, PDF, DOCX, EPUB e molti altri. La sua versatilità lo rende indispensabile in qualunque flusso di lavoro che coinvolga la produzione di documentazione.

* **Installazione**: `winget install --source winget --exact --id JohnMacFarlane.Pandoc`
* **Verifica dell'installazione**: `pandoc --version`

### MiKTeX: motore PDF professionale

La generazione di documenti PDF di alta qualità tipografica richiede un motore LaTeX. MiKTeX rappresenta una distribuzione LaTeX per Windows che include tutti i componenti necessari per produrre documenti con una resa tipografica professionale, particolarmente adatta a pubblicazioni accademiche e documentazione tecnica.

* **Installazione**: `winget install MiKTeX.MiKTeX`
* **Configurazione silenziosa (passaggio cruciale)**:
    1. Aprire **MiKTeX Console**.
    2. Accedere alla sezione **Settings** → **General**.
    3. Impostare l'opzione *"Always install missing packages on-the-fly"* su **Always**.
    * *Nota*: Se la console presenta errori legati al PATH, rimuovere eventuali riferimenti a file `.exe` puri dalle variabili d'ambiente di Windows.

#### Configurazione del PATH di Windows

Affinché Pandoc possa invocare correttamente il motore LaTeX, è necessario che entrambi gli eseguibili siano raggiungibili tramite il PATH di sistema. Qualora `pandoc` venga trovato ma `pdflatex` no, occorre aggiungere MiKTeX al **Path utente** di Windows.

Percorsi tipici di installazione:

* `C:/Users/<utente>/AppData/Local/Pandoc`
* `C:/Users/<utente>/AppData/Local/Programs/MiKTeX/miktex/bin/x64`

Verifica rapida della disponibilità degli eseguibili:

```powershell
where pandoc
where pdflatex
```

Aggiornamento persistente del Path utente (PowerShell):

```powershell
$miktex = 'C:\Users\<utente>\AppData\Local\Programs\MiKTeX\miktex\bin\x64'
$pandoc = 'C:\Users\<utente>\AppData\Local\Pandoc'
$userPath = [Environment]::GetEnvironmentVariable('Path','User')
$parts = if ([string]::IsNullOrWhiteSpace($userPath)) { @() } else { $userPath -split ';' }
if (-not ($parts -contains $miktex)) { $parts += $miktex }
if (-not ($parts -contains $pandoc)) { $parts += $pandoc }
[Environment]::SetEnvironmentVariable('Path', (($parts | Select-Object -Unique) -join ';'), 'User')
```

Dopo l'esecuzione di questo comando, è necessario chiudere e riaprire completamente VS Code affinché le modifiche abbiano effetto.

### Puppeteer: PDF tramite Chrome

Puppeteer rappresenta un'alternativa a LaTeX per la generazione di PDF. Questo strumento utilizza il motore di rendering di Google Chrome per convertire documenti HTML in PDF, mantenendo con elevata fedeltà l'aspetto visivo dell'anteprima. Risulta particolarmente utile quando si desidera che il documento finale rispecchi esattamente quanto visualizzato nell'anteprima del browser.

* **Installazione**: `npm install -g puppeteer`
* **Vantaggi**: Non richiede LaTeX, è gratuito e gestisce perfettamente i CSS moderni.

### WeasyPrint: PDF con supporto CSS e segnalibri

WeasyPrint costituisce un motore PDF alternativo a LaTeX, particolarmente indicato quando si desidera un output visivamente simile all'anteprima HTML/CSS e con supporto nativo ai segnalibri PDF. Questo strumento, scritto in Python, offre un controllo granulare sul layout attraverso fogli di stile CSS.

* **Installazione consigliata**: `pipx install weasyprint`
* **Verifica dell'installazione**: `weasyprint --version`
* **Dipendenze runtime su Windows**: se compare l'errore `libgobject-2.0-0`, installare GTK:

    ```powershell
    winget install tschoonj.GTKForWindows
    ```

* **Vantaggi**: Mantiene meglio stile CSS, font e spaziature rispetto al motore LaTeX standard.
* **Nota pratica**: quando si utilizza Pandoc con WeasyPrint, il CSS va passato tramite l'opzione `--css=...` (preferibilmente con URI `file:///` su Windows).

### Calibre: eBook e formato EPUB

Calibre è necessario per l'esportazione in formati destinati a e-reader (EPUB, MOBI) e per la generazione di PDF ottimizzati per la lettura su dispositivi mobili. Questo software include il comando `ebook-convert`, che Pandoc può utilizzare come motore di conversione.

* **Installazione**: `winget install calibre.calibre`
* **Funzionalità**: Installa il comando `ebook-convert` nel sistema, rendendolo disponibile per la conversione di documenti in formati eBook.

---

## 🔌 2. Estensioni VS Code e AntiGravity

Una volta installati gli strumenti di sistema, è necessario integrarli nell'ambiente di sviluppo attraverso apposite estensioni. Questa sezione presenta le estensioni essenziali per la creazione e la visualizzazione dei documenti convertiti direttamente all'interno dell'editor.

### Estensioni per la creazione di documenti

Le seguenti estensioni consentono di trasformare i file Markdown in formati di output diversi:

1. **Markdown Preview Enhanced** (di Yiyi Wang): Questa estensione rappresenta uno strumento completo per l'anteprima e l'esportazione di documenti Markdown. Integra nativamente Pandoc, Puppeteer e supporta la generazione di eBook. Offre inoltre funzionalità avanzate come la renderizzazione di diagrammi, formule matematiche e grafici.

2. **Markdown PDF** (di yzane): Costituisce la soluzione più diretta per generare PDF e HTML rapidamente senza necessità di configurazioni complesse. Ideale per conversioni veloci quando non sono richieste personalizzazioni avanzate.

### Estensioni per la visualizzazione interna

Le seguenti estensioni permettono di visualizzare i file generati senza abbandonare l'editor:

1. **vscode-pdf**: Consente di visualizzare i PDF generati direttamente in una scheda dell'editor, eliminando la necessità di aprire applicazioni esterne.

2. **Docx/ODT Viewer**: Permette di aprire e leggere i file Word (`.docx`) senza avviare Microsoft Word, mantenendo il flusso di lavoro all'interno dell'editor.

---

## 📄 3. Utilizzo e best practice

La configurazione corretta dei documenti Markdown e la scelta appropriata del motore di conversione determinano la qualità del risultato finale. Questa sezione illustra le tecniche per configurare l'esportazione tramite frontmatter, le procedure per eseguire la conversione e i criteri per scegliere il motore più adatto alle proprie esigenze.

### Configurazione tramite frontmatter

Il frontmatter rappresenta un blocco di metadati YAML posizionato all'inizio del file Markdown che istruisce gli strumenti di conversione su come elaborare il documento. Per indicare a **Markdown Preview Enhanced** il formato di output desiderato, è sufficiente aggiungere le opportune direttive all'inizio del file.

Per l'esportazione in formato Word:

```yaml
---
output: word_document
---
```

Oppure, con opzioni aggiuntive:

```yaml
---
output:
  word_document:
    toc: true
    reference_doc: "template.docx" # Se si dispone di un file Word con stili personalizzati
---
```

Per l'esportazione in formato PDF:

```yaml
---
output: pdf_document
---
```

### Procedura di esportazione

La conversione può essere eseguita attraverso due metodi principali:

* **Tramite menu contestuale**: Aprire l'anteprima cliccando sull'icona in alto a destra o premendo `Ctrl+K V`, quindi fare clic con il tasto destro sull'anteprima e selezionare **Export**.

* **Tramite task (metodo consigliato)**: Utilizzare i task personalizzati configurati in `.vscode/tasks.json`, che invocano Pandoc direttamente tramite la scorciatoia `Ctrl+Shift+B`. Questo metodo offre maggiore controllo sui parametri di conversione.

### Scelta del motore PDF

La selezione del motore di conversione PDF dipende dalle caratteristiche desiderate nel documento finale. La tabella seguente fornisce una guida rapida alla scelta:

| Obiettivo | Motore consigliato | Note |
| :-- | :-- | :-- |
| PDF più simile all'anteprima (CSS) | **WeasyPrint** | Buon controllo layout e segnalibri |
| Qualità tipografica classica accademica | **XeLaTeX** | Richiede tuning con variabili `-V` |
| Massima fedeltà visiva a Chrome | **Puppeteer** | Generalmente senza segnalibri PDF |

### Configurazione di Markdown Preview Enhanced

Per garantire il corretto funzionamento dell'estensione, è opportuno configurare i percorsi degli eseguibili nel file `./.vscode/settings.json` del progetto:

```json
{
    "markdown-preview-enhanced.pandocPath": "pandoc",
    "markdown-preview-enhanced.latexEngine": "pdflatex"
}
```

In questo modo Markdown Preview Enhanced utilizza gli eseguibili dal PATH di sistema, evitando discrepanze tra terminale ed estensione.

### Utilizzo da riga di comando (CLI)

Per gli utenti che preferiscono il terminale, Pandoc offre un'interfaccia a riga di comando completa. Di seguito si riportano i comandi fondamentali.

**Sintassi base:**

```powershell
pandoc sorgente.md -o destinazione.estensione
```

**Esempi pratici:**

* **Markdown → Word (DOCX):**

  ```powershell
  pandoc traccia.md -o traccia.docx
  ```

* **Markdown → PDF (via LaTeX/xelatex):**

  ```powershell
  pandoc traccia.md -o traccia.pdf --pdf-engine=xelatex
  ```

* **Markdown → PDF (via Puppeteer/Chrome):**

  ```powershell
  pandoc traccia.md -o traccia.pdf --pdf-engine=puppeteer
  ```

* **Markdown → eBook (EPUB):**

  ```powershell
  pandoc traccia.md -o traccia.epub
  ```

* **Conversione con frontmatter specifico**: Se il file contiene `output: word_document`, Pandoc lo utilizzerà automaticamente se invocato tramite wrapper (come R), ma da riga di comando pura è preferibile specificare sempre l'output con `-o`.

> **💡 Come determina Pandoc il formato di output?**
> Per impostazione predefinita, Pandoc utilizza le **estensioni dei file** per determinare il formato (`.md` → markdown, `.docx` → Word, ecc.). Qualora si desideri forzare i formati (ad esempio quando il file non ha estensione), è possibile utilizzare i seguenti flag:

> * `-f` (from): formato di origine (es. `-f markdown`)
> * `-t` (to): formato di destinazione (es. `-t pdf`)
>
> **Esempio di forzatura manuale:**

> ```powershell
> pandoc miofile_senza_estensione -f markdown -t docx -o risultato.docx
> ```

---

## 🔍 4. Risoluzione dei problemi

Nel corso delle operazioni di conversione possono verificarsi diverse problematiche, la maggior parte delle quali riconducibile a configurazioni incomplete o conflitti tra componenti. La tabella seguente riassume i problemi più comuni con le relative soluzioni.

| Problema | Causa comune | Soluzione |
| :-- | :-- | :-- |
| **Mancano i segnalibri (PDF Bookmarks)** | Limite di Chrome/Puppeteer | Chrome non genera segnalibri. Utilizzare **Pandoc + XeLaTeX** o **WeasyPrint** per ottenerli. |
| **Opzioni Pandoc grigie/mancanti** | PATH non aggiornato | Chiudere e riaprire completamente l'editor dopo l'installazione di Pandoc. |
| **Permission denied (Errno 13)** | File PDF aperto | Chiudere Adobe Reader o il visualizzatore PDF prima di esportare. |
| **xelatex not found** | LaTeX mancante | Installare MiKTeX e riavviare l'editor. |
| **pdflatex not found (ma MiKTeX è installato)** | PATH utente incompleto | Aggiungere `.../MiKTeX/miktex/bin/x64` al Path utente, riavviare VS Code, verificare con `where pdflatex`. |
| **PDF LaTeX con aspetto "paper scientifico"** | Stile predefinito LaTeX | Utilizzare il task `Pandoc/LaTeX - Stile Preview` oppure le opzioni `-V geometry`, `-V mainfont`, `-V fontsize`. |
| **Error loading webview / Could not register service worker** | Cache WebView corrotta | Chiudere VS Code, pulire `%APPDATA%\Code\Service Worker`, `%APPDATA%\Code\Cache`, `%APPDATA%\Code\Code Cache`, poi riaprire. |
| **Pop-up MiKTeX continui** | Impostazione "Ask me" | Cambiare in "Always install missing packages" nella MiKTeX Console. |
| **eBook error (ebook-convert)** | Calibre mancante | Installare Calibre e riavviare l'editor. |
| **Caratteri strani nel terminale** | Mancanza Nerd Font | Impostare `Terminal > Integrated: Font Family` con un Nerd Font (es. `'CaskaydiaCove Nerd Font'`). |

---

## 🔖 5. Gestione dei segnalibri PDF

I documenti PDF generati con Pandoc e LaTeX presentano un indice laterale navigabile (segnalibri), mentre quelli prodotti tramite Puppeteer ne sono privi. Questa sezione approfondisce le ragioni tecniche di tale differenza e illustra le soluzioni disponibili.

### Perché Puppeteer non genera segnalibri?

Puppeteer utilizza il motore di stampa di Google Chrome. Per scelta tecnica, Google non ha ancora implementato la generazione dei segnalibri PDF a partire dagli elementi `<h1>`, `<h2>` e simili nel proprio motore di stampa "Print to PDF". Di conseguenza, i PDF generati tramite questo percorso risultano privi di navigazione strutturata.

### Soluzioni per ottenere segnalibri

Qualora i segnalibri siano fondamentali per le proprie dispense o documentazione, si raccomanda di utilizzare uno dei seguenti approcci:

1. **Pandoc + XeLaTeX (MiKTeX)**: Rappresenta lo standard per documenti strutturati. LaTeX genera automaticamente segnalibri a partire dalla struttura dei titoli del documento.

2. **WeasyPrint** (`pipx install weasyprint`): Si tratta di un motore Python che supporta sia i CSS moderni che i segnalibri PDF.
    * **⚠️ Requisito per Windows**: WeasyPrint richiede il runtime **GTK+** per funzionare. Se si riceve l'errore `libgobject-2.0-0`, installarlo tramite Winget:

        ```powershell
        winget install tschoonj.GTKForWindows
        ```

    * **Nota**: È caldamente consigliato utilizzare `pipx` invece di `pip` per installare strumenti CLI come WeasyPrint, in modo da isolarli in un ambiente dedicato ed evitare conflitti di dipendenze globali.
    * Comando di conversione: `pandoc file.md -o file.pdf --pdf-engine=weasyprint`

---

## 🎨 6. Personalizzazione del layout con WeasyPrint

WeasyPrint offre la possibilità di controllare con precisione margini, sfondo e tipografia attraverso un foglio di stile CSS dedicato. Questa sezione illustra come creare e utilizzare un file `pdf-style.css` per personalizzare l'aspetto dei documenti PDF generati.

### Esempio di foglio di stile

Il seguente codice CSS rappresenta un esempio di configurazione che può essere salvato come `pdf-style.css` nella cartella del progetto:

```css
@page {
    margin: 2cm; /* Regola i margini qui */
    background-color: transparent; /* Evita lo sfondo bianco forzato */
}

body {
    font-family: "Inter", sans-serif;
    color: #333;
}

/* Inline code */
code {
    background: #f4f4f4;
    padding: 2px 4px;
}

/* Fenced code block */
pre {
    background: #f4f4f4;
    padding: 8px 10px;
}

/* Evita micro-spostamenti del primo carattere nei blocchi ```text */
pre code {
    display: block;
    padding: 0;
    margin: 0;
    text-indent: 0;
    font-family: "Cascadia Mono", Consolas, "Courier New", monospace;
}
```

Il task configurato carica automaticamente questo file. È sufficiente modificarlo per applicare i cambiamenti desiderati al PDF finale.

> Nota: WeasyPrint può ignorare alcune proprietà CSS moderne (es. `overflow-x`, `user-select`, alcuni valori dinamici di `gap`) mostrando warning non bloccanti.

---

## ⌨️ 7. Esempi avanzati da riga di comando

Per gli utenti che desiderano un controllo granulare sulle conversioni, questa sezione presenta esempi dettagliati di utilizzo di Pandoc con WeasyPrint e diverse opzioni di configurazione.

### Conversione base con WeasyPrint

```powershell
pandoc documento.md -o documento.pdf --pdf-engine=weasyprint
```

### Conversione con CSS personalizzato (singolo file)

```powershell
# Utilizzare percorsi con slash / anche su Windows per evitare problemi di encoding
pandoc documento.md -o documento.pdf --pdf-engine=weasyprint --css=pdf-style.css
```

### Conversione con CSS e forzatura formato (file senza estensione)

```powershell
pandoc miofile -f markdown -o output.pdf --pdf-engine=weasyprint --css=style.css
```

### Conversione con variabili di pagina

In questo esempio, se il file `pdf-style.css` contiene una regola `@page { margin: ... }`, i valori passati con `-V margin-top` verrebbero **ignorati** (poiché il CSS ha la precedenza).

```powershell
# Esempio di "conflitto": il CSS prevale sui margini -V
pandoc documento.md -o documento.pdf --pdf-engine=weasyprint --css=pdf-style.css -V papersize=a4 -V margin-top=1.5cm
```

### Precedenza tra CSS e variabili Pandoc

Quando si utilizza WeasyPrint, quest'ultimo agisce come un browser che interpreta il layout. La precedenza per margini e dimensioni segue questo ordine:

1. **Massima precedenza (vince sempre)**: Il file **CSS** (`@page { margin: ... }`). Se è presente una direttiva nel CSS, WeasyPrint ignorerà qualunque comando esterno.

2. **Minima precedenza**: Le **variabili Pandoc** (`-V margin-top=...`). Risultano utili per test rapidi solo se il file CSS **non** definisce esplicitamente i margini.

**Raccomandazione pratica**: Per un flusso di lavoro stabile, gestire sempre l'estetica (margini, font, colori) esclusivamente all'interno del file `pdf-style.css`.

---

## ✅ 8. Workflow consigliato: tre profili standard

Per garantire efficienza e coerenza nella produzione dei documenti, si raccomanda l'utilizzo di tre profili standard, ciascuno ottimizzato per specifiche esigenze.

### Profilo A: Dispensa/Editabile (DOCX)

Questo profilo è indicato quando è necessario condividere un file modificabile con colleghi o studenti.

* Task: `📄 [GLOBALE] Markdown → DOCX (Pandoc)`
* Output: `.docx`
* Vantaggio: Compatibile con Word e LibreOffice

### Profilo B: PDF LaTeX "stile preview"

Questo profilo è indicato quando si desidera un PDF professionale ma meno "accademico" rispetto allo stile LaTeX predefinito.

* Task: `📄 [GLOBALE] Markdown → PDF (Pandoc/LaTeX - Stile Preview)`
* Output: `.pdf`
* Vantaggio: Buon equilibrio tra qualità tipografica e aspetto moderno

### Profilo C: PDF CSS con segnalibri

Questo profilo è indicato quando si desidera che il risultato somigli il più possibile all'anteprima HTML/CSS.

* Task: `📄 [GLOBALE] Markdown → PDF (WeasyPrint - Segnalibri)`
* Output: `.pdf`
* Vantaggio: Layout controllabile da CSS con segnalibri PDF

### Regola pratica di scelta

* Se è necessario modificare il file dopo l'esportazione: **DOCX**
* Se si desidera un PDF elegante e stabile: **LaTeX - Stile Preview**
* Se si desidera fedeltà visiva all'anteprima: **WeasyPrint**

### Tabella riassuntiva

| Profilo | Input | Output | Tempo medio* | Quando utilizzarlo |
| :-- | :-- | :-- | :-- | :-- |
| `DOCX (Pandoc)` | `.md` | `.docx` | 1-3 s | Revisione e modifica in Word/LibreOffice |
| `PDF LaTeX - Stile Preview` | `.md` | `.pdf` | 3-10 s | PDF curato, più stabile tipograficamente |
| `PDF WeasyPrint - Segnalibri` | `.md` + `pdf-style.css` | `.pdf` | 2-6 s | PDF simile all'anteprima con controllo CSS |

\* Tempi indicativi su documenti medi (1-20 pagine), possono variare in base a font, immagini e prestazioni del sistema.

---

## 🚀 9. Utilizzo globale

Per evitare di configurare ogni nuovo progetto individualmente, gli strumenti descritti sono stati resi disponibili **globalmente** sia nell'editor AntiGravity che in VS Code.

### Come utilizzare i task globali

1. In qualunque file Markdown aperto in **AntiGravity** o **VS Code**, premere la scorciatoia: **`Ctrl + Shift + B`** (oppure accedere al menu *Terminal → Run Task*).

2. Selezionare uno dei task contrassegnati come **`[GLOBALE]`**:
   - `📄 [GLOBALE] Markdown → DOCX (Pandoc)`
   - `📄 [GLOBALE] Markdown → PDF (Pandoc/LaTeX)`
   - `📄 [GLOBALE] Markdown → PDF (WeasyPrint - Segnalibri)`
   - `📄 [GLOBALE] Markdown → PDF (Pandoc/LaTeX - Stile Preview)`

### Personalizzazione estetica

Lo stile PDF è centralizzato nel file: `C:/Users/genna/OneDrive/Pandoc-Style/pdf-style.css`. Qualunque modifica apportata a questo file verrà applicata a **tutti** i PDF generati dai task globali in entrambi gli editor.

---

## 🛠 10. Configurazione tecnica dei task globali

Per chi desideri replicare questa configurazione su un altro computer o modificarla manualmente, questa sezione fornisce i dettagli tecnici necessari.

### Posizione dei file di configurazione

I task globali non risiedono nella cartella del progetto, ma nelle impostazioni utente dell'editor:

* **AntiGravity**: `%APPDATA%\Antigravity\User\tasks.json`
* **VS Code**: `%APPDATA%\Code\User\tasks.json`

> [!TIP]
> È possibile aprire velocemente queste cartelle incollando i percorsi sopra nella barra degli indirizzi di Esplora File.

### Codice JSON da inserire

Copiare e incollare il seguente contenuto nel file `tasks.json`. Se il file esiste già, aggiungere i task all'array `"tasks"`:

> Nota: il blocco seguente è valido sia per `%APPDATA%\Code\User\tasks.json` che per `%APPDATA%\Antigravity\User\tasks.json`.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "📄 [GLOBALE] Markdown → DOCX (Pandoc)",
            "type": "shell",
            "command": "$input = '${file}'; $output = [System.IO.Path]::ChangeExtension($input, '.docx'); pandoc $input -o $output; Write-Host \"✅ Esportato: $output\"",
            "options": {
                "shell": { "executable": "pwsh", "args": ["-NoProfile", "-Command"] }
            }
        },
        {
            "label": "📄 [GLOBALE] Markdown → PDF (Pandoc/LaTeX)",
            "type": "shell",
            "command": "$input = '${file}'; $output = [System.IO.Path]::ChangeExtension($input, '.pdf'); pandoc $input -o $output --pdf-engine=xelatex; Write-Host \"✅ Esportato: $output\"",
            "options": {
                "shell": { "executable": "pwsh", "args": ["-NoProfile", "-Command"] }
            }
        },
        {
            "label": "📄 [GLOBALE] Markdown → PDF (WeasyPrint - Segnalibri)",
            "type": "shell",
            "command": "$input = '${file}'; $output = [System.IO.Path]::ChangeExtension($input, '.pdf'); pandoc $input -o $output --pdf-engine=weasyprint --css='file:///C:/Users/genna/OneDrive/Pandoc-Style/pdf-style.css'; Write-Host \"✅ PDF con segnalibri generato: $output\"",
            "options": {
                "shell": { "executable": "pwsh", "args": ["-NoProfile", "-Command"] }
            }
        },
        {
            "label": "📄 [GLOBALE] Markdown → PDF (Pandoc/LaTeX - Stile Preview)",
            "type": "shell",
            "command": "$input = '${file}'; $output = [System.IO.Path]::ChangeExtension($input, '.pdf'); pandoc $input -o $output --pdf-engine=xelatex -V documentclass=article -V papersize=a4 -V geometry:margin=1.6cm -V fontsize=11pt -V linestretch=1.2 -V mainfont='Segoe UI' -V sansfont='Segoe UI' -V monofont='Cascadia Mono' --highlight-style=github; Write-Host \"✅ PDF LaTeX stile preview generato: $output\"",
            "options": {
                "shell": { "executable": "pwsh", "args": ["-NoProfile", "-Command"] }
            }
        }
    ]
}
```

### Note importanti sui percorsi

Per garantire che WeasyPrint carichi correttamente lo stile CSS su Windows (in particolare su OneDrive), utilizzare sempre il formato URI `file:///` con gli slash in avanti `/`:
`--css='file:///C:/Users/tuo_utente/Percorso/file.css'`

---

## ⚡ 11. Diagnostica rapida

Qualora qualcosa smetta di funzionare, si raccomanda di eseguire i seguenti controlli nell'ordine indicato.

### 1. Verifica dei binari

```powershell
where pandoc
where pdflatex
```

### 2. Verifica delle versioni

```powershell
pandoc --version
pdflatex --version
```

### 3. Verifica delle impostazioni di Markdown Preview Enhanced

Controllare il file `./.vscode/settings.json` del progetto:

```json
{
  "markdown-preview-enhanced.pandocPath": "pandoc",
  "markdown-preview-enhanced.latexEngine": "pdflatex"
}
```

### 4. Test CLI minimo

Questo test isola i problemi dell'estensione verificando il funzionamento diretto dei motori di conversione:

```powershell
pandoc .\file.md -o .\file.pdf --pdf-engine=pdflatex
pandoc .\file.md -o .\file-weasy.pdf --pdf-engine=weasyprint --css='file:///C:/Users/tuo_utente/OneDrive/Pandoc-Style/pdf-style.css'
```

### 5. Problemi di visualizzazione PDF in VS Code

Se il PDF non si apre in VS Code ma si apre correttamente in altre applicazioni:
- Chiudere VS Code.
- Pulire la cache WebView nelle cartelle `%APPDATA%\Code\Service Worker`, `%APPDATA%\Code\Cache`, `%APPDATA%\Code\Code Cache`.
- Riaprire VS Code.

### 6. Artefatti nei blocchi di codice con WeasyPrint

Se WeasyPrint mostra piccoli artefatti nei blocchi di codice:
- Verificare che in `pdf-style.css` esista il reset su `pre code` con le proprietà: `display: block; padding: 0; margin: 0; text-indent: 0;`.
