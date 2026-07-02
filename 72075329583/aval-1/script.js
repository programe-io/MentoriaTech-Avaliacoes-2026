const botao = document.getElementById("btnMensagem");

botao.addEventListener("click", function(){

    alert("🐐 Cristiano Ronaldo é um dos maiores jogadores da história do futebol!");

});

const titulo = document.querySelector("header h1");

titulo.addEventListener("mouseover", function(){

    titulo.style.color = "gold";

});

titulo.addEventListener("mouseout", function(){

    titulo.style.color = "white";

});

const cards = document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseover", function(){

        card.style.transform = "scale(1.05)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseout", function(){

        card.style.transform = "scale(1)";

    });

});