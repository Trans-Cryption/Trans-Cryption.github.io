# Témoignages en format Markdown

Ce dossier contient tous les témoignages individuels au format Markdown ainsi que les fichiers audio associés.

## Structure du dossier

```
temoignages/
├── *.md                # Fichiers Markdown des témoignages
└── podcasts/          # Dossier contenant les fichiers audio des témoignages
    └── *.mp3          # Fichiers audio au format MP3
```

## Structure d'un fichier de témoignage

Chaque fichier Markdown représente un témoignage unique et doit suivre cette structure :

```markdown
---
titre: "Titre du témoignage"
date: "JJ/MM/AAAA"
podcast: true ou false
url: "nom-fichier.mp3"  # Uniquement si podcast est true
---

Contenu du témoignage...
```

## Front matter

Le "front matter" est la section au début du fichier entre les triple tirets `---`. Il contient les métadonnées du témoignage :

- `titre` : Le titre du témoignage (obligatoire)
- `date` : La date du témoignage au format JJ/MM/AAAA (obligatoire)
- `podcast` : Valeur booléenne `true` si le témoignage est disponible en podcast, sinon `false` (obligatoire)
- `url` : Le nom du fichier audio dans le dossier `podcasts/` (obligatoire si podcast est `true`)

## Contenu

Après le front matter, écrivez le contenu du témoignage en utilisant la syntaxe Markdown standard :

- Les paragraphes sont séparés par une ligne vide
- Utilisez `**texte**` pour mettre en gras
- Utilisez `*texte*` pour mettre en italique
- Utilisez `# Titre` pour les grands titres (rarement nécessaire dans un témoignage)
- Utilisez `## Sous-titre` pour les sous-titres
- Utilisez `> Citation` pour les citations
- Utilisez `- item` pour les listes à puces

## Convention de nommage

### Fichiers Markdown

Nommez vos fichiers en utilisant le titre du témoignage en minuscules, sans accents, avec des tirets à la place des espaces :

Par exemple, pour un témoignage intitulé "Mon expérience à Paris", le nom du fichier serait : `mon-experience-a-paris.md`

### Fichiers audio

Pour les fichiers audio, utilisez le même nom que le fichier Markdown, suivi de l'extension appropriée :

Par exemple, pour un témoignage `mon-experience-a-paris.md`, le fichier audio serait : `mon-experience-a-paris.mp3`

## Comment ajouter un témoignage

1. Créez un nouveau fichier Markdown dans ce dossier en suivant la convention de nommage
2. Ajoutez le front matter avec les métadonnées requises
3. Écrivez le contenu du témoignage
4. Si le témoignage a un podcast, ajoutez le fichier audio dans le dossier `podcasts/` et référencez son nom dans le champ `url` du front matter

## Ordre d'affichage

Les témoignages sont automatiquement triés par date (du plus récent au plus ancien) lors de la génération du site.
