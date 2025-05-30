# Transférer un fichier d'un serveur à un autre

Voici comment se présente la commande :
```bash
$scp [autres options] [nom d'utilisateur source@IP]:/[dossier et nom de fichier] [nom d'utilisateur de destination@IP]:/[dossier de destination]
```

Cela peut sembler compliqué au début, mais nous nous ferons un plaisir de l’expliquer !

Dans cet exemple, nous effectuons un transfert entre deux serveurs VPS.

- **[autres options]** sont des modificateurs que vous pouvez ajouter à la commande SCP Linux. Nous parlerons des plus populaires plus tard
- **[nom d’utilisateur source@IP]** est le nom
d’utilisateur et l’adresse IP de la machine sur laquelle se trouve le
fichier que vous voulez. Cela ressemblerait à root@123.123.123.12
- **:/** informe la commande SCP que vous allez taper le dossier source
- **[dossier et nom de fichier]** est l’endroit où se trouve le fichier, ainsi que son nom. Il ressemble à /utilisateurs/Hostinger/Bureau/SCP.png
- **[nom d’utilisateur de destination@IP]** est le nom d’utilisateur et l’adresse IP de la machine de destination
- **[dossier de destination]** est le dossier de destination où le fichier sera sauvegardé

:::tip exemple
Si je veux transférer un certificat d'un serveur à un autre par exemple, la commande se présente de la sorte :
```
$scp alfi@srv-docker:/server.pem docker@srv-web:/etc/pki/tls/certs/
```
:::