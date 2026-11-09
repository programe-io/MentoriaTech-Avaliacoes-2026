let segundos = 0;
let intervalo = null;

function atualizar() {
  let h = Math.floor(segundos / 3600);
  let m = Math.floor((segundos % 3600) / 60);
  let s = segundos % 60;

  document.getElementById("tempo").textContent =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");
}

function iniciar() {
  if (intervalo !== null) return;

  intervalo = setInterval(() => {
    segundos++;
    atualizar();
  }, 1000);
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;
}

function zerar() {
  pausar();
  segundos = 0;
  atualizar();
}