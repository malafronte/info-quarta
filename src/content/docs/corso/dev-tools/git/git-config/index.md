---
title: "Git Config"
# linkTitle:
date: 2023-09-17T19:08:33+02:00
draft: false
type: docs
description: " "
noindex: false
comments: false
nav_weight: 20
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

## Configurazione di Git

Per la configurazione di Git ci sono diverse guide, tra cui quelle riportate nei link seguenti:

<https://docs.github.com/en/get-started/quickstart/set-up-git>

<https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git>

[<mark>https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration</mark>](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)

Si apra la Git Bash, oppure Powershell e si digiti il comando seguente per configurare il `nome utente`:

```sh
git config --global user.name "Mona Lisa"
```

Si configuri la `e-mail` (la stessa usata per l'account di GitHub):

```sh
git config --global user.email "YOUR_EMAIL"
```

Per la scelta dell'indirizzo di posta elettronica da usare con GitHub ci sono diverse opzioni se si vuole tutelare la privacy del proprio indirizzo di posta. Gli aspetti più importanti sono riassunti nei link seguenti su GitHub:

[setting your commit email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)

[setting your email address for every repository on your computer](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address#setting-your-email-address-for-every-repository-on-your-computer)

Per le attività di laboratorio è sufficiente utilizzare la mail della scuola.  

Per verificare della configurazione di Git esiste un comando apposito:

```sh
git config --list
```

Esiste anche una versione estesa del comando precedente:

```sh
git config --list --show-origin --show-scope
```

Questa versione del comando `git config --list` permette di ottenere informazioni aggiuntive importanti. L'opzione `--show-origin` mostra dove si trova il file che contiene le impostazioni di Git. L'opzione `--show-scope` mostra l'ambito di validità dell'impostazione. Per maggiori dettagli si rimanda alla [sezione specifica](https://git-scm.com/docs/git-config) manuale di Git e al link su StackOverflow [where is the global git config data stored](https://stackoverflow.com/a/2115116).

Le impostazioni di Git possono essere salvate su variabili di tre livelli, come descritto [qui](https://stackoverflow.com/a/66108560):

1. **System**: Queste variabili sono disponibili per ogni utente del sistema e sono memorizzate in

    `[path]/etc/gitconfig.`  

    Esempio: C:/Program Files/Git/etc/gitconfig

    È possibile passare queste variabili a git con l'opzione `--system`. Ciò richiede di essere amministratori.
2. **Global**: Le variabili globali sono disponibili per l'utente corrente per tutti i progetti e sono memorizzate in

    `~/.gitconfig or ~/.config/git/config`

    Esempio: C:/Users/Username/.gitconfig

   È possibile passare queste variabili a git con l'opzione `--global`.
3. **Local**: Le variabili locali contengono impostazioni valide solo per il progetto corrente e sono memorizzate in

    `[gitrepo]/.git/config`  
    Esempio: C:/Users/MyProject/.git/config

    È possibile passare queste variabili a git con l'opzione `--local`.

Nel caso in cui si voglia configurare, ad esempio, Visual Studio Code, come editor predefinito di Git, l'istruzione è:

```sh
git config --global core.editor "code --wait"
```

Per configurare altri editor si procede in maniera analoga; per i dettagli si può vedere [la guida di GitHub](https://docs.github.com/en/get-started/getting-started-with-git/associating-text-editors-with-git).
