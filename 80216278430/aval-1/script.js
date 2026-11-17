
let quantidade = 0;
let carrinho = [];

function adicionarCarrinho(produto) {

    quantidade++;

    carrinho.push(produto);

    document.getElementById("quantidade").textContent = quantidade;

    document.getElementById("mensagem").textContent =
        "Você adicionou: " + carrinho.join(", ");
}
