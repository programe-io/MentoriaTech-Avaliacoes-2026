
function mostrarMensagem() {
    const mensagens = [
        "Você é mais forte do que imagina! 💚",
        "Cada treino é uma conquista!",
        "Sua saúde é seu maior investimento!",
        "Não desista dos seus objetivos!",
        "Respeite seu corpo e comemore sua evolução!"
    ];

    const indice = Math.floor(Math.random() * mensagens.length);

    alert(mensagens[indice]);
}

// Animação dos cards ao aparecer na tela
const cards = document.querySelectorAll('.card');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

cards.forEach((card) => {
    card.classList.add('animar');
    observador.observe(card);
});
