const slides =
    document.querySelectorAll(".slide");

const nextButton =
    document.querySelector(".next");

const prevButton =
    document.querySelector(".prev");

const dotsContainer =
    document.querySelector(".dots");

let atual = 0;


/* CRIAR BOLINHAS */

slides.forEach((slide, index) => {

    const dot =
        document.createElement("div");

    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

        atual = index;

        mostrarSlide(atual);

        reiniciarTimer();
    });

    dotsContainer.appendChild(dot);
});


const dots =
    document.querySelectorAll(".dot");


/* MOSTRAR SLIDE */

function mostrarSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");
}


/* PRÓXIMO */

nextButton.addEventListener("click", () => {

    atual++;

    if (atual >= slides.length) {
        atual = 0;
    }

    mostrarSlide(atual);

    reiniciarTimer();
});


/* ANTERIOR */

prevButton.addEventListener("click", () => {

    atual--;

    if (atual < 0) {
        atual = slides.length - 1;
    }

    mostrarSlide(atual);

    reiniciarTimer();
});


/* TROCA AUTOMÁTICA */

let timer =
    setInterval(proximoSlide, 6000);


function proximoSlide() {

    atual++;

    if (atual >= slides.length) {
        atual = 0;
    }

    mostrarSlide(atual);
}


/* REINICIAR TIMER */

function reiniciarTimer() {

    clearInterval(timer);

    timer =
        setInterval(proximoSlide, 6000);
}


/* TECLADO */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {
            nextButton.click();
        }

        if (event.key === "ArrowLeft") {
            prevButton.click();
        }

    }
);


/* SWIPE NO CELULAR */

let inicioX = 0;

let finalX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        inicioX =
            event.touches[0].clientX;

    }
);


document.addEventListener(
    "touchend",
    (event) => {

        finalX =
            event.changedTouches[0].clientX;

        const distancia =
            finalX - inicioX;

        if (Math.abs(distancia) > 50) {

            if (distancia < 0) {

                nextButton.click();

            } else {

                prevButton.click();

            }

        }

    }
);