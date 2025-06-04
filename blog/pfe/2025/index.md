---
slug: pfe-ansible
title: 🎓 Projet de Fin d'Étude 3e année | Déploiement automatique de config switch avec Ansible
authors: [alfi]
tags: [cesi, pfe]
date: 2025-02-04T19:02
---

Rebelote, pour la validation de ma 3e année d'étude, je dois réaliser un nouveau projet. Cette fois-ci ça sera sur l'automatisation du déploiement de fichier de configuration de switch à l'aide d'Ansible.

:::warning
Cet article est encore en cours de rédaction, le projet venant juste de commencé. N'hésitez pas à revenir plus tard pour voir l'évolution du projet.
:::

<!--truncate-->

---
## Présentation du projet
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

L'ensemble des illustration utilisé sont piqué du cours OpenClassrooms sur Ansible.


![Node Manager](./images/node_manager.png)

> Un **node manager**, ou ***control node***,  est la machine sur laquelle est installée Ansible et servira à contrôler les nodes grâce à une connexion SSH en utilisant les commande `ansible`et `ansible-playbook`. Ça peut être n’importe quelle machine Linux, mais pas de Windows.


![Node](./images/node.png)

> Un **node** (ou ***managed node***, ou ***host***) est un poste connecté au node manager en SSH, et sur lequel Ansible viendra pousser les tâches d’automatisation. Ansible n’est pas installé sur les nodes.

:::info
**Ansible** est un outil **angentless**, ce qui veut dire qu’il n’y a pas besoin de l’installer sur les nodes pour que ça fonctionne. Ansible travaille en mode **push**. Il n’utilise que les outils déjà installés, c’est à dire Python et SSH.
:::

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


## Information sur le lab
Avant le déploiement en prod, c'est important d'avoir un lab où tester les différents playbook à executer.

### 🖥 **Configuration du lab:**

1. **1 VM de contrôle** où Ansible est installé.
2. **Switch HPE 5130** un vieux switch qui servira pour les tests et qui ressevra l'ensemble des commandes executé grâce aux playbooks.
