let produtos =[]:

function cadrastrarproduto(descricao,quantidade,valor){
    if(descricao.length < 5){
        throw new error("descricao deve ter no minimo cinco caracteres");
    }
    if (quantidade < 1){
        throw new error("quantidade deve ser maior que zero");
        if (valor< 0){
            throw new error("valor deve maior igual a zero");
        }
    }

    function cadrastrarproduto(descricao,quantidade,valor){
        validarproduto(descricao,quantidade,valor);
        letnovoproduto={
            "codigo":produtos.length+1
            "descricao":descricao,
            "quantidade":quantidade,
            "valor":valor
        };
        produtos.push(novoproduto);
    }
    function lista produtos(){
        console.log(novoprodutos);
    }
    function atualizarvalor(codigoproduto,novovalor){
    if(novovalor< 0 ){
        throw new  error("valor deve maior igual a zero");
    }
    const produtos.find(prod=> prod.codido===codigoproduto);
    if(produto){
        produto.valor=novovalor;
    }
    else{
        throw new error ("produto nao encontrado");
    }
}
function atualizarquantidade(codigoproduto,novaquantidade){
    if(novaquantidade< 1){
        throw new error("quantidade deve ser maior que zero");
    }
    const produto=produtos.find(prod=>prod.codigo===codigoproduto);
    if(produto){
        produto.quantidade+= novaquantidade;
    }
    else{
        throw new error ("produto nao encontrado");
    }
}

listaprodutos();
cradastraprodutos("cadeira gamer",12,699.00);
cadrastrarproduto("mouse logi",38.99.00);
listaprodutos();

atualizarvalor(2,97.00);
listaprodutos();

atualizarquantidade(1,3);
listaprodutos();
