```javascript
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    cards.forEach(card => {
        const nome = card.dataset.nome;

        card.style.display = nome.includes(texto)
            ? "block"
            : "none";
    });
});

function filtrar(categoria) {
    cards.forEach(card => {
        if (categoria === "todos" ||
            card.dataset.categoria === categoria) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    pesquisa.value = "";
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        const nome = card.querySelector("h3").textContent;
        alert("Você selecionou: " + nome);
    });
});

console.log("CINEVERSE iniciado com sucesso!");
```