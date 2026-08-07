// script.js

// Seleciona o botão e todas as respostas
const botao = document.getElementById("mostrarRespostas");
const respostas = document.querySelectorAll(".resposta-correta");

// Quando o botão for clicado
botao.addEventListener("click", function () {

    respostas.forEach(function (resposta) {
        resposta.style.display = "block";
    });

    botao.textContent = "Respostas Exibidas";
    botao.disabled = true;
});