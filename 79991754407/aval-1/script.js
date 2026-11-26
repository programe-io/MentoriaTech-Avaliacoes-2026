const posts = [
  {
    id: 1,
    title: "Alfaiataria fluida: como equilibrar volume e leveza",
    category: "tendencias",
    categoryLabel: "Tendências",
    date: "24 Nov 2026",
    image: "https://unsplash.com",
    excerpt: "Calças amplas e camisas estruturadas ganham movimento quando combinadas a tecidos respiráveis e sapatos baixos.",
    content: [
      "A alfaiataria deixou de exigir rigidez para transmitir sofisticação. Tecidos como viscose encorpada, linho misto e lã fria criam caimento natural sem perder a presença visual.",
      "Para manter a proporção harmônica, combine uma peça ampla na parte inferior com um top mais ajustado ou deixe a camisa levemente abotoada com mangas dobradas."
    ]
  },
  {
    id: 2,
    title: "Sete peças-chave para um guarda-roupa funcional",
    category: "guarda-roupa",
    categoryLabel: "Guarda-Roupa",
    date: "18 Nov 2026",
    image: "https://unsplash.com",
    excerpt: "Construir combinações versáteis começa pela escolha de cores neutras e cortes que dialogam entre si.",
    content: [
      "Um guarda-roupa funcional reduz a indecisão diária sem abrir mão da criatividade. Comece definindo duas cores neutras principais e uma cor de destaque.",
      "Blazer neutro, camiseta de algodão de boa gramatura, calça de corte reto, vestido midi e um bom casaco formam a base para produções casuais e formais."
    ]
  },
  {
    id: 3,
    title: "Bolsas estruturadas e metais quentes na medida certa",
    category: "acessorios",
    categoryLabel: "Acessórios",
    date: "10 Nov 2026",
    image: "https://unsplash.com",
    excerpt: "Detalhes metálicos discretos e formatos geométricos transformam produções básicas em segundos.",
    content: [
      "Acessórios funcionam como o ponto de pontuação de um look. Quando a roupa é monocromática, uma bolsa com textura marcante ou ferragens em tom dourado escovado eleva o conjunto.",
      "Prefira proporções compatíveis com o seu cotidiano: bolsas médias com alça ajustável unem praticidade e acabamento elegante."
    ]
  }
];

const postsGrid = document.getElementById("posts-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("post-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModalBtn = document.getElementById("close-modal");
const newsletterForm = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email-input");
const newsletterFeedback = document.getElementById("newsletter-feedback");
document.getElementById("year").textContent = new Date().getFullYear();

function renderPosts(category = "todos") {
  const filtered = category === "todos"
    ? posts
    : posts.filter((post) => post.category === category);

  postsGrid.innerHTML = filtered.map((post) => `
    <article class="post-card">
      <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy" />
      <div class="post-body">
        <div class="post-meta">
          <span class="tag">${post.categoryLabel}</span>
          <span>${post.date}</span>
        </div>
        <h3>${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <button class="read-more" data-id="${post.id}">Ler artigo</button>
      </div>
    </article>
  `).join("");
}

function openPostModal(postId) {
  const post = posts.find((item) => item.id === Number(postId));
  if (!post) return;

  document.getElementById("modal-image").src = post.image;
  document.getElementById("modal-image").alt = post.title;
  document.getElementById("modal-category").textContent = post.categoryLabel;
  document.getElementById("modal-date").textContent = post.date;
  document.getElementById("modal-title").textContent = post.title;
  document.getElementById("modal-content").innerHTML = post.content
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  modal.hidden = false;
  closeModalBtn.focus();
}

function closePostModal() {
  modal.hidden = true;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderPosts(button.dataset.category);
  });
});

postsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".read-more");
  if (button) {
    openPostModal(button.dataset.id);
  }
});

closeModalBtn.addEventListener("click", closePostModal);
modalBackdrop.addEventListener("click", closePostModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closePostModal();
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterFeedback.textContent = `E-mail ${emailInput.value.trim()} cadastrado com sucesso.`;
  newsletterForm.reset();
});

renderPosts();
