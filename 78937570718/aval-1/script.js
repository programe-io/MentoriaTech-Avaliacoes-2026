
/* MENU RESPONSIVO */

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("ativo");

}


/* PESQUISA DE JOGOS */

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    const jogos = document.querySelectorAll(".card");

    let encontrados = 0;

    jogos.forEach(function(jogo) {

        const nome = jogo.querySelector("h3")
        .textContent.toLowerCase();

        const descricao = jogo.querySelector("p")
        .textContent.toLowerCase();

        if (
            nome.includes(texto) ||
            descricao.includes(texto)
        ) {

            jogo.style.display = "block";
            encontrados++;

        } else {

            jogo.style.display = "none";

        }

    });

    document.getElementById("semResultado").hidden =
        encontrados > 0;

});


/* SISTEMA DE FAVORITOS */

function favoritar(botao) {

    if (botao.classList.contains("favoritado")) {

        botao.classList.remove("favoritado");

        botao.innerHTML = "♡ Favoritar";

        botao.style.background = "transparent";

        botao.style.color = "#00ff99";

    } else {

        botao.classList.add("favoritado");

        botao.innerHTML = "♥ Favoritado";

        botao.style.background = "#00ff99";

        botao.style.color = "#111";

    }

}


/* FORMULÁRIO DE CONTATO */

document.getElementById("formContato")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    document.getElementById("resposta").innerHTML =
        "Obrigado pela mensagem, " + nome +
        "! Sua demonstração foi enviada.";

    this.reset();

});


/* EFEITO DE ENTRADA */

const cards = document.querySelectorAll(".card");

cards.forEach(function(card, indice) {

    card.style.animation = "aparecer 0.6s ease";
    card.style.animationDelay = (indice * 0.08) + "s";

});
