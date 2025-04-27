# Dossier Content

Ce dossier contient les données structurées utilisées pour générer le contenu dynamique du site.

## Fichiers et structure

```
content/
└── temoignages/          # Fichiers Markdown des témoignages individuels
    └── podcasts/         # Fichiers audio des témoignages
```

## Structure d'un témoignage

Chaque témoignage est stocké sous forme de fichier Markdown dans le dossier `temoignages/`. 

### Structure du fichier Markdown

```markdown
---
titre: "Titre du témoignage"
date: "JJ/MM/AAAA"
podcast: false
url: "nom-fichier.mp3"  # Uniquement si podcast est true
tags: ["tag1", "tag2", "tag3"]  # Liste de mots-clés associés au témoignage
---

Contenu du témoignage au format Markdown...
```

## Comment ajouter un témoignage

1. Créez un nouveau fichier Markdown dans le dossier `content/temoignages/`
2. Suivez la structure ci-dessus pour le contenu du fichier
3. Si le témoignage inclut un podcast, placez le fichier audio dans `content/temoignages/podcasts/` et référencez-le dans le front matter du Markdown
4. Ajoutez des tags pertinents pour faciliter la recherche et la catégorisation

## Remarques

- Les témoignages sont affichés sur le site dans l'ordre chronologique inverse (les plus récents en premier)
- Les métadonnées (titre, date, podcast, url, tags) doivent être présentes dans le front matter du fichier Markdown
- Pour les témoignages longs, vous pouvez utiliser la syntaxe Markdown standard pour structurer le contenu (paragraphes, listes, emphase, etc.)
- Les fichiers audio dans `temoignages/podcasts/` seront automatiquement copiés dans le site généré
- Les tags permettent aux utilisateurs de filtrer les témoignages par thématique
