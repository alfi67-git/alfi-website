# Commandes de base SQL

## Vérifier les accès d’un utilisateur : 

```sql
SHOW grants FOR 'user'@'localhost';
```

## Sélectionner une db

```sql
USE database_name;
``` 

## Afficher le contenu d’une db

```sql
SHOW tables;
```

## Afficher le contenue d’une table

```sql
SELECT name_column (ou *) FROM table_name;
```

## Supprimer un db

```sql
DROP DATABASE nom_db;
```

## Afficher tous les utilisateur dans mysql

```sql
SELECT user FROM mysql.user;
```