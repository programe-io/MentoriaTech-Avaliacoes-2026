let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (typeof valor !== "number" || valor < 0) {
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

    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (typeof novoValor !== "number" || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// TESTANDO O PROGRAMA

cadastrarProduto("Notebook", 5, 2500);
cadastrarProduto("Teclado Gamer", 10, 150);

listarProdutos();

atualizarValor(1, 2300);
atualizarQuantidade(2, 15);

listarProdutos();