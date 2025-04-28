/**
 * navigation.js
 * Script pour gérer la navigation et le retour en haut de page
*/

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM chargé, initialisation de la navigation...');
  
  // Gestion du menu (avec checkbox HTML)
  const menuLinks = document.querySelectorAll('.menu a');
  const menuToggle = document.getElementById('menu-toggle');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Fermer le menu quand on clique sur un lien
  if (menuToggle) {
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.checked = false;
      });
    });
    
    // Fermer le menu quand on clique sur l'overlay
    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => {
        menuToggle.checked = false;
      });
    }
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
