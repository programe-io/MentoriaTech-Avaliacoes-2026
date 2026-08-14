// Lista (array) de produtos
let produtos = [];

// Validação do produto
function validarProduto(descricao, quantidade, valor) {

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

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

// Listar produtos
function listarProdutos() {
    console.log(produtos);
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// ----------------------------------
// TESTANDO O PROGRAMA
// ----------------------------------

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);

cadastrarProduto("Mouse Logi", 38, 99.00);

listarProdutos();

atualizarValor(2, 97.00);

listarProdutos();

atualizarQuantidade(1, 3);

listarProdutos();