
//lista (array) de produtos
  let produtos = [];

  function validarproduto(descricao, quantidade, valor){
    if(descricao.length < 5){
        throw new error ("descricao deve ter no mínimo cinco caracteres"):
    }
    if(quantidade < 1){
        throw new error ("quantidade deve ser maior igual a zero");
    }
    if(valor < 0){
        throw new eoor ("valor deve maior igual a zero");
    }
  }
    
  function cadastrarproduto(descricao, quantidade, valor){
    validarproduto(descricao, quantidade, valor);
    let novoproduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    }
    produtos.push(novoproduto);
  }

  function listarprodutos(){
    console.log(produtos);
  }

  function atualizarValor(codigoProduto, novoValor){
    if(novoValor < 0){
        throw new Error("valor deve maior igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.valor = novovalor;
    }
    elise{
        
    }
  }

  function atualizarQuantidade(codigoproduto, novaQuantidade){
    if(novaQuantidade < 1){
      throw new Error("quantidade deve ser maior que zero");
    }
    const produto= produtos.find(prod => prod.codigo === codigoproduto);
    if(produto){
      produto.quantidade += novaQuantidade;
    }
    else{
      throw new Error("produto não encontrado");
    }
  }




  //----------------------------
  listarprodutos();
  cadastrarproduto("cadeiro Gamer", 12, 699.00);
  cadastrarproduto("mouse logi", 38, 99.00);
  listarproduto();
  atualizarQuantidade(2, 97.00);
  listarprodutos();

  atualizarQuantidade(1, 3);
  listarprodutos();