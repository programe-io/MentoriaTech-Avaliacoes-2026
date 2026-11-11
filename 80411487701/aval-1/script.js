
// CARRINHO DE COMPRAS
let carrinho = [];

function comprar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert("✨ " + nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    let quantidade = carrinho.length;
    let total = 0;

    carrinho.forEach(function(produto) {
        total += produto.preco;
    });

    document.getElementById("quantidade").innerText = quantidade;

    document.getElementById("total").innerText =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// MOSTRAR PRODUTOS DO CARRINHO
function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🛍️ SEU CARRINHO:\n\n";

    carrinho.forEach(function(produto, indice) {
        mensagem += (indice + 1) + " - " +
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",") + "\n";
    });

    mensagem += "\nTotal: " +
        carrinho.reduce((soma, produto) =>
            soma + produto.preco, 0
        ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    alert(mensagem);
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione algum perfume antes de finalizar!");
        return;
    }

    alert("💗 Obrigado por comprar na Essence Perfumaria!");

    carrinho = [];
    atualizarCarrinho();
}

// MENSAGEM DE BOAS-VINDAS
window.onload = function() {
    console.log("Bem-vindo à Essence Perfumaria!");
};

