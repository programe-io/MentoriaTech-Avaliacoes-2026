let total = 0;

function adicionarCarrinho(carro, preco){

    const lista = document.getElementById("listaCarrinho");

    const item = document.createElement("li");

    item.innerHTML = `${carro} - R$ ${preco.toLocaleString('pt-BR')}`;

    lista.appendChild(item);

    total += preco;

    document.getElementById("total").textContent =
        total.toLocaleString('pt-BR');
}

function finalizarCompra(){

    if(total === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n\n" +
        "Valor Total: R$ " +
        total.toLocaleString('pt-BR')
    );

    document.getElementById("listaCarrinho").innerHTML = "";

    total = 0;

    document.getElementById("total").textContent = "0,00";
}

function mostrarPromocao(){
    alert("🚗 Promoção Especial! Financiamento em até 60x.");
}