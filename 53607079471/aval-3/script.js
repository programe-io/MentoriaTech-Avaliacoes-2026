
// Mensagem ao clicar no botão de um livro
function mostrarLivro(nome) {
    alert("💗 Você escolheu: " + nome +
    "\n\nEspero que você ame essa leitura!");
}

// Pesquisa de livros
const pesquisa = document.getElementById("pesquisa");

const livros = document.querySelectorAll(".card");

const semResultados = document.getElementById("sem-resultados");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    let encontrados = 0;

    livros.forEach(function(livro) {

        const nome = livro.querySelector("h3")
            .textContent.toLowerCase();

        const autor = livro.querySelector("p")
            .textContent.toLowerCase();

        if (nome.includes(texto) || autor.includes(texto)) {

            livro.style.display = "block";
            encontrados++;

        } else {

            livro.style.display = "none";

        }

    });

    semResultados.hidden = encontrados !== 0;

});
