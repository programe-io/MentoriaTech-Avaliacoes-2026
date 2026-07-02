
const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.textContent = "☀️ Modo Claro";
    }else{
        botaoTema.textContent = "🌙 Modo Escuro";
    }

});



const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("keyup", function(){

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(function(card){

        const titulo = card.querySelector("h3").textContent.toLowerCase();

        if(titulo.includes(texto)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});



const imagens = document.querySelectorAll(".galeria img");

imagens.forEach(function(img){

    img.addEventListener("click", function(){

        window.open(img.src);

    });

});



window.addEventListener("load", function(){

    cards.forEach(function(card, indice){

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(function(){

            card.style.transition = "0.6s";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, indice * 250);

    });

});