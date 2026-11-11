
// CARRINHO DE COMPRAS
let carrinho = [];

// ADICIONAR PRODUTOS
function comprar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert("💗 " + nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR QUANTIDADE E VALOR
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

// MOSTRAR CARRINHO
function mostrarCarrinho() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛍️");
        return;
    }

    let mensagem = "🛍️ BELLA MODA - SEU CARRINHO\n\n";

    carrinho.forEach(function(produto, indice) {

        mensagem += (indice + 1) + " - " +
            produto.nome + " | " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }) + "\n";

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

// REMOVER ÚLTIMO PRODUTO
function removerProduto() {

    if (carrinho.length === 0) {
        alert("Não existem produtos para remover!");
        return;
    }

    let removido = carrinho.pop();

    atualizarCarrinho();

    alert(removido.nome + " foi removido do carrinho!");
}

// FINALIZAR COMPRA
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Adicione algum produto antes de finalizar!");
        return;
    }

    let total = carrinho.reduce((soma, produto) =>
        soma + produto.preco, 0
    );

    alert(
        "✨ Obrigado por comprar na Bella Moda!\n\n" +
        "Total da sua compra: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) +
        "\n\nSua compra demonstrativa foi finalizada! 💗"
    );

    carrinho = [];

    atualizarCarrinho();
}

// MENSAGEM NO CONSOLE
console.log("Bem-vinda à Bella Moda Boutique! 💗");
