//lista (array) de produtos
let produtos = [];

function validarProdutos(descricao, quantidade, valor){
    if(descricao.length < 5){
    throw new Error("descrição deve ter no minimo cinco caracteres");
        
    }
    if(quantidade < 1){
        throw new Error("quantidade deve ser maior que zero");
        
    }
    if(valor < 1){
        throw new Error("valor deve ser maior ou igual que um");
        
    }
}

function cadastrarProdutos(descricao, quantidade, valor){
    validarProdutos(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    }
   produtos.push(novoProduto);  
}

function listarProdutos(){
    console.log(produtos)
    
}

function atualizarValor(codigoProduto, novoValor){
    if(novoValor < 1){
        throw new Error("valor deve ser maior ou igual que um")
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    
    if(produto){
        produto.valor = novoValor;
    }
    else{
        throw new Error("produto nao encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade < 1){
        throw new Error("quantidade deve ser maior ou igual que um")
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.quantidade += novaQuantidade;
    }
    else{
        throw new Error("produto nao encontrado");
    }
}


//......................;
listarProdutos();
cadastrarProdutos("cadeira Gamer", 12, 699.00);
cadastrarProdutos("teclado gamer", 15, 899.00);
listarProdutos();
atualizarValor(1, 799.00);
listarProdutos();
atualizarQuantidade(2, 5);
listarProdutos();