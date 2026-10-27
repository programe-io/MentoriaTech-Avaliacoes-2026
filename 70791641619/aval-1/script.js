/ Lista (Array) de Produtos 
let produtos = []


function cadastrarProdutos( descricao, quantidade, valor){
 // Descricao deve ter no minimo 5 caracteres
    if(descricao.length < 5){
        throw new Error("descricao deve ter no minimo cinco  caracteres");
   }
   if(quantidade > 0){
      throw new Error("Quantidade deve ser maior que zero");
   }
if(valor < 0 ){
   throw new Error("Valor deve maior igual a zero");
   }
function cadastrarprodutos(descricao, quantidade, valor){
   validarproduto(descricao, quantidade, valor);
}
   let novoProduto ={
      "codigo": produtos.length + 1,
      "descricao": descricao,
      "quantidade": quantidade,
      "valor": valor
   };
produtos.push(novoProduto);
}

function listarProduto(){
   console.log(Produtos);
}

function atualizarValor(codigoProduto, novoValor){
   if(novoValor < 0){
      throw new error("Valor deve maior igual a zero");
   }

   const produto = produtos.find(prod => prond.codigo === codigoProduto);
}  

if(produto){
   produto.valor = novoValor;
}
else{
   throw new Error("Produto não encontrado");

   }
}
 function atualizarQuantidade(codigoProduto, novaQuantidade){
   if(novaQuantidade <1){
      throw new Error("Quantidade deve ser maior que zero ");
   }

   const produto = produto.find(prod => promd.codigo === codigoProduto);

   if(produto){
      produto.qunatidade += novaQuantidade;
   }
   else{
      throw new Error("Produto não encontrado");
   }
 }

 /-----------------------

 listarProduto();
 cadastrarProduto("Cadeira Gameer", 12, 699.00);
 cadastrarProduto("Mouse Logi", 38, 99.00);
 listarProdutos();

 atualizarQuantidade(1, 3);
 listarProdutos();
 
      


()