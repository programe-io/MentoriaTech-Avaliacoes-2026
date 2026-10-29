
/* =========================
   ELEMENTOS DO BLOG
========================= */

const themeButton = document.getElementById("themeButton");
const searchInput = document.getElementById("search");
const posts = document.querySelectorAll(".post");
const emptyMessage = document.getElementById("empty");

/* =========================
   1. MODO ESCURO
========================= */

const savedTheme = localStorage.getItem("blog-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

function updateThemeButton() {
  if (!themeButton) return;

  themeButton.textContent =
    document.body.classList.contains("dark")
      ? "☀️ Tema claro"
      : "🌙 Tema escuro";
}

updateThemeButton();

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
      "blog-theme",
      isDark ? "dark" : "light"
    );

    updateThemeButton();
  });
}

/* =========================
   2. PESQUISA DE ARTIGOS
========================= */

function filterPosts() {
  const term = searchInput.value
    .toLowerCase()
    .trim();

  let visibleCount = 0;

  posts.forEach((post) => {
    const content = post.textContent.toLowerCase();
    const matches = content.includes(term);

    post.hidden = !matches;

    if (matches) {
      visibleCount++;
    }
  });

  if (emptyMessage) {
    emptyMessage.style.display =
      visibleCount === 0 ? "block" : "none";
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterPosts);
}

/* =========================
   3. FILTRO POR CATEGORIA
========================= */

function filterCategory(category) {
  let visibleCount = 0;

  posts.forEach((post) => {
    const categoryElement = post.querySelector(".category");

    const postCategory = categoryElement
      ? categoryElement.textContent.trim().toLowerCase()
      : "";

    const matches =
      category === "todos" ||
      postCategory === category.toLowerCase();

    post.hidden = !matches;

    if (matches) visibleCount++;
  });

  if (emptyMessage) {
    emptyMessage.style.display =
      visibleCount === 0 ? "block" : "none";
  }

  // Limpa a pesquisa para evitar conflito entre filtros.
  if (searchInput) {
    searchInput.value = "";
  }
}

// Exemplo de uso:
// filterCategory("Tecnologia");
// filterCategory("Programação");
// filterCategory("todos");

/* =========================
   4. BOTÃO VOLTAR AO TOPO
========================= */

const backToTop = document.createElement("button");

backToTop.type = "button";
backToTop.textContent = "↑";
backToTop.setAttribute("aria-label", "Voltar ao topo");

backToTop.style.cssText = `
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  display: none;
  z-index: 999;
  box-shadow: 0 4px 12px #0002;
`;

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display =
    window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   5. ANIMAÇÃO DOS ARTIGOS
========================= */

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  posts.forEach((post) => {
    post.classList.add("reveal");
    observer.observe(post);
  });
}

/* =========================
   6. ANO AUTOMÁTICO NO RODAPÉ
========================= */

const footer = document.querySelector("footer");

if (footer) {
  const yearElement = footer.querySelector(".current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

console.log("Blog iniciado com sucesso!");
