// Exact 10 Makeup Products Database with Unsplash High Quality Images
const products = [
    {
        id: 1,
        name: "Paleta Neon Extravaganza",
        category: "Olhos",
        price: 149.90,
        stock: 12,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
        badge: "Mais Vendido"
    },
    {
        id: 2,
        name: "Batom Líquido Matte Ruby Kiss",
        category: "Lábios",
        price: 59.90,
        stock: 25,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
        badge: "Lançamento"
    },
    {
        id: 3,
        name: "Iluminador Líquido Golden Glow",
        category: "Rosto",
        price: 89.90,
        stock: 8,
        image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600",
        badge: "Destaque"
    },
    {
        id: 4,
        name: "Máscara de Cílios Volume Extreme",
        category: "Olhos",
        price: 69.90,
        stock: 15,
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600",
        badge: "Queridinho"
    },
    {
        id: 5,
        name: "Base Líquida Alta Cobertura HD",
        category: "Rosto",
        price: 119.90,
        stock: 5,
        image: "https://images.unsplash.com/photo-1590156206689-feb26e6ef404?auto=format&fit=crop&q=80&w=600",
        badge: "Últimas Unidades"
    },
    {
        id: 6,
        name: "Gloss Labial Holographic Shine",
        category: "Lábios",
        price: 49.90,
        stock: 30,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
        badge: "Tendência"
    },
    {
        id: 7,
        name: "Blush Compacto Rose Sparkle",
        category: "Rosto",
        price: 74.90,
        stock: 18,
        image: "https://images.unsplash.com/photo-1526758085660-84224c7f1a3e?auto=format&fit=crop&q=80&w=600",
        badge: "Essencial"
    },
    {
        id: 8,
        name: "Delineador Neon Retrátil",
        category: "Olhos",
        price: 45.90,
        stock: 22,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
        badge: "Novo"
    },
    {
        id: 9,
        name: "Kit Pincéis Profissionais Rosa Pink",
        category: "Rosto",
        price: 159.90,
        stock: 10,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
        badge: "Luxo"
    },
    {
        id: 10,
        name: "Corretivo Líquido Flawless Cover",
        category: "Rosto",
        price: 64.90,
        stock: 14,
        image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=600",
        badge: "Pró-Grade"
    }
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCounter = document.getElementById('cart-counter');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

// Render Products Function
function renderProducts(items) {
    productsGrid.innerHTML = '';
    if (items.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    items.forEach(product => {
        const stockStatusClass = product.stock <= 5 ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
        const stockText = product.stock <= 5 ? `Últimas unidades (${product.stock})` : `Em estoque (${product.stock})`;

        const card = document.createElement('div');
        card.className = "bg-cardBg border border-neonPink/30 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-neonPink hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-all group";
        card.innerHTML = `
            <div class="relative h-56 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/600x600/1a0b2e/ff007f?text=Make'">
                <span class="absolute top-4 left-4 bg-neonPink text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">${product.badge}</span>
                <span class="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border ${stockStatusClass}">${stockText}</span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <span class="text-xs text-slate-400 uppercase tracking-widest">${product.category}</span>
                    <h3 class="font-bold text-lg text-white mt-1 group-hover:text-neonPink transition-colors">${product.name}</h3>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <span class="text-xl font-extrabold text-goldAccent">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button onclick="addToCart(${product.id})" class="bg-neonPink hover:bg-hotPink text-white p-3 rounded-2xl flex items-center justify-center glow-effect hover:scale-105 transition-all">
                        <i class="fa-solid fa-cart-plus text-sm"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Initial Render
renderProducts(products);

// Search & Filter Logic
function filterAndSearch() {
    const query = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.bg-neonPink').getAttribute('data-category');

    const filtered = products.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterAndSearch);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-neonPink', 'text-white', 'shadow-md');
            b.classList.add('bg-darkBg', 'border', 'border-neonPink/30', 'text-slate-300');
        });
        btn.classList.remove('bg-darkBg', 'border', 'border-neonPink/30', 'text-slate-300');
        btn.classList.add('bg-neonPink', 'text-white', 'shadow-md');
        filterAndSearch();
    });
});

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        if (existing.quantity < product.stock) {
            existing.quantity++;
        } else {
            showToast("Estoque Limite", "Não há mais unidades disponíveis em estoque.", "fa-triangle-exclamation");
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast("Sucesso!", `${product.name} foi adicionado ao carrinho.`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty > 0 && newQty <= product.stock) {
        item.quantity = newQty;
    } else if (newQty > product.stock) {
        showToast("Aviso", "Quantidade máxima em estoque atingida.", "fa-triangle-exclamation");
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCounter.textContent = totalCount;
    cartTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-16 space-y-3">
                <i class="fa-solid fa-bag-shopping text-4xl text-neonPink/40"></i>
                <p class="text-slate-400 font-medium">Seu carrinho está vazio.</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = "flex items-center justify-between py-4";
            row.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-neonPink/30">
                    <div>
                        <h4 class="font-bold text-sm text-white">${item.name}</h4>
                        <p class="text-xs text-goldAccent font-semibold">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-darkBg border border-neonPink/30 text-slate-300 hover:text-white flex items-center justify-center text-xs">-</button>
                            <span class="text-xs font-bold text-white px-1">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-darkBg border border-neonPink/30 text-slate-300 hover:text-white flex items-center justify-center text-xs">+</button>
                        </div>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-slate-400 hover:text-neonPink p-2 transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
}

// Drawer Toggles
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('hidden');
});

closeCartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('hidden');
});

cartBackdrop.addEventListener('click', () => {
    cartDrawer.classList.add('hidden');
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Toast Notification Function
function showToast(title, desc, iconClass = "fa-circle-check") {
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const toastIcon = document.getElementById('toast-icon');

    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toastIcon.className = `fa-solid ${iconClass} text-neonPink text-xl`;

    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3000);
}

// Checkout Action
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    showToast("Pedido Realizado!", "Obrigada por comprar na Glitz & Glow! Redirecionando...", "fa-bag-shopping");
    cart = [];
    updateCartUI();
    setTimeout(() => {
        cartDrawer.classList.add('hidden');
    }, 2000);
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Mensagem Enviada!", "Retornaremos o contato em breve.");
    contactForm.reset();
});