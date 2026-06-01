// ==========================
// JavaScript - Galeria Mizilene Lima
// ==========================

// Mensagem de boas-vindas
window.onload = function () {
    alert("Seja bem-vindo(a) à galeria de Mizilene Lima!");
};

// Efeito ao clicar nas imagens
const imagens = document.querySelectorAll(".galeria img");

imagens.forEach((img) => {
    img.addEventListener("click", () => {

        img.style.transform = "scale(1.2)";

        setTimeout(() => {
            img.style.transform = "scale(1)";
        }, 500);

        alert("Você clicou em uma foto da galeria!");
    });
});

// Mostrar data e hora no console
function mostrarDataHora() {
    const agora = new Date();

    console.log(
        "Data e Hora: " +
        agora.toLocaleDateString("pt-BR") +
        " " +
        agora.toLocaleTimeString("pt-BR")
    );
}

setInterval(mostrarDataHora, 1000);

// Mensagem no rodapé
const footer = document.querySelector("footer");

if (footer) {
    footer.addEventListener("mouseover", () => {
        footer.innerHTML = "💖 Obrigado por visitar a galeria de Mizilene Lima!";
    });

    footer.addEventListener("mouseout", () => {
        footer.innerHTML = "© 2026 - Mizilene Lima";
    });
}