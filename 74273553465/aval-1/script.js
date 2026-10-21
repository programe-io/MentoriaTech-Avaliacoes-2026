// Array para armazenar os produtos
const produtos = [];
let proximoId = 1; // Contador incremental para garantir IDs únicos

function validarProduto(descricao, quantidade, valor) {
    if (!descricao || descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo 5 caracteres.");
    }
    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function buscarProdutoPorCodigo(codigoProduto) {
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (!produto) {
        throw new Error(`Produto com o código ${codigoProduto} não foi encontrado.`);
    }
    return produto;
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoId++, // Incrementa o ID único para cada novo produto
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);
    return novoProduto;
}

function listarProdutos() {
    console.log("=== Lista de Produtos ===");
    console.table(produtos); // Exibe em formato de tabela no console
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
    const produto = buscarProdutoPorCodigo(codigoProduto);
    produto.valor = novoValor;
}

// Define a quantidade exata do estoque
function definirQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    const produto = buscarProdutoPorCodigo(codigoProduto);
    produto.quantidade = novaQuantidade;
}

// --------------------------
// Testes
listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
listarProdutos();

atualizarValor(2, 97.00);
definirQuantidade(1, 15);
listarProdutos();