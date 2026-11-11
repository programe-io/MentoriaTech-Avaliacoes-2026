
// =====================================
// SISTEMA DE CONTROLE DE ESTOQUE
// =====================================

let produtos = [];

// =====================================
// 1. CADASTRAR PRODUTO
// =====================================

function cadastrarProduto(nome, quantidade, valor) {

    if (quantidade < 0 || valor < 0) {
        throw new Error("Valores não podem ser negativos");
    }

    const produto = {
        codigo: produtos.length + 1,
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// =====================================
// 2. LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== LISTA DE PRODUTOS =====");

    produtos.forEach(produto => {
        console.log(
            "Código:", produto.codigo,
            "| Nome:", produto.nome,
            "| Quantidade:", produto.quantidade,
            "| Valor: R$", produto.valor
        );
    });
}

// =====================================
// 3. ATUALIZAR VALOR
// =====================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    }
    else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// 4. ATUALIZAR QUANTIDADE
// =====================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 0) {
        throw new Error("Quantidade não pode ser negativa");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    }
    else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// 5. BUSCAR PRODUTO
// =====================================

function buscarProduto(codigoProduto) {

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("===== PRODUTO ENCONTRADO =====");
        console.log("Código:", produto.codigo);
        console.log("Nome:", produto.nome);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor);

        return produto;
    }
    else {
        console.log("Produto não encontrado.");
        return null;
    }
}

// =====================================
// 6. REMOVER PRODUTO
// =====================================

function removerProduto(codigoProduto) {

    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    }
    else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// 7. REGISTRAR ENTRADA
// =====================================

function registrarEntrada(codigoProduto, quantidade) {

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += quantidade;
        console.log("Entrada registrada com sucesso!");
    }
    else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// 8. REGISTRAR SAÍDA
// =====================================

function registrarSaida(codigoProduto, quantidade) {

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        if (produto.quantidade < quantidade) {
            throw new Error("Estoque insuficiente!");
        }

        produto.quantidade -= quantidade;

        console.log("Saída registrada com sucesso!");
    }
    else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// 9. VALOR TOTAL DO ESTOQUE
// =====================================

function calcularValorEstoque() {

    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade * produto.valor;
    });

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;
}

// =====================================
// TESTANDO O SISTEMA
// =====================================

// Cadastrar produtos
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Teclado Mecânico", 20, 150.00);
cadastrarProduto("Mouse Gamer", 15, 89.90);
cadastrarProduto("Monitor", 8, 899.00);

// Listar produtos
listarProdutos();

// Atualizar valor
atualizarValor(1, 750.00);

// Atualizar quantidade
atualizarQuantidade(2, 25);

// Buscar produto
buscarProduto(1);

// Registrar entrada
registrarEntrada(3, 10);

// Registrar saída
registrarSaida(4, 2);

// Remover produto
// removerProduto(2);

// Calcular valor total
calcularValorEstoque();

// Listar novamente
listarProdutos();
