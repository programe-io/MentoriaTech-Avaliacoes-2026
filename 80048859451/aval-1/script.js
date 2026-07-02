// Mostrar e esconder texto

const botao = document.getElementById("btn");
const texto = document.getElementById("texto");

botao.addEventListener("click", function(){

    if(texto.style.display === "block"){

        texto.style.display = "none";
        botao.innerHTML = "Ler Mais";

    }else{

        texto.style.display = "block";
        botao.innerHTML = "Mostrar Menos";

    }

});

// Animação ao carregar a página

const cards = document.querySelectorAll(".card");

cards.forEach((card, indice)=>{

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(()=>{

        card.style.transition = "0.8s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, indice * 400);

});