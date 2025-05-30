# Configuration réseau sur Debian

## Définir une IP

```bash
vi /etc/network/interfaces
```

Le fichier se présente de la sorte :
```bash
source /etc/network/interfaces.d/*

auto lo
# iface lo inet loopback
# iface enp11s0 inet dhcp

allow-hotplug enp11s0

iface enp11s0 inet static
    address 192.168.1.X
    netmask 255.255.255.0
    gateway 192.168.1.1
```

## Changer de DNS

```bash
vi /etc/resolvconf.conf
```

Le fichier se présente de la sorte :
```bash
domain home
search home
nameserver 192.168.1.12
nameserver 9.9.9.9
nameserver 1.1.1.1
```

Rajouter votre DNS préféré après `nameserver`.