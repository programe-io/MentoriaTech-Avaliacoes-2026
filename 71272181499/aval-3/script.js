// ============================
// BOTÃO DE TEMA
// ============================

const tema = document.getElementById("tema");

tema.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {

        tema.textContent = "☀";

    } else {

        tema.textContent = "☾";

    }

});


// ============================
// BOTÃO VER MAIS
// ============================

const maisHistoria =
    document.getElementById("maisHistoria");

const textoExtra =
    document.getElementById("textoExtra");

maisHistoria.addEventListener("click", function () {

    textoExtra.classList.toggle("oculto");

    if (textoExtra.classList.contains("oculto")) {

        maisHistoria.textContent = "VER MAIS";

    } else {

        maisHistoria.textContent = "VER MENOS";

    }

});


// ============================
// FORMULÁRIO
// ============================

const formulario =
    document.getElementById("formulario");

const notificacao =
    document.getElementById("notificacao");


formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value;

    notificacao.textContent =
        "Mensagem enviada, " + nome + "!";

    notificacao.classList.add("mostrar");

    formulario.reset();

    setTimeout(function () {

        notificacao.classList.remove("mostrar");

    }, 3000);

});


// ============================
// ANIMAÇÃO DOS CARDS
// ============================

const elementos =
    document.querySelectorAll(
        ".card, .estrutura-item"
    );


const observador =
    new IntersectionObserver(

        function (itens) {

            itens.forEach(function (item) {

                if (item.isIntersecting) {

                    item.target.style.opacity = "1";

                    item.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


elementos.forEach(function (elemento) {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(30px)";

    elemento.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observador.observe(elemento);

});