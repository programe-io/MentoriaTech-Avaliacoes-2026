// Animação ao carregar a página

const posts = document.querySelectorAll(".post");

window.addEventListener("load", () => {

    posts.forEach((post, indice) => {

        setTimeout(() => {
            post.classList.add("ativo");
        }, indice * 400);

    });

});

// Destacar o post ao clicar

posts.forEach(post => {

    post.addEventListener("click", () => {

        post.style.background = "#dbeafe";

        setTimeout(() => {
            post.style.background = "white";
        }, 600);

    });

});