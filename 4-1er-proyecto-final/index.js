let precioContado = Number(prompt('cual es el Precio Contado del producto que querés?'))
let precioCuotas = Number(prompt('Precio total en cuotas?'))
let mesesCuotas = Number(prompt('En cuantas cuotas pensás sacarlo?'))
const inflaAnual = 56.4
const inflaMensual = inflaAnual / 12
const arrayCuotas = []

function calcInteres(pasaCuotas, pasaMeses) {

    eachCuota = pasaCuotas / pasaMeses

     for (meses = 1; meses <= pasaMeses; meses++) {
         eachCuota = eachCuota - (eachCuota * inflaMensual / 100);
         arrayCuotas.push(eachCuota)
     }

 }

 calcInteres(precioCuotas, mesesCuotas); 


function crearTable() {

    var headers = ["Cuotas", "Monto"];
    var table = document.createElement("TABLE");
        
    for(var i = 0; i < arrayCuotas.length; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = 'cuota ' + (i+1);
        row.insertCell(1).innerHTML = arrayCuotas[i].toFixed(2);
    }

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for(var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }

    document.body.append(table);
}


function crearTotales() {
    
    var crearParrafo = document.createElement("p")
    var totalArray = 0

    for (i = 0; i < arrayCuotas.length; i++) {
        totalArray += arrayCuotas[i];
    }

    const nodoTotales = document.createTextNode("El total ajustado por inflación a día de hoy sería $" + totalArray.toFixed(2));
    crearParrafo.appendChild(nodoTotales);
    document.body.append(crearParrafo)
}

crearTable()
crearTotales()