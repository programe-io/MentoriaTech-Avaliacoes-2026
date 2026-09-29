const campoPesquisa = document.getElementById("pesquisa");
const jogos = document.querySelectorAll(".jogo");
const resultado = document.getElementById("resultado");

let pontuacao = 0;


// PESQUISA

campoPesquisa.addEventListener("input", function () {

    const texto = campoPesquisa.value
        .toLowerCase()
        .trim();

    let encontrados = 0;

    jogos.forEach(function (jogo) {

        const nome = jogo
            .dataset
            .nome
            .toLowerCase();

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


// FILTROS

const botoesCategoria =
    document.querySelectorAll(".categorias button");

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


// BOTÃO VER JOGOS

document
    .getElementById("btnJogos")
    .addEventListener("click", function () {

        document
            .getElementById("jogos")
            .scrollIntoView({
                behavior: "smooth"
            });
    });


// ABRIR MINI JOGO

const botoesJogar =
    document.querySelectorAll(".btnJogar");

botoesJogar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        pontuacao = 0;

        document.getElementById("pontuacao").textContent =
            "Pontos: 0";

        document.getElementById("miniJogo").style.display =
            "block";

        document
            .getElementById("miniJogo")
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});


// ALVO

document
    .getElementById("alvo")
    .addEventListener("click", function () {

        pontuacao++;

        document.getElementById("pontuacao").textContent =
            "Pontos: " + pontuacao;
    });


// FECHAR MINI JOGO

document
    .getElementById("fechar")
    .addEventListener("click", function () {

        document.getElementById("miniJogo").style.display =
            "none";
    });