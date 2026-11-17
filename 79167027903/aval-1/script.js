
let carrinho = [];
let total = 0;

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.onclick = function() {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Compra simulada com sucesso!\n" +
        "Total: R$ " + total.toFixed(2).replace(".", ",")
    );

    carrinho = [];
    atualizarCarrinho();
}
