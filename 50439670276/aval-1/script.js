let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const quantidade = document.getElementById("quantidade");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((produto, index) => {

        valorTotal += produto.preco;

        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `
            <span>${produto.nome}</span>
            <span>
                R$ ${produto.preco.toFixed(2)}
                <button onclick="removerProduto(${index})">❌</button>
            </span>
        `;

        lista.appendChild(item);
    });

    quantidade.textContent = carrinho.length;
    total.textContent = valorTotal.toFixed(2);
}

function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("carrinho").style.display = "block";
}

function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let totalCompra = carrinho.reduce(
        (total, produto) => total + produto.preco,
        0
    );

    alert(
        "Compra realizada com sucesso!\n\n" +
        "Total: R$ " + totalCompra.toFixed(2)
    );

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}