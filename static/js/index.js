function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
    loadCartFromStorage();
    updateCartCounter();
    updateCartDisplay();
});

let cart = [];

const products = {
    'Guitarra Acústica': { price: 299.99, category: 'instrumentos' },
    'Teclado Digital': { price: 199.99, category: 'instrumentos' },
    'Amplificador': { price: 79.99, category: 'accesorios' },
    'Micrófono': { price: 149.99, category: 'accesorios' },
    'Guitarra Fender Stratocaster': { price: 499.99, category: 'instrumentos' },
    'Teclado Yamaha PSR-E373': { price: 299.99, category: 'instrumentos' },
    'Batería Acústica Pearl Roadshow': { price: 699.99, category: 'instrumentos' },
    'Guitarra Ibanez RG450DX': { price: 549.99, category: 'instrumentos' },
    'Teclado Casio CT-X700': { price: 199.99, category: 'instrumentos' },
    'Batería Alesis Nitro Mesh': { price: 399.99, category: 'instrumentos' },
    'Saxofón Jean Paul AS-400': { price: 699.99, category: 'instrumentos' },
    'Trompeta Bach TR300H2': { price: 499.99, category: 'instrumentos' },
    'Guitarra Acústica Yamaha F310': { price: 159.99, category: 'instrumentos' },
    'Bajo Fender Jazz Bass': { price: 749.99, category: 'instrumentos' },
    'Teclado Roland GO:KEYS': { price: 319.99, category: 'instrumentos' },
    'Batería Tama Imperialstar': { price: 799.99, category: 'instrumentos' },
    'Flauta Yamaha YFL-222': { price: 549.99, category: 'instrumentos' },
    'Clarinete Cecilio MCT': { price: 179.99, category: 'instrumentos' },
    'Teclado Kawai ES110': { price: 649.99, category: 'instrumentos' },
    'Guitarra Acústica Fender CD-60S': { price: 199.99, category: 'instrumentos' },
    'Batería Acústica Ludwig Accent': { price: 589.99, category: 'instrumentos' },
    'Piano Digital Casio Privia PX-160': { price: 499.99, category: 'instrumentos' },
    'Trompeta Yamaha YTR-2330': { price: 599.99, category: 'instrumentos' },
    'Guitarra Eléctrica Epiphone Les Paul': { price: 429.99, category: 'instrumentos' },
    'Cajón Flamenco Meinl': { price: 129.99, category: 'instrumentos' },
    'Ukelele Kala KA-15S': { price: 69.99, category: 'instrumentos' },
    'Batería Digital Roland TD-1K': { price: 599.99, category: 'instrumentos' },
    'Teclado Yamaha NP-32': { price: 299.99, category: 'instrumentos' },
    'Saxofón Tenor Mendini MTS-L': { price: 529.99, category: 'instrumentos' },
    'Guitarra Cort CR250': { price: 399.99, category: 'instrumentos' },
    'Piano Digital Yamaha P-45': { price: 479.99, category: 'instrumentos' },
    'Guitarra Acústica Takamine GD20': { price: 349.99, category: 'instrumentos' },
    'Batería Acústica Mapex Tornado': { price: 449.99, category: 'instrumentos' },
    'Teclado Medeli MK401': { price: 229.99, category: 'instrumentos' }
};

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('harmonyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('harmonyCart', JSON.stringify(cart));
}

function addToCart(productName, category) {
    const product = products[productName];
    if (!product) {
        showNotification('Producto no encontrado', 'error');
        return;
    }

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${productName} agregado al carrito (${existingItem.quantity})`, 'success');
    } else {
        cart.push({
            name: productName,
            category: category || product.category,
            price: product.price,
            quantity: 1
        });
        showNotification(`${productName} agregado al carrito!`, 'success');
    }

    saveCartToStorage();
    updateCartCounter();
    updateCartDisplay();
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index > -1) {
        cart.splice(index, 1);
        saveCartToStorage();
        updateCartCounter();
        updateCartDisplay();
        showNotification(`${productName} eliminado del carrito`, 'info');
    }
}

function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            saveCartToStorage();
            updateCartCounter();
            updateCartDisplay();
        }
    }
}

function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('🛒 Carrito')) {
            button.textContent = `🛒 Carrito (${totalItems})`;
        }
    });
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !emptyMessage || !cartTotal) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyMessage.style.display = 'block';
        cartTotal.textContent = 'S/. 0.00';
        return;
    }

    emptyMessage.style.display = 'none';

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item bg-gray-50 p-3 rounded-lg">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-semibold text-charcoal">${item.name}</h4>
                    <p class="text-sm text-gray-600">S/. ${item.price.toFixed(2)} c/u</p>
                </div>
                <button onclick="removeFromCart('${item.name}')" class="cart-item-remove text-red-500 hover:text-red-700 ml-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="flex justify-between items-center mt-2">
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity('${item.name}', -1)" class="w-6 h-6 bg-gray-200 rounded-full text-sm hover:bg-gray-300">-</button>
                    <span class="font-medium">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)" class="w-6 h-6 bg-gray-200 rounded-full text-sm hover:bg-gray-300">+</button>
                </div>
                <span class="font-bold text-muted-gold">S/. ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `S/. ${total.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (confirm(`¿Confirmas el pago por un total de S/. ${total.toFixed(2)}?`)) {
        showNotification('Procesando pago...', 'info');

        const orderNumber = Math.floor(Math.random() * 1000000);

        cart = [];
        saveCartToStorage();

        updateCartCounter();
        updateCartDisplay();

        toggleCart();

        setTimeout(() => {
            alert(`¡Pago exitoso! Número de orden: #${orderNumber}`);
        }, 1000);
    }
}

function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartCounter();
    updateCartDisplay();
    showNotification('Carrito vaciado', 'info');
}



function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function addToCartAndNavigate(productName, category) {
    const product = {
        'Guitarra Acústica': { price: 299.99, category: 'instrumentos' },
        'Teclado Digital': { price: 199.99, category: 'instrumentos' },
        'Amplificador': { price: 79.99, category: 'accesorios' },
        'Micrófono': { price: 149.99, category: 'accesorios' },
    };

    let cart = JSON.parse(localStorage.getItem('harmonyCart') || '[]');

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            category: category,
            price: product[productName].price,
            quantity: 1
        });
    }

    localStorage.setItem('harmonyCart', JSON.stringify(cart));

    showNotification(`${productName} agregado al carrito! Redirigiendo...`, 'success');

    setTimeout(() => {
        if (category === 'instrumentos') {
            window.location.href = 'instrumentos.html';
        } else if (category === 'accesorios') {
            window.location.href = 'accesorios.html';
        }
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };

    notification.className += ` ${styles[type] || styles.info}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function navigateToCategory(category) {
    if (category === 'instrumentos') {
        window.location.href = 'instrumentos.html';
    } else if (category === 'accesorios') {
        window.location.href = 'accesorios.html';
    }
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (email === '') {
        showNotification('Por favor, ingresa tu correo electrónico', 'warning');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un correo electrónico válido', 'warning');
        return;
    }

    showNotification('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.', 'success');
    emailInput.value = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    const menuButton = event.target.closest('button');

    if (!mobileMenu.contains(event.target) && !menuButton) {
        mobileMenu.classList.add('hidden');
    }
});

function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');

        cart = [];
        localStorage.removeItem('harmonyCart');

        showNotification('Has cerrado sesión exitosamente', 'info');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

function getCartInfo() {
    return {
        items: cart,
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
}

function emptyCart() {
    cart = [];
    saveCartToStorage();
    updateCartCounter();
    updateCartDisplay();
}