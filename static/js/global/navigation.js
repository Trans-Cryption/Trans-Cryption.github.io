/**
 * navigation.js
 * Script pour gérer la navigation mobile (menu burger)
*/

document.addEventListener('DOMContentLoaded', () => {
  // Éléments du DOM
  const burgerMenu = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu');
  
  // Ouvrir/fermer le menu burger
  if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      menu.classList.toggle('active');
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
