// Base de Dados de Motos
const motos = [
    {
        id: 'm1',
        brand: 'Kawasaki',
        title: 'Ninja ZX-10R KRT Edition',
        year: 2024,
        km: '0 km (Zero)',
        engine: '998 cc - 203 cv',
        price: 118900,
        badge: 'Zero KM',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '11.7 kgfm', weight: '207 kg', topSpeed: '299 km/h', electronics: 'Quickshifter, Controle de Tração KTRC, Modos de Pilotagem' }
    },
    {
        id: 'm2',
        brand: 'BMW',
        title: 'BMW S1000RR M Package',
        year: 2023,
        km: '4.200 km',
        engine: '999 cc - 210 cv',
        price: 139900,
        badge: 'Seminova Premium',
        image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '11.5 kgfm', weight: '193 kg', topSpeed: '305 km/h', electronics: 'Rodas de Carbono, Pit Lane Limiter, Suspension DDC' }
    },
    {
        id: 'm3',
        brand: 'Yamaha',
        title: 'Yamaha YZF-R1M Carbon',
        year: 2022,
        km: '8.500 km',
        engine: '998 cc - 200 cv',
        price: 128500,
        badge: 'Edição Limitada',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '11.5 kgfm', weight: '202 kg', topSpeed: '298 km/h', electronics: 'Suspensão Öhlins Eletrônica, Carenagem 100% Carbono' }
    },
    {
        id: 'm4',
        brand: 'Ducati',
        title: 'Ducati Panigale V4 S',
        year: 2024,
        km: '0 km (Zero)',
        engine: '1.103 cc - 215.5 cv',
        price: 162900,
        badge: 'Destaque',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '12.6 kgfm', weight: '195.5 kg', topSpeed: '310 km/h', electronics: 'Asas Aerodinâmicas, Öhlins NPX, Cornering ABS' }
    },
    {
        id: 'm5',
        brand: 'Honda',
        title: 'CBR 1000RR-R Fireblade SP',
        year: 2023,
        km: '2.100 km',
        engine: '999 cc - 216 cv',
        price: 145000,
        badge: 'Revisada',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '11.5 kgfm', weight: '201 kg', topSpeed: '299 km/h', electronics: 'Escape Akrapovič de Série, Painel TFT 5", Smart Key' }
    },
    {
        id: 'm6',
        brand: 'Kawasaki',
        title: 'Ninja 630 ZX-6R SuperSport',
        year: 2024,
        km: '0 km (Zero)',
        engine: '636 cc - 124 cv',
        price: 74900,
        badge: 'Lançamento',
        image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=800',
        specs: { torque: '7.0 kgfm', weight: '198 kg', topSpeed: '260 km/h', electronics: 'KQS (Quick Shifter), Faróis LED, Modos de Potência' }
    }
];

// Base de Dados de Peças
const pecas = [
    {
        id: 'p1',
        title: 'Escapamento Akrapovič Titanium GP',
        category: 'Escapamento',
        price: 8900,
        oldPrice: 10200,
        image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=500'
    },
    {
        id: 'p2',
        title: 'Capacete Shoei X-Fifteen Racing',
        category: 'Equipamentos',
        price: 5490,
        oldPrice: 6100,
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=500'
    },
    {
        id: 'p3',
        title: 'Kit Amortecedor de Direção Öhlins',
        category: 'Suspensão',
        price: 3200,
        oldPrice: 3800,
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=500'
    },
    {
        id: 'p4',
        title: 'Pneu Pirelli Diablo Supercorsa SP V3',
        category: 'Pneus',
        price: 2450,
        oldPrice: 2800,
        image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=500'
    }
];

// Estado da Aplicação
let cart = [];
let currentFilter = 'all';
let appliedDiscount = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderMotos(motos);
    renderPecas();
    setupEventListeners();
});

function setupEventListeners() {
    // Busca e Filtros
    document.getElementById('search-input').addEventListener('keyup', filterMotos);
    
    document.querySelectorAll('.brand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.brand-btn').forEach(b => {
                b.classList.remove('active', 'bg-brand-primary', 'text-white');
                b.classList.add('bg-brand-dark', 'text-gray-300');
            });
            e.target.classList.add('active', 'bg-brand-primary', 'text-white');
            e.target.classList.remove('bg-brand-dark', 'text-gray-300');
            currentFilter = e.target.dataset.brand;
            filterMotos();
        });
    });

    // Drawer do Carrinho
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.getElementById('close-cart-btn').addEventListener('click', toggleCart);

    // Cupom e Checkout
    document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);
    document.getElementById('checkout-btn').addEventListener('click', checkoutWhatsApp);

    // Menu Mobile
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Modal
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
}

// Renderização das Motos
function renderMotos(data) {
    const grid = document.getElementById('motos-grid');
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">
            <i class="fa-solid fa-motorcycle text-4xl mb-3 block"></i>
            Nenhuma moto encontrada com os filtros selecionados.
        </div>`;
        return;
    }

    data.forEach(m => {
        grid.innerHTML += `
            <div class="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300">
                <div>
                    <div class="relative overflow-hidden h-56">
                        <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        <span class="absolute top-4 left-4 bg-brand-primary/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            ${m.badge}
                        </span>
                        <span class="absolute bottom-4 right-4 bg-brand-dark/90 backdrop-blur-md text-gray-300 text-xs font-semibold px-3 py-1 rounded-lg">
                            <i class="fa-solid fa-calendar-days text-brand-primary mr-1"></i> ${m.year}
                        </span>
                    </div>

                    <div class="p-6">
                        <span class="text-xs font-bold text-brand-cyan uppercase tracking-widest">${m.brand}</span>
                        <h3 class="text-2xl font-bold font-display text-white mt-1 mb-3 group-hover:text-brand-primary transition-colors">${m.title}</h3>
                        
                        <div class="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-6 bg-brand-dark/60 p-3 rounded-xl border border-brand-border/40">
                            <div><i class="fa-solid fa-gauge text-brand-primary mr-1"></i> ${m.km}</div>
                            <div><i class="fa-solid fa-bolt text-brand-accent mr-1"></i> ${m.engine}</div>
                        </div>

                        <div class="flex items-baseline gap-1">
                            <span class="text-xs text-gray-400 font-medium">Por apenas</span>
                            <p class="text-3xl font-black font-display text-white tracking-tight">R$ ${m.price.toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                </div>

                <div class="p-6 pt-0 flex gap-3">
                    <button onclick="openModal('${m.id}')" class="flex-1 py-3 rounded-xl bg-brand-dark hover:bg-brand-border border border-brand-border text-white text-xs font-bold font-display tracking-wider transition-colors">
                        VER DETALHES
                    </button>
                    <button onclick="addToCart('${m.id}', 'moto')" class="px-4 py-3 rounded-xl bg-brand-primary hover:bg-orange-600 text-white text-xs font-bold shadow-neon-red transition-all" aria-label="Adicionar moto ao carrinho">
                        <i class="fa-solid fa-cart-plus text-base"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

// Renderização das Peças
function renderPecas() {
    const container = document.getElementById('pecas');
    container.innerHTML = '';

    pecas.forEach(p => {
        container.innerHTML += `
            <div class="glass-card rounded-2xl p-4 flex flex-col justify-between group">
                <div>
                    <div class="relative rounded-xl overflow-hidden h-40 mb-4">
                        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        <span class="absolute top-2 right-2 bg-brand-accent text-brand-dark text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            PROMO
                        </span>
                    </div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${p.category}</span>
                    <h4 class="text-base font-bold font-display text-white mt-1 mb-2 line-clamp-2">${p.title}</h4>
                </div>

                <div>
                    <div class="mb-3">
                        <span class="text-xs text-gray-500 line-through">R$ ${p.oldPrice.toLocaleString('pt-BR')}</span>
                        <p class="text-xl font-black font-display text-brand-accent">R$ ${p.price.toLocaleString('pt-BR')}</p>
                    </div>
                    <button onclick="addToCart('${p.id}', 'peca')" class="w-full py-2.5 rounded-xl bg-brand-dark hover:bg-brand-primary border border-brand-border hover:border-brand-primary text-white text-xs font-bold font-display tracking-wider transition-all flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cart-plus"></i> ADICIONAR
                    </button>
                </div>
            </div>
        `;
    });
}

// Filtro de Motos por Texto e Marca
function filterMotos() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = motos.filter(m => {
        const matchesBrand = currentFilter === 'all' || m.brand === currentFilter;
        const matchesQuery = m.title.toLowerCase().includes(query) || m.brand.toLowerCase().includes(query);
        return matchesBrand && matchesQuery;
    });
    renderMotos(filtered);
}

// Modal de Ficha Técnica
function openModal(id) {
    const moto = motos.find(m => m.id === id);
    if (!moto) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="${moto.image}" alt="${moto.title}" class="w-full h-64 object-cover rounded-2xl border border-brand-border">
            <div>
                <span class="text-xs font-bold text-brand-primary uppercase tracking-widest">${moto.brand}</span>
                <h3 class="text-2xl font-black font-display text-white mt-1 mb-2">${moto.title}</h3>
                <p class="text-3xl font-black font-display text-brand-accent mb-4">R$ ${moto.price.toLocaleString('pt-BR')}</p>
                <div class="space-y-2 text-xs text-gray-300">
                    <p><strong>Ano:</strong> ${moto.year}</p>
                    <p><strong>Quilometragem:</strong> ${moto.km}</p>
                    <p><strong>Motorização:</strong> ${moto.engine}</p>
                    <p><strong>Torque:</strong> ${moto.specs.torque}</p>
                    <p><strong>Peso a Seco:</strong> ${moto.specs.weight}</p>
                    <p><strong>Velocidade Máx. Aprox.:</strong> ${moto.specs.topSpeed}</p>
                </div>
            </div>
        </div>
        <div class="mt-6 pt-6 border-t border-brand-border">
            <h4 class="text-sm font-bold font-display text-white uppercase mb-2">Eletrônica e Tecnologia:</h4>
            <p class="text-xs text-gray-400 leading-relaxed">${moto.specs.electronics}</p>
            <button onclick="addToCart('${moto.id}', 'moto'); closeModal();" class="w-full mt-6 py-3 rounded-xl bg-brand-primary hover:bg-orange-600 text-white font-bold font-display tracking-wider text-sm shadow-neon-red transition-all">
                TENHO INTERESSE NESTA MOTO
            </button>
        </div>
    `;

    document.getElementById('moto-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('moto-modal').classList.add('hidden');
}

// Carrinho de Compras
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('translate-x-full');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function addToCart(id, type) {
    const item = type === 'moto' ? motos.find(m => m.id === id) : pecas.find(p => p.id === id);
    if (!item) return;

    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1, type });
    }

    updateCartUI();
    showToast(`"${item.title}" adicionado ao carrinho!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    container.innerHTML = '';

    let totalQty = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fa-solid fa-cart-flatbed text-4xl mb-3 block"></i>
                Seu carrinho está vazio.
            </div>
        `;
    } else {
        cart.forEach(item => {
            totalQty += item.qty;
            subtotal += item.price * item.qty;

            container.innerHTML += `
                <div class="flex items-center justify-between bg-brand-dark p-3 rounded-xl border border-brand-border/60">
                    <div class="flex items-center gap-3">
                        <img src="${item.image}" class="w-12 h-12 object-cover rounded-lg">
                        <div>
                            <h4 class="text-xs font-bold text-white line-clamp-1">${item.title}</h4>
                            <p class="text-xs text-brand-primary font-bold">R$ ${item.price.toLocaleString('pt-BR')} x ${item.qty}</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="text-gray-500 hover:text-red-500 text-sm p-1">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }

    badge.innerText = totalQty;
    badge.classList.toggle('hidden', totalQty === 0);

    const discountAmount = subtotal * appliedDiscount;
    const total = subtotal - discountAmount;

    document.getElementById('cart-subtotal').innerText = `R$ ${subtotal.toLocaleString('pt-BR')}`;
    document.getElementById('cart-discount').innerText = `-R$ ${discountAmount.toLocaleString('pt-BR')}`;
    document.getElementById('cart-total').innerText = `R$ ${total.toLocaleString('pt-BR')}`;

    document.getElementById('discount-row').classList.toggle('hidden', appliedDiscount === 0);
}

function applyCoupon() {
    const input = document.getElementById('coupon-input').value.trim().toUpperCase();
    if (input === 'ACELERA10') {
        appliedDiscount = 0.10;
        showToast('Cupom ACELERA10 aplicado! 10% OFF');
    } else {
        appliedDiscount = 0;
        showToast('Cupom inválido!', 'error');
    }
    updateCartUI();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!', 'error');
        return;
    }

    let msg = "Olá! Gostaria de finalizar a compra dos seguintes itens na Mateus Moto Peças:\n\n";
    let subtotal = 0;

    cart.forEach(i => {
        msg += `• ${i.title} (${i.qty}x) - R$ ${(i.price * i.qty).toLocaleString('pt-BR')}\n`;
        subtotal += i.price * i.qty;
    });

    const discount = subtotal * appliedDiscount;
    const total = subtotal - discount;

    if (appliedDiscount > 0) {
        msg += `\nDesconto Aplicado: R$ ${discount.toLocaleString('pt-BR')}`;
    }
    msg += `\n*TOTAL: R$ ${total.toLocaleString('pt-BR')}*`;

    window.open(`https://wa.me/5511999998888?text=${encodeURIComponent(msg)}`, '_blank');
}

function handleContactSubmit(e) {
    e.preventDefault();
    showToast('Mensagem enviada com sucesso! Entraremos em contato.');
    e.target.reset();
}

// Notificações Toast
function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-brand-primary' : 'bg-red-600';
    
    toast.className = `toast ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs font-bold font-display uppercase tracking-wider mb-2`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${msg}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}