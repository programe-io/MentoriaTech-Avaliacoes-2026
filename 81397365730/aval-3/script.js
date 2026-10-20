const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");
const fraseBotao = document.getElementById("fraseBotao");
const fraseAleatoria = document.getElementById("fraseAleatoria");
const ano = document.getElementById("ano");

// Atualiza o ano automaticamente no rodapé.
ano.textContent = new Date().getFullYear();

// Menu responsivo para celular.
menuBotao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");

    menuBotao.setAttribute("aria-expanded", String(aberto));
    menuBotao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuBotao.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu depois de escolher uma seção.
menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");

        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.setAttribute("aria-label", "Abrir menu");

        menuBotao.textContent = "☰";
    });
});

// Frases inspiradoras.
const frases = [
    "Acredite no seu potencial, mesmo quando o caminho parecer difícil. 💗",
    "Seus sonhos merecem dedicação, paciência e carinho. 🌷",
    "Cada dia é uma nova oportunidade para aprender. 📚",
    "Valorize as pessoas que fazem parte da sua história. ❤️",
    "O futuro é construído com pequenas atitudes de hoje. ✨",
    "Nunca tenha vergonha de sonhar grande. 🌈",
    "Sua história ainda tem muitos capítulos bonitos pela frente. 🎀",
    "Continue estudando e dando o seu melhor. 🩺",
    "Sua família pode ser uma grande motivação para continuar. 🏡",
    "Você não precisa fazer tudo de uma vez: avance um passo por dia. 💕",
    "Não compare sua caminhada com a de outras pessoas. Cada pessoa tem seu tempo. 🌸",
    "Tenha coragem de aprender, mudar e descobrir novas possibilidades. 💫",
    "Lembre-se de comemorar também as pequenas conquistas. 🎉",
    "Seu sonho é importante, e cada esforço pode ajudar você a chegar mais perto dele. 💖",
    "Nunca se esqueça das pessoas que torcem pela sua felicidade. 🤍"
];

let ultimaFrase = -1;

fraseBotao.addEventListener("click", function () {
    let indice;

    // Evita repetir imediatamente a mesma frase.
    do {
        indice = Math.floor(Math.random() * frases.length);
    } while (frases.length > 1 && indice === ultimaFrase);

    ultimaFrase = indice;

    fraseAleatoria.textContent = frases[indice];
});

// Permite fechar o menu com a tecla Escape.
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        menu.classList.remove("aberto");

        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.setAttribute("aria-label", "Abrir menu");

        menuBotao.textContent = "☰";
    }
});