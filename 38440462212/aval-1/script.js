
let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no mínimo cinco caracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValorProduto(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidadeProduto(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Quantidade deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    }
}

//------------------------------------------------------------------

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse", 38, 99.00);

listarProdutos();

atualizarValorProduto(2, 97.00);
listarProdutos();

atualizarQuantidadeProduto(1, 3);
listarProdutos();
