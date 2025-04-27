# Dossier CSS Pages

Ce dossier contient les fichiers CSS spécifiques à chaque page du site.

## Structure

```
pages/
├── aides.css            # Styles pour la page des ressources d'aide
├── contact.css          # Styles pour la page de contact
├── historique.css       # Styles pour la page d'historique
├── index.css            # Styles pour la page d'accueil
├── temoignage.css       # Styles pour la page de témoignages
├── temoignage-search.css # Styles pour la recherche dans les témoignages
└── 404.css              # Styles pour la page d'erreur 404 personnalisée
```

## Principes de conception

### Organisation par page

Chaque page du site possède son propre fichier CSS pour faciliter la maintenance et minimiser les conflits. Cette approche permet également de ne charger que les styles nécessaires pour chaque page.

### Utilisation des variables CSS

Tous les fichiers CSS utilisent les variables définies dans `/static/css/global/base.css` pour maintenir une cohérence visuelle à travers le site :

```css
:root {
    /* Palette de couleurs */
    --color-primary: rgb(255, 0, 212);
    --color-secondary: rgb(0, 162, 255);
    /* etc. */
}
```

### Mode sombre

Chaque fichier CSS inclut des adaptations pour le mode sombre via la media query :

```css
@media (prefers-color-scheme: dark) {
    /* Adaptations pour le mode sombre */
}
```

### Responsive design

Les fichiers CSS incluent des media queries pour adapter l'affichage sur différentes tailles d'écran :

```css
@media screen and (max-width: 768px) {
    /* Adaptations pour les petits écrans */
}
```
