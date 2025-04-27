/**
 * temoignage.js
 * Script pour la gestion interactive des témoignages
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation du script de témoignages...');
    
    // Gestion de l'expansion des témoignages en vue détaillée
    const readMoreButtons = document.querySelectorAll('.read-more');
    const readLessButtons = document.querySelectorAll('.read-less');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testimonialCard = this.closest('.testimonial-card');
            const preview = testimonialCard.querySelector('.content-preview');
            const fullContent = testimonialCard.querySelector('.full-content');
            
            preview.style.display = 'none';
            fullContent.classList.remove('hidden');
            this.setAttribute('aria-expanded', 'true');
            
            // Scroll vers le haut du témoignage
            testimonialCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            console.log('Témoignage déplié:', testimonialCard.querySelector('h2').textContent);
        });
    });
    
    readLessButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testimonialCard = this.closest('.testimonial-card');
            const preview = testimonialCard.querySelector('.content-preview');
            const fullContent = testimonialCard.querySelector('.full-content');
            const readMoreButton = testimonialCard.querySelector('.read-more');
            
            preview.style.display = 'block';
            fullContent.classList.add('hidden');
            readMoreButton.setAttribute('aria-expanded', 'false');
            
            // Scroll vers le haut du témoignage
            testimonialCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            console.log('Témoignage replié:', testimonialCard.querySelector('h2').textContent);
        });
    });
    
    // Gestion des témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsList = document.querySelector('.testimonials-list');
    
    // Ajouter des boutons d'expansion pour la vue compacte
    testimonialCards.forEach(card => {
        // Créer le bouton d'expansion pour la vue compacte
        const expansionButton = document.createElement('button');
        expansionButton.className = 'expansion-toggle';
        expansionButton.innerHTML = `
            <i class="fa-solid fa-chevron-down"></i>
            <span class="expand-text">Lire le témoignage</span>
            <span class="collapse-text">Réduire le témoignage</span>
        `;
        
        // Ajouter le bouton à la fin de la section de contenu
        const contentSection = card.querySelector('.testimonial-content');
        contentSection.appendChild(expansionButton);
        
        // Gérer le clic sur le bouton d'expansion
        expansionButton.addEventListener('click', function() {
            card.classList.toggle('expanded');
            
            // Faire défiler jusqu'au témoignage si on le développe
            if (card.classList.contains('expanded')) {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('Témoignage étendu en vue compacte:', card.querySelector('h2').textContent);
            } else {
                console.log('Témoignage réduit en vue compacte:', card.querySelector('h2').textContent);
            }
        });
    });
    
    // Changement de vue (compacte/détaillée)
    const toggleViewButton = document.getElementById('toggle-view');
    
    if (toggleViewButton && testimonialsList) {
        console.log('Bouton de changement de vue trouvé');
        
        // Fonction pour réinitialiser tous les témoignages
        function resetTestimonials() {
            testimonialCards.forEach(card => {
                // Réinitialiser la classe expanded
                card.classList.remove('expanded');
                
                // Réinitialiser l'état du contenu en fonction de la vue active
                const isCompactView = testimonialsList.classList.contains('compact-view');
                const preview = card.querySelector('.content-preview');
                const fullContent = card.querySelector('.full-content');
                const readMoreButton = card.querySelector('.read-more');
                
                if (isCompactView) {
                    // En vue compacte : masquer preview et fullContent
                    if (preview) preview.style.display = 'none';
                    if (fullContent) fullContent.classList.add('hidden');
                } else {
                    // En vue détaillée : afficher preview, masquer fullContent
                    if (preview) preview.style.display = 'block';
                    if (fullContent) fullContent.classList.add('hidden');
                    if (readMoreButton) readMoreButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Vérifier s'il y a une préférence utilisateur sauvegardée
        const preferCompactView = localStorage.getItem('preferCompactView') === 'true';
        
        // Appliquer la préférence si elle existe
        if (preferCompactView) {
            testimonialsList.classList.add('compact-view');
            // Mettre à jour le bouton
            toggleViewButton.querySelector('i').className = 'fa-solid fa-grip';
            toggleViewButton.querySelector('span').textContent = 'Passer en vue détaillée';
            console.log('Préférence utilisateur appliquée: vue compacte');
        } else {
            toggleViewButton.querySelector('i').className = 'fa-solid fa-list';
            toggleViewButton.querySelector('span').textContent = 'Passer en vue compacte';
        }
        
        // Initialiser l'état des témoignages au chargement
        resetTestimonials();
        
        // Configurer l'événement du clic sur le bouton de changement de vue
        toggleViewButton.addEventListener('click', function() {
            // Basculer la vue
            testimonialsList.classList.toggle('compact-view');
            const isCompactView = testimonialsList.classList.contains('compact-view');
            
            // Mettre à jour le bouton
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (isCompactView) {
                icon.className = 'fa-solid fa-grip';
                text.textContent = 'Passer en vue détaillée';
                localStorage.setItem('preferCompactView', 'true');
                console.log('Vue compacte activée');
            } else {
                icon.className = 'fa-solid fa-list';
                text.textContent = 'Passer en vue compacte';
                localStorage.setItem('preferCompactView', 'false');
                console.log('Vue détaillée activée');
            }
            
            // Réinitialiser tous les témoignages après le changement de vue
            resetTestimonials();
        });
    }
    
    // Recherche dans les témoignages
    const searchInput = document.getElementById('testimonial-search');
    const searchButton = document.getElementById('search-button');
    const searchCount = document.getElementById('search-count');
    const controlsSection = document.getElementById('testimonials-controls');
    
    // Ajouter l'effet de scroll au panneau de contrôles
    if (controlsSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 150) {
                controlsSection.classList.add('scrolled');
            } else {
                controlsSection.classList.remove('scrolled');
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsCount = 0;
        
        // Supprimer les surlignages précédents
        document.querySelectorAll('.search-highlight').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
        });
        
        testimonialCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const content = card.querySelector('.testimonial-content').textContent.toLowerCase();
            
            if (searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = '';
                resultsCount++;
                
                // Mettre en surbrillance le terme recherché si présent
                if (searchTerm !== '') {
                    highlightText(card, searchTerm);
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        // Afficher le compteur de résultats
        if (searchTerm !== '') {
            searchCount.textContent = `${resultsCount} résultat${resultsCount > 1 ? 's' : ''}`;
            searchCount.classList.add('visible');
        } else {
            searchCount.classList.remove('visible');
        }
        
        // Afficher un message si aucun résultat
        let noResultsMsg = document.getElementById('no-search-results');
        
        if (resultsCount === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-search-results';
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <p>Aucun témoignage ne correspond à "${searchTerm}"</p>
                    <button id="reset-search" class="reset-button">
                        <i class="fa-solid fa-xmark"></i> Effacer la recherche
                    </button>
                `;
                document.querySelector('#testimonials-container .content-container').appendChild(noResultsMsg);
                
                // Ajouter l'événement pour réinitialiser la recherche
                document.getElementById('reset-search').addEventListener('click', function() {
                    searchInput.value = '';
                    performSearch();
                    searchInput.focus();
                });
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        console.log(`Recherche effectuée: "${searchTerm}" - ${resultsCount} résultats trouvés`);
    }
    
    // Fonction pour mettre en surbrillance le texte
    function highlightText(card, term) {
        const titleNode = card.querySelector('h2');
        const contentNodes = card.querySelectorAll('.testimonial-content p, .content-preview');
        
        // Fonction pour remplacer le texte avec surbrillance
        function replaceText(node, term) {
            if (node.nodeType === 3) { // Nœud de type texte
                const text = node.nodeValue.toLowerCase();
                const index = text.indexOf(term);
                
                if (index >= 0) {
                    const beforeText = node.nodeValue.substring(0, index);
                    const matchedText = node.nodeValue.substring(index, index + term.length);
                    const afterText = node.nodeValue.substring(index + term.length);
                    
                    const beforeNode = document.createTextNode(beforeText);
                    const matchNode = document.createElement('span');
                    matchNode.classList.add('search-highlight');
                    matchNode.textContent = matchedText;
                    const afterNode = document.createTextNode(afterText);
                    
                    const fragment = document.createDocumentFragment();
                    fragment.appendChild(beforeNode);
                    fragment.appendChild(matchNode);
                    fragment.appendChild(afterNode);
                    
                    node.parentNode.replaceChild(fragment, node);
                    return true;
                }
            } else if (node.nodeType === 1) { // Nœud de type élément
                // Ne pas traiter les balises spéciales
                if (node.tagName === 'BUTTON' || node.querySelector('.search-highlight')) {
                    return false;
                }
            }
            return false;
        }
        
        // Fonction récursive pour parcourir tous les nœuds
        function processNode(node, term) {
            if (node.nodeType === 3) { // Nœud de type texte
                if (replaceText(node, term)) {
                    return;
                }
            }
            
            // Parcourir les enfants si c'est un élément
            if (node.nodeType === 1 && node.childNodes && node.childNodes.length > 0) {
                const childNodes = Array.from(node.childNodes);
                for (let i = 0; i < childNodes.length; i++) {
                    processNode(childNodes[i], term);
                }
            }
        }
        
        // Appliquer la surbrillance au titre
        processNode(titleNode, term);
        
        // Appliquer la surbrillance au contenu
        contentNodes.forEach(node => {
            processNode(node, term);
        });
    }
    
    if (searchButton && searchInput && testimonialCards.length > 0) {
        // Événement sur le clic du bouton
        searchButton.addEventListener('click', performSearch);
        
        // Événement sur la touche Entrée
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
            
            // Effacer les résultats quand le champ est vide
            if (searchInput.value === '') {
                performSearch();
            }
        });
        
        // Initialiser l'état de recherche au chargement
        if (searchInput.value !== '') {
            performSearch();
        }
    }
    
    // Partage des témoignages
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.testimonial-card');
            const title = card.querySelector('h2').textContent;
            const testimonialId = card.id || card.dataset.testimonialId;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Témoignage: ' + title,
                    text: 'Découvre ce témoignage sur Trans-cryption',
                    url: window.location.href.split('#')[0] + '#' + testimonialId
                })
                .catch(error => console.log('Erreur de partage:', error));
            } else {
                // Fallback: copier le lien dans le presse-papier
                const dummyInput = document.createElement('input');
                dummyInput.value = window.location.href.split('#')[0] + '#' + testimonialId;
                document.body.appendChild(dummyInput);
                dummyInput.select();
                document.execCommand('copy');
                document.body.removeChild(dummyInput);
                
                // Afficher une notification
                const notification = document.createElement('div');
                notification.className = 'share-notification';
                notification.textContent = 'Lien copié dans le presse-papier !';
                document.body.appendChild(notification);
                
                // Supprimer la notification après 3 secondes
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => notification.remove(), 500);
                }, 2500);
                
                console.log('Lien copié dans le presse-papier pour le témoignage:', title);
            }
        });
    });
    
    // Vérifier si l'URL contient un identifiant de témoignage
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Attendre un peu pour permettre au DOM de se stabiliser
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Mettre en évidence brièvement le témoignage cible
                targetElement.classList.add('highlight-testimony');
                setTimeout(() => targetElement.classList.remove('highlight-testimony'), 3000);
                
                console.log('Témoignage ciblé trouvé:', targetId);
            }, 300);
        }
    }
});
