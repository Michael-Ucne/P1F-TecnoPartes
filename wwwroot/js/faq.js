function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                searchFAQ(searchTerm);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm) {
                    searchFAQ(searchTerm);
                }
            }
        });
    }
}

function searchFAQ(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    let foundItems = 0;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h4');
        const answer = item.querySelector('.faq-answer p');
        
        if (question && answer) {
            const questionText = question.textContent.toLowerCase();
            const answerText = answer.textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                foundItems++;
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    const faqList = document.querySelector('.faq-list');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (foundItems === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message text-center py-4';
            noResultsMsg.innerHTML = `
                <i class="bi bi-search fs-1 text-muted mb-3"></i>
                <h4 class="text-muted">No se encontraron resultados</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
            `;
            faqList.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeSearch();
});

if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        setTimeout(function() {
            initializeFAQ();
            initializeSearch();
        }, 100);
    });
} 