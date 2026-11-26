const posts = [
  {
    id: 1,
    titulo: "Pressão alta e saída curta: como o 4-3-3 muda o ritmo do jogo",
    categoria: "Tática",
    data: "24/11/2026",
    resumo: "Entenda como os volantes abrem espaço nas costas da primeira linha de marcação.",
    conteudo:
      "Quando uma equipe adianta a linha de pressão, o passe vertical entre os zagueiros e o primeiro volante vira o atalho mais rápido para quebrar o bloco adversário. A movimentação coordenada dos pontas por dentro ajuda a atrair os laterais e liberar os corredores."
  },
  {
    id: 2,
    titulo: "Reta final do Brasileirão: pontos disputados jogo a jogo",
    categoria: "Brasileirão",
    data: "22/11/2026",
    resumo: "O desempenho em casa e o saldo de gols ganham peso decisivo nas últimas rodadas.",
    conteudo:
      "Nas rodadas finais do campeonato nacional, a margem de erro diminui tanto na briga pelo título quanto na disputa por vagas continentais e contra o rebaixamento. Equipes com banco de reservas forte costumam sustentar melhor a intensidade no segundo tempo."
  },
  {
    id: 3,
    titulo: "Janela de transferências: o que observar antes de fechar contrato",
    categoria: "Mercado",
    data: "19/11/2026",
    resumo: "Minutos jogados, adaptação tática e saúde física pesam mais que lances isolados.",
    conteudo:
      "Avaliar reforços vai além de gols e assistências em compilados. Analistas observam a recorrência de lesões, a compatibilidade com o modelo de jogo do treinador e o impacto financeiro no elenco ao longo da temporada."
  }
];

let categoriaAtual = "Todos";
let termoBusca = "";

const feed = document.getElementById("feed");
const buscaInput = document.getElementById("busca");
const filtrosContainer = document.getElementById("filtros");
const modal = document.getElementById("modal");
const fecharModalBtn = document.getElementById("fechar-modal");

function renderizarPosts() {
  const filtrados = posts.filter((post) => {
    const bateCategoria =
      categoriaAtual === "Todos" || post.categoria === categoriaAtual;
    const texto = `${post.titulo} ${post.resumo} ${post.conteudo}`.toLowerCase();
    const bateBusca = texto.includes(termoBusca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  if (filtrados.length === 0) {
    feed.innerHTML = "<p>Nenhuma matéria encontrada para esse filtro.</p>";
    return;
  }

  feed.innerHTML = filtrados
    .map(
      (post) => `
      <article class="card">
        <div>
          <span class="tag">${post.categoria}</span>
          <h2>${post.titulo}</h2>
          <p>${post.resumo}</p>
        </div>
        <div class="card-rodape">
          <span>${post.data}</span>
          <button class="btn-ler" data-id="${post.id}">Ler matéria</button>
        </div>
      </article>
    `
    )
    .join("");
}

function abrirModal(id) {
  const post = posts.find((item) => item.id === Number(id));
  if (!post) return;

  document.getElementById("modal-tag").textContent = post.categoria;
  document.getElementById("modal-titulo").textContent = post.titulo;
  document.getElementById("modal-data").textContent = `Publicado em ${post.data}`;
  document.getElementById("modal-texto").textContent = post.conteudo;
  modal.classList.remove("oculto");
}

function fecharModal() {
  modal.classList.add("oculto");
}

filtrosContainer.addEventListener("click", (e) => {
  if (!e.target.matches(".btn-filtro")) return;

  document
    .querySelectorAll(".btn-filtro")
    .forEach((btn) => btn.classList.remove("ativo"));
  e.target.classList.add("ativo");
  categoriaAtual = e.target.dataset.categoria;
  renderizarPosts();
});

buscaInput.addEventListener("input", (e) => {
  termoBusca = e.target.value.trim();
  renderizarPosts();
});

feed.addEventListener("click", (e) => {
  if (e.target.matches(".btn-ler")) {
    abrirModal(e.target.dataset.id);
  }
});

fecharModalBtn.addEventListener("click", fecharModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

renderizarPosts();
