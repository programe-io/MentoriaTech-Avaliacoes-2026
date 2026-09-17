// =========================
// BOTÃO DE TEMA
// =========================

const tema = document.getElementById("tema");

tema.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {

        tema.textContent = "🌙";

        localStorage.setItem("tema", "claro");

    } else {

        tema.textContent = "☀️";

        localStorage.setItem("tema", "escuro");

    }

});


// =========================
// CARREGAR TEMA SALVO
// =========================

if (localStorage.getItem("tema") === "claro") {

    document.body.classList.add("claro");

    tema.textContent = "🌙";

}


// =========================
// BOTÃO MINHA MENSAGEM
// =========================

const mensagemBtn =
    document.getElementById("mensagemBtn");

const mensagem =
    document.getElementById("mensagem");


mensagemBtn.addEventListener("click", function () {

    mensagem.textContent =
        "Meu objetivo é continuar aprendendo, fazer mais cursos e construir minha carreira na área de tecnologia.";

    mensagemBtn.textContent =
        "Mensagem exibida ✓";

});


// =========================
// ROLAGEM SUAVE
// =========================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const destino =
            document.querySelector(
                this.getAttribute("href")
            );

        if (destino) {

            destino.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});