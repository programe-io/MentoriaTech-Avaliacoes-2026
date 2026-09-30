function pesquisar() {

    let pesquisa = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filmes = document.querySelectorAll(".card");

    filmes.forEach(function(filme) {

        let nome = filme.innerText.toLowerCase();

        if (nome.includes(pesquisa)) {
            filme.style.display = "block";
        } else {
            filme.style.display = "none";
        }

    });
}