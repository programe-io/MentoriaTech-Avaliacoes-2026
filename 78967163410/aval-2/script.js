
function pesquisarNoticias() {

    const pesquisa = document
        .getElementById("buscar")
        .value.toLowerCase();

    const noticias = document.querySelectorAll(".noticia");

    noticias.forEach(function(noticia) {

        const texto = noticia.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {
            noticia.style.display = "block";
        } else {
            noticia.style.display = "none";
        }

    });

}
