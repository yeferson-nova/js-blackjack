
let deck = [];

const tipos = ['C', 'D', 'H', 'D'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// referencias del html

const btnPedir = document.querySelector('#btnPedir');

const btnDetener = document.querySelector('#btnFinalizar');

const btnNuevoJ = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');

const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

//Esta funcion crea la baraja de cartas y las coloca aleatorias
const crearDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }
    for (let tipo of tipos) {
        for (esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);

    return deck;
}

crearDeck();

//Esta funcion permite tomar carta
const pedirCata = () => {
    if (deck.length === 0) {
        throw alert('sin cartas en la baraja')
    }
    const cartaSelected = deck.pop();
    return cartaSelected;

}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A' ? 11 : 10)
        : valor * 1;

}

// turno compitadora
const turnoCompitadora = (puntosMinimos) => {

    do {

        const carta = pedirCata();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assents/cartas/10C.png" alt=""> 

        const imgCarta = document.createElement('img');
        imgCarta.src = `assents/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            alerta(puntosJugador, puntosComputadora);
            break;
        }
    } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21));

    setTimeout(() => {

        if (puntosComputadora === puntosMinimos) {
            alert("Empete...")
        } else if (puntosMinimos > 21) {
            alert("Lo siento la casa gana...");

        } else if (puntosComputadora > 21) {
            alert("Genial ganaste...");
        } else alert("Lo siento la casa gana...");
    }, 10);

}

// const alerta = (puntosJugador, puntosCompu) => {

//     if (puntosJugador > puntosCompu && puntosJugador <= 21) {
//         alert("Genial ganaste...");
//     } else if (puntosJugador < puntosCompu && puntosCompu <= 21) {
//         alert("Lo siento la casa gana...");
//     } else alert("Empete...")

// }


//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCata();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assents/cartas/10C.png" alt=""> 

    const imgCarta = document.createElement('img');
    imgCarta.src = `assents/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompitadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompitadora(puntosJugador);
    }


});

btnDetener.addEventListener('click', () => {

    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoCompitadora(puntosJugador);

});

btnNuevoJ.addEventListener('click', () => {
    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btnDetener.disabled = false;
    btnPedir.disabled = false;
});