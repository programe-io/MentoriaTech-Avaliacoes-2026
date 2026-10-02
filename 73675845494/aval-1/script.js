// Base de dados de produtos esportivos com vibe atual e cores vibrantes
const products = [
    {
        id: 1,
        name: "Tênis VibeRunner Neon Pro",
        category: "calcados",
        price: 599.90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        tag: "Mais Vendido"
    },
    {
        id: 2,
        name: "Smartwatch Esportivo Pulse",
        category: "acessorios",
        price: 349.90,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        tag: "Lançamento"
    },
    {
        id: 3,
        name: "Kit Halteres Ajustáveis 20kg",
        category: "treino",
        price: 499.90,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
        tag: "Frete Grátis"
    },
    {
        id: 4,
        name: "Mochila Impermeável TechSport",
        category: "acessorios",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        tag: "Resistente"
    },
    {
        id: 5,
        name: "Tênis PowerLift Force",
        category: "calcados",
        price: 529.90,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        tag: "Pro Level"
    },
    {
        id: 6,
        name: "Corda de Pular Digital Speed",
        category: "treino",
        price: 119.90,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
        tag: "Essencial"
    }
];

// Estado do Carrinho de Compras
let cart = [];
let activeDiscount = 0; // Porcentagem de desconto (ex: 40 para 40%)

// Elementos do DOM
const productGrid = document.getElementById('product-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartDiscountEl = document.getElementById('cart-discount');
const cartTotal = document.getElementById('cart-total');
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.getElementById('menu-toggle');
const applyCouponBtn = document.getElementById('apply-coupon');
const couponInput = document.getElementById('coupon-input');
const discountFeedback = document.getElementById('discount-feedback');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    startCountdown();
});

// Renderizar Produtos na Tela
function renderProducts(items) {
    productGrid.innerHTML = '';
    
    if(items.length === 0) {
        productGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-12">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card bg-gray-900 border border-gray-800 rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group";
        card.innerHTML = `
            <div>
                <div class="relative rounded-2xl overflow-hidden h-60 bg-gray-950 mb-4">
                    <span class="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-lime-400 text-xs font-bold px-3 py-1 rounded-full border border-lime-400/20">${product.tag}</span>
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="font-extrabold text-lg text-white mb-1">${product.name}</h3>
                <p class="text-gray-400 text-xs uppercase tracking-wider mb-4">${product.category}</p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-800/80">
                <span class="text-xl font-black text-lime-400">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button onclick="addToCart(${product.id})" class="bg-gray-800 hover:bg-lime-400 hover:text-black text-white p-3 rounded-xl transition-all font-bold text-sm flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Adicionar
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Configurar Ouvintes de Eventos
function setupEventListeners() {
    // Abrir/Fechar Carrinho
    openCartBtn.addEventListener('click', () => toggleCart(true));
    closeCartBtn.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    // Menu Mobile Toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Filtros de Categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-lime-400', 'text-black');
                b.classList.add('bg-gray-900', 'border', 'border-gray-800');
            });
            e.target.classList.remove('bg-gray-900', 'border', 'border-gray-800');
            e.target.classList.add('bg-lime-400', 'text-black');

            const filter = e.target.getAttribute('data-filter');
            if(filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Aplicar Cupom
    applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if(code === 'VIBE2026') {
            activeDiscount = 40;
            discountFeedback.textContent = "Cupom VIBE2026 aplicado: 40% OFF!";
            discountFeedback.classList.remove('hidden');
            updateCartUI();
        } else if(code === 'FRETEVIP') {
            activeDiscount = 15;
            discountFeedback.textContent = "Cupom FRETEVIP aplicado: 15% OFF!";
            discountFeedback.classList.remove('hidden');
            updateCartUI();
        } else {
            alert('Cupom inválido ou expirado.');
        }
    });

    // Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        if(cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        alert('🎉 Pedido realizado com sucesso! Obrigado por comprar na VibeSport.');
        cart = [];
        activeDiscount = 0;
        couponInput.value = '';
        discountFeedback.classList.add('hidden');
        updateCartUI();
        toggleCart(false);
    });

    // Envio do Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Abrir e Fechar Gaveta do Carrinho
function toggleCart(open) {
    if(open) {
        cartDrawer.classList.remove('hidden');
    } else {
        cartDrawer.classList.add('hidden');
    }
}

// Adicionar Produto ao Carrinho
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true);
}

// Remover Produto do Carrinho
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Alterar Quantidade
window.changeQuantity = function(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if(item) {
        item.quantity += delta;
        if(item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    // Contador Total de Itens
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Renderizar Itens na Gaveta
    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Seu carrinho está vazio.</p>`;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = "flex items-center justify-between py-4";
            el.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-xl bg-gray-950">
                    <div>
                        <h4 class="font-bold text-sm text-white">${item.name}</h4>
                        <p class="text-xs text-lime-400 font-bold mt-0.5">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center bg-gray-950 border border-gray-800 rounded-lg">
                        <button onclick="changeQuantity(${item.id}, -1)" class="px-2 py-1 text-gray-400 hover:text-white">-</button>
                        <span class="text-xs font-bold px-2">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="px-2 py-1 text-gray-400 hover:text-white">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-pink-500 text-sm">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
    }

    // Calcular Subtotal, Desconto e Total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * activeDiscount) / 100;
    const total = subtotal - discountAmount;

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartDiscountEl.textContent = `- R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Contador Regressivo para a Seção de Descontos
function startCountdown() {
    let hours = 12, minutes = 45, seconds = 30;

    setInterval(() => {
        seconds--;
        if(seconds < 0) {
            seconds = 59;
            minutes--;
            if(minutes < 0) {
                minutes = 59;
                hours--;
                if(hours < 0) {
                    hours = 12; // Reseta o timer cíclico
                }
            }
        }

        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if(hEl && mEl && sEl) {
            hEl.textContent = String(hours).padStart(2, '0');
            mEl.textContent = String(minutes).padStart(2, '0');
            sEl.textContent = String(seconds).padStart(2, '0');
        }
    }, 1000);
}