
const produtos = [
    { nome: "Cadeira Gamer", preco: 899, quantidade: 1, carrinho: 0 },
    { nome: "Monitor Gamer", preco: 1299, quantidade: 1, carrinho: 0 },
    { nome: "Teclado Mecânico", preco: 299, quantidade: 1, carrinho: 0 },
    { nome: "Mouse Gamer", preco: 149, quantidade: 1, carrinho: 0 }
];

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function alterar(id, valor) {
    produtos[id].quantidade += valor;

    if (produtos[id].quantidade < 1) {
        produtos[id].quantidade = 1;
    }

    document.getElementById("qtd-" + id).innerText =
        produtos[id].quantidade;
}

function adicionar(id) {
    produtos[id].carrinho += produtos[id].quantidade;
    atualizarCarrinho();

    alert(produtos[id].nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
    let total = 0;
    let quantidadeTotal = 0;

    let lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        if (produto.carrinho > 0) {
            let subtotal = produto.preco * produto.carrinho;

            total += subtotal;
            quantidadeTotal += produto.carrinho;

            lista.innerHTML += `
                <div class="item-carrinho">
                    <span>
                        ${produto.nome} (${produto.carrinho}x)
                    </span>
                    <strong>${dinheiro(subtotal)}</strong>
                </div>
            `;
        }
    });

    if (quantidadeTotal === 0) {
        lista.innerHTML = "Nenhum produto adicionado.";
    }

    document.getElementById("itens").innerText = quantidadeTotal;
    document.getElementById("itensResumo").innerText = quantidadeTotal;
    document.getElementById("valorTotal").innerText = dinheiro(total);
}

function limparCarrinho() {
    produtos.forEach(produto => {
        produto.carrinho = 0;
    });

    atualizarCarrinho();
    alert("Carrinho limpo!");
}

function finalizarCompra() {
    let quantidade = produtos.reduce(
        (soma, produto) => soma + produto.carrinho, 0
    );

    if (quantidade === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = produtos.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.carrinho, 0
    );

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: " + dinheiro(total)
    );

    limparCarrinho();
}

atualizarCarrinho();
