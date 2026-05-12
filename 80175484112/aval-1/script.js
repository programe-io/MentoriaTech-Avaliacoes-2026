// script.js
let valor = 0;

function atualizarTela() {
  document.getElementById("contador").textContent = valor;
}

function aumentar() {
  valor++;
  atualizarTela();
}

function diminuir() {
  valor--;
  atualizarTela();
}

function resetar() {
  valor = 0;
  atualizarTela();
}