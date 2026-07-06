// Mensagem ao abrir a página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Site Urban Shoes carregado com sucesso!");
});

// Seleciona todos os botões
const botoes = document.querySelectorAll("button");

// Contador de produtos adicionados
let carrinho = 0;

// Adiciona evento de clique em cada botão
botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Soma um produto ao carrinho
        carrinho++;

        // Obtém o nome do produto
        let produto = this.parentElement.querySelector("h3").textContent;

        // Exibe mensagem
        alert(produto + " foi adicionado ao carrinho!");

        // Atualiza o botão
        this.textContent = "✔ Adicionado";
        this.disabled = true;

        // Mostra quantidade no console
        console.log("Produtos no carrinho: " + carrinho);

    });

});