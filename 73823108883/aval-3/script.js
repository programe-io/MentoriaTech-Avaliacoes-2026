// Base de dados de roupas (Estoque e Promoções)
const produtos = [
    {
        id: 1,
        nome: "Trench Coat Classique Nude",
        categoria: "feminino",
        tamanhos: ["P", "M", "G"],
        preco: 349.90,
        precoAntigo: 429.90,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1548883354-7622d06aca27?q=80&w=600&auto=format&fit=crop",
        descricao: "Corte alfaiataria impecável com cinto ajustável."
    },
    {
        id: 2,
        nome: "Blazer Slim Alfaiataria Preto",
        categoria: "masculino",
        tamanhos: ["M", "G", "GG"],
        preco: 299.90,
        precoAntigo: 359.90,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
        descricao: "Conforto térmico e caimento moderno para ocasiões formais."
    },
    {
        id: 3,
        nome: "Vestido Midi Plissado Silk",
        categoria: "feminino",
        tamanhos: ["PP", "P", "M"],
        preco: 259.90,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
        descricao: "Fluidez e elegância em tecido leve de toque sedoso."
    },
    {
        id: 4,
        nome: "Camisa Oxford Slim Fit Branca",
        categoria: "masculino",
        tamanhos: ["P", "M", "G", "GG"],
        preco: 159.90,
        precoAntigo: 199.90,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
        descricao: "100% algodão egípcio de alta durabilidade."
    },
    {
        id: 5,
        nome: "Bolsa Tote Couro Minimal",
        categoria: "acessorios",
        tamanhos: ["Único"],
        preco: 219.90,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
        descricao: "Espaçosa, versátil e confeccionada em couro legítimo."
    },
    {
        id: 6,
        nome: "Cachecol de Lã Merino Gelo",
        categoria: "acessorios",
        tamanhos: ["Único"],
        preco: 89.90,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=600&auto=format&fit=crop",
        descricao: "Extremamente macio e perfeito para dias frios."
    }
];

// Carrinho de compras e seleções de tamanhos ativos
let carrinho = [];
let tamanhosSelecionados = {}; // Guarda o tamanho selecionado de cada produto na vitrine

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
    // Inicializar o primeiro tamanho como padrão para cada produto
    produtos.forEach(p => {
        tamanhosSelecionados[p.id] = p.tamanhos[0];
    });

    renderizarProdutos();
    iniciarContadorRegressivo();
    configurarEventos();
});

// Sistema de Notificações Toast
function mostrarToast(mensagem) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #c5a880; margin-right: 8px;"></i> ${mensagem}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Formatar valor em Reais
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 30px;">Nenhuma peça encontrada no estoque.</p>`;
    } else {
        stockGrid.innerHTML = produtosFiltrados.map(produtoCardHTML).join('');
    }
}

// Template HTML para Card de Produto
function produtoCardHTML(produto) {
    const tagHTML = produto.promocao 
        ? `<span class="product-tag sale">Promoção</span>` 
        : `<span class="product-tag">Novo</span>`;

    const precoHTML = produto.precoAntigo 
        ? `<span class="old-price">${formatarMoeda(produto.precoAntigo)}</span> ${formatarMoeda(produto.preco)}`
        : `${formatarMoeda(produto.preco)}`;

    // Criar botões de tamanho
    const tamanhosHTML = produto.tamanhos.map(tamanho => {
        const isSelected = tamanhosSelecionados[produto.id] === tamanho ? 'selected' : '';
        return `<button class="size-btn ${isSelected}" onclick="selecionarTamanho(${produto.id}, '${tamanho}')">${tamanho}</button>`;
    }).join('');

    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${produto.imagem}" alt="${produto.nome}">
                ${tagHTML}
            </div>
            <div class="product-body">
                <h3 class="product-title">${produto.nome}</h3>
                <p class="product-desc">${produto.descricao}</p>
                <div class="size-selector">
                    <span style="font-size: 11px; align-self: center; margin-right: 5px; color: #777;">Tam:</span>
                    ${tamanhosHTML}
                </div>
                <div class="product-footer">
                    <div class="product-price">${precoHTML}</div>
                    <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${produto.id})">
                        <i class="fa-solid fa-plus"></i> Adicionar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Selecionar Tamanho do Produto
window.selecionarTamanho = function(id, tamanho) {
    tamanhosSelecionados[id] = tamanho;
    renderizarProdutos(
        document.querySelector('.filter-btn.active').getAttribute('data-category'),
        searchInput.value
    );
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

    // Fechar menu ao clicar em links
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
        mostrarToast('Pedido realizado com sucesso! Obrigado por comprar na Vogue & Co.');
        carrinho = [];
        atualizarCarrinho();
        fecharCarrinho();
    });

    // Envio do Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        mostrarToast('Mensagem enviada com sucesso! Responderemos em breve.');
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

    const tamanhoEscolhido = tamanhosSelecionados[id] || produto.tamanhos[0];

    // Verificar se o item com o mesmo ID e mesmo tamanho já está no carrinho
    const itemExistente = carrinho.find(item => item.id === id && item.tamanho === tamanhoEscolhido);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ 
            ...produto, 
            tamanho: tamanhoEscolhido, 
            quantidade: 1,
            cartItemId: `${id}-${tamanhoEscolhido}` // Identificador único por variação de tamanho
        });
    }

    atualizarCarrinho();
    mostrarToast(`${produto.nome} (Tam: ${tamanhoEscolhido}) adicionado à sacola!`);
}

window.alterarQuantidade = function(cartItemId, delta) {
    const item = carrinho.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantidade += delta;
    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(i => i.cartItemId !== cartItemId);
    }
    atualizarCarrinho();
}

window.removerItemCarrinho = function(cartItemId) {
    carrinho = carrinho.filter(i => i.cartItemId !== cartItemId);
    atualizarCarrinho();
    mostrarToast('Item removido da sacola.');
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCountEl.textContent = totalItens;

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Sua sacola está vazia.</p>`;
        cartSubtotalEl.textContent = `R$ 0,00`;
        return;
    }

    cartItemsContainer.innerHTML = carrinho.map(item => `
        <div class="cart-item-card">
            <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.nome}</div>
                <div class="cart-item-size">Tamanho: <strong>${item.tamanho}</strong></div>
                <div class="cart-item-price">${formatarMoeda(item.preco)}</div>
                <div class="cart-item-controls">
                    <button onclick="alterarQuantidade('${item.cartItemId}', -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade('${item.cartItemId}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removerItemCarrinho('${item.cartItemId}')" title="Remover">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    cartSubtotalEl.textContent = formatarMoeda(subtotal);
}

// Contador Regressivo para Promoções (Exemplo de 18 horas)
function iniciarContadorRegressivo() {
    let tempoRestante = 18 * 60 * 60;
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