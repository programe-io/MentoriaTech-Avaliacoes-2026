const botaoTopo = document.getElementById("topo");

// Voltar ao início da página
botaoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Animação de entrada das seções
const secoes = document.querySelectorAll("section");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
        }

    });

}, {
    threshold: 0.15
});

secoes.forEach(secao => {
    observador.observe(secao);
});
Adicione também ao final do seu style.css:


css

section {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity .8s ease, transform .8s ease;
}

section.visivel {
    opacity: 1;
    transform: translateY(0);
}