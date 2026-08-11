// Lista (array) de produtos
let produtos = [];

function cadastrarProduto(descricao, quantidade, valor) {
    // Descrição deve ter no mínimo 5 caracteres
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    // Quantidade deve ser maior que zero
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    // Valor deve ser maior ou igual a zero
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
     }

}

function cadastrarProduto(descricao, quantidade, valor) {

    let novoproduto
 }