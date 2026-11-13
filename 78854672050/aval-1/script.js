
function jogar() {
    alert("🔥 BOOYAH! A batalha vai começar!");
}

function mensagem() {
    alert("Você está pronto para ser o campeão do Free Fire! 🏆");
}

// Efeito de entrada nos personagens
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        alert("🔥 Você selecionou: " +
            card.querySelector("h3").textContent);
    });
});
