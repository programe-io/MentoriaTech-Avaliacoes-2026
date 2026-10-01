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

    const lista = document.getElementById("lista-carrinho");
    const quantidade = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </div>

            <button class="remover" onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        lista.appendChild(item);
    });

    quantidade.textContent = carrinho.length;

    totalElemento.textContent = total
        .toFixed(2)
        .replace(".", ",");
}

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function abrirCarrinho() {

    document.getElementById("carrinho").style.display = "flex";
}

function fecharCarrinho() {

    document.getElementById("carrinho").style.display = "none";
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra realizada com sucesso!");

    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}
