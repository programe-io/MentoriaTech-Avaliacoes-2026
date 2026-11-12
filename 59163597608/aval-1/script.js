// Lista de produtos
let produtos = [];

// cadastrar produto
function cadastrarproduto(descricao,quantidade,valor){
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
        throw new Error("Dados invalidos!");
    }

    let produto = {
        codigo: produtos.length + 1,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);
    console.log("produto cadastrado!");
}

// Listar produtos
function listarprodutos(){
    console.log(produtos);
}

// Atualizar valor
function atualizarvalor(codigo,novoValor){
    let produto = produtos.find(p => p.codigo == codigo);

    if (!produto || novoValor <0){
        throw new Error("produto ou valor invalido");
    }
   
    produto.valor = novoValor;
}

//Atualizar quantidade
function atualizarQuantidade(codigo, quantidade){
    let produto = produtos.find(p.codigo === codigo);

    if (!produto || quantidade < 1){
        throw new Error("produto ou quantidade invalido");
    }

    produto.quantidade += quantidade;
}