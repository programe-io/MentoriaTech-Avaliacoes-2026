
"use strict";

// BANCO DE DADOS EM MEMÓRIA
let produtos = [];
let movimentacoes = [];

// CADASTRAR PRODUTO
function cadastrarProduto(codigo, nome, compra, venda, quantidade, minimo) {

    if (!codigo || !nome) {
        return "Preencha o código e o nome do produto.";
    }

    if (produtos.some(p => p.codigo === codigo)) {
        return "Produto já cadastrado!";
    }

    if (
        !Number.isFinite(compra) ||
        !Number.isFinite(venda) ||
        !Number.isInteger(quantidade) ||
        !Number.isInteger(minimo) ||
        compra < 0 || venda < 0 ||
        quantidade < 0 || minimo < 0
    ) {
        return "Dados inválidos!";
    }

    const produto = {
        codigo,
        nome,
        compra,
        venda,
        quantidade,
        minimo
    };

    produtos.push(produto);

    registrarMovimentacao(codigo, "Cadastro", quantidade);

    return "Produto cadastrado com sucesso!";
}

// REGISTRAR MOVIMENTAÇÃO
function registrarMovimentacao(codigo, tipo, quantidade) {

    movimentacoes.push({
        codigo,
        tipo,
        quantidade,
        data: new Date().toLocaleString("pt-BR")
    });

}

// ENTRADA DE PRODUTOS
function entradaEstoque(codigo, quantidade) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        return "Produto não encontrado!";
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return "Quantidade inválida!";
    }

    produto.quantidade += quantidade;

    registrarMovimentacao(codigo, "Entrada", quantidade);

    return "Entrada registrada com sucesso!";
}

// SAÍDA DE PRODUTOS
function saidaEstoque(codigo, quantidade) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        return "Produto não encontrado!";
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return "Quantidade inválida!";
    }

    if (quantidade > produto.quantidade) {
        return "Estoque insuficiente!";
    }

    produto.quantidade -= quantidade;

    registrarMovimentacao(codigo, "Saída", quantidade);

    return "Saída registrada com sucesso!";
}

// PESQUISAR PRODUTO
function pesquisarProduto(termo) {

    termo = termo.toLowerCase();

    return produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.codigo.toLowerCase().includes(termo)
    );

}

// CONSULTAR ESTOQUE
function consultarEstoque() {

    return produtos.map(p => ({
        ...p,
        status: p.quantidade <= p.minimo
            ? "Estoque baixo"
            : "Normal"
    }));

}

// CALCULAR VALOR TOTAL DO ESTOQUE
function calcularValorEstoque() {

    return produtos.reduce(
        (total, p) => total + (p.compra * p.quantidade),
        0
    );

}

// TOTAL DE PRODUTOS
function totalProdutos() {
    return produtos.length;
}

// TOTAL DE UNIDADES
function totalUnidades() {

    return produtos.reduce(
        (total, p) => total + p.quantidade,
        0
    );

}

// PRODUTOS COM ESTOQUE BAIXO
function estoqueBaixo() {

    return produtos.filter(
        p => p.quantidade <= p.minimo
    );

}

// HISTÓRICO DE MOVIMENTAÇÕES
function historicoEstoque() {
    return [...movimentacoes];
}

// EXCLUIR PRODUTO
function excluirProduto(codigo) {

    const indice = produtos.findIndex(
        p => p.codigo === codigo
    );

    if (indice === -1) {
        return "Produto não encontrado!";
    }

    produtos.splice(indice, 1);

    return "Produto excluído com sucesso!";
}

// RELATÓRIO GERAL
function relatorioEstoque() {

    return {
        totalProdutos: totalProdutos(),
        totalUnidades: totalUnidades(),
        valorTotal: calcularValorEstoque(),
        produtosBaixos: estoqueBaixo().length,
        produtos: consultarEstoque()
    };

}

// EXEMPLO DE UTILIZAÇÃO
console.log(cadastrarProduto(
    "001",
    "Teclado",
    50,
    90,
    20,
    5
));

console.log(entradaEstoque("001", 10));
console.log(saidaEstoque("001", 3));

console.log("Produtos:", consultarEstoque());
console.log("Pesquisa:", pesquisarProduto("Teclado"));
console.log("Relatório:", relatorioEstoque());
console.log("Histórico:", historicoEstoque());
