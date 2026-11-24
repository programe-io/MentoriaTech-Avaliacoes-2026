
const dadosNoticias = [
    {
        titulo: "O futuro do Universo Cinematográfico Marvel",
        categoria: "Filmes",
        descricao: "Confira novidades, produções e os próximos caminhos do universo dos super-heróis."
    },
    {
        titulo: "Os Vingadores e suas maiores batalhas",
        categoria: "Heróis",
        descricao: "Relembre os momentos mais marcantes da equipe mais poderosa da Terra."
    },
    {
        titulo: "Thanos: o grande desafio dos Vingadores",
        categoria: "Vilões",
        descricao: "Conheça a história do Titã Louco e seu plano para mudar o universo."
    },
    {
        titulo: "O multiverso Marvel",
        categoria: "Universo",
        descricao: "Entenda como diferentes realidades se conectam no universo Marvel."
    }
];

let categoriaAtual = "Todas";

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    filtrarNoticias();
}

function filtrarNoticias() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const noticias = document.querySelectorAll(".noticia");

    let quantidade = 0;

    noticias.forEach((noticia) => {
        const titulo = noticia.querySelector("h3")
            .textContent.toLowerCase();

        const categoria = noticia.dataset.categoria;

        const correspondeTexto = titulo.includes(pesquisa);
        const correspondeCategoria =
            categoriaAtual === "Todas" ||
            categoria === categoriaAtual;

        const mostrar =
            correspondeTexto && correspondeCategoria;

        noticia.style.display = mostrar ? "block" : "none";

        if (mostrar) quantidade++;
    });

    document.getElementById("semResultados").hidden =
        quantidade !== 0;
}

function lerNoticia(indice) {
    const noticia = dadosNoticias[indice];

    alert(
        noticia.titulo +
        "\n\nCategoria: " + noticia.categoria +
        "\n\n" + noticia.descricao +
        "\n\nConteúdo demonstrativo do portal Marvel News."
    );
}
