
const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        categoria: "Eletrônicos",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nome: "Smartwatch",
        categoria: "Eletrônicos",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nome: "Tênis Casual",
        categoria: "Moda",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nome: "Mochila Urbana",
        categoria: "Acessórios",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nome: "Óculos de Sol",
        categoria: "Acessórios",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nome: "Câmera Digital",
        categoria: "Eletrônicos",
        preco: 349.90,
        imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nome: "Camiseta Básica",
        categoria: "Moda",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nome: "Tênis Esportivo",
        categoria: "Moda",
        preco: 219.90,
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    }
];

let carrinho = [];
let categoriaAtual = "Todos";

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe os produtos na tela
function mostrarProdutos(lista = produtos) {
    const container = document.getElementById("listaProdutos");

    if (lista.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                Nenhum produto encontrado.
            </p>
        `;
        return;
    }

    container.innerHTML = lista.map(produto => `
        <div class="product-card">
            <div class="product-image">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >
            </div>

            <div class="product-info">
                <span class="product-category">
                    ${produto.categoria}
                </span>

                <h3>${produto.nome}</h3>

                <div class="product-price">
                    ${formatarPreco(produto.preco)}
                </div>

                <button
                    class="add-button"
                    onclick="adicionarCarrinho(${produto.id})"
                >
                    + Adicionar ao carrinho
                </button>
            </div>
        </div>
    `).join("");
}

// Pesquisa por nome ou categoria
function filtrarProdutos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const resultado = produtos.filter(produto => {
        const correspondePesquisa =
            produto.nome.toLowerCase().includes(pesquisa) ||
            produto.categoria.toLowerCase().includes(pesquisa);

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        return correspondePesquisa && correspondeCategoria;
    });

    mostrarProdutos(resultado);
}

// Filtro por categoria
function filtrarCategoria(categoria, botao) {
    categoriaAtual = categoria;

    document.querySelectorAll(".category").forEach(item => {
        item.classList.remove("active");
    });

    botao.classList.add("active");

    filtrarProdutos();
}

// Adiciona produtos ao carrinho
function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

// Aumenta ou diminui a quantidade
function alterarQuantidade(id, quantidade) {
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += quantidade;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarCarrinho();
}

// Remove um produto
function removerProduto(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);

    atualizarCarrinho();
}

// Atualiza o carrinho
function atualizarCarrinho() {
    const container = document.getElementById("itensCarrinho");

    const contador = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    document.getElementById("contador").textContent = contador;

    if (carrinho.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                Seu carrinho está vazio 🛒
            </p>
        `;
    } else {
        container.innerHTML = carrinho.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.nome}</h4>

                    <p>${formatarPreco(item.preco)}</p>

                    <div class="quantity">
                        <button
                            onclick="alterarQuantidade(${item.id}, -1)"
                        >−</button>

                        <span>${item.quantidade}</span>

                        <button
                            onclick="alterarQuantidade(${item.id}, 1)"
                        >+</button>
                    </div>

                    <button
                        class="remove-button"
                        onclick="removerProduto(${item.id})"
                    >
                        Remover produto
                    </button>
                </div>

                <strong>
                    ${formatarPreco(item.preco * item.quantidade)}
                </strong>
            </div>
        `).join("");
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    document.getElementById("total").textContent =
        formatarPreco(total);
}

// Abre o carrinho
function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("show");
    document.getElementById("overlay").classList.add("show");
}

// Fecha o carrinho
function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

// Finalização demonstrativa
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    const confirmacao = confirm(
        `Seu pedido ficou em ${formatarPreco(total)}.\n\n` +
        "Deseja confirmar o pedido?"
    );

    if (confirmacao) {
        alert(
            "Pedido realizado com sucesso!\n\n" +
            "Obrigado por comprar na NovaStore!"
        );

        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    }
}

// Inicializa a loja
mostrarProdutos();
atualizarCarrinho();
