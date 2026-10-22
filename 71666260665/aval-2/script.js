const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

// Menu para celulares
menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fechar o menu após clicar em um link
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Exibir mensagens na tela
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// Botões dos modos de jogo
document.querySelectorAll(".card-button").forEach((button) => {
    button.addEventListener("click", () => {
        showToast(button.dataset.message);
    });
});

// Dicas aleatórias
const tips = [
    "Observe a tempestade e planeje sua próxima movimentação.",
    "Procure escudos e itens de cura para se preparar melhor.",
    "Use o som do jogo para perceber passos e outros sinais.",
    "Pratique sua mira antes de entrar em combates difíceis.",
    "Evite correr em áreas abertas sem observar os arredores.",
    "Trabalhe em equipe e compartilhe recursos quando necessário.",
    "Conheça as armas e escolha as que combinam com seu estilo.",
    "Aprenda a usar a construção quando ela estiver disponível."
];

const tipButton = document.getElementById("tipButton");
const tipResult = document.getElementById("tipResult");

let lastTipIndex = -1;

tipButton.addEventListener("click", () => {
    let index;

    do {
        index = Math.floor(Math.random() * tips.length);
    } while (tips.length > 1 && index === lastTipIndex);

    lastTipIndex = index;

    tipResult.textContent = "💡 " + tips[index];
});

// Atualizar o ano automaticamente
document.getElementById("year").textContent =
    new Date().getFullYear();