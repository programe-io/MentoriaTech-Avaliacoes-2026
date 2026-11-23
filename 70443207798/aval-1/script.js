
let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({ nome, preco });
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
                <button onclick="remover(${index})">Remover</button>
            </p>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2);

    document.getElementById("quantidade").textContent =
        carrinho.length;
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("carrinho")
        .scrollIntoView({ behavior: "smooth" });
}

function pesquisar() {
    let texto = document.getElementById("pesquisa")
        .value.toLowerCase();

    let produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        let nome = produto.dataset.nome;

        produto.style.display =
            nome.includes(texto) ? "block" : "none";
    });
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
