
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const newsCards = document.querySelectorAll(".news-card");
const emptyMessage = document.getElementById("emptyMessage");

let activeCategory = "todos";

// Abrir e fechar menu mobile
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Filtrar e pesquisar notícias
function updateNews() {
  const search = searchInput.value
    .trim()
    .toLowerCase();

  let visibleCount = 0;

  newsCards.forEach(card => {
    const category = card.dataset.category;
    const content = card.textContent.toLowerCase();

    const matchesCategory =
      activeCategory === "todos" ||
      category === activeCategory;

    const matchesSearch = content.includes(search);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount++;
    }
  });

  emptyMessage.hidden = visibleCount !== 0;
}

// Botões de categoria
filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");
    activeCategory = filter.dataset.filter;

    updateNews();
  });
});

// Pesquisa em tempo real
searchInput.addEventListener("input", updateNews);
