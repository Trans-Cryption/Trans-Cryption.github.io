# Dossier des podcasts

Ce dossier contient les fichiers audio associés aux témoignages. Ces fichiers sont référencés dans les métadonnées des témoignages correspondants.

## Formats acceptés

Les formats audio suivants sont pris en charge :
- MP3 (*.mp3) - recommandé pour une compatibilité optimale
- OGG (*.ogg)
- WAV (*.wav) - éviter si possible en raison de la taille des fichiers

## Convention de nommage

Pour faciliter l'organisation et la maintenance, il est recommandé de nommer les fichiers audio de la même manière que les fichiers Markdown correspondants :

Par exemple, pour un témoignage stocké dans `content/temoignages/mon-experience-a-paris.md`, le fichier audio correspondant devrait être nommé `mon-experience-a-paris.mp3`.

## Qualité et taille recommandées

Pour optimiser l'expérience utilisateur et les performances du site :
- Encodez les fichiers MP3 à 128-192 kbps pour un bon équilibre entre qualité et taille
- Évitez les fichiers de plus de 20 Mo
- Assurez-vous que l'audio est clairement audible et de qualité convenable

## Référencement dans les témoignages

Pour qu'un témoignage inclue un podcast, vous devez :

1. Placer le fichier audio dans ce dossier
2. Référencer le nom du fichier dans le front matter du témoignage correspondant :

```markdown
---
titre: "Mon témoignage"
date: "01/01/2025"
podcast: true
url: "nom-du-fichier.mp3"
---
```

Le script de génération du site vérifiera automatiquement l'existence du fichier audio et affichera un avertissement si le fichier est manquant.
