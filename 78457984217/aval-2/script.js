let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itens = document.getElementById("itens");
    const quantidade = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");

    itens.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, indice) => {
        total += produto.preco;

        const item = document.createElement("p");

        item.textContent =
            `${produto.nome} - R$ ${produto.preco.toFixed(2)} `;

        const remover = document.createElement("button");

        remover.textContent = "Remover";
        remover.onclick = () => removerProduto(indice);

        item.appendChild(remover);
        itens.appendChild(item);
    });

    quantidade.textContent = carrinho.length;

    totalElemento.textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function removerProduto(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("carrinho").scrollIntoView({
        behavior: "smooth"
    });
}

function finalizar() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("🎉 Compra demonstrativa realizada!");

    limparCarrinho();
}

atualizarCarrinho();