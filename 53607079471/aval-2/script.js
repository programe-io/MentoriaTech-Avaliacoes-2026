
let carrinho = [];

// ADICIONAR PRODUTO
function adicionar(nome, preco) {

    let produto = carrinho.find(
        item => item.nome === nome
    );

    if (produto) {

        produto.quantidade++;

    } else {

        carrinho