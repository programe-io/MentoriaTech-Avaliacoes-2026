// =========================================================
// ANIMAÇÃO DAS SEÇÕES
// =========================================================

const elementos = document.querySelectorAll(
    ".secao, .habilidade-card, .tecnologia, .interesse, .educacao-card, .aprendizado-card, .experiencia-card"
);

const observador = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

            }

        });

    },
    {
        threshold: 0.15
    }
);

elementos.forEach((elemento) => {

    observador.observe(elemento);

});


// =========================================================
// EFEITO DO CABEÇALHO
// =========================================================

const cabecalho = document.querySelector(".cabecalho");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        cabecalho.classList.add("rolando");

    } else {

        cabecalho.classList.remove("rolando");

    }

});


// =========================================================
// MENSAGEM NO CONSOLE
// =========================================================

console.log("Portfólio da Maykla carregado com sucesso! 📊💚");