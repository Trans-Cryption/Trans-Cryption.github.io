/**
 * temoignage.js
 * Script pour la gestion interactive des témoignages
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation du script de témoignages...');
    
    // Fonction pour normaliser les chaînes de caractères en supprimant les accents
    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
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
            const isExpanded = card.classList.toggle('expanded');
            
            // Mettre à jour l'icône et le texte en fonction de l'état
            const icon = this.querySelector('i');
            
            if (isExpanded) {
                icon.className = 'fa-solid fa-chevron-up';
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('Témoignage étendu en vue compacte:', card.querySelector('h2').textContent);
            } else {
                icon.className = 'fa-solid fa-chevron-down';
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
                
                // Réinitialiser les icônes des boutons d'expansion
                const expansionButton = card.querySelector('.expansion-toggle');
                if (expansionButton) {
                    const icon = expansionButton.querySelector('i');
                    if (icon) {
                        icon.className = 'fa-solid fa-chevron-down';
                    }
                }
                
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
        
        // Par défaut, utiliser la vue détaillée sauf si l'utilisateur a explicitement choisi la vue compacte
        if (preferCompactView) {
            testimonialsList.classList.add('compact-view');
            // Mettre à jour le bouton
            toggleViewButton.querySelector('i').className = 'fa-solid fa-grip';
            toggleViewButton.querySelector('span').textContent = 'Passer en vue détaillée';
            console.log('Préférence utilisateur appliquée: vue compacte');
        } else {
            // Vue détaillée est appliquée par défaut (pas besoin d'ajouter de classe)
            toggleViewButton.querySelector('i').className = 'fa-solid fa-list';
            toggleViewButton.querySelector('span').textContent = 'Passer en vue compacte';
            console.log('Vue détaillée appliquée (défaut)');
            
            // Assurer que la vue compacte est désactivée (au cas où)
            testimonialsList.classList.remove('compact-view');
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
    
    // Fonction pour mettre à jour le message "aucun résultat"
    function updateNoResultsMessage(resultsCount, searchTerm) {
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
                    resetTagFilters();
                    performSearch();
                    searchInput.focus();
                });
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Fonction pour restaurer le contenu original avant toute nouvelle recherche
    function resetOriginalContent(card) {
        // Réinitialiser le titre
        resetNodeContent(card.querySelector('h2'));
        
        // Réinitialiser le contenu principal
        const contentNodes = card.querySelectorAll('.testimonial-content p, .content-preview');
        contentNodes.forEach(node => {
            resetNodeContent(node);
        });
        
        // Réinitialiser les éléments imbriqués dans les paragraphes de contenu
        const contentContainer = card.querySelector('.testimonial-content');
        if (contentContainer) {
            const paragraphs = contentContainer.querySelectorAll('p');
            paragraphs.forEach(p => {
                resetNodeContent(p);
            });
        }
    }

    // Fonction pour réinitialiser un nœud spécifique en supprimant les surlignages
    function resetNodeContent(node) {
        if (!node) return;
        
        // Trouver tous les éléments de surbrillance dans ce nœud
        const highlights = node.querySelectorAll('.search-highlight');
        
        if (highlights.length > 0) {
            // Parcourir tous les éléments de surbrillance et les remplacer par leur contenu texte
            highlights.forEach(highlight => {
                const textNode = document.createTextNode(highlight.textContent);
                highlight.parentNode.replaceChild(textNode, highlight);
            });
        }
        
        // Normaliser le nœud pour fusionner les nœuds de texte adjacents
        if (node.normalize) {
            node.normalize();
        }
    }
    
    // Fonction pour la recherche
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const normalizedSearchTerm = normalizeString(searchTerm);
        let resultsCount = 0;
        
        // Réinitialiser les filtres de tags si la recherche est active
        if (searchTerm !== '') {
            resetTagFilters();
        }
        
        // Restaurer le contenu original des témoignages avant d'appliquer la nouvelle recherche
        testimonialCards.forEach(card => {
            resetOriginalContent(card);
        });
        
        // Appliquer la nouvelle recherche
        testimonialCards.forEach(card => {
            const titleElement = card.querySelector('h2');
            const contentElement = card.querySelector('.testimonial-content');
            
            // Texte original pour l'affichage
            const title = titleElement.textContent.toLowerCase();
            const content = contentElement.textContent.toLowerCase();
            
            // Texte normalisé pour la recherche
            const normalizedTitle = normalizeString(title);
            const normalizedContent = normalizeString(content);
            
            // Rechercher dans les tags
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => 
                tag.textContent.toLowerCase().trim()
            );
            const normalizedTags = tags.map(tag => normalizeString(tag));
            
            if (searchTerm === '' || 
                normalizedTitle.includes(normalizedSearchTerm) || 
                normalizedContent.includes(normalizedSearchTerm) ||
                normalizedTags.some(tag => tag.includes(normalizedSearchTerm))) {
                
                card.style.display = '';
                resultsCount++;
                
                // Mettre en surbrillance le terme recherché si présent
                if (searchTerm !== '') {
                    highlightText(card, searchTerm, normalizedSearchTerm);
                    
                    // Mettre en évidence les tags correspondants
                    card.querySelectorAll('.tag').forEach(tagElement => {
                        const tagText = tagElement.textContent.toLowerCase();
                        const normalizedTagText = normalizeString(tagText);
                        
                        if (normalizedTagText.includes(normalizedSearchTerm)) {
                            tagElement.style.backgroundColor = 'rgba(255, 0, 212, 0.25)';
                        } else {
                            tagElement.style.backgroundColor = '';
                        }
                    });
                } else {
                    // Réinitialiser les styles des tags
                    card.querySelectorAll('.tag').forEach(tagElement => {
                        tagElement.style.backgroundColor = '';
                    });
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
        updateNoResultsMessage(resultsCount, searchTerm);
    }
    
    // Fonction pour mettre en surbrillance le texte
    function highlightText(card, term, normalizedTerm) {
        const titleNode = card.querySelector('h2');
        const contentNodes = card.querySelectorAll('.testimonial-content p, .content-preview');
        
        // Fonction pour trouver les occurrences normalisées et mettre en surbrillance le texte original
        function processNodeContent(node) {
            if (node.nodeType === 3) { // Nœud de type texte
                const originalText = node.nodeValue;
                const normalizedText = normalizeString(originalText.toLowerCase());
                
                let startPos = 0;
                let fragments = [];
                let found = false;
                
                // Chercher toutes les occurrences du terme normalisé
                let pos = normalizedText.indexOf(normalizedTerm, startPos);
                while (pos >= 0) {
                    found = true;
                    // Ajouter le texte avant l'occurrence
                    if (pos > startPos) {
                        fragments.push(document.createTextNode(originalText.substring(startPos, pos)));
                    }
                    
                    // Créer l'élément de surbrillance avec le texte original correspondant
                    const matchNode = document.createElement('span');
                    matchNode.classList.add('search-highlight');
                    matchNode.textContent = originalText.substring(pos, pos + term.length);
                    fragments.push(matchNode);
                    
                    // Continuer la recherche
                    startPos = pos + normalizedTerm.length;
                    pos = normalizedText.indexOf(normalizedTerm, startPos);
                }
                
                // Ajouter le reste du texte
                if (startPos < originalText.length) {
                    fragments.push(document.createTextNode(originalText.substring(startPos)));
                }
                
                // Remplacer le nœud original si des correspondances ont été trouvées
                if (found) {
                    const fragment = document.createDocumentFragment();
                    fragments.forEach(f => fragment.appendChild(f));
                    node.parentNode.replaceChild(fragment, node);
                    return true;
                }
            }
            return false;
        }
        
        // Fonction récursive pour parcourir tous les nœuds
        function processNode(node) {
            if (node.nodeType === 3) { // Nœud de type texte
                if (processNodeContent(node)) {
                    return;
                }
            }
            
            // Ne pas traiter les balises spéciales
            if (node.nodeType === 1 && node.tagName !== 'BUTTON' && !node.classList.contains('search-highlight')) {
                // Parcourir les enfants si c'est un élément
                if (node.childNodes && node.childNodes.length > 0) {
                    // Faire une copie de la liste pour éviter les problèmes lors de la modification
                    const childNodes = Array.from(node.childNodes);
                    for (let i = 0; i < childNodes.length; i++) {
                        processNode(childNodes[i]);
                    }
                }
            }
        }
        
        // Appliquer la surbrillance au titre et au contenu
        processNode(titleNode);
        contentNodes.forEach(node => {
            processNode(node);
        });
    }
    
    // Filtrage par tag
    const tagFilters = document.querySelectorAll('.tag-filter');
    
    // Fonction pour réinitialiser les filtres de tags
    function resetTagFilters() {
        tagFilters.forEach(btn => {
            if (btn.dataset.tag === '') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Fonction pour filtrer par tag
    function filterByTag(tagName) {
        // Vider le champ de recherche
        if (searchInput.value !== '') {
            searchInput.value = '';
            searchCount.classList.remove('visible');
        }
        
        // Mise à jour des boutons de filtre
        tagFilters.forEach(btn => {
            if (btn.dataset.tag === tagName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Filtrage des témoignages
        if (tagName === '') {
            // Afficher tous les témoignages si aucun tag n'est sélectionné
            testimonialCards.forEach(card => {
                card.style.display = '';
            });
            
            // Supprimer le fragment d'URL
            history.pushState("", document.title, window.location.pathname);
        } else {
            // Sinon, n'afficher que les témoignages avec le tag spécifié
            testimonialCards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.dataset.tag || tag.textContent.trim());
                
                if (cardTags.includes(tagName)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Mettre à jour l'URL avec le tag sélectionné
            history.pushState("", document.title, `#tag=${encodeURIComponent(tagName)}`);
        }
        
        // Mettre à jour le message si aucun résultat
        updateNoResultsMessage(
            Array.from(testimonialCards).filter(card => card.style.display !== 'none').length,
            `tag: ${tagName}`
        );
    }
    
    // Attacher les écouteurs d'événements aux boutons de filtrage
    tagFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const tagName = this.dataset.tag;
            filterByTag(tagName);
        });
    });
    
    // Vérifier si un tag est présent dans l'URL au chargement
    if (window.location.hash.startsWith('#tag=')) {
        const tagName = decodeURIComponent(window.location.hash.substring(5));
        filterByTag(tagName);
    }
    
    if (searchButton && searchInput) {
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
    if (window.location.hash && !window.location.hash.startsWith('#tag=')) {
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
