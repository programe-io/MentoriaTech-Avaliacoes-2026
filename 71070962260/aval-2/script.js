
let carrinho = [];

function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {

    const itens = document.getElementById("itens");
    const quantidade = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");

    itens.innerHTML = "";

    let total = 0;

    quantidade.innerText = carrinho.length;

    if (carrinho.length === 0) {
        itens.innerHTML = "Seu carrinho está vazio.";
    }

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("div");

        const nome = document.createElement("span");
        nome.textContent = produto.nome;

        const preco = document.createElement("span");
        preco.textContent =
            " - R$ " + produto.preco.toFixed(2).replace(".", ",");

        const botao = document.createElement("button");
        botao.textContent = "Remover";
        botao.className = "remover";

        botao.onclick = function() {
            removerProduto(index);
        };

        item.append(nome, preco, botao);

        itens.appendChild(item);

    });

    totalElemento.innerText =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    let total = carrinho.reduce(
        (soma, produto) => soma + produto.preco,
        0
    );

    alert(
        "Pedido iniciado com sucesso!\n" +
        "Quantidade de produtos: " + carrinho.length +
        "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\nObrigado por comprar na Step Shoes!"
    );

}
