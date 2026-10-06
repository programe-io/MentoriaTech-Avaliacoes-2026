// Banco de Dados de Celulares Exemplo
const products = [
    {
        id: 1,
        name: "iPhone 17 Pro Max",
        brand: "Apple",
        price: 9499.00,
        oldPrice: 10499.00,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "512GB", ram: "8GB", camera: "48MP Tripla", battery: "4600 mAh" },
        description: "O smartphone mais avançado da Apple com corpo em titânio aeroespacial e chip A19 Pro ultra veloz."
    },
    {
        id: 2,
        name: "Galaxy S26 Ultra",
        brand: "Samsung",
        price: 8999.00,
        oldPrice: 9999.00,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "512GB", ram: "12GB", camera: "200MP Quad", battery: "5000 mAh" },
        description: "Recursos de Inteligência Artificial integrados, S-Pen ultra precisa e câmeras revolucionárias."
    },
    {
        id: 3,
        name: "Xiaomi 15 Pro",
        brand: "Xiaomi",
        price: 5299.00,
        oldPrice: 5999.00,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "256GB", ram: "12GB", camera: "50MP Leica", battery: "4880 mAh" },
        description: "Parceria fotográfica com a Leica e carregamento super rápido de 120W."
    },
    {
        id: 4,
        name: "Motorola Edge 60 Ultra",
        brand: "Motorola",
        price: 4599.00,
        oldPrice: 5199.00,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "256GB", ram: "12GB", camera: "50MP OIS", battery: "4600 mAh" },
        description: "Design elegante com acabamento em couro vegano e tela pOLED curva de 165Hz."
    },
    {
        id: 5,
        name: "iPhone 16",
        brand: "Apple",
        price: 5999.00,
        oldPrice: 6799.00,
        image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "128GB", ram: "8GB", camera: "48MP Dupla", battery: "3561 mAh" },
        description: "Potência e eficiência com o chip A18 e botão de Ação integrado."
    },
    {
        id: 6,
        name: "Galaxy Z Fold 6",
        brand: "Samsung",
        price: 11499.00,
        oldPrice: 12999.00,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "512GB", ram: "12GB", camera: "50MP Tripla", battery: "4400 mAh" },
        description: "O dobrável definitivo com tela imersiva e multitarefa avançada em formato compacto."
    },
    {
        id: 7,
        name: "Xiaomi Redmi Note 15 Pro+",
        brand: "Xiaomi",
        price: 2499.00,
        oldPrice: 2899.00,
        image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "256GB", ram: "8GB", camera: "200MP", battery: "5100 mAh" },
        description: "O rei do custo-benefício com bateria para o dia todo e câmeras de alta resolução."
    },
    {
        id: 8,
        name: "Motorola Razr 60",
        brand: "Motorola",
        price: 6499.00,
        oldPrice: 7299.00,
        image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=600",
        specs: { storage: "256GB", ram: "8GB", camera: "50MP", battery: "4200 mAh" },
        description: "Tela externa gigante e interativa em um flip moderno e cheio de estilo."
    }
];

// Estado da Aplicação
let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';

// Elementos DOM
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const productModal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const cartBtn = document.getElementById('cartBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();

    // Event Listeners de Busca
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        mobileSearchInput.value = searchQuery;
        renderProducts();
    });

    mobileSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        searchInput.value = searchQuery;
        renderProducts();
    });

    // Event Listener de Ordenação
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Event Listener de Tema
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
    });

    // Toggle Carrinho
    cartBtn.addEventListener('click', toggleCart);
});

// Renderizar Produtos com Filtros e Ordenação
function renderProducts() {
    let filtered = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.brand === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.brand.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Ordenação
    if (currentSort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    productGrid.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    filtered.forEach(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        
        const card = document.createElement('div');
        card.className = "product-card bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-5 flex flex-col justify-between shadow-sm relative group";
        card.innerHTML = `
            <div>
                <!-- Badge de Desconto -->
                <div class="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    -${discount}%
                </div>
                <!-- Imagem -->
                <div class="w-full h-52 bg-slate-100 dark:bg-slate-700/30 rounded-2xl mb-4 overflow-hidden flex items-center justify-center cursor-pointer relative" onclick="openModal(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                </div>
                <!-- Marca & Nome -->
                <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">${product.brand}</span>
                <h3 class="font-bold text-base mt-1 mb-2 line-clamp-1 cursor-pointer hover:text-blue-600 transition" onclick="openModal(${product.id})">${product.name}</h3>
                <!-- Specs Resumo -->
                <div class="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span><i class="fa-solid fa-microchip mr-1"></i>${product.specs.storage}</span>
                    <span>•</span>
                    <span><i class="fa-solid fa-camera mr-1"></i>${product.specs.camera}</span>
                </div>
            </div>
            <!-- Preço e Botão -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                <div>
                    <span class="text-xs text-slate-400 line-through block">R$ ${product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span class="text-lg font-black text-slate-900 dark:text-white">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button onclick="addToCart(${product.id})" class="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-xl flex items-center justify-center transition shadow-md shadow-blue-500/20">
                    <i class="fa-solid fa-cart-plus text-sm"></i>
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Filtrar por Categoria
function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        btn.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');
    });
    event.target.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');
    btnActive = event.target;
    btnActive.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
    
    renderProducts();
}

function resetFilters() {
    currentCategory = 'all';
    searchQuery = '';
    searchInput.value = '';
    mobileSearchInput.value = '';
    sortSelect.value = 'featured';
    currentSort = 'featured';
    
    // Reseta visual dos botões de categoria
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach((btn, idx) => {
        if(idx === 0) {
            btn.className = "cat-btn active px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition bg-blue-600 text-white shadow-md shadow-blue-500/20";
        } else {
            btn.className = "cat-btn px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700";
        }
    });

    renderProducts();
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    toggleCart(); // Abre o carrinho automaticamente ao adicionar
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('techstore_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-cart-shopping text-4xl mb-3"></i>
                <p class="text-sm font-medium">Seu carrinho está vazio</p>
            </div>
        `;
        cartTotal.textContent = "R$ 0,00";
        return;
    }

    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = "flex items-center space-x-4 py-4";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-700/50 flex-shrink-0">
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-sm truncate">${item.name}</h4>
                <p class="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div class="flex items-center space-x-2 mt-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs hover:bg-slate-200 dark:hover:bg-slate-600 transition"><i class="fa-solid fa-minus"></i></button>
                    <span class="text-xs font-bold">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs hover:bg-slate-200 dark:hover:bg-slate-600 transition"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-slate-400 hover:text-red-500 p-2 transition">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        `;
        cartItems.appendChild(itemEl);
    });

    cartTotal.textContent = `R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function toggleCart() {
    const isOpen = cartDrawer.classList.contains('translate-x-full');
    if (isOpen) {
        cartDrawer.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    } else {
        cartDrawer.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    }
}

function checkout() {
    if (cart.length === 0) return;
    alert("Pedido finalizado com sucesso! Obrigado por comprar na TechStore.");
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

// Modal de Detalhes
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalContent.innerHTML = `
        <div class="w-full h-72 bg-slate-100 dark:bg-slate-700/50 rounded-2xl overflow-hidden flex items-center justify-center">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div>
            <span class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">${product.brand}</span>
            <h2 class="text-2xl font-bold mt-1 mb-2">${product.name}</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">${product.description}</p>
            
            <div class="grid grid-cols-2 gap-2 mb-6 text-xs bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <div><span class="text-slate-400">Armazenamento:</span> <strong class="block">${product.specs.storage}</strong></div>
                <div><span class="text-slate-400">Memória RAM:</span> <strong class="block">${product.specs.ram}</strong></div>
                <div class="mt-2"><span class="text-slate-400">Câmera:</span> <strong class="block">${product.specs.camera}</strong></div>
                <div class="mt-2"><span class="text-slate-400">Bateria:</span> <strong class="block">${product.specs.battery}</strong></div>
            </div>

            <div class="flex items-center justify-between">
                <div>
                    <span class="text-xs text-slate-400 line-through block">R$ ${product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span class="text-2xl font-black text-slate-900 dark:text-white">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button onclick="closeModal(); addToCart(${product.id});" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center space-x-2">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Comprar</span>
                </button>
            </div>
        </div>
    `;

    productModal.classList.remove('hidden');
}

function closeModal() {
    productModal.classList.add('hidden');
}