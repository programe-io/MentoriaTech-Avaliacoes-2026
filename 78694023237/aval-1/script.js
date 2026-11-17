
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
    document.getElementById("quantidade").textContent =
        carrinho.length;
}

function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "SEU CARRINHO:\n\n";
    let total = 0;

    carrinho.forEach((produto, index) => {
        mensagem += (index + 1) + ". " +
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",") + "\n";

        total += produto.preco;
    });

    mensagem += "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",");

    mensagem += "\n\nObrigado por comprar na Glamour Beauty!";

    alert(mensagem);
}
