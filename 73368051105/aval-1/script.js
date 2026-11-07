
Lista (Array) de Produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor){
   if(descricao.length < 5){
      throw new Error("Descricao deve ter no mínimo cinco caracteres"
  }
  if(quantidade < 1){
      throw new Error("Quantidade deve ser maior que zero");
  }
  if(valor <0){
      throw new Error("Valor deve maior igual a zero");
  }
}    
    
function cadastrar Produto(descricao, quantidade, valor)(
    validar Produto(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    }
    produtos.push(noveProduto);
}

function star Produtas(){
    console.log(produtos);
}

function atualizarValor (codigo Produto, novovalor
    if(novovalor< 0){
        throw new Error("Valor deve selor igual a zero);
    }                        throw new
    const produto produtos.find(pred prod.codigo codigoProduto).
    if(produto)>
        produto.valor novovalor:
    } 
    else{ 
        throw new Error("Produto nãe encontrado");
    }
}

function atualizarQuantidade codigoProduta, novaquantidade)
    if(novaQuantidade 1){
        throw new Error("Qantidade deve ser maior que zero");
    }
    const produto produtos, find(rod prod.codigo codigo Produto);
    if(produto){
        produto.quantidade += novaquantidade;
    }
     else{
        throw new Error("Produto não encontrado);
    }
} 





listar Produtos();
cadastrar Produto("Cadeira Gamer, 12, 699,00);
cadastrar Produte("Mouse Logi, 38, 99.00);
listar Produtos();
atualizarValor(2, 97.00);
lister Produtos();

atualizarQuantidade(1, 3);
11 star Produtos();