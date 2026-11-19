
let slideAtual = 0;

const slides = document.querySelectorAll(".slide");
const contador = document.getElementById("contador");

function mostrarSlide(numero) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[numero].classList.add("active");

    contador.textContent =
        `Slide ${numero + 1} / ${slides.length}`;
}

function avancar() {

    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);
}

function voltar() {

    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
}

// Navegação pelo teclado
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        avancar();
    }

    if (event.key === "ArrowLeft") {
        voltar();
    }

});
