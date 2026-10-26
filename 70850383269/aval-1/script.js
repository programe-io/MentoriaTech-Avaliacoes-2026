
 // Lista (Array) de produtos
let Produtos = [];

function validarProdutos(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarproduto(descricao, quantidade, valor) {
    validarProdutos(descricao, quantidade, valor);

    let novoProduto = {
        codigo: Produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    Produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(Produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = Produtos.find(prod => prod.codigo === codigoProduto);

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

    const produto = Produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Testes
listarProdutos();

cadastrarproduto("Cadeira Gamer", 12, 699.00);
cadastrarproduto("Mouse Logi", 38, 99.00);

listarProdutos();

atualizarValor(2, 97.00);
listarProdutos();

atualizarQuantidade(1, 3);
listarProdutos();
