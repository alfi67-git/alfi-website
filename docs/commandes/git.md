# Commandes Git

## 🛡️ Git, c'est quoi ?

**Git** est un **système de gestion de versions**. Il permet de **suivre, sauvegarder et collaborer** sur des projets, sans rien perdre en route.


🔹 Chaque utilisateur travaille **localement** et peut ensuite **synchroniser** avec d’autres via des plateformes comme GitHub ou GitLab.

---

## 🏗 Les concepts de base
🔹 **Repository (repo)** : Le dossier qui contient tout ton projet versionné.

🔹 **Commit** : Un "instantané" de ton projet avec un message explicatif.

🔹 **Branch** : Une "branche" permet de bosser sur des fonctionnalités sans tout casser.

🔹 **Merge** : Fusionner les changements d’une branche dans une autre.

🔹 **Clone** : Copier un projet existant pour le modifier localement.

🔹 **Push** : Envoyer tes modifications sur un serveur distant.

🔹 **Pull** : Récupérer les changements faits par d’autres.

---

## 🛠 Les commandes Git essentielles

### Configurer git

```bash
git config --global user.name "username"
git config --global user.email "email@example.com"
```
### Vérifier configuration git
```bash
git config --list
```
### Supprimer une configuration
```bash
git config --global --unset user.name
git config --global --unset user.email
```

### Initialiser un nouveau projet Git
```bash
git init
```

### Cloner un projet existant
```bash
git clone https://github.com/user/repo.git
```

### Vérifier l'état du projet
```bash
git status
```

### Ajouter un fichier pour le prochain commit
```bash
git add fichier.txt
```

### Faire un commit avec un message
```bash
git commit -m "Ton message ici"
```

### Envoyer tes commits sur le serveur distant
```bash
git push
```

### Récupérer les dernières modifications
```bash
git pull
```

### Créer et changer de branche
```bash
git checkout -b nouvelle-branche
```

### Fusionner une branche dans l'actuelle
```bash
git merge nom-de-la-branche
```

### Voir l'historique des commits
```bash
git log
```
