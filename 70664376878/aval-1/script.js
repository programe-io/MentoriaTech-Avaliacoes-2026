let produtos = [];

function validarProdutos(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no minimo 5 caracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior igual a zero");
    }
}

function cadastrarProdutos(descricao, quantidade, valor) {
    validarProdutos(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor,
    };
    produtos.push(novoProduto);
    return novoProduto;
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProdutos, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProdutos);
    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto nao encontrado");
    }
}

function atualizarQuantidade(codigoProdutos, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProdutos);
    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// Execução de testes:
listarProdutos();
cadastrarProdutos("Cadeira Gamer", 12, 699.00);
cadastrarProdutos("Mouse Logi", 38, 99.00);
listarProdutos();
atualizarValor(2, 97.00);
listarProdutos();
atualizarQuantidade(1, 3);
listarProdutos();