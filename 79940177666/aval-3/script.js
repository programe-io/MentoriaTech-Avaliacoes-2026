

// ===== CARRINHO DE COMPRAS =====

let carrinho = [];

// Formatar preço em reais
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Adicionar produto
function adicionar(index) {
    const produto = produtos[index];

    if (!produto) return;

    carrinho.push(produto);

    atualizarCarrinho();

    alert(produto.nome + " adicionado ao carrinho!");
}

// Remover produto
function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
    const itens = document.getElementById("itens");
    const totalElemento = document.getElementById("total");

    if (!itens || !totalElemento) return;

    let total = 0;

    itens.innerHTML = "";

    if (carrinho.length === 0) {
        itens.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("p");

        item.innerHTML = `
            ${produto.nome} - R$ ${formatarPreco(produto.preco)}
            <button onclick="remover(${index})"
                style="background:#e53935;color:white;border:0;
                padding:5px 8px;border-radius:5px;cursor:pointer;">
                Remover
            </button>
        `;

        itens.appendChild(item);
    });

    totalElemento.textContent = formatarPreco(total);
}

// ===== FINALIZAR PEDIDO =====

function finalizar() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = 0;

    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

    carrinho.forEach(produto => {
        mensagem += `- ${produto.nome}: R$ ${formatarPreco(produto.preco)}\n`;

        total += produto.preco;
    });

    mensagem += `\nTOTAL: R$ ${formatarPreco(total)}`;

    // Coloque aqui o WhatsApp da sua loja
    const telefone = "5500000000000";

    const link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");
}

// ===== INICIALIZAÇÃO =====

document.addEventListener("DOMContentLoaded", () => {
    if (typeof produtos !== "undefined") {
        carregarProdutos();
    }

    atualizarCarrinho();
});