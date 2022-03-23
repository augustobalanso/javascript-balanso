// Animacion de boton COMPRAR

const cartBotones = document.querySelectorAll('.cart-boton');

cartBotones.forEach(button => {
	button.addEventListener('click', cartClick);
});

function cartClick() {
	let button = this;
	button.classList.add('clicked');
}

function cartRemove(button) {
	button.classList.remove('clicked');
}

// -------------------------------------

let totalCarrito = []


function anadircarro(nroBoton) {

	let htmlZapa = document.getElementById('getPrice' + nroBoton).parentElement;
	let imgZapa = htmlZapa.parentElement.querySelector('img').src
	let titleZapa = htmlZapa.querySelector('h5').innerText
	let precioZapa = parseInt(htmlZapa.querySelector('#getPrice' + nroBoton).innerText.replace('$', ''));

	const objectZapa = {
		imgZapa,
		titleZapa,
		precioZapa
	}
	totalCarrito.push(objectZapa)
}

function crearCarrito() {

	var offcanvasPlaceholder = document.querySelector('#offcanvasCarrito');

	if (offcanvasPlaceholder.innerHTML == '' || offcanvasPlaceholder.innerText == 'El carrito está vacío') {

		if (totalCarrito.length == 0) {

			offcanvasPlaceholder.innerHTML = ''
			let emptyCarritoMessage = document.createElement('p');
			emptyCarritoMessage.innerText = 'El carrito está vacío';
			offcanvasPlaceholder.append(emptyCarritoMessage)

		} else {

			if (offcanvasPlaceholder.innerHTML != '') {
				offcanvasPlaceholder.innerHTML = ''
			}

			let carritoTable = document.createElement('table')
			let carritoConfirm = document.createElement('div')
			carritoConfirm.innerHTML = '<button type="button" id="botonConfirm" class="btn btn-success" onclick="confirmCarrito()">Confirmar compra</button>'
			let carritoHeaders = ['', 'Producto', 'Precio']

			for (var i = 0; i < totalCarrito.length; i++) {
				var fila = carritoTable.insertRow(i);
				fila.insertCell(0).innerHTML = '<img src="' + totalCarrito[i].imgZapa + '" width=70px>';
				fila.insertCell(1).innerHTML = '<p class="tituloZapa">' + totalCarrito[i].titleZapa + '</p>';
				fila.insertCell(2).innerHTML = '<p>$' + totalCarrito[i].precioZapa + '</p>';
				fila.insertCell(3).innerHTML = '<button type="button" class="btn btn-outline-danger align-self-center" onclick="removeCarrito(' + i + ',this)"><i class="fas fa-trash"></i></button>'
			}

			var headerCarrito = carritoTable.createTHead();
			var headerFila = headerCarrito.insertRow(0);
			for (var i = 0; i < carritoHeaders.length; i++) {
				headerFila.insertCell(i).innerHTML = carritoHeaders[i];
			}

			offcanvasPlaceholder.append(carritoTable)
			offcanvasPlaceholder.append(carritoConfirm)

		}
	}
}

function removeCarrito(index, btn) {
	tituloZapa = btn.parentNode.parentNode.querySelector('.tituloZapa').innerText

	const o = totalCarrito.findIndex(elemento => {
		return elemento.titleZapa == tituloZapa
	})

	totalCarrito.splice(o, 1)

	var row = btn.parentNode.parentNode;
	row.parentNode.removeChild(row);

	if (totalCarrito.length == 0) {
		botonConfirm = document.querySelector('#botonConfirm')
		tablaRemove = document.querySelector('table')
		botonConfirm.parentNode.remove()
		tablaRemove.remove()
	}
}

// function totalMonto(){
// 	var totalMonto = 0

// 	for (i=0; i < totalCarrito.length; i++){
// 		totalMonto = totalMonto + totalCarrito[i].precioZapa
// 	}
// }

function confirmCarrito() {
	botonConfirm = document.querySelector('#botonConfirm')
	tablaRemove = document.querySelector('table')
	botonConfirm.remove()
	tablaRemove.remove()

	var thankfPurchase = document.createElement('p')
	thankfPurchase.innerHTML = 'Gracias por su compra'
	document.querySelector('#offcanvasCarrito').append(thankfPurchase)

}

var domTituloZapa = document.querySelectorAll('.card-title')
console.log(domTituloZapa)