
// =====================================
// PROJETO CRUD E CONTROLE DE ESTOQUE
// =====================================

// Lista de produtos
let produtos = [];

// 1. FUNÇÃO PARA VALIDAR PRODUTO
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }

    if (quantidade < 1 || !Number.isInteger(quantidade)) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0 || !Number.isFinite(valor)) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// 2. FUNÇÃO PARA CADASTRAR PRODUTO
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

// 3. FUNÇÃO PARA LISTAR PRODUTOS
function listarProdutos() {

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== LISTA DE PRODUTOS =====");

    console.table(produtos);
}

// 4. FUNÇÃO PARA BUSCAR PRODUTO
function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (prod) => prod.codigo === codigoProduto
    );
}

// 5. FUNÇÃO PARA ATUALIZAR VALOR
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0 || !Number.isFinite(novoValor)) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.valor = novoValor;

        console.log("Valor atualizado com sucesso!");

    } else {

        throw new Error("Produto não encontrado.");
    }
}

// 6. FUNÇÃO PARA ATUALIZAR QUANTIDADE
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.quantidade = produto.quantidade + novaQuantidade;

        console.log("Estoque atualizado com sucesso!");

    } else {

        throw new Error("Produto não encontrado.");
    }
}

// =====================================
// 7. TESTANDO O SISTEMA
// =====================================

// Cadastrando produtos
cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);
cadastrarProduto("Teclado mecanico", 15, 150);
cadastrarProduto("Monitor Samsung", 8, 850);

// Listando produtos
listarProdutos();

// Atualizando o valor do produto de código 2
atualizarValor(2, 97);

// Adicionando 3 unidades ao produto de código 1
atualizarQuantidade(1, 3);

// Listando novamente para conferir as alterações
listarProdutos();
