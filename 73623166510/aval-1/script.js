
//Lista (Array) de Produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor){
    if(descricao.lebgth <5){
        throw new Error("Descricao deve ter no minimo cinco caractrs");
    }
    if(qualidade < 1){
        throw new Error("Qualidade deve ser maior que zero");
    }
    if(valor < 0){
        throw new Error("Valor deve maior imgual a zero");
    }
}

function cadastrarProduto(descricao, qualidade, valor ){
    validarProduto(descricao, qualidade, valor);
    let produto = {
        " codigo": produtos.length + 1,
        " descricao": descricao,
        ' quantidade': quantidade,
            "valor": valor
    }
    produto.push(novoProduto);
}

function ListarProdudos(){
    console.log(produtos)
}

function atualizarValor(codigoProdutos,novoProduto){
    if(novoValor){
        throw new Error("Valor deve maior ingual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProdutos);
    if(produto){
        produto.valor = novoValor
    }
    else{
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProdutos, novaQuantidade){
    if(novaQuantidade < 1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProdutos);
    if(produto){
        produto.qualidade += novaQuantidade;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}




//--------------------------
ListarProdudos();
cadastrarProduto("Cadeira Gamer",12, 699.00);
cadastrarProduto("Mouse logi",38, 99.00)
ListarProdudos();
atualizarValor(2, 97.00);
ListarProdudos();

atualizarQuantidade(1,3);
ListarProdudos();