
// Animação de entrada dos elementos

const elementos = document.querySelectorAll(
    '.card, .sobre, .mensagem, .contato'
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('mostrar');
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {
    elemento.classList.add('esconder');
    observador.observe(elemento);
});

// Mensagem de boas-vindas
window.addEventListener('load', () => {
    console.log(
        'Bem-vindo ao Meu Cantinho de Fé! ♡'
    );
});
