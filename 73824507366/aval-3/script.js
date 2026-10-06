// Base de dados dos perfumes da loja "Duda Perfume"
const products = [
    {
        id: 1,
        title: "Duda Gold Femme Eau de Parfum 100ml",
        category: "feminino",
        price: 389.90,
        oldPrice: 450.00,
        stock: 6,
        promo: true,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Duda Royal Intense Masculino 100ml",
        category: "masculino",
        price: 299.90,
        oldPrice: null,
        stock: 3, // Estoque baixo
        promo: false,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Oud Al Sahra Árabe Luxo 100ml",
        category: "arabe",
        price: 490.00,
        oldPrice: 580.00,
        stock: 4, // Estoque baixo
        promo: true,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Duda Velvet White Unissex 75ml",
        category: "unissex",
        price: 249.90,
        oldPrice: null,
        stock: 12,
        promo: false,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Duda Rose Sensuelle 90ml",
        category: "feminino",
        price: 310.00,
        oldPrice: 360.00,
        stock: 2, // Estoque baixo
        promo: true,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Duda Sport Extreme Masculino 100ml",
        category: "masculino",
        price: 220.00,
        oldPrice: null,
        stock: 14,
        promo: false,
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        title: "Bint Hooran Essence Árabe 100ml",
        category: "arabe",
        price: 430.00,
        oldPrice: 499.00,
        stock: 5,
        promo: true,
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        title: "Duda Aqua Fresh Unissex 100ml",
        category: "unissex",
        price: 199.90,
        oldPrice: 249.90,
        stock: 10,
        promo: true,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];
let currentCategoryFilter = 'todos';

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, 'productsGrid');
    renderProducts(products.filter(p => p.promo), 'promoProductsGrid');
    renderStockTable();
    updateStockSummary();
});

// Navegação entre Abas (SPA)
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    
    const targetLink = document.querySelector(`.nav-link[data-target="${tabId}"]`);
    if(targetLink) targetLink.classList.add('active');

    document.getElementById('navMenu').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu Mobile Toggle
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('open');
}

// Renderizar Perfumes em Grid
function renderProducts(itemsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (itemsToRender.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Nenhum perfume encontrado.</p>`;
        return;
    }

    container.innerHTML = itemsToRender.map(product => `
        <div class="product-card">
            ${product.promo ? `<span class="product-badge">OFERTA</span>` : ''}
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-prices">
                    <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-bag-shopping"></i> Adicionar à Sacola
                </button>
            </div>
        </div>
    `).join('');
}

// Filtro de Busca por Texto
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
        const matchesCategory = currentCategoryFilter === 'todos' || product.category === currentCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered, 'productsGrid');
}

// Filtro por Categoria de Botões
function filterByCategory(category, btnElement) {
    currentCategoryFilter = category;
    
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    filterProducts();
}

// Tabela de Controle de Estoque
function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => {
        const isLow = product.stock < 5;
        return `
            <tr>
                <td><strong>${product.title}</strong></td>
                <td style="text-transform: capitalize;">${product.category}</td>
                <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
                <td><strong>${product.stock} un.</strong></td>
                <td>
                    <span class="badge-stock ${isLow ? 'badge-low' : 'badge-ok'}">
                        ${isLow ? '⚠️ Estoque Baixo' : 'Em Estoque'}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function updateStockSummary() {
    const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockItems = products.filter(p => p.stock < 5).length;

    document.getElementById('totalItemsStock').innerText = totalItems;
    document.getElementById('lowStockCount').innerText = lowStockItems;
}

// Carrinho de Compras
function toggleCartModal() {
    const modal = document.getElementById('cartModalOverlay');
    modal.classList.toggle('open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            alert('Quantidade máxima disponível em estoque atingida.');
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCartModal();
}

function updateCartQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;

    const product = products.find(p => p.id === productId);

    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else if (cartItem.quantity > product.stock) {
        cartItem.quantity = product.stock;
        alert('Estoque limite atingido para este perfume.');
    }

    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotal');

    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalCount;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart-text">Sua sacola de perfumes está vazia.</p>`;
        subtotalEl.innerText = `R$ 0,00`;
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        subtotal += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Adicione perfumes à sacola antes de finalizar o pedido.');
        return;
    }

    let message = "Olá! Gostaria de finalizar o seguinte pedido na *Duda Perfume*:\n\n";
    let subtotal = 0;

    cart.forEach(item => {
        const totalItem = item.price * item.quantity;
        subtotal += totalItem;
        message += `- ${item.quantity}x ${item.title} (R$ ${item.price.toFixed(2).replace('.', ',')} un)\n`;
    });

    message += `\n*Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}*\n\nPor favor, envie as opções de frete e pagamento!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511998887766?text=${encodedMessage}`, '_blank');
}

// Formulário de Contato do Cliente
function handleContactSubmit(event) {
    event.preventDefault();
    
    const successMsg = document.getElementById('formSuccessMsg');
    successMsg.style.display = 'flex';

    document.getElementById('contactForm').reset();

    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}