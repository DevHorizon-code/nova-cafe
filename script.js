
const botonesAgregar = document.querySelectorAll(".agregar");

const contador = document.getElementById("contador");
const listaPedido = document.getElementById("lista-pedido");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");
const mensaje = document.getElementById("mensaje");

let pedido = [];

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        pedido.push({
            nombre: nombre,
            precio: precio
        });

        actualizarPedido();
        mensaje.textContent = `${nombre} agregado al pedido.`;
    });
});

function actualizarPedido() {
    listaPedido.textContent = "";

    let total = 0;

    pedido.forEach(function(producto, indice) {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${producto.nombre} — Q${producto.precio.toFixed(2)}`;
        

        const botonQuitar = document.createElement("button")
        botonQuitar.textContent = "Quitar"

        botonQuitar.addEventListener("click", function(){
            quitarProducto(indice)
        })

        elemento.appendChild(botonQuitar)
        listaPedido.appendChild(elemento);

        total += producto.precio;

    });

    contador.textContent = pedido.length;
    totalElemento.textContent = `Q${total.toFixed(2)}`;

    if (pedido.length === 0) {
        listaPedido.textContent = "Aún no has agregado productos.";
    }
}

function quitarProducto(indice) {
    pedido.splice(indice, 1)
    actualizarPedido();
}

botonVaciar.addEventListener("click", function() {
    pedido = [];
    actualizarPedido();
    mensaje.textContent = "Tu pedido está vacío.";
});