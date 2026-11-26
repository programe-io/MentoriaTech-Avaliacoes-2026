
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade, 0
    );

    document.getElementById("quantidade").textContent = quantidade;

    console.log("Carrinho:", carrinho);
}

function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade, 0
    );
}
