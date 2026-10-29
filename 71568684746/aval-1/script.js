let produtos=[];
function validarProduto(descricao,quantidade,valor){
    if(descricao.length<5){
        throw new Error("descricao deve ter no minimo cinco caracteres");
    }
    if(quantidade<1){
        throw new Error("quantidade deve ser maior que zero");
    }
    if(valor<0){
        throw new Error("valor deve maior igual a zero");
    }
}
function cadrastarProdutos(descricao,quantidade,valor){
    validarProdutos(descricao,quantidade,valor);
    let novoProduto={
        "codigo":produtos.length + 1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor
}
produtos.push(novoProduto);
}
function listarProdutos(){
    console.log(produtos);
}
function atualizarValor(codigoProduto,novoValor){
    if(novoValor<0){
        throw new Error("valor deve maior igual a zero ");
    }
    const produto=produtos.find(prod=>prod.codigo===codigo===Produto);
    if(produto){
        produto.valor=novoValor;
    }
else{
    throw new Error("produto não encontrado");
}
}
function atualizarQuantidade(codigoProduto,novaQuantidade){
    if(novaQuantidade<1){
        throw new Error("quantidade deve ser maior que zero");
    }
    const produto=produtos.find(prod=>pro.codigo===codigoProduto);
    if(produto){

    }
    else{
        throw new Error("Produto não econtrado");
    }
}
//---------------
listarProdutos();
cadrastarProduto("cadeira Gamer",12,699.00);
cadrastarProduto("mouse Logi",38,99.00);
listarProdutos();
atualizarValor(2,97.00);
listarProdutos();

atualizarQuantidade();