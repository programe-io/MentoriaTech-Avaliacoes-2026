// Lista (Array) de Produtos
let produtos = [];
let proximoCodigo = 1;

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
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
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    proximoCodigo++;
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
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

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ----------------------------

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

listarProdutos();

atualizarValor(2, 92.00);

listarProdutos();

atualizarQuantidade(1, 3);

listarProdutos();