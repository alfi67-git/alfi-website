# Commandes SQL
## Vérifier les accès d’un utilisateur
```sql
show grants for 'user'@'localhost';
```

## Sélectionner une db
```sql
use database_name;
```

## afficher le contenu d’une db
```sql
show tables;
```

## afficher le contenue d’une table
```sql
select name_column from table_name;
select * from table_name;
```

## supprimer un db
```sql
drop database nom_db;
```

## afficher tous les utilisateur dans mysql
```sql
SELECT user FROM mysql.user;
```