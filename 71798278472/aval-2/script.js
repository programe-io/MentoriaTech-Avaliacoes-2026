// ===============================
// TEMA ESCURO / CLARO
// ===============================

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {

        botaoTema.textContent = "☀️";

    } else {

        botaoTema.textContent = "🌙";

    }

});


// ===============================
// PESQUISA DE NOTÍCIAS
// ===============================

const pesquisa = document.getElementById("pesquisa");

const noticias = document.querySelectorAll(".noticia");

pesquisa.addEventListener("input", function () {

    const texto =
        pesquisa.value.toLowerCase();

    noticias.forEach(function (noticia) {

        const conteudo =
            noticia.textContent.toLowerCase();

        if (conteudo.includes(texto)) {

            noticia.style.display = "flex";

        } else {

            noticia.style.display = "none";

        }

    });

});


// ===============================
// BOTÃO LER MAIS
// ===============================

const botoes =
    document.querySelectorAll(".lerMais");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        alert(
            "🎮 Em breve, Ryan vai publicar a matéria completa!"
        );

    });

});


// ===============================
// MENSAGEM NO CONSOLE
// ===============================

console.log(
    "🎮 RyanGames carregado com sucesso!"
);