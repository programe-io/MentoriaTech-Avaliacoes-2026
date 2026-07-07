function mensagem(){
    alert("Olá! Você clicou no botão.");
}

console.log("JavaScript carregado.");

document.addEventListener("DOMContentLoaded", function(){

    const titulo = document.querySelector("h1");

    titulo.addEventListener("click", function(){
        titulo.innerHTML = "Título Alterado!";
    });

    const paragrafos = document.querySelectorAll("p");

    paragrafos.forEach(function(p){
        p.addEventListener("mouseover", function(){
            p.style.color = "blue";
        });

        p.addEventListener("mouseout", function(){
            p.style.color = "";
        });
    });

});