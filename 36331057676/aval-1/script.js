// lista (ARRAY) produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor){
    if (descricao.length < 5 ){
        throw new Error("Descricao deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1){
        throw nwe Error("Quantidade deve ser maior que zero");

    }

    if (valor < 0){
        throw new Error("Valor deve maior igual a zero");
  
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao,quantidade,valor);


    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao":descricao,
        "quantidade":quantidade,
        "valor":valor
    };


    produtos.push(novoProduto);
}


   function listaProdutos() {
    console.log(produtos);
   }


   function atulizarValor(codigoProduto, novoValor){
    if (novoValor<0){
        throw new Error("Valor deve ser maior igual a zero");

    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    
    if (produto) {
        produto.valor = novoValor;

    }
    else {
        throw new Error("Produto nao encontrado");

    }
   }


   function atualizarQuantidade(codigoProduto, novaQuqntidade){
    if (novaQuantidade<1){
        throw new Error("Quantidade deve ser maior que zero");

    }


    conts produto = produtos.find(prod => prod.codigo === codigoProduto);


    if (produto){
        produto.quantidade += novaQuantidade;

    }
    else{
        throw new Error("produto nao encontrado");
    }
   }

   //------------------------------


   listarProdutos();
   cadastrarProdutos("cadeira Gamer", 12, 699.00);
   cadastrarProduto("mouse Logi", 38, 99.00);
   listarProedutos();


   atualizarValor(2, 97.00);
   listarProdutos();


   atualizarQuantidade(1, 3);
   listarProdutos();