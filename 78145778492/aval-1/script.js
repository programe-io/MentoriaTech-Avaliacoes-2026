// Database of 10 Products
const products = [
    {
        id: 1,
        name: "Vestido Midi Séfora Floral",
        category: "vestidos",
        price: 189.90,
        oldPrice: 249.90,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
        badge: "30% OFF"
    },
    {
        id: 2,
        name: "Conjunto Alfaiataria Rose Premium",
        category: "conjuntos",
        price: 279.90,
        oldPrice: 329.90,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
        badge: "DESTAQUE"
    },
    {
        id: 3,
        name: "Blusa Seda Acetinada Champagne",
        category: "blusas",
        price: 129.90,
        oldPrice: 159.90,
        image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=600&auto=format&fit=crop",
        badge: "NOVO"
    },
    {
        id: 4,
        name: "Blazer Alongado Feminino Pink",
        category: "casacos",
        price: 239.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
        badge: "20% OFF"
    },
    {
        id: 5,
        name: "Vestido Longo Festas Verão",
        category: "vestidos",
        price: 319.90,
        oldPrice: 389.90,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop",
        badge: "LUXO"
    },
    {
        id: 6,
        name: "Cropped Tricô Modal Primavera",
        category: "blusas",
        price: 89.90,
        oldPrice: 119.90,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
        badge: "OFERTA"
    },
    {
        id: 7,
        name: "Conjunto Pantalona + Cropped Linho",
        category: "conjuntos",
        price: 259.90,
        oldPrice: 310.00,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
        badge: "TENDÊNCIA"
    },
    {
        id: 8,
        name: "Jaqueta Couro Eco Slim",
        category: "casacos",
        price: 289.90,
        oldPrice: 349.90,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
        badge: "MUST HAVE"
    },
    {
        id: 9,
        name: "Vestido Tubinho Elegance Black",
        category: "vestidos",
        price: 199.90,
        oldPrice: 239.90,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop",
        badge: "CLÁSSICO"
    },
    {
        id: 10,
        name: "Body Manga Longa Tule Ilustrado",
        category: "blusas",
        price: 119.90,
        oldPrice: 149.90,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
        badge: "POPULAR"
    }
];

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('camila_modas_cart')) || [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('todos');
    updateCartUI();
    startCountdown();
});

// Render Product Grid
function renderProducts(categoryFilter) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = categoryFilter === 'todos' 
        ? products 
        : products.filter(p => p.category === categoryFilter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-thumb">
                <span class="badge-discount">${product.badge}</span>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-details">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price-row">
                    <span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                    <span class="current-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button onclick="addToCart(${product.id})" class="btn btn-primary w-full">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Categories
function filterCategory(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    renderProducts(category);
}

// Cart Operations
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndRefreshCart();
    showToast(`"${product.name}" adicionado ao carrinho!`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    saveAndRefreshCart();
}

function saveAndRefreshCart() {
    localStorage.setItem('camila_modas_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badge.innerText = totalCount;
    subtotalEl.innerText = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;
    totalEl.innerText = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: #888; padding: 40px 0;">Seu carrinho está vazio.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                <div class="qty-controls">
                    <button onclick="updateQuantity(${item.id}, -1)" class="qty-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="qty-btn">+</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Drawers & Mobile Menu
function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    drawer.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá, CAMILA MODAS! Gostaria de finalizar meu pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• *${item.name}* (x${item.quantity}) - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
    message += "\n*Frete:* GRÁTIS (Cupom CAMILA10 aplicado)";

    const encoded = encodeURIComponent(message);
    window.open(`