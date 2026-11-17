
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("li");

        item.textContent =
            produto.nome + " - " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.style.marginLeft = "10px";

        remover.onclick = function() {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    totalElemento.textContent = total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    contador.textContent = carrinho.length;
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra simulada com sucesso! Obrigado pela preferência.");

    carrinho = [];
    atualizarCarrinho();
}

// Pesquisa de produtos
document.getElementById("pesquisa").addEventListener("input", function() {
    const pesquisa = this.value.toLowerCase();

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        const nome = produto.dataset.nome.toLowerCase();

        produto.style.display = nome.includes(pesquisa)
            ? "block"
            : "none";
    });
});
