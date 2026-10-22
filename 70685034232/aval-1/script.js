// Lista (Array) de produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor <= 0) {
        throw new Error("Valor deve ser maior que zero");
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
    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor <= 0) {
        throw new Error("Valor deve ser maior que zero");
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

// Testando o programa
cadastrarProduto("Cadeira gamer", 12, 669.00);
cadastrarProduto("Mesa gamer", 5, 899.00);

listarProdutos();

atualizarValor(1, 699.00);
listarProdutos();

atualizarQuantidade(2, 10);
listarProdutos();