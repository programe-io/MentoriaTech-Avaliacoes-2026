
function alterarQuantidade(codigoProduto, novaQuantidade) {
    let produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    if (novaQuantidade < 0) {
        throw new Error("A quantidade deve ser maior ou igual a zero.");
    }

    produto.quantidade = novaQuantidade;

    console.log("Quantidade alterada com sucesso!");
}

// Exemplos de utilização

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);

console.log(listarProdutos());

alterarQuantidade(1, 20);

console.log(listarProdutos());
