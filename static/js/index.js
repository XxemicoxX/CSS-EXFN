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
    updateCartCounter();
    updateCartDisplay();
});

let cart = [];

const products = {
    'Guitarra Acústica': { price: 299.99, category: 'instrumentos' },
    'Teclado Digital': { price: 199.99, category: 'instrumentos' },
    'Amplificador': { price: 79.99, category: 'accesorios' },
    'Micrófono': { price: 149.99, category: 'accesorios' }
};

function addToCart(productName, category) {
    const product = products[productName];
    if (!product) return;
    
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            category: category,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartCounter();
    updateCartDisplay();
    
    alert(`${productName} agregado al carrito!`);
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartCounter();
        updateCartDisplay();
    }
}

function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
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
    
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (confirm(`¿Confirmas el pago por un total de S/. ${total.toFixed(2)}?`)) {
        alert('Procesando pago...');
        
        const orderNumber = Math.floor(Math.random() * 1000000);
        
        cart = [];
        
        updateCartCounter();
        updateCartDisplay();
        
        toggleCart();
        
        setTimeout(() => {
            alert(`¡Pago exitoso!\n\nNúmero de orden: #${orderNumber}\nTotal pagado: S/. ${total.toFixed(2)}\n\n¡Gracias por tu compra!`);
        }, 500);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}


function navigateToCategory(category) {
    console.log('Navegando a categoría:', category);

    if (category === 'instrumentos') {
        window.location.href = 'instrumentos.html';
        alert('Navegando a Instrumentos');
    } else if (category === 'accesorios') {
        window.location.href = 'accesorios.html';
        alert('Navegando a Accesorios y Audio');
    }
}

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

    alert('¡Gracias por suscribirte! Te enviaremos las mejores ofertas.');
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

        alert('Has cerrado sesión exitosamente');

        window.location.href = 'login.html';
    }
}