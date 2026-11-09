
let carrinho = [];
let total = 0;

// Adicionar produto ao carrinho
function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// Atualizar informações do carrinho
function atualizarCarrinho() {
    document.getElementById("quantidade").innerText = carrinho.length;

    document.getElementById("total").innerText =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    let lista = document.getElementById("lista-carrinho");

    lista.innerHTML = "";

    carrinho.forEach((produto, index) => {
        let item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="removerProduto(${index})">Remover</button>
        `;

        lista.appendChild(item);
    });
}

// Remover produto do carrinho
function removerProduto(index) {
    total -= carrinho[index].preco;

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
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
    total = 0;

    atualizarCarrinho();
}
