// =====================================
// BOTÃO "VER JOGOS"
// =====================================

const botaoJogos = document.getElementById("botaoJogos");

botaoJogos.addEventListener("click", function () {

    document
        .getElementById("jogos")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// =====================================
// PESQUISA DE JOGOS
// =====================================

const pesquisa = document.getElementById("pesquisa");

const jogos = document.querySelectorAll(".jogo");

const resultado = document.getElementById("resultado");


pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value
        .toLowerCase()
        .trim();

    let encontrados = 0;

    jogos.forEach(function (jogo) {

        const nome = jogo.dataset.nome;

        if (nome.includes(texto)) {

            jogo.style.display = "block";

            encontrados++;

        } else {

            jogo.style.display = "none";

        }

    });

    resultado.textContent =
        encontrados + " jogos encontrados";

});


// =====================================
// FILTRO DE CATEGORIAS
// =====================================

const botoesCategoria =
    document.querySelectorAll(
        ".categorias button"
    );


botoesCategoria.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const categoria =
            botao.dataset.categoria;

        let encontrados = 0;

        jogos.forEach(function (jogo) {

            if (
                categoria === "todos" ||
                jogo.dataset.categoria === categoria
            ) {

                jogo.style.display = "block";

                encontrados++;

            } else {

                jogo.style.display = "none";

            }

        });

        resultado.textContent =
            encontrados + " jogos encontrados";

    });

});


// =====================================
// MINI JOGO
// =====================================

const botoesJogar =
    document.querySelectorAll(".jogar");

const miniJogo =
    document.getElementById("miniJogo");

const pontuacao =
    document.getElementById("pontuacao");

const alvo =
    document.getElementById("alvo");

let pontos = 0;


// ABRIR JOGO

botoesJogar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        pontos = 0;

        pontuacao.textContent =
            "Pontos: 0";

        miniJogo.style.display = "block";

        miniJogo.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// CLICAR NO ALVO

alvo.addEventListener("click", function () {

    pontos++;

    pontuacao.textContent =
        "Pontos: " + pontos;

});


// FECHAR JOGO

document
    .getElementById("fechar")
    .addEventListener("click", function () {

        miniJogo.style.display = "none";

    });