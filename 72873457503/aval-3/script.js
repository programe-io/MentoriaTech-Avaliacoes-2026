
let carrinho = [];
let total = 0;

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2);

        const remover = document.createElement("button");

        remover.textContent = "Remover";
        remover.style.marginLeft = "10px";

        remover.onclick = () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toFixed(2);

    document.getElementById("quantidade").textContent =
        carrinho.length;
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}
