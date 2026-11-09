
let carrinho = [];
let total = 0;

function mostrarMensagem() {
    alert("Bem-vindo à NovaStore!");
}

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    carrinho.forEach(function(produto, indice) {
        let item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace(".", ",")}
            <button onclick="removerProduto(${indice})">
                Remover
            </button>
        `;

        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function removerProduto(indice) {
    total -= carrinho[indice].preco;

    carrinho.splice(indice, 1);

    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let confirmacao = confirm(
        "O total da sua compra é R$ " +
        total.toFixed(2).replace(".", ",") +
        ". Deseja finalizar o pedido?"
    );

    if (confirmacao) {
        alert(
            "Compra realizada com sucesso!\n" +
            "Obrigado por comprar na NovaStore!"
        );

        carrinho = [];
        total = 0;

        atualizarCarrinho();
    }
}
