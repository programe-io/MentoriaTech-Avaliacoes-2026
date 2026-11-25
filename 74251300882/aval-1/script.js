
const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        nome: "Relógio Digital",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        nome: "Tênis Esportivo",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        nome: "Mochila",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

let carrinho = [];

function mostrarProdutos() {
    const area = document.getElementById("produtos");

    area.innerHTML = produtos.map(p => `
        <div class="produto">
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco.toFixed(2)}</p>

            <button onclick="adicionar(${p.id})">
                + Adicionar ao carrinho
            </button>
        </div>
    `).join("");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);
    const existente = carrinho.find(p => p.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({...produto, quantidade: 1});
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
    const area = document.getElementById("itens");

    if (carrinho.length === 0) {
        area.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        area.innerHTML = carrinho.map(p => `
            <div class="item">
                <div>
                    <strong>${p.nome}</strong>
                    <p>R$ ${(p.preco * p.quantidade).toFixed(2)}</p>
                </div>

                <div class="quantidade">
                    <button onclick="alterarQuantidade(${p.id}, -1)">−</button>
                    <span>${p.quantidade}</span>
                    <button onclick="alterarQuantidade(${p.id}, 1)">+</button>
                </div>

                <button class="remover" onclick="remover(${p.id})">
                    Remover
                </button>
            </div>
        `).join("");
    }

    const total = carrinho.reduce(
        (soma, p) => soma + p.preco * p.quantidade, 0
    );

    const quantidade = carrinho.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    document.getElementById("total").textContent =
        total.toFixed(2);

    document.getElementById("contador").textContent =
        quantidade;
}

function abrirCarrinho() {
    document.getElementById("carrinho").scrollIntoView({
        behavior: "smooth"
    });
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione produtos antes de finalizar!");
        return;
    }

    alert("Compra demonstrativa realizada com sucesso!");

    carrinho = [];
    atualizarCarrinho();
}

mostrarProdutos();
atualizarCarrinho();
