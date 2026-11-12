
// Dar baixa no estoque (saída de produtos)
function darBaixaEstoque(codigoProduto, quantidade) {
    let produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero!");
    }

    if (produto.quantidade < quantidade) {
        throw new Error("Estoque insuficiente!");
    }

    produto.quantidade -= quantidade;

    console.log("Saída do produto realizada com sucesso!");
}

// Alterar valor do produto
function alterarValor(codigoProduto, novoValor) {
    let produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero!");
    }

    produto.valor = novoValor;

    console.log("Valor alterado com sucesso!");
}

// Cadastrar produtos
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);

// Mostrar estoque
listarProdutos();

// Dar baixa no estoque
darBaixaEstoque(1, 2);

console.log("Estoque atualizado:");
listarProdutos();

// Alterar valor
alterarValor(2, 97.00);

console.log("Estoque após alteração:");
listarProdutos();
