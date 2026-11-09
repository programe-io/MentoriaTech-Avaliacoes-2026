let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
    let itens = document.getElementById("itens");
    let total = 0;

    itens.innerHTML = "";

    carrinho.forEach(function(produto, index) {
        total += produto.preco;

        itens.innerHTML += `
            <p>
                ${produto.nome} -
                R$ ${produto.preco.toFixed(2)}
                <button onclick="remover(${index})">
                    REMOVER
                </button>
            </p>
        `;
    });

    document.getElementById("total").innerText =
        total.toFixed(2).replace(".", ",");
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "PEDIDO TUÊ STREETWEAR\n\n";
    let total = 0;

    carrinho.forEach(function(produto) {
        mensagem += produto.nome + " - R$ " +
            produto.preco.toFixed(2) + "\n";

        total += produto.preco;
    });

    mensagem += "\nTOTAL: R$ " + total.toFixed(2);

    alert(mensagem + "\n\nPedido realizado com sucesso!");

    carrinho = [];
    atualizarCarrinho();
}
