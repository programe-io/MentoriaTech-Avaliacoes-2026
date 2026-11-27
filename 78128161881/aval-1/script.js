
// ==========================
// MENU MOBILE
// ==========================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("active");

    menuToggle.textContent = navigation.classList.contains("active")
        ? "✕"
        : "☰";
});

// Fecha o menu ao clicar em um link

document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// ==========================
// ALTERNAR TEMA
// ==========================

const themeToggle = document.getElementById("themeToggle");

// Recupera o tema salvo

const savedTheme = localStorage.getItem("blogTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀";
} else {
    themeToggle.textContent = "☾";
}

// Alterna entre tema claro e escuro

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☀" : "☾";

    localStorage.setItem(
        "blogTheme",
        isLight ? "light" : "dark"
    );

});


// ==========================
// RECOLHER E EXPANDIR ARTIGOS
// ==========================

const readButtons = document.querySelectorAll(".read-button");

readButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.getAttribute("data-target");

        const article = document.getElementById(targetId);

        const sections = article.querySelector(".article-sections");

        const description = article.querySelector(".article-description");

        const isCollapsed = sections.style.display === "none";

        sections.style.display = isCollapsed ? "block" : "none";

        description.style.display = isCollapsed ? "block" : "none";

        button.querySelector("span:first-child").textContent =
            isCollapsed ? "Recolher conteúdo" : "Expandir conteúdo";

        button.querySelector(".arrow").textContent =
            isCollapsed ? "↑" : "↓";

    });

});


// ==========================
// BOTÃO VOLTAR AO TOPO
// ==========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================
// ANO AUTOMÁTICO NO RODAPÉ
// ==========================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ==========================
// ANIMAÇÃO AO CARREGAR
// ==========================

document.querySelectorAll(".blog-card").forEach((card, index) => {

    card.style.animation = `fadeIn 0.7s ease ${index * 0.2}s both`;

});
