
// Animação suave ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach((card, index) => {
        card.style.opacity = "0";

        setTimeout(() => {
            card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            card.style.opacity = "1";
        }, index * 200);
    });
});

// Efeito delicado nos botões
document.querySelectorAll("button").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.style.transform = "scale(0.97)";

        setTimeout(() => {
            botao.style.transform = "scale(1)";
        }, 150);
    });
});

// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("Bem-vinda ao Barbie Stock! 💗");
});
