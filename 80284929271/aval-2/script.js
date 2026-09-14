function jogar(nome) {
    alert("🎮 Você escolheu: " + nome);
}

function filtrar(categoria) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (
            categoria === "todos" ||
            card.dataset.categoria === categoria
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function () {
    const texto = pesquisa.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const nome = card.dataset.nome;

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});