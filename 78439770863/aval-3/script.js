// Meu Mundo no Futsal — interações da página
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const searchInput = document.getElementById("searchInput");
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const postCards = [...document.querySelectorAll(".post-card")];
const emptyState = document.getElementById("emptyState");
const savedNote = document.getElementById("savedNote");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#08111f" : "#f4f7fb");
  try { localStorage.setItem("futsal-theme", theme); } catch (_) {}
}
let initialTheme = "dark";
try {
  initialTheme = localStorage.getItem("futsal-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch (_) {}
applyTheme(initialTheme);
themeToggle.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

function updateScrollUI() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Anima elementos ao entrarem na tela.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 90}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}

// Pesquisa e filtros de categoria funcionam juntos.
let activeFilter = "todos";
function filterPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  let visibleCount = 0;
  postCards.forEach(card => {
    const text = `${card.dataset.title} ${card.innerText}`.toLocaleLowerCase("pt-BR");
    const matchesQuery = text.includes(query);
    const matchesFilter = activeFilter === "todos" || card.dataset.category === activeFilter;
    const show = matchesQuery && matchesFilter;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}
searchInput.addEventListener("input", filterPosts);
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  filterPosts();
}));

// Favoritos persistem neste navegador.
let favorites = [];
try { favorites = JSON.parse(localStorage.getItem("futsal-favorites") || "[]"); } catch (_) {}
function renderFavorites() {
  document.querySelectorAll(".favorite-btn").forEach(button => {
    const title = button.closest(".post-card").dataset.title;
    const isFavorite = favorites.includes(title);
    button.textContent = isFavorite ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isFavorite));
  });
}
renderFavorites();
document.querySelectorAll(".favorite-btn").forEach(button => button.addEventListener("click", () => {
  const title = button.closest(".post-card").dataset.title;
  favorites = favorites.includes(title) ? favorites.filter(item => item !== title) : [...favorites, title];
  try { localStorage.setItem("futsal-favorites", JSON.stringify(favorites)); } catch (_) {}
  renderFavorites();
  savedNote.textContent = favorites.length
    ? `${favorites.length} conteúdo(s) favoritado(s) neste navegador.`
    : "Você removeu todos os favoritos.";
}));

// Galeria com visualização ampliada.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  lightboxImage.src = item.dataset.image;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}));
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !lightbox.hidden) closeLightbox(); });

document.getElementById("currentYear").textContent = new Date().getFullYear();

// Destaca no menu a seção que estiver em evidência.
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}
