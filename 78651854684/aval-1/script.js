// Mensagem ao clicar no botão

const botao = document.getElementById("botao");

botao.addEventListener("click", function(){

    alert("Obrigado por visitar o Meu Blog!");

});

// Animação dos posts ao carregar

const posts = document.querySelectorAll(".post");

posts.forEach((post, indice)=>{

    post.style.opacity = "0";
    post.style.transform = "translateY(30px)";

    setTimeout(()=>{

        post.style.transition = "0.8s";
        post.style.opacity = "1";
        post.style.transform = "translateY(0)";

    }, indice * 300);

});