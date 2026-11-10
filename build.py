import os
import shutil
import markdown
import frontmatter
import pymdownx.tilde
import pymdownx.mark
import pymdownx.emoji
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

"""
Script de génération du site statique
Ce script génère le site web en utilisant les templates Jinja2 et les fichiers Markdown
"""

# Configuration
TEMPLATE_DIR = "templates"
CONTENT_DIR = "content"
TESTIMONY_DIR = os.path.join(CONTENT_DIR, "temoignages")
PODCAST_DIR = os.path.join(CONTENT_DIR, "temoignages", "podcasts")
IMAGE_DIR = os.path.join(CONTENT_DIR, "temoignages", "images")
PODCAST_DIR = os.path.join(CONTENT_DIR, "temoignages", "podcasts")
STATIC_DIR = "static"
OUTPUT_DIR = "site"

# Nettoyer et créer le répertoire de sortie
print("🧹 Nettoyage du répertoire de sortie...")
if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR)

# Copier les fichiers statiques
print("📁 Copie des fichiers statiques...")
shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, "static"))

# Créer le répertoire pour les podcasts dans le dossier de sortie
podcast_output_dir = os.path.join(OUTPUT_DIR, "static", "assets", "podcast")
os.makedirs(podcast_output_dir, exist_ok=True)

# Copier les fichiers podcast s'ils existent
if os.path.exists(PODCAST_DIR):
    print("📁 Copie des fichiers podcast...")
    for podcast_file in os.listdir(PODCAST_DIR):
        if podcast_file.lower().endswith((".mp3", ".ogg", ".wav")):
            src_path = os.path.join(PODCAST_DIR, podcast_file)
            dst_path = os.path.join(podcast_output_dir, podcast_file)
            shutil.copy2(src_path, dst_path)
            print(f"✅ Podcast copié: {podcast_file}")
else:
    print(f"ℹ️ Aucun dossier de podcasts trouvé à l'emplacement: {PODCAST_DIR}")

# Configurer l'environnement Jinja2
print("⚙️ Configuration de Jinja2...")
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))


def load_testimonials_from_directory(directory):
    """
    Charge tous les témoignages Markdown depuis un répertoire

    Args:
        directory (str): Chemin vers le répertoire contenant les fichiers Markdown

    Returns:
        list: Liste des témoignages avec leurs métadonnées et contenu HTML
    """
    testimonials = []

    if not os.path.exists(directory):
        print(f"⚠️ Répertoire {directory} introuvable")
        return testimonials

    # Parcourir tous les fichiers .md du répertoire
    for filename in sorted(os.listdir(directory)):
        # Ignorer le dossier des podcasts et le README
        if (
            os.path.isdir(os.path.join(directory, filename))
            or filename.startswith("README")
            or not filename.endswith(".md")
        ):
            continue

        file_path = os.path.join(directory, filename)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                post = frontmatter.load(f)

                # Convertir Markdown en HTML avec des extensions améliorées pour les témoignages
                html_content = markdown.markdown(
                    post.content,
                    extensions=[
                        "markdown.extensions.fenced_code",
                        "markdown.extensions.tables",
                        "markdown.extensions.sane_lists",
                        "markdown.extensions.nl2br",
                        "markdown.extensions.smarty",
                        "markdown.extensions.attr_list",  # Pour ajouter des classes et attributs
                        "markdown.extensions.def_list",  # Pour les listes de définition
                        "pymdownx.tilde",  # Pour le texte barré
                        "pymdownx.mark",  # Pour le texte surligné
                        "pymdownx.emoji",  # Pour les emojis
                        "markdown.extensions.footnotes",  # Pour les notes de bas de page
                    ],
                    extension_configs={
                        "markdown.extensions.smarty": {
                            "smart_angled_quotes": False,
                            "smart_quotes": True,
                            "substitutions": {
                                "left-single-quote": "'",
                                "right-single-quote": "'",
                                "left-double-quote": '"',  # "«\u00a0",
                                "right-double-quote": '"',  # "\u00a0»",
                            },
                        },
                        "pymdownx.emoji": {
                            "emoji_index": pymdownx.emoji.gemoji,
                            "emoji_generator": pymdownx.emoji.to_alt,
                            "alt": "emoji {alt}",
                            "options": {"attributes": {"class": "emoji"}},
                        },
                    },
                )

                # Préparer les métadonnées
                metadata = post.metadata.copy()
                metadata["texte"] = html_content

                # Conversion de la valeur du podcast en "yes" ou "no" pour compatibilité
                metadata["podcast"] = "yes" if metadata.get("podcast", False) else "no"

                # Conversion de la valeur de l'image en "yes" ou "no" pour compatibilité
                metadata["image"] = "yes" if metadata.get("image", False) else "no"

                # Ajouter un champ pour le nom du fichier (utile pour les liens)
                metadata["file_id"] = os.path.splitext(filename)[0]

                # Vérifier si le fichier podcast existe lorsque podcast=yes
                if metadata["podcast"] == "yes" and "url" in metadata:
                    podcast_path = os.path.join(PODCAST_DIR, metadata["url"])
                    if not os.path.exists(podcast_path):
                        print(
                            f"⚠️ Fichier podcast introuvable: {metadata['url']} pour le témoignage {metadata.get('titre', filename)}"
                        )

                # Vérifier si le fichier image existe lorsque image=yes
                if metadata["image"] == "yes" and "url-image" in metadata:
                    image_path = os.path.join(IMAGE_DIR, metadata["url-image"])
                    if not os.path.exists(image_path):
                        print(
                            f"⚠️ Fichier image introuvable: {metadata['url-image']} pour le témoignage {metadata.get('titre', filename)}"
                        )

                # Gérer les tags - S'assurer qu'ils sont au format liste
                if "tags" in metadata:
                    if not isinstance(metadata["tags"], list):
                        metadata["tags"] = []
                        print(
                            f"⚠️ Format de tags invalide dans {filename} - doit être une liste"
                        )
                else:
                    metadata["tags"] = []

                # Gérer les liens - S'assurer qu'ils sont au format liste
                if "liens" in metadata:
                    if not isinstance(metadata["liens"], list):
                        metadata["liens"] = []
                        print(
                            f"⚠️ Format de liens invalide dans {filename} - doit être une liste"
                        )
                else:
                    metadata["liens"] = []

                testimonials.append(metadata)
                print(f"✅ Témoignage chargé : {metadata.get('titre', filename)}")
        except Exception as e:
            print(f"⚠️ Erreur lors du traitement du témoignage {filename}: {str(e)}")

    # Fonction pour convertir une date du format DD/MM/YYYY en objet datetime
    def parse_date(date_str):
        try:
            return datetime.strptime(date_str, "%d/%m/%Y")
        except (ValueError, TypeError):
            # Date invalide ou manquante - utiliser une date par défaut (ancienne)
            return datetime(1900, 1, 1)

    # Trier les témoignages par date (les plus récents d'abord)
    testimonials.sort(key=lambda x: parse_date(x.get("date", "")), reverse=True)

    return testimonials


# Vérifier que le dossier des témoignages existe
if not os.path.exists(TESTIMONY_DIR):
    os.makedirs(TESTIMONY_DIR)
    print("📁 Création du dossier des témoignages")

# Vérifier que le dossier des podcasts existe
if not os.path.exists(PODCAST_DIR):
    os.makedirs(PODCAST_DIR)
    print("📁 Création du dossier des podcasts")

# Vérifier que le dossier des images existe
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)
    print("📁 Création du dossier des images")

# Charger les témoignages directement à partir des fichiers Markdown
print("📝 Chargement des témoignages...")
testimonials = load_testimonials_from_directory(TESTIMONY_DIR)
print(f"✅ {len(testimonials)} témoignages chargés")

# Collecter tous les tags uniques et calculer le nombre de témoignages par tag
print("🔖 Analyse des tags...")
all_tags = set()
for testimonial in testimonials:
    all_tags.update(testimonial["tags"])

# Trier les tags par ordre alphabétique
all_tags = sorted(list(all_tags))

# Calculer le nombre de témoignages par tag
tag_counts = {}
for tag in all_tags:
    tag_counts[tag] = sum(1 for t in testimonials if tag in t.get("tags", []))

print(f"✅ {len(all_tags)} tags uniques identifiés")

# Pages à générer
pages = [
    {"template": "pages/index.html", "output": "index.html", "title": "Accueil"},
    {
        "template": "pages/temoignage.html",
        "output": "temoignage/index.html",
        "title": "Témoignages",
        "testimonials": testimonials,
        "all_tags": all_tags,
        "tag_counts": tag_counts,
    },
    {
        "template": "pages/historique.html",
        "output": "historique/index.html",
        "title": "Historique",
    },
    {"template": "pages/aides.html", "output": "aides/index.html", "title": "Aides"},
    {
        "template": "pages/contact.html",
        "output": "contact/index.html",
        "title": "Contact",
    },
    {
        "template": "pages/404.html",
        "output": "404.html",
        "title": "Page non trouvée",
    },
]

# Générer chaque page
print("🔨 Génération des pages...")
for page in pages:
    template = env.get_template(page["template"])
    output_path = os.path.join(OUTPUT_DIR, page["output"])

    # S'assurer que le répertoire de destination existe
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Créer le contexte pour le template
    context = {k: v for k, v in page.items() if k != "template" and k != "output"}

    # Générer et écrire dans le fichier de sortie
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(template.render(**context))

    print(f"✅ Page générée : {page['title']} -> {page['output']}")

print(f"🎉 Site généré avec succès dans le répertoire {OUTPUT_DIR}/")
