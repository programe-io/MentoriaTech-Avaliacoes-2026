let Produtos = [];

function ValidarProdutos(Descricao, Quantidade, Valor) {
    if (Descricao.length < 5) {
        console.log("Descrição deve ter no mínimo 5 caracteres");
        return false;
    }

    if (Quantidade < 1) {
        console.log("Quantidade deve ser maior que zero");
        return false;
    }

    if (Valor < 0) {
        console.log("Valor deve ser maior ou igual a zero");
        return false;
    }

    return true;
}

function CadastrarProduto(Descricao, Quantidade, Valor) {
    if (!ValidarProdutos(Descricao, Quantidade, Valor)) {
        return;
    }

    let novoProduto = {
        Codigo: Produtos.length + 1,
        Descrição: Descricao,
        Quantidade: Quantidade,
        Valor: Valor
    };

    Produtos.push(novoProduto);
}

function ListarProdutos() {
    console.log(Produtos);
}

function AtualizarValor(CodigoProdutos, novoValor) {
    if (novoValor < 0) {
        console.log("Valor deve ser maior ou igual a zero");
        return;
    }

    const produto = Produtos.find(
        prod => prod.Codigo === CodigoProdutos
    );

    if (produto) {
        produto.Valor = novoValor;
    } else {
        console.log("Produto não encontrado");
    }
}

function AtualizarQuantidade(CodigoProdutos, novaQuantidade) {
    if (novaQuantidade < 1) {
        console.log("Quantidade deve ser maior que 0");
        return;
    }

    const produto = Produtos.find(
        prod => prod.Codigo === CodigoProdutos
    );

    if (produto) {
        produto.Quantidade += novaQuantidade;
    } else {
        console.log("Produto não encontrado");
    }
}