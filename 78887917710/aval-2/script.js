
// Animação de entrada dos elementos

const elementos = document.querySelectorAll(
    '.card, .bio-content, .gallery img'
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('aparecer');
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {
    elemento.classList.add('escondido');
    observador.observe(elemento);
});

// Efeito no menu ao rolar a página

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.style.background = '#050910';
    } else {
        header.style.background = '#080d17';
    }
});

// Ano automático no console
console.log("Bem-vindo ao universo de Magnus Carlsen!");
