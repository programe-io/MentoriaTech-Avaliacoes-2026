// Função para abrir um artigo
function lerMais(titulo) {
    alert("Você selecionou: " + titulo);
}

// Pesquisa de artigos
const pesquisa = document.getElementById("pesquisa");
const posts = document.querySelectorAll(".post");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    posts.forEach(function(post) {

        const conteudo = post.innerText.toLowerCase();

        if (conteudo.includes(texto)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});