// Lista de produtos
let produtos = [];

// Verifica se os dados são válidos
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição precisa ter pelo menos 5 caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }
}

// Cadastra um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let produto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
}

// Mostra os produtos no console
function listarProdutos() {
    console.log(produtos);
}

// Altera o preço de um produto
function atualizarValor(codigo, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
}

// Adiciona unidades ao estoque
function atualizarQuantidade(codigo, quantidade) {
    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += quantidade;
}

// Testes
cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);

atualizarValor(2, 97);
atualizarQuantidade(1, 3);

listarProdutos();
