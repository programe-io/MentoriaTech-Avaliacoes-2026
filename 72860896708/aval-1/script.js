let produtos=[];
function validarproduto(descricao,quantidade,valor){
    if(descricao.length<5){
        throw new Error("descricao deve ter no mínimo cinco caracteres");
    }
    if(quantidade<1){
        throw new Error ("Quantidade deve ser maior que zero");
    }
    if(valor<0){
        throw new Error("valor deve maior igual a zero");
    }
}
function cadastrarproduto(descricao, quantidade,valor){
    validarproduto(descricao,quantidade,valor);
    let novoProduto={
        "codigo":produtos.length+1,
         "descricao":descricao,
         "quantidade":quantidade,
         "valor":valor
    }
    produtos.push(novoproduto);
}
function listarProduto(){
    console.log(produtos);
}
function atualizarvalor(codigoProduto,novovalor){
    if(novovalor<0){
        throw new Error("valor deve maior igual a zero");
    }
    const produto= produtos.find(prod=>prod.codigo===codigoproduto);
    if(produto){
        produto.valor=novovalor;
    }
    else{
        throw new Error("produto não encontrado");
    }
}
function atualizarQuantidade(codigoProduto,novaQuantidade){
    if(novaQuantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto= produtos.find(prod=>prod.codigo===codigoProduto);
    if(produto){
        produto.quantidade+=novaQuantidade;
    }
    else{
        throw new Error("produto não encontrado");
    }
}
//------------------------------
listarProduto();
cadastrarproduto("Cadeira Gamer", 12,699.00);
cadastrarproduto("Mouse Logi",38,99.00);
listarProdutos();
atualizarvalor(2,97.00);
listarProdutos();

atualizarQuantidade(1,3);
listarProdutos();