/* CARRINHO DE COMPRAS */

let carrinho = [];
let total = 0;

// FUNÇÃO PARA COMPRAR PRODUTO
function comprar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    let quantidade = carrinho.length;

    document.getElementById("quantidade").innerText = quantidade;

    document.getElementById("total").innerText =
        "R$ " + total.toFixed(2).replace(".", ",");
}

// MOSTRAR PRODUTOS DO CARRINHO
function mostrarCarrinho() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Produtos no carrinho:\n\n";

    carrinho.forEach(function(produto, index) {

        mensagem += (index + 1) + ". " +
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",") +
            "\n";

    });

    mensagem += "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",");

    alert(mensagem);
}

// FINALIZAR COMPRA
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Adicione algum produto antes de finalizar!");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: R$ " +
        total.toFixed(2).replace(".", ",")
    );

    carrinho = [];
    total = 0;

    atualizarCarrinho();
}

// LIMPAR CARRINHO
function limparCarrinho() {

    carrinho = [];
    total = 0;

    atualizarCarrinho();

    alert("Carrinho limpo!");
}