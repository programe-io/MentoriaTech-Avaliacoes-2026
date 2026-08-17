let produtos = [];

function validarproduto(descricao, quantidade, valor) {
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

function cadastrarproduto(descricao, quantidade, valor) {
    validarproduto(descricao, quantidade, valor);

    let novoproduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoproduto);
}

function listarprodutos() {
    console.log(produtos);
}

function atualizarvalor(codigoproduto, novovalor) {
    if (novovalor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoproduto
    );

    if (produto) {
        produto.valor = novovalor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarquantidade(codigoproduto, novaquantidade) {
    if (novaquantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoproduto
    );

    if (produto) {
        produto.quantidade = novaquantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

listarprodutos();

cadastrarproduto("Chapéu de couro", 48, 77.00);
cadastrarproduto("Sela de couro", 17, 980.00);

listarprodutos();

atualizarvalor(2,899.99);

listarprodutos();
