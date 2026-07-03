// Animação ao clicar no botão

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botao.innerHTML = "✔ Lido!";

        botao.style.background = "green";

    });

});

// Animação de entrada dos posts

const posts = document.querySelectorAll(".post");

posts.forEach((post, indice)=>{

    post.style.opacity = 0;
    post.style.transform = "translateY(40px)";

    setTimeout(()=>{

        post.style.transition = "0.8s";

        post.style.opacity = 1;

        post.style.transform = "translateY(0)";

    }, indice * 300);

});