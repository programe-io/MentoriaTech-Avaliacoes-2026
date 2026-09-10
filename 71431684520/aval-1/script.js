let produtos =[];
function validarProduto(descricao,quantidade, valor) {
  if (descricao.length<5) {
  console.log("Descricao deve ter no minimo 5 caracteres");
  }
  if (quantidade<1) {
  console.log("Quantidade deve ser maior que zero");
  }
  if (valor<0) {
  console.log("Valor deve ser maior que zero");
  }
}
function cadastrarProduto(descricao,quantidade,valor){
 validarProduto(descricao,quantidade,valor);
 let novo Produto = {
 	"Codigo": produto.length+1 ;
 	"descricao": descricao ;
 	"quantidade": quantidade ;
 	"valor": valor ;
 }
  produtos.push(novoProduto);
}
 function atualizarvalor(codigo Produto,novo valor){
 	if (novoValor<0) {
  console.log("Valor deve ser maior que zero");
 } 
   const produto= produtos find (prod=>prod codigo === codigoProduto);
   if(produto){
   	produto.valor=novoValor ;
   }else{
   	console.log ("Produto nao encontrado");
      }
 } 
      function atualizarQuantidade(codigo Produto,nova Quantidade){
 	if (novaQuantidade<1) {
 		console.log("Quantidade deve ser maior que zero");
 	}
 	   const produto=produtos.find(prod=prod codigo===codigoProduto);
 	   if(produto){
 	   	produto.quantidade +=novaQuantidade ;
 	   }else{
 	   	console.log("Produto nao encontrado");
 	   } 
 	}
  