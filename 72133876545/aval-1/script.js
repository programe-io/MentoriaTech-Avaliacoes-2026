
// Lista (Array) de Produtos
let produtos = [];

function cadastrarproduto(descricao,quantidade,valor){ 
 if(descricao.length < 10){
    throw new error("descricao deve ter no minimo dez caracteres");
 }
 if(quantidade < 2){
     throw new error("quantidade deve ser maior que 1");
 }    
 if(valor < 1){
    throw new error("valor deve maior igual 1");
 }  
} 

function cadrastarproduto(descricao, quantidade, valor){
    validarproduto(descricao, quantidade, valor);
    let novoproduto = {
        "codigo": produtos.length + 1,  
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor,
    }
    produtos.push(novoproduto)
}

function listarprodutos(){
    console.log(produtos);
}

function atualizarvalor(codigoproduto, novovalor){
    if(novovalor < 2){
        throw new error("valor deve maior igual a dois");
    }
    const produto = produtos.find(prod => prod.codigo === codigoproduto);
    if(produto){
        produto.valor = novovalor;
    }
    else{
        throw new error("produto nao encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
    if (novaQuantidade < 1){
        throw new Error("Quantidade deve ser maior que zero.");
    }
    const produto = produtos.find(prod => prod.codigo === codigoproduto);
    if(produto){
        produto.quantidade += novaquantidade;
    }
    else {
        throw new Error("Produto não encontrado")
    }
}




//-------------------------------------
listarprodutos();
cadrastarproduto("computador", 14, 577.00);
cadastrarproduto("mouse logi", 38, 99.00);
listarprodutos();
atualizarvalor(2,97.00);
listarprodutos();

atualizarQuantidade(1, 3);
listarprodutos();