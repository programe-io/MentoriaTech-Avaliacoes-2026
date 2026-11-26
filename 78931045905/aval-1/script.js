
// Seleciona todos os personagens
const cards = document.querySelectorAll('.personagem');

// Cria o efeito de animação ao aparecer na tela
const observer = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.style.opacity = '1';

            entrada.target.style.transform = 'translateY(0)';

        }

    });

}, {
    threshold: 0.15
});

// Aplica a animação em cada personagem
cards.forEach((card) => {

    card.style.opacity = '0';

    card.style.transform = 'translateY(30px)';

    card.style.transition = 'opacity .7s, transform .7s';

    observer.observe(card);

});

// Mensagem no console
console.log("Avengers Blog - Criado por Francisquim!");
