// script.js

// Mensagem de boas-vindas
window.onload = function () {
    alert("Bem-vindo(a) à Galeria de Raimunda!");
};

// Seleciona todos os cartões
const cards = document.querySelectorAll(".card");

// Adiciona evento de clique em cada cartão
cards.forEach(card => {
    card.addEventListener("click", () => {
        const animal = card.querySelector("h2").textContent;
        alert("Você clicou em: " + animal);
    });
});

// Efeito ao passar o mouse
cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.border = "3px solid #4CAF50";
    });

    card.addEventListener("mouseout", () => {
        card.style.border = "none";
    });
});

// Mensagem ao clicar no rodapé
const footer = document.querySelector("footer");

footer.addEventListener("click", () => {
    alert("Projeto desenvolvido por Raimunda!");
});