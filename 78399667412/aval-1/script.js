// Carrinho
let carrinho = [];
let totalItens = 0;

// Atualiza o contador do carrinho
function atualizarCarrinho() {
    const contador = document.getElementById("contador-carrinho");

    if (contador) {
        contador.textContent = totalItens;
    }
}

// Adiciona produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    totalItens++;

    atualizarCarrinho();

    alert(`${nome} foi adicionado ao carrinho!`);
}

// Exibe os produtos do carrinho
function verCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem = "🛒 Carrinho de Compras:\n\n";
    let total = 0;

    carrinho.forEach((produto, index) => {
        mensagem += `${index + 1}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}\n`;
        total += produto.preco;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    alert(mensagem);
}

// Atualiza ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
});