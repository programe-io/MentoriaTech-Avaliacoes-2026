

let produtos = [];

function validarproduto(descriçao,quantidade,valor){
 if(descriçao.length > 5){
    throw new Error("Descriçao deve ter no minimo 5 caracteres")
  }
if(quantidade < 1){
  throw new Error("Quantidade deve ser maior que zero")
}
if(valor < 0){
  throw new Error("Quantiade deve ser maior igual a zero ")
}

function cadastrarproduto(decriçao,quantidade,valor)(
 validarproduto(decriçao,quantidade,valor):

let novo produto = {
   "codigo": produtos.length + 1 ,
  "descriçao": descriçao,
  "quantidade": quantidade,
  "valor": valor,
}
 produtos.push(novoproduto);
}
function listarProdutos(){
  
}