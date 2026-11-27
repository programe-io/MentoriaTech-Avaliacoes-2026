
const pesquisa = document.getElementById("pesquisa");
const noticias = document.querySelectorAll(".noticia");

let categoriaSelecionada = "Todas";

// Filtrar notícias por categoria
function filtrar(categoria) {
    categoriaSelecionada = categoria;
    atualizarNoticias();
}

// Pesquisar notícias
pesquisa.addEventListener("input", function () {
    atualizarNoticias();
});

// Atualizar o feed
function atualizarNoticias() {
    const texto = pesquisa.value.toLowerCase();

    noticias.forEach(function (noticia) {
        const categoria = noticia.dataset.categoria;
        const conteudo = noticia.textContent.toLowerCase();

        const correspondeCategoria =
            categoriaSelecionada === "Todas" ||
            categoria === categoriaSelecionada;

        const correspondePesquisa =
            conteudo.includes(texto);

        if (correspondeCategoria && correspondePesquisa) {
            noticia.style.display = "block";
        } else {
            noticia.style.display = "none";
        }
    });
}

// Curtir notícia
function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;

    botao.style.background = "#9d3900";
}
