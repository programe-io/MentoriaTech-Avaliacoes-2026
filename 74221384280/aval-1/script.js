const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const filmes = document.querySelectorAll(".filme");

// Pesquisa e filtro de filmes
function filtrarFilmes() {
    const texto = pesquisa.value.toLowerCase();
    const categoriaSelecionada = categoria.value;

    filmes.forEach((filme) => {
        const titulo = filme.querySelector("h3").textContent.toLowerCase();
        const categoriaFilme = filme.dataset.categoria;

        const correspondeTexto = titulo.includes(texto);

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            categoriaFilme === categoriaSelecionada;

        if (correspondeTexto && correspondeCategoria) {
            filme.style.display = "block";
        } else {
            filme.style.display = "none";
        }
    });
}

pesquisa.addEventListener("input", filtrarFilmes);
categoria.addEventListener("change", filtrarFilmes);


// Exibe detalhes do filme
function mostrarDetalhes(nomeFilme) {
    alert(
        `🎬 ${nomeFilme}\n\n` +
        `Você selecionou este filme!\n` +
        `Prepare a pipoca e aproveite a sessão. 🍿😂`
    );
}
