
// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Funcionalidad de cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        alert('Has cerrado sesión exitosamente');
        window.location.href = 'login.html';
    }
}

//Iniciar página
document.addEventListener('DOMContentLoaded', function () {
    // Cerrar menu cuando le das a cerrar sesión
    document.addEventListener('click', function (event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = event.target.closest('button');

        if (!mobileMenu.contains(event.target) && !menuButton) {
            mobileMenu.classList.add('hidden');
        }
    });
});