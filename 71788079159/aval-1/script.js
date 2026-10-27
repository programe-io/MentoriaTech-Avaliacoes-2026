
let produtos = [];
let codigo = 1;

function cadastrarProduto(descricao, quantidade, valor) {
    let produto = {
        codigo: codigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    console.log("Produto cadastrado!");
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigo, valor) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = valor;
        console.log("Valor atualizado!");
    } else {
        console.log("Produto não encontrado!");
    }
}

function atualizarQuantidade(codigo, quantidade) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade += quantidade;
        console.log("Quantidade atualizada!");
    } else {
        console.log("Produto não encontrado!");
    }
}

// Exemplos
cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);
listarProdutos();
atualizarValor(1, 650);
atualizarQuantidade(2, 5);
listarProdutos();
