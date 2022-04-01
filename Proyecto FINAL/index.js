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

const tallesHombre = [38, 39, 40, 41, 42, 43, 44]
const tallesMujer = [34, 35, 36, 37, 38, 39, 40]

function loadTalles() {
	let getCards = document.querySelectorAll('.card')
	console.log(getCards)

	getCards.forEach(element => {
			let eachSelect = element.querySelector('select')

			if (eachSelect.getAttribute('id') == 'selectTallesM'){
				for (let i = 0; i < tallesHombre.length; i++){
					eachSelect.options.add(new Option(tallesHombre[i]))
				}
			} else {
				for (let i = 0; i < tallesMujer.length; i++){
					eachSelect.options.add(new Option (tallesMujer[i]))
					}
			}
	})
}

	function anadircarro(nroBoton) {

		let htmlZapa = document.getElementById('getPrice' + nroBoton).parentElement;
		let imgZapa = htmlZapa.parentElement.querySelector('img').src
		let titleZapa = htmlZapa.querySelector('h5').innerText
		let talleZapa = htmlZapa.parentElement.querySelector('')
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

	// ---------------------- DARK MODE TOGGLER ------------------- //

	const nightModeSwitch = document.getElementById('nightModeSwitch')

	if (localStorage.getItem('darkMode') === null) {
		localStorage.setItem('darkMode', "false");
	}

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	document.getElementsByTagName('HEAD')[0].appendChild(link);



	function checkDarkMode() {
		if (localStorage.getItem('darkMode') === "true") {
			nightModeSwitch.checked = true;
			link.href = './css/indexdark.css';
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
		} else {
			localStorage.setItem('darkMode', "true");
			link.href = './css/indexdark.css';
		}
	}

	// function checkDarkMode() {
	// 	const nightModeSwitch = document.getElementById('nightModeSwitch')


	// }

	// 	function darkMode() {

	// 		const navDarkMode = document.querySelector('nav')
	// 		const bodyDarkMode = document.querySelector('body')
	// 		const cardsDarkMode = document.querySelectorAll('.card')

	// 		if (localStorage.getItem('darkMode') === "true") {

	// 			navDarkMode.classList.toggle('bg-dark')
	// 			navDarkMode.querySelector('a').classList.toggle('text-light')
	// 			navDarkMode.querySelector('i').classList.toggle('text-light')

	// 			bodyDarkMode.classList.toggle('bg-dark')
	// 			bodyDarkMode.querySelector('h1').classList.toggle('text-light')

	// 			cardsDarkMode.forEach(Element => {
	// 				Element.classList.toggle('bg-dark')
	// 				Element.querySelector('p').classList.toggle('text-light')
	// 				Element.querySelector('h5').classList.toggle('text-light')
	// 			})

	// 		} else {
	// 			localStorage.setItem('darkMode', 'true');

	// 			navDarkMode.classList.toggle('bg-dark')
	// 			navDarkMode.querySelector('a').classList.toggle('text-light')
	// 			navDarkMode.querySelector('i').classList.toggle('text-light')

	// 			bodyDarkMode.classList.toggle('bg-dark')
	// 			bodyDarkMode.querySelector('h1').classList.toggle('text-light')

	// 			cardsDarkMode.forEach(Element => {
	// 				Element.classList.toggle('bg-dark')
	// 				Element.querySelector('p').classList.toggle('text-light')
	// 				Element.querySelector('h5').classList.toggle('text-light')
	// 			})
	// 			console.log('sera que esto no corre nunca?')
	// 		}
	// 	}

	// 	checkDarkMode()