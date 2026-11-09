
// CONFIGURAÇÃO DA LOJA
const numeroWhatsApp = "5586999999999";

let carrinho = [];

// ADICIONAR PRODUTO
function comprar(nome, preco) {
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

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("total");
    const quantidadeElemento = document.getElementById("quantidade");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${produto.nome}</span>
                <span>${produto.quantidade}x</span>
                <span>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</span>
                <button onclick="removerProduto(${index})">
                    Remover
                </button>
            </div>
        `;
    });

    totalElemento.textContent = total.toFixed(2);
    quantidadeElemento.textContent = quantidadeTotal;
}

// REMOVER PRODUTO
function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// FINALIZAR PEDIDO
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero fazer este pedido:\n\n";
    let total = 0;

    carrinho.forEach(produto => {
        mensagem += `${produto.nome} - ${produto.quantidade}x - R$ ${(produto.preco * produto.quantidade).toFixed(2)}\n`;

        total += produto.preco * produto.quantidade;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

// ABRIR E FECHAR CARRINHO
function abrirCarrinho() {
    document.getElementById("carrinho").style.display = "block";
}

function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
}
