
// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// FECHAR MENU AO CLICAR EM UM LINK
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// MODO ESCURO
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeBtn.textContent = darkMode ? "☀️" : "🌙";

    localStorage.setItem("darkMode", darkMode);
});

// RESTAURAR TEMA SALVO
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

// FILTRO POR CATEGORIA
const categoryButtons = document.querySelectorAll(".category");
const articles = document.querySelectorAll(".article-card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let selectedCategory = "todos";

function filterArticles() {
    const searchText = searchInput.value.toLowerCase();
    let visibleCount = 0;

    articles.forEach(article => {
        const category = article.dataset.category;
        const title = article.querySelector("h3").textContent.toLowerCase();
        const description = article.querySelector("p").textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        if (matchesCategory && matchesSearch) {
            article.style.display = "block";
            visibleCount++;
        } else {
            article.style.display = "none";
        }
    });

    noResults.hidden = visibleCount > 0;
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterArticles();
    });
});

// PESQUISA DE ARTIGOS
searchInput.addEventListener("input", filterArticles);

// FORMULÁRIO DE CONTATO
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    formMessage.textContent =
        "Mensagem preenchida com sucesso! Configure um serviço de envio para recebê-la.";

    formMessage.style.color = "#16a34a";

    contactForm.reset();
});
