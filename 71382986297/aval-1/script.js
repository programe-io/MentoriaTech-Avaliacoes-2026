// lista (Array) de produtos
let produtos = [];
function ValidarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5){
        throw new Error("Descricao deve ter no minino cinco caracteres");
    }
    if (quantidade <1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    if(valor<0){
        throw new Error("Valor deve ser maior igual a zero");
    }
}
function cadastrarProduto(descricao , quantidade, valor){
    ValidarProduto(descricao, quantidade, valor);
    
    let novoProduto = {
        "codigo":produtos.length + 1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor
    };
    produtos.push(novoProduto);
}

function listarProdutos(){
    console.log(produtos);
}

function atualizarValor(codigoProduto,novoValor){
    if(novoValor<0){
        throw new Error("Valor deve ser maior igual a zero");
    }
    const produto=produtos.find(prod=>prod.codigo===codigoProduto);

    if(produto){
        produto.valor=novoValor;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
  if(novaQuantidade<1){
    throw new Error("Quantidade deve ser maior que zero");
  }

  const produto=.find(prod=> prod.codigo === codigoProduto);

  if(produto){
    produto.quantidade += novaQuantidade;
  }
  else {
    throw new Error ("produto não encontrado");
  }
}
//----------------------

listarProdutos();
cadastrarProduto("cadeira gamer", 12, 699.00);
cadastrarProduto("mouse logi", 38, 99.00);
listarProdutos();

atualizarValor(2, 97.00);
listarProdutos();

atualizarQuantidades(1, 3);
listarProdutos();