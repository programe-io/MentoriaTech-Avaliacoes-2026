
// Lista (Array) de Produtos
let produtos = [];
function cadastrar Produto(descricao, quantidade, valor) {
// Descricao deve ter no mínimo 5 caracteres
if(descricao.length < 5){
throw new Error("Descricao deve ter no mínimo cinco caracteres");
}
if(quantidade < 1){
throw new Error("Quantidade deve ser maior que zero");
}
if(valor < 0) {
throw new Error("");
}
}

function cadastrarProduto(descrição, quantidade, valor){
    validarProduto(descrição, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.Length + 1,
        "descrição": descrição,
        "quantidade": quantidade,
        "valor": valor
    }
    produtos. push(novoProduto);
}

function listarProdutos(){
    console.log(produtos);
}

function atualizarValor(codogoProduto, novoValor){
    if
}






throw new Error("Produto não encontrado");
}
}

function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade < 1){
        throw new Error("Quantidade deve ser maior que zero ");
    }
    const produto = produtos.final(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.quantidade += novaQuantidade;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}




//--------------------------
listarProdutos();
cadastrarproduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mause Logi", 38, 99.00);
listarProdutos();
atualizarValor(2, 97.00);
listarProdutos();

atualizarQuantidade(4, 3);
