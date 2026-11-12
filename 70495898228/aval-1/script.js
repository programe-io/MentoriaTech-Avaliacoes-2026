
// Lista de produtos do estoque
let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
function cadastrarProduto(nome, quantidade, valor) {
    if (quantidade < 0 || valor < 0) {
        throw new Error("Quantidade e valor devem ser positivos.");
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
    console.log("\n===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio!");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Nome: ${produto.nome} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Quantidade deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Remover produto
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Consultar produto
function consultarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("Produto encontrado:", produto);
    } else {
        console.log("Produto não encontrado!");
    }
}

// Exemplos de utilização

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);

listarProdutos();

atualizarValor(2, 97.00);
atualizarQuantidade(1, 15);

consultarProduto(1);

listarProdutos();

// removerProduto(2);
// listarProdutos();
