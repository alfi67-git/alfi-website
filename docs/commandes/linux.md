# Commandes Linux
## Générer une clé ssh
```bash
ssh-keygen
```

## Transférer la clé vers une machine distante
```bash
ssh-copy-id 127.0.0.1
ssh-copy-id -p 1234 127.0.0.1 # pour préciser un port de connexion
```

## Changer le hostname de sa machine

```bash
hostnamectl set-hostname nouveau_nom
```

## Lister les crontab
```bash
crontab -l
```

## Lister les partitions
```bash
df -h
```