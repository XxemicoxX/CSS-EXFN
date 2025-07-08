document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.getElementById('filtroCategoria');
    const tipoSelect = document.getElementById('filtroTipo');
    const marcaSelect = document.getElementById('filtroMarca');
    const productos = document.querySelectorAll('#productos > div');

    function filtrarProductos() {
        const categoria = categoriaSelect.value.toLowerCase();
        const tipo = tipoSelect.value.toLowerCase();
        const marca = marcaSelect.value.toLowerCase();

        productos.forEach(producto => {
            const texto = producto.innerText.toLowerCase();

            const coincideCategoria = categoria === 'todos' || texto.includes(categoria);
            const coincideTipo = tipo === 'todos' || texto.includes(tipo);
            const coincideMarca = marca === 'todas' || texto.includes(marca);

            if (coincideCategoria && coincideTipo && coincideMarca) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    }

    categoriaSelect.addEventListener('change', filtrarProductos);
    tipoSelect.addEventListener('change', filtrarProductos);
    marcaSelect.addEventListener('change', filtrarProductos);
});
const carrito = [];
const contadorCarrito = document.getElementById('contadorCarrito');
const contenidoCarrito = document.getElementById('contenidoCarrito');
const modalCarrito = document.getElementById('modalCarrito');
const overlayCarrito = document.getElementById('overlayCarrito');

// Abrir y cerrar modal
document.getElementById('btnCarrito').addEventListener('click', () => {
    modalCarrito.classList.remove('translate-x-full');
    overlayCarrito.classList.remove('hidden');
});

document.getElementById('cerrarCarrito').addEventListener('click', () => {
    modalCarrito.classList.add('translate-x-full');
    overlayCarrito.classList.add('hidden');
});

overlayCarrito.addEventListener('click', () => {
    modalCarrito.classList.add('translate-x-full');
    overlayCarrito.classList.add('hidden');
});

// Agregar producto al carrito
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-agregar-carrito')) {
        const btn = e.target;
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        const imagen = btn.dataset.imagen;

        const productoExistente = carrito.find(p => p.id === id);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id,
                nombre,
                precio,
                imagen,
                cantidad: 1
            });
        }

        actualizarCarritoUI();
    }
});

// Actualizar contenido del carrito
function actualizarCarritoUI() {
    contenidoCarrito.innerHTML = '';
    let totalItems = 0;
    let totalPrecio = 0;

    carrito.forEach(p => {
        totalItems += p.cantidad;
        totalPrecio += p.precio * p.cantidad;

        const item = document.createElement('div');
        item.classList.add('flex', 'items-center', 'gap-4', 'border-b', 'pb-2');

        item.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1">
                <p class="font-semibold">${p.nombre}</p>
                <p>S/. ${p.precio.toFixed(2)} x ${p.cantidad}</p>
            </div>
        `;

        contenidoCarrito.appendChild(item);
    });

    contadorCarrito.textContent = totalItems;

    // Mostrar total
    const totalContenedor = document.getElementById('totalCarrito');
    totalContenedor.textContent = `Total: S/. ${totalPrecio.toFixed(2)}`;
}






// Finalizar compra - mostrar modal de agradecimiento
document.getElementById('btnFinalizar').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Limpiar carrito y actualizar UI
    carrito.length = 0;
    actualizarCarritoUI();

    // Cerrar carrito y mostrar modal de agradecimiento
    modalCarrito.classList.add('translate-x-full');
    overlayCarrito.classList.add('hidden');
    document.getElementById('modalGracias').classList.remove('hidden');
});

// Cerrar modal de agradecimiento
document.getElementById('cerrarGracias').addEventListener('click', () => {
    document.getElementById('modalGracias').classList.add('hidden');
});

let lastScroll = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo: ocultar el header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba: mostrar el header
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});