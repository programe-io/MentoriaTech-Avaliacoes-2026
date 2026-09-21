// ====================================
// CARRINHO
// ====================================

let quantidade = 0;

const botoes = document.querySelectorAll(".adicionar");

const contador = document.getElementById("contador");

const carrinho = document.getElementById("carrinho");


botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        quantidade++;

        contador.textContent = quantidade;

        const nomePerfume = botao.dataset.nome;

        alert(
            nomePerfume +
            " foi adicionado ao carrinho!"
        );

    });

});


// ====================================
// BOTÃO DO CARRINHO
// ====================================

carrinho.addEventListener("click", function() {

    if (quantidade === 0) {

        alert(
            "Seu carrinho está vazio."
        );

    } else {

        alert(
            "Você possui " +
            quantidade +
            " perfume(s) no carrinho."
        );

    }

});


// ====================================
// FORMULÁRIO
// ====================================

const formulario =
    document.getElementById("formulario");

const resultado =
    document.getElementById("resultado");


formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nome =
            document.getElementById("nome").value;

        resultado.textContent =
            "Obrigada, " +
            nome +
            "! Sua mensagem foi enviada com sucesso.";

        formulario.reset();

    }
);