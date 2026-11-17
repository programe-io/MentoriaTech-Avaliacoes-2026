let carrinho = [];

function adicionarCarrinho(nome, preco) {
    const produto = {
        nome: nome,
        preco: Number(preco)
    };

    carrinho.push(produto);

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const quantidade = document.getElementById("quantidade");
    const total = document.getElementById("total");

    if (quantidade) {
        quantidade.textContent = carrinho.length;
    }

    if (total) {
        const valorTotal = carrinho.reduce(
            (soma, produto) => soma + produto.preco,
            0
        );

        total.textContent = valorTotal.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

    carrinho.forEach((produto, index) => {
        mensagem += `${index + 1}. ${produto.nome} - ${
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        }\n`;
    });

    const total = carrinho.reduce(
        (soma, produto) => soma + produto.preco,
        0
    );

    mensagem += `\nTotal: ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })}`;

    const telefone = "5586999999999";

    const url = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
    alert("Carrinho esvaziado!");
}