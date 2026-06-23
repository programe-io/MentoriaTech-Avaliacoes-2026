// Carrinho
let carrinho = [];
let total = 0;

// Função para adicionar produto
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();
}

// Atualiza a exibição do carrinho
function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach((produto, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="removerProduto(${index})">❌</button>
        `;
        lista.appendChild(item);
    });

    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remove produto
function removerProduto(indice) {
    total -= carrinho[indice].preco;
    carrinho.splice(indice, 1);

    atualizarCarrinho();
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(`Compra finalizada!\nValor total: R$ ${total.toFixed(2)}`);

    carrinho = [];
    total = 0;

    atualizarCarrinho();
}