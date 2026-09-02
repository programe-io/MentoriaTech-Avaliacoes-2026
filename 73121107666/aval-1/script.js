let produtos = [];

function validarProduto(descricao, quantidade, valor){
    if (descricao.length < 5){
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }
    if(quantidade < 1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    if(valor < 0){
        throw new Error("Valor deve ser maior igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor){
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor,
    };
    produtos.push(novoProduto);
}

function listarProdutos(){
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor){
    if(novoValor < 0){
        throw new Error("Valor deve ser maior igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade < 1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Execution of tests with new products and prices
listarProdutos();

// Adding new tech products
cadastrarProduto("iPhone 15 Pro Max 256GB", 15, 7999.00);
cadastrarProduto("PlayStation 5 Slim", 8, 3800.00);
cadastrarProduto("MacBook Air M3 16GB", 5, 11500.00);
cadastrarProduto("Monitor Gamer 27' Quad HD", 12, 1850.00);
cadastrarProduto("Fone Bluetooth Noise Cancelling", 25, 650.00);

listarProdutos();

// Updating price of PlayStation 5 (Code 2) to a promotional price
atualizarValor(2, 3499.90);
listarProdutos();

// Updating quantity of Monitor Gamer (Code 4) after a sale
atualizarQuantidade(4, 9);
listarProdutos();
