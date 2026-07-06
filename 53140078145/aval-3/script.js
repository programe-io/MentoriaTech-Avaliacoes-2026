// Exibe uma mensagem ao clicar em "Ler mais"

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("click", function(event){

        event.preventDefault();

        alert("Artigo completo em breve!");

    });

});

// Newsletter

const botaoNewsletter = document.querySelector(".box button");

botaoNewsletter.addEventListener("click", function(){

    const email = document.querySelector("input").value;

    if(email === ""){
        alert("Digite um e-mail.");
    }else{
        alert("Obrigado por se inscrever!");
    }

});