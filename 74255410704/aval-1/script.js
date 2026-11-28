
const produtos = [
    {
        id: 1,
        nome: "Camisa Casual",
        preco: 59.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 2,
        nome: "Tênis Esportivo",
        preco: 129.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 3,
        nome: "Mochila Escolar",
        preco: 79.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 4,
        nome: "Relógio Moderno",
        preco: 99.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 5,
        nome: "Fone de Ouvido",
        preco: 49.90,
        estoque: 20,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 6,
        nome: "Óculos de Sol",
        preco: 39.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let carrinho = [];

const dinheiro = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = produtos.map(p => `
        <div class="produto">
            <img src="${p.imagem}" alt="${p.nome}">
            <div class="info">
                <h3>${p.nome}</h3>
                <p class="preco">${dinheiro(p.preco)}</p>
                <p class="${p.estoque > 0 ? 'disponivel' : 'esgotado'}">
                    ${p.estoque > 0
                        ? `${p.estoque} unidades disponíveis`
                        : "Produto esgotado"}
                </p>
                <button onclick="adicionar(${p.id})"
                    ${p.estoque <= 0 ? "disabled" : ""}>
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    `).join("");
}

function mostrarEstoque() {
    document.getElementById("listaEstoque").innerHTML =
        produtos.map(p => `
            <div class="estoque-item">
                <strong>${p.nome}</strong>
                <span>${p.estoque} unidades</span>
            </div>
        `).join("");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);

    if (produto.estoque <= 0) {
        alert("Produto sem estoque!");
        return;
    }

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    produto.estoque--;

    atualizar();
}

function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);
    const produto = produtos.find(p => p.id === id);

    if (!item) return;

    if (valor > 0) {
        if (produto.estoque <= 0) {
            alert("Não há mais unidades disponíveis!");
            return;
        }

        item.quantidade++;
        produto.estoque--;
    } else {
        item.quantidade--;
        produto.estoque++;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.id !== id);
        }
    }

    atualizar();
}

function atualizar() {
    const lista = document.getElementById("itensCarrinho");

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        lista.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <img src="${item.imagem}">
                <div>
                    <strong>${item.nome}</strong>
                    <p>${dinheiro(item.preco)}</p>
                    <div class="quantidade">
                        <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
                        ${item.quantidade}
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    document.getElementById("total").textContent = dinheiro(total);
    document.getElementById("subtotal").textContent = dinheiro(total);

    document.getElementById("contador").textContent =
        carrinho.reduce((soma, item) => soma + item.quantidade, 0);

    mostrarProdutos();
    mostrarEstoque();
}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("ativo");
    document.getElementById("fundo").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("ativo");
    document.getElementById("fundo").classList.remove("ativo");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione produtos ao carrinho primeiro!");
        return;
    }

    alert("Compra simulada com sucesso! Obrigado pela preferência.");

    carrinho = [];
    atualizar();
    fecharCarrinho();
}

mostrarProdutos();
mostrarEstoque();
atualizar();
