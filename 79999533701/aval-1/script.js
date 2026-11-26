
const pesquisa = document.getElementById("pesquisa");
const posts = document.querySelectorAll(".post");
const botao = document.getElementById("mensagem");

// Pesquisar posts
pesquisa.addEventListener("input", function () {
    const texto = pesquisa.value.toLowerCase();

    posts.forEach(function (post) {
        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(texto)) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
});

// Exibir mensagem
botao.addEventListener("click", function () {
    alert("Bem-vindo ao Meu Blog! Obrigado pela visita.");
});
