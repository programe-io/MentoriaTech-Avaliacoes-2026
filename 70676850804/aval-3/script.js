let carrinho = [];

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho! 💄");
}

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const quantidade = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `
            <span>${produto.nome}</span>

            <span>
                R$ ${produto.preco.toFixed(2)}
                <button onclick="removerProduto(${index})">
                    ❌
                </button>
            </span>
        `;

        lista.appendChild(item);
    });

    quantidade.textContent = carrinho.length;

    totalElemento.textContent = total.toFixed(2);
}

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function abrirCarrinho() {

    document.getElementById("carrinhoModal").style.display = "flex";
}

function fecharCarrinho() {

    document.getElementById("carrinhoModal").style.display = "none";
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    alert("Compra realizada com sucesso! 💕");

    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}