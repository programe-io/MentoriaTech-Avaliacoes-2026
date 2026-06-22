let total = 0;

function adicionarCarrinho(produto, preco){

    const lista = document.getElementById("listaCarrinho");

    const item = document.createElement("li");

    item.textContent = produto + " - R$ " + preco.toFixed(2);

    lista.appendChild(item);

    total += preco;

    document.getElementById("total").textContent =
        total.toFixed(2);
}

function finalizarCompra(){

    if(total === 0){
        alert("Carrinho vazio!");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: R$ " + total.toFixed(2)
    );

    document.getElementById("listaCarrinho").innerHTML = "";
    document.getElementById("total").textContent = "0.00";

    total = 0;
}

function mostrarPromocao(){
    alert("Promoção especial: 20% de desconto em toda a loja!");
}