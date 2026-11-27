function matricula() {
    alert(
        "💪 Parabéns! Você está dando o primeiro passo para uma vida mais saudável!"
    );
}

// Efeito ao clicar nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.style.border = "2px solid #ff4500";

        setTimeout(() => {
            card.style.border = "none";
        }, 1000);
    });
});

console.log("Power Fitness carregada com sucesso!");