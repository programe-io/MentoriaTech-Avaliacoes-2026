
/* ABRIR E FECHAR MENU MOBILE */

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("ativo");

}


/* PESQUISAR JOGOS */

function pesquisarJogo() {

    // Captura o texto digitado
    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    // Seleciona todos os cards
    let cards = document.querySelectorAll(".card");

    // Percorre cada card
    cards.forEach(function(card) {

        // Captura o nome do jogo
        let nome = card.querySelector("h3")
            .textContent.toLowerCase();

        // Verifica se o nome corresponde à pesquisa
        if (nome.includes(pesquisa)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
