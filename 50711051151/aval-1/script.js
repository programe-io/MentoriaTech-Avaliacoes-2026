```javascript
// Mensagem de boas-vindas
window.addEventListener("load", function () {
    console.log("Bem-vindo ao Museu Digital!");
});

// Interação com os cards
const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {
    card.addEventListener("click", function () {
        const titulo = card.querySelector("h3").textContent;

        alert("Você selecionou a obra: " + titulo);
    });
});
```