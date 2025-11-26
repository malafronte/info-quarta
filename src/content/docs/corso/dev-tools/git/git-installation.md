---
title: "Git Installation"
description: " "
sidebar:
  label: "Git Installation"
  order: 70
---
<style>
p {text-align: justify}
img {display: block; margin: 0 auto;}
</style>


## Installazione di Git

*Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.*
Il sito ufficiale di Git è <https://git-scm.com/>.

Per installare Git su Windows si può utilizzare il comando winget:

```ps1
winget install --id Git.Git -e --source winget
```

{{< bs/alert >}}
{{< markdownify >}}
L'installazione eseguita tramite winget installa Git con le impostazioni di default, senza dare la possibilità all'utente di scegliere tra le varie opzioni disponibili. Questa opzione è indicata per utenti esperti che successivamente sanno modificare le impostazioni di funzionamento di Git con i comandi opportuni.
{{< /markdownify >}}
{{< /bs/alert >}}

Per utenti principianti è più opportuno usare l'installer per Windows, scaricabile da <https://git-scm.com/download/win>, oppure da <https://gitforwindows.org/> e seguire i passaggi richiesti dell'installer. In particolare, è utile soffermarsi su alcuni punti dell'installazione per essere sicuri di aver configurato Git nel modo più utile per un utente inesperto su Windows:

1. Scaricare l'installer di Git for Windows a 64 bit
2. Far partire l'installer accettando le condizioni di default, ma selezionare anche i componenti opzionali per Windows.

    ![Schermata Installer Git](./git-installation/installerGit1.png)

3. Proseguire nell'installazione e, arrivati al punto in cui l'installer chiede di scegliere il default editor, selezionare Visual Studio Code.

    ![Schermata Installer Git 2](./git-installation/installerGit2.png)

4. Impostare `main` come nome di default del branch principale per i nuovi repository

    ![Schermata Installer Git 3](./git-installation/installerGit3.png)

5. Impostare il path in modo che Git sia richiamabile dalla command line e anche da software di terze parti

    ![Schermata Installer 4](./git-installation/installerGit4.png)

6. Utilizzare OpenSSL per l'encryption

   ![Schermata Installer Git 5](./git-installation/installerGit5.png)

7. Impostare l'opzione core.autocrlf a true. Questa configurazione è quella raccomandata per utenti Windows che lavorano su progetti cross platform. Si veda per approfondimento anche la [guida su GitHub](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings).

   ![Schermata Installer Git 6](./git-installation/installerGit6.png)

8. Usare MinTTY come emulatore di terminale per la Git Bash

    ![Schermata Installer Git 7](./git-installation/installerGit7.png)

9. Lasciare come opzione di default del `git pull` il fast-forward o la merge

    ![Schermata Installer Git 8](./git-installation/installerGit8.png)

10. <mark>Importante!</mark> Utilizzare il cross platform Credential Manager per l'accesso autenticato ai repository remoti.  
Questa opzione permetterà di effettuare l'accesso remoto con il protocollo https e di memorizzare in maniera permanente le credenziali di accesso.

    ![Schermata Installer Git 9](./git-installation/installerGit9.png)

11. Abilitare il file system caching

    ![Schermata Installer Git 10 ](./git-installation/installerGit10.png)

12. Procedere con l'installazione

    ![Schermata Installer Git 11 ](./git-installation/installerGit11.png)

Dopo aver installato Git, si chiuda il terminale e se ne riapra un altro per fare in modo che il comando git sia riconosciuto nella shell.

Si digiti il comando `git version` per conoscere la versione di Git installata
