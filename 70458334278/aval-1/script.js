
// Lista de produtos
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
}

// Função para listar produtos
function listarProdutos() {
    console.log("===== LISTA DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Descrição: ${produto.descricao} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}

// Função para atualizar o valor do produto
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
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para buscar produto pelo código
function buscarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("Produto encontrado:", produto);
        return produto;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para remover produto
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// EXECUÇÃO DO PROJETO

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Teclado Mecânico", 15, 249.90);
cadastrarProduto("Monitor Gamer", 8, 1299.00);

listarProdutos();

console.log("\n===== ATUALIZANDO VALOR =====");
atualizarValor(1, 750.00);

console.log("\n===== ATUALIZANDO QUANTIDADE =====");
atualizarQuantidade(2, 50);

console.log("\n===== BUSCANDO PRODUTO =====");
buscarProduto(3);

console.log("\n===== REMOVENDO PRODUTO =====");
removerProduto(4);

console.log("\n===== LISTA FINAL =====");
listarProdutos();
