// Base de Dados de Bolsas com Imagens, Preços, Estoque, Cores e Avaliações
const productsData = [
    {
        id: 1,
        name: "Classic Flap Medium",
        brand: "Chanel",
        price: 68900.00,
        stock: 2,
        rating: 5.0,
        reviewsCount: 42,
        description: "Ícone atemporal da maison Chanel em couro de caviar com ferragens banhadas a ouro 24k.",
        colors: [
            { name: "Preto Caviar", hex: "#111111", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" },
            { name: "Bege Nude", hex: "#E3CBB5", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" },
            { name: "Off White", hex: "#F5F5F0", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        id: 2,
        name: "Neverfull MM Monogram",
        brand: "Louis Vuitton",
        price: 14200.00,
        stock: 5,
        rating: 4.8,
        reviewsCount: 89,
        description: "Espaçosa, prática e elegante, a bolsa Neverfull MM combina o clássico Monogram com detalhes em couro natural.",
        colors: [
            { name: "Monogram Brown", hex: "#4A3324", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80" },
            { name: "Damier Ebene", hex: "#2B1D14", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        id: 3,
        name: "GG Marmont Small Shoulder",
        brand: "Gucci",
        price: 18500.00,
        stock: 3,
        rating: 4.9,
        reviewsCount: 31,
        description: "Bolsa tiracolo estruturada em couro matelassê acolchoado com o duplo G icônico no fecho.",
        colors: [
            { name: "Preto Matelassê", hex: "#1A1A1A", img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80" },
            { name: "Vermelho Dusty", hex: "#8B263E", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        id: 4,
        name: "Lady Dior Medium",
        brand: "Dior",
        price: 43000.00,
        stock: 1,
        rating: 5.0,
        reviewsCount: 18,
        description: "Símbolo de elegância e requinte em couro Cannage acolchoado com pingentes 'D.I.O.R.' em metal dourado.",
        colors: [
            { name: "Nude Cannage", hex: "#D8C2B0", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
            { name: "Preto Nobre", hex: "#0F0F0F", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        id: 5,
        name: "Galleria Saffiano Leather",
        brand: "Prada",
        price: 26500.00,
        stock: 4,
        rating: 4.7,
        reviewsCount: 22,
        description: "Confeccionada no icônico couro Saffiano patenteado da Prada, resistente a arranhões com design estruturado.",
        colors: [
            { name: "Preto Prada", hex: "#151515", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80" },
            { name: "Caramel", hex: "#A56B46", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        id: 6,
        name: "Loulou Small Monogram",
        brand: "Saint Laurent",
        price: 21900.00,
        stock: 2,
        rating: 4.9,
        reviewsCount: 27,
        description: "Bolsa de ombro macia com costura matelassê em Y e o emblemático fecho YSL dourado.",
        colors: [
            { name: "Preto YSL", hex: "#121212", img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80" },
            { name: "Creme Beige", hex: "#EFE6DD", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" }
        ]
    }
];

// Avaliações de Clientes Iniciais
let reviewsData = [
    {
        name: "Fernanda Lima M.",
        bag: "Chanel Classic Flap",
        stars: 5,
        comment: "Atendimento exemplar do Concierge! A bolsa chegou impecável, com certificado autenticado na caixa original."
    },
    {
        name: "Beatriz A.",
        bag: "Louis Vuitton Neverfull",
        stars: 5,
        comment: "Entrega super rápida no Rio de Janeiro. O estado da bolsa é absolutamente novo. Apaixonada!"
    },
    {
        name: "Mariana R.",
        bag: "Lady Dior Medium",
        stars: 5,
        comment: "Minha primeira compra na Bella Luxe e fiquei impressionada com a segurança e o cuidado no envio."
    }
];

// Estado do Carrinho de Compras
let cart = [];
let appliedCoupon = null;
const COUPONS = {
    'BELLALUXE10': 0.10, // 10% OFF
    'VIP15': 0.15 // 15% OFF
};

// Variáveis de Filtro Atuais
let currentBrand = 'todos';
let currentSearch = '';
let currentSort = 'featured';

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const sortSelect = document.getElementById('sortSelect');
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalContent = document.getElementById('modalContent');
const reviewsContainer = document.getElementById('reviewsContainer');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutSuccess = document.getElementById('checkoutSuccess');
const checkoutContent = document.getElementById('checkoutContent');

// Formatação Monetária
function formatMoney(amount) {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderização dos Produtos na Tela
function renderProducts() {
    let filtered = productsData.filter(p => {
        const matchesBrand = currentBrand === 'todos' || p.brand.toLowerCase() === currentBrand.toLowerCase();
        const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                              p.brand.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesBrand && matchesSearch;
    });

    // Ordenação
    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    productsGrid.innerHTML = '';

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full py-12 text-center text-gray-500">
                <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-gold-400"></i>
                <p class="text-base font-serif">Nenhuma bolsa encontrada para a busca informada.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const selectedColor = p.colors[0];
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl overflow-hidden border border-nude-200 hover:shadow-xl transition-all duration-300 flex flex-col group animate-fade-in";
        
        card.innerHTML = `
            <div class="relative overflow-hidden bg-nude-100 aspect-square">
                <img id="img-${p.id}" src="${selectedColor.img}" alt="${p.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-nude-200">
                    ${p.brand}
                </span>
                ${p.stock <= 2 ? `<span class="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Apenas ${p.stock} un</span>` : ''}
                
                <button onclick="openQuickView(${p.id})" class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-black hover:text-white text-neutral-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap">
                    <i class="fa-regular fa-eye"></i> Visualizar Peça
                </button>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <!-- Rating -->
                    <div class="flex items-center text-xs text-gold-500 gap-1 mb-1">
                        <i class="fa-solid fa-star"></i>
                        <span class="font-bold text-neutral-800 text-xs">${p.rating.toFixed(1)}</span>
                        <span class="text-gray-400 text-[11px]">(${p.reviewsCount})</span>
                    </div>

                    <h3 class="font-serif text-base font-bold text-neutral-900 group-hover:text-gold-600 transition-colors">${p.name}</h3>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">${p.description}</p>
                </div>

                <div class="mt-4 pt-4 border-t border-nude-100">
                    <!-- Seletor de Cores -->
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-[11px] uppercase font-semibold text-gray-400">Cores Disponíveis:</span>
                        <div class="flex space-x-1.5">
                            ${p.colors.map((c, index) => `
                                <button onclick="changeProductColor(${p.id}, '${c.img}', '${c.name}', this)" 
                                    class="color-dot w-4 h-4 rounded-full border border-gray-300 hover:scale-110 transition-transform ${index === 0 ? 'ring-1 ring-gold-500' : ''}" 
                                    style="background-color: ${c.hex};" 
                                    title="${c.name}">
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Preço e Botão Adicionar -->
                    <div class="flex items-end justify-between">
                        <div>
                            <span class="text-xs text-gray-400 block -mb-1">Valor do investimento</span>
                            <span class="text-lg font-bold text-neutral-900">${formatMoney(p.price)}</span>
                        </div>

                        <button onclick="addToCart(${p.id})" class="p-2.5 bg-dark hover:bg-gold-500 text-white rounded-lg transition-colors flex items-center justify-center" title="Adicionar à Sacola">
                            <i class="fa-solid fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Trocar Imagem ao Clicar na Cor do Card
function changeProductColor(productId, imgUrl, colorName, btnElement) {
    const imgEl = document.getElementById(`img-${productId}`);
    if (imgEl) {
        imgEl.src = imgUrl;
    }
    const dots = btnElement.parentElement.querySelectorAll('.color-dot');
    dots.forEach(d => d.classList.remove('ring-1', 'ring-gold-500'));
    btnElement.classList.add('ring-1', 'ring-gold-500');
}

// Abrir Modal de Visualização Rápida
function openQuickView(id) {
    const p = productsData.find(item => item.id === id);
    if (!p) return;

    modalContent.innerHTML = `
        <div class="bg-nude-100 p-6 flex items-center justify-center">
            <img id="modalMainImg" src="${p.colors[0].img}" alt="${p.name}" class="max-h-80 object-contain rounded-lg">
        </div>
        <div class="p-6 flex flex-col justify-between">
            <div>
                <span class="text-xs uppercase tracking-widest font-bold text-gold-600">${p.brand}</span>
                <h2 class="font-serif text-2xl font-bold text-neutral-900 mt-1 mb-2">${p.name}</h2>
                <div class="flex items-center text-xs text-gold-500 gap-1 mb-4">
                    <i class="fa-solid fa-star"></i>
                    <span class="font-bold text-neutral-800">${p.rating.toFixed(1)}</span>
                    <span class="text-gray-400">(${p.reviewsCount} avaliações de compradores)</span>
                </div>
                <p class="text-xs text-gray-600 mb-4 leading-relaxed">${p.description}</p>
                
                <div class="mb-4">
                    <span class="text-xs font-bold uppercase text-neutral-800 block mb-2">Cor Selecionada: <span id="modalSelectedColorName" class="font-normal text-gray-600">${p.colors[0].name}</span></span>
                    <div class="flex space-x-2">
                        ${p.colors.map((c, idx) => `
                            <button onclick="updateModalColor('${c.img}', '${c.name}', this)" class="modal-color-btn p-1 rounded-lg border border-nude-200 hover:border-gold-400 ${idx === 0 ? 'border-gold-500 bg-nude-100' : ''}">
                                <div class="w-6 h-6 rounded-full" style="background-color: ${c.hex};"></div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-nude-50 p-3 rounded-lg border border-nude-200 mb-4 text-xs space-y-1">
                    <div class="flex items-center text-emerald-700 font-semibold gap-1.5">
                        <i class="fa-solid fa-shield-halved"></i> Autenticidade Verificada com Certificado
                    </div>
                    <div class="text-gray-500">Estoque Disponível: <span class="font-bold text-neutral-800">${p.stock} unidades</span></div>
                </div>
            </div>

            <div>
                <div class="text-2xl font-bold text-neutral-900 mb-4">${formatMoney(p.price)}</div>
                <button onclick="addToCart(${p.id}); closeProductModalFunc();" class="w-full py-3.5 bg-dark hover:bg-gold-500 text-white uppercase text-xs font-bold tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
                    <i class="fa-solid fa-bag-shopping"></i> Adicionar à Sacola
                </button>
            </div>
        </div>
    `;

    productModal.classList.remove('hidden');
}

function updateModalColor(imgUrl, colorName, btn) {
    document.getElementById('modalMainImg').src = imgUrl;
    document.getElementById('modalSelectedColorName').innerText = colorName;
    document.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('border-gold-500', 'bg-nude-100'));
    btn.classList.add('border-gold-500', 'bg-nude-100');
}

function closeProductModalFunc() {
    productModal.classList.add('hidden');
}

// Gerenciamento do Carrinho
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        if (existing.quantity < product.stock) {
            existing.quantity += 1;
            showToast(`Mais uma unidade de "${product.name}" adicionada.`);
        } else {
            showToast(`Estoque máximo atingido para esta peça.`);
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            img: product.colors[0].img,
            color: product.colors[0].name,
            quantity: 1,
            maxStock: product.stock
        });
        showToast(`"${product.name}" adicionada à sacola.`);
    }

    updateCartUI();
    openCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (item.quantity + delta > item.maxStock) {
        showToast("Estoque máximo disponível atingido.");
        return;
    }

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalItems;
    cartBadge.style.opacity = totalItems > 0 ? '1' : '0';

    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fa-solid fa-bag-shopping text-4xl mb-3 text-nude-200"></i>
                <p class="text-sm font-medium">Sua sacola de compras está vazia.</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = "py-4 flex gap-4 items-center";
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-nude-100">
                <div class="flex-1">
                    <span class="text-[10px] uppercase font-bold text-gold-600">${item.brand}</span>
                    <h4 class="text-xs font-bold text-neutral-900">${item.name}</h4>
                    <p class="text-[11px] text-gray-500">${item.color}</p>
                    <div class="text-xs font-bold text-neutral-900 mt-1">${formatMoney(item.price)}</div>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-600 text-xs">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="flex items-center border border-nude-200 rounded-lg bg-white">
                        <button onclick="updateQuantity(${item.id}, -1)" class="px-2 py-0.5 text-xs text-gray-600 hover:bg-nude-100">-</button>
                        <span class="px-2 text-xs font-bold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="px-2 py-0.5 text-xs text-gray-600 hover:bg-nude-100">+</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(itemEl);
        });
    }

    // Cálculos de Preço
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountRate = appliedCoupon ? COUPONS[appliedCoupon] : 0;
    const discountAmount = subtotal * discountRate;
    const total = subtotal - discountAmount;

    cartSubtotal.innerText = formatMoney(subtotal);
    cartDiscount.innerText = `- ${formatMoney(discountAmount)}`;
    cartTotal.innerText = formatMoney(total);
}

function openCart() {
    cartDrawer.classList.remove('hidden');
}

function closeCart() {
    cartDrawer.classList.add('hidden');
}

// Cupom de Desconto
document.getElementById('applyCouponBtn').addEventListener('click', () => {
    const input = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMessage');
    msg.classList.remove('hidden', 'text-green-600', 'text-red-600');

    if (COUPONS[input]) {
        appliedCoupon = input;
        msg.innerText = `Cupom "${input}" aplicado (${COUPONS[input] * 100}% de desconto)!`;
        msg.classList.add('text-green-600');
        updateCartUI();
    } else {
        msg.innerText = "Cupom inválido ou expirado.";
        msg.classList.add('text-red-600');
    }
});

// Toast Feedback
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Renderizar Avaliações de Clientes
function renderReviews() {
    reviewsContainer.innerHTML = '';
    reviewsData.forEach(r => {
        const revCard = document.createElement('div');
        revCard.className = "bg-white p-6 rounded-2xl border border-nude-200 shadow-sm flex flex-col justify-between";
        revCard.innerHTML = `
            <div>
                <div class="flex text-gold-500 text-xs mb-3">
                    ${Array(r.stars).fill('<i class="fa-solid fa-star"></i>').join('')}
                </div>
                <p class="text-xs text-gray-600 italic mb-4">"${r.comment}"</p>
            </div>
            <div class="pt-3 border-t border-nude-100 flex justify-between items-center text-xs">
                <div>
                    <span class="font-bold text-neutral-900 block">${r.name}</span>
                    <span class="text-gray-400 text-[10px]">Comprou: ${r.bag}</span>
                </div>
                <span class="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <i class="fa-solid fa-check text-[8px]"></i> Verificado
                </span>
            </div>
        `;
        reviewsContainer.appendChild(revCard);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderReviews();

    // Filtros de Marca
    document.querySelectorAll('.brand-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.brand-filter').forEach(b => b.classList.remove('active', 'bg-dark', 'text-white'));
            document.querySelectorAll('.brand-filter').forEach(b => b.classList.add('bg-nude-100', 'text-neutral-600'));
            
            e.target.classList.add('active', 'bg-dark', 'text-white');
            e.target.classList.remove('bg-nude-100', 'text-neutral-600');
            
            currentBrand = e.target.getAttribute('data-brand');
            renderProducts();
        });
    });

    // Filtro por Busca
    const handleSearch = (e) => {
        currentSearch = e.target.value;
        renderProducts();
    };
    searchInput.addEventListener('input', handleSearch);
    mobileSearchInput.addEventListener('input', handleSearch);

    // Ordenação
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Abrir/Fechar Carrinho
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Modal de Produto
    closeProductModal.addEventListener('click', closeProductModalFunc);

    // Toggle FAQ Accordion
    document.querySelectorAll('.faq-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Form de Nova Avaliação
    document.getElementById('addReviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('revName').value;
        const bag = document.getElementById('revBag').value;
        const stars = parseInt(document.getElementById('revStars').value);
        const comment = document.getElementById('revComment').value;

        reviewsData.unshift({ name, bag, stars, comment });
        renderReviews();
        e.target.reset();
        showToast("Sua avaliação foi enviada com sucesso!");
    });

    // Form de Contato / Concierge
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Solicitação enviada. Nosso Concierge entrará em contato em instantes.");
        e.target.reset();
    });

    // Checkout Modal Simulation
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Sua sacola está vazia.");
            return;
        }
        closeCart();
        checkoutModal.classList.remove('hidden');
    });

    closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkoutContent.classList.add('hidden');
        checkoutSuccess.classList.remove('hidden');
        cart = [];
        updateCartUI();
    });

    document.getElementById('closeSuccessBtn').addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
        checkoutSuccess.classList.add('hidden');
        checkoutContent.classList.remove('hidden');
    });

    // Mobile Menu Toggle
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });
});