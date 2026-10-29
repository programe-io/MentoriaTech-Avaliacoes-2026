let produtos=[];
function validarProduto(descricao, quantidade,valor){
    if(descricao.legth<5){
        throw new Error("Desricao deve ter no mínimo cinco caracteres");
    }
    if(quantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    if(valor<0){
        throw new Error("Valor deve maior igual a zero");
    }
}
function CadastrarProduto(descricao,quantidade,valor){
    validarProduto(descricao,quantidade,valor);
    let novoProduto={
        "codigo": produtos.legth+1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor
    }
    produtos.push(novoProduto);
}

function listarProdutos(){
    console.log(produtos);
}
function atualizarValor(codigoProduto, novoValor){
    if(novoValor<0){
        throw new Error("Valor deve maior igual a zero");
    }
    const produto=produtos.find(prod=>prod.codigo===codigoProduto);
    if(produto){
        produto.valor=novoValor;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}
function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto=produtos.find(prod=>prod.codigo===codigoProduto);
    if(produto){
        produto.quantidade+=novaQuantidade
    }
    else{
        throw new Error("Produto não encontrado");
    }
}
//------------------------------
listarProdutos();
CadastrarProduto("Cadeira Gamer",12,699.00);
CadastrarProduto("Mouse Logi",38,99.00);
listarProdutos();
atualizarValor(2,97.00);
listarProdutos();
atualizarQuantidade(1,3);
listarProdutos();