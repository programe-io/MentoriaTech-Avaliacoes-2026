const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
    menuToggle.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu ao selecionar uma seção
document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Mensagens sobre respeito e diversidade
const mensagens = [
    "Você merece respeito exatamente por ser quem é. 🏳️‍🌈",
    "Diversidade não é um problema: faz parte da sociedade.",
    "Respeitar alguém é reconhecer sua dignidade e seus direitos.",
    "Pequenas atitudes de acolhimento podem fazer uma grande diferença.",
    "Uma sociedade mais justa começa quando o preconceito deixa de ser normalizado."
];

let indiceMensagem = 0;

const botaoMensagem = document.getElementById("message-button");
const textoMensagem = document.getElementById("message-text");

botaoMensagem.addEventListener("click", () => {
    textoMensagem.textContent = mensagens[indiceMensagem];

    indiceMensagem = (indiceMensagem + 1) % mensagens.length;
});