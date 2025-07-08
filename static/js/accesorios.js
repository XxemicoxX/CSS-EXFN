document.addEventListener('DOMContentLoaded', () => {
    const carritoAccesorios = [];
    const contador = document.getElementById('contadorCarrito');
    const contenido = document.getElementById('contenidoCarrito');
    const modal = document.getElementById('modalCarrito');
    const overlay = document.getElementById('overlayCarrito');

    // Abrir y cerrar carrito
    document.getElementById('btnCarrito').addEventListener('click', () => {
        modal.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    });

    document.getElementById('cerrarCarrito').addEventListener('click', () => {
        modal.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });

    overlay.addEventListener('click', () => {
        modal.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });

    // Agregar accesorio al carrito
    document.addEventListener('click', e => {
        if (e.target.classList.contains('btn-agregar-accesorio')) {
            const btn = e.target;
            const id = btn.dataset.id;
            const nombre = btn.dataset.nombre;
            const precio = parseFloat(btn.dataset.precio);
            const imagen = btn.dataset.imagen;

            const encontrado = carritoAccesorios.find(p => p.id === id);
            if (encontrado) {
                encontrado.cantidad += 1;
            } else {
                carritoAccesorios.push({ id, nombre, precio, imagen, cantidad: 1 });
            }

            actualizarCarritoAccesorios();
        }
    });

    // Actualizar carrito UI
    function actualizarCarritoAccesorios() {
        contenido.innerHTML = '';
        let totalItems = 0;
        let totalPago = 0;

        carritoAccesorios.forEach(item => {
            totalItems += item.cantidad;
            totalPago += item.precio * item.cantidad;

            const div = document.createElement('div');
            div.classList.add('flex', 'items-center', 'gap-4', 'border-b', 'pb-2');

            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded" />
                <div class="flex-1">
                    <p class="font-semibold">${item.nombre}</p>
                    <p>S/. ${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
            `;

            contenido.appendChild(div);
        });

        // Mostrar total de ítems
        contador.textContent = totalItems;

        // Agregar total al final del carrito
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('text-right', 'font-bold', 'text-charcoal', 'mt-4', 'border-t', 'pt-2');
        totalDiv.innerHTML = `Total: S/. ${totalPago.toFixed(2)}`;
        contenido.appendChild(totalDiv);
    }

    // Finalizar pedido
    document.getElementById('btnFinalizar').addEventListener('click', () => {
        if (carritoAccesorios.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        carritoAccesorios.length = 0;
        actualizarCarritoAccesorios();
        modal.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.getElementById('modalGracias').classList.remove('hidden');
    });

    // Cerrar modal de agradecimiento
    document.getElementById('cerrarGracias').addEventListener('click', () => {
        document.getElementById('modalGracias').classList.add('hidden');
    });
});




// Filtros
const filtroTipo = document.getElementById('filtroTipoAccesorio');
const filtroCompatibilidad = document.getElementById('filtroCompatibilidad');
const accesorios = document.querySelectorAll('.accesorio-item');

function filtrarAccesorios() {
    const tipoSeleccionado = filtroTipo.value;
    const compatibilidadSeleccionada = filtroCompatibilidad.value;

    accesorios.forEach(item => {
        const tipo = item.dataset.tipo;
        const compatibilidad = item.dataset.compatibilidad;

        const cumpleTipo = tipoSeleccionado === 'todos' || tipo === tipoSeleccionado;
        const cumpleCompatibilidad = compatibilidadSeleccionada === 'todas' || compatibilidad === compatibilidadSeleccionada;

        if (cumpleTipo && cumpleCompatibilidad) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

filtroTipo.addEventListener('change', filtrarAccesorios);
filtroCompatibilidad.addEventListener('change', filtrarAccesorios);
