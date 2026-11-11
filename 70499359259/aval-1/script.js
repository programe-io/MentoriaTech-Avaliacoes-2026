
// =====================================
// SISTEMA DE CONTROLE DE ESTOQUE
// =====================================

// Banco de dados em memória
let produtos = [];
let proximoCodigo = 1;

// =====================================
// CADASTRAR PRODUTO
// =====================================

function cadastrarProduto(descricao, quantidade, valor) {

    if (!descricao || descricao.trim() === "") {
        throw new Error("Informe a descrição do produto.");
    }

    if (quantidade < 0) {
        throw new Error("Quantidade inválida.");
    }

    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero.");
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// =====================================
// LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    console.log("\n===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => {

        console.log({
            codigo: produto.codigo,
            descricao: produto.descricao,
            quantidade: produto.quantidade,
            valor: produto.valor
        });

    });

    console.log("===============================");
}

// =====================================
// BUSCAR PRODUTO
// =====================================

function buscarProduto(codigoProduto) {

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

// =====================================
// ATUALIZAR VALOR DO PRODUTO
// =====================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor <= 0) {
        throw new Error("O valor deve ser maior que zero.");
    }

    const produto = buscarProduto(codigoProduto);

    produto.valor = novoValor;

    console.log("Valor atualizado com sucesso!");
}

// =====================================
// ATUALIZAR QUANTIDADE / ENTRADA
// =====================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = buscarProduto(codigoProduto);

    produto.quantidade += novaQuantidade;

    console.log("Entrada registrada com sucesso!");
}

// =====================================
// SAÍDA DE PRODUTOS
// =====================================

function registrarSaida(codigoProduto, quantidadeSaida) {

    if (quantidadeSaida < 1) {
        throw new Error("Informe uma quantidade válida.");
    }

    const produto = buscarProduto(codigoProduto);

    if (produto.quantidade < quantidadeSaida) {
        throw new Error("Estoque insuficiente!");
    }

    produto.quantidade -= quantidadeSaida;

    console.log("Saída registrada com sucesso!");
}

// =====================================
// EXCLUIR PRODUTO
// =====================================

function excluirProduto(codigoProduto) {

    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    produtos.splice(indice, 1);

    console.log("Produto excluído com sucesso!");
}

// =====================================
// RELATÓRIO DE ESTOQUE
// =====================================

function relatorioEstoque() {

    let totalProdutos = 0;
    let valorEstoque = 0;

    produtos.forEach(produto => {

        totalProdutos += produto.quantidade;

        valorEstoque +=
            produto.quantidade * produto.valor;

    });

    console.log("\n===== RELATÓRIO DE ESTOQUE =====");

    console.log("Tipos de produtos:", produtos.length);

    console.log("Quantidade total:", totalProdutos);

    console.log(
        "Valor total do estoque: R$ " +
        valorEstoque.toFixed(2)
    );

    console.log("================================");
}

// =====================================
// PRODUTOS COM ESTOQUE BAIXO
// =====================================

function produtosEstoqueBaixo(limite = 5) {

    console.log("\n===== ESTOQUE BAIXO =====");

    const baixo = produtos.filter(
        produto => produto.quantidade <= limite
    );

    if (baixo.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
        return;
    }

    baixo.forEach(produto => {
        console.log(
            produto.descricao +
            " - Quantidade: " +
            produto.quantidade
        );
    });
}

// =====================================
// EXECUÇÃO DO SISTEMA
// =====================================

// Cadastro inicial
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Teclado Mecânico", 15, 189.90);
cadastrarProduto("Monitor LED", 4, 899.00);

// Listagem
listarProdutos();

// Atualização de preço
atualizarValor(2, 97.00);

// Entrada de mercadoria
atualizarQuantidade(1, 5);

// Saída de mercadoria
registrarSaida(2, 3);

// Buscar produto
console.log("\nProduto consultado:");
console.log(buscarProduto(1));

// Exibir estoque atualizado
listarProdutos();

// Relatório geral
relatorioEstoque();

// Verificar estoque baixo
produtosEstoqueBaixo(5);
