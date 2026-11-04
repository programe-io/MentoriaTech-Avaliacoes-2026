
// Lista de produtos
let produtos = [];

// Validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres"
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }

}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {

        codigo: produtos.length
            ? Math.max(...produtos.map(prod => prod.codigo)) + 1
            : 1,

        descricao: descricao,
        quantidade: quantidade,
        valor: valor

    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");

}

// Listar produtos
function listarProdutos() {

    console.log("===== LISTA DE PRODUTOS =====");

    console.table(produtos);

}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.valor = novoValor;

        console.log("Valor atualizado com sucesso!");

    } else {

        throw new Error("Produto não encontrado");

    }

}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.quantidade += novaQuantidade;

        console.log("Quantidade atualizada com sucesso!");

    } else {

        throw new Error("Produto não encontrado");

    }

}

// Excluir produto
function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    produtos = produtos.filter(
        (prod) => prod.codigo !== codigoProduto
    );

    console.log("Produto excluído com sucesso!");

}

// TESTANDO O SISTEMA

cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);
cadastrarProduto("Teclado mecanico", 15, 250);

// Listar produtos
listarProdutos();

// Atualizar valor do produto código 2
atualizarValor(2, 97);

// Adicionar 3 unidades ao produto código 1
atualizarQuantidade(1, 3);

// Listar novamente
listarProdutos();

// Excluir produto código 3
excluirProduto(3);

// Listar após exclusão
listarProdutos();
