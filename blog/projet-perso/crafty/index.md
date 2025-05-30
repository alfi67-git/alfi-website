---
slug: crafty
title: 🛠️ Installer et monitorer un serveur minecraft avec Crafty Controller
authors: [alfi]
tags: [docker, minecraft, projets]
date: 2024-11-19T16:05:12+01:00
---
Aujourd'hui, on va voir comment installer un serveur Minecraft et le monitorer avec une interface web nommé *Crafty Controller* le tout fonctionnant sous Docker installé sur un serveur Debian.

<!--truncate-->
## Les outils utilisés
### C'est quoi [Docker](https://docker.com) ?
Pour faire ultra simple, docker est une application de virtualisation.
De la même façon que l'on peut virtualiser des Systèmes d'Exploitations, avec VirtualBox, VMware, etc, avec Docker on peut virtualiser des applications.
Utiliser Docker à plusieurs avantages pour ce projet:
- Se déployer rapidement 
- Isoler l'environnements
- La portabilité

### C'est quoi [Crafty](https://craftycontrol.com) ?
Crafty Controller, ou comme je l'appelle plus simplement *Crafty*, est un projet gratuit et open-source, qui permet, à l'aide d'une interface web, d'administrer un ou plusieurs serveur Minecraft.

## Installation
C'est possible d'installer Crafty de différentes façons. Soit directement sur le système (mais c'est chiant et à gérer c'est un bordel, je le sais d'expérience) ou avec Docker et docker compose (qui pour le coup est beaucoup plus simple).

Pour son installation avec Docker, il y a différentes façon de l'installer. Que ce soit avec le CLI, avec le hub ou encore avec Docker Compose.

Vu que l'équipe de Crafty proposent un fichier docker-compose tout prêt, on va utiliser ça.

Voici donc le fichier de configuration de base pour Crafty.
```yml
version: '3'

services:
  crafty:
    container_name: crafty_container
    image: registry.gitlab.com/crafty-controller/crafty-4:latest
    restart: always
    environment:
        - TZ=Etc/UTC
    ports:
        - "8443:8443" # HTTPS
        - "8123:8123" # DYNMAP
        - "19132:19132/udp" # BEDROCK
        - "25500-25600:25500-25600" # MC SERV PORT RANGE
    volumes:
        - ./docker/backups:/crafty/backups
        - ./docker/logs:/crafty/logs
        - ./docker/servers:/crafty/servers
        - ./docker/config:/crafty/app/config
        - ./docker/import:/crafty/import
```
On va donc créer un fichier du nom de `docker-compose.yml` et coller les recommendation des devs dans le fichier.

:::info
Bien penser à changer la time zone en : Etc/Europe.
J'ai déjà eu des soucis d'horloge en ayant oublié de changer ce paramètre.
:::


On va globalement pas trop toucher à ce fichier, qui est bien dans l'ensemble. On peut donc lancer docker avec la commande: `docker-compose up -d && docker-compose logs -f`.

Vu que crafty est bien fait, l'installation va se faire toute seule et prend normalement que quelques secondes

On peut d'ailleurs voir sur la capture suivante l'installation s'effectuer:
![installation de crafty à l'aide de docker](./images/docker1.png)

## Interface de Crafty
### Première connexion
Maintenant que notre installation s'est bien déroulée, il est temps d'aller jeter un oeil au niveau de l'interface web.
Crafty est accessible via `localhost`, `127.0.0.1` ou l'`ip de la machine`. Mais toujours avec **https://** devant.
Pour cet exemple j'y accède de avec la manière `https://127.0.0.1:8443/`, mais en temps normal, je rentre l'adresse ip du serveur où est hébergé crafty.

On se retrouve donc face à set interface:
![page de connexion à crafty](./images/crafty_ui.png)

Pour une première connexion, il faut utiliser le username `admin` et le `mot de passe` générer dans un fichier situer ici : `app/config/default-creds.txt` de façon général. Mais bon, vu que je trouvais pas j'ai fini par lancé une recherche afin de trouver le fichier, qui finalement était pas si loin que ça:
![mot de passe de connexion session admin](./images/passwd.png)

:::info
À chaque fois que j'ai essayé d'accèder au compte admin pour une première connexion, j'ai TOUJOURS un message d'erreur où la connexion est impossible. Je sais pas si c'est moi qui suis maudit ou si c'est buggé 😮‍💨.
:::

Cette fois-ci j'avais un petit peu d'espoir que ça fonctionne, mais comme à chaque installation, j'ai une erreur `Incorrect username or password`. Donc on va utiliser la méthode `Forgot Password` qui va activer un compte temporaire qui nous pemettra de définir le mot de passe de notre choix pour le compte `admin`.

Lorsque l'on clic sur le boutton `Forgot Password`, le compte `Lockout` s'active pendant 1H avec un mot de passe temporaire, trouvable dans les logs du container:
`docker logs {id container}`
![login et password du compte auti-lockout](./images/lockout.png)

Une fois ces identifiants rentré, cela nous donne donc accès à l'interface permettant de modifier le mot de passe admin.

Voici à quoi elle ressemble:
![page de gestion auti-lockout](./images/ath_lockout.png)

### Dashboard
Maintenant qu'on est connecté, nous voici face à la page d'accueil. C'est le dashboard.
D'ici on peut accéder aux paramètres et créer des serveurs.
Si des serveurs sont crées, ils s'afficheront ici.

![dashboard crafty](./images/interface_crafty.png)

### Création d'un serveur
Avec Crafty, il est possible de choisir entre un serveur Minecraft Java ou Bedrock.
Choix à définir en sélectionnant Minecraft-Bedrock ou Minecraft-Java au dessus du panneau **Create New Server**.

---

Voici l'outil qui permet de créer des serveurs. Il permet de sélectionner plusieurs options personnalisable pour notre serveur.
![créer un nouveau serveur](./images/server-builder2.png)
1. **Server Type**: Permet de choisir entre soit la configuration du serveur minecraft ou d'un serveur proxie.
2. **Server Select**: au fil des années, plusieurs type de serveur se sont créer, *vanilla*, *paper*, *fabric*, *folia*, *forge-installer* et *purpur*. (Paper est recommandé si l'installation de plugins est souhaité)
3. **Server Version**: sélectionne la version du jeu sur lequel le serveur doit tourner.
4. **Server Name**: Nom que vous souhaitez donner au serveur (obvious celui-ci☝🤓).
5. **Minimum/Maximum Memory, Server Port**: Détermine la minimum et le maximum de ram que vous souhaitez allouer au serveur. Vivement recommandé de mettre au minimum 2Go et 6Go au max pour une **bonne** utilisation entre ami.

:::warning
Bien penser à changer le port, des bots qui scannent les ports Minecraft sont fréquent. Exemple: Remplacer **25565** par **25570**.
:::

### Démarrage du serveur
On peut maintenant démarrer le serveur en cliquant sur le bouton '**Start**' ou depuis le dashboard en appuyant sur le petit triangle.
Si c'est le premier démarrage du serveur, il va demander d'accepter les [EULA de Minecraft](https://www.minecraft.net/fr-fr/eula).

![EULA Minecraft](./images/minecraft-eula.png)

Une fois les EULA acceptée on peut une nouvelle fois lancer le serveur et s'assurer de bien avoir ouvert le port défini plus haut qui est le port de connexion Minecraft et qui permettra à vos amis de se connecter à votre serveur.

---

Et voilà, vous savez à présent installer Crafty Controller avec Docker et lancer votre premier serveur Minecraft !