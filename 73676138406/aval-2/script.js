// Dados exatos de 10 sapatos com fotos em alta qualidade
const products = [
    {
        id: 1,
        name: "Tênis Runner Neon Velocity",
        category: "Corrida / Esporte",
        price: 499.90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Sneaker Streetwear CyberPulse",
        category: "Casual Urbano",
        price: 389.90,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Bota Adventure Mountain Trek",
        category: "Trilha / Botas",
        price: 549.90,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Tênis Minimalist White Classic",
        category: "Casual Clean",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Slip-On Urban Night",
        category: "Praticidade",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Tênis Basketball Apex Pro",
        category: "Basquete / Esporte",
        price: 599.90,
        image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Sneaker High-Top Holographic",
        category: "Edição Limitada",
        price: 459.90,
        image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Tênis Training Force Gym",
        category: "Academia / Crossfit",
        price: 349.90,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "Sapato Social Oxford Modern",
        category: "Social / Executivo",
        price: 419.90,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "Tênis Skateboarding BoardFlex",
        category: "Skate / Street",
        price: 279.90,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop"
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

// Renderizar os 10 sapatos na tela
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
                    <p class="text-xl font-black text-white mt-2">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
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
                    <p class="text-neonCyan text-sm font-bold mt-1">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">-</button>
                        <span class="text-sm font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-neonOrange transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Toast Notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', () => cartDrawer.classList.remove('hidden'));
    closeCartBtn.addEventListener('click', () => cartDrawer.classList.add('hidden'));
    cartBackdrop.addEventListener('click', () => cartDrawer.classList.add('hidden'));

    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

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

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem enviada com sucesso! Retornaremos em breve.');
        contactForm.reset();
    });
}