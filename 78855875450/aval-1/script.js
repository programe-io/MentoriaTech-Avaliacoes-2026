const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const texto = botao.nextElementSibling;

        texto.classList.toggle("show");

        if(texto.classList.contains("show")){
            botao.innerHTML = "Mostrar Menos";
        }else{
            botao.innerHTML = "Leia Mais";
        }

    });

});

// Animação ao carregar a página

const cards = document.querySelectorAll(".card");

cards.forEach((card, indice)=>{

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(()=>{

        card.style.transition = ".7s";

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, indice * 300);

});