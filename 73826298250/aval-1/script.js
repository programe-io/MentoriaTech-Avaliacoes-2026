// Base de dados das 10 Motos Esportivas
const bikes = [
    {
        id: 1,
        name: "Ducati Panigale V4 S",
        brand: "Ducati",
        year: 2024,
        km: 0,
        price: 162900,
        originalPrice: 175000,
        isPromo: true,
        hp: "214 cv",
        engine: "1.103 cc",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
        description: "Equipada com suspensão Öhlins controlada eletronicamente, rodas em alumínio forjado e o consagrado motor Desmosedici Stradale V4."
    },
    {
        id: 2,
        name: "BMW S1000RR M Package",
        brand: "BMW",
        year: 2024,
        km: 1200,
        price: 138900,
        originalPrice: 149000,
        isPromo: true,
        hp: "210 cv",
        engine: "999 cc",
        image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80",
        description: "A superesportiva definitiva com winglets aerodinâmicos em carbono, modo de pilotagem Pro e acelerador eletrônico de alta precisão."
    },
    {
        id: 3,
        name: "Kawasaki Ninja H2 Carbon",
        brand: "Kawasaki",
        year: 2023,
        km: 3500,
        price: 210000,
        originalPrice: 0,
        isPromo: false,
        hp: "231 cv",
        engine: "998 cc Supercharged",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
        description: "Exclusividade extrema com motor sobrealimentado (Supercharger), carenagem superior em fibra de carbono e pintura com espelho de prata."
    },
    {
        id: 4,
        name: "Yamaha YZF-R1M",
        brand: "Yamaha",
        year: 2023,
        km: 2100,
        price: 145000,
        originalPrice: 0,
        isPromo: false,
        hp: "200 cv",
        engine: "998 cc Crossplane",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
        description: "Edição limitada inspirada diretamente na MotoGP M1, com suspensão eletrônica Öhlins ERS e carenagem integral em carbono."
    },
    {
        id: 5,
        name: "Honda CBR 1000RR-R Fireblade SP",
        brand: "Honda",
        year: 2024,
        km: 0,
        price: 159000,
        originalPrice: 0,
        isPromo: false,
        hp: "217 cv",
        engine: "999 cc",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
        description: "Projetada com tecnologia da RC213V-S, conta com freios Brembo Stylema, quickshifter bidirecional e painel TFT colorido de alta definição."
    },
    {
        id: 6,
        name: "Suzuki GSX-R1000R",
        brand: "Suzuki",
        year: 2022,
        km: 4800,
        price: 98900,
        originalPrice: 0,
        isPromo: false,
        hp: "202 cv",
        engine: "999 cc",
        image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80",
        description: "A rainha das pistas com sistema de comando de válvulas variável (SR-VVT) e suspensão Showa BFF de nível profissional."
    },
    {
        id: 7,
        name: "Aprilia RSV4 Factory 1100",
        brand: "Aprilia",
        year: 2023,
        km: 1900,
        price: 155000,
        originalPrice: 0,
        isPromo: false,
        hp: "217 cv",
        engine: "1.099 cc V4",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
        description: "Chassi lendário vencedor de campeonatos mundiais com motor V4 narrow e aerodinâmica integrada às carenagens duplas."
    },
    {
        id: 8,
        name: "Kawasaki Ninja ZX-10R",
        brand: "Kawasaki",
        year: 2024,
        km: 0,
        price: 118900,
        originalPrice: 126900,
        isPromo: true,
        hp: "203 cv",
        engine: "998 cc",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
        description: "A campeã do WorldSBK com piloto automático, modos de pilotagem integrados e radiador de óleo ar-resfriado do time de corrida."
    },
    {
        id: 9,
        name: "Ducati Streetfighter V4 S",
        brand: "Ducati",
        year: 2023,
        km: 2900,
        price: 139900,
        originalPrice: 0,
        isPromo: false,
        hp: "208 cv",
        engine: "1.103 cc",
        image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80",
        description: "A 'Fight Formula': guidão alto e largo, 208 cv de potência bruta e biplane wings para sustentação aerodinâmica."
    },
    {
        id: 10,
        name: "Suzuki Hayabusa GSX1300R",
        brand: "Suzuki",
        year: 2024,
        km: 800,
        price: 124900,
        originalPrice: 0,
        isPromo: false,
        hp: "190 cv",
        engine: "1.340 cc",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
        description: "O falcão peregrino das estradas. Ícone lendário de velocidade com pacote eletrônico SIRS avançado e torque avassalador."
    }
];

// Estado do Carrinho (com suporte a LocalStorage)
let cart = JSON.parse(localStorage.getItem('pedro_veiculos_cart')) || [];

// Formatação Moeda
function formatCurrency(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderizar Motos no Estoque
function renderStock(bikesToRender = bikes) {
    const grid = document.getElementById('stockGrid');
    if (!grid) return;
    grid.innerHTML = '';

    bikesToRender.forEach(bike => {
        const card = document.createElement('div');
        card.className = 'bg-dark border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group flex flex-col justify-between';
        
        card.innerHTML = `
            <div>
                <div class="relative overflow-hidden h-52">
                    <img src="${bike.image}" alt="${bike.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                        ${bike.brand}
                    </div>
                    ${bike.isPromo ? `<div class="absolute top-3 right-3 bg-red-600 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">OFERTA</div>` : ''}
                </div>
                <div class="p-5">
                    <h3 class="font-racing text-xl font-bold text-white group-hover:text-red-500 transition-colors">${bike.name}</h3>
                    <div class="flex items-center gap-4 text-xs text-gray-400 my-3">
                        <span><i class="fa-solid fa-calendar text-red-500 mr-1"></i> ${bike.year}</span>
                        <span><i class="fa-solid fa-gauge-high text-red-500 mr-1"></i> ${bike.km === 0 ? 'Zero KM' : bike.km + ' km'}</span>
                        <span><i class="fa-solid fa-bolt text-red-500 mr-1"></i> ${bike.hp}</span>
                    </div>
                    <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">${bike.description}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-0 border-t border-white/5 flex items-center justify-between mt-auto">
                <div>
                    <span class="text-[10px] text-gray-500 uppercase font-bold block">Valor à vista</span>
                    <span class="font-racing text-2xl font-bold text-white">${formatCurrency(bike.price)}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="openDetailsModal(${bike.id})" class="p-2.5 rounded-xl bg-surface hover:bg-white/10 text-gray-300 border border-white/10 transition-colors" title="Ver Detalhes">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="addToCart(${bike.id})" class="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-600/30 transition-transform active:scale-95" title="Adicionar ao Carrinho">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Renderizar Motos em Promoção
function renderPromos() {
    const container = document.getElementById('promoContainer');
    if (!container) return;
    container.innerHTML = '';

    const promoBikes = bikes.filter(b => b.isPromo);

    promoBikes.forEach(bike => {
        const card = document.createElement('div');
        card.className = 'bg-surface border border-red-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row relative group';
        
        card.innerHTML = `
            <div class="sm:w-1/2 relative overflow-hidden min-h-[220px]">
                <img src="${bike.image}" alt="${bike.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-3 left-3 bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                    DESCONTO ESPECIAL
                </div>
            </div>
            <div class="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                    <span class="text-xs text-red-500 font-bold uppercase tracking-widest block mb-1">${bike.brand}</span>
                    <h3 class="font-racing text-2xl font-bold text-white mb-2">${bike.name}</h3>
                    <p class="text-xs text-gray-400 mb-4 line-clamp-2">${bike.description}</p>
                </div>
                <div>
                    <div class="mb-4">
                        <span class="text-xs text-gray-500 line-through block">${formatCurrency(bike.originalPrice)}</span>
                        <span class="font-racing text-3xl font-extrabold text-red-500">${formatCurrency(bike.price)}</span>
                    </div>
                    <button onclick="addToCart(${bike.id})" class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all">
                        <i class="fa-solid fa-cart-shopping"></i> Garantir Oferta
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Gerenciamento do Carrinho
function addToCart(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike) return;

    const existingIndex = cart.findIndex(item => item.id === bikeId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...bike, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    openCart();
}

function removeFromCart(bikeId) {
    cart = cart.filter(item => item.id !== bikeId);
    saveCart();
    updateCartUI();
}

function changeQuantity(bikeId, delta) {
    const item = cart.find(i => i.id === bikeId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(bikeId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('pedro_veiculos_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotal');

    // Atualiza contador badge
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (countEl) countEl.innerText = totalItems;

    // Renderiza itens
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-gray-500 space-y-3">
                <i class="fa-solid fa-cart-flatbed text-4xl"></i>
                <p class="text-sm font-semibold">Seu carrinho está vazio.</p>
                <p class="text-xs">Explore nosso estoque e escolha sua nova superbike!</p>
            </div>
        `;
        if (totalEl) totalEl.innerText = formatCurrency(0);
        return;
    }

    let totalPrice = 0;
    container.innerHTML = '';

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'bg-dark p-4 rounded-xl border border-white/10 flex gap-4 items-center relative';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border border-white/10">
            <div class="flex-1">
                <h4 class="font-racing text-sm font-bold text-white line-clamp-1">${item.name}</h4>
                <p class="text-xs text-red-500 font-bold">${formatCurrency(item.price)}</p>
                <div class="flex items-center gap-2 mt-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 rounded bg-surface border border-white/10 text-xs text-gray-300 hover:bg-white/10 flex items-center justify-center">-</button>
                    <span class="text-xs font-bold text-white px-1">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 rounded bg-surface border border-white/10 text-xs text-gray-300 hover:bg-white/10 flex items-center justify-center">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-red-500 text-sm p-2" title="Remover">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        container.appendChild(itemEl);
    });

    if (totalEl) totalEl.innerText = formatCurrency(totalPrice);
}

// Drawer do Carrinho Toggle
function openCart() {
    const modal = document.getElementById('cartModal');
    const drawer = document.getElementById('cartDrawer');
    modal.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.remove('translate-x-full');
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.add('translate-x-full');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
    }, 300);
}

// Modal de Detalhes da Moto
function openDetailsModal(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike) return;

    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsModalContent');

    content.innerHTML = `
        <div class="relative">
            <button onclick="closeDetailsModal()" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors flex items-center justify-center">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="h-64 sm:h-80 overflow-hidden relative">
                <img src="${bike.image}" alt="${bike.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <span class="text-xs text-red-500 font-bold uppercase tracking-widest block">${bike.brand}</span>
                    <h3 class="font-racing text-3xl font-bold text-white">${bike.name}</h3>
                </div>
                <div class="grid grid-cols-3 gap-3 bg-dark p-3 rounded-xl border border-white/5 text-center">
                    <div>
                        <span class="text-[10px] text-gray-400 uppercase font-bold block">Ano</span>
                        <span class="text-sm font-bold text-white">${bike.year}</span>
                    </div>
                    <div>
                        <span class="text-[10px] text-gray-400 uppercase font-bold block">Quilometragem</span>
                        <span class="text-sm font-bold text-white">${bike.km === 0 ? 'Zero KM' : bike.km + ' km'}</span>
                    </div>
                    <div>
                        <span class="text-[10px] text-gray-400 uppercase font-bold block">Potência</span>
                        <span class="text-sm font-bold text-red-500">${bike.hp}</span>
                    </div>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-gray-400 uppercase mb-1">Descrição e Ficha Técnica</h4>
                    <p class="text-xs text-gray-300 leading-relaxed">${bike.description}</p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                        <span class="text-[10px] text-gray-500 uppercase font-bold block">Preço Especial</span>
                        <span class="font-racing text-3xl font-bold text-white">${formatCurrency(bike.price)}</span>
                    </div>
                    <button onclick="addToCart(${bike.id}); closeDetailsModal();" class="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all">
                        <i class="fa-solid fa-cart-plus"></i> Comprar / Reservar
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('pointer-events-none', 'opacity-0');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsModalContent');

    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
    }, 300);
}

// Timer regressivo da promoção
function startTimer() {
    let hours = 8, minutes = 45, seconds = 12;

    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) hours = 23;
            }
        }

        const hEl = document.getElementById('timerHours');
        const mEl = document.getElementById('timerMinutes');
        const sEl = document.getElementById('timerSeconds');

        if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
        if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
        if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Event Listeners Init
document.addEventListener('DOMContentLoaded', () => {
    renderStock();
    renderPromos();
    updateCartUI();
    startTimer();

    // Filtro por marca
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const brand = e.target.getAttribute('data-brand');
            if (brand === 'all') {
                renderStock(bikes);
            } else {
                const filtered = bikes.filter(b => b.brand.toLowerCase() === brand.toLowerCase());
                renderStock(filtered);
            }
        });
    });

    // Busca em tempo real
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = bikes.filter(b => 
            b.name.toLowerCase().includes(query) || 
            b.brand.toLowerCase().includes(query)
        );
        renderStock(filtered);
    };

    document.getElementById('searchInput')?.addEventListener('input', handleSearch);
    document.getElementById('mobileSearchInput')?.addEventListener('input', handleSearch);

    // Eventos do Carrinho
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartBackdrop')?.addEventListener('click', closeCart);

    // Checkout via WhatsApp
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = "Olá Pedro Veículos! Tenho interesse em fechar a compra/reserva dos seguintes veículos:\n\n";
        let total = 0;

        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (${item.year}) - Qtd: ${item.quantity} x ${formatCurrency(item.price)}\n`;
            total += item.price * item.quantity;
        });

        message += `\n*Total Estimado:* ${formatCurrency(total)}\n\nAguardo o atendimento dos consultores para envio da documentação.`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5511999998888?text=${encoded}`, '_blank');
    });

    // Formulário de Contato
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado pelo contato! Um dos nossos consultores da Pedro Veículos retornará em instantes.');
        e.target.reset();
    });

    // Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});