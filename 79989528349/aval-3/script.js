// CARRINHO DE COMPRAS
let carrinho = [];

// ADICIONAR PRODUTO
function comprar(nome, preco) {

    let produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    alert(nome + " foi adicionado ao carrinho!");

    atualizarCarrinho();
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    let lista = document.getElementById("lista");
    let total = document.getElementById("total");

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach(function(produto, index) {

        let item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} -
            R$ ${produto.preco.toFixed(2)}
            <button onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        lista.appendChild(item);

        valorTotal += produto.preco;
    });

    total.textContent =
        "Total: R$ " + valorTotal.toFixed(2);
}

// REMOVER PRODUTO
function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// LIMPAR CARRINHO
function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();

    alert("Carrinho limpo!");
}

// FINALIZAR COMPRA
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
        "🌱 AGRO SHOP\n\n" +
        "Compra realizada com sucesso!\n" +
        "Total: R$ " + total.toFixed(2) +
        "\n\nObrigado pela preferência!"
    );

    carrinho = [];

    atualizarCarrinho();
}