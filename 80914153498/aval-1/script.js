
console.log("Bem-vindo ao Mundo do Futebol!");

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
            alert("Você selecionou: " + card.textContent);
                });
                });
                