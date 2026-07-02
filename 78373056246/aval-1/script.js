// Animação ao clicar no botão

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("click", function(){

        this.innerText = "Artigo aberto!";

        this.style.background = "green";

        this.style.transform = "scale(1.1)";

        setTimeout(() => {

            this.innerText = "Ler mais";

            this.style.background = "#2563eb";

            this.style.transform = "scale(1)";

        }, 1500);

    });

});

// Animação ao carregar a página

window.onload = () => {

    const posts = document.querySelectorAll(".post");

    posts.forEach((post, indice) => {

        post.style.opacity = "0";
        post.style.transform = "translateY(40px)";

        setTimeout(() => {

            post.style.transition = "0.8s";

            post.style.opacity = "1";

            post.style.transform = "translateY(0)";

        }, indice * 300);

    });

};