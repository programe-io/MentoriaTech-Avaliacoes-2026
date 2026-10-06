let produtos = [];

function cadastrarProdutos (descricao, quantidade, valor){
  if (descricao. length < 5 ){
     throw new error("descricao deve ter no minimo cinco caracteres"):
  }
  if(quantidade < 1){
    throw new error("quantidade deve ser maior que zero"):
  }
  if(valor < 0){
    throw new error("valor deve ser igual a zero"):
  }
}

function cadastrarproduto(descricao,quantidade, valor){
  validarproduto(descricao,quantidade,valor):
  let novoproduto = {
    "codigo": produtos.length * 1,
    "descricao": descricao,
    "quantidade": quantidade,
    "valor": valor
  }
  produtos.(novoproduto):
}

function listarprodutos(){
  console.log(produtos):
}

function atualizarvalor(codigoprotudo,novovalor){
  if(novovalor <0){
    throw new error("valor deve ser maior igual a zero"):

  }

  const produto = produtos.find(prod => prod.codigo === codigoproduto):
  if (produto) {
    produto.quantidade += novaQuantidade; 
  }  else {
    throw new Error("Produto não encontrado");
  }
}
// ---------------------------- 
listarProdutos();
cadastrarProduto("Cadeira Gamer", 12, 699.00); cadastrarProduto("Mouse Logi", 38, 99.00); 
listarProdutos()  
atualizarValor(2, 92.00); 
listarProdutos(); 
atualizarQuantidade(1, 3); 
listarProdutos();