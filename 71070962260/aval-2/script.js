
let quantidade = 0;
let total = 0;

function adicionarCarrinho(preco) {

    quantidade++;

    total += preco;

    document.getElementById("quantidade")
        .innerText = quantidade;

    alert(
        "Produto adicionado ao carrinho!\n" +
        "Total da compra: R$ " +
        total.toFixed(2).replace(".", ",")
    );

}
