// Array containing exactly 10 world-class sports motorcycles as requested
const motorcycles = [
    {
        id: 1,
        name: "Yamaha YZF-R1",
        displacement: "998cc",
        price: 135900,
        rating: 4.9,
        reviewsCount: 128,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
        badge: "Mais Vendida",
        description: "Desenvolvida com DNA da MotoGP, oferecendo controle absoluto e eletrônica avançada."
    },
    {
        id: 2,
        name: "Kawasaki Ninja H2",
        displacement: "998cc Supercharged",
        price: 215000,
        rating: 5.0,
        reviewsCount: 94,
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
        badge: "Supercharged",
        description: "A máquina sobrealimentada mais extrema já produzida para as ruas."
    },
    {
        id: 3,
        name: "Ducati Panigale V4",
        displacement: "1103cc",
        price: 154900,
        rating: 4.9,
        reviewsCount: 112,
        image: "https://images.unsplash.com/photo-1614165936830-4e3a4e976cb2?auto=format&fit=crop&q=80&w=800",
        badge: "Italiana",
        description: "Pura essência italiana, aerodinâmica refinada e motor V4 Desmosedici Stradale."
    },
    {
        id: 4,
        name: "BMW S1000RR",
        displacement: "999cc",
        price: 129900,
        rating: 4.8,
        reviewsCount: 142,
        image: "https://images.unsplash.com/photo-1609630875172-23c31d7768b4?auto=format&fit=crop&q=80&w=800",
        badge: "Tecnologia M",
        description: "Precisão alemã com tecnologia ShiftCam e alto desempenho nas curvas."
    },
    {
        id: 5,
        name: "Honda CBR 1000RR-R",
        displacement: "1000cc Fireblade",
        price: 142000,
        rating: 4.9,
        reviewsCount: 88,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=800",
        badge: "HRC Track",
        description: "Nascida nas pistas para dominar qualquer circuito com asas aerodinâmicas."
    },
    {
        id: 6,
        name: "Suzuki Hayabusa",
        displacement: "1340cc",
        price: 119900,
        rating: 4.8,
        reviewsCount: 205,
        image: "https://images.unsplash.com/photo-1547549883-80f074d28d6d?auto=format&fit=crop&q=80&w=800",
        badge: "Lendária",
        description: "A falcão peregrino das estradas, famosa mundialmente pela velocidade final inigualável."
    },
    {
        id: 7,
        name: "Aprilia RSV4",
        displacement: "1099cc",
        price: 148000,
        rating: 4.9,
        reviewsCount: 76,
        image: "https://images.unsplash.com/photo-1599813981889-6c31d55e40a4?auto=format&fit=crop&q=80&w=800",
        badge: "V4 Racing",
        description: "O chassi mais refinado do motociclismo mundial aliado ao motor V4 de altíssima rotação."
    },
    {
        id: 8,
        name: "Triumph Daytona 765",
        displacement: "765cc Moto2",
        price: 89900,
        rating: 4.7,
        reviewsCount: 64,
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
        badge: "Edição Limitada",
        description: "Exclusiva edição inspirada no motor tricilíndrico oficial do campeonato Moto2."
    },
    {
        id: 9,
        name: "KTM RC 8C",
        displacement: "889cc Track",
        price: 175000,
        rating: 5.0,
        reviewsCount: 41,
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
        badge: "Pura Pista",
        description: "Superbike leve artesanal feita para cronometrar o melhor tempo em track days."
    },
    {
        id: 10,
        name: "MV Agusta F4",
        displacement: "998cc",
        price: 165000,
        rating: 4.9,
        reviewsCount: 59,
        image: "https://images.unsplash.com/photo-1614165936830-4e3a4e976cb2?auto=format&fit=crop&q=80&w=800",
        badge: "Arte em Movimento",
        description: "Considerada uma das motocicletas mais belas e exclusivas já desenhadas na história."
    }
];

// Promotional items selection (Subset of motorcycles with promotional discounts)
const promotions = [
    {
        ...motorcycles[0], // Yamaha R1
        promoPrice: 125900,
        discountBadge: "Desconto de R$ 10.000",
        promoValid: "Válido até domingo"
    },
    {
        ...motorcycles[3], // BMW S1000RR
        promoPrice: 119900,
        discountBadge: "IPVA Grátis + Bônus",
        promoValid: "Últimas unidades"
    }
];

// Shopping Cart State
let cart = [];

// Format currency to BRL
function formatBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Render stock grid items
function renderEstoque() {
    const grid = document.getElementById('motorcycle-grid');
    grid.innerHTML = '';

    motorcycles.forEach(moto => {
        const card = document.createElement('div');
        card.className = "bg-cardBg rounded-2xl border border-gray-800 overflow-hidden hover:border-neonRed/60 transition-all duration-300 group flex flex-col";
        card.innerHTML = `
            <div class="relative h-64 overflow-hidden bg-gray-900">
                <span class="absolute top-4 left-4 z-10 bg-darkBg/80 backdrop-blur-md text-neonRed border border-neonRed/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${moto.badge}
                </span>
                <img src="${moto.image}" alt="${moto.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/131c2e/ff1e42?text=Velocity+Motors'">
                <div class="absolute inset-0 bg-gradient-to-t from-cardBg via-transparent to-transparent opacity-80"></div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-semibold text-gray-400 uppercase tracking-widest">${moto.displacement}</span>
                        <div class="flex items-center space-x-1 bg-gray-900 px-2.5 py-1 rounded-lg border border-gray-800">
                            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
                            <span class="text-xs font-bold text-white">${moto.rating}</span>
                            <span class="text-xs text-gray-500">(${moto.reviewsCount})</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-black text-white group-hover:text-neonRed transition-colors mb-2">${moto.name}</h3>
                    <p class="text-gray-400 text-xs sm:text-sm mb-6 line-clamp-2">${moto.description}</p>
                </div>
                <div class="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                    <div>
                        <span class="block text-xs text-gray-500 uppercase font-semibold">À Vista / Financiado</span>
                        <span class="text-lg sm:text-xl font-black text-white">${formatBRL(moto.price)}</span>
                    </div>
                    <button onclick="addToCart(${moto.id})" class="px-4 py-3 rounded-xl bg-neonRed/10 border border-neonRed/40 hover:bg-neonRed text-neonRed hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group/btn">
                        <i class="fa-solid fa-cart-plus group-hover/btn:scale-110 transition-transform"></i>
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render promotions grid
function renderPromotions() {
    const grid = document.getElementById('promotions-grid');
    grid.innerHTML = '';

    promotions.forEach(moto => {
        const card = document.createElement('div');
        card.className = "bg-cardBg rounded-2xl border border-neonRed/40 overflow-hidden shadow-xl relative flex flex-col md:flex-row group";
        card.innerHTML = `
            <div class="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <span class="absolute top-4 left-4 z-10 bg-neonRed text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${moto.discountBadge}
                </span>
                <img src="${moto.image}" alt="${moto.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/131c2e/ff1e42?text=Promoção'">
            </div>
            <div class="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold text-neonRed uppercase tracking-widest">${moto.promoValid}</span>
                    <h3 class="text-2xl font-black text-white mt-1 mb-2">${moto.name}</h3>
                    <p class="text-gray-400 text-xs sm:text-sm mb-6">${moto.description}</p>
                </div>
                <div>
                    <div class="mb-4">
                        <span class="text-xs text-gray-500 line-through mr-2">${formatBRL(moto.price)}</span>
                        <span class="text-2xl font-black text-neonRed text-glow">${formatBRL(moto.promoPrice)}</span>
                    </div>
                    <button onclick="addPromoToCart(${moto.id})" class="w-full py-3.5 rounded-xl bg-neonRed hover:bg-neonHover text-white font-bold text-xs uppercase tracking-wider glow-red-sm transition-all duration-300 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-bolt"></i>
                        <span>Aproveitar Oferta</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Toggle Mobile Navigation Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.className = "fa-solid fa-bars text-lg";
    } else {
        icon.className = "fa-solid fa-xmark text-lg";
    }
}

// Toggle Shopping Cart Drawer
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
    if (!drawer.classList.contains('hidden')) {
        renderCartItems();
    }
}

// Toast Notification Helper
function showToast(title, desc) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    
    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3500);
}

// Add Regular Moto to Cart
function addToCart(id) {
    const moto = motorcycles.find(m => m.id === id);
    if (!moto) return;

    const existingItem = cart.find(item => item.id === id && !item.isPromo);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: moto.id,
            name: moto.name,
            price: moto.price,
            image: moto.image,
            quantity: 1,
            isPromo: false
        });
    }
    updateCartCounter();
    showToast("Adicionado!", `${moto.name} foi inserida no carrinho.`);
}

// Add Promotional Moto to Cart
function addPromoToCart(id) {
    const promo = promotions.find(p => p.id === id);
    if (!promo) return;

    const existingItem = cart.find(item => item.id === id && item.isPromo);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: promo.id,
            name: `${promo.name} (Promoção)`,
            price: promo.promoPrice,
            image: promo.image,
            quantity: 1,
            isPromo: true
        });
    }
    updateCartCounter();
    showToast("Oferta Aplicada!", `${promo.name} com preço promocional no carrinho.`);
}

// Update Cart Counter Badge
function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.innerText = totalItems;
    if (totalItems > 0) {
        counter.classList.remove('scale-0');
        counter.classList.add('scale-100');
    } else {
        counter.classList.remove('scale-100');
        counter.classList.add('scale-0');
    }
}

// Render Cart Items Inside Drawer
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16">
                <div class="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-600 mx-auto mb-4 text-2xl">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <h4 class="text-white font-bold text-base mb-1">Seu carrinho está vazio</h4>
                <p class="text-gray-500 text-xs">Explore nosso showroom e escolha sua superbike.</p>
            </div>
        `;
        totalPriceEl.innerText = formatBRL(0);
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement('div');
        div.className = "flex items-center space-x-4 p-4 rounded-xl bg-cardBg border border-gray-800";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-16 object-cover rounded-lg bg-gray-900 shrink-0">
            <div class="flex-1 min-w-0">
                <h5 class="text-white font-bold text-sm truncate">${item.name}</h5>
                <span class="text-xs text-neonRed font-bold">${formatBRL(item.price)}</span>
                <div class="flex items-center space-x-2 mt-2">
                    <button onclick="decrementQty(${index})" class="w-6 h-6 rounded bg-gray-900 border border-gray-700 text-gray-300 hover:border-neonRed flex items-center justify-center text-xs">-</button>
                    <span class="text-xs font-bold text-white">${item.quantity}</span>
                    <button onclick="incrementQty(${index})" class="w-6 h-6 rounded bg-gray-900 border border-gray-700 text-gray-300 hover:border-neonRed flex items-center justify-center text-xs">+</button>
                </div>
            </div>
            <button onclick="removeItem(${index})" class="text-gray-500 hover:text-neonRed p-2 transition-colors">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        `;
        container.appendChild(div);
    });

    totalPriceEl.innerText = formatBRL(total);
}

// Cart Quantity Handlers
function incrementQty(index) {
    cart[index].quantity += 1;
    updateCartCounter();
    renderCartItems();
}

function decrementQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartCounter();
    renderCartItems();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCounter();
    renderCartItems();
}

// Checkout Action
function checkoutCart() {
    if (cart.length === 0) {
        showToast("Atenção", "Adicione itens ao carrinho antes de finalizar.");
        return;
    }
    showToast("Pedido Iniciado!", "Redirecionando para o ambiente de pagamento seguro...");
    setTimeout(() => {
        cart = [];
        updateCartCounter();
        toggleCart();
        showToast("Sucesso!", "Seu pedido foi registrado. Entraremos em contato!");
    }, 2000);
}

// Contact Form Submission
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value;
    showToast("Mensagem Enviada!", `Obrigado, ${name}! Responderemos em breve.`);
    document.getElementById('contact-form').reset();
}

// Initialize page rendering on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderEstoque();
    renderPromotions();
});