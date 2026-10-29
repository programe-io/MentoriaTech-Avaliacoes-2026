
const articles = [
  {
    title: "HTML5: construindo páginas semânticas",
    category: "HTML",
    icon: "🌐",
    description: "Aprenda a organizar páginas com header, main, section e outras tags semânticas."
  },
  {
    title: "CSS moderno com Flexbox e Grid",
    category: "CSS",
    icon: "🎨",
    description: "Crie layouts profissionais e responsivos usando as ferramentas modernas do CSS."
  },
  {
    title: "JavaScript: do básico ao DOM",
    category: "JavaScript",
    icon: "⚡",
    description: "Entenda eventos, funções, arrays e como manipular elementos da página."
  },
  {
    title: "Criando projetos com APIs",
    category: "JavaScript",
    icon: "🔌",
    description: "Descubra como usar fetch e async/await para consumir dados de APIs."
  },
  {
    title: "Inteligência artificial no desenvolvimento",
    category: "Tecnologia",
    icon: "🤖",
    description: "Conheça formas de usar ferramentas de IA para apoiar seu fluxo de programação."
  },
  {
    title: "Git e GitHub para desenvolvedores",
    category: "Tecnologia",
    icon: "💻",
    description: "Aprenda os conceitos de versionamento e colaboração em projetos de software."
  }
];

const grid = document.querySelector("#article-grid");
const search = document.querySelector("#search");
const filters = document.querySelector("#filters");
const emptyMessage = document.querySelector("#empty-message");

let selectedCategory = "Todos";

function renderArticles() {
  const term = search.value.trim().toLowerCase();

  const filtered = articles.filter(article => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      article.category === selectedCategory;

    const matchesSearch =
      `${article.title} ${article.description} ${article.category}`
        .toLowerCase()
        .includes(term);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(article => `
    <article class="article-card">
      <div class="article-icon" aria-hidden="true">
        ${article.icon}
      </div>
      <span class="article-category">${article.category}</span>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a class="read-more"
         href="#sobre"
         aria-label="Saiba mais sobre ${article.title}">
        Saiba mais →
      </a>
    </article>
  `).join("");

  emptyMessage.hidden = filtered.length > 0;
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  filters.querySelectorAll(".filter").forEach(filter => {
    const active = filter === button;
    filter.classList.toggle("active", active);
    filter.setAttribute("aria-pressed", String(active));
  });

  renderArticles();
});

search.addEventListener("input", renderArticles);

// Tema claro e escuro
const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");

  themeToggle.textContent = isLight ? "🌙" : "☀️";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Ativar tema escuro" : "Ativar tema claro"
  );
});

// Menu para dispositivos móveis
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Ano automático no rodapé
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Inicializa o blog
renderArticles();
