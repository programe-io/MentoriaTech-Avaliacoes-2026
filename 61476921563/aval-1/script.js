// Dataset com 10 produtos de luxo com cores marcantes e imagens Unsplash de alta qualidade
const products = [
    {
        id: 1,
        name: "Terno Slim Alfaiataria Royal Blue",
        brand: "Armani",
        category: "Ternos",
        price: 8990.00,
        stock: 3,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        description: "Lã virgem italiana em tom azul royal vibrante. O ápice da elegância masculina moderna.",
        sizes: ["46 (P)", "48 (M)", "50 (G)"]
    },
    {
        id: 2,
        name: "Jaqueta Bomber Velvet Emerald",
        brand: "Gucci",
        category: "Jaquetas",
        price: 7450.00,
        stock: 2,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        description: "Veludo italiano verde esmeralda com acabamento bordado à mão e detalhes metalizados.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 3,
        name: "Vestido Longo Silk Crimson",
        brand: "Prada",
        category: "Vestidos",
        price: 11200.00,
        stock: 1,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
        description: "Seda pura vermelha com caimento fluido e fenda lateral sutil para grandes galas.",
        sizes: ["36", "38", "40"]
    },
    {
        id: 4,
        name: "Camisa Oversized Baroque Gold",
        brand: "Versace",
        category: "Camisetas",
        price: 3200.00,
        stock: 5,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
        description: "Algodão egípcio com estampa icônica barroca em tons vibrantes de dourado e preto.",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 5,
        name: "Casaco Trench Coat Amber Gold",
        brand: "Armani",
        category: "Jaquetas",
        price: 9800.00,
        stock: 4,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
        description: "Cashmere em tom âmbar luxuoso com cinto ajustável e botões em chifre polido.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 6,
        name: "Blazer Jacquard Forest Green",
        brand: "Gucci",
        category: "Ternos",
        price: 6500.00,
        stock: 2,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        description: "Padrão geométrico verde floresta tecido em jacquard com lapelas em cetim.",
        sizes: ["48 (M)", "50 (G)"]
    },
    {
        id: 7,
        name: "Vestido Cocktail Ruby Red",
        brand: "Prada",
        category: "Vestidos",
        price: 8400.00,
        stock: 3,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
        description: "Design limpo e estruturado em crepe vermelho rubi de alta densidade.",
        sizes: ["36", "38", "40", "42"]
    },
    {
        id: 8,
        name: "Jaqueta Biker Nappa Noir",
        brand: "Balenciaga",
        category: "Jaquetas",
        price: 12500.00,
        stock: 1,
        image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop",
        description: "Couro nappa ultra macio com ferragens envelhecidas e zíper assimétrico.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 9,
        name: "Polo Supima Tangerine",
        brand: "Armani",
        category: "Camisetas",
        price: 1850.00,
        stock: 8,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
        description: "Algodão Supima em vibrante tom tangerina com toque sedoso e colarinho estruturado.",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 10,
        name: "Smoking Velvet Midnight Blue",
        brand: "Versace",
        category: "Ternos",
        price: 10900.00,
        stock: 2,
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop",
        description: "Smoking azul meia-noite em veludo italiano com acabamento acetinado nas lapelas.",
        sizes: ["48 (M)", "50 (G)", "52 (GG)"]
    }
];

let cart = [];

// Inicialização da Aplicação
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    populateReservationSelect();
});

// Renderização dos Produtos na Tela
function renderProducts(items) {
    const grid = document.getElementById("products-grid");
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center">
                <i class="fa-solid fa-vest text-4xl text-neutral-600 mb-4"></i>
                <p class="text-gray-400">Nenhuma peça encontrada com os filtros selecionados.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(product => `
        <div class="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:border-luxury-gold/50 transition-all duration-300 shadow-xl">
            <!-- Imagem do Produto -->
            <div class="relative h-80 overflow-hidden bg-neutral-950">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-3 left-3 bg-luxury-dark/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-luxury-gold border border-luxury-gold/30 uppercase tracking-wider">
                    ${product.brand}
                </div>
                ${product.stock <= 2 ? `
                <div class="absolute top-3 right-3 bg-red-500/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    Estoque Baixo (${product.stock})
                </div>` : ''}
            </div>

            <!-- Informações do Produto -->
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <span class="text-xs text-gray-400 uppercase tracking-wider">${product.category}</span>
                    <h3 class="font-serif text-lg font-bold text-white mt-0.5 group-hover:text-luxury-gold transition-colors">${product.name}</h3>
                    <p class="text-xs text-gray-400 mt-1 line-clamp-2">${product.description}</p>
                </div>

                <div class="space-y-3 pt-2 border-t border-neutral-800">
                    <!-- Tamanhos Disponíveis -->
                    <div class="flex items-center space-x-1.5">
                        <span class="text-[10px] uppercase tracking-wider text-gray-400 mr-1">Tamanhos:</span>
                        ${product.sizes.map(size => `
                            <span class="text-[10px] bg-neutral-800 text-gray-300 px-1.5 py-0.5 rounded border border-neutral-700">${size}</span>
                        `).join('')}
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-[10px] uppercase tracking-wider text-gray-500 block">Investimento</span>
                            <span class="text-lg font-bold text-luxury-gold">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="bg-neutral-800 hover:bg-luxury-gold hover:text-black text-white p-3 rounded-xl transition-all shadow-md">
                            <i class="fa-solid fa-bag-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtros do Catálogo
function filterProducts() {
    const brand = document.getElementById("filter-brand").value;
    const category = document.getElementById("filter-category").value;
    const priceRange = document.getElementById("filter-price").value;

    let filtered = products.filter(p => {
        let matchBrand = (brand === "all" || p.brand === brand);
        let matchCategory = (category === "all" || p.category === category);
        let matchPrice = true;

        if (priceRange === "low") matchPrice = p.price <= 3000;
        else if (priceRange === "mid") matchPrice = p.price > 3000 && p.price <= 8000;
        else if (priceRange === "high") matchPrice = p.price > 8000;

        return matchBrand && matchCategory && matchPrice;
    });

    renderProducts(filtered);
}

// Manipulação do Carrinho de Compras
function toggleCart() {
    const drawer = document.getElementById("cart-drawer");
    const panel = document.getElementById("cart-panel");
    
    if (drawer.classList.contains("pointer-events-none")) {
        drawer.classList.remove("pointer-events-none", "opacity-0");
        panel.classList.remove("translate-x-full");
    } else {
        drawer.classList.add("pointer-events-none", "opacity-0");
        panel.classList.add("translate-x-full");
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        if (existing.quantity < product.stock) {
            existing.quantity++;
        } else {
            showToast("Estoque Limitado", "Não há mais unidades disponíveis em estoque.");
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast("Adicionado à Sacola", `${product.name} foi inserido na sua sacola VIP.`);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById("cart-badge");
    const itemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("cart-subtotal");
    const totalEl = document.getElementById("cart-total");

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove("scale-0");
    } else {
        badge.classList.add("scale-0");
    }

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-16 text-gray-500">
                <i class="fa-solid fa-bag-shopping text-4xl mb-3"></i>
                <p class="text-sm">Sua sacola de luxo está vazia.</p>
            </div>
        `;
    } else {
        itemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-grow">
                    <h4 class="font-serif text-sm font-bold text-white">${item.name}</h4>
                    <span class="text-xs text-luxury-gold">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <div class="flex items-center space-x-3 mt-2">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs">-</button>
                        <span class="text-xs font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    subtotalEl.textContent = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    totalEl.textContent = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

// Sistema de Reserva (24h)
function populateReservationSelect() {
    const select = document.getElementById("reservation-item-select");
    select.innerHTML = products.map(p => `
        <option value="${p.id}">${p.brand} - ${p.name} (R$ ${p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</option>
    `).join('');
}

function openReservationModal() {
    document.getElementById("reservation-modal").classList.remove("hidden");
}

function closeReservationModal() {
    document.getElementById("reservation-modal").classList.add("hidden");
}

function handleReservation(event) {
    event.preventDefault();
    closeReservationModal();
    showToast("Reserva Emitida com Sucesso", "Sua peça foi reservada por 24 horas. Verifique seu WhatsApp.");
}

// Checkout Seguro
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Sacola Vazia", "Adicione itens à sacola antes de finalizar a compra.");
        return;
    }
    toggleCart();
    document.getElementById("checkout-modal").classList.remove("hidden");
}

function closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.add("hidden");
}

function handleCheckout(event) {
    event.preventDefault();
    closeCheckoutModal();
    cart = [];
    updateCartUI();
    showToast("Pedido Confirmado!", "Parabéns por adquirir alta costura conosco. E-mail de confirmação enviado.");
}

// Notificações Toast
function showToast(title, msg) {
    const toast = document.getElementById("toast");
    document.getElementById("toast-title").textContent = title;
    document.getElementById("toast-msg").textContent = msg;

    toast.classList.remove("translate-y-32", "opacity-0");
    setTimeout(() => {
        toast.classList.add("translate-y-32", "opacity-0");
    }, 4000);
}