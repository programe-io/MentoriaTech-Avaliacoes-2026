let carrinho = [];
let total = 0;

// Função para adicionar produto
function comprar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// Atualizar carrinho
function atualizarCarrinho() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    carrinho.forEach((produto) => {
        let item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2);

        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        "Total: R$ " + total.toFixed(2);
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: R$ " + total.toFixed(2)
    );

    carrinho = [];
    total = 0;

    atualizarCarrinho();
}