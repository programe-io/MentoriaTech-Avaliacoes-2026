const botao = document.getElementById("btnMensagem");

botao.addEventListener("click", function(){

    alert("🏆 Kaká foi eleito o melhor jogador do mundo em 2007!");

});

const titulo = document.querySelector("header h1");

titulo.addEventListener("mouseover", function(){

    titulo.style.color = "white";

});

titulo.addEventListener("mouseout", function(){

    titulo.style.color = "gold";

});