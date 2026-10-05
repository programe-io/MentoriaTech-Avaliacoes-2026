// ==========================
// BOTÃO EXPLORAR
// ==========================

const explorarBtn =
    document.getElementById("explorarBtn");

explorarBtn.addEventListener("click", function () {

    document
        .getElementById("carros")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ==========================
// BOTÃO MODO ESCURO / CLARO
// ==========================

const temaBtn =
    document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {

        temaBtn.textContent =
            "🌙 Modo Escuro";

    } else {

        temaBtn.textContent =
            "☀️ Modo Claro";
    }

});


// ==========================
// INFORMAÇÕES DOS CARROS
// ==========================

const botoes =
    document.querySelectorAll(".infoBtn");

botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const carro =
            botao.getAttribute("data-carro");

        alert(
            "🚗 " + carro +
            "\n\n" +
            "Este é um dos carros em destaque no AutoBlog!"
        );

    });

});


// ==========================
// ANIMAÇÃO DOS CARDS
// ==========================

const cards =
    document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.cursor = "pointer";

    });

});


// ==========================
// ANO AUTOMÁTICO
// ==========================

const ano =
    new Date().getFullYear();

const rodape =
    document.querySelector("footer p");

rodape.textContent =
    "© " + ano +
    " AutoBlog - Mundo dos Carros";


// ==========================
// MENSAGEM NO CONSOLE
// ==========================

console.log(
    "🚗 AutoBlog carregado com sucesso!"
);