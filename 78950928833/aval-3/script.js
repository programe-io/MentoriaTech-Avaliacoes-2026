
let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({ nome, preco });

    document.getElementById("quantidade").textContent =
        carrinho.length;

    alert(nome + " adicionado ao carrinho! 💗");
}

function verCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let texto = "SEU CARRINHO:\n\n";
    let total = 0;

    carrinho.forEach((produto, indice) => {
        texto += `${indice + 1}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}\n`;
        total += produto.preco;
    });

    texto += `\nTOTAL: R$ ${total.toFixed(2)}`;

    alert(texto);
}

// PESQUISAR PRODUTOS
document.getElementById("pesquisa").addEventListener("input", function() {
    let busca = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        let nome = card.querySelector("h3").textContent.toLowerCase();

        card.style.display = nome.includes(busca) ? "block" : "none";
    });
});
