
// ======================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ======================================

// Lista de produtos
const produtos = [
    {
        codigo: 1,
        descricao: "Cadeira Gamer",
        quantidade: 12,
        valor: 699
    },
    {
        codigo: 2,
        descricao: "Mouse Logitech",
        quantidade: 38,
        valor: 99
    }
];

// ======================================
// 1. CADASTRAR PRODUTO
// ======================================

function cadastrarProduto(codigo, descricao, quantidade, valor) {

    if (produtos.some(prod => prod.codigo === codigo)) {
        throw new Error("Código de produto já cadastrado");
    }

    if (!descricao || descricao.trim() === "") {
        throw new Error("Descrição inválida");
    }

    if (quantidade < 0 || valor <= 0) {
        throw new Error("Quantidade ou valor inválido");
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// ======================================
// 2. LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    console.log("===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            "Código:", produto.codigo,
            "| Descrição:", produto.descricao,
            "| Quantidade:", produto.quantidade,
            "| Valor: R$", produto.valor
        );
    });
}

// ======================================
// 3. BUSCAR PRODUTO
// ======================================

function buscarProduto(codigoProduto) {

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("Produto encontrado:", produto);
        return produto;
    }

    console.log("Produto não encontrado");
    return null;
}

// ======================================
// 4. ATUALIZAR VALOR DO PRODUTO
// ======================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor <= 0) {
        throw new Error("Valor deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ======================================
// 5. ATUALIZAR QUANTIDADE
// ======================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Quantidade adicionada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ======================================
// 6. REGISTRAR SAÍDA DE PRODUTO
// ======================================

function registrarSaida(codigoProduto, quantidade) {

    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    if (produto.quantidade < quantidade) {
        throw new Error("Estoque insuficiente");
    }

    produto.quantidade -= quantidade;

    console.log("Saída registrada com sucesso!");
}

// ======================================
// 7. EXCLUIR PRODUTO
// ======================================

function excluirProduto(codigoProduto) {

    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto excluído com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ======================================
// 8. CALCULAR VALOR TOTAL DO ESTOQUE
// ======================================

function calcularValorEstoque() {

    const total = produtos.reduce(
        (soma, produto) => {
            return soma + (produto.quantidade * produto.valor);
        },
        0
    );

    console.log(
        "Valor total do estoque: R$",
        total.toFixed(2)
    );

    return total;
}

// ======================================
// 9. VERIFICAR PRODUTOS COM ESTOQUE BAIXO
// ======================================

function verificarEstoqueBaixo(limite = 5) {

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade <= limite
    );

    console.log("===== PRODUTOS COM ESTOQUE BAIXO =====");

    if (estoqueBaixo.length === 0) {
        console.log("Nenhum produto com estoque baixo");
        return;
    }

    estoqueBaixo.forEach(produto => {
        console.log(
            produto.descricao,
            "- Quantidade:",
            produto.quantidade
        );
    });
}

// ======================================
// 10. RELATÓRIO GERAL
// ======================================

function gerarRelatorio() {

    console.log("================================");
    console.log("       RELATÓRIO DE ESTOQUE");
    console.log("================================");

    listarProdutos();

    console.log("--------------------------------");

    const totalUnidades = produtos.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    console.log("Total de produtos cadastrados:", produtos.length);
    console.log("Total de unidades em estoque:", totalUnidades);

    calcularValorEstoque();

    console.log("================================");
}

// ======================================
// TESTES DO SISTEMA
// ======================================

// Cadastrar novo produto
cadastrarProduto(3, "Teclado Mecânico", 20, 250);

// Atualizar valor
atualizarValor(1, 750);

// Entrada de mercadoria
atualizarQuantidade(2, 10);

// Saída de mercadoria
registrarSaida(1, 2);

// Consultar produto
buscarProduto(1);

// Verificar estoque baixo
verificarEstoqueBaixo(5);

// Mostrar todos os produtos
listarProdutos();

// Gerar relatório final
gerarRelatorio();
