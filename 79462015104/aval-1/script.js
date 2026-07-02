const botao = document.getElementById("btnAnimar");
const artigo = document.getElementById("conteudo");

botao.addEventListener("click", () => {

    artigo.classList.toggle("destaque");

    if (artigo.classList.contains("destaque")) {
        botao.innerText = "Remover Destaque";
    } else {
        botao.innerText = "Destacar Conteúdo";
    }

});

// Animação ao carregar a página

window.addEventListener("load", () => {

    const posts = document.querySelectorAll(".post-item");

    posts.forEach((post, indice) => {

        post.style.opacity = "0";
        post.style.transform = "translateX(-30px)";

        setTimeout(() => {

            post.style.transition = "0.5s";
            post.style.opacity = "1";
            post.style.transform = "translateX(0)";

        }, indice * 200);

    });

});