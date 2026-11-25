
const produtos = [
    {
        id: 1,
        nome: "Tênis Esportivo",
        preco: 150,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 2,
        nome: "Relógio",
        preco: 90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        nome: "Fone de Ouvido",
        preco: 120,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 4,
        nome: "Mochila",
        preco: 80,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    }
];

let carrinho = [];

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = produtos.map(p => `
        <div class="produto">
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
            <p class="estoque">
                Estoque disponível: ${p.estoque}
            </p>
            <button
                onclick="adicionar(${p.id})"
                ${p.estoque === 0 ? "disabled" : ""}>
                Adicionar ao carrinho
            </button>
        </div>
    `).join("");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(p => p.id === id);

    if (item && item.quantidade >= produto.estoque) {
        alert("Quantidade máxima disponível!");
        return;
    }

    if (produto.estoque === 0) {
        alert("Produto sem estoque!");
        return;
    }

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    mostrarCarrinho();
}

function remover(id) {
    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade--;

        if (item.quantidade === 0) {
            carrinho = carrinho.filter(p => p.id !== id);
        }
    }

    mostrarCarrinho();
}

function mostrarCarrinho() {
    const div = document.getElementById("itensCarrinho");

    if (carrinho.length === 0) {
        div.innerHTML = "Seu carrinho está vazio.";
    } else {
        div.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <strong>${item.nome}</strong>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Subtotal: R$ ${
                    (item.preco * item.quantidade).toFixed(2)
                }</p>
                <button onclick="remover(${item.id})">
                    Remover 1
                </button>
            </div>
        `).join("");
    }

    const total = carrinho.reduce(
        (soma, item) =>
            soma + item.preco * item.quantidade, 0
    );

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    carrinho.forEach(item => {
        const produto = produtos.find(p => p.id === item.id);
        produto.estoque -= item.quantidade;
    });

    alert("Compra realizada com sucesso!");

    carrinho = [];
    mostrarProdutos();
    mostrarCarrinho();
}

mostrarProdutos();
mostrarCarrinho();
