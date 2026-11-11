
let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
function cadastrarProduto(nome, quantidade, valor) {
    if (quantidade < 0 || valor < 0) {
        throw new Error("Valores devem ser maiores ou iguais a zero");
    }

    const produto = {
        codigo: proximoCodigo++,
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    console.log("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    console.log("\n===== LISTA DE PRODUTOS =====");

    produtos.forEach(produto => {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Nome: ${produto.nome} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Excluir produto
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

// ==============================
// TESTANDO O SISTEMA
// ==============================

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse LED", 30, 59.90);

listarProdutos();

atualizarValor(1, 97.00);

listarProdutos();

atualizarQuantidade(1, 20);

listarProdutos();

excluirProduto(2);

listarProdutos();
