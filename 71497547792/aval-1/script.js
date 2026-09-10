
let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        console.log("Descrição deve ter no mínimo 5 caracteres");
    }

    if (quantidade < 1) {
        console.log("Quantidade deve ser maior que zero!");
    }

    if (valor < 0) {
        console.log("Valor deve ser maior que zero!");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {

    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    }

    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigo, produto, novoValor) {

    if (novoValor < 0) {
        console.log("Valor deve ser maior que zero");
    }

    const produtoEncontrado = produtos.find(prod => prod.codigo == codigo);

    if (produtoEncontrado) {
        produtoEncontrado.valor = novoValor;
    } else {
        console.log("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        console.log("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo == codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        console.log("Produto não encontrado");
    }
}
