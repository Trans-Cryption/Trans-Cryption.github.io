/**
 * navigation.js
 * Script pour gérer la navigation mobile (menu burger)
*/

document.addEventListener('DOMContentLoaded', () => {
  // Éléments du DOM
  const burgerMenu = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu');
  
  // Déboggage - vérifier si les éléments sont trouvés
  console.log('Menu burger trouvé:', burgerMenu !== null);
  console.log('Menu trouvé:', menu !== null);
  
  // Ouvrir/fermer le menu burger
  if (burgerMenu && menu) {
    burgerMenu.addEventListener('click', (e) => {
      e.preventDefault(); // Éviter tout comportement par défaut
      e.stopPropagation(); // Empêcher la propagation de l'événement
      
      burgerMenu.classList.toggle('active');
      menu.classList.toggle('active');
      
      console.log('Menu burger cliqué - État active:', menu.classList.contains('active'));
    });
    
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = menu.contains(event.target);
      const isClickOnBurger = burgerMenu.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnBurger && menu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        menu.classList.remove('active');
      }
    });
    
    // Ajouter des événements de fermeture pour les liens du menu
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  } else {
    console.error('Menu burger ou menu principal non trouvé dans le DOM');
  }
  
  // Retour en haut de page
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
