# Commandes de base HPE

## Restaurer le switch à ses paramètre d’usine

`restore factory-default`

## Entrer dans la configuration système (équivalant conf t chez cisco)

`<switch> system-view`

## annuler un paramètre

`[Switch] undo stp enable`

## paramétrer le nom du switch

`[switch] sysname NomDuSwitch` 

## sauvegarder la configuration

```bash
[switch] save # permet de choisir l'endroit où l'on sauvegarde le fichier de conf
[switch] save force # permet de sauvegarder à l'emplacement par défaut
```

## définir l’ip du switch masque en /24

```bash
[switch] interface vlan-interface 1
[switch-Vlan-interface1] ip address 192.168.1.1 24
```

## **définir la passerelle par défaut:**

`[switch] ip route-static 0.0.0.0 0.0.0.0 192.168.1.254` 

## modifier l’ip d’un vlan (masque en /24)

```bash
[HPE] interface vlan-interface 1
[HPE-Vlan-interface1] ip address 192.168.1.1 24
[HPE-Vlan-interface1] quit
```

## modifier les droits admin à l’utilisateur

```bash
[SW-ANSIBLE-TEST]local-user username
[SW-ANSIBLE-TEST-luser-manage-username]authorization-attribute user-role network-
admin

```