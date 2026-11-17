const produtos = [
    {
        id: 1,
        nome: "Blusa Um Ombro Só",
        preco: 59.90,
        foto: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600"
    },
    {
        id: 2,
        nome: "Corset Feminino",
        preco: 69.90,
        foto: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600"
    },
    {
        id: 3,
        nome: "Vestido Elegante",
        preco: 79.90,
        foto: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
    },
    {
        id: 4,
        nome: "Calça Pantalona",
        preco: 89.90,
        foto: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600"
    }
];

let carrinho = [];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {
    const area = document.getElementById("produtos");

    area.innerHTML = produtos.map(produto => `
        <div class="produto">
            <img src="${produto.foto}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${formatarMoeda(produto.preco)}</p>

            <button onclick="adicionar(${produto.id})">
                🛒 Adicionar ao Carrinho
            </button>
        </div>
    `).join("");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== id);
    }

    atualizarCarrinho();
}

function remover(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const area = document.getElementById("itens-carrinho");
    const total = document.getElementById("total");

    area.innerHTML = "";

    carrinho.forEach(item => {
        area.innerHTML += `
            <div class="item">
                <div>
                    <strong>${item.nome}</strong>
                    <p>${formatarMoeda(item.preco)}</p>
                </div>

                <div>
                    <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
                    ${item.quantidade}
                    <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                </div>

                <button onclick="remover(${item.id})">
                    Remover
                </button>
            </div>
        `;
    });

    const valorTotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    total.textContent = formatarMoeda(valorTotal);

    if (carrinho.length === 0) {
        area.innerHTML = "<p style='text-align:center'>Seu carrinho está vazio.</p>";
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const valorTotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    alert(
        "Bem-vinda à CHIK BOUTIQUE!\n" +
        "Total: " + formatarMoeda(valorTotal) +
        "\n\nCompra demonstrativa!"
    );

    carrinho = [];
    atualizarCarrinho();
}

mostrarProdutos();
atualizarCarrinho();