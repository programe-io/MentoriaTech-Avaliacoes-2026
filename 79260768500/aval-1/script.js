// CARRINHO DE COMPRAS
let carrinho = [];
let total = 0;

// ADICIONAR PRODUTO
function adicionar(nome, preco) {

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
    const quantidade = document.getElementById("quantidade");
    const valorTotal = document.getElementById("valor-total");

    lista.innerHTML = "";

    total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="remover(${index})">Remover</button>
        `;

        lista.appendChild(item);
    });

    quantidade.innerText = carrinho.length;

    valorTotal.innerText = "R$ " + total.toFixed(2);
}

// REMOVER PRODUTO
function remover(index) {

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
        "Compra demonstrativa realizada!\n" +
        "Total: R$ " + total.toFixed(2)
    );

    carrinho = [];

    atualizarCarrinho();
}