
/// Lista (Array) de Produtos
let produtos = [];

function validarproduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
    }
    if (quantidade <= 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor <= 0) {
        throw new Error("Valor deve ser maior que zero");
    }

}
function cadastrarProdutos(descricao, quantidade, valor){
    let produto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,      
        "valor": valor
    };
    produtos.push(produto); 
}

function listarprodutos(){
    console.log(produtos);
}

function atualizarvalor(codigoproduto, novovalor){
    if (novovalor < 0){
        throw new Error("valor deve maior igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoproduto);
    if (produto){
        produto.valor = novovalor;
    }
    else{
    throw new Error("produto não encontrado");
    }
}

function atualizarquantidade(codigoproduto, novaquantidade){
    if(novaquantidade < 1){
        throw new Error("quantidade deve ser maior que zero"); 
    }
    const produto = produtos.find(prod => prod.codigo === codigoproduto);
      if (produto){
           produto.quantidade += novaquantidade; 
  }
    else{
    throw new Error("produto não encontrado");
    }
}




//------------------
listarprodutos();
cadastrarProdutos("cadeira gamer", 12, 699.00);
cadastrarProdutos("cadeira gamer", 38, 99.00);
listarprodutos();
atualizarvalor(2, 97.00);
listarprodutos();

atualizarquantidade(1, 3);
listarprodutos();