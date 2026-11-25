
// FUNÇÃO DE PESQUISA
function pesquisarNoticias() {

    const pesquisa = document
        .getElementById("campoPesquisa")
        .value.toLowerCase();

    const noticias = document.querySelectorAll(".card");

    let encontrou = false;

    noticias.forEach(noticia => {

        const titulo = noticia.querySelector("h3")
            .innerText.toLowerCase();

        const descricao = noticia.querySelector("p")
            .innerText.toLowerCase();

        if (
            titulo.includes(pesquisa) ||
            descricao.includes(pesquisa)
        ) {
            noticia.style.display = "block";
            encontrou = true;
        } else {
            noticia.style.display = "none";
        }
    });

    document.getElementById("mensagem").innerText =
        encontrou ? "" : "Nenhuma notícia encontrada!";
}

// PESQUISAR AO APERTAR ENTER
document.getElementById("campoPesquisa")
    .addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            pesquisarNoticias();
        }
    });

// FUNÇÃO LER MAIS
function lerNoticia(botao) {

    const card = botao.closest(".card");

    const titulo = card.querySelector("h3").innerText;
    const descricao = card.querySelector("p").innerText;

    alert(
        "NOTÍCIA: " + titulo +
        "\n\n" + descricao
    );
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao NewsFeed!");
});
