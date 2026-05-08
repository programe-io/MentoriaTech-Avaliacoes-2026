let valor = 0;

function aumentar() {
  valor++;
  document.getElementById("contador").innerText = valor;
}

function zerar() {
  valor = 0;
  document.getElementById("contador").innerText = valor;
}