const posts = [
  {
    id: 1,
    title: "Como criar jogos 2D no navegador com HTML5 e JavaScript",
    category: "WebDev",
    date: "20 Nov 2026",
    readTime: "5 min de leitura",
    excerpt: "Entenda o loop principal do jogo, controle de teclado e colisões simples sem depender de motores pesados.",
    content: [
      "Desenvolver jogos diretamente para o navegador reduz a barreira de entrada e permite compartilhar protótipos com um simples link.",
      "Com HTML, CSS e JavaScript, você pode combinar elementos do DOM ou Canvas para gerenciar sprites, animações e pontuação em tempo real.",
      "Comece por mecânicas focadas, como plataformas ou puzzles, antes de adicionar sistemas complexos de física ou inventário."
    ]
  },
  {
    id: 2,
    title: "5 RPGs táticos que valorizam estratégia acima de reflexos",
    category: "RPG",
    date: "14 Nov 2026",
    readTime: "6 min de leitura",
    excerpt: "Posicionamento, sinergia de habilidades e gerenciamento de recursos fazem toda a diferença nesses títulos.",
    content: [
      "RPGs táticos recompensam o planejamento cuidadoso e a leitura do terreno em vez de respostas rápidas.",
      "Combinações de classes, efeitos de status e ordem de turnos criam decisões tensas em cada batalha.",
      "É o gênero ideal para quem gosta de experimentar builds e adaptar estratégias contra chefes difíceis."
    ]
  },
  {
    id: 3,
    title: "Por que jogos indie experimentais estão ditando tendências",
    category: "Indie",
    date: "08 Nov 2026",
    readTime: "4 min de leitura",
    excerpt: "Equipes pequenas têm liberdade criativa para testar narrativas não lineares e mecânicas únicas.",
    content: [
      "Sem a pressão de orçamentos gigantescos, estúdios independentes conseguem apostar em ideias arriscadas.",
      "Direção de arte autoral, trilhas marcantes e sistemas de jogo enxutos costumam gerar experiências memoráveis.",
      "Muitas mecânicas hoje comuns em grandes produções nasceram primeiro em projetos indie."
    ]
  },
  {
    id: 4,
    title: "Animações fluidas com CSS para interfaces de jogos e menus",
    category: "WebDev",
    date: "02 Nov 2026",
    readTime: "4 min de leitura",
    excerpt: "Use transições, keyframes e variáveis CSS para criar HUDs responsivos e feedbacks visuais rápidos.",
    content: [
      "Uma boa interface de jogo precisa responder imediatamente ao comando do jogador sem pesar na renderização.",
      "Propriedades como transform e opacity ajudam a manter animações suaves em diferentes resoluções.",
      "Combine estados de foco e hover com transições curtas para dar clareza aos menus."
    ]
  }
];

const postsGrid = document.getElementById("postsGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("postModal");
const closeModal = document.getElementById("closeModal");

let selectedCategory = "Todos";
let searchTerm = "";

function getFilteredPosts() {
  return posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
}

function renderPosts() {
  const filtered = getFilteredPosts();

  if (filtered.length === 0) {
    postsGrid.innerHTML = `<p class="empty-state">Nenhum artigo encontrado para esse filtro.</p>`;
    return;
  }

  postsGrid.innerHTML = filtered
    .map(
      (post) => `
      <article class="card">
        <div>
          <span class="badge">${post.category}</span>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
        </div>
        <div class="card-footer">
          <span>${post.date} · ${post.readTime}</span>
          <button class="read-btn" data-id="${post.id}">Ler mais</button>
        </div>
      </article>
    `
    )
    .join("");
}

function openPostModal(postId) {
  const post = posts.find((item) => item.id === Number(postId));
  if (!post) return;

  document.getElementById("modalCategory").textContent = post.category;
  document.getElementById("modalTitle").textContent = post.title;
  document.getElementById("modalMeta").textContent = `${post.date} · ${post.readTime}`;
  document.getElementById("modalBody").innerHTML = post.content
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closePostModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;

  selectedCategory = button.dataset.category;
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  renderPosts();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderPosts();
});

postsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".read-btn");
  if (!button) return;
  openPostModal(button.dataset.id);
});

closeModal.addEventListener("click", closePostModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePostModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closePostModal();
  }
});

renderPosts();