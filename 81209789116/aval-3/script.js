// Espera a página carregar
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os produtos
    const produtos = document.querySelectorAll(".produto");

    // Percorre cada produto
    produtos.forEach(function (produto) {

        const botao = produto.querySelector("button");

        botao.addEventListener("click", function () {

            // Nome e preço do produto
            const nome = produto.querySelector("h3").textContent;
            const preco = produto.querySelector("h4").textContent;

            // Atualiza o botão
            botao.textContent = "Produto Selecionado";
            botao.style.backgroundColor = "#ff9800";

            // Exibe mensagem
            alert(
                "Produto: " + nome +
                "\nPreço: " + preco +
                "\n\nObrigado por escolher a Infinity Shoes!"
            );

        });

    });

    // Exibe a data no console
    const data = new Date();
    console.log("Data de acesso: " + data.toLocaleDateString());

});