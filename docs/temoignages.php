<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Accueil</title>
        <link rel="stylesheet" href="site.css">
        <!-- Page d'accueil pour expliquer le but du site -->
    </head>
    <body>
        <a href="index.html">
            <img src="assets/logo.svg" height="80pt" width="80pt" alt="Logo" class="menu">
        </a>
        <ul class="menu">
            <li>
                <a href="temoignages.html" class="actif">
                    <ind>Témoignages</ind>
                </a>
            </li>
            <li>
                <a href="aides.html">
                    <ind>Aides</ind>
                </a>
            </li>
            <li>
                <a href="contact.html">
                    <ind>Contact</ind>
                </a>
            </li>
        </ul>
        <h1>Témoignages</h1>

        <?php
        include("temoignage.php");
        ?>
        <?php
        echo "test";
        ?>
    </body>
</html>