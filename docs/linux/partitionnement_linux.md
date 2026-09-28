# Partitionnement d'un serveur Linux
Cette documentation a était faite suite à un cours de Renaud GOLL.

Pour un serveur Debian, la répartition de l’espace disque dépend de l’usage prévu (web, base de données, fichier, etc.), mais voici une **répartition générale recommandée** pour un serveur standard, en tenant compte des bonnes pratiques actuelles (2025) :

# **1. Schéma de partitionnement de base (pour un disque système)**

| Point de montage | Taille recommandée         | Type de système de fichiers | Rôle principal                |
| ---------------- | -------------------------- | --------------------------- | ----------------------------- |
| `/boot`          | 500mo - 1Go                | ext4                        | Fichier de démarrage du noyau |
| `/` (racine)     | 20 - 50Go                  | ext4 ou xfs                 | Système et logiciels          |
| `/home`          | pour un serveur 500mo      | ext4 ou xfs                 | Donnée user (si applicable)   |
| `/var`           | 10 - 20Go                  | ext4 ou xfs                 | Logs, base de données, cache  |
| `/tmp`           | 5 -10Go                    | ext4 ou tmpfs               | Fichiers temporaires          |
| `swap`           | = RAM (ou 2x RAM si < 4Go) | swap                        | Mémoire virtuelle             |

# **2. Partitions supplémentaires selon l’usage**

### Serveur web (Apache/Nginx)
`/var/www` : 10Go ou plus selon le volume de sites.

### Serveur de base de données (MariaDB/MySQL)
`/var/lib/mariadb` ou `/var/lib/mysql` : 50% de l'espace disque si c'est le rôle principal.

### Serveur de fichiers (SAMBA/NFS)
`/srv` ou `/data` : la majorité de l'espace disque

### Serveur de logs centralisé
`/var/log` : 20Go ou plus

# **3. Bonnes pratiques supplémentaires**

- **LVM** : Utilisez LVM pour faciliter la gestion et l’extension des partitions ultérieurement.
- **Séparation des données** : Isoler les données critiques (bases de données, logs) sur des partitions ou disques dédiés.
- **SSD vs HDD** : Si possible, placez `/`, `/var`, et les bases de données sur SSD pour les performances.
- **Sauvegarde** : Prévoyez une partition ou un disque dédié aux sauvegardes si elles sont locales.

---

# 4. Configurer les partition lors de la création du serveur 

Une fois à l'étape du partitionnement des disques, sélectionner *Assisté - utiliser tout un disque avec LVM*  > selection du disque > /home /var /tmp séparé > Configurer le gestionnaire de volumes logiques (LVM) > Supprimer l'ensemble des volumes logiques puis enfin créer des nouveau ensemble logique avec leur nome respectif en spécifiant leur espace sur le disque

/home : 1G
/swap : 2G
/tmp : 2G
/var : 5G
/ : tout le reste

Valider puis sélectionner chaque groupe et leur affecteur la partition

