# Créer et décomprésser une archive Linux

# Comment utiliser tar sur Linux

### Création d’un fichier d’archive .tar sous Linux

Vous pouvez créer des compressions **.tar** pour un fichier ainsi que pour des répertoires. Voici un exemple :

```bash
tar -cvf exempleArchive.tar /home/exempleArchive
```

Ici, **/home/exempleArchive** est le répertoire qui doit être compressé en créant **exempleArchive.tar**.

La commande utilise les options **-cvf** qui signifient :

- **c** – Cela crée un nouveau fichier .tar
- **v** – Affiche une description verbeuse de la progression de la compression
- **f** – Nom du fichier

### Création d’un fichier .tar.gz sous Linux

Si vous souhaitez une meilleure compression, vous pouvez également utiliser le fichier **.tar.gz**. Voici un exemple :

```bash
tar -cvzf exempleArchive.tar.gz /home/exempleArchive
```

L’option supplémentaire **-z** représente la compression **gzip**. Vous pouvez également créer un fichier **.tgz** similaire à **tar.gz**. Voici un exemple :

```bash
tar -cvzf exempleArchive.tgz /home/exempleArchive
```

### Comment dézipper des fichiers .tar sous Linux

La commande tar Linux peut également être utilisée pour extraire un fichier. La commande ci-dessous permet d’extraire les fichiers dans le répertoire courant :
```bash
tar -xvf exempleArchive.tar
```

Si vous voulez extraire vers un autre répertoire, vous pouvez utiliser l’option **-C**. Un exemple est présenté ci-dessous :
```bash
tar -xvf exempleArchive.tar -C /home/FichiersExtraits/
```

Une commande similaire peut être utilisée pour décompresser les fichiers **.tar.gz** comme indiqué ci-dessous :
```bash
tar -xvf exempleArchive.tar.gz
```

```bash
tar -xvf exempleArchive.tar.gz -C /home/FichiersExtraits/
```

Les fichiers **.tar.bz2** ou **.tar.tbz** ou **.tar.tb2** peuvent être décompressés de la même manière. Il faut pour cela utiliser la commande suivante dans la ligne de commande :
```bash
tar -xvf exempleArchive.tar.bz2
```

### Comment lister le contenu d’une archive sous Linux

Une fois que l’archive est créée, vous pouvez en lister le contenu en utilisant la commande ci-dessous :

```bash
tar -tvf exempleArchive.tar
```

La liste complète des fichiers s’affichera ainsi, avec l’horodatage et les autorisations.