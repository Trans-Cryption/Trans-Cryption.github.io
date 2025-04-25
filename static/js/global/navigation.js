/**
 * navigation.js
 * Script pour gérer la navigation mobile (menu burger) et le retour en haut de page
*/

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM chargé, initialisation de la navigation...');
  
  // Éléments du DOM
  const burgerMenu = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu');
  
  // Créer l'overlay du menu s'il n'existe pas déjà
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay) {
    console.log('Création de l\'overlay du menu');
    menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);
  }
  
  // Gestion du menu burger
  if (burgerMenu && menu) {
    console.log('Menu burger et menu trouvés, ajout des événements');
    
    // Rendre le burger cliquable
    burgerMenu.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      burgerMenu.classList.toggle('active');
      menu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Log pour déboguer
      console.log('Menu burger cliqué - Menu actif:', menu.classList.contains('active'));
    });
    
    // Fermer le menu si on clique sur l'overlay
    menuOverlay.addEventListener('click', () => {
      console.log('Overlay cliqué, fermeture du menu');
      burgerMenu.classList.remove('active');
      menu.classList.remove('active');
      menuOverlay.classList.remove('active');
    });
    
    // Vérifier que les liens sont cliquables
    const menuLinks = menu.querySelectorAll('a');
    console.log(`${menuLinks.length} liens trouvés dans le menu`);
    
    menuLinks.forEach((link, index) => {
      // Ajouter un log pour chaque lien
      link.addEventListener('mouseenter', () => {
        console.log(`Survol du lien ${index}: ${link.textContent.trim()}`);
      });
      
      link.addEventListener('click', (e) => {
        console.log(`Lien ${index} cliqué: ${link.textContent.trim()}`);
        
        // Fermer le menu après avoir cliqué sur un lien
        setTimeout(() => {
          burgerMenu.classList.remove('active');
          menu.classList.remove('active');
          menuOverlay.classList.remove('active');
        }, 100);
      });
    });
  } else {
    console.error('Menu burger ou menu principal non trouvé dans le DOM');
  }
  
  // Retour en haut de page
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    // Afficher/masquer le bouton selon la position de défilement
    function toggleBackToTopButton() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
    
    // Vérifier la position de défilement initial
    toggleBackToTopButton();
    
    // Écouter l'événement de défilement
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Action lors du clic sur le bouton
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    });
  }
  
  // Animation de défilement doux pour tous les liens d'ancrage internes
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajustement pour l'en-tête
          behavior: 'smooth'
        });
      }
    });
  });
});
