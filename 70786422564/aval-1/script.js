
let produtos = [];

// Validar produto
function validarPRODUTO(descricao, quantidade, valor) {
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

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarPRODUTO(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

// Listar produtos
function listarProduto() {
    console.log(produtos);
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
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Adicionar quantidade ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Executar o programa
listarProduto();

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

listarProduto();

atualizarValor(2, 97.00);
listarProduto();

atualizarQuantidade(1, 3);
listarProduto();
