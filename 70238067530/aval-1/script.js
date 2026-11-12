// lista de produtos
let produtos = [];

// Cadastrar produto 
function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5 || quantidade < 1 || valor <0) {
        throw new Error("Dados invalidos!");
    }

    let produto = {
        codigo:produtos.length + 1,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);
    console.log("Produto cadastrado!");
 }

 // Listar produtos
 function listarProdutos() {
    console.log(produtos);
 }

 // Atualizar valor 
 function atualizarvalor(codigo,novoValor) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto || novovalor < 0) {
        throw new Error("Produto ou valor invalido");
    }

    produto.valor = novovalor;
}

// Atualizar quantidade
function atualizarQuatidade(codigo, quantidade) {
    let produto = produto.find(p => p.codigo === codigo);

    if (produto || quantidade <1) {
        throw new Error("produto ou quantidade inválidade!");
    }

    produto.quantidade += quantidade;
}

