// Lista de produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
        throw new Error("Dados inválidos!");
    }

    let produto = {
        codigo: produtos.length + 1,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);
    console.log("Produto cadastrado!");
}

// Listar produtos
function listarProdutos() {
    console.log(produtos);
}

// Atalizar valor
function atualizarValor(codigo, novoValor) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto || novoValor < 0) {
        throw new Error("Produto ou valor inválido!");
    }

    produto.valor = novoValor;
}

// Atalizar quntidade
function atualizarQuantidade(codigo, quantidade) {
    let produto = produtos.find(p => p.codigo === codigo);

    if(!produto || quantidade < 1) {
        throw new Error("Produto ou quantidade inválida!");
    }

    produto.quantidade += quantidade;
}