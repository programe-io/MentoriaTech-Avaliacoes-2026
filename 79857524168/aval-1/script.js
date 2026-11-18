
let carrinho = [];
let total = 0;

function comprar(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    carrinho.forEach((produto, index) => {
        const item = document.createElement("li");

        item.textContent =
            produto.nome + " - " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.onclick = () => {
            total -= produto.preco;
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra simulada com sucesso! Total: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));

    carrinho = [];
    total = 0;
    atualizarCarrinho();
}
