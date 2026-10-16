let produtos = [];

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser um número inteiro maior que zero.");
    }

    if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser um número maior ou igual a zero.");
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    console.log("===== LISTA DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(produtos);
}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (typeof novoValor !== "number" ||
        !Number.isFinite(novoValor) ||
        novoValor < 0) {
        throw new Error("Valor deve ser um número maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    console.log("Valor atualizado com sucesso!");
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser um número inteiro maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade = novaQuantidade;
    console.log("Quantidade atualizada com sucesso!");
}

// ===== TESTANDO O SISTEMA =====

try {
    cadastrarProduto("Cadeira Gamer", 12, 699.00);
    cadastrarProduto("Mouse Logitech", 38, 99.00);

    listarProdutos();

    atualizarValor(2, 97.00);
    atualizarQuantidade(1, 15);

    listarProdutos();

    cadastrarProduto("Cadeira Gamer Premium", 12, 899.00);

    listarProdutos();
} catch (erro) {
    console.error("Erro:", erro.message);
}