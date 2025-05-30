# Ansible

## ⚙️ Ansible, c'est quoi ?

Ansible est un **outil d'automatisation** qui permet de **gérer des serveurs, installer des logiciels et configurer des systèmes** de manière simple et efficace.

Avec Ansible, tu peux :

✅ **Gérer plusieurs machines en même temps** avec un seul script

✅ **Automatiser les tâches répétitives** comme l’installation de logiciels

✅ **Éviter les erreurs humaines** grâce à des configurations reproductibles

✅ **Utiliser un système sans agent**, car Ansible fonctionne via **SSH** (pour Linux) et **WinRM** (pour Windows)

Ansible est **déclaratif** : tu écris ce que tu veux obtenir (ex: "Apache installé"), et il s’occupe du comment.

---

## 🏗 Les concepts de base

🔹 **Inventaire** : Un fichier listant les machines à gérer (ex: `hosts.ini`).

🔹 **Module** : Un composant préfait pour exécuter une tâche (ex: `apt`, `yum`, `win_chocolatey`).

🔹 **Playbook** : Un fichier YAML qui décrit un ensemble de tâches à exécuter.

🔹 **Rôle** : Une organisation plus avancée des playbooks pour les projets complexes.

🔹 **Idempotence** : Si une action est déjà en place, Ansible ne la refait pas inutilement.

---

## 🛠 Les commandes Ansible essentielles

### Configuration d’Ansible

Cette commande permet de créer le fichier de configuration d’Ansible qui sera présent dans la racine du projet :

```bash
ansible-config init --disabled > ansible.cfg
```

### Gather facts

récupère les informations de la machine cible. Par exemple :

- L’OS
- L’IP
- La RAM

```yaml
- name: Show OS and IP
  hosts: all
  gather_facts: yes
  tasks:
    - name: Display OS and IP
      ansible.builtin.debug:
        msg: "OS: {{ ansible_distribution }}, IP: {{ ansible_default_ipv4.address }}"
```
:::info
💡 **Sans `gather_facts: yes`**, ces variables ne seraient pas disponibles, sauf si tu les collectes manuellement avec le module `setup`.
:::
### Vérifier la connexion aux machines

```bash
ansible -i hosts.ini all -m ping
```

➡️ Vérifie si Ansible peut accéder aux machines via SSH.

### Exécuter une commande sur une machine distante

```bash
ansible -i hosts.ini web -m shell -a "uptime"
```

➡️ Exécute la commande `uptime` sur les serveurs du groupe `web`.

### Installer un paquet avec Ansible

```bash
ansible -i hosts.ini web -m apt -a "name=nginx state=present" --become
```

➡️ Installe Nginx sur les machines du groupe `web` (avec `apt` pour Debian/Ubuntu).

### Lancer un playbook Ansible

```bash
ansible-playbook -i hosts.ini install_nginx.yml
```

➡️ Exécute un fichier YAML qui installe et configure un service.

---

:::tip 📌 exemple de playbook
### Installer Nginx

Crée un fichier **`install_nginx.yml`** :

```yaml title="install_nginx.yml"
- name: Installer et démarrer Nginx
  hosts: web
  become: yes
  tasks:
    - name: Mettre à jour la liste des paquets
      apt:
        update_cache: yes

    - name: Installer Nginx
      apt:
        name: nginx
        state: present

    - name: Démarrer Nginx
      service:
        name: nginx
        state: started
```

Puis exécute-le :

```bash
ansible-playbook -i hosts.ini install_nginx.yml
```

➡️ Résultat : Nginx est installé et lancé sur tous les serveurs du groupe `web` ! 🚀
:::