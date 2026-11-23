
function mostrarAnime(nome) {
    const descricoes = {
        "Naruto": "Naruto Uzumaki sonha em se tornar Hokage e conquistar o respeito de todos.",
        "One Piece": "Monkey D. Luffy procura o maior tesouro do mundo para se tornar o Rei dos Piratas.",
        "Dragon Ball": "Goku vive grandes aventuras e enfrenta inimigos cada vez mais poderosos.",
        "Jujutsu Kaisen": "Yuji Itadori entra no mundo dos feiticeiros para combater maldições."
    };

    alert(descricoes[nome]);
}

// Sistema de pesquisa
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

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
