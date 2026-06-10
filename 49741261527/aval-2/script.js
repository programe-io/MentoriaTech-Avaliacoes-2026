document.getElementById("btnAssistir").addEventListener("click", () => {
    alert("Bem-vindo à Netflix!");
});

document.getElementById("btnEntrar").addEventListener("click", () => {
    alert("Página de login em desenvolvimento.");
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        alert("Você selecionou: " + card.textContent);
    });
});