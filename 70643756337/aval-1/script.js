// CONTADOR DO CARRINHO

let quantidade = 0;

const botoesAdicionar = document.querySelectorAll(".adicionar");
const contador = document.getElementById("contador");

botoesAdicionar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        quantidade++;

        contador.textContent = quantidade;

        alert(
            botao.dataset.nome +
            " foi adicionado ao carrinho!"
        );
    });

});


// FORMULÁRIO DE CONTATO

const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        "Obrigada, " + nome + "! Sua mensagem foi enviada.";

    formulario.reset();

});


// BOTÃO DO CARRINHO

const carrinho = document.getElementById("carrinho");

carrinho.addEventListener("click", function() {

    if (quantidade === 0) {
        alert("Seu carrinho está vazio.");
    } else {
        alert(
            "Você possui " +
            quantidade +
            " produto(s) no carrinho."
        );
    }

});