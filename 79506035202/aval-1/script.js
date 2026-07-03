// Mensagem ao clicar no botão

const botao = document.getElementById("botao");

botao.addEventListener("click", function(){

    alert("Obrigado por visitar o Meu Blog!");

});

// Animação ao carregar a página

const posts = document.querySelectorAll(".post");

posts.forEach(function(post, indice){

    post.style.opacity = 0;
    post.style.transform = "translateY(40px)";

    setTimeout(function(){

        post.style.transition = "1s";
        post.style.opacity = 1;
        post.style.transform = "translateY(0)";

    }, indice * 400);

});