let produtos = [];

function validarProdutos(decisao, quantidade, valor) {

    if (decisao.length < 5) {
        console.log("Descrição deve ter no mínimo 5 caracteres");
    }

    if (quantidade < 1) {
        console.log("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        console.log("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {

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
        console.log("Valor deve ser maior ou igual a zero");
        return;
    }

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        console.log("Produto não encontrado");
    }
}
