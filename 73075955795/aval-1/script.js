// Lista (Array) de produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    // Descrição deve ter no mínimo 5 caracteres
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    // Quantidade deve ser maior que zero
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    // Valor deve ser maior ou igual a zero
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// Testes
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);

listarProdutos();

atualizarValor(1, 750.00);
listarProdutos();

atualizarQuantidade(1, 3);
listarProdutos();