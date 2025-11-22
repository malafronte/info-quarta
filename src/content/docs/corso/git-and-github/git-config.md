---
title: Git config
description: Configurazione di Git (nome, email, editor, credenziali e SSH)
sidebar:
  order: 1
  badge:
    text: Demo
    variant: note
---


## Hello

In questa sezione configuriamo Git dopo l'installazione: identità utente, editor predefinito, gestione delle credenziali e chiavi SSH.

## Impostare nome ed email

Esegui una volta per configurare l'identità globale:

```bash
git config --global user.name "Nome Cognome"
git config --global user.email nome.cognome@example.com
```

## Editor predefinito (facoltativo)

Esempio per Visual Studio Code:

```bash
git config --global core.editor "code --wait"
```

perché?


```cs wrap=false
using Microsoft.EntityFrameworkCore;

namespace DbUtilizziPC.Model;
//https://learn.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations#index-uniqueness
[Index(nameof(Nome), IsUnique = true)]
public class Classe
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Aula { get; set; } = null!;
    //navigation property
    public ICollection<Studente> Studenti { get; set; } = null!;
    public override string ToString()
    {
        return $"{{{nameof(Id)} = {Id}, {nameof(Nome)} = {Nome}, {nameof(Aula)} = {Aula}}}";
    }
}
```

questo è testo invece

```text wrap=true

using Microsoft.EntityFrameworkCore;

namespace DbUtilizziPC.Model;
//https://learn.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations#index-uniqueness
[Index(nameof(Nome), IsUnique = true)]
public class Classe
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Aula { get; set; } = null!;
    //navigation property
    public ICollection<Studente> Studenti { get; set; } = null!;
    public override string ToString()
    {
        return $"{{{nameof(Id)} = {Id}, {nameof(Nome)} = {Nome}, {nameof(Aula)} = {Aula}}}";
    }
}

```

## Memorizzazione credenziali

Su sistemi moderni Git usa un helper di credenziali. Per verificarlo:

```bash
git config --global credential.helper
```

## SSH per GitHub

1. Genera una nuova chiave (se non presente):

   ```bash
   ssh-keygen -t ed25519 -C "nome.cognome@example.com"
   ```

2. Avvia l'agente e aggiungi la chiave:

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copia la chiave pubblica e aggiungila a GitHub (Settings → SSH and GPG keys):

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

## Verifica configurazione

```bash
git config --list --show-origin
```


## Impostare nome ed email 2

Esegui una volta per configurare l'identità globale:

```bash
git config --global user.name "Nome Cognome"
git config --global user.email nome.cognome@example.com
```

## Editor predefinito (facoltativo) 2

Esempio per Visual Studio Code:

```bash
git config --global core.editor "code --wait"
```

```cs wrap=false
using Microsoft.EntityFrameworkCore;

namespace DbUtilizziPC.Model;
//https://learn.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations#index-uniqueness
[Index(nameof(Nome), IsUnique = true)]
public class Classe
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Aula { get; set; } = null!;
    //navigation property
    public ICollection<Studente> Studenti { get; set; } = null!;
    public override string ToString()
    {
        return $"{{{nameof(Id)} = {Id}, {nameof(Nome)} = {Nome}, {nameof(Aula)} = {Aula}}}";
    }
}


```

questo è testo invece

```text wrap=true

using Microsoft.EntityFrameworkCore;

namespace DbUtilizziPC.Model;
//https://learn.microsoft.com/en-us/ef/core/modeling/indexes?tabs=data-annotations#index-uniqueness
[Index(nameof(Nome), IsUnique = true)]
public class Classe
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Aula { get; set; } = null!;
    //navigation property
    public ICollection<Studente> Studenti { get; set; } = null!;
    public override string ToString()
    {
        return $"{{{nameof(Id)} = {Id}, {nameof(Nome)} = {Nome}, {nameof(Aula)} = {Aula}}}";
    }
}

```

## Memorizzazione credenziali 2

Su sistemi moderni Git usa un helper di credenziali. Per verificarlo:

```bash
git config --global credential.helper
```

## SSH per GitHub 2

1. Genera una nuova chiave (se non presente):

   ```bash
   ssh-keygen -t ed25519 -C "nome.cognome@example.com"
   ```

2. Avvia l'agente e aggiungi la chiave:

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copia la chiave pubblica e aggiungila a GitHub (Settings → SSH and GPG keys):

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

## Verifica configurazione 2

```bash
git config --list --show-origin
```