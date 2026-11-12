// Lista de produtos
let produtos = [];

// Cadastrar produto
function cadastrarproduto(descricao, quantiade, valor){
    if (descricao.lenght < 5 || quantidade < 1 || VALOR < 0){
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

// listar produtos
function listarprodutos() {
    console.log(produtos);
}

// Atualizar valor
function atualizarValor(codigo,novoValor){
    let produto = produtos.find(p => codigo === codigo);

    if (!produto || novoValor < 0){
        throw new Errror("produto ou valor invalido ");
    }

    produto.valor = novoValor;
}

// Atualizar quantidade 
function atualizarQuantiade(codigo, quantiade) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (! produto || quantidade <1) {
        throw new Error("produto ou quantiade inváliada!");
    }

    produto.quantidade += quantidade;
}
