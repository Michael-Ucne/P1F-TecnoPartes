function scrollToTop(event) {
    event.preventDefault();
    try {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
        
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 50);
    } catch (error) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}

function scrollToSection(sectionId, event) {
    event.preventDefault();
    
    try {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    } catch (error) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inicioLink = document.querySelector('a[onclick="scrollToTop(event)"]');
    if (inicioLink) {
        inicioLink.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                }, 50);
            } catch (error) {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        });
    }
}); 