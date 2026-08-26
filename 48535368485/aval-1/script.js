/* =========================
   FILTRAR JOGOS
========================= */

function filtrarJogos(categoria) {

    const posts = document.querySelectorAll(".post");

    posts.forEach(function(post) {

        const categoriaPost = post.dataset.categoria;

        if (categoria === "todos" || categoriaPost === categoria) {

            post.style.display = "grid";

        } else {

            post.style.display = "none";

        }

    });

}


/* =========================
   BOTÃO LER NOTÍCIA
========================= */

function lerPost(titulo) {

    alert(
        "🎮 " + titulo +
        "\n\nEsta é uma demonstração do blog. " +
        "Aqui você poderia abrir a página completa da notícia."
    );

}


/* =========================
   VOLTAR PARA O INÍCIO
========================= */

function mostrarInicio() {

    filtrarJogos("todos");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   ANIMAÇÃO DOS POSTS
========================= */

const posts = document.querySelectorAll(".post");

posts.forEach(function(post, index) {

    post.style.opacity = "0";
    post.style.transform = "translateY(20px)";

    setTimeout(function() {

        post.style.transition = "0.5s";

        post.style.opacity = "1";
        post.style.transform = "translateY(0)";

    }, index * 150);

});
