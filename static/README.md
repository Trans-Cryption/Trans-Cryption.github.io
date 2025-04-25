# Dossier Static

Ce dossier contient tous les fichiers statiques du site: CSS, JavaScript, images, et autres médias.

## Structure

```
static/
├── css/
│   ├── global/        # Styles globaux appliqués à tout le site
│   │   ├── reset.css  # Normalisation des styles entre navigateurs
│   │   └── base.css   # Styles de base (typographie, couleurs, etc.)
│   ├── components/    # Styles pour les composants réutilisables
│   └── pages/         # Styles spécifiques à chaque page
├── js/
│   ├── global/        # Scripts JavaScript globaux
│   └── pages/         # Scripts spécifiques à chaque page
└── assets/
    ├── images/        # Images du site
    └── podcast/       # Fichiers audio pour les témoignages
```

## Principes de conception CSS

1. **Architecture par couches**:
   - Styles globaux: appliqués à tout le site
   - Styles de composants: appliqués à des éléments réutilisables
   - Styles de pages: appliqués uniquement à des pages spécifiques

2. **Minimisation des importations**:
   - Chaque page importe uniquement les fichiers CSS dont elle a besoin
   - Les styles globaux sont importés sur toutes les pages
   - Les styles de composants sont importés seulement si le composant est utilisé
   - Les styles de page sont spécifiques à chaque page

3. **Variables CSS**:
   - Les couleurs, tailles et autres valeurs réutilisables sont définies comme variables CSS dans `base.css`

## Principes de conception JavaScript

1. **Utilisation minimale**:
   - Le JavaScript est utilisé uniquement lorsque nécessaire
   - Préférence pour les solutions statiques et CSS quand c'est possible

2. **Séparation des préoccupations**:
   - Chaque script a une responsabilité claire
   - Les scripts sont divisés par portée (global ou spécifique à une page)

3. **Chargement optimal**:
   - Les scripts sont placés avant la fermeture de la balise `</body>`
   - L'attribut `defer` est utilisé pour permettre le chargement parallèle

## Comment ajouter des ressources

1. **Images**: Placez les nouveaux fichiers dans `assets/images/`
2. **Podcasts**: Placez les fichiers audio dans `assets/podcast/`
3. **CSS**: Créez ou modifiez les fichiers dans le dossier approprié selon la portée
4. **JavaScript**: Créez ou modifiez les fichiers dans le dossier approprié selon la portée
