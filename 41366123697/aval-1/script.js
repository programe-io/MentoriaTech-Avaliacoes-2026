
// lista de produtos //
let produtos = [];

function cadastrarProdutos(descrição, quantidade, valor) {
    if(descrição.length <5){
        throw new Error("A descrição do produto deve ter no mínimo 5 caracteres.");
    }
    if(quantidade <= 0){
        throw new Error("A quantidade do produto deve ser maior que zero.");
    }

}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
    } else {
        console.log("Lista de produtos cadastrados:");
        produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Descrição: ${produto.descrição}, Quantidade: ${produto.quantidade}, Valor: R$ ${produto.valor.toFixed(2)}`);
        });
    }

    cadastrarProdutos("Produto A", 10, 15.99);
    cadastrarProdutos("Produto B", 5, 9.99);
    cadastrarProdutos("Produto C", 20, 29.99);