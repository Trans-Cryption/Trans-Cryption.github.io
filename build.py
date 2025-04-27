import os
import json
import shutil
from jinja2 import Environment, FileSystemLoader

"""
Script de génération du site statique
Ce script génère le site web en utilisant les templates Jinja2 et les données JSON
"""

# Configuration
TEMPLATE_DIR = "templates"
CONTENT_DIR = "content"
PODCAST_DIR = "content/podcast"
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
shutil.copytree(PODCAST_DIR, os.path.join(OUTPUT_DIR, "static/assets/podcast"))

# Configurer l'environnement Jinja2
print("⚙️ Configuration de Jinja2...")
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))


# Fonction de chargement des données JSON
def load_json_content(filename):
    """
    Charge un fichier JSON depuis le répertoire content/

    Args:
        filename (str): Nom du fichier JSON à charger

    Returns:
        dict/list: Contenu du fichier JSON ou un dictionnaire/liste vide en cas d'erreur
    """
    path = os.path.join(CONTENT_DIR, filename)
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            print(f"⚠️ Erreur de décodage JSON dans {filename}")
            return {} if filename.endswith(".json") else []
    print(f"⚠️ Fichier {filename} introuvable")
    return {} if filename.endswith(".json") else []


# Charger les témoignages
print("📝 Chargement des témoignages...")
testimonials = load_json_content("temoignages.json")

# Pages à générer
pages = [
    {"template": "pages/index.html", "output": "index.html", "title": "Accueil"},
    {
        "template": "pages/temoignage.html",
        "output": "temoignage/index.html",
        "title": "Témoignages",
        "testimonials": testimonials,
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
