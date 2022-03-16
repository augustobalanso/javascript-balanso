// let precioContado = Number(prompt('cual es el Precio Contado del producto que querés?'))
// let precioCuotas = Number(prompt('Precio total en cuotas?'))
// let mesesCuotas = Number(prompt('En cuantas cuotas pensás sacarlo?'))
let precioContado = document.getElementById('inputTContado').value;
const inflaAnual = 56.4;
const inflaMensual = inflaAnual / 12;
var arrayCuotas = [];
var eachCuota = {};

function calcInteres() {

    let precioContado = document.getElementById('inputTContado').value;
    let precioCuotas = document.getElementById('inputTCuotas').value;
    let mesesCuotas = document.getElementById('cantCuotas').options[cantCuotas.selectedIndex].value;

    if (precioCuotas == '' || precioCuotas == null || precioCuotas == NaN) {

        document.getElementById('inputTCuotas').value = "INGRESE UN NÚMERO VÁLIDO";
        document.getElementById('inputTContado').value = "INGRESE UN NÚMERO VÁLIDO";
        return;

    } else {

        eachCuota.monto = precioCuotas / mesesCuotas;
        eachCuota.montoReal = precioCuotas / mesesCuotas;
        eachCuota.intRecargo = ((precioCuotas - precioContado) * 1200) / (precioContado * mesesCuotas);

        for (meses = 1; meses <= mesesCuotas; meses++) {
            eachCuota.monto = eachCuota.monto - (eachCuota.monto * inflaMensual / 100);
            arrayCuotas.push(eachCuota.monto);
        }
    }
    return precioContado
}

function modifTable() {

    var headers = ["Cuotas", "Monto"];
    var table = document.createElement('table');

    for (var i = 0; i < arrayCuotas.length; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = 'cuota ' + (i + 1);
        row.insertCell(1).innerHTML = '$ ' + arrayCuotas[i].toFixed(2);
    }

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for (var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }

    document.getElementById('pTableContainer').append(table);
    document.querySelector('table').classList.add("table", "table-dark", "w-50");
}

function crearTotales() {

    let crearParrafo = document.createElement('p')
    let crearDivAlert = document.createElement('div')
    crearDivAlert.setAttribute('id', 'alertMejor')
    let totalArray = 0
    let mejorOpcion = ''

    for (i = 0; i < arrayCuotas.length; i++) {
        totalArray += arrayCuotas[i];
    }

    if (totalArray < precioContado) {
        mejorOpcion = "financiarlo"
    } else {
        mejorOpcion = "comprarlo al contado"
    }

    const nodoTotales = document.createTextNode("El total ajustado por inflación a día de hoy sería $" + totalArray.toFixed(2));
    const nodoMejorOpcion = document.createTextNode("Tu mejor opción es " + mejorOpcion)
    crearParrafo.appendChild(nodoTotales);
    crearDivAlert.appendChild(nodoMejorOpcion)
    document.body.append(crearParrafo)
    document.body.append(crearDivAlert)
    document.querySelector('p').classList.add('text-center', 'h2')
    document.querySelector('#alertMejor').classList.add('alert', 'alert-primary', 'text-center', 'h2')
    document.querySelector('#alertMejor').setAttribute('role', 'alert')
}

function resetResultados() {
    document.querySelector('table').remove()
    document.querySelector('p').remove()

    if (document.querySelector('#alertMejor') != null) {
        document.querySelector('#alertMejor').remove()
    }
    arrayCuotas.length = 0
}

function runCalculo() {

    if (document.querySelector('table') != null) {
        resetResultados();
    }

    calcInteres();

    if (arrayCuotas.length == 0) {
        alert('Hubo un error en los parámetros ingresados')

    } else {
        modifTable()
        crearTotales()
    }
}