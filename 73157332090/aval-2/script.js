function mostrarMensagem() {
    alert("☕ Seja bem-vindo ao Café Aroma! Esperamos você para um café especial.");
}

const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        const produto = card.querySelector("h3").textContent;
        alert("Você selecionou: " + produto);
    });
});
