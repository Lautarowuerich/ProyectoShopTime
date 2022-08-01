const contenedorProductos = document.getElementById('contenedor');
const carritoContenedor = document.getElementById('carrito-contenedor');
const botonVaciar = document.getElementById('vaciarCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonVaciar.addEventListener('click',() => {
    carrito.length = 0;
    actualizarCarrito();
})


stockProductos2.forEach((producto) => {
    const div = document.createElement ('div');
    div.classList.add('productos');
    div.innerHTML = `
    <img class="imagen_productos" src=${producto.img} alt="">
    <h3 class="titulo_productos">${producto.marca}</h3>
    <p class="precio_productos">$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="btn btn-dark">Agregar<i class="fas fa-shopping-cart"></i></button>
    `

    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click', () => {
        agregarCarrito(producto.id);
    })

})

const agregarCarrito = (prodId) => {

    const noDuplicar = carrito.some (prod => prod.id === prodId);

    if (noDuplicar){
        const prod = carrito.map(prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }
    else{
    
        const item = stockProductos2.find((prod) => prod.id === prodId);
        carrito.push(item);
        actualizarCarrito();
        console.log(carrito);
    }

    Toastify({
        text: "Se agregó producto al carrito",
        duration: 1000,
        gravity: 'bottom',
        position: 'right',
        className: 'notificacion my-toast'
    }).showToast();

    actualizarCarrito();
}

const eliminarDelCarrito = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}


const actualizarCarrito = () => {

    carritoContenedor.innerHTML = ""

    carrito.forEach((producto) =>{
        const div = document.createElement('div');
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <img id="img" class="imagen_productos" src=${producto.img} alt="">
        <p>${producto.marca}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class= "fas fa-trash-alt">
        `

        carritoContenedor.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length;

    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio, 0);


}