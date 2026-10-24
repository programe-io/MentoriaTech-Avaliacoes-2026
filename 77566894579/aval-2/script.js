// Filtra as noticias por categoria
const botoes = document.querySelectorAll(".filtro");
const noticias = document.querySelectorAll(".noticia");

botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const categoriaEscolhida = botao.dataset.filtro;

        botoes.forEach(function (outroBotao) {
            outroBotao.classList.remove("selecionado");
        });
        botao.classList.add("selecionado");

        noticias.forEach(function (noticia) {
            if (categoriaEscolhida === "todas" ||
                noticia.dataset.categoria === categoriaEscolhida) {
                noticia.hidden = false;
            } else {
                noticia.hidden = true;
            }
        });
    });
});
