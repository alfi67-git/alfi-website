# Commandes de base Linux

## Vérification de version

Verifier version d’un RedHat :

```bash
less /etc/redhat-release
```

Vérifier la version d’un linux

```bash
cat /etc/os-release
```

## Gestion d’un utilisateur

Ajouter un utilisateur

```bash
useradd nom_user
```

Ajouter un utilisateur sans /home

```bash
useradd -M nom_user
``` 

Supprimer un compte utilisateur

```bash
userdell nomuser
``` 

Créer un group

```bash
groupadd nomgroup
```

# Gestion d’archive

Décompresser une archive :

```bash
tar -xzf nom_du_fichier
```

Compresser une archive :

```bash
tar -cvf nom_archive.tar /endroit_où_mettre_larchive
```

## Avoir des infos rapide d’un package

```bash
nom_package --h
```

:::tip exemple
```bash
[er0x@docker-lab] 13:40:~$ docker -h
```
:::

## Crontab

Lister les crontab créer par un utilisateur

```bash
crontab -lu user
```

Lister tous les crontab

```bash
crontab -l
```

Editer les crontab

```bash
crontab -e
```

## Firewall (nft)

Vérifier les règles de firewall
```bash
nft list ruleset | grep dport
```

Afficher règle de la table avec n° de ligne
```bash
nft -n -a list table nom_table
```

Ajouter règles de firewall
```bash
nft add rule ip filter INPUT position 14 ip saddr 10.252.0.0/16 udp dport 22 counter packets 0 bytes 0 accept
```

## Désactiver la veille du pc à la fermeture de l’écran

```bash
$ sudo nano /etc/systemd/logind.conf
#ReserveVT=6
#HandleSuspendKey=suspend
#HandleSuspendKeyLongPress=hibernate
#HandleHibernateKey=hibernate
#HandleHibernateKeyLongPress=ignore
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
#HandleLidSwitchDocked=ignore
#PowerKeyIgnoreInhibited=no
```

puis : 
```bash
sudo systemctl restart systemd-logind
```

## Créer un environnement virtuel

```bash
python3 -m venv ansible
```

## Problème SSH

En cas d’erreur : [SSH returns: no matching host key type found. Their offer: ssh-dss](https://askubuntu.com/questions/836048/ssh-returns-no-matching-host-key-type-found-their-offer-ssh-dss)

Ajouter au fichier `~/.ssh/config` :

```bash
Host nas
  HostName 192.168.8.109
  HostKeyAlgorithms=+ssh-dss
```

