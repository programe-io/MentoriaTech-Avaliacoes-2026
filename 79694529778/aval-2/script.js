// ==============================
// MODAL DE DETALHES
// ==============================

function mostrarDetalhes(titulo, autor, descricao) {

    document.getElementById("modalTitulo").textContent = titulo;

    document.getElementById("modalAutor").textContent =
        "Autor(a): " + autor;

    document.getElementById("modalDescricao").textContent =
        descricao;

    document.getElementById("modal").style.display = "flex";
}


function fecharDetalhes() {

    document.getElementById("modal").style.display = "none";
}


// Fechar clicando fora da janela

window.onclick = function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {

        fecharDetalhes();

    }

};


// ==============================
// PESQUISA DE LIVROS
// ==============================

const campoPesquisa =
    document.getElementById("campoPesquisa");

campoPesquisa.addEventListener("input", function() {

    const pesquisa =
        campoPesquisa.value.toLowerCase();

    const livros =
        document.querySelectorAll(".livro");


    livros.forEach(function(livro) {

        const nome =
            livro.querySelector("h3")
            .textContent
            .toLowerCase();


        if (nome.includes(pesquisa)) {

            livro.style.display = "block";

        } else {

            livro.style.display = "none";

        }

    });

});