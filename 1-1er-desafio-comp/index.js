let multiploBase = Number(prompt('Sobre que número quisieras obtener la tabla?'));

for (let index = 1; index <= 10; index++) {
    let resultado = index*multiploBase;
    console.log(index + ' x ' + multiploBase + ' = ' + resultado);
}

let potencia = Number(prompt('Sobre que número quisieras obtener las potencias?'))
let i = 1

while (i <= 10) {
    let resultado = potencia**i;
    console.log(potencia + ' elevado a la ' + i + ' es igual a ' + resultado);
    i++;
}