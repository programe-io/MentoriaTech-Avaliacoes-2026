// Seleciona todos os links do menu
const links = document.querySelectorAll("nav a");


// Adiciona uma mensagem ao clicar nos links
links.forEach(function(link) {

    link.addEventListener("click", function() {

        console.log("Navegando pelo site Futebol Mania!");

    });

});


// Seleciona o botão "Ver jogos"
const botao = document.querySelector(".botao");


// Mostra uma mensagem quando o botão for clicado
botao.addEventListener("click", function() {

    console.log("Você acessou a seção de jogos!");

});