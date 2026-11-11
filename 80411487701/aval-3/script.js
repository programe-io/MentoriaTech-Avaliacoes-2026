
// CARRINHO DE COMPRAS
let carrinho = [];

// ADICIONAR DOCE AO CARRINHO
function comprar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert("🍬 " + nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    let quantidade = carrinho.length;

    let total = carrinho.reduce(function(soma, produto) {
        return soma + produto.preco;
    }, 0);

    document.getElementById("quantidade").innerText = quantidade;

    document.getElementById("total").innerText =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// MOSTRAR PRODUTOS
function mostrarCarrinho() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🍭");
        return;
    }

    let mensagem = "🍬 SWEET CANDY - SEU CARRINHO\n\n";

    carrinho.forEach(function(produto, indice) {

        mensagem += (indice + 1) + " - " +
            produto.nome + " | " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }) + "\n";

    });

    let total = carrinho.reduce(function(soma, produto) {
        return soma + produto.preco;
    }, 0);

    mensagem += "\nTOTAL: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    alert(mensagem);
}

// REMOVER ÚLTIMO DOCE
function removerProduto() {

    if (carrinho.length === 0) {
        alert("Não existem doces no carrinho!");
        return;
    }

    let removido = carrinho.pop();

    atualizarCarrinho();

    alert(removido.nome + " foi removido! 🍫");
}

// FINALIZAR COMPRA
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Adicione algum doce antes de finalizar!");
        return;
    }

    let total = carrinho.reduce(function(soma, produto) {
        return soma + produto.preco;
    }, 0);

    alert(
        "🍭 SWEET CANDY 🍭\n\n" +
        "Compra finalizada com sucesso!\n\n" +
        "Valor total: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) +
        "\n\nObrigado pela preferência! 💗"
    );

    carrinho = [];

    atualizarCarrinho();
}

// MENSAGEM DE BOAS-VINDAS
window.onload = function() {
    console.log("Bem-vindo à Sweet Candy! 🍬");
};
