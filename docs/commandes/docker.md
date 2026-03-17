# Commandes Docker

## 🐳 Docker, c'est quoi ?

Docker est une application, qui permet de **créer, déployer et exécuter des applications dans des conteneurs**.

🔹 **Un conteneur**, c'est une sorte de mini-machine virtuelle ultra légère qui contient tout ce dont une application a besoin pour fonctionner :

✅ Le code de l'application

✅ Ses dépendances (librairies, outils…)

✅ Son environnement d'exécution

L'idée est de **standardiser** et **isoler** les applications.

---

## 🏗 Les concepts de base

🔹 **Image** : Une "photo" d'un environnement préconfiguré (ex: une image Ubuntu avec Apache installé).

🔹 **Conteneur** : Une instance en cours d’exécution d’une image.

🔹 **Dockerfile** : Un script qui définit comment construire une image Docker.

🔹 **Docker Hub** : Un registre public où l'on peut télécharger des images Docker officielles (ex: `nginx`, `mysql`, `ubuntu`).

---

## 🛠 Les commandes Docker essentielles

### Vérifier si Docker est installé

```bash
docker --version
```

### Télécharger une image depuis Docker Hub

```bash
docker pull ubuntu
```

### Lister les images disponibles localement

```bash
docker images
```

### Créer et exécuter un conteneur

```bash
docker run -d -p 8080:80 --name container httpd
```

Lance un serveur web Apache en arrière-plan (`-d`), accessible sur le port 8080.

### Lister les conteneurs en cours d'exécution

```bash
docker ps
```

### Arrêter un conteneur

```bash
docker stop container
```

### Supprimer un conteneur

```bash
docker rm container
```

### Supprimer une image

```bash
docker rmi image
```

### Voir les logs d’un conteneur

```bash
docker logs container
```

### Accéder à un conteneur en ligne de commande

```bash
docker exec -it container /bin/bash
```

---

:::tip 📌 exemple
### Lancer un serveur Nginx en conteneur

```bash
docker run -d -p 8080:80 --name mon-nginx nginx
```

➡️ Maintenant, accède à **http://localhost:8080** dans ton navigateur, et tu verras la page par défaut de Nginx ! 🎉
:::

---

### 📦 Docker Compose : gérer plusieurs conteneurs

Si ton application a plusieurs services (ex: une base de données + une API), **Docker Compose** permet de tout orchestrer avec un simple fichier **docker-compose.yml**.

Exemple : lancer une application **WordPress + MySQL** avec Docker Compose :

```yaml
version: '3'
services:
  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: wordpress
  wordpress:
    image: wordpress
    restart: always
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: root
      WORDPRESS_DB_PASSWORD: rootpass
```

➡️ Démarrage de l’environnement :

```bash
docker-compose up -d
```

Tu peux maintenant accéder à WordPress sur **http://localhost:8080**.
