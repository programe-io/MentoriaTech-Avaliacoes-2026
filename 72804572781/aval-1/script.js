
const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        preco: 129.90,
        categoria: "Eletrônicos",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        nome: "Smartwatch",
        preco: 199.90,
        categoria: "Eletrônicos",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        nome: "Tênis Casual",
        preco: 159.90,
        categoria: "Moda",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        nome: "Mochila",
        preco: 89.90,
        categoria: "Acessórios",
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        nome: "Óculos de Sol",
        preco: 79.90,
        categoria: "Acessórios",
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 6,
        nome: "Camiseta",
        preco: 59.90,
        categoria: "Moda",
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    }
];

let carrinho = [];
let categoriaAtual = "Todos";

function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos(lista = produtos) {
    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach(produto => {
        container.innerHTML += `
            <div class="produto">
                <img src="${produto.imagem}"
                     alt="${produto.nome}"
                     loading="lazy">

                <div class="info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.categoria}</p>

                    <div class="preco">
                        ${formatar(produto.preco)}
                    </div>

                    <button class="adicionar"
                        onclick="adicionarCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

function adicionarCarrinho(id) {
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
    alert("Produto adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const container = document.getElementById("itensCarrinho");

    container.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        container.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${item.nome}</strong><br>
                    ${formatar(item.preco)}
                    <br>
                    Quantidade: ${item.quantidade}
                </div>

                <div>
                    <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
                    <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    <button onclick="removerItem(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").textContent = formatar(total);
    document.getElementById("contador").textContent = quantidadeTotal;
}

function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerItem(id);
    } else {
        atualizarCarrinho();
    }
}

function removerItem(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("modalCarrinho").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("modalCarrinho").style.display = "none";
}

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    filtrarProdutos();
}

function filtrarProdutos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const filtrados = produtos.filter(produto => {
        const combinaNome = produto.nome.toLowerCase().includes(pesquisa);

        const combinaCategoria =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        return combinaNome && combinaCategoria;
    });

    mostrarProdutos(filtrados);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const numeroWhatsApp = "5511999999999";

    let mensagem = "Olá! Quero fazer um pedido:\n\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - Quantidade: ${item.quantidade}\n`;
        mensagem += `Subtotal: ${formatar(item.preco * item.quantidade)}\n\n`;
    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    mensagem += `TOTAL: ${formatar(total)}`;

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

mostrarProdutos();
atualizarCarrinho();
