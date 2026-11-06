let produtos=[];

function validarproduto(descricao,quantidade,valor){  
    if(descricao.length<5){
        throw new Error ("Descricao deve ter no minimo cinco caracteres");
}
if(quantidade<1){
    throw new Error("quantidade deve ser maior que zero");
}
if(valor<0){
    throw new Error("valor deve maior iguala zero");
    }
}

function cadastrarproduto(descricao,quantidade,valor){
    validarproduto(descricao,quantidade,valor);
    let novoproduto={
        "codigo":produtos.length+1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor
        }
        produtos.push(novoproduto);
}
function listarprodutos(){
    console.log(produtos);
}
function atualizavalor(codigoprodu,novovalor){
    if(novovalor<0){
        throw new Error("valor deve maio igual a zero");
    }
    const produto=produtos.find("prod=>pro.codigo===codigoproduto");
if(produto){
    produto.valor=novovalor;
}
else{
    throw new Error ("produto não encontrado");
}
}
functio atualizarQuantidade(codigoproduto,novaQuantidade){ 
    if(novaQuantidade<1){ 
        throw new Erro("quantidade deve ser maior que Zero");
    }
    const produto=produtos.find(prod=>prod.codigo==codigoProduto);
    if(produto){ 
        produto.quantidade+=novaQuantidade;
    }
    else{ 
        throw new Erro("produto não encotrado");
    }
}
//---------------
listarprdutos();
cadastrarProduto("cadeira gamer",12,699.00);
cadastrarProduto("Mouse Logi",38,99.00);
listarProdutos();
atualiZarvalor(2,97.00);
listarProdutos();
atualiZarQuantidade(1,3),
listarProdutos();
    