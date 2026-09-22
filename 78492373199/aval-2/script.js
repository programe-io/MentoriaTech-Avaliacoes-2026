// ===== CARRINHO =====
let carrinho = [];

// Adicionar produto
function adicionarCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(item => item.nome === nome);

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

// ===== ATUALIZAR CARRINHO =====
function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalElement = document.getElementById("total");
    const contador = document.getElementById("contador-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;

        total += subtotal;
        quantidadeTotal += item.quantidade;

        const div = document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                <p>
                    R$ ${item.preco.toFixed(2).replace(".", ",")}
                    × ${item.quantidade}
                </p>
            </div>

            <div>
                <button onclick="diminuirQuantidade(${index})">−</button>
                <button onclick="aumentarQuantidade(${index})">+</button>
                <button onclick="removerProduto(${index})">🗑️</button>
            </div>
        `;

        lista.appendChild(div);
    });

    if (totalElement) {
        totalElement.textContent =
            `R$ ${total.toFixed(2).replace(".", ",")}`;
    }

    if (contador) {
        contador.textContent = quantidadeTotal;
    }
}

// ===== AUMENTAR QUANTIDADE =====
function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    atualizarCarrinho();
}

// ===== DIMINUIR QUANTIDADE =====
function diminuirQuantidade(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    } else {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}

// ===== REMOVER PRODUTO =====
function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// ===== FINALIZAR PEDIDO =====
function finalizarPedido() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let resumo = "COMPROVANTE DO PEDIDO\n";
    resumo += "========================\n\n";

    let total = 0;

    carrinho.forEach(item => {

        const subtotal = item.preco * item.quantidade;

        resumo += `${item.nome}\n`;
        resumo += `Quantidade: ${item.quantidade}\n`;
        resumo += `Subtotal: R$ ${subtotal
            .toFixed(2)
            .replace(".", ",")}\n\n`;

        total += subtotal;
    });

    resumo += "========================\n";
    resumo += `TOTAL: R$ ${total.toFixed(2).replace(".", ",")}\n`;

    alert(resumo);

    // Limpar carrinho depois da compra
    carrinho = [];
    atualizarCarrinho();
}

// ===== BOTÃO DE LIMPAR =====
function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

// ===== ANIMAÇÃO DOS PRODUTOS =====
document.addEventListener("DOMContentLoaded", () => {

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {

        produto.addEventListener("click", () => {

            produto.style.transform = "scale(1.05)";

            setTimeout(() => {
                produto.style.transform = "";
            }, 200);

        });

    });

    atualizarCarrinho();
});