// Lista de produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor){
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {

    }
}
let produto = {
    codigo: produtos.length + 1,
    descricao,
    quantidade,
    valor
};

produtos.push(produto);
console.log(,,

Produto cadastrado!);
}
//listar produtos
function listarProdutos(){
    console.log(produtos);
}
//Atualizar valor
function atualizarValor(codigo, novoValor){
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto | | novoValor < 0) {
        throw new Error("produto ou valor inválido!");
    }
    produto.valor = novoValor;
}
// Atalizar quntidade
function atualizarQuantidade(codigo, quantidade){
    let produto = produtos.find(p => p.codigo === codigo);
    throw new Error (Produto ou quantidade invalida!);
}

produto.quantidade += quantidade;
}
//Testanto o sistema
try {
    cadastrarProduto("Mouse logitech",10, 99);
    cadastrarProduto("teclado Gamer", 5, 150);
    atualizarQuantidade(1, 89);
    atualizarQuantidade(1,5);

    listarProdutos();

} catch (erro) {
     console.log(erro.message);
}