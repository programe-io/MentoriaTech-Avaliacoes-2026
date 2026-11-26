
// ALTERNAR ENTRE MODO CLARO E ESCURO

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }

});


// PESQUISAR PUBLICAÇÕES

const campoPesquisa = document.getElementById("pesquisa");

const publicacoes = document.querySelectorAll(".post");

campoPesquisa.addEventListener("input", function() {

    const pesquisa = campoPesquisa.value.toLowerCase();

    publicacoes.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});
