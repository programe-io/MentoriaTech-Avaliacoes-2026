
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
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
    console.log("Produtos cadastrados:");
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Testando o sistema

cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);

listarProdutos();

atualizarValor(2, 97);
atualizarQuantidade(1, 3);

listarProdutos();
