
let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const quantidade = document.getElementById("quantidade");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace(".", ",")}
            <button onclick="removerProduto(${index})"
            style="width:auto; margin-left:10px; padding:5px 10px;">
                Remover
            </button>
        `;

        lista.appendChild(item);
    });

    quantidade.textContent = carrinho.length;

    totalElemento.textContent = total.toFixed(2).replace(".", ",");
}

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Obrigado pela compra!\n\n";

    carrinho.forEach(produto => {
        mensagem += produto.nome + " - R$ " +
        produto.preco.toFixed(2).replace(".", ",") + "\n";
    });

    mensagem += "\nTotal: R$ " +
    total.toFixed(2).replace(".", ",");

    alert(mensagem);

    carrinho = [];

    atualizarCarrinho();
}
