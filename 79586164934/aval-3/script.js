const posts = [
  {
    id: 1,
    title: "As raízes históricas das religiões abraâmicas",
    category: "historia",
    date: "26 de Novembro, 2026",
    excerpt: "Entenda os pontos históricos em comum entre Judaísmo, Cristianismo e Islamismo no Oriente Médio.",
    content: `
      <p>O Judaísmo, o Cristianismo e o Islamismo são conhecidos como religiões abraâmicas por compartilharem a figura histórica e espiritual de Abraão como patriarca fundamental.</p>
      <p>Embora cada tradição tenha desenvolvido escrituras, rituais e teologias próprias ao longo dos séculos, todas compartilham o monoteísmo ético e a importância histórica da cidade de Jerusalém.</p>
    `
  },
  {
    id: 2,
    title: "Filosofias do Oriente: Hinduísmo e Budismo em perspectiva",
    category: "tradicoes",
    date: "22 de Novembro, 2026",
    excerpt: "Conceitos como darma, carma e meditação na formação cultural do sul e leste da Ásia.",
    content: `
      <p>Surgidos no subcontinente indiano, o Hinduísmo e o Budismo influenciaram profundamente a arte, a ética e o modo de vida de bilhões de pessoas ao longo de milênios.</p>
      <p>Enquanto o Hinduísmo reúne uma vasta diversidade de textos védicos e tradições devocionais, o Budismo concentra-se nos ensinamentos de Sidarta Gautama sobre a superação do sofrimento por meio da atenção plena e da compaixão.</p>
    `
  },
  {
    id: 3,
    title: "Arquitetura sacra: Simbolismo em catedrais, mesquitas e templos",
    category: "arquitetura",
    date: "18 de Novembro, 2026",
    excerpt: "Como a geometria, a luz e a acústica são usadas para criar espaços de contemplação.",
    content: `
      <p>Ao redor do mundo, os edifícios religiosos traduzem conceitos espirituais em pedra, madeira e luz. Nas catedrais góticas, os vitrais altos simbolizam a iluminação divina.</p>
      <p>Nas mesquitas históricas, os padrões geométricos e a caligrafia expressam a infinitude sem recorrer a imagens figurativas, enquanto os templos orientais buscam harmonia direta com os elementos da natureza.</p>
    `
  },
  {
    id: 4,
    title: "Tradições de matriz africana e sincretismo cultural no Brasil",
    category: "tradicoes",
    date: "12 de Novembro, 2026",
    excerpt: "A preservação da memória ancestral, música e oralidade no Candomblé e na Umbanda.",
    content: `
      <p>As religiões de matriz africana no Brasil desempenharam um papel central na preservação de línguas, ritmos musicais e valores comunitários trazidos por povos africanos.</p>
      <p>Com forte base na tradição oral, no respeito à natureza e na ancestralidade, essas expressões fazem parte do patrimônio cultural imaterial brasileiro.</p>
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
