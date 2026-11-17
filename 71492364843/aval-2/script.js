
const slides = document.querySelectorAll(".slide");

const botaoAnterior = document.getElementById("anterior");
const botaoProximo = document.getElementById("proximo");
const contador = document.getElementById("contador");

let slideAtual = 0;

function mostrarSlide() {

    slides.forEach((slide, index) => {
        slide.classList.remove("ativo");

        if (index === slideAtual) {
            slide.classList.add("ativo");
        }
    });

    contador.textContent =
        `${slideAtual + 1} / ${slides.length}`;

    botaoAnterior.disabled = slideAtual === 0;

    botaoProximo.disabled =
        slideAtual === slides.length - 1;
}

function proximoSlide() {

    if (slideAtual < slides.length - 1) {
        slideAtual++;
        mostrarSlide();
    }

}

function slideAnterior() {

    if (slideAtual > 0) {
        slideAtual--;
        mostrarSlide();
    }

}

botaoProximo.addEventListener(
    "click",
    proximoSlide
);

botaoAnterior.addEventListener(
    "click",
    slideAnterior
);

// Navegação pelo teclado
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        proximoSlide();
    }

    if (event.key === "ArrowLeft") {
        slideAnterior();
    }

});

mostrarSlide();
