
let carrinho = [];

function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizar();

    alert(nome + " adicionado ao carrinho!");
}

function atualizar() {

    let itens = document.getElementById("itens");
    let quantidade = document.getElementById("quantidade");
    let totalElemento = document.getElementById("total");

    itens.innerHTML = "";

    let total = 0;

    quantidade.textContent = carrinho.length;

    if (carrinho.length === 0) {
        itens.innerHTML = "Seu carrinho está vazio.";
    }

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        let item = document.createElement("div");

        item.innerHTML = `
            ${produto.nome} -
            R$ ${produto.preco.toFixed(2).replace(".", ",")}

            <button onclick="remover(${index})">
                Remover
            </button>
        `;

        itens.appendChild(item);
    });

    totalElemento.textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function remover(index) {

    carrinho.splice(index, 1);

    atualizar();
}

function finalizar() {

    if (carrinho.length === 0) {
        alert("Adicione um celular ao carrinho primeiro!");
        return;
    }

    let total = carrinho.reduce(
        (soma, produto) => soma + produto.preco, 0
    );

    alert(
        "Pedido realizado como demonstração!\n" +
        "Quantidade: " + carrinho.length +
        "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",")
    );

}
