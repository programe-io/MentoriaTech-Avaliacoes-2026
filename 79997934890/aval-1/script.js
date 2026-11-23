function filtrar(categoria, botao) {

    let artigos = document.querySelectorAll(".card");

    artigos.forEach(function(artigo) {

        if (
            categoria === "Todos" ||
            artigo.dataset.categoria === categoria
        ) {

            artigo.style.display = "block";

        } else {

            artigo.style.display = "none";

        }

    });

    document.querySelectorAll(".categorias button")
        .forEach(function(b) {
            b.classList.remove("ativo");
        });

    botao.classList.add("ativo");

    document.getElementById("pesquisa").value = "";

}

function pesquisar() {

    let texto = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let artigos = document.querySelectorAll(".card");

    artigos.forEach(function(artigo) {

        let conteudo = artigo.innerText.toLowerCase();

        if (conteudo.includes(texto)) {

            artigo.style.display = "block";

        } else {

            artigo.style.display = "none";

        }

    });

    document.querySelectorAll(".categorias button")
        .forEach(function(b) {
            b.classList.remove("ativo");
        });

}

function lerMais(titulo) {

    alert(
        "Você selecionou: " + titulo +
        "\n\nEsta é uma demonstração do blog Além do Papel."
    );

}