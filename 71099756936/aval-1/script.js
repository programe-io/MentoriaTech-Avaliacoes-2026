
let produtos = [];

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor não pode ser negativo.");
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

    console.log("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    console.log("===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
    } else {
        console.log(produtos);
    }
}

// Buscar produto pelo código
function buscarProduto(codigoProduto) {
    return produtos.find(prod => prod.codigo === codigoProduto);
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }

    const produto = buscarProduto(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    const produto = buscarProduto(codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// TESTANDO O SISTEMA

cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);
cadastrarProduto("Teclado mecanico", 15, 150);

listarProdutos();

atualizarValor(2, 120);
atualizarQuantidade(1, 5);

console.log("===== ESTOQUE ATUALIZADO =====");
listarProdutos();