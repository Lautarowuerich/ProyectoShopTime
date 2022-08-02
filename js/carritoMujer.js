//---- VARIABLES
const contenedorProductos = document.getElementById('contenedor');
const carritoContenedor = document.getElementById('carrito-contenedor');
const botonVaciar = document.getElementById('vaciarCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

let carrito = [];

//----AL VOLVER A CARGAR LA PÁGINA QUE SE MANTENGAN LOS ITEMS DEL CARRITO
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//---- BOTON PARA VACIAR EL CARRITO
botonVaciar.addEventListener('click',() => {
    carrito.length = 0;
    actualizarCarrito();
})


//---- RENDERIZAR PRODUCTOS EN HTML
stockProductos3.forEach((producto) => {
    const div = document.createElement ('div');
    div.classList.add('productos');
    div.innerHTML = `
    <img class="imagen_productos" src=${producto.img} alt="">
    <h3 class="titulo_productos">${producto.marca}</h3>
    <p class="precio_productos">$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="btn btn-dark">Agregar<i class="fas fa-shopping-cart"></i></button>
    `

    contenedorProductos.appendChild(div);

    //---- AGREGA CADA PRODUCTO CON SU RESPECTIVO ID DENTRO DEL CARRITO
    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener('click', () => {
        agregarCarrito(producto.id);
    })

})

//---- AGREGAR EL PRODUCTO AL CARRITO
const agregarCarrito = (prodId) => {

    //---- NO DUPLICA PRODUCTOS EN EL CARRITO
    const noDuplicar = carrito.some (prod => prod.id === prodId);

    //---- SI YA EXISTE EL PRODUCTO EN EL CARRITO NO LO REPITE Y AGREGA CANTIDAD
    if (noDuplicar){
        const prod = carrito.map(prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }
    //---- SI EL PRODUCTO NO ESTÁ REPETIDO SE AGREGA AL CARRITO
    else{
    
        const item = stockProductos3.find((prod) => prod.id === prodId);
        carrito.push(item);
        actualizarCarrito();
        console.log(carrito);
    }

    //---- LIBRERA TOASTY
    Toastify({
        text: "Se agregó producto al carrito",
        duration: 1000,
        gravity: 'bottom',
        position: 'right',
        className: 'notificacion my-toast'
    }).showToast();

    actualizarCarrito();
}

//---- ELIMINA EL PRODUCTO DEL CARRITO
const eliminarDelCarrito = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}


const actualizarCarrito = () => {

    carritoContenedor.innerHTML = ""

    //---- CREA UN DIV POR CADA ELEMENTO AGREGADO
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

        //---- A LOS ELEMENTOS AGREGADOS AL CARRITO LE HACEMOS UN APPENCHILD AL MODAL (CONTENEDOR DEL CARRITO)
        carritoContenedor.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    //---- SUMA LA CANTIDAD DE PRODUCTOS AL NUMERO DEL CARRITO
    contadorCarrito.innerText = carrito.length;

    //---- ARRANCANDO DE 0, POR CADA PRODUCTO AGREGADO SUMA LA PROPIEDAD PRECIO PARA EL PRECIO FINAL
    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.precio, 0);


}