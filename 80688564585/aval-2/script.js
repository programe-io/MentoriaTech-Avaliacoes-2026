const jogos = [
  {
    id: 1,
    campeonato: "Brasileirão Série A",
    status: "ao-vivo",
    minutoOuHora: "68'",
    estadio: "Maracanã",
    mandante: { nome: "Flamengo", sigla: "FLA", gols: 2 },
    visitante: { nome: "Palmeiras", sigla: "PAL", gols: 1 }
  },
  {
    id: 2,
    campeonato: "Copa do Brasil",
    status: "encerrado",
    minutoOuHora: "Encerrado",
    estadio: "Neo Química Arena",
    mandante: { nome: "Corinthians", sigla: "COR", gols: 1 },
    visitante: { nome: "São Paulo", sigla: "SAO", gols: 1 }
  },
  {
    id: 3,
    campeonato: "Brasileirão Série A",
    status: "agendado",
    minutoOuHora: "19:00",
    estadio: "Arena do Grêmio",
    mandante: { nome: "Grêmio", sigla: "GRE", gols: null },
    visitante: { nome: "Internacional", sigla: "INT", gols: null }
  },
  {
    id: 4,
    campeonato: "Copa do Nordeste",
    status: "agendado",
    minutoOuHora: "21:30",
    estadio: "Arena Castelão",
    mandante: { nome: "Fortaleza", sigla: "FOR", gols: null },
    visitante: { nome: "Bahia", sigla: "BAH", gols: null }
  }
];

const feedEl = document.getElementById("feed-jogos");
const buscaEl = document.getElementById("busca");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

let statusAtual = "todos";
let termoBusca = "";

function rotuloStatus(status) {
  if (status === "ao-vivo") return "Ao vivo";
  if (status === "encerrado") return "Encerrado";
  return "Agendado";
}

function formatarPlacar(jogo) {
  if (jogo.status === "agendado") return "vs";
  return `${jogo.mandante.gols} - ${jogo.visitante.gols}`;
}

function renderizarJogos() {
  const filtrados = jogos.filter((jogo) => {
    const bateStatus = statusAtual === "todos" || jogo.status === statusAtual;
    const texto = `${jogo.campeonato} ${jogo.mandante.nome} ${jogo.visitante.nome} ${jogo.estadio}`.toLowerCase();
    const bateBusca = texto.includes(termoBusca.trim().toLowerCase());
    return bateStatus && bateBusca;
  });

  if (filtrados.length === 0) {
    feedEl.innerHTML = `<div class="vazio">Nenhum jogo encontrado para o filtro selecionado.</div>`;
    return;
  }

  feedEl.innerHTML = filtrados
    .map(
      (jogo) => `
      <article class="card-jogo">
        <div class="card-topo">
          <span>${jogo.campeonato}</span>
          <span class="badge badge-${jogo.status}">${rotuloStatus(jogo.status)}</span>
        </div>

        <div class="partida">
          <div class="time">
            <span class="escudo">${jogo.mandante.sigla}</span>
            <span>${jogo.mandante.nome}</span>
          </div>

          <div class="placar">${formatarPlacar(jogo)}</div>

          <div class="time fora">
            <span>${jogo.visitante.nome}</span>
            <span class="escudo">${jogo.visitante.sigla}</span>
          </div>
        </div>

        <div class="card-rodape">
          <span>${jogo.estadio}</span>
          <span>${jogo.minutoOuHora}</span>
        </div>
      </article>
    `
    )
    .join("");
}

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    statusAtual = btn.dataset.status;
    renderizarJogos();
  });
});

buscaEl.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarJogos();
});

renderizarJogos();
