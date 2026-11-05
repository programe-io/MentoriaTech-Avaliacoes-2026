
let carrinho = [];
let quantidade = 0;
let total = 0;

// ADICIONAR PRODUTOS AO CARRINHO
function adicionarCarrinho(preco, nome) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    quantidade++;
    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR QUANTIDADE E VALOR TOTAL
function atualizarCarrinho() {
    document.getElementById("quantidade").textContent = quantidade;

    document.getElementById("total").textContent =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// MOSTRAR OS PRODUTOS DO CARRINHO
function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "PRODUTOS NO CARRINHO:\n\n";

    carrinho.forEach(function(produto, indice) {
        mensagem += (indice + 1) + ". " + produto.nome +
            " - " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }) + "\n";
    });

    mensagem += "\nTotal: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    alert(mensagem);
}

// REMOVER UM PRODUTO DO CARRINHO
function removerProduto(indice) {
    if (indice >= 0 && indice < carrinho.length) {
        let produto = carrinho[indice];

        total -= produto.preco;
        quantidade--;

        carrinho.splice(indice, 1);

        atualizarCarrinho();
    }
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione produtos antes de finalizar a compra!");
        return;
    }

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    );

    carrinho = [];
    quantidade = 0;
    total = 0;

    atualizarCarrinho();
}
