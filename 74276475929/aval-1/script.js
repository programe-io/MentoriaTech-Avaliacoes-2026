
/* Lista (Array) de Produtos */

let produtos = [];

// Validar produto
function validarProduto(descricao, quantidade, valor) {

    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
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

    console.log("Lista de Produtos:");
    console.table(produtos);

}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        produto.valor = novoValor;

        console.log("Valor atualizado com sucesso!");

    } else {

        throw new Error("Produto não encontrado.");

    }

}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        produto.quantidade += novaQuantidade;

        console.log("Quantidade atualizada com sucesso!");

    } else {

        throw new Error("Produto não encontrado.");

    }

}

// --------------------------
// TESTANDO AS FUNÇÕES
// --------------------------

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);

cadastrarProduto("Mouse Logi", 38, 99.00);

listarProdutos();

atualizarValor(2, 97.00);

listarProdutos();

atualizarQuantidade(1, 3);

listarProdutos();
