function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToTopSmooth() {
    const currentPosition = window.pageYOffset;
    const targetPosition = 0;
    const distance = targetPosition - currentPosition;
    const duration = 800;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, currentPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

function scrollToSection(sectionId) {
    
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header-main')?.offsetHeight || 80;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}


function scrollToSectionWithRetry(sectionId) {
    let attempts = 0;
    const maxAttempts = 5;
    
    function tryScroll() {
        attempts++;
        
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header-main')?.offsetHeight || 80;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            return true;
        } else {
            if (attempts < maxAttempts) {
                setTimeout(tryScroll, 200);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    tryScroll();
}

function navigateToHeroSection(sectionId) {
    if (window.location.hash !== `#${sectionId}`) {
        window.location.hash = `#${sectionId}`;
    }
    
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header-main')?.offsetHeight || 80;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}


function getAttribute(element, attributeName) {
    return element.getAttribute(attributeName) || '';
}


function closeMobileMenuOnOutsideClick() {
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbar && navbar.classList.contains('show') && 
            !navbar.contains(event.target) && 
            !navbarToggler.contains(event.target)) {
            navbarToggler.click();
        }
    });
}


function closeMobileCartOnEscape() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mobileCartOverlay = document.querySelector('.mobile-cart-overlay');
            if (mobileCartOverlay && mobileCartOverlay.style.display !== 'none') {
                const closeButton = mobileCartOverlay.querySelector('.mobile-cart-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });
}


function initializeNavigation() {
    closeMobileMenuOnOutsideClick();
    closeMobileCartOnEscape();
    

    window.addEventListener('scroll', function() {
        const sections = ['productos', 'categorias', 'ofertas'];
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}


window.scrollToTop = scrollToTop;
window.scrollToTopSmooth = scrollToTopSmooth;
window.scrollToSection = scrollToSection;
window.scrollToSectionWithRetry = scrollToSectionWithRetry;
window.navigateToHeroSection = navigateToHeroSection;
window.getAttribute = getAttribute; 