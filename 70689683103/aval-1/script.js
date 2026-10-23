
/* =====================================
   1. MENU PARA CELULAR
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "✕ Fechar" : "☰ Menu";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰ Menu";
  });
});

/* =====================================
   2. PESQUISA DE ARTIGOS
===================================== */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const articleCards = [
  ...document.querySelectorAll(".article-card")
];

const emptyState = document.getElementById("emptyState");

let selectedCategory = "todos";

function filterArticles() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  let visibleCount = 0;

  articleCards.forEach(card => {
    const text = (
      card.innerText + " " + card.dataset.search
    ).toLocaleLowerCase("pt-BR");

    const categoryMatches =
      selectedCategory === "todos" ||
      card.dataset.category === selectedCategory;

    const textMatches = text.includes(query);
    const visible = categoryMatches && textMatches;

    card.hidden = !visible;

    if (visible) {
      visibleCount++;
    }
  });

  emptyState.hidden = visibleCount > 0;
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  filterArticles();
});

searchInput.addEventListener("input", filterArticles);

/* =====================================
   3. FILTRO POR CATEGORIA
===================================== */

const categoryButtons =
  document.querySelectorAll(".category-btn");

const categoryMap = {
  programacao: "programacao",
  hardware: "hardware",
  windows: "windows",
  games: "games",
  redes: "redes",
  seguranca: "seguranca"
};

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sectionId = button.getAttribute("href").slice(1);

    if (categoryMap[sectionId]) {
      selectedCategory = categoryMap[sectionId];
      searchInput.value = "";
      filterArticles();
    }
  });
});

/* =====================================
   4. ANO AUTOMATICO
===================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();
