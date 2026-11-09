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

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("quantidade").textContent = carrinho.length;
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

    alert("Compra simulada realizada com sucesso! Obrigado por comprar na Shop Fácil.");

    carrinho = [];
    atualizarCarrinho();
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let busca = this.value.toLowerCase();
    let produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        let nome = produto.querySelector("h3").textContent.toLowerCase();

        produto.style.display = nome.includes(busca) ? "block" : "none";
    });
});
