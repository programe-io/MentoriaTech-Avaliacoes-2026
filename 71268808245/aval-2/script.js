// Botão principal

const botaoMensagem = document.getElementById("botaoMensagem");

botaoMensagem.addEventListener("click", function () {

    alert("🥤 Bem-vindo ao site da Coca-Cola!");

});


// Botões dos produtos

const botoesProdutos = document.querySelectorAll(".botaoProduto");

botoesProdutos.forEach(function (botao) {

    botao.addEventListener("click", function () {

        alert("Você selecionou um produto!");

    });

});


// Botão de contato

const botaoContato = document.getElementById("botaoContato");

botaoContato.addEventListener("click", function () {

    alert("Obrigado pelo contato! Este é um projeto educacional.");

});


// Mensagem no console

console.log("Site Coca-Cola carregado com sucesso!");