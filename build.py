import os
import json
import shutil
from jinja2 import Environment, FileSystemLoader

# Configuration
TEMPLATE_DIR = "templates"
CONTENT_DIR = "content"
STATIC_DIR = "static"
OUTPUT_DIR = "site"

# Ensure output directory exists and is clean
if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR)

# Copy static files
shutil.copytree(STATIC_DIR, os.path.join(OUTPUT_DIR, "static"))

# Setup Jinja2 environment
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))


# Load content
def load_json_content(filename):
    path = os.path.join(CONTENT_DIR, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


# Load testimonials
testimonials = load_json_content("temoignages.json")

# Pages to generate
pages = [
    {"template": "index.html", "output": "index.html", "title": "Accueil"},
    {
        "template": "temoignage.html",
        "output": "temoignage.html",
        "title": "Témoignages",
        "testimonials": testimonials,
    },
    {"template": "historique.html", "output": "historique.html", "title": "Historique"},
    {"template": "aides.html", "output": "aides.html", "title": "Aides"},
    {"template": "contact.html", "output": "contact.html", "title": "Contact"},
]

# Generate each page
for page in pages:
    template = env.get_template(page["template"])
    output_path = os.path.join(OUTPUT_DIR, page["output"])

    # Remove template from context
    context = {k: v for k, v in page.items() if k != "template" and k != "output"}

    # Render and write to output
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(template.render(**context))

print(f"Site generated in {OUTPUT_DIR}/")
