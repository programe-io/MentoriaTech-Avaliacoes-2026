const posts = [
  {
    id: 1,
    title: "O diálogo silencioso das raízes na floresta",
    category: "Florestas",
    emoji: "🌳",
    bannerBg: "linear-gradient(135deg, #cde3c8, #a7cfa1)",
    date: "14 de novembro de 2026",
    readTime: "4 min de leitura",
    likes: 24,
    summary: "Como redes subterrâneas de fungos conectam árvores e ajudam na troca de nutrientes e alertas.",
    content: [
      "Sob a camada de folhas secas e solo úmido, as árvores mantêm conexões complexas por meio de fungos micorrízicos que se associam às raízes.",
      "Essas redes permitem que plantas compartilhem água, carbono e compostos químicos de defesa quando alguma árvore sofre ataque de insetos ou seca prolongada.",
      "Proteger florestas maduras significa preservar não apenas as copas visíveis, mas todo esse ecossistema subterrâneo construído ao longo de décadas."
    ]
  },
  {
    id: 2,
    title: "Recifes de coral: cidades submersas cheias de vida",
    category: "Oceanos",
    emoji: "🪸",
    bannerBg: "linear-gradient(135deg, #c6e6f2, #9fd1e6)",
    date: "08 de novembro de 2026",
    readTime: "5 min de leitura",
    likes: 31,
    summary: "Embora ocupem menos de 1% do fundo do mar, os recifes abrigam cerca de um quarto da vida marinha.",
    content: [
      "Os corais são formados por pequenos animais chamados pólipos que vivem em parceria com microalgas fotossintetizantes em suas células.",
      "Essa relação fornece energia e cores vibrantes aos recifes, enquanto cria abrigos essenciais para peixes, crustáceos e moluscos.",
      "O aquecimento das águas e a poluição colocam esses ambientes sob pressão, tornando a redução de emissões e a criação de áreas marinhas protegidas fundamentais."
    ]
  },
  {
    id: 3,
    title: "Polinizadores: pequenos viajantes que mantêm os ciclos",
    category: "Fauna",
    emoji: "🐝",
    bannerBg: "linear-gradient(135deg, #f8ebc2, #ebd28d)",
    date: "02 de novembro de 2026",
    readTime: "4 min de leitura",
    likes: 19,
    summary: "Abelhas, borboletas, morcegos e beija-flores sustentam a reprodução de grande parte das plantas com flores.",
    content: [
      "Ao buscar néctar e pólen, os polinizadores transportam grãos de pólen de uma flor a outra, permitindo a formação de sementes e frutos.",
      "Na natureza e na agricultura, esse trabalho silencioso garante diversidade genética e alimento para inúmeras espécies.",
      "Plantar espécies nativas com floração em diferentes épocas do ano ajuda a manter corredores verdes seguros para esses animais."
    ]
  },
  {
    id: 4,
    title: "Como criar um pequeno refúgio verde na varanda ou quintal",
    category: "Sustentabilidade",
    emoji: "🌱",
    bannerBg: "linear-gradient(135deg, #d7ead8, #b3d8b8)",
    date: "27 de outubro de 2026",
    readTime: "3 min de leitura",
    likes: 42,
    summary: "Passos simples com vasos, substrato adequado e plantas nativas para aproximar a natureza da rotina.",
    content: [
      "Mesmo em espaços reduzidos, é possível cultivar plantas adaptadas ao clima local, observando a incidência de sol e vento ao longo do dia.",
      "Evitar pesticidas químicos e manter um recipiente raso com água limpa (trocada com frequência) atrai aves e insetos benéficos.",
      "Cuidar de um espaço verde diário fortalece a atenção aos ritmos das estações e reduz o estresse urbano."
    ]
  }
];

const STORAGE_KEY = "raizes_horizonte_likes_v1";
let likedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let selectedCategory = "Todos";
let searchQuery = "";

const postsGrid = document.getElementById("postsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const articleModal = document.getElementById("articleModal");
const closeModal = document.getElementById("closeModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalBody = document.getElementById("modalBody");

const subscribeModal = document.getElementById("subscribeModal");
const openSubscribe = document.getElementById("openSubscribe");
const closeSubscribe = document.getElementById("closeSubscribe");
const subscribeForm = document.getElementById("subscribeForm");
const subscribeFeedback = document.getElementById("subscribeFeedback");

function getLikeCount(post) {
  return post.likes + (likedIds.includes(post.id) ? 1 : 0);
}

function renderPosts() {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;

    const matchesText =
      !normalizedQuery ||
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.summary.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesText;
  });

  postsGrid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((post) => {
    const isLiked = likedIds.includes(post.id);
    const article = document.createElement("article");
    article.className = "post-card";

    article.innerHTML = `
      <div class="post-banner" style="background: ${post.bannerBg}" aria-hidden="true">
        <span>${post.emoji}</span>
      </div>
      <div class="post-content">
        <span class="post-category">${post.category}</span>
        <h3>${post.title}</h3>
        <p class="post-summary">${post.summary}</p>
        <p class="post-meta">${post.date} • ${post.readTime}</p>
        <div class="post-actions">
          <button class="read-btn" data-id="${post.id}">Ler artigo →</button>
          <button class="like-btn ${isLiked ? "liked" : ""}" data-like-id="${post.id}" aria-pressed="${isLiked}">
            ${isLiked ? "♥" : "♡"} <span>${getLikeCount(post)}</span>
          </button>
        </div>
      </div>
    `;

    postsGrid.appendChild(article);
  });
}

function openArticle(id) {
  const post = posts.find((item) => item.id === Number(id));
  if (!post) return;

  modalCategory.textContent = post.category;
  modalTitle.textContent = post.title;
  modalMeta.textContent = `${post.date} • ${post.readTime}`;
  modalBody.innerHTML = post.content.map((paragraph) => `<p>${paragraph}</p>`).join("");

  articleModal.classList.add("open");
  articleModal.setAttribute("aria-hidden", "false");
}

function closeArticleModal() {
  articleModal.classList.remove("open");
  articleModal.setAttribute("aria-hidden", "true");
}

function toggleLike(id) {
  const numericId = Number(id);
  if (likedIds.includes(numericId)) {
    likedIds = likedIds.filter((item) => item !== numericId);
  } else {
    likedIds.push(numericId);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
  renderPosts();
}

// Eventos de filtro e busca
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    renderPosts();
  });
});

searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderPosts();
});

// Delegação de eventos nos cards
postsGrid.addEventListener("click", (event) => {
  const readBtn = event.target.closest(".read-btn");
  if (readBtn) {
    openArticle(readBtn.dataset.id);
    return;
  }

  const likeBtn = event.target.closest(".like-btn");
  if (likeBtn) {
    toggleLike(likeBtn.dataset.likeId);
  }
});

// Fechar modal de artigo
closeModal.addEventListener("click", closeArticleModal);
articleModal.addEventListener("click", (event) => {
  if (event.target === articleModal) closeArticleModal();
});

// Modal de newsletter
openSubscribe.addEventListener("click", () => {
  subscribeFeedback.textContent = "";
  subscribeForm.reset();
  subscribeModal.classList.add("open");
  subscribeModal.setAttribute("aria-hidden", "false");
});

closeSubscribe.addEventListener("click", () => {
  subscribeModal.classList.remove("open");
  subscribeModal.setAttribute("aria-hidden", "true");
});

subscribeModal.addEventListener("click", (event) => {
  if (event.target === subscribeModal) {
    subscribeModal.classList.remove("open");
    subscribeModal.setAttribute("aria-hidden", "true");
  }
});

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("subscriberEmail").value.trim();
  subscribeFeedback.textContent = `Pronto! ${email} foi registrado para novidades.`;
  subscribeForm.reset();
});

// Tecla Esc fecha modais abertos
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeArticleModal();
    subscribeModal.classList.remove("open");
    subscribeModal.setAttribute("aria-hidden", "true");
  }
});

// Menu mobile
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderPosts();