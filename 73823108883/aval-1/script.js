// Base de dados de produtos (Estoque e Promoções)
const produtos = [
    {
        id: 1,
        nome: "Sérum Facial Vitamina C 30ml",
        categoria: "skincare",
        preco: 89.90,
        precoAntigo: 119.90,
        estoque: 12,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        descricao: "Ação antioxidante avançada e luminosidade imediata."
    },
    {
        id: 2,
        nome: "Batom Matte Avelã Elegance",
        categoria: "maquiagem",
        preco: 39.90,
        precoAntigo: 55.90,
        estoque: 5,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
        descricao: "Alta fixação, acabamento aveludado e hidratação prolongada."
    },
    {
        id: 3,
        nome: "Máscara Capilar Nutrição Intensa 250g",
        categoria: "capilar",
        preco: 64.90,
        precoAntigo: null,
        estoque: 18,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop",
        descricao: "Restauração profunda para cabelos secos e danificados."
    },
    {
        id: 4,
        nome: "Hidratante Facial Hialurônico",
        categoria: "skincare",
        preco: 99.90,
        precoAntigo: 139.90,
        estoque: 3, // Estoque baixo
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1608248597359-9d74f27a69bc?q=80&w=600&auto=format&fit=crop",
        descricao: "Preenchimento de linhas finas e hidratação de 24 horas."
    },
    {
        id: 5,
        nome: "Paleta de Sombras Nude Glow",
        categoria: "maquiagem",
        preco: 119.90,
        precoAntigo: null,
        estoque: 9,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
        descricao: "12 cores versáteis com alta pigmentação."
    },
    {
        id: 6,
        nome: "Óleo Capilar Reparador Argan",
        categoria: "capilar",
        preco: 52.90,
        precoAntigo: null,
        estoque: 15,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
        descricao: "Controle de frizz e brilho espelhado instantâneo."
    }
];

// Carrinho de compras em memória
let carrinho = [];

// Elementos do DOM
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

const promoGrid = document.getElementById('promo-products-grid');
const stockGrid = document.getElementById('stock-products-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

const cartCountEl = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal-price');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    iniciarContadorRegressivo();
    configurarEventos();
});

// Sistema de Notificações Toast
function mostrarToast(mensagem) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2ed573; margin-right: 8px;"></i> ${mensagem}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Renderização dos Produtos na Tela
function renderizarProdutos(filtroCategoria = 'todos', termoBusca = '') {
    // 1. Renderizar Promoções
    const produtosPromo = produtos.filter(p => p.promocao);
    promoGrid.innerHTML = produtosPromo.map(produtoCardHTML).join('');

    // 2. Renderizar Estoque com Filtros e Busca
    let produtosFiltrados = produtos.filter(p => {
        const matchCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
        const matchBusca = p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                           p.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        return matchCategoria && matchBusca;
    });

    if (produtosFiltrados.length === 0) {
        stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 30px;">Nenhum produto encontrado.</p>`;
    } else {
        stockGrid.innerHTML = produtosFiltrados.map(produtoCardHTML).join('');
    }
}

// Template HTML para Card de Produto
function produtoCardHTML(produto) {
    const isLowStock = produto.estoque <= 3;
    const stockClass = isLowStock ? 'stock-status low' : 'stock-status';
    const stockText = isLowStock ? `Últimas unidades! (${produto.estoque} em estoque)` : `Em estoque (${produto.estoque} disp.)`;
    
    const tagHTML = produto.promocao 
        ? `<span class="product-tag sale">Promoção</span>` 
        : `<span class="product-tag">Destaque</span>`;

    const precoHTML = produto.precoAntigo 
        ? `<span class="old-price">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span> R$ ${produto.preco.toFixed(2).replace('.', ',')}`
        : `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${produto.imagem}" alt="${produto.nome}">
                ${tagHTML}
            </div>
            <div class="product-body">
                <h3 class="product-title">${produto.nome}</h3>
                <p class="product-desc">${produto.descricao}</p>
                <div class="${stockClass}">${stockText}</div>
                <div class="product-footer">
                    <div class="product-price">${precoHTML}</div>
                    <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${produto.id})" title="Adicionar ao Carrinho">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Configuração de Eventos
function configurarEventos() {
    // Abrir/Fechar Carrinho
    openCartBtn.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCartBtn.addEventListener('click', fecharCarrinho);
    cartOverlay.addEventListener('click', fecharCarrinho);

    // Menu Mobile Responsivo
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em links do menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Filtros de Categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const categoria = e.target.getAttribute('data-category');
            renderizarProdutos(categoria, searchInput.value);
        });
    });

    // Barra de Busca em tempo real
    searchInput.addEventListener('input', (e) => {
        const categoriaAtiva = document.querySelector('.filter-btn.active').getAttribute('data-category');
        renderizarProdutos(categoriaAtiva, e.target.value);
    });

    // Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        if (carrinho.length === 0) return;
        mostrarToast('Pedido finalizado com sucesso! Redirecionando...');
        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    });

    // Envio do Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        mostrarToast('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

function fecharCarrinho() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Funções do Carrinho
window.adicionarAoCarrinho = function(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    if (produto.estoque <= 0) {
        mostrarToast('Desculpe, produto esgotado!');
        return;
    }

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        if (itemExistente.quantidade < produto.estoque) {
            itemExistente.quantidade++;
        } else {
            mostrarToast('Quantidade máxima disponível em estoque atingida.');
            return;
        }
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarToast(`${produto.nome} adicionado ao carrinho!`);
}

window.alterarQuantidade = function(id, delta) {
    const item = carrinho.find(i => i.id === id);
    const produtoEstoque = produtos.find(p => p.id === id);
    if (!item) return;

    const novaQtd = item.quantidade + delta;
    if (novaQtd > 0 && novaQtd <= produtoEstoque.estoque) {
        item.quantidade = novaQtd;
    } else if (novaQtd <= 0) {
        carrinho = carrinho.filter(i => i.id !== id);
    } else {
        mostrarToast('Estoque máximo atingido.');
    }
    atualizarCarrinho();
}

window.removerItemCarrinho = function(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    atualizarCarrinho();
    mostrarToast('Item removido do carrinho.');
}

function atualizarCarrinho() {
    // Atualizar badge contador
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCountEl.textContent = totalItens;

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Seu carrinho está vazio.</p>`;
        cartSubtotalEl.textContent = `R$ 0,00`;
        return;
    }

    // Renderizar itens no drawer
    cartItemsContainer.innerHTML = carrinho.map(item => `
        <div class="cart-item-card">
            <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.nome}</div>
                <div class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                <div class="cart-item-controls">
                    <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removerItemCarrinho(${item.id})" title="Remover item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    // Calcular Subtotal
    const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Contador Regressivo para Promoções (Exemplo de 12 horas)
function iniciarContadorRegressivo() {
    let tempoRestante = 12 * 60 * 60; // 12 horas em segundos
    const countdownEl = document.getElementById('countdown');

    setInterval(() => {
        if (tempoRestante <= 0) return;
        tempoRestante--;

        const horas = Math.floor(tempoRestante / 3600);
        const minutos = Math.floor((tempoRestante % 3600) / 60);
        const segundos = tempoRestante % 60;

        countdownEl.textContent = `${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    }, 1000);
}