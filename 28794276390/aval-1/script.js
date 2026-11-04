
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const searchInput = document.getElementById("searchInput");
const articles = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

// Alternar tema escuro
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeButton.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Menu mobile
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Fechar menu ao clicar em um link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Pesquisa de artigos
searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    let visibleCount = 0;

    articles.forEach(article => {
        const content = article.textContent.toLowerCase();

        if (content.includes(search)) {
            article.style.display = "block";
            visibleCount++;
        } else {
            article.style.display = "none";
        }
    });

    noResults.hidden = visibleCount !== 0;
});

// Formulário de contato
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent =
        "Mensagem validada! Para recebê-la, conecte o formulário a um serviço de envio.";

    formMessage.style.color = "#635bff";

    contactForm.reset();
});
