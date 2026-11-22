let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter no mínimo 5 caracteres.");
    }
    if (quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("O valor não pode ser negativo.");
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

function alterarValor(codigo, novoValor) {
    if (novoValor < 0) {
        throw new Error("O novo valor não pode ser negativo.");
    }

    const produto = produtos.find(prod => prod.codigo === codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    console.log(`Valor do produto ${produto.descricao} atualizado para R$ ${novoValor}`);
}

function alterarQuantidade(codigo, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("A nova quantidade não pode ser negativa.");
    }

    const produto = produtos.find(prod => prod.codigo === codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade = produto.quantidade + novaQuantidade;
    console.log(`Quantidade do produto ${produto.descricao} atualizada para ${produto.quantidade}`);
}


cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);

console.log("--- LISTA INICIAL ---");
listarProdutos();

alterarValor(2, 97.00);
alterarQuantidade(1, 3);

console.log("--- LISTA FINAL ATUALIZADA ---");
listarProdutos();