
// Pesquisa de pássaros

const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(card => {

        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// Botão interativo

function mostrarMensagem() {

    document.getElementById("mensagem").textContent =
        "Obrigado por visitar o Mundo dos Pássaros! 💚🐦";

}
