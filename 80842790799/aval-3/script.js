const botoes = document.querySelectorAll(".botao");


botoes.forEach(function(botao){

    botao.addEventListener("click", function(){

        botao.innerHTML = "Artigo aberto ✔";

        botao.style.background = "#16a34a";

    });

});