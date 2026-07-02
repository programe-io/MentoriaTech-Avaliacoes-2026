// Texto digitando

const texto = "Desenvolvedor de Sistemas";
let i = 0;

function escrever() {

    if (i < texto.length) {

        document.getElementById("texto").innerHTML += texto.charAt(i);

        i++;

        setTimeout(escrever, 100);

    }

}

escrever();


// Botão

const botao = document.getElementById("btnConhecer");

botao.addEventListener("click", () => {

    alert("Obrigado por visitar meu site!");

});


// Animação dos cards

const cards = document.querySelectorAll(".card");

const observador = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){

            entrada.target.style.opacity="1";
            entrada.target.style.transform="translateY(0)";

        }

    });

});

cards.forEach((card)=>{

    card.style.opacity="0";
    card.style.transform="translateY(50px)";
    card.style.transition=".8s";

    observador.observe(card);

});