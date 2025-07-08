// Authentication check
function checkAuth() {
    // Simular verificación de autenticación
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirigir a la página de login
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Para propósitos de demo, comentar la línea siguiente para poder ver la página
    // checkAuth();

    // Actualizar contador del carrito
    updateCartCounter();
});

// Cart functionality
let cart = [];

function addToCart(productName, category) {
    cart.push({
        name: productName,
        category: category
    });
    updateCartCounter();

    // Mostrar confirmación
    alert(`${productName} agregado al carrito!`);

    // Navegar a la categoría correspondiente
    navigateToCategory(category);
}

function updateCartCounter() {
    const cartButtons = document.querySelectorAll('button:contains("Carrito")');
    cartButtons.forEach(button => {
        if (button.textContent.includes('Carrito')) {
            button.textContent = `🛒 Carrito (${cart.length})`;
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Navigate to category
function navigateToCategory(category) {
    console.log('Navegando a categoría:', category);
    // Aquí puedes agregar la lógica de navegación real
    if (category === 'instrumentos') {
        // window.location.href = 'instrumentos.html';
        alert('Navegando a Instrumentos');
    } else if (category === 'accesorios') {
        // window.location.href = 'accesorios.html';
        alert('Navegando a Accesorios y Audio');
    }
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (email === '') {
        alert('Por favor, ingresa tu correo electrónico');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Simular suscripción
    alert('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.');
    emailInput.value = '';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = event.target.closest('button');

    if (!mobileMenu.contains(event.target) && !menuButton) {
        mobileMenu.classList.add('hidden');
    }
});

// Helper function to find buttons by text content
function updateCartButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('🛒 Carrito')) {
            button.textContent = `🛒 Carrito (${cart.length})`;
        }
    });
}

// Update cart counter properly
function updateCartCounter() {
    updateCartButtons();
}