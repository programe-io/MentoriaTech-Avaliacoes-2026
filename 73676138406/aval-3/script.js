// Dados dos 10 iPhones atualizados com imagens de alta qualidade
const products = [
    {
        id: 1,
        name: "iPhone 17 Pro Max",
        category: "1TB • Titânio Cósmico",
        price: 9899.00,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "iPhone 17 Pro",
        category: "512GB • Titânio Natural",
        price: 8799.00,
        image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "iPhone 17 Plus",
        category: "256GB • Azul Ultramar",
        price: 7499.00,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "iPhone 17",
        category: "128GB • Verde Salvia",
        price: 6499.00,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "iPhone 16 Pro Max",
        category: "1TB • Titânio Deserto",
        price: 8599.00,
        image: "https://images.unsplash.com/photo-1727027515093-6c84cbe200d7?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "iPhone 16 Pro",
        category: "256GB • Titânio Preto",
        price: 7699.00,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "iPhone 16",
        category: "256GB • Rosa Vibrante",
        price: 5799.00,
        image: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "iPhone 15 Pro",
        category: "128GB • Titânio Branco",
        price: 6399.00,
        image: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "iPhone 15",
        category: "128GB • Amarelo Pastel",
        price: 4899.00,
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "iPhone 14",
        category: "128GB • Meia-Noite",
        price: 3999.00,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=600&auto=format&fit=crop"
    }
];

let cart = [];

// Elementos DOM
const productGrid = document.getElementById('product-grid');
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

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Renderizar os 10 iPhones na tela
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-cardBg border border-white/10 rounded-2xl overflow-hidden group hover:border-neonCyan/50 transition-all duration-300 flex flex-col">
            <div class="relative h-64 overflow-hidden bg-white/5">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-darkBg/80 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-white/15 text-neonCyan">
                    ${product.category}
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="font-bold text-lg text-white group-hover:text-neonCyan transition-colors">${product.name}</h3>
                    <p class="text-xl font-black text-white mt-2">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-white/5 hover:bg-neonCyan hover:text-darkBg border border-white/15 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
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
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center py-10">Seu carrinho está vazio.</p>`;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between bg-darkBg border border-white/10 p-4 rounded-xl gap-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg border border-white/10" alt="">
                <div class="flex-1">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-neonCyan text-sm font-bold mt-1">R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">-</button>
                        <span class="text-sm font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-neonGreen transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

// Toast Notification
function showToast