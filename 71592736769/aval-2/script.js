const tabuleiro = document.getElementById("tabuleiro");
const statusTexto = document.getElementById("status");

let jogadorAtual = "X";
let jogoAtivo = true;
let estado = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  estado.forEach((_, index) => {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.addEventListener("click", () => jogar(index));
    tabuleiro.appendChild(celula);
  });
}

function jogar(index) {
  if (estado[index] !== "" || !jogoAtivo) return;

  estado[index] = jogadorAtual;
  atualizarTela();

  if (verificarVitoria()) {
    statusTexto.textContent = `Jogador ${jogadorAtual} venceu!`;
    jogoAtivo = false;
    return;
  }

  if (!estado.includes("")) {
    statusTexto.textContent = "Empate!";
    jogoAtivo = false;
    return;
  }

  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
  statusTexto.textContent = `Vez do jogador ${jogadorAtual}`;
}

function atualizarTela() {
  const celulas = document.querySelectorAll(".celula");
  celulas.forEach((celula, index) => {
    celula.textContent = estado[index];
  });
}

function verificarVitoria() {
  return combinacoesVitoria.some(comb => {
    const [a, b, c] = comb;
    return estado[a] && estado[a] === estado[b] && estado[a] === estado[c];
  });
}

function reiniciar() {
  estado = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  jogoAtivo = true;
  statusTexto.textContent = "Vez do jogador X";
  criarTabuleiro();
}

statusTexto.textContent = "Vez do jogador X";
criarTabuleiro();