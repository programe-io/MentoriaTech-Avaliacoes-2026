
function mensagem() {
    alert("⚽ Seja bem-vindo ao Mundo do Futebol!");
}

const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        alert("Você selecionou: " +
        card.querySelector("h3").textContent);
    });
});
