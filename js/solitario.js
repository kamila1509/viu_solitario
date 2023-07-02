/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/
// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
//let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes
let tapeteInicial = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes_receptor");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");

// Mazos
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];

let mazos = {
  'inicial': mazoInicial,
  'sobrantes_receptor': mazoSobrantes,
  'receptor1': mazoReceptor1,
  'receptor2': mazoReceptor2,
  'receptor3': mazoReceptor3,
  'receptor4': mazoReceptor4
};
console.log('MAZOS',mazos['inicial'])
// Contadores de cartas
let contInicial = document.getElementById("contador_inicial");
let contSobrantes = document.getElementById("contador_sobrantes_receptor");
let contReceptor1 = document.getElementById("contador_receptor1");
let contReceptor2 = document.getElementById("contador_receptor2");
let contReceptor3 = document.getElementById("contador_receptor3");
let contReceptor4 = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos = 0; // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// El juego arranca ya al cargar la página: no se espera a reiniciar
comenzarJuego();
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo de juego
function comenzarJuego() {
  /* Crear baraja, es decir crear el mazoInicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazoInicial. 
	*/

  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

  // Barajar y dejar mazoInicial en tapete inicial
  cargarTapeteInicial(numeros);
  setEvents("receptor1");
  setEvents("receptor2");
  setEvents("receptor3");
  setEvents("receptor4");
  setEvents("receptor4");
  setEvents("sobrantes_receptor");
  console.log('MAZOS',mazos['inicial'])
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

  // Puesta a cero de contadores de mazos
  setContador(contReceptor1, 0);
  setContador(contReceptor2, 0);
  setContador(contReceptor3, 0);
  setContador(contReceptor4, 0);
  setContador(contSobrantes, 0);
  console.log("mazoInicial", mazoInicial);
  console.log("mazoSobrante", mazoSobrantes);

  // Arrancar el conteo de tiempo
  startTimer();
} // comenzarJuego

/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

// function arrancarTiempo(){
// 	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
// 	if (temporizador) clearInterval(temporizador);
//     let hms = function (){
// 			let seg = Math.trunc( segundos % 60 );
// 			let min = Math.trunc( (segundos % 3600) / 60 );
// 			let hor = Math.trunc( (segundos % 86400) / 3600 );
// 			let tiempo = ( (hor<10)? "0"+hor : ""+hor )
// 						+ ":" + ( (min<10)? "0"+min : ""+min )
// 						+ ":" + ( (seg<10)? "0"+seg : ""+seg );
// 			setContador(contTiempo, tiempo);
//             segundos++;
// 		}
// 	segundos = 0;
//     hms(); // Primera visualización 00:00:00
// 	temporizador = setInterval(hms, 1000);
// 	let contador_tiempo = document.getElementById('contador_tiempo');

// 	(function looper() {
//         contador_tiempo.innerHTML = temporizador
//         setTimeout(looper, 1000);
//     })();

// } // arrancarTiempo

function startTimer() {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  temporizador = setInterval(function () {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    let formattedTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    contTiempo.innerHTML = formattedTime;
    // Aquí puedes actualizar el valor del temporizador en tu interfaz de usuario
  }, 1000);
}

/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/
function barajar(mazo) {
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
} // barajar

/**
 	En el elemento HTML que representa el tapete inicial (letiable tapeteInicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
// Función para desordenar un arreglo aleatoriamente utilizando el algoritmo de Fisher-Yates
function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function dividirArrayEnMitad(array) {
  const longitud = array.length;
  const puntoMedio = Math.floor(longitud / 2);

  const primeraMitad = array.slice(0, puntoMedio);
  const segundaMitad = array.slice(puntoMedio);

  return [primeraMitad, segundaMitad];
}
function createCard(combinacion) {
  let card = document.createElement("img");
  card.style.position = "absolute";
  card.width = 50;
  card.height = 70;
  card.src = "../imagenes/baraja/" + combinacion + ".png";
  card.alt = combinacion;
  card.id = combinacion;
  return card;
}
function cargarTapeteInicial(numeros) {
  let combinaciones = [];
  // Obtener una combinación aleatoria sin repetir
  for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
      let combinacion = numeros[j] + "-" + palos[i];
      combinaciones.push(combinacion);
    }
  }

  let combinacionAleatoria = shuffleArray(combinaciones);
  combinacionAleatoria = shuffleArray(combinacionAleatoria);
  console.log(combinacionAleatoria);
  let barajaInicial = combinacionAleatoria;
  //const [barajaInicial, barajaSobrante] = dividirArrayEnMitad(combinacionAleatoria);
  //cargarSobrantes(barajaSobrante)
  setContador(contInicial, barajaInicial.length);
  barajaInicial.forEach(function (combinacion, index) {
    mazoInicial.push(combinacion);
    let card = createCard(combinacion);
    card.style.top = index * 5 + "px";
    card.style.left = index * 5 + "px";
    card.draggable = true;
    card.setAttribute("data-palo", combinacion.split("-")[1]);
    card.setAttribute("data-numero", combinacion.split("-")[0]);
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);

    tapeteInicial.appendChild(card);
  });
  return barajaInicial;
} // cargarTapeteInicial

// function cargarSobrantes(baraja) {
//   setContador(contSobrantes, baraja.length);
//   baraja.forEach(function (combinacion, ) {
//     mazoSobrantes.push(combinacion)
//     let card = createCard(combinacion)
//     card.style.top = 25 + "px";
//     card.style.left = 25 + "px";
//     card.draggable = true;
//     card.setAttribute("data-palo", combinacion.split("-")[1]);
//     card.setAttribute("data-numero", combinacion.split("-")[0]);
//     card.addEventListener("dragstart", dragStart);
//     card.addEventListener("dragend", dragEnd);

//     tapeteSobrantes.appendChild(card);
//   });
// }
/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/
function incContador(contador, baraja) {
  setContador(contador, baraja.length);
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
} // incContador

/**
	Idem que anterior, pero decrementando 
*/
function decContador(contador) {
  setContador(contador, baraja.length);
  /*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/
} // decContador

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function setContador(contador, valor) {
  contador.innerHTML = valor;
} // setContador

function reiniciar() {
  clearInterval(temporizador);
  location.reload();
}

function setEvents(containers) {
  // Obtener el div de destino para soltar las cartas
  let divDestino = document.getElementById(containers);
  // Agregar el evento de soltar al div de destino
  divDestino.addEventListener("dragover", dragOver);
  divDestino.addEventListener("dragenter", dragEnter);
  divDestino.addEventListener("dragleave", dragLeave);
  divDestino.addEventListener("drop", drop);
}

// Función para el evento dragstart
function dragStart(event) {
  console.log('dragStart')
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.classList.add("dragging");
}

// Función para el evento dragenter
function dragEnter(event) {
  event.preventDefault();
  console.log('dragEnter')
  event.target.classList.add("drag-over");
}
// Función para el evento dragover
function dragOver(event) {
  console.log('dragOver')
  event.preventDefault();
}

// Función para el evento dragleave
function dragLeave(event) {
  console.log('dragLeave')
  event.target.classList.remove("drag-over");
}
// Función para el evento dragend
function dragEnd(event) {
  console.log('event', event)
  console.log('dragEnd')
  event.target.classList.remove("dragging");
}
// Función para el evento dragleave
function dragLeave(event) {
  console.log('dragLeave')
  event.target.classList.remove("drag-over");
}

// Función para el evento drop
function drop(event) {
  event.preventDefault();
  event.target.classList.remove("drag-over");
  let cardId = event.dataTransfer.getData("text/plain");
  let card = document.getElementById(cardId);
  card.style.left = 25 + "px";
  card.style.top = 25 + "px";

  if (event.target.id.includes("receptor")) {
    console.log(event.target.id)
    mazos[event.target.id].push(cardId);
    console.log(mazos[event.target.id])

    let lastCard = event.target.lastElementChild;
    // Obtener el z-index de la última carta
    let lastCardIndex = lastCard ? parseInt(lastCard.style.zIndex, 10) : 0;

    // Aumentar el z-index de la carta arrastrada
    card.style.zIndex = (lastCardIndex + 1).toString();
    event.target.appendChild(card);
  } else {
    //en caso el elmento target sea la carta dentro del div receptor
    let divContenedor = document.getElementById(event.target.id).parentElement;
    mazos[divContenedor.id].push(cardId);
    console.log(mazos[divContenedor.id])
    let lastCard = divContenedor.lastElementChild;
    // Obtener el z-index de la última carta
    let lastCardIndex = lastCard ? parseInt(lastCard.style.zIndex, 10) : 0;

    // Aumentar el z-index de la carta arrastrada
    card.style.zIndex = (lastCardIndex + 1).toString();
    divContenedor.appendChild(card);
  }
}
