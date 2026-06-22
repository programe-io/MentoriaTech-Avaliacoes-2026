// Mostra informações dos mobs
function mostrar(texto) {
  document.getElementById("info").innerText = texto;
}

// Troca o modo de jogo
function modo(nome) {
  document.getElementById("modo").innerText =
    "Modo selecionado: " + nome;
}

// Contador de blocos minerados
let blocos = 0;

function minerar() {
  blocos++;
  document.getElementById("minhaMensagem").innerText =
    "Você minerou " + blocos + " bloco(s) ⛏️";
}