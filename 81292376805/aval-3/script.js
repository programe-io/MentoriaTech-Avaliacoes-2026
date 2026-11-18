

let carrinho = [];

// ADICIONAR PRODUTO
function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " adicionado ao pedido!");
}


// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    const lista = document.getElementById("lista");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco;

        lista.innerHTML += `
            <p>
                ${item.nome} -
                ${
                    item.preco > 0
                    ? "R$ " + item.preco.toFixed(2)
                    : "Preço a consultar"
                }

                <button onclick="remover(${index})">
                    X
                </button>
            </p>
        `;
    });

    totalElemento.textContent = total.toFixed(2);
}


// REMOVER PRODUTO
function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// FINALIZAR PEDIDO
function finalizar() {

    if (carrinho.length === 0) {

        alert("Adicione um produto primeiro!");

        return;
    }

    let mensagem =
        "Olá! Quero fazer um pedido na LANCHONETE POSTO 30:%0A%0A";

    let total = 0;

    carrinho.forEach(item => {

        mensagem +=
            "- " + item.nome + ": " +
            (
                item.preco > 0
                ? "R$ " + item.preco.toFixed(2)
                : "Preço a consultar"
            ) + "%0A";

        total += item.preco;
    });

    mensagem +=
        "%0ATotal dos produtos com preço definido: R$ " +
        total.toFixed(2);

    // COLOQUE SEU WHATSAPP AQUI
    const telefone = "5500000000000";

    window.open(
        "https://wa.me/" + telefone + "?text=" + mensagem,
        "_blank"
    );
}

console.log("LANCHONETE POSTO 30 carregada!");
