// Rolar até a área de jogos

function verJogos() {

    document
        .getElementById("jogos")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Alternar tema claro/escuro

function alternarTema() {

    document.body.classList.toggle("light");

}


// Pesquisar jogos

function pesquisarJogos() {

    const pesquisa =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();

    const jogos =
        document.querySelectorAll(".game-card");


    jogos.forEach(function(jogo) {

        const nome =
            jogo
                .querySelector("h3")
                .textContent
                .toLowerCase();


        if (nome.includes(pesquisa)) {

            jogo.style.display = "block";

        } else {

            jogo.style.display = "none";

        }

    });

}