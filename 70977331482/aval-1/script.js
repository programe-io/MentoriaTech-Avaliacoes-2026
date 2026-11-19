
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(function(card) {

        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = card.querySelector("p")
            .textContent.toLowerCase();

        if (nome.includes(texto) || descricao.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
