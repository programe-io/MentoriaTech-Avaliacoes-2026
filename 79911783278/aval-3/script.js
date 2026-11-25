let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado! 💗");
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        total += item.preco;

        let li = document.createElement("li");

        li.textContent =
            item.nome + " - R$ " +
            item.preco.toFixed(2).replace(".", ",");

        let remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.onclick = function() {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        li.appendChild(remover);
        lista.appendChild(li);
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function finalizar() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 💄");
        return;
    }

    alert("Obrigada por comprar na Pink Beauty! 💗");

    carrinho = [];
    atualizarCarrinho();
}