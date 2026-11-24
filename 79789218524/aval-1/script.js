
let carrinho = [];
let total = 0;

function comprar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");

    lista.innerHTML = "";

    carrinho.forEach(produto => {

        let item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    document.getElementById("pagamento").style.display = "block";

    document.getElementById("valorPagamento").textContent =
        "Valor total: R$ " +
        total.toFixed(2).replace(".", ",");

    document.getElementById("pagamento").scrollIntoView({
        behavior: "smooth"
    });
}

function confirmarPedido() {

    let nome = document.getElementById("nomeCliente").value;
    let pagamento = document.getElementById("formaPagamento").value;

    if (nome.trim() === "" || pagamento === "") {
        alert("Preencha seu nome e escolha a forma de pagamento!");
        return;
    }

    alert(
        "PEDIDO CONFIRMADO!\n\n" +
        "Cliente: " + nome +
        "\nPagamento: " + pagamento +
        "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\nObrigado por comprar na SPORT DESIGN ART!"
    );

    carrinho = [];
    total = 0;

    atualizarCarrinho();

    document.getElementById("pagamento").style.display = "none";
    document.getElementById("nomeCliente").value = "";
    document.getElementById("formaPagamento").value = "";
}
