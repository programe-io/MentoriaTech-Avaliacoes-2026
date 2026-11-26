
let slides = document.querySelectorAll(".slide");
let atual = 0;

function mostrarSlide() {
    slides.forEach(slide => {
        slide.classList.remove("ativo");
    });

    slides[atual].classList.add("ativo");

    document.getElementById("contador").textContent =
        `${atual + 1} / ${slides.length}`;
}

function proximo() {
    atual++;

    if (atual >= slides.length) {
        atual = 0;
    }

    mostrarSlide();
}

function anterior() {
    atual--;

    if (atual < 0) {
        atual = slides.length - 1;
    }

    mostrarSlide();
}

function telaCheia() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        proximo();
    }

    if (event.key === "ArrowLeft") {
        anterior();
    }

    if (event.key === "Escape") {
        // O navegador controla a saída da tela cheia.
    }
});
