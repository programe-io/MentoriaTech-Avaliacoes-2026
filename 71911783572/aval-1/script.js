
// ==========================================
// SISTEMA DE GERENCIAMENTO DE ESTOQUE
// ==========================================

// Lista de produtos
let produtos = [];

// ==========================================
// 1. VALIDAR PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 0) {
        throw new Error("Quantidade não pode ser negativa");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// ==========================================
// 2. CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
    return novoProduto;
}

// ==========================================
// 3. LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    console.log("===== LISTA DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio!");
        return;
    }

    console.table(produtos);
}

// ==========================================
// 4. BUSCAR PRODUTO
// ==========================================

function buscarProduto(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return null;
    }

    console.log("Produto encontrado:");
    console.table([produto]);

    return produto;
}

// ==========================================
// 5. ATUALIZAR PRODUTO
// ==========================================

function atualizarProduto(codigo, novaDescricao, novaQuantidade, novoValor) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    validarProduto(novaDescricao, novaQuantidade, novoValor);

    produto.descricao = novaDescricao;
    produto.quantidade = novaQuantidade;
    produto.valor = novoValor;

    console.log("Produto atualizado com sucesso!");
}

// ==========================================
// 6. EXCLUIR PRODUTO
// ==========================================

function excluirProduto(codigo) {

    let indice = produtos.findIndex(p => p.codigo === codigo);

    if (indice === -1) {
        console.log("Produto não encontrado!");
        return;
    }

    produtos.splice(indice, 1);

    console.log("Produto excluído com sucesso!");
}

// ==========================================
// 7. ENTRADA DE ESTOQUE
// ==========================================

function registrarEntrada(codigo, quantidade) {

    let produto = buscarPorCodigo(codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    if (quantidade <= 0) {
        console.log("Informe uma quantidade válida!");
        return;
    }

    produto.quantidade += quantidade;

    console.log("Entrada registrada com sucesso!");
}

// ==========================================
// 8. SAÍDA DE ESTOQUE
// ==========================================

function registrarSaida(codigo, quantidade) {

    let produto = buscarPorCodigo(codigo);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    if (quantidade <= 0) {
        console.log("Informe uma quantidade válida!");
        return;
    }

    if (produto.quantidade < quantidade) {
        console.log("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;

    console.log("Saída registrada com sucesso!");
}

// Função auxiliar de busca
function buscarPorCodigo(codigo) {
    return produtos.find(p => p.codigo === codigo);
}

// ==========================================
// 9. CALCULAR VALOR TOTAL DO ESTOQUE
// ==========================================

function calcularValorEstoque() {

    let total = produtos.reduce((soma, produto) => {
        return soma + (produto.quantidade * produto.valor);
    }, 0);

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;
}

// ==========================================
// 10. PRODUTOS COM ESTOQUE BAIXO
// ==========================================

function verificarEstoqueBaixo() {

    console.log("===== ESTOQUE BAIXO =====");

    let baixos = produtos.filter(p => p.quantidade <= 5);

    if (baixos.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
        return;
    }

    console.table(baixos);
}

// ==========================================
// 11. RELATÓRIO GERAL
// ==========================================

function gerarRelatorio() {

    console.log("===== RELATÓRIO DO ESTOQUE =====");

    let totalProdutos = produtos.length;

    let totalUnidades = produtos.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    let valorTotal = produtos.reduce(
        (soma, p) => soma + (p.quantidade * p.valor), 0
    );

    console.log("Produtos cadastrados:", totalProdutos);
    console.log("Unidades em estoque:", totalUnidades);
    console.log("Valor total: R$", valorTotal.toFixed(2));

    verificarEstoqueBaixo();
}

// ==========================================
// 12. TESTANDO O SISTEMA
// ==========================================

cadastrarProduto("Cadeira Gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);
cadastrarProduto("Teclado Mecânico", 15, 250);

listarProdutos();

registrarEntrada(1, 5);
registrarSaida(2, 3);

buscarProduto(1);

atualizarProduto(2, "Mouse Logitech RGB", 40, 97);

gerarRelatorio();
