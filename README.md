# Site Web Trans-cryption

Ce dépôt contient un site web statique généré avec Python et Jinja2, qui partage des témoignages, des ressources, et des informations historiques sur les personnes transgenres.

## Site Web

Le site est accessible à l'adresse : [https://trans-cryption.github.io](https://trans-cryption.github.io)

## Architecture du projet

```
/
├── content/      # Contient les données JSON utilisées pour générer le site
│   └── podcast/  # Fichiers audio des témoignages (format MP3)
├── templates/    # Templates Jinja2 pour les pages HTML
├── static/       # Fichiers statiques (CSS, JS, images)
│   ├── css/      # Styles CSS organisés par portée
│   ├── js/       # Scripts JavaScript organisés par portée
│   └── assets/   # Images et autres fichiers médias
├── build.py      # Script de génération du site
└── site/         # Site généré (non versionné)
```

## Fonctionnalités principales

- **Témoignages** : Récits personnels de personnes transgenres, avec option podcast
- **Historique** : Informations historiques sur les personnes transgenres à travers les époques
- **Ressources** : Associations et liens utiles pour les personnes transgenres
- **Contact sécurisé** : Formulaire avec chiffrement de bout en bout pour témoigner anonymement

## Principes de conception

- **Séparation des préoccupations** : HTML, CSS et JS sont dans des fichiers séparés
- **Importation minimale** : Chaque page charge uniquement les ressources dont elle a besoin
- **Site statique** : Utilisation minimale de JavaScript, préférence pour les solutions statiques
- **Architecture modulaire** : Organisation par composants pour faciliter la maintenance

## Comment générer le site

1. Installer les dépendances :
   ```
   pip install -r requirements.txt
   ```

2. Exécuter le script de génération :
   ```
   python build.py
   ```

3. Le site sera généré dans le dossier `site/`

## Déploiement

Le site est automatiquement déployé sur GitHub Pages à chaque push sur la branche `main` grâce au workflow GitHub Actions configuré dans `.github/workflows/build-deploy.yml`.

## Contribuer

Pour ajouter ou modifier des témoignages, modifiez le fichier `content/temoignages.json`.

Pour modifier la structure ou le design du site, consultez les READMEs dans les dossiers correspondants pour comprendre l'organisation des fichiers.
