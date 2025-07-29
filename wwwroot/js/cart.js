function goToProducts() {
    const element = document.getElementById('productos');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const cartDropdownMobile = document.getElementById('cartDropdownMobile');
        if (cartDropdownMobile) {
            cartDropdownMobile.classList.remove('show');
        }
    }
}

function toggleCart(event) {
    event.preventDefault();
    
    if (window.innerWidth < 992) {
        const cartDropdownMobile = document.getElementById('cartDropdownMobile');
        if (cartDropdownMobile) {
            cartDropdownMobile.classList.toggle('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            const cartIconMobile = document.getElementById('cartIconMobile');
            const cartDropdownMobile = document.getElementById('cartDropdownMobile');
            
            if (cartIconMobile && cartDropdownMobile && 
                !cartIconMobile.contains(e.target) && 
                !cartDropdownMobile.contains(e.target)) {
                cartDropdownMobile.classList.remove('show');
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            const cartDropdownMobile = document.getElementById('cartDropdownMobile');
            if (cartDropdownMobile) {
                cartDropdownMobile.classList.remove('show');
            }
        }
    });
}); 