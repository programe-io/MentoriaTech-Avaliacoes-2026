// Lista de produtos
let produto = {};

// cadastrar produto
function cadastrarproduto(descricao,quantidade,valor) {
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
        throw new Erro("dados invalidos!");
    }

    let produto = {
        codigo: produto.length + 1,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);
    console.log("produto cadastrado!");
}

// Lista produtos
function listarprodutos() {
    console.log(produtos);
}

// Atualizar valor
function atualizarValor(codigo, novoValor) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto || novoValor < 0) {
        thorw new Erro("produto ou valor invalido");
    }

    produto.valor = novoValor;
}

// Atualizar quantidade
function atualizarquantidade(codigo,quantidade) {
    let produtos.find(p => p.codigo === codigo);

    if (!produto || quantidade < 1) {
        thorw new Error("produto ou quantidade invalida!");
    }

    produto.quantidade += quantidade;
}

// Testando o sistema
try {
    cadastrarproduto("mouse logitech"), 10, 99);
    cadastrarproduto("Teclado Gamer" , 5, 150);

    atualizarValor(1, 89);
    atualizarQuantidade(1, 5);

    listarproduto();

} catch (erro) {
    console.log(erro.message);
}