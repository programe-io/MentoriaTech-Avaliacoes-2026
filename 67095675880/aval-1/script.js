const botao = document.getElementById("btnMensagem");

botao.addEventListener("click", () => {

    alert(`
Olá! Meu nome é Islla Morais ❤️

Tenho 16 anos.
Gosto de comer, dançar,
passar tempo com quem amo
e aproveitar os bons momentos da vida.

Obrigada por visitar meu projeto!
    `);

});


// Efeito de entrada dos cards

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

});

cards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.8s";

    observer.observe(card);

});