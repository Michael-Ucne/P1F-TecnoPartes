function initializeHelpModals() {
    const modalButtons = document.querySelectorAll('.help-modal-btn');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openHelpModal(modalId);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openHelpModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
        
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modalId));
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    initializeHelpModals();
}); 