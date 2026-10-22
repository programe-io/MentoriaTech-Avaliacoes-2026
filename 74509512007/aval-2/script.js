
// Seleciona os elementos do site
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const messageButton = document.getElementById("message-button");
const message = document.getElementById("message");

// Abre e fecha o menu no celular
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Alterna entre tema claro e escuro
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
});

// Mensagens sobre respeito e igualdade
const messages = [
    "Respeitar as diferenças é reconhecer a humanidade de todos.",
    "Conhecer a história é um passo importante para transformar o futuro.",
    "Combater o racismo é um compromisso de toda a sociedade.",
    "A diversidade fortalece a cultura e a identidade brasileira.",
    "Igualdade de direitos é fundamental para uma sociedade justa."
];

messageButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * messages.length);

    message.textContent = messages[randomIndex];
});
