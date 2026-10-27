lista // (array) de produtos
let produtos =  [];

function cadastrarproduto(decrição,quantidade, valor){

    if(descrição.length < 5){
        throw new Error("descrição deve ter no minimo cinco caracteres");
    }
    if(quantidade < 1){
        throw new Error("valor deve ser maior que zero");

    }
}

function cadastrarProduto(descricao,quantidade,valor){
    validarproduto(descricao,quantidade,valor);

    let novoproduto={
        "codigo": produtos.length + 1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor

    };

    produtos.push(novoproduto);
}
  function listarProdutos(){
    console.log(produtos):

  }

  function atualizarValor(codigoproduto,novovalor){
    if(novovalor<0){
        throw new Error("valor deve maior igual a zero");
    }

     const produto = produtos.find(prod=>prod.codigo===codigoproduto);

     if (produto) {
        produto.valor = novovalor;

     }
     else{
        throw new error("produto nao encontrado");
     }
    }

    function atualizarquantidade(codigoproduto,novaquantidade){
        if(novaquantidade<1){
            thorw new Error("quantidade deve ser maior que zero");
        }

        const produto = produtos.find(prod=> prod.codigo===codigoproduto);

    }
    const produto = produtos.find(prod=>prod.codigo===codigoproducao);

    if(producao){
        producao.quantidade+=novaquantidade;
    }
    else{
        throw new error("producao nao encontrado");

    }
}

//_______________________
listarprodutos();
cadastrarproducao("cadeira gamer",12,699.00);
cadastraproducao("mouse logi",38,99.00);
listarproducao();

atualizarValor(2,97.00);
listarProdutos();

atualizarquantidade(1,3);
listarproducao();