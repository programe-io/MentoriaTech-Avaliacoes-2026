
// Lista(Array) de produtos
produtos ={}:

function cadrastrarprodutos(descricao,quantidade,valor){
    if(descricao.length < 5){
        throw new error("descricao deve ter no minimo cinco caracteres");
    }
    if (quantidade < 1){
        throw new error("quantidade deve ser maior que zero");
    }
    
    if(valor < 0){
      throw new error ("valor deve maior igual a zero");
    }
}
function cadrastrarprodutos(descricao, quantidade, valor){
    validarproduto(descricao, quantidade, valor);
    let novoproduto={
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };
    
    produtos.push(novoproduto);
}
function listarprodutos(){
    console.log(produtos);
}
function atualizarvalor(codigoproduto, novovalor){
    if(novovalor < 0){
        throw new error("valor deve maior que zero");
    }
    const produto= produtos.find(prod.codigo===codigoproduto);

    if(produto){
        produto.valor=novovalor;
    }
    else{
        throw new error("produto nao encontrado");
    }
}
function atualizarquantidade(codigoproduto, novaquantidade){
    if(novaquantidade < 1){
        throw new error ("quantidade deve ser maior que zero");
    }
    const produto= produtos.find(prod=> prod.codigo===codigoproduto);
    if(produto){
        produto.quantidade+=novaquantidade;
    }
}

listarprodutos();
cadrastrarprodutos("cadeira gamer",12,699.00);
cadrastrarprodutos("mouse logi",38,99.00);
listarprodutos();

atualizarvalor(2,97.00);
listarprodutos();

atualizarquantidade(1,3);
listarprodutos();


    