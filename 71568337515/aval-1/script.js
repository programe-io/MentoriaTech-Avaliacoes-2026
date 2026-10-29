let produtos = [];
function validarproduto(descricao,quantidade,valor){
if(quantidade < 1){
    throw new Error("quantidade deve ser maior que zero");
    if(valor < 0){"valor deve ser maior que zero"}
 }
}
function cadrastarproduto(descricao,quantidade,valor){
    validarproduto(descricao,quantidade,valor);
    let novoproduto= {
        "codigo":produtos.length+1,
        "decricao":descricao,
        "quantidade":quantidade,
        "valor":valor
         }
         produtos.push(novoproduto);
}
function listarprodutos(){
    console.log(produtos);
}
function atualizarvalor(codigoproduto,novovalor){
    if(novovalor < 0){
        throw new Error9( "valor deve ser maior igual zero")
    }
    const produto = produto.find(prod => prod.codigo === codigoproduto);
    if(produto){
     produto.valor = novovalor;
    }
    else{
        throw new Error("produto nâo encontrado")
    }
}
function atualizarquantidade(codigoproduto,novaquantidade){
    if(novaquantidade < 1){
 throw new Error("quantidade deve ser maior que zero");
    }
    const produto = produtos.find(pro => prod.codigo === codigoproduto);
    if(produto){
     produto.quantidade = novaquantidade;
    }
    else{
        throw new Error("produto nâo encontrado");
    }
}
//
listarprodutos();
cadrastarproduto9("cadeira gamer",12,699.00);
cadrastarproduto("mouse logi",38,99.00);
listarprodutos()
atualizarvalor(2,97.00);
listarprodutos();
atualizarquantidade(1,3);
listarprodutos();