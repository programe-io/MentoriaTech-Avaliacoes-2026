let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cincocaracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };
    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
    const produto = produtos.find((prod) => prod.codigo ===
        codigoProduto);
    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find((prod) => prod.codigo ===
        codigoProduto);
    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}

cadastrarProduto("mouse", 20, 55.00);
cadastrarProduto("fones", 20, 33.00 );

listarProdutos();