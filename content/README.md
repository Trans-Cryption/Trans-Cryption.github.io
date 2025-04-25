# Dossier Content

Ce dossier contient les données structurées utilisées pour générer le contenu dynamique du site.

## Fichiers

- `temoignages.json` : Collection de témoignages affichés sur la page des témoignages

## Format des témoignages

Chaque témoignage dans `temoignages.json` doit suivre cette structure :

```json
{
  "date": "JJ/MM/AAAA",
  "titre": "Titre du témoignage",
  "texte": "Contenu du témoignage...",
  "podcast": "yes" ou "no",
  "url": "nom-fichier.mp3"  // Uniquement si podcast est "yes"
}
```

## Comment ajouter un témoignage

1. Ouvrez le fichier `temoignages.json`
2. Ajoutez un nouvel objet JSON au début du tableau pour qu'il apparaisse en premier
3. Respectez le format ci-dessus
4. Si le témoignage inclut un podcast, placez le fichier audio dans `/static/assets/podcast/`

## Remarques

- Les témoignages sont affichés dans l'ordre où ils apparaissent dans le fichier JSON (du premier au dernier)
- Le fichier JSON doit être un tableau valide d'objets, veillez à ce que la syntaxe soit correcte
- Pour les témoignages longs, vous pouvez utiliser des paragraphes séparés par `\n\n` dans la propriété `texte`
