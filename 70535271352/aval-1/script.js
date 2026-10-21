
let produtos = [];
let proximoCodigo = 1;

// Cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 2) {
        console.log("Erro: a descrição deve ter pelo menos 2 caracteres.");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        console.log("Erro: a quantidade deve ser um número inteiro não negativo.");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        console.log("Erro: o valor deve ser um número não negativo.");
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// Listar os produtos cadastrados
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("=== ESTOQUE DE PRODUTOS ===");

    produtos.forEach(function(produto) {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Descrição: ${produto.descricao} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}

// Alterar o valor de um produto
function alterarValor(codigo, novoValor) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        console.log("Erro: produto não encontrado.");
        return;
    }

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        console.log("Erro: informe um valor válido.");
        return;
    }

    produto.valor = novoValor;

    console.log("Valor do produto alterado com sucesso!");
}

// Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        console.log("Erro: produto não encontrado.");
        return;
    }

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        console.log("Erro: informe uma quantidade inteira não negativa.");
        return;
    }

    produto.quantidade = novaQuantidade;

    console.log("Quantidade alterada com sucesso!");
}

// Exemplos de utilização
cadastrarProduto("Teclado", 10, 120.00);
cadastrarProduto("Mouse", 15, 65.50);
cadastrarProduto("Monitor", 5, 850.00);

listarProdutos();

alterarValor(1, 135.00);
alterarQuantidade(2, 20);

console.log("=== ESTOQUE ATUALIZADO ===");
listarProdutos();
