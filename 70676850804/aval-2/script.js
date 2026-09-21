// BOTÃO DE MODO ESCURO

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        modoBtn.textContent = "☀️";
    } else {
        modoBtn.textContent = "🌙";
    }

});


// BOTÃO DE MENSAGEM

const mensagemBtn = document.getElementById("mensagemBtn");
const mensagem = document.getElementById("mensagem");

mensagemBtn.addEventListener("click", function () {

    mensagem.textContent =
        "✨ Cada linha de código é um passo em direção ao meu futuro!";

});


// ANIMAÇÃO AO ROLAR A PÁGINA

const elementos = document.querySelectorAll(".card, .caixa-destaque");

window.addEventListener("scroll", function () {

    elementos.forEach(function (elemento) {

        const posicao = elemento.getBoundingClientRect().top;
        const alturaTela = window.innerHeight;

        if (posicao < alturaTela - 100) {
            elemento.style.opacity = "1";
            elemento.style.transform = "translateY(0)";
        }

    });

});