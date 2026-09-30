// ========================================
// BOTÃO "DESCOBRIR A MAGIA"
// ========================================

const botaoMagia = document.getElementById("botaoMagia");

botaoMagia.addEventListener("click", function () {

    alert(
        "✨ A verdadeira magia está em acreditar nos seus sonhos! " +
        "Assim como Tiana, continue trabalhando para alcançar seus objetivos."
    );

});


// ========================================
// MENSAGENS INTERATIVAS
// ========================================

const botaoMensagem = document.getElementById("botaoMensagem");

const mensagemTitulo = document.getElementById("mensagemTitulo");

const mensagemTexto = document.getElementById("mensagemTexto");


const mensagens = [

    {
        titulo: "Acredite nos seus sonhos",
        texto: "Todo grande sonho começa com um pequeno passo."
    },

    {
        titulo: "Nunca desista!",
        texto: "Determinação e dedicação podem transformar sonhos em realidade."
    },

    {
        titulo: "A magia está dentro de você",
        texto: "Coragem para seguir em frente também é uma forma de magia."
    },

    {
        titulo: "Sonhe grande",
        texto: "Assim como Tiana, transforme seus objetivos em motivação."
    }

];

let indice = 0;


botaoMensagem.addEventListener("click", function () {

    indice++;

    if (indice >= mensagens.length) {
        indice = 0;
    }

    mensagemTitulo.textContent = mensagens[indice].titulo;

    mensagemTexto.textContent = mensagens[indice].texto;

});


// ========================================
// EFEITO NOS CARDS DOS PERSONAGENS
// ========================================

const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("click", function () {

        card.classList.toggle("selecionado");

    });

});