# Commandes Ansible

## ⚙️ Ansible, c'est quoi ?

Ansible est un **outil d'automatisation** qui permet de **gérer des serveurs, installer des logiciels et configurer des systèmes** de manière simple et efficace.

:::tip exemple de playbook
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
ansible-playbook -i inventory.ini install_nginx.yml
```

Résultat : Nginx est installé et lancé sur tous les serveurs du groupe `web` ! 🚀
:::

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

### Installer Ansible
```bash
sudo apt install pip
pip install ansible
```

### Ping vers les machines
```bash
ansible -i inventory.ini all -m ping
```

### Lancer un playbook Ansible
```bash
ansible-playbook -i inventory.ini install_nginx.yml
```

### Exécuter une commande sur une machine distante
```bash
ansible -i inventory.ini web -m shell -a "uptime"
# Exécute la commande `uptime` sur les serveurs du groupe `web`
```

### Installer un paquet avec Ansible
```bash
ansible -i inventory.ini web -m apt -a "name=nginx state=present" --become
```

Installe Nginx sur les machines du groupe `web` (avec `apt` pour Debian/Ubuntu).



Exécute un fichier YAML qui installe et configure un service.


## Ansible Galaxy
Une collection regroupe différents types de contenu, tels que des rôles, modules, playbooks, plugins et même des scripts de tests, dans une structure modulaire et bien définie.

Ca permet de faciliter la mise à jour et la distribution de modules ou de rôles et enfin permettre une meilleure gestion des dépendances.

### Installation depuis Ansible Galaxy

Pour installer une collection depuis Ansible Galaxy, utilisez la commande suivante :

```bash
ansible-galaxy collection install <namespace>.<collection_name>
```

Cela installe la collection dans le répertoire local des collections par défaut: `~/.ansible/collections/` ou `/usr/share/ansible/collections/`.

:::info
Egalement possible d’installer via le fichier `requirement.yml`.

Avec la commande :

```bash
ansible-galaxy collection install -r requirements.yml
```
:::

### Créer un rôle avec Ansible Galaxy

```bash
ansible-galaxy init nom_du_role
```

Ce qui donne l’arborescence suivante :

```bash
user_creation/
├── defaults
│   └── main.yml
├── files
├── handlers
│   └── main.yml
├── meta
│   └── main.yml
├── README.md
├── tasks
│   └── main.yml
├── templates
├── tests
│   ├── inventory
│   └── test.yml
└── vars
    └── main.yml

9 directories, 8 files
```

## Ansible Vault

### Créer un fichier chiffré
```bash
ansible-vault create dir/secret.yml
``` 

Fichier où sera stocké toutes les informations importantes à cacher.

### Editer fichier chiffré
```bash
ansible-vault edit dir/secret.yml
```

### Modifier mdp du fichier chiffré
```bash
ansible-vault rekey dir/secret.yml 
```

### Chiffrer fichier non chiffré
```bash
ansible-vault encrypt fichier_non_chiffre.yml 
```

### Déchiffrer un fichier déjà chiffré
```bash
ansible-vault decrypt fichier_deja_chiffre.yml 
```

### Affichier contenu d’un fichier chiffré
```bash
ansible-vault view dir/secret.yml
```