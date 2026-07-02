// Botão de mensagem

const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function(){

    mensagem.innerHTML = "Obrigado por visitar o TechBlog!";

    mensagem.style.color = "green";
    mensagem.style.fontWeight = "bold";

});


// Animação ao carregar os cards

const cards = document.querySelectorAll(".card");

window.addEventListener("load", ()=>{

    cards.forEach((card, index)=>{

        setTimeout(()=>{

            card.classList.add("mostrar");

        }, index * 400);

    });

});


// Efeito ao passar o mouse

cards.forEach(card=>{

    card.addEventListener("mouseover", ()=>{

        card.style.transform = "scale(1.03)";

    });

    card.addEventListener("mouseout", ()=>{

        card.style.transform = "scale(1)";

    });

});