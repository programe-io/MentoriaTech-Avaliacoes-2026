
let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    let itens = document.getElementById("itens");
    let total = 0;

    itens.innerHTML = "";

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        itens.innerHTML += `
            <p>
                ${produto.nome} - R$ ${produto.preco.toFixed(2)}
                <button onclick="remover(${index})">
                    Remover
                </button>
            </p>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");

    document.getElementById("quantidade").textContent =
        carrinho.length;
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("carrinho").scrollIntoView({
        behavior: "smooth"
    });
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra realizada como demonstração! Obrigado por comprar na VesteBem.");

    carrinho = [];
    atualizarCarrinho();
}
