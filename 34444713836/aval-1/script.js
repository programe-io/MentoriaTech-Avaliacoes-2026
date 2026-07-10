// Array de produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        console.log("Descrição deve ter no mínimo 5 caracteres.");
        return;
    }

    if (quantidade <= 0) {
        console.log("Quantidade inválida.");
        return;
    }

    if (valor < 0) {
        console.log("Valor inválido.");
        return;
    }

    const produto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// Buscar produto
function buscarProduto(codigo) {
    return produtos.find(produto => produto.codigo === codigo);
}

// Atualizar valor
function atualizarValor(codigo, novoValor) {

    const produto = buscarProduto(codigo);

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado.");
    } else {
        console.log("Produto não encontrado.");
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigo, quantidade) {

    const produto = buscarProduto(codigo);

    if (produto) {
        produto.quantidade += quantidade;
        console.log("Quantidade atualizada.");
    } else {
        console.log("Produto não encontrado.");
    }
}

// Listar produtos
function listarProdutos() {
    console.table(produtos);
}

// Exemplo de uso
cadastrarProduto("Notebook Dell", 5, 3500);
cadastrarProduto("Mouse Gamer", 20, 120);

listarProdutos();

atualizarValor(1, 3700);
atualizarQuantidade(2, 10);

listarProdutos();