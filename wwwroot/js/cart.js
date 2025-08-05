


let cartComponentRef = null;


function initializeCart() {

    

    setupDesktopCart();
    

    setupMobileCart();
    

    setupAutoClose();
    

}


function initializeCartOutsideClick(dotNetRef) {

    cartComponentRef = dotNetRef;
    

    document.addEventListener('click', handleOutsideClick);
    

}


function handleOutsideClick(event) {

    setTimeout(() => {

        const desktopCart = document.querySelector('.cart-dropdown-desktop');
        const mobileCart = document.querySelector('.mobile-cart-overlay');
        

        const isDesktopCartOpen = desktopCart && 
            desktopCart.offsetParent !== null && 
            window.getComputedStyle(desktopCart).display !== 'none';
            
        const isMobileCartOpen = mobileCart && 
            mobileCart.offsetParent !== null && 
            window.getComputedStyle(mobileCart).display !== 'none';
        
        if (!isDesktopCartOpen && !isMobileCartOpen) {

        }
        

        const cartSelectors = [
            '.cart-wrapper-desktop',
            '.cart-dropdown-desktop',
            '.cart-btn-desktop',
            '.cart-wrapper-mobile',
            '.mobile-cart-overlay',
            '.mobile-cart-content',
            '.cart-btn-mobile',
            '.navbar-actions',
            '.navbar-controls'
        ];
        
        let clickedInsideCart = false;
        

        for (const selector of cartSelectors) {
            const element = document.querySelector(selector);
            if (element && (element.contains(event.target) || element === event.target)) {
                clickedInsideCart = true;
                break;
            }
        }
        

        const target = event.target;
        if (target.closest('.cart-wrapper-desktop') || 
            target.closest('.cart-wrapper-mobile') ||
            target.closest('.cart-dropdown-desktop') ||
            target.closest('.mobile-cart-overlay') ||
            target.classList.contains('cart-btn-desktop') ||
            target.classList.contains('cart-btn-mobile')) {
            clickedInsideCart = true;
        }
        

        if (!clickedInsideCart && cartComponentRef) {

            cartComponentRef.invokeMethodAsync('CloseCartFromOutside');
        }
    }, 10);
}


function cleanupCartOutsideClick() {

    document.removeEventListener('click', handleOutsideClick);
    cartComponentRef = null;

}


function setupDesktopCart() {
    const cartWrapper = document.querySelector('.cart-wrapper-desktop');
    const cartButton = document.querySelector('.cart-btn-desktop');
    const cartDropdown = document.querySelector('.cart-dropdown-desktop');
    
    if (!cartWrapper || !cartButton) {

        return;
    }
    
    let hoverTimeout;
    let isOpen = false;
    

    cartWrapper.addEventListener('mouseenter', () => {

        clearTimeout(hoverTimeout);
        
        if (!isOpen) {
            openDesktopCart();
        }
    });
    

    cartWrapper.addEventListener('mouseleave', () => {

        hoverTimeout = setTimeout(() => {
            if (isOpen) {
                closeDesktopCart();
            }
        }, 300);
    });
    

    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        
        if (isOpen) {
            closeDesktopCart();
        } else {
            openDesktopCart();
        }
    });
    

    function openDesktopCart() {
        if (cartDropdown) {
            cartDropdown.style.display = 'block';
            cartDropdown.style.opacity = '0';
            cartDropdown.style.transform = 'translateY(-10px)';
            

            setTimeout(() => {
                cartDropdown.style.opacity = '1';
                cartDropdown.style.transform = 'translateY(0)';
            }, 10);
            
            isOpen = true;

        }
    }
    

    function closeDesktopCart() {
        if (cartDropdown) {
            cartDropdown.style.opacity = '0';
            cartDropdown.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                cartDropdown.style.display = 'none';
            }, 300);
            
            isOpen = false;

        }
    }
    

    window.openDesktopCart = openDesktopCart;
    window.closeDesktopCart = closeDesktopCart;
}


function setupMobileCart() {
    const cartButton = document.querySelector('.cart-btn-mobile');
    const cartOverlay = document.querySelector('.mobile-cart-overlay');
    const closeButton = document.querySelector('.mobile-cart-close');
    
    if (!cartButton) {

        return;
    }
    

    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        
        if (cartOverlay) {
            cartOverlay.style.display = 'flex';
            cartOverlay.style.opacity = '0';
            
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
            }, 10);
        }
    });
    

    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            
            if (cartOverlay) {
                cartOverlay.style.opacity = '0';
                setTimeout(() => {
                    cartOverlay.style.display = 'none';
                }, 300);
            }
        });
    }
    

    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {

                cartOverlay.style.opacity = '0';
                setTimeout(() => {
                    cartOverlay.style.display = 'none';
                }, 300);
            }
        });
    }
}


function setupAutoClose() {

    document.addEventListener('click', (e) => {
        const cartWrapper = document.querySelector('.cart-wrapper-desktop');
        const cartDropdown = document.querySelector('.cart-dropdown-desktop');
        
        if (cartWrapper && cartDropdown && 
            !cartWrapper.contains(e.target) && 
            cartDropdown.style.display === 'block') {
            

            cartDropdown.style.opacity = '0';
            cartDropdown.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                cartDropdown.style.display = 'none';
            }, 300);
        }
    });
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartDropdown = document.querySelector('.cart-dropdown-desktop');
            const cartOverlay = document.querySelector('.mobile-cart-overlay');
            
            if (cartDropdown && cartDropdown.style.display === 'block') {

                cartDropdown.style.opacity = '0';
                cartDropdown.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    cartDropdown.style.display = 'none';
                }, 300);
            }
            
            if (cartOverlay && cartOverlay.style.display === 'flex') {

                cartOverlay.style.opacity = '0';
                setTimeout(() => {
                    cartOverlay.style.display = 'none';
                }, 300);
            }
        }
    });
}


function updateCartBadge(count) {
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    });
    

}


function showCartNotification(message, type = 'success') {

    const notification = document.createElement('div');
    notification.className = `cart-notification cart-notification-${type}`;
    notification.textContent = message;
    

    document.body.appendChild(notification);
    

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    

}


window.initializeCart = initializeCart;
window.updateCartBadge = updateCartBadge;
window.showCartNotification = showCartNotification;


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    initializeCart();
}

 