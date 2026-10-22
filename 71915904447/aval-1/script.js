
const partidas = [
  {
    casa: "Flamengo",
    fora: "Palmeiras",
    golsCasa: 2,
    golsFora: 1
  },
  {
    casa: "Real Madrid",
    fora: "Barcelona",
    golsCasa: 3,
    golsFora: 2
  },
  {
    casa: "Santos",
    fora: "Corinthians",
    golsCasa: 0,
    golsFora: 7
  }
];

const lista = document.getElementById("lista-jogos");

function mostrarJogos() {
  lista.innerHTML = "";

  partidas.forEach((jogo, indice) => {
    const card = document.createElement("article");
    card.className = "jogo";

    card.innerHTML = `
      <h3>${jogo.casa} x ${jogo.fora}</h3>
      <p>Placar demonstrativo</p>
      <div class="placar">
        ${jogo.golsCasa} - ${jogo.golsFora}
      </div>
      <button data-indice="${indice}">
        Adicionar gol ⚽
      </button>
    `;

    lista.appendChild(card);
  });
}

lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");

  if (!botao) return;

  const indice = Number(botao.dataset.indice);
  const jogo = partidas[indice];

  if (Math.random() < 0.5) {
    jogo.golsCasa++;
  } else {
    jogo.golsFora++;
  }

  mostrarJogos();
});

mostrarJogos();