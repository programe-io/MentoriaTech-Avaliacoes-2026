
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
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
    const lista = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total");
    const quantidadeElemento = document.getElementById("quantidade");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${item.nome}</strong><br>
                    ${item.quantidade} x R$ ${item.preco.toFixed(2).replace(".", ",")}
                </div>

                <button onclick="removerProduto(${index})">
                    Remover
                </button>
            </div>
        `;
    });

    totalElemento.innerText = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    quantidadeElemento.innerText = quantidadeTotal;
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

    let resumo = "PEDIDO - MULTI MARCAS086\n\n";
    let total = 0;

    carrinho.forEach(item => {
        resumo += `${item.quantidade}x ${item.nome} - ${
            (item.preco * item.quantidade).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        }\n`;

        total += item.preco * item.quantidade;
    });

    resumo += "\nTOTAL: " + total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    alert(resumo + "\n\nPedido demonstrativo realizado com sucesso!");

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}
