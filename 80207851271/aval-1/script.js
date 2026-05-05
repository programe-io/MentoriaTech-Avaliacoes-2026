let valor = 0;

function incrementar() {
  valor++;
  atualizarTela();
}

function decrementar() {
  valor--;
  atualizarTela();
}

function atualizarTela() {
  document.getElementById("contador").innerText = valor;
}

function mudarTema() {
  document.body.classList.toggle("dark");
}