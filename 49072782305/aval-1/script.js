
let slides = document.querySelectorAll(".slide");

let atual = 0;

function mostrarSlide(numero) {

    slides.forEach(slide => {
        slide.classList.remove("ativo");
    });

    slides[numero].classList.add("ativo");

    document.getElementById("contador").textContent =
        (numero + 1) + " / " + slides.length;
}

function proximo() {

    atual++;

    if (atual >= slides.length) {
        atual = 0;
    }

    mostrarSlide(atual);
}

function anterior() {

    atual--;

    if (atual < 0) {
        atual = slides.length - 1;
    }

    mostrarSlide(atual);
}

function telaCheia() {

    let elemento = document.querySelector(".apresentacao");

    if (!document.fullscreenElement) {
        elemento.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Navegação pelo teclado
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        proximo();
    }

    if (event.key === "ArrowLeft") {
        anterior();
    }

});
