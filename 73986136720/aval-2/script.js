let total = 0;

function adicionar(nome, preco){

    const lista = document.getElementById("lista");

    const item = document.createElement("li");

    item.textContent = `${nome} - R$ ${preco.toFixed(2)}`;

    lista.appendChild(item);

    total += preco;

    document.getElementById("total").textContent = total.toFixed(2);

}

function finalizar(){

    if(total === 0){

        alert("Seu carrinho está vazio!");

    }else{

        alert(`Compra realizada com sucesso!\nTotal: R$ ${total.toFixed(2)}`);

        document.getElementById("lista").innerHTML = "";

        total = 0;

        document.getElementById("total").textContent = "0.00";

    }

}