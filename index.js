window.onload = () =>{
  const svg = document.getElementById("juegoSvg");
  const pelota = document.getElementById('circulo');
  const jugador1 = document.getElementById('rectangulo');
  const jugador2 = document.getElementById('rectangulo2');
  
const velocidadPelota = 2;
let pelotaX = pelota.cx.baseVal.value;
let pelotaY = pelota.cy.baseVal.value;
let pelotaVelX = velocidadPelota; 
let pelotaVelY = velocidadPelota; 
const jugadorVelY = 20;

function moverJugador(jugador, direccion) {
  if (direccion === "arriba" && jugador.y.baseVal.value > 0) {
    jugador.y.baseVal.value -= jugadorVelY;
  } else if (direccion === "abajo" && jugador.y.baseVal.value + jugador.height.baseVal.value < svg.height.baseVal.value) {
    jugador.y.baseVal.value += jugadorVelY;
  }
}

function actualizarJuego() {
  pelotaX += pelotaVelX;
  pelotaY += pelotaVelY;
  pelota.setAttribute("cx", pelotaX);
  pelota.setAttribute("cy", pelotaY);

  if (pelotaY - pelota.r.baseVal.value < 0 || pelotaY + pelota.r.baseVal.value > svg.height.baseVal.value) {
    pelotaVelY = -pelotaVelY;
  }

  
  if (
    pelotaX - pelota.r.baseVal.value < jugador1.x.baseVal.value + jugador1.width.baseVal.value &&
    pelotaX + pelota.r.baseVal.value > jugador1.x.baseVal.value &&
    pelotaY > jugador1.y.baseVal.value &&
    pelotaY < jugador1.y.baseVal.value + jugador1.height.baseVal.value
  ) {
    pelotaVelX = -pelotaVelX;
    
    pelotaX = jugador1.x.baseVal.value + jugador1.width.baseVal.value + pelota.r.baseVal.value;
  }

  
  if (
    pelotaX - pelota.r.baseVal.value < jugador2.x.baseVal.value + jugador2.width.baseVal.value &&
    pelotaX + pelota.r.baseVal.value > jugador2.x.baseVal.value &&
    pelotaY > jugador2.y.baseVal.value &&
    pelotaY < jugador2.y.baseVal.value + jugador2.height.baseVal.value
  ) {
    pelotaVelX = -pelotaVelX;
    
    pelotaX = jugador2.x.baseVal.value - pelota.r.baseVal.value;
  }


  
  if (pelotaX < 0) {
    pelotaVelX = -pelotaVelX;

  } else if (pelotaX > svg.width.baseVal.value) {
    pelotaVelX = -pelotaVelX;

  }
}
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    moverJugador(jugador1, "arriba");
  } else if (event.key === "ArrowDown") {
    moverJugador(jugador1, "abajo");
  } else if (event.key === "w") {
    moverJugador(jugador2, "arriba");
  } else if (event.key === "s") {
    moverJugador(jugador2, "abajo");
  }
});

function juegoPrincipal() {
  actualizarJuego();

  
  requestAnimationFrame(juegoPrincipal);
}


juegoPrincipal();

}