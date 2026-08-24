// Lista (array) de produtos
let produtos = [];

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    // Descrição deve ter no mínimo 5 caracteres
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    // Quantidade deve ser maior que zero
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    // Valor deve ser maior ou igual a zero
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    // Gera um código para o produto
    let codigo = produtos.length + 1;

    // Cria o novo produto
    let novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

// Função para listar produtos
function listarProdutos() {
    console.log(produtos);
}

// Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Testando o programa

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

listarProdutos();

atualizarValor(2, 97.00);

listarProdutos();

atualizarQuantidade(1, 3);

listarProdutos();