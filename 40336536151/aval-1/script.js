let produtos = [];

function validarProduto(descrição, quantidade, valor){
  if(descrição.length < 5){
    throw new Error("Descrição deve ter no mínimo cinco caracteres");
  }
  if(quantidade < 1){
    throw new Error("Quantidade deve ser maior que zero");  
  }
  if(valor < 0){
      throw new Error("Valor deve maior igual a zero");
  }
}

function cadastrarProduto(descrição, quantidade, valor){
    validarProduto(descrição, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descrição": descrição,
        "quantidade": quantidade,
        "valor": valor      
    }
    produtos.push(novoProduto);   
}

function listarProdutos(){
    console.log(produtos); 
}

function atualizarValor(codigoProduto, novoValor){
   if(novoValor < 0){
        throw new Error("Valor deve maior igual a zero");
   }
   const produto = produtos.find(prod => prod.codigo === codigoProduto);
   if(produto){
     produto.Valor = novoValor;
   }
   else{
      throw new Error("Produto não encontrado");
   }  
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
   if(novaQuantidade < 1){
        throw new Error("Quantidade deve ser maior que zero");
   }
   const produto = produtos.find(prod => prod.codigo === codigoProduto);
   if(produto){
     produto.Quantidade += novaQuantidade;
   }
    else{
      throw new Error("Produto não encontrado");
    }
}





listarProdutos();
cadastrarProduto("gloss rosa", 20, 12.00);
cadastrarProduto("sombra com glitter",15, 18.00);
listarProdutos();
atualizarValor(2, 10.00)
listarProdutos();

atualizarQuantidade(1, 15);
listarProdutos();