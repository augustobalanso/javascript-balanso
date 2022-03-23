
class Memotec{
    constructor(cartas){
        this.cartas = cartas.concat(cartas);
        this.totalCartas = this.cartas.length;
        this.aciertos = 0;
        this.contadorClicks = 0;
        this.ultimosClicks = [];
    }

    start(){
        this.ordenarCartasAleatoriamente();
        this.cargarCartas();
    }

    ordenarCartasAleatoriamente(){
        //ordenar las cartas, dependiendo si retorna 1 o -1 la funcion sort ira ordenando
        
        this.cartas.sort( () => {
            const numeroAleatorio = Math.random(); //genera numero aleatorio entre 0 y 1
            if(numeroAleatorio > 0.5){ // se hace con 0.5 porque esta en la mitad de 0 y 1
                return 1;
            }else{
                return -1;
            }
        });
    }

    cargarCartas(){
        //obtener elemento html
        const divCartas = document.getElementById("divCartas");
        //recorrer elemento html y sus hijos (<img>) para ponerles imagen reverso 
        //y añadir clase y listener
        for(let i = 0; i < this.totalCartas; i++){
           divCartas.children[i].src = "reverso.png";
           divCartas.children[i].className = this.cartas[i];
           divCartas.children[i].addEventListener("click",this.comprobarCartasIguales.bind(this)); //se hace con bind para poder trabajar con this
        }
    }

    comprobarCartasIguales(e){
        this.contadorClicks = this.contadorClicks + 1; //control de clicks para saber si estamos en click par o impar
        const clase = e.target.className; //obtener clase de la imagen clickada
        const comprobarClases = e.target.className.split(" "); //separar clases por espacios

        if(comprobarClases.some( (elemento) => elemento == "acierto")){ //si la imagen clicada contiene alguna clase "acierto" no haremos nada, porque ya esta girada
            return;
        }


        e.target.src = clase + ".png"; //giramos imagen

        if(this.contadorClicks % 2 != 0){ //impar -- 1,3,5,7,9...
            this.ultimosClicks[0] =  e.target;
        }else if(this.contadorClicks % 2 == 0){ //par 2,4,6,8...
            this.ultimosClicks[1] =  e.target;

            if(this.ultimosClicks[0].className == this.ultimosClicks[1].className){ //se han acertado las cartas
                this.aciertos++;

                this.ultimosClicks[0].className =  this.ultimosClicks[0].className + " acierto";
                this.ultimosClicks[1].className =  this.ultimosClicks[1].className + " acierto";

                if(this.aciertos == this.totalCartas / 2){ //se ha ganado la partida
                    alert("HAS GANADO!!!");
                }
            }else{
                setTimeout( () => { //girar las imagenes al fallar despues de 1500 milisegundos
                    this.ultimosClicks[0].src = "reverso.png";
                    this.ultimosClicks[1].src = "reverso.png";
                }, 1500);
                
            }



        }
    }
}

const pokemons = ["ho-oh","leafeon","manectric","pikachu","rayquaza","reshiram","suicune","vaporeon"];
const juego = new Memotec(pokemons);
juego.start();