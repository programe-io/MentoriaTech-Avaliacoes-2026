// Botão de modo escuro
const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }
});


// Botão "Saiba mais"
function mostrarInfo() {

    const info = document.getElementById("info");

    if (info.textContent === "") {

        info.textContent =
            "🌎 Existem diversos tipos de ecossistemas, como florestas, rios, oceanos, desertos e campos. Cada um possui características e relações próprias.";

    } else {

        info.textContent = "";

    }
}


// Animação ao aparecer na tela
const elementos = document.querySelectorAll(
    ".card, .bio-card, .item"
);

const observer = new IntersectionObserver(
    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.2
    }
);


elementos.forEach((elemento) => {

    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "all .7s ease";

    observer.observe(elemento);

});