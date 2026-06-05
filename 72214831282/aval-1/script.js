const botao = document.getElementById("btnMensagem");

botao.addEventListener("click", () => {

    alert(
        "Olá! Eu sou Vinícius Oliveira de Macêdo. Seja bem-vindo ao meu projeto da Mentoria Tech! 🚀"
    );

});


const cards = document.querySelectorAll(".glass-card");

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const posicao = card.getBoundingClientRect().top;

        if(posicao < window.innerHeight - 100){

            card.style.opacity = "1";
            card.style.transform = "translateY(0px)";

        }

    });

});