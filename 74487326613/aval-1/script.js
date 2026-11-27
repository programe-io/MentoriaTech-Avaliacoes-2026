let produtos=[]
    function validarProduto(descricao,quantidade,valor);
        if(descricao.lenght<5){
            throw new Error("Descricao deve ter no mínimo cinco caracteres");
        }
        if(quantidade<1){
            throw new Error("Quantidade deve ser maior que zero");
        }
        if(valor<0){
            throw new Error("Valor deve ser maior igual a zero");
        }
    
    function cadastrarProdutos(descricao,quantidade,valor){
        validarProduto(descricao,quantidade, valor);
        let novoProduto={
            "codigo":produtos.length+1,
            "descricao":descricao,
            "quantidade":quantidade,
            "valor":valor
        }
        produtos.push(novoProduto);
    }
    function listarProdutos(){
        console.log(produtos);
    }
    function atualizarValor(codigoProduto,novoValor){
        if(novoValor<0){
            throw new Error("Valor deve maior igual a zero");
        }
        const produto=produtos.find(prod=>prod.codigo===codigoProduto);
        if (produto){
            produto.valor=novoValor;
        }
        else{
        throw new Error("Produto não encontrado");
        }
    }
    function atualizarQuantidade(codigoProduto,novoQuantidade){
        if(novaQuantidade<1){
            throw new Error("Quantidade deve ser maior que zero");
        }
        const produto=produtos.find(prod=>prod.codigo===codigoProduto);
        if(produto){
            produto.quantidade+=novoQuantidade;
        }
        else{
            throw new Error("Produto não encontrado");
        }
    }
    //------------------------------
    listarProdutos();
    cadastrarProdutos("CCadeira Gamer",12,699.00);
    cadastrarProdutos("Mouse Logi",38,99.00);
    listarProdutos();
    atualizarValor(2,97.00);
    listarProdutos();

    atualizarQuantidade(1,3);
    listarProdutos();