// Mensagem no console
console.log("Bem-vindo ao CineFlix!");

// Alerta ao clicar em um filme
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        const titulo = card.querySelector("h3").textContent;
        alert(`Você selecionou o filme: ${titulo}`);
    });

    // Efeito ao passar o mouse
    card.addEventListener("mouseenter", () => {
        card.style.border = "3px solid #ffb703";
    });

    card.addEventListener("mouseleave", () => {
        card.style.border = "none";
    });
});

// Mensagem de boas-vindas ao carregar a página
window.addEventListener("load", () => {
    alert("Bem-vindo ao CineFlix! Aproveite os filmes.");
});