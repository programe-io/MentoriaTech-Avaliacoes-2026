const posts = [
  {
    id: 1,
    title: "Por que começar com HTML, CSS e JS puro",
    category: "Dev",
    date: "26 Nov 2026",
    excerpt: "Entender os fundamentos da web ajuda a escrever sites rápidos e fáceis de manter.",
    content: [
      "Projetos pequenos não exigem ferramentas complexas logo no início. Com HTML semântico, CSS responsivo e JavaScript puro, você tem controle total sobre o desempenho.",
      "Conforme o blog crescer, você pode evoluir adicionando arquivos JSON para os posts, um gerador estático ou integração com uma API."
    ]
  },
  {
    id: 2,
    title: "Rotina de leitura sem pressão",
    category: "Livros",
    date: "18 Nov 2026",
    excerpt: "Como manter o hábito de ler 10 páginas por dia mesmo em semanas corridas.",
    content: [
      "Em vez de metas grandes que geram culpa quando falham, deixe o livro à vista e defina um mínimo diário realista.",
      "Anotar uma frase ou ideia principal após cada sessão ajuda a reter o que você lê."
    ]
  },
  {
    id: 3,
    title: "Organizando ideias em um caderno de notas",
    category: "Vida",
    date: "10 Nov 2026",
    excerpt: "Tirar pensamentos da cabeça reduz a distração e facilita transformar ideias em rascunhos.",
    content: [
      "Um caderno simples ou arquivo de texto serve como caixa de entrada para temas que surgem durante a semana.",
      "No fim de semana, escolha apenas uma ideia para desenvolver em um texto curto."
    ]
  }
];

const postsGrid = document.getElementById("postsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const postModal = document.getElementById("postModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.getElementById("year").textContent = new Date().getFullYear();

function renderPosts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = posts.filter((post) => {
    const matchesCategory = category === "all" || post.category === category;
    const matchesQuery =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (filtered.length === 0) {
    postsGrid.innerHTML = "<p>Nenhum post encontrado para esse filtro.</p>";
    return;
  }

  postsGrid.innerHTML = filtered
    .map(
      (post) => `
      <article class="post-card">
        <div>
          <div class="post-meta">
            <span class="post-tag">${post.category}</span>
            <time>${post.date}</time>
          </div>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
        </div>
        <button class="btn-read" data-id="${post.id}">Ler artigo</button>
      </article>
    `
    )
    .join("");
}

postsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-read");
  if (!button) return;

  const post = posts.find((item) => item.id === Number(button.dataset.id));
  if (!post) return;

  modalContent.innerHTML = `
    <div class="post-meta">
      <span class="post-tag">${post.category}</span>
      <time>${post.date}</time>
    </div>
    <h2>${post.title}</h2>
    ${post.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
  `;

  postModal.showModal();
});

closeModal.addEventListener("click", () => postModal.close());
postModal.addEventListener("click", (event) => {
  if (event.target === postModal) postModal.close();
});

searchInput.addEventListener("input", renderPosts);
categoryFilter.addEventListener("change", renderPosts);

renderPosts();
