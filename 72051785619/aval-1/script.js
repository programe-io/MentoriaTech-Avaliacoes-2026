let produtos=[];
function validarProduto(descricao,quantidade,valor){
    if(descricao.length<5){
        throw new Error("descricao deve ter no minimocinco caracteres");
    }
    if(quantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
    }
}
function cadastrarProduto(descricao,quantidade,valor){
    validarProduto(descricao,quantidade,valor);
    let novoProduto={
        "codigo":produtos.length+1,
        "descricao":descricao,
        "quantidade": quantidade,
        "valor":valor
    }
    produtos.pus(novoproduto);
}
function listaprodutos(){
    console.log(produtos);
}
function atualizarvalor(codigoProduto,novovalor){
    if(novovalor<0){
        throw new Error("valor deve maior igual a zero");
    }
    const produto=produtos.find(prod.codigo===codigoproduto);
    if(produto){
        produto.valor=novovalor;
    }
    else{
        throw new Error("produto não encontrado");
    }
}
function atualizarquantidade(codigoproduto,novaquantidade){
    if(novaquantidade<1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto=produtos.find(prod.codigo===codigoproduto);
    if(produto){
        produto.quantidade+=novaQuantidade;
    }
    else{
        throw new Error("produto não encontrado");
    }
}
//---------------
listarProduto();
cadastrarproduto("cadeira gamer",12,699.00);
cadastrarProduto("Mouse Logi", 38,99.00);
listarProdutos();
atualizarValor(2,97.00);
listarProdutos();
atualizarQuantidade(1,3);
listarProdutos();
