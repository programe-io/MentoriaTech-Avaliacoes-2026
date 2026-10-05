// BOTÃO DA PÁGINA INICIAL

const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {

    mensagem.textContent =
        "Obrigado por visitar nosso site!";

});


// FORMULÁRIO

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    alert(
        "Obrigado, " + nome +
        "! Sua mensagem foi enviada."
    );

    formulario.reset();

});