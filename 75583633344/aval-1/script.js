
function mensagem() {
    alert("Olá! Obrigada por visitar meu site. 💜 Eu sou a Isadora!");
}

// Efeito de entrada nos conteúdos
const secoes = document.querySelectorAll(".secao");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
        }
    });
}, {
    threshold: 0.2
});

secoes.forEach((secao) => {
    observador.observe(secao);
});
