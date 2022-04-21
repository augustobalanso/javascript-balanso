// Animacion de boton COMPRAR

const cartBotones = document.querySelectorAll('.cart-boton');

cartBotones.forEach(button => {
	button.addEventListener('click', cartClick);
});

function cartClick() {

	let selectCheck = this.parentNode.querySelector('.selectList').selectedIndex
	if (selectCheck == 0) {
		Swal.fire({
			icon: 'error',
			text: 'Talle no elegido!',
			footer: 'Deberás elegir talle para agregar al carrito'
		})
	} else {
		let button = this;
		button.classList.add('clicked');

		function cartUnclick() {
			button.classList.remove('clicked')
		}
		setTimeout(cartUnclick, 2600);

	}

}

// -------------------------------------

let totalCarrito = []

const tallesHombre = [38, 39, 40, 41, 42, 43, 44]
const tallesMujer = [34, 35, 36, 37, 38, 39, 40]

function loadTalles() {
	let getCards = document.querySelectorAll('.card')

	getCards.forEach(element => {
		let eachSelect = element.querySelector('select')

		if (eachSelect.querySelector('option').innerText == 'Talles Masculinos') {
			for (let i = 0; i < tallesHombre.length; i++) {
				eachSelect.options.add(new Option(tallesHombre[i]))
			}
		} else if (eachSelect.querySelector('option').innerText == 'Talles Femeninos') {
			for (let i = 0; i < tallesMujer.length; i++) {
				eachSelect.options.add(new Option(tallesMujer[i]))
			}
		}
	})
}

function anadircarro(botonThis) {
	let htmlZapa = botonThis.parentElement;
	let getTalle = htmlZapa.parentElement.querySelector('select')
	let insideTalle = getTalle.options[getTalle.selectedIndex].text;

	if (isNaN(insideTalle)) {
		return
	} else {
		let imgZapa = htmlZapa.parentElement.querySelector('img').src
		let titleZapa = htmlZapa.querySelector('h5').innerText
		let cantidadSelec = 1
		let precioZapa = parseInt(htmlZapa.querySelector('.text-precio').innerText.replace('$', ''));

		const objectZapa = {
			imgZapa,
			titleZapa,
			insideTalle,
			cantidadSelec,
			precioZapa
		}

		if (totalCarrito.length == 0) {
			totalCarrito.push(objectZapa)
		} else {
			let foundProd = totalCarrito.find(element => {
				if (element.insideTalle == objectZapa.insideTalle && element.titleZapa == objectZapa.titleZapa) {
					element.cantidadSelec++
					return true
				}
			})
			if(foundProd == undefined){
				totalCarrito.push(objectZapa)
			}
			console.log(foundProd)
		}
	}
}


function crearCarrito() {

	var offcanvasPlaceholder = document.querySelector('#offcanvasCarrito');

	if (totalCarrito.length == 0) {

		offcanvasPlaceholder.innerHTML = ''
		let emptyCarritoMessage = document.createElement('p');
		emptyCarritoMessage.classList.add('text-center')
		emptyCarritoMessage.innerText = 'El carrito está vacío';
		offcanvasPlaceholder.append(emptyCarritoMessage)

	} else {
		if (offcanvasPlaceholder.innerHTML != '') {
			offcanvasPlaceholder.innerHTML = ''
		}

		let carritoTable = document.createElement('table')
		carritoTable.classList.add('table')
		let carritoConfirm = document.createElement('div')
		carritoConfirm.classList.add('d-flex', 'justify-content-center')
		carritoConfirm.innerHTML = '<button type="button" id="botonConfirm" class="btn btn-success" onclick="confirmCarrito()">Confirmar compra</button>'
		let carritoHeaders = ['', 'Producto', 'Talle', 'Cantidad', 'Precio']

		for (var i = 0; i < totalCarrito.length; i++) {
			var fila = carritoTable.insertRow(i);
			fila.insertCell(0).innerHTML = '<img src="' + totalCarrito[i].imgZapa + '" width=70px>';
			fila.insertCell(1).innerHTML = '<p class="tituloZapa">' + totalCarrito[i].titleZapa + '</p>';
			fila.insertCell(2).innerHTML = `<p> ${totalCarrito[i].insideTalle} </p>`;
			fila.insertCell(3).innerHTML = `<p> ${totalCarrito[i].cantidadSelec}</p>`
			fila.insertCell(4).innerHTML = '<p>$' + totalCarrito[i].precioZapa * totalCarrito[i].cantidadSelec + '</p>';
			fila.insertCell(5).innerHTML = '<button type="button" class="btn btn-outline-danger align-self-center" onclick="removeCarrito(' + i + ',this)"><i class="fas fa-trash"></i></button>'
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

function removeCarrito(index, btn) {
	tituloZapa = btn.parentNode.parentNode.querySelector('.tituloZapa').innerText

	let cards = [...document.querySelectorAll('.card-title')];
	let selectedCard = cards.find(e => e.innerText == tituloZapa)
	selectedCard.parentElement.querySelector('button').classList.remove('clicked')

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

function confirmCarrito() {
	totalCarrito.push(Math.round(Math.random() * 10000))
	localStorage.setItem('carritoConfirmado', JSON.stringify(totalCarrito))

	totalCarrito = []
	botonConfirm = document.querySelector('#botonConfirm')
	tablaRemove = document.querySelector('table')
	botonConfirm.remove()
	tablaRemove.remove()

	var thankfPurchase = document.createElement('p')
	thankfPurchase.innerHTML = 'Gracias por su compra'
	document.querySelector('#offcanvasCarrito').append(thankfPurchase)


	// ---------------- Sweet Alert 2 ---------------- //
	Swal.fire(
		'Compra confirmada',
		'Revisá tu pedido en tu perfil',
		'success'
	)

}

// ---------------------- Funciones de perfil.html ---------------------- //

function deletePedido() {

	Swal.fire({
		title: 'Estás seguro?',
		text: "El pedido se anulará y deberás realizar nuevamente la compra",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, cancelar pedido!',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire(
				'Cancelado!',
				'Tu pedido se canceló.',
				'success'
			)
			localStorage.removeItem('carritoConfirmado')
			document.querySelector('#tablaCarritoPlaceholder').innerHTML = '';
		}
	})

}



function redirectToML() {
	if (localStorage.getItem('darkMode') == 'true') {

		Swal.fire({
			title: 'Bien!',
			text: 'Serás redirigido a Mercado Pago.',
			imageUrl: './img/logo/mpdark.png',
			imageWidth: 256,
			imageHeight: 256,
			imageAlt: 'MercadoPago',
		}).then((result) => {
			if (result.isConfirmed) {
				window.open('https://www.mercadopago.com.ar', '_blank')
			}
		})
	} else {
		Swal.fire({
			title: 'Bien!',
			text: 'Serás redirigido a Mercado Pago.',
			imageUrl: './img/logo/mp.png',
			imageWidth: 256,
			imageHeight: 256,
			imageAlt: 'MercadoPago',
		}).then((result) => {
			if (result.isConfirmed) {
				window.open('https://www.mercadopago.com.ar', '_blank')
			}
		})
	}
}

function displayCarrito() {
	let tablaPlaceholder = document.querySelector('#tablaCarritoPlaceholder');

	if (localStorage.getItem('carritoConfirmado') === null) {
		let carritoVacioMessage = document.createTextNode('Tu carrito se encuentra vacio')
		tablaPlaceholder.append(carritoVacioMessage)
	} else {

		let carritoStorage = JSON.parse(localStorage.getItem('carritoConfirmado'))

		let tablaCarritoPerfil = document.createElement('table')
		tablaCarritoPerfil.classList.add('table')

		let carritoPerfilHeaders = ['', 'Producto', 'Talle', 'Precio', 'Cantidad']

		let idCompra = carritoStorage[carritoStorage.length - 1]
		carritoStorage.pop();

		let totalCarritoPerfilPH = document.createElement('p')
		totalCarritoPerfilPH.classList.add('fs-4', 'text-center')
		totalCarritoPerfilPH.setAttribute('id', 'totalPesos')

		let totalCarritoPerfil = 0


		carritoStorage.forEach((element, index) => {
			var fila = tablaCarritoPerfil.insertRow(index);
			fila.insertCell(0).innerHTML = `<img src="${element.imgZapa}" width=70px>`;
			fila.insertCell(1).innerHTML = `${element.titleZapa}`
			fila.insertCell(2).innerHTML = `${element.insideTalle}`
			fila.insertCell(3).innerHTML = `$${element.precioZapa*element.cantidadSelec}`
			fila.insertCell(4).innerHTML = `${element.cantidadSelec}`

			if (index == 0) {
				fila.insertCell(5).innerHTML = `<h3 rowspan=6>Pedido nro. ${idCompra}</h3>`
				fila.insertCell(6).innerHTML = `<button type="button" class="btn btn-success" onclick="redirectToML()">Pagar</button>`
				fila.insertCell(7).innerHTML = `<button type="button" class="btn btn-danger" onclick="deletePedido()">Cancelar Pedido</button>`
			}

			totalCarritoPerfil = totalCarritoPerfil + element.precioZapa * element.cantidadSelec

		})

		var headerCarrito = tablaCarritoPerfil.createTHead();
		var headerFila = headerCarrito.insertRow(0);
		carritoPerfilHeaders.forEach((element, index) => {
			headerFila.insertCell(index).innerHTML = carritoPerfilHeaders[index]
		})

		tablaPlaceholder.append(tablaCarritoPerfil)
		totalCarritoPerfilPH.innerHTML = 'Total $' + totalCarritoPerfil
		tablaPlaceholder.append(totalCarritoPerfilPH)
	}
}

// ---------------------- FETCH de cotización dólar --------------------- \\

function cotizarDolar() {
	fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
		.then(res => res.json())
		.then(data => {
			let tablaPlaceholder = document.querySelector('#tablaCarritoPlaceholder');

			let docDolarCompra = document.querySelector('#dolarCompra');
			let docDolarVenta = document.querySelector('#dolarVenta');
			const fetchedDolarC = parseInt(data[1].casa.compra)
			const fetchedDolarV = parseInt(data[1].casa.venta)

			docDolarCompra.innerHTML = `$ ${fetchedDolarC},00`
			docDolarVenta.innerHTML = `$ ${fetchedDolarV+10},00`

			if (window.location.pathname.includes('perfil')) {
				let totalUSD = document.createElement('p')
				totalUSD.classList.add('text-center', 'fs-4')

				let totalPesos = parseInt(document.querySelector('#totalPesos').innerText.replace('Total $', ''))

				let pesosAUSD = totalPesos / fetchedDolarC;
				totalUSD.innerHTML = `(U$S ${Math.round(pesosAUSD)})`

				tablaPlaceholder.append(totalUSD)
			}
		})
		.catch(err => console.log(err))
}

// ---------------------- ON LOAD FUNCTIONS -------------------- //

window.onload = function () {
	let checkPath = window.location.pathname.includes('perfil')
	if (checkPath) {
		displayCarrito()
		cotizarDolar()
	} else {
		loadTalles()
		cotizarDolar()
	}
}

// ---------------------- DARK MODE TOGGLER ------------------- //

const nightModeSwitch = document.getElementById('nightModeSwitch')

if (localStorage.getItem('darkMode') === null) {
	localStorage.setItem('darkMode', "false");
}

const link = document.createElement('link');
const linkSW = document.createElement('link');
link.rel = 'stylesheet';
linkSW.rel = 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(link);
document.getElementsByTagName('HEAD')[0].appendChild(linkSW);



function checkDarkMode() {
	if (localStorage.getItem('darkMode') === "true") {
		nightModeSwitch.checked = true;
		link.href = './css/indexdark.css';
		linkSW.href = '//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css';
	} else {
		nightModeSwitch.checked = false;
		link.href = '';
	}
}

checkDarkMode()

function changeToDarkMode() {
	if (localStorage.getItem('darkMode') === "true") {
		localStorage.setItem('darkMode', "false");
		link.href = ''
		linkSW.href = ''
	} else {
		localStorage.setItem('darkMode', "true");
		link.href = './css/indexdark.css';
		linkSW.href = '//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css';
	}
}