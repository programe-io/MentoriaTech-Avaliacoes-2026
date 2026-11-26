const posts = [
  {
    id: 1,
    title: "Os rios voadores da Amazônia e o clima da América do Sul",
    category: "florestas",
    date: "25 de Novembro, 2026",
    excerpt: "Como milhões de árvores bombeiam umidade para a atmosfera e alimentam chuvas a milhares de quilômetros.",
    content: `
      <p>Uma única árvore de grande porte na Amazônia pode transpirar até mil litros de água por dia. Quando somamos bilhões de árvores, forma-se uma corrente invisível de vapor d'água conhecida como rios voadores.</p>
      <p>Essas massas de ar úmido viajam impulsionadas pelos ventos alísios, encontram a barreira natural da Cordilheira dos Andes e levam chuvas essenciais para o Centro-Oeste, Sudeste e Sul do continente.</p>
    `
  },
  {
    id: 2,
    title: "Recifes de corais: As florestas tropicais dos oceanos",
    category: "oceanos",
    date: "21 de Novembro, 2026",
    excerpt: "Ocupando menos de 1% do fundo marinho, os recifes abrigam cerca de um quarto de toda a vida oceânica.",
    content: `
      <p>Construídos ao longo de milhares de anos por pequenos animais chamados pólipos, os recifes de corais oferecem abrigo, alimento e berçário para milhares de espécies de peixes, tartarugas e moluscos.</p>
      <p>Além da biodiversidade, essas estruturas funcionam como barreiras naturais que dissipam a força das ondas e protegem comunidades costeiras contra a erosão.</p>
    `
  },
  {
    id: 3,
    title: "A comunicação silenciosa das raízes e fungos no solo",
    category: "florestas",
    date: "16 de Novembro, 2026",
    excerpt: "Descubra como redes subterrâneas de micorrizas conectam árvores e permitem a troca de nutrientes.",
    content: `
      <p>Abaixo do solo das florestas existe uma rede microscópica formada pela associação entre raízes de plantas e filamentos de fungos.</p>
      <p>Por meio dessa conexão simbiótica, árvores mais antigas conseguem transferir carbono, água e sinais químicos de alerta sobre pragas para mudas jovens que crescem na sombra.</p>
    `
  },
  {
    id: 4,
    title: "Rotas migratórias: Como as aves atravessam continentes",
    category: "fauna",
    date: "11 de Novembro, 2026",
    excerpt: "Orientação pelo campo magnético da Terra, estrelas e memória geográfica nas grandes jornadas anuais.",
    content: `
      <p>Todos os anos, bilhões de aves percorrem milhares de quilômetros em busca de climas mais amenos e fartura de alimento.</p>
      <p>Para não perder o rumo sobre oceanos e desertos, elas combinam a posição do sol, o mapa das estrelas e proteínas sensíveis ao campo magnético terrestre presentes em seus olhos.</p>
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
    postsGrid.innerHTML = `<p style="color: var(--text-muted);">Nenhum artigo encontrado para essa busca.</p>`;
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
