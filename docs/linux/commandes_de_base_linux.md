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

Ajouter un utilisateur à un groupe
```bash
sudo usermod -aG namegroup username
```

## Gestion d’archive

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

## Réseau
### Firewall (nft)

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

### Définir une ip statique sur Debian
tout se fait dans le fichier `/etc/network/interfaces`

Exemple de configuration
```bash
allow-hotplug ens18
iface ens18 inet static
        address 192.168.1.34/24
        gateway 192.168.1.1
        dns-nameservers 192.168.1.6 9.9.9.9 1.1.1.1
        dns-domain truc.fr

```

puis :
```bash
sudo systemctl restart networking.service ; sudo ifdown ens18 && sudo ifup ens18 
```
pour relancer le service, éteindre et rallumer la carte

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

## SSH

### Créer clé SSH
`ssh-keygen`

### Copier la clé publique sur un poste distant
```bash
ssh-copy-id `username`@`remote-host`
``` 

### Problème SSH

En cas d’erreur : [SSH returns: no matching host key type found. Their offer: ssh-dss](https://askubuntu.com/questions/836048/ssh-returns-no-matching-host-key-type-found-their-offer-ssh-dss)

Ajouter au fichier `~/.ssh/config` :

```bash
Host nas
  HostName 192.168.8.109
  HostKeyAlgorithms=+ssh-dss
```

## Créer un lien
Flemme de te rendre dans /etc/dossiers/sous-dossiers/sous-sous-dossiers/fichier ? Créer un lien avec la commande suivante :
```bash
ln -s /etc/dossiers/sous-dossiers/sous-sous-dossiers/ /home/users/
```
