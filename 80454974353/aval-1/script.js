// script.js

let contador = 0;

const textoContador = document.getElementById("contador");

document.getElementById("aumentar").addEventListener("click", () => {
  contador++;
  atualizarContador();
});

document.getElementById("diminuir").addEventListener("click", () => {
  contador--;
  atualizarContador();
});

document.getElementById("resetar").addEventListener("click", () => {
  contador = 0;
  atualizarContador();
});

function atualizarContador() {
  textoContador.textContent = contador;
}