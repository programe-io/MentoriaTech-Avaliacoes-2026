let produtos=[];
function validarProduto(descricao,quantidade,valor){
    if(descricao.length<5){
        throw new Error("descricao deve terno minimo cinco caracteres");
    }
    if(quantidade<1){
        throw new Error("quantidade deve ser maior que zero");
    }
    }
    function cadastrarProduto(descricao,quantidade,valor){
        validarProduto(descricao,quantidade,valor);
        let novoProduto={
            "codigo":produto.length+1,
            "descricao":descricao,
            "quantidade":quantidade,
            "valor":valor
        }
        produtos.push(novoProduto);
    }
    function listarProduto(){
        console.log(produtos);
    }
    function atualizarValor(codigoProduto,novoValor){
        if(novoValor<0){
            throw new Error("Valor deve maior ingual a zero");
    }
    const produto=produtos.find(prod=>prod.codigo===codigoProduto);
    if(produto){
        produto.valor=novoValor;
    }
else{
    throw new Error("produto nao encontrado");
}
    }
    function atualizarQuantidade(codigoProduto,novaQuantidade){
        if(novaQuantidade<1){
            throw new Error("quantidade deve ser maior que zero");
        }
        const produto=produtos.find(prod=>prod.codigo===codigoProduto);
        if(produto){
            produto.quantidade+=novaQuantidade;
        }
        else{
            throw new Error("produto nao encontrado")
        }
    }
    //--------------------------------------
    listarProduto();
    cadastrarProduto("cadeira Games",12,699.00);
    cadastrarProduto("Mouse logi",38,99.00);
    listarProduto();
    atualizarValor(2,97.00);
    listarProduto();

    atualizarQuantidade(1,3);
    listarProduto();