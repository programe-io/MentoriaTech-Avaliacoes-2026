
// =====================================
// SISTEMA DE GERENCIAMENTO DE ESTOQUE
// =====================================

let produtos = [];
let proximoCodigo = 1;

// =====================================
// 1. CADASTRAR PRODUTO
// =====================================

function cadastrarProduto(nome, quantidade, preco) {
    if (!nome || quantidade < 0 || preco <= 0) {
        throw new Error("Dados inválidos para cadastro.");
    }

    const produto = {
        codigo: proximoCodigo++,
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// =====================================
// 2. LISTAR PRODUTOS
// =====================================

function listarProdutos() {
    console.log("\n====== ESTOQUE ATUAL ======");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(produtos);
}

// =====================================
// 3. ATUALIZAR VALOR DO PRODUTO
// =====================================

function atualizarValor(codigoProduto, novoPreco) {
    if (novoPreco <= 0) {
        throw new Error("O preço deve ser maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.preco = novoPreco;
        console.log("Preço atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// =====================================
// 4. ATUALIZAR QUANTIDADE (ENTRADA)
// =====================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Estoque atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// =====================================
// 5. REGISTRAR SAÍDA DE PRODUTOS
// =====================================

function registrarSaida(codigoProduto, quantidade) {
    if (quantidade < 1) {
        throw new Error("Quantidade inválida.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (produto.quantidade < quantidade) {
        throw new Error("Estoque insuficiente!");
    }

    produto.quantidade -= quantidade;

    console.log("Saída registrada com sucesso!");
}

// =====================================
// 6. CONSULTAR PRODUTO
// =====================================

function consultarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("Produto encontrado:");
        console.table(produto);
    } else {
        console.log("Produto não encontrado.");
    }
}

// =====================================
// 7. EXCLUIR PRODUTO
// =====================================

function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto excluído com sucesso!");
    } else {
        console.log("Produto não encontrado.");
    }
}

// =====================================
// 8. VERIFICAR ESTOQUE BAIXO
// =====================================

function verificarEstoqueBaixo() {
    console.log("\n====== ESTOQUE BAIXO ======");

    const estoqueBaixo = produtos.filter(
        prod => prod.quantidade <= 5
    );

    if (estoqueBaixo.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
    } else {
        console.table(estoqueBaixo);
    }
}

// =====================================
// 9. CALCULAR VALOR TOTAL DO ESTOQUE
// =====================================

function calcularValorEstoque() {
    const total = produtos.reduce(
        (soma, produto) =>
            soma + produto.quantidade * produto.preco,
        0
    );

    console.log(
        "Valor total do estoque: R$ " + total.toFixed(2)
    );

    return total;
}

// =====================================
// 10. EXECUTAR O SISTEMA
// =====================================

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Teclado Mecânico", 20, 150.00);
cadastrarProduto("Monitor LED", 8, 850.00);
cadastrarProduto("Headset Gamer", 4, 120.00);

listarProdutos();

atualizarValor(2, 97.00);

atualizarQuantidade(1, 3);

registrarSaida(3, 5);

consultarProduto(1);

verificarEstoqueBaixo();

calcularValorEstoque();

excluirProduto(5);

listarProdutos();
