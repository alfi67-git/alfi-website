---
slug: pfe-ansible
title: 🎓 PFE BAC+3 | Déploiement automatique de fichier de configuration de switch avec Ansible
authors: [alfi]
tags: [cesi, pfe]
date: 2025-02-04T19:02
---

Rebelote, pour la validation de ma 3e année d'étude, je dois réaliser un nouveau projet de fin d'étude. Cette fois-ci ça sera sur l'automatisation du déploiement de fichier de configuration de switch à l'aide d'Ansible.

:::warning
Cet article est encore en cours de rédaction, je mettrais les dates lors d'ajouts de nouveaux éléments, alors n'hésitez pas à revenir plus tard pour voir l'évolution du projet.
:::

<!--truncate-->

---
## Présentation globale du projet
Cette année, le but du projet est de permettre là mise à jour et la sauvegarde de fichier de configuration de switch HPE, le tout avec l'utilisation de Git pour sauvegarder les configs et de Ansible pour automatiser le déploiement sur l'ensemble du parc. Bah ouais, on va pas sauvegarde/déployer des fichiers de config sur 2025 switchs à la mano.

Donc pour faire court, ce projet doit permettre :
- La mise à jour automatique des fichiers de conf
- Sauvegarder les fichiers de configuration sur Git
- L'automatisation de déploiement de fichier de configuration des switchs
- Permettre le rollback en cas de défaillance

## Technologies utilisées

### 🔗 Git, c'est quoi ?

Git c'est un **système de gestion de versions** qui permet de **suivre l’évolution des fichiers** dans un projet. Ici on va s'en servir pour stocker l'ensemble des fichiers
de configuration de nos switchs.

Avec Git, tu peux :

✅ **Sauvegarder et suivre les modifications** d’un projet au fil du temps

✅ **Revenir à une version précédente** en cas d’erreur

✅ **Travailler à plusieurs** sans écraser les modifications des autres

✅ **Expérimenter avec des branches** avant d’intégrer des changements dans le projet principal


### ⚙️ Ansible, c'est quoi ?

Ansible c'est un **outil d'automatisation** qui permet de **gérer des serveurs, installer des logiciels et configurer des systèmes** de manière simple et efficace. Ici il servira à administrer les switchs.

Avec Ansible, tu peux :

✅ **Gérer plusieurs machines en même temps** avec un seul script

✅ **Automatiser les tâches répétitives** comme l’installation la sauvegarde de fichiers de configuration

✅ **Éviter les erreurs humaines** grâce à des configurations reproductibles

✅ **Utiliser un système sans agent**, car Ansible fonctionne via **SSH** (pour Linux) et **WinRM** (pour Windows)


### 💡 Comment ça marche ?
Pour que vous puissiez mieux comprendre le fonctionnement du projet, il me parrait plutôt évident d'expliquer le fonctionnement de Ansible.

Ansible se compose de plusieurs éléments :


![Node Manager](./images/node_manager.png)

> Un **node manager**, ou ***control node***,  est la machine sur laquelle est installée Ansible et servira à contrôler les nodes grâce à une connexion SSH en utilisant les commande `ansible`et `ansible-playbook`. Ça peut être n’importe quelle machine Linux, mais pas de Windows.


![Node](./images/node.png)

> Un **node** (ou ***managed node***, ou ***host***) est un poste connecté au node manager en SSH, et sur lequel Ansible viendra pousser les tâches d’automatisation. Ansible n’est pas installé sur les nodes.

![rôle ansible](./images/role.png)
> Un rôle est une structure arborescente constituée de répertoires et de fichiers de configuration YAML, qui vont avoir pour fonction d’installer tel ou tel système. Les rôles peuvent être imbriqués et interdépendants les uns des autres.

![Playbook](./images/playbook.png)
> Un playbook est un fichier de configuration YAML qui contient un ensemble de tâche qui seront executé. Chaque playbook peut être constitué d'option, et fait appel à un ou plusieurs rôles. 

#### Exemple de playbook
```yaml title="install_apache.yml"
---
- name: Installer Apache
  hosts: webservers
  become: yes  # Exécuter en tant que root
  tasks:
    - name: Installer le package Apache
      apt:
        name: apache2
        state: present
```
👉 Ici, Ansible va se connecter aux machines du groupe webservers et installer Apache.

![Tâche](./images/task.png)
>Une tâche est une instruction décrite en YAML dans un fichier de configuration. Chaque tâche utilise un module ainsi que quelques éventuels arguments supplémentaires.

![Modules ](./images/modules.png)
> Un module est un programme utilisé pour exécuter une tâche ou une commande Ansible. Chaque tâche utilise un module et un seul, qui peut prendre des arguments pour être exécuté de manière personnalisée. Ansible fournit de nombreux modules, mais il est possible d'utiliser ceux de la commaunauté, où de créer les siens.

#### Pour la faire courte 
- un rôle contient un ou plusieurs fichiers de configuration YAML.

- un fichier de configuration contient une ou plusieurs tâches

- une tâche fait appel à un module.

- un module à plusieur arguments spécifié


## MindMap du projet
Retrouver ici la MindMap du projet, où on peut voir l'ensemble des playbooks que j'ai à réalisé durant de projet :
![mindmap projet ansible](./images/mindmap.svg)

Oui, elle est giganteste, mais c'est parce qu'elle est découpée en deux grosses parties. La partie qui concerne le réseau et la partie qui concerne Ansible.

Le but de cette MindMap était de vraiment découper l'ensemble du projet en sous catégorie pour avoir une vision globale de ce qu'il y avait à faire.

## Informations sur le lab
Avant le déploiement en prod, c'est important d'avoir un lab où tester les différents playbook à executer.

### 🖥 Configuration du lab:

1. **1 VM de contrôle** où Ansible est installé.
2. **Switch HPE 5130** un vieux switch qui servira pour les tests et qui ressevra l'ensemble des commandes executé grâce aux playbooks.

## Mise en place de l'environnement

Bon, comme c’est la première fois que je fais du Ansible et que je n’ai absolument AUCUNE idée de comment ça fonctionne, on va faire la bonne vieille technique de tuto. 

Là en l'occurrence le “*tuto*” que j’ai suivi est celui d’Openclassrooms, donc globalement tout ce qui sera dans cette première partie de l’article sera tiré de ce que j’ai fais avec le cours d’Openclassrooms. 

Du moins c’est que j’avais commencé à faire avant de me rendre compte que le cours n’était pas maintenu, qu’il avait pleins de problèmes, et que les playbooks ne respectaient pas les bonnes pratiques, j’ai donc fini par attaquer directement la création de playbook pour le projet et je me suis dit que j’apprendrais sur le tas à force de faire et de me prendre plein d’erreurs dans les dents.

Bon maintenant que ça c’est dit, il est temps de mettre en place un environnement pour pouvoir travailler et apprendre à se servir d’Ansible.

### Mise en place d'Ansible
Le but ici est d’avoir une infrastructure qui puisse discuter avec le switch. J’avais déjà, lors de précédents mois, travaillé sur une infrastructure virtualisée pour apprendre à utiliser Ansible. J’étais partie dans cet optique également pour ce projet, or impossible de ping le switch depuis mes machines virtuelles sur WorkStation. J’ai pas voulu me casser trop la tête, j’ai donc décider de passer par WSL qui lui, pouvait ping le switch de test.

Le projet Ansible sera donc héberger sur un WSL debian.

J’ai donc monté un environnement virtuel et installer les différents paquets nécessaire à l’utilisation de Ansible.

Un environnement virtuelle, est un environnement d'exécution isolé qui permet de gérer de façon indédamment du projet, les dépendances, scripts et versions de Python. En gros, t'as une vieille lib qu'est en 1.6 mais qui fonctionne qu'avec une vieille version de Python, tu créer ton venv et ça te permet de downgrade ton Python et d'utiliser ta lib uniquement dans cet environnement. Le but c'est d'éviter les conflits entre projets qui utilisent des versions différentes d'une même bibliothèdes.
Resultat : chaque projet peut tourner avec sa stack précise, sans polluer l’environnement global.

Donc pour en mettre un en place, il faut commencer par installer différents packages, on créer ensuite le venv, une fois fait, il ne manque plus qu'à l'activer :
```bash
er0x@U2023028:~$ sudo apt install python3 python3-virtualenv sshpass
er0x@U2023028:~$ python3 -m venv venv-ansible       # pour créer le répertoir
er0x@U2023028:~$ source venv-ansible/bin/activate   # pour activer l'environnement virtuel
(venv-ansible) er0x@U2023028:~$ pip install ansible # on install ansible dans le venv
(venv-ansible) er0x@U2023028:~$ pip3 install argcomplete
(venv-ansible) er0x@U2023028:~$ activate-global-python-argcomplete
```
On sait qu'on est dans l'environnement quand on voit son nom affiché entre parenthèse avant le prompt du terminal.

Ansible est correctement installé, il faut maintenant vérifié qu’il fonctionne en exécutant une commande qui exécutera la commande echo 'salut B0B' :
```bash
(venv-ansible) er0x@U2023028:~$ ansible all -i "localhost," -c local -m shell -a 'echo Salut B0B'
localhost | CHANGED | rc=0 >>
Salut B0B
```
Il est à présent temps de créer et configurer un répertoire pour le projet:

```bash
(venv-ansible) er0x@U2023028:~$ mkdir ansible-project && cd ansible-project
(venv-ansible) er0x@U2023028:~/ansible-project$ ansible-config init --disabled > ansible.cfg
(venv-ansible) er0x@U2023028:~/ansible-project$ touch hosts.ini
```

Avec la commande `ansible-config init` on génère une fichier de configuration standard avec toutes les sections et options courantes que je vais ensuite adapté à mes besoins et envie pour le projet.

Entre autre, voici le fichier de configuration :

```bash title="ansible.cfg"
[defaults]
action_warnings=True
force_color=True
inventory=/home/er0x/ansible-project/inventory/hosts
remote_user=ansible
```

<!-- ### Ping vers le switch
Pour faire ça, il faut d'abors définir le switch qui va servir de node. Soit on le défini dans `/etc/ansible/ansible.cfg` soit il est possible de créer une fichier `hosts.ini` à la racine du projet. C'est cette solution qui a été choisi.

Le fichier `hosts.ini` se compose donc de la sorte :
```ini title="hosts.ini"
[switch_test]
sw-ansible-test.domain.local ansible_user=ansible
```

Maintenant il n'y a plus qu'à vérifier la connexion :
```bash
(venv-ansible) er0x@[debian]:~$ ansible -i hosts.ini -m ping switch_test --user er0x --ask-pass
SSH password:
sw-test-ansible.domain.local | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3.11"
    },
    "changed": false,
    "ping": "pong"
}
``` -->