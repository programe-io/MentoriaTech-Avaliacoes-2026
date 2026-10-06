// Dados das 10 Confecções Masculinas
const products = [
    {
        id: 1,
        name: "Jaqueta Bomber Cyberpunk",
        category: "Jaquetas",
        price: 349.90,
        stock: 12,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
        promo: false
    },
    {
        id: 2,
        name: "Moletom Oversized Neon Glow",
        category: "Moletons",
        price: 219.90,
        stock: 5,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
        promo: true,
        oldPrice: 289.90
    },
    {
        id: 3,
        name: "Camiseta Minimalista Tech",
        category: "Camisetas",
        price: 89.90,
        stock: 25,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
        promo: false
    },
    {
        id: 4,
        name: "Calça Cargo Jogger Tactical",
        category: "Calças",
        price: 259.90,
        stock: 8,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
        promo: true,
        oldPrice: 319.90
    },
    {
        id: 5,
        name: "Blazer Slim Fit Velvet Night",
        category: "Blazers",
        price: 499.90,
        stock: 3,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
        promo: false
    },
    {
        id: 6,
        name: "Camisa Social Linho Urban",
        category: "Camisas",
        price: 179.90,
        stock: 15,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
        promo: false
    },
    {
        id: 7,
        name: "Regata Athletic Dry-Fit",
        category: "Esportivo",
        price: 69.90,
        stock: 30,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
        promo: true,
        oldPrice: 99.90
    },
    {
        id: 8,
        name: "Bermuda Chino Street",
        category: "Bermudas",
        price: 139.90,
        stock: 10,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
        promo: false
    },
    {
        id: 9,
        name: "Jaqueta Corta-Vento NeonStorm",
        category: "Jaquetas",
        price: 299.90,
        stock: 7,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop",
        promo: true,
        oldPrice: 379.90
    },
    {
        id: 10,
        name: "Calça Jeans Skinny Destroyer",
        category: "Calças",
        price: 210.00,
        stock: 14,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
        promo: false
    }
];

let cart = [];

// Elementos DOM
const productGrid = document.getElementById('product-grid');
const promoGrid = document.getElementById('promo-grid');
const inventoryTableBody = document.getElementById('inventory-table-body');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartBadge = document.getElementById('cart-badge');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPromos();
    renderInventory();
    setupEventListeners();
});

// Renderizar Catálogo Completo
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-cardBg border border-white/10 rounded-2xl overflow-hidden group hover:border-neonCyan/50 transition-all duration-300 flex flex-col">
            <div class="relative h-64 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-darkBg/80 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-white/15 text-neonCyan">
                    ${product.category}
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="font-bold text-lg text-white group-hover:text-neonCyan transition-colors">${product.name}</h3>
                    <p class="text-xl font-black text-white mt-2">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-white/5 hover:bg-neonCyan hover:text-darkBg border border-white/15 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Renderizar Promoções
function renderPromos() {
    const promoProducts = products.filter(p => p.promo);
    promoGrid.innerHTML = promoProducts.map(product => `
        <div class="bg-darkBg border border-neonPink/30 rounded-2xl overflow-hidden group hover:border-neonPink transition-all duration-300 flex flex-col shadow-lg shadow-neonPink/5">
            <div class="relative h-64 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-neonPink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Promoção
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="font-bold text-lg text-white">${product.name}</h3>
                    <div class="flex items-center gap-3 mt-2">
                        <span class="text-xl font-black text-neonPink">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <span class="text-sm text-gray-500 line-through">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-neonPink hover:bg-neonPink/80 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-neonPink/20">
                    <i class="fa-solid fa-cart-plus"></i> Aproveitar Oferta
                </button>
            </div>
        </div>
    `).join('');
}

// Renderizar Tabela de Estoque
function renderInventory() {
    inventoryTableBody.innerHTML = products.map(product => {
        let statusBadge = '';
        if (product.stock > 10) {
            statusBadge = `<span class="bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full">Disponível</span>`;
        } else if (product.stock > 0) {
            statusBadge = `<span class="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 text-xs font-bold px-3 py-1 rounded-full">Estoque Baixo</span>`;
        } else {
            statusBadge = `<span class="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full">Esgotado</span>`;
        }

        return `
            <tr class="hover:bg-white/5 transition-colors">
                <td class="py-4 px-6 font-semibold flex items-center gap-3">
                    <img src="${product.image}" class="w-10 h-10 rounded-lg object-cover border border-white/10" alt="">
                    <span>${product.name}</span>
                </td>
                <td class="py-4 px-6 text-gray-400">${product.category}</td>
                <td class="py-4 px-6 font-medium">R$ ${product.price.toFixed(2).replace('.', ',')}</td>
                <td class="py-4 px-6 font-bold text-neonCyan">${product.stock} un.</td>
                <td class="py-4 px-6">${statusBadge}</td>
            </tr>
        `;
    }).join('');
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showToast('Quantidade máxima em estoque atingida!');
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);

    if (item) {
        const newQty = item.quantity + change;
        if (newQty > 0 && newQty <= product.stock) {
            item.quantity = newQty;
        } else if (newQty <= 0) {
            removeFromCart(productId);
            return;
        } else {
            showToast('Limite de estoque excedido.');
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Atualizar Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    // Atualizar Lista de Itens no Drawer
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center py-10">Seu carrinho está vazio.</p>`;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between bg-darkBg border border-white/10 p-4 rounded-xl gap-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg border border-white/10" alt="">
                <div class="flex-1">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-neonCyan text-sm font-bold mt-1">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">-</button>
                        <span class="text-sm font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-neonPink transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }

    // Atualizar Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Sistema de Toast Notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Event Listeners
function setupEventListeners() {
    // Abrir/Fechar Carrinho
    cartBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
        cartDrawer.classList.add('hidden');
    });

    cartBackdrop.addEventListener('click', () => {
        cartDrawer.classList.add('hidden');
    });

    // Menu Mobile Toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar Menu Mobile ao clicar em links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Seu carrinho está vazio!');
            return;
        }
        showToast('Compra finalizada com sucesso! Obrigado.');
        cart = [];
        updateCartUI();
        cartDrawer.classList.add('hidden');
    });

    // Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem enviada com sucesso! Retornaremos em breve.');
        contactForm.reset();
    });
}