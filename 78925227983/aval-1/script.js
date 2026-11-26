
// Menu responsivo
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("active");

    menuButton.textContent = menu.classList.contains("active")
        ? "✕"
        : "☰";
});

// Fechar menu ao clicar em um link
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuButton.textContent = "☰";
    });
});

// Alternar tema claro e escuro
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeButton.textContent = darkMode ? "☀️" : "🌙";

    localStorage.setItem("blogTheme", darkMode ? "dark" : "light");
});

// Recuperar tema salvo
const savedTheme = localStorage.getItem("blogTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

// Pesquisa de artigos
const searchInput = document.getElementById("searchInput");
const articles = document.querySelectorAll(".article-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    articles.forEach(article => {
        const content = article.textContent.toLowerCase();

        if (content.includes(search)) {
            article.style.display = "";
            visibleCount++;
        } else {
            article.style.display = "none";
        }
    });

    noResults.hidden = visibleCount !== 0;
});

// Abrir artigos
const modal = document.getElementById("articleModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = button.dataset.title;
        modalDescription.textContent = button.dataset.description;

        modal.hidden = false;
        closeModal.focus();
    });
});

// Fechar modal
closeModal.addEventListener("click", () => {
    modal.hidden = true;
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.hidden = true;
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        modal.hidden = true;
    }
});

// Newsletter
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (email) {
        newsletterMessage.textContent =
            "Inscrição recebida! Obrigado por participar.";

        newsletterMessage.style.color = "#22a06b";

        newsletterForm.reset();
    }
});
