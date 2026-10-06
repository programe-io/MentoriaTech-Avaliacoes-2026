// Base de Dados dos iPhones com Cores Vibrantes e Imagens em alta qualidade
const products = [
    {
        id: 1,
        name: "iPhone 17 Pro Max",
        category: "Pro",
        price: 9899.00,
        rating: 4.9,
        reviewsCount: 312,
        stock: 12,
        description: "O ápice da engenharia Apple com estrutura em titânio aeroespacial, Chip A19 Pro revolucionário, sistema de câmeras quádruplas e tela ProMotion de 120Hz com brilho ultravibrante.",
        colors: [
            { name: "Titânio Solar", hex: "#d4af37", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop" },
            { name: "Azul Elétrico", hex: "#0047ab", image: "https://images.unsplash.com/photo-1695048065057-0401b5a5b28b?q=80&w=1000&auto=format&fit=crop" },
            { name: "Grafite Sombrio", hex: "#2b2b2b", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "iPhone 17 Pro",
        category: "Pro",
        price: 8499.00,
        rating: 4.8,
        reviewsCount: 194,
        stock: 5,
        description: "Potência extrema e design compacto. Câmeras profissionais com zoom óptico de 6x e acabamento metálico de alta durabilidade.",
        colors: [
            { name: "Roxo Cósmico", hex: "#7851a9", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=1000&auto=format&fit=crop" },
            { name: "Prata Lunar", hex: "#e0e0e0", image: "https://images.unsplash.com/photo-1695048065057-0401b5a5b28b?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "iPhone 16",
        category: "Standard",
        price: 5999.00,
        rating: 4.7,
        reviewsCount: 450,
        stock: 25,
        description: "Cores altamente vibrantes, botão de Ação integrado, tela Super Retina XDR e bateria para o dia todo com carregamento inteligente.",
        colors: [
            { name: "Rosa Neon", hex: "#ff1493", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop" },
            { name: "Verde Esmeralda", hex: "#00a86b", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop" },
            { name: "Amperagem Amarela", hex: "#ffcc00", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: 4,
        name: "iPhone 16 Plus",
        category: "Standard",
        price: 6799.00,
        rating: 4.8,
        reviewsCount: 128,
        stock: 2, // Estoque baixo para teste
        description: "Tela gigante com cores estonteantes e autonomia de bateria estendida. Perfeito para criadores de conteúdo e multitarefa.",
        colors: [
            { name: "Azul Celeste", hex: "#3b82f6", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop" },
            { name: "Branco Estelar", hex: "#f8fafc", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: 5,
        name: "iPhone SE (4ª Geração)",
        category: "SE",
        price: 3799.00,
        rating: 4.5,
        reviewsCount: 95,
        stock: 18,
        description: "O melhor custo-benefício da Apple. Chip potente, design clássico renovado e suporte total às novas atualizações de inteligência artificial.",
        colors: [
            { name: "Vermelho Product(RED)", hex: "#dc2626", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop" },
            { name: "Preto Meia-Noite", hex: "#111827", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop" }
        ]
    }
];

let cart = [];
let activeFilters = {
    category: 'all',
    search: ''
};

// Estado selecionado de cor para cada produto { [productId]: colorIndex }
let selectedColors = {};

// Elementos do DOM
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartBadge = document.getElementById('cartBadge');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar cor padrão (índice 0) para cada produto
    products.forEach(p => {
        selectedColors[p.id] = 0;
    });
    
    renderProducts();
    setupEventListeners();
});

// Renderização dos Produtos
function renderProducts() {
    productGrid.innerHTML = '';

    const filtered = products.filter(product => {
        const matchesCategory = activeFilters.category === 'all' || product.category === activeFilters.category;
        const matchesSearch = product.name.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
                              product.description.toLowerCase().includes(activeFilters.search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Nenhum iPhone encontrado.</p>`;
        return;
    }

    filtered.forEach(product => {
        const currentColorIdx = selectedColors[product.id] || 0;
        const activeColor = product.colors[currentColorIdx];
        
        const isLowStock = product.stock <= 5;
        const stockText = isLowStock ? `Últimas ${product.stock} unidades!` : `Em Estoque (${product.stock})`;
        const stockClass = isLowStock ? 'stock-badge low' : 'stock-badge';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="${stockClass}">${stockText}</span>
            <div class="product-image-container" onclick="openProductModal(${product.id})">
                <img src="${activeColor.image}" alt="${product.name} - ${activeColor.name}" id="img-${product.id}">
            </div>
            
            <div class="color-picker">
                ${product.colors.map((color, idx) => `
                    <div class="color-dot ${idx === currentColorIdx ? 'active' : ''}" 
                         style="background-color: ${color.hex};" 
                         title="${color.name}"
                         onclick="changeProductColor(${product.id},${idx})">
                    </div>
                `).join('')}
            </div>

            <div class="product-info" onclick="openProductModal(${product.id})" style="cursor: pointer;">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating} (${product.reviewsCount} avaliações)</span>
                </div>
            </div>

            <div class="product-footer">
                <span class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <button class="btn-buy" onclick="addToCart(${product.id})">Comprar</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Trocar Cor do Produto dinamicamente
window.changeProductColor = function(productId, colorIdx) {
    selectedColors[productId] = colorIdx;
    const product = products.find(p => p.id === productId);
    const imgElement = document.getElementById(`img-${productId}`);
    
    if (imgElement && product) {
        imgElement.src = product.colors[colorIdx].image;
    }
    
    // Atualizar classes ativas dos pontos de cor
    renderProducts();
};

// Configurar Filtros e Busca
function setupEventListeners() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.category = btn.getAttribute('data-filter');
            renderProducts();
        });
    });

    searchInput.addEventListener('input', (e) => {
        activeFilters.search = e.target.value.trim();
        renderProducts();
    });

    // Abrir/Fechar Carrinho
    cartBtn.addEventListener('click', () => cartOverlay.classList.add('active'));
    closeCart.addEventListener('click', () => cartOverlay.classList.remove('active'));
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove('active');
    });

    // Modal Fechar
    closeModal.addEventListener('click', () => productModal.classList.remove('active'));
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        alert('Redirecionando para o ambiente de pagamento seguro...');
        cart = [];
        updateCart();
        cartOverlay.classList.remove('active');
    });
}

// Adicionar ao Carrinho
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const colorIdx = selectedColors[productId] || 0;
    const chosenColor = product.colors[colorIdx];

    const cartItemKey = `${productId}-${chosenColor.name}`;
    const existingItem = cart.find(item => item.key === cartItemKey);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            key: cartItemKey,
            id: product.id,
            name: product.name,
            price: product.price,
            color: chosenColor.name,
            image: chosenColor.image,
            quantity: 1
        });
    }

    updateCart();
    cartOverlay.classList.add('active');
};

// Atualizar Carrinho UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">Seu carrinho está vazio.</p>`;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info" style="flex: 1;">
                <h4>${item.name}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Cor: ${item.color}</p>
                <p>R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (x${item.quantity})</p>
            </div>
            <button onclick="removeFromCart('${item.key}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem;"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalPrice.textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    cartBadge.textContent = count;
}

// Remover do Carrinho
window.removeFromCart = function(key) {
    cart = cart.filter(item => item.key !== key);
    updateCart();
};

// Abrir Modal de Detalhes
window.openProductModal = function(productId) {
    const product = products.find(p => p.id === productId);
    const colorIdx = selectedColors[productId] || 0;
    const activeColor = product.colors[colorIdx];

    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;" class="modal-grid">
            <div style="text-align: center;">
                <img src="${activeColor.image}" alt="${product.name}" style="max-height: 300px; max-width: 100%; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5);">
            </div>
            <div>
                <span class="stock-badge" style="position: static; display: inline-block; margin-bottom: 10px;">Em Estoque: ${product.stock} un.</span>
                <h2 style="font-size: 1.8rem; margin-bottom: 10px;">${product.name}</h2>
                <div class="product-rating" style="margin-bottom: 15px;">
                    <i class="fas fa-star"></i>
                    <span>${product.rating} / 5.0 (${product.reviewsCount} avaliações de clientes)</span>
                </div>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">${product.description}</p>
                <div style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px;">
                    R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <button class="btn-primary" onclick="addToCart(${product.id}); productModal.classList.remove('active');">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
    productModal.classList.add('active');
};