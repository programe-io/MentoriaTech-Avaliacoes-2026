// LOJA ALEX

let carrinho = [];
let total = 0;

// ADICIONAR PRODUTO AO CARRINHO
function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const valorTotal = document.getElementById("valor-total");
    const quantidade = document.getElementById("quantidade");

    if (!lista || !valorTotal || !quantidade) return;

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        const remover = document.createElement("button");

        remover.textContent = "Remover";

        remover.onclick = function() {
            removerProduto(index);
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    valorTotal.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");

    quantidade.textContent = carrinho.length;
}

// REMOVER PRODUTO
function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Obrigado por comprar na ALEX!\n" +
        "Total da compra: R$ " +
        total.toFixed(2).replace(".", ",")
    );
}

// MENSAGEM DE BOAS-VINDAS
console.log("Bem-vindo à loja ALEX!");