
const slides = document.querySelectorAll(".slide");

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const contador = document.getElementById("contador");

let atual = 0;

function mostrarSlide() {

    slides.forEach((slide, index) => {
        slide.classList.toggle("ativo", index === atual);
    });

    contador.textContent =
        `${String(atual + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

    anterior.disabled = atual === 0;
    proximo.disabled = atual === slides.length - 1;
}

proximo.addEventListener("click", () => {
    if (atual < slides.length - 1) {
        atual++;
        mostrarSlide();
    }
});

anterior.addEventListener("click", () => {
    if (atual > 0) {
        atual--;
        mostrarSlide();
    }
});

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        proximo.click();
    }

    if (event.key === "ArrowLeft") {
        anterior.click();
    }

});

mostrarSlide();
