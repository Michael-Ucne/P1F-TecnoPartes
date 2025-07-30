document.addEventListener('DOMContentLoaded', function() {
    const passwordToggleBtn = document.getElementById('password-toggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggleBtn && passwordInput) {
        passwordToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', newType);
            
            const icon = passwordToggleBtn.querySelector('i');
            if (icon) {
                icon.className = newType === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
            }
            
            const newLabel = newType === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña';
            passwordToggleBtn.setAttribute('aria-label', newLabel);
        });
    }
}); 