const posts = [
  {
    id: 1,
    title: "Lucia e Jason: A dinâmica da dupla protagonista",
    category: "personagens",
    date: "24 de Novembro, 2026",
    excerpt: "Entenda como funciona a parceria entre os dois protagonistas inspirada em Bonnie e Clyde.",
    content: `
      <p>Pela primeira vez na era HD da franquia, temos uma protagonista feminina jogável. Lucia traz uma abordagem calculista aos assaltos em Leonida, enquanto Jason complementa a dinâmica com habilidades de fuga e combate.</p>
      <p>O sistema de alternância entre personagens permite coordenar invasões em lojas e bancos em tempo real, compartilhando inventário e reputação nas ruas de Vice City.</p>
    `
  },
  {
    id: 2,
    title: "Explorando o Estado de Leonida além de Vice City",
    category: "mapa",
    date: "20 de Novembro, 2026",
    excerpt: "Dos pântanos de Grassrivers às praias neon: conheça as regiões confirmadas no mapa.",
    content: `
      <p>Leonida é a versão fictícia da Flórida criada pela Rockstar Games e representa o maior mapa já desenvolvido pelo estúdio.</p>
      <p>Além da metrópole vibrante de Vice City, os jogadores podem explorar os pântanos repletos de vida selvagem em Grassrivers, o arquipélago inspirado em Florida Keys e pequenas cidades rurais no interior.</p>
    `
  },
  {
    id: 3,
    title: "Redes sociais dentro do jogo e eventos dinâmicos",
    category: "noticias",
    date: "15 de Novembro, 2026",
    excerpt: "Como os vídeos virais e transmissões ao vivo moldam o mundo aberto de GTA VI.",
    content: `
      <p>A cultura digital está no centro da narrativa de GTA VI. Crimes, perseguições policiais e eventos bizarros nas ruas são gravados por NPCs e publicados instantaneamente nas redes sociais do jogo.</p>
      <p>Esse sistema não serve apenas para humor: a exposição viral pode aumentar seu nível de procurado ou abrir novas missões secundárias com influenciadores locais.</p>
    `
  },
  {
    id: 4,
    title: "Veículos, barcos e customização aérea em Vice City",
    category: "noticias",
    date: "10 de Novembro, 2026",
    excerpt: "Aerobarcos nos pântanos, supercarros nas avenidas e novos detalhes de física.",
    content: `
      <p>A variedade de transporte acompanha a geografia de Leonida. Aerobarcos são essenciais para navegar pelas áreas alagadas, enquanto iates e lanchas dominam a costa.</p>
      <p>O interior dos veículos também recebeu atenção extra, com painéis funcionais, ajustes de banco e retrovisores dinâmicos.</p>
    `
  }
];

const postsGrid = document.getElementById("postsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("articleModal");
const closeModal = document.getElementById("closeModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalBody = document.getElementById("modalBody");

let currentCategory = "todos";

function renderPosts() {
  const query = searchInput.value.toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesCategory = currentCategory === "todos" || post.category === currentCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    postsGrid.innerHTML = `<p style="color: var(--text-muted);">Nenhum artigo encontrado.</p>`;
    return;
  }

  postsGrid.innerHTML = filtered
    .map(
      (post) => `
      <article class="card">
        <div class="card-banner ${post.category}">
          <span class="badge">${post.category}</span>
        </div>
        <div class="card-content">
          <span class="date">${post.date}</span>
          <h3>${post.title}</h3>
          <p class="excerpt">${post.excerpt}</p>
          <button class="read-btn" onclick="openArticle(${post.id})">Ler artigo completo &rarr;</button>
        </div>
      </article>
    `
    )
    .join("");
}

function openArticle(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  modalCategory.textContent = post.category;
  modalTitle.textContent = post.title;
  modalDate.textContent = post.date;
  modalBody.innerHTML = post.content;
  modal.classList.remove("hidden");
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderPosts();
  });
});

searchInput.addEventListener("input", renderPosts);

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

renderPosts();
