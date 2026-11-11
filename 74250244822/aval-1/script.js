
const produtos = [
    {
        id: 1,
        nome: "Vaso Decorativo Elegance",
        preco: 89.90,
        categoria: "decoracao",
        imagem: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600"
    },
    {
        id: 2,
        nome: "Luminária Moderna",
        preco: 159.90,
        categoria: "sala",
        imagem: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
    },
    {
        id: 3,
        nome: "Almofada Premium",
        preco: 59.90,
        categoria: "sala",
        imagem: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600"
    },
    {
        id: 4,
        nome: "Espelho Decorativo",
        preco: 199.90,
        categoria: "decoracao",
        imagem: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600"
    },
    {
        id: 5,
        nome: "Abajur de Mesa",
        preco: 119.90,
        categoria: "quarto",
        imagem: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
    },
    {
        id: 6,
        nome: "Vaso Minimalista",
        preco: 69.90,
        categoria: "decoracao",
        imagem: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600"
    },
    {
        id: 7,
        nome: "Decoração para Quarto",
        preco: 139.90,
        categoria: "quarto",
        imagem: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600"
    },
    {
        id: 8,
        nome: "Mesa Decorativa",
        preco: 249.90,
        categoria: "sala",
        imagem: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600"
    }
];

// RECUPERAR CARRINHO SALVO
let carrinho = [];

try {
    const salvo = JSON.parse(localStorage.getItem("carrinho"));

    if (Array.isArray(salvo)) {
        carrinho = salvo
            .filter(item =>
                produtos.some(p => p.id === item.id) &&
                Number.isInteger(item.quantidade) &&
                item.quantidade > 0
            )
            .map(item => ({
                ...produtos.find(p => p.id === item.id),
                quantidade: item.quantidade
            }));
    }
} catch (erro) {
    carrinho = [];
}

// FORMATAR PREÇO
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRAR PRODUTOS
function mostrarProdutos(lista = produtos) {
    const area = document.getElementById("lista-produtos");

    if (!area) return;

    area.innerHTML = lista.map(produto => `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="produto-info">
                <span class="categoria">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="preco">${formatarPreco(produto.preco)}</p>

                <button class="adicionar"
                    onclick="adicionarCarrinho(${produto.id})">
                    🛒 Adicionar ao carrinho
                </button>
            </div>
        </div>
    `).join("");
}

// FILTRAR PRODUTOS
function filtrar(categoria, botao) {
    document.querySelectorAll(".filtro").forEach(f => {
        f.classList.remove("ativo");
    });

    if (botao) botao.classList.add("ativo");

    const lista = categoria === "todos"
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    mostrarProdutos(lista);
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const existente = carrinho.find(p => p.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

// REMOVER PRODUTO
function removerProduto(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    atualizarCarrinho();
}

// ALTERAR QUANTIDADE
function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerProduto(id);
    } else {
        atualizarCarrinho();
    }
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    const area = document.getElementById("itens-carrinho");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade, 0
    );

    const valorTotal = carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade, 0
    );

    if (contador) {
        contador.textContent = quantidadeTotal;
    }

    if (totalElemento) {
        totalElemento.textContent = formatarPreco(valorTotal);
    }

    if (!area) return;

    if (carrinho.length === 0) {
        area.innerHTML = `
            <div class="vazio">
                <h3>Seu carrinho está vazio!</h3>
                <p>Adicione produtos para continuar.</p>
            </div>
        `;
        return;
    }

    area.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">

            <img src="${item.imagem}" alt="${item.nome}">

            <div class="item-detalhes">
                <h4>${item.nome}</h4>
                <p>${formatarPreco(item.preco)}</p>

                <div class="quantidade">
                    <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                </div>
            </div>

            <button class="remover"
                onclick="removerProduto(${item.id})">
                🗑
            </button>

        </div>
    `).join("");
}

// ABRIR CARRINHO
function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("aberto");
    document.getElementById("overlay").classList.add("aberto");
}

// FECHAR CARRINHO
function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("aberto");
    document.getElementById("overlay").classList.remove("aberto");
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    const confirmar = confirm(
        "Deseja finalizar sua compra?\nTotal: " + formatarPreco(total)
    );

    if (confirmar) {
        alert("Compra realizada com sucesso! Obrigado por escolher a Casa Elegance!");

        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    }
}

// INICIAR A LOJA
document.addEventListener("DOMContentLoaded", function() {
    mostrarProdutos();
    atualizarCarrinho();
});
