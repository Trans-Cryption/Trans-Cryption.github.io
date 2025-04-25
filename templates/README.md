# Dossier Templates

Ce dossier contient les templates Jinja2 utilisés pour générer les pages HTML du site.

## Structure

- `base.html` : Template de base contenant la structure HTML commune à toutes les pages
- `pages/` : Templates spécifiques à chaque page du site
- `components/` : Éléments réutilisables inclus dans les templates de pages

## Principes de conception

### Héritage de templates

Toutes les pages héritent du template `base.html` qui définit la structure commune:

```html
{% extends "base.html" %}

{% block content %}
  <!-- Contenu spécifique à la page -->
{% endblock %}
```

### Blocs

Le template de base définit plusieurs blocs que les templates enfants peuvent surcharger:

- `head`: Pour ajouter des balises dans l'en-tête HTML (CSS, meta tags, etc.)
- `content`: Pour le contenu principal de la page
- `scripts`: Pour ajouter des scripts JS en fin de page

### Composants

Les éléments réutilisables sont extraits dans des composants séparés:

```html
{% include "components/menu.html" %}
```

## Comment ajouter une nouvelle page

1. Créez un nouveau template dans le dossier `pages/`
2. Étendez le template de base: `{% extends "base.html" %}`
3. Définissez le contenu dans le bloc `content`
4. Ajoutez l'entrée correspondante dans le script `build.py`

## Variables contextuelles

Dans chaque template, vous avez accès aux variables suivantes:

- `title`: Titre de la page
- Variables spécifiques à la page définies dans `build.py`

Pour les témoignages, la variable `testimonials` contient la liste des témoignages.
