////////////////////////////////////////////////////////////////////////////////////////////
/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/
// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let restricciones = {
  viu: ["viu", "cua"],
  cua: ["viu", "cua"],
  hex: ["hex", "cir"],
  cir: ["hex", "cir"],
};
// Modal
let modal = document.getElementById("modal");
let cerrarModal = document.getElementById("cerrar-modal");
let reiniciarBoton = document.getElementById("reiniciar");
let tiempoFinal = document.getElementById("tiempo_final");
let movimientosFinal = document.getElementById("movimientos_final");
// Tapetes
let tapeteInicial = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes_receptor");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");
let contenedorInicial;
// Mazos
let mazoInicial = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];
let mazos = {
  inicial: mazoInicial,
  sobrantes_receptor: mazoSobrantes,
  receptor1: mazoReceptor1,
  receptor2: mazoReceptor2,
  receptor3: mazoReceptor3,
  receptor4: mazoReceptor4,
};
// Contadores de cartas
let contInicial = document.getElementById("contador_inicial");
let contSobrantes = document.getElementById("contador_sobrantes_receptor");
let contReceptor1 = document.getElementById("contador_receptor1");
let contReceptor2 = document.getElementById("contador_receptor2");
let contReceptor3 = document.getElementById("contador_receptor3");
let contReceptor4 = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// usamos un objeto para poder mapear los elementos de una manera mas facil
let contadores = {
  contador_inicial: contInicial,
  contador_sobrantes_receptor: contSobrantes,
  contador_receptor1: contReceptor1,
  contador_receptor2: contReceptor2,
  contador_receptor3: contReceptor3,
  contador_receptor4: contReceptor4,
  contador_movimientos: contMovimientos,
};

// Tiempo
let contTiempo = document.getElementById("contador_tiempo"); // span cuenta tiempo
let tiempo = ""; // cuenta de segundos
let movimientos = 0; // manejador del temporizador
/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/
////////////////////////////////////////////////////////////////////////////////////////////


// El juego arranca ya al cargar la página: no se espera a reiniciar
comenzarJuego();

////////////////////////////////////////////////////////////////////////////////////////////
//functionNumCards PREPARA LA BARAJA PARA PROBAR LA PARTIDA CON MENOR NÚMERO DE CARTAS = num*4 cartas
function functionNumCards(num){
  removerCartasSobrantes();
  removerCartasSobrantesAlReiniciarNumCartas();
  sessionStorage.setItem("NumCardsSolitario", num);


  numeros=[];
  for(let i=12;i>12-num;i--){
    numeros.push(i);
  }
    // Puesta a cero de contadores  
  mazoInicial = [];
  mazoSobrantes = [];
  mazoReceptor1 = [];
  mazoReceptor2 = [];
  mazoReceptor3 = [];
  mazoReceptor4 = [];
  mazos = {
    inicial: mazoInicial,
    sobrantes_receptor: mazoSobrantes,
    receptor1: mazoReceptor1,
    receptor2: mazoReceptor2,
    receptor3: mazoReceptor3,
    receptor4: mazoReceptor4,
  };
  cargarTapeteInicial(numeros);
  setContador(contReceptor1, 0);
  setContador(contReceptor2, 0);
  setContador(contReceptor3, 0);
  setContador(contReceptor4, 0);
  setContador(contSobrantes, 0);
  clearInterval(temporizador);
  arrancarTiempo();
}
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
// Desarrollo del comienzo de juego
function comenzarJuego() {
  /* Crear baraja, es decir crear el mazoInicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazoInicial. 
	*/

  
  //sessionStorage almacena en variable de sesión cuantas cartas utilizar. 
  //Ya que al reiniciar contador/partida se reinicia la página y todas sus variables
  num=sessionStorage.getItem("NumCardsSolitario");
  if (num==null){
    console.log("sessionStorage NumCardsSolitario=NULL ");
  }
  else {
    console.log("valor=",num);
    numeros=[];
    for(let i=12;i>12-num;i--){
      numeros.push(i);
    }
  }
  
   // Barajar y dejar mazoInicial en tapete inicial
  cargarTapeteInicial(numeros);
  setEvents("receptor1");
  setEvents("receptor2");
  setEvents("receptor3");
  setEvents("receptor4");
  setEvents("receptor4");
  setEvents("sobrantes_receptor");

  // Puesta a cero de contadores de mazos
  setContador(contReceptor1, 0);
  setContador(contReceptor2, 0);
  setContador(contReceptor3, 0);
  setContador(contReceptor4, 0);
  setContador(contSobrantes, 0);

  // Arrancar el conteo de tiempo
  arrancarTiempo();
} // comenzarJuego
////////////////////////////////////////////////////////////////////////////////////////////

function arrancarTiempo() {
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
    tiempo = formattedTime;
    // Tiempo intervalo de 1 segundo para controlar el tiempo transcurrido
  }, 1000);
}

/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/
function barajar(mazo) {
  let currentIndex = mazo.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = mazo[currentIndex];
    mazo[currentIndex] = mazo[randomIndex];
    mazo[randomIndex] = temporaryValue;
  }

  return mazo;
}


function createCard(combinacion) {
  let card = document.createElement("img");
  card.style.position = "absolute";
  card.width = 50;
  card.height = 70;
  card.className="border border-dark  border-2 rounded";
  card.src = "imagenes/baraja/" + combinacion + ".png";
  card.alt = combinacion;
  card.id = combinacion;
  return card;

  
}
function cargarTapeteInicial(numeros) {
  // console.log("Global 3",numeros);
  let combinaciones = [];
  // Obtener una combinación aleatoria sin repetir
  for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
      let combinacion = numeros[j] + "-" + palos[i];
      combinaciones.push(combinacion);
    }
    // console.log("numero",numeros.length);
  }

  let combinacionAleatoria = barajar(combinaciones);
  // console.log(combinacionAleatoria);
  let barajaInicial = combinacionAleatoria;
  //const [barajaInicial, barajaSobrante] = dividirArrayEnMitad(combinacionAleatoria);
  //cargarSobrantes(barajaSobrante)
  setContador(contInicial, barajaInicial.length);
  barajaInicial.forEach(function (combinacion, index) {
    mazoInicial.push(combinacion);
    let card = createCard(combinacion);
    card.style.top = index * 5 + "px";
    card.style.left = index * 5 + "px";
    card.draggable = index === barajaInicial.length - 1
    card.setAttribute("data-palo", combinacion.split("-")[1]);
    card.setAttribute("data-numero", combinacion.split("-")[0]);
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);

    tapeteInicial.appendChild(card);
  });
  return barajaInicial;
} // cargarTapeteInicial

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
function actualizarUltimaCartaMovible () {
  if (mazoInicial.length > 0) {
    const siguienteCarta = mazoInicial[mazoInicial.length - 1];
    const siguienteCartaElemento = document.getElementById(siguienteCarta);
    siguienteCartaElemento.draggable = true;
  }
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
  event.dataTransfer.setData("text/plain", event.target.id);
  contenedorInicial = document.getElementById(event.target.id).parentElement;
  event.currentTarget.classList.add("dragging");
}

// Función para el evento dragenter
function dragEnter(event) {
  event.preventDefault();
  event.currentTarget.classList.add("hovered");
  event.target.classList.add("drag-over");
}
// Función para el evento dragover
function dragOver(event) {
  event.preventDefault();
}

// Función para el evento dragleave
function dragLeave(event) {
  event.currentTarget.classList.remove("hovered");

  event.target.classList.remove("drag-over");
}
// Función para el evento dragend
function dragEnd(event) {
  event.target.classList.remove("dragging");
}

// Función para el evento drop
function drop(event) {
  event.preventDefault();
  event.target.classList.remove("drag-over");
  let cardId = event.dataTransfer.getData("text/plain");
  let card = document.getElementById(cardId);
  setContador(
    contadores[`contador_${contenedorInicial.id}`],
    mazos[contenedorInicial.id].length
  );
  if (event.target.id.includes("receptor")) {
    let lastCard = event.target.lastElementChild;
    // Obtener el z-index de la última carta
    let lastCardIndex = lastCard ? parseInt(lastCard.style.zIndex, 10) : 0;
    // Aumentar el z-index de la carta arrastrada
    card.style.zIndex = (lastCardIndex + 1).toString();
    const containerId = event.target.id;
    const container = mazos[containerId];
    if (container === mazoInicial) {
      // Si el contenedor es el tapete inicial, no se debe duplicar la carta
      return;
    }
    if (!container.includes(cardId)) {
      if (
        revisarRestriciones(lastCard, card) ||
        event.target.id.includes("sobrantes")
      ) {
        card.style.left = 25 + "px";
        card.style.top = 25 + "px";
        mazos[event.target.id].push(cardId);
        event.target.appendChild(card);
        setContador(
          contadores[`contador_${event.target.id}`],
          mazos[event.target.id].length
        );
        eliminarCarta(cardId);
        movimientos++;
        actualizarUltimaCartaMovible()
        setContador(
          contadores[`contador_${event.target.id}`],
          mazos[event.target.id].length
        );
      }
    }
  } else {
    //en caso el elmento target sea la carta dentro del div receptor
    let divContenedor = document.getElementById(event.target.id).parentElement;
    let lastCard = divContenedor.lastElementChild;
    // Obtener el z-index de la última carta
    let lastCardIndex = lastCard ? parseInt(lastCard.style.zIndex, 10) : 0;
    // Aumentar el z-index de la carta arrastrada
    card.style.zIndex = (lastCardIndex + 1).toString();
    const containerId = divContenedor.id;
    const container = mazos[containerId];

    if (!container.includes(cardId)) {
      if (
        revisarRestriciones(lastCard, card) ||
        divContenedor.id.includes("sobrantes")
      ) {
        card.style.left = 25 + "px";
        card.style.top = 25 + "px";
        mazos[divContenedor.id].push(cardId);
        divContenedor.appendChild(card);
        setContador(
          contadores[`contador_${divContenedor.id}`],
          mazos[divContenedor.id].length
        );
        eliminarCarta(cardId);
        movimientos++;
        actualizarUltimaCartaMovible()
        setContador(
          contadores[`contador_${divContenedor.id}`],
          mazos[divContenedor.id].length
        );
      }
    }
  }
  setContador(contadores.contador_movimientos, movimientos);

  if (mazoInicial.length == 0 && mazoSobrantes.length == 0) {
    mostrarModal();
  }
}

function eliminarCarta(cardId) {
  // Buscar el índice de la carta a eliminar en el mazoinicial
  let indiceTapetePrincipal = mazoInicial.indexOf(cardId);
  let indice = mazos[contenedorInicial.id].indexOf(cardId);

  // Verificar si el evento se encuentra en el array
  if (indice !== -1) {
    // Eliminar el evento del array usando el método splice()
    mazos[contenedorInicial.id].splice(indice, 1);
  }
  if (indiceTapetePrincipal !== -1) {
    mazoInicial.splice(indice, 1);
  }
  setContador(
    contadores[`contador_${contenedorInicial.id}`],
    mazos[contenedorInicial.id].length
  );

  setContador(contInicial, mazoInicial.length);

  if (mazoInicial.length == 0 && mazoSobrantes.length > 0) {
    mazoInicial = [...mazoSobrantes];
    mazoSobrantes.length = 0;
    mazoInicial.forEach(function (combinacion, index) {
      let card = createCard(combinacion);
      card.style.top = index * 5 + "px";
      card.style.left = index * 5 + "px";
      card.draggable = true;
      card.setAttribute("data-palo", combinacion.split("-")[1]);
      card.setAttribute("data-numero", combinacion.split("-")[0]);
      card.addEventListener("dragstart", dragStart);
      card.addEventListener("dragend", dragEnd);

      tapeteInicial.appendChild(card);
      setContador(contInicial, mazoInicial.length);
      removerCartasSobrantes();
      setContador(contSobrantes, mazoSobrantes.length);
    });
  }
}

function removerCartasSobrantes() {
  let imagenes = tapeteSobrantes.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
}
function removerCartasSobrantesAlReiniciarNumCartas() {
  let imagenes = tapeteInicial.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
  imagenes = tapeteReceptor1.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
  imagenes = tapeteReceptor2.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
  imagenes = tapeteReceptor3.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
  imagenes = tapeteReceptor4.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.remove();
  });
}




function revisarRestriciones(ultimoElemento, elementoEntrante) {
  let cardPalo = elementoEntrante.getAttribute("data-palo");
  let cardNumero = elementoEntrante.getAttribute("data-numero");

  let ultimoElementoPalo = ultimoElemento.getAttribute("data-palo");
  let ultimoElementoNumero = ultimoElemento.getAttribute("data-numero");

  if (ultimoElemento.nodeName.toLowerCase() == "img") {
    return (
      ultimoElementoNumero - 1 == cardNumero &&
      restricciones[ultimoElementoPalo].indexOf(cardPalo) == -1
    );
  } else {
    return cardNumero == 12;
  }
}

function mostrarModal() {
  clearInterval(temporizador);
  modal.style.display = "block";
  tiempoFinal.innerHTML = `Tiempo: ${tiempo}`;
  movimientosFinal.innerHTML = `Movimientos: ${movimientos}`;
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  reiniciarBoton.addEventListener("click", reiniciar);
}
