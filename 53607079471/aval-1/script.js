
let carrinho = [];

function adicionar(nome, preco) {

    let produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {

    let itens = document.getElementById("itens");
    let total = 0;
    let quantidadeTotal = 0;

    itens.innerHTML = "";

    carrinho.forEach((produto, index) => {

        let subtotal = produto.preco * produto.quantidade;

        total += subtotal;
        quantidadeTotal += produto.quantidade;

        itens.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${produto.nome}</strong>
                    <p>${produto.quantidade} x R$ ${produto.preco.toFixed(2)}</p>
                    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
                </div>

                <button class="remover"
                    onclick="remover(${index})">
                    Remover
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText =
        total.toFixed(2);

    document.getElementById("contador").innerText =
        quantidadeTotal;
}

function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function abrirCarrinho() {

    document.getElementById("carrinho")
        .classList.add("ativo");
}

function fecharCarrinho() {

    document.getElementById("carrinho")
        .classList.remove("ativo");
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    alert(
        "Pedido realizado com sucesso!\n" +
        "Total: R$ " + total.toFixed(2) +
        "\n\nEsta é uma demonstração de compra."
    );

    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}
