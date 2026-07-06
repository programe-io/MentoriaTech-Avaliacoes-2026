// Seleciona todos os botões de compra
const botoes = document.querySelectorAll("button");

// Percorre cada botão
botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Encontra o nome do produto
        const produto = this.parentElement.querySelector("h3").textContent;

        // Exibe uma mensagem
        alert(produto + " foi adicionado ao carrinho!");

    });

});

// Mensagem ao carregar a página
window.onload = function() {
    console.log("Bem-vindo à Loja Passo Certo!");
};