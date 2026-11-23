
const produtos = [
    {
        id: 1,
        nome: "iPhone 13",
        descricao: "128GB | Câmera dupla",
        preco: 2999,
        imagem: "https://images.unsplash.com/photo-1632633173522-8cd3c3e5e6c3?w=500"
    },
    {
        id: 2,
        nome: "iPhone 14",
        descricao: "128GB | Design premium",
        preco: 3499,
        imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },
    {
        id: 3,
        nome: "iPhone 15",
        descricao: "128GB | Dynamic Island",
        preco: 4199,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"
    },
    {
        id: 4,
        nome: "iPhone 15 Pro",
        descricao: "256GB | Câmera profissional",
        preco: 5299,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"
    },
    {
        id: 5,
        nome: "iPhone 16",
        descricao: "128GB | Nova geração",
        preco: 4999,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"
    },
    {
        id: 6,
        nome: "iPhone 16 Pro",
        descricao: "256GB | Performance premium",
        preco: 6499,
        imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500"
    }
];

let carrinho = [];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostrar produtos
function mostrarProdutos() {
    const lista = document.getElementById("lista-produtos");

    lista.innerHTML = produtos.map(produto => `
        <div class="product-card">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <div class="price">${formatarPreco(produto.preco)}</div>
            <button class="add-button" onclick="adicionarCarrinho(${produto.id})">
                Adicionar ao carrinho
            </button>
        </div>
    `).join("");
}

// Adicionar ao carrinho
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    carrinho.push(produto);

    atualizarCarrinho();

    alert(produto.nome + " adicionado ao carrinho!");
}

// Atualizar carrinho
function atualizarCarrinho() {
    document.getElementById("contador").textContent = carrinho.length;

    const itens = document.getElementById("itens-carrinho");

    itens.innerHTML = carrinho.map((produto, index) => `
        <div class="cart-item">
            <div>
                <strong>${produto.nome}</strong>
                <p>${formatarPreco(produto.preco)}</p>
            </div>

            <button class="remove" onclick="removerItem(${index})">
                Remover
            </button>
        </div>
    `).join("");

    const total = carrinho.reduce((soma, produto) => {
        return soma + produto.preco;
    }, 0);

    document.getElementById("total").textContent =
        formatarPreco(total);
}

// Remover produto
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Abrir carrinho
function abrirCarrinho() {
    document.getElementById("carrinho").style.display = "flex";
}

// Fechar carrinho
function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
}

// Finalizar pelo WhatsApp
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const telefone = "5586999999999";

    let mensagem = "Olá! Quero fazer um pedido:%0A%0A";

    carrinho.forEach(produto => {
        mensagem += `- ${produto.nome}: ${formatarPreco(produto.preco)}%0A`;
    });

    const total = carrinho.reduce((soma, produto) => {
        return soma + produto.preco;
    }, 0);

    mensagem += `%0ATotal: ${formatarPreco(total)}`;

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );
}

// Inicializar loja
mostrarProdutos();
atualizarCarrinho();
