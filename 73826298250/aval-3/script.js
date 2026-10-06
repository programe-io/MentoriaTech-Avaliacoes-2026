// Banco de Dados de Veículos do Pedim da BMW
const carsData = [
    {
        id: 1,
        name: "BMW M3 Competition",
        category: "Esportivo",
        year: "2025/2026",
        km: "1.200 km",
        engine: "3.0L M TwinPower Turbo - 510cv",
        price: 789900,
        oldPrice: 839900,
        promo: true,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
        tag: "Super Promoção"
    },
    {
        id: 2,
        name: "BMW i8 Roadster",
        category: "Esportivo",
        year: "2022/2023",
        km: "14.500 km",
        engine: "Híbrido Plug-in - 374cv",
        price: 680000,
        oldPrice: null,
        promo: false,
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1000",
        tag: "Exclusivo"
    },
    {
        id: 3,
        name: "BMW X6 M Competition",
        category: "SUV",
        year: "2024/2025",
        km: "8.900 km",
        engine: "V8 4.4L TwinPower Turbo - 625cv",
        price: 995000,
        oldPrice: 1050000,
        promo: true,
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1000",
        tag: "Oferta Imperdível"
    },
    {
        id: 4,
        name: "BMW M4 Coupé",
        category: "Esportivo",
        year: "2023/2024",
        km: "11.000 km",
        engine: "3.0L M TwinPower Turbo - 480cv",
        price: 720000,
        oldPrice: null,
        promo: false,
        image: "https://images.unsplash.com/photo-1607853585091-af44aef63462?auto=format&fit=crop&q=80&w=1000",
        tag: "Disponível"
    },
    {
        id: 5,
        name: "BMW Série 3 330e M Sport",
        category: "Sedan",
        year: "2025/2026",
        km: "Zero KM",
        engine: "2.0L Turbo + Elétrico - 292cv",
        price: 369900,
        oldPrice: 389900,
        promo: true,
        image: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&q=80&w=1000",
        tag: "Taxa 0% ao Mês"
    },
    {
        id: 6,
        name: "BMW iX xDrive40",
        category: "Sedan",
        year: "2024/2025",
        km: "4.500 km",
        engine: "100% Elétrico - 326cv",
        price: 549900,
        oldPrice: null,
        promo: false,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
        tag: "Elétrico"
    }
];

let cart = [];

// Formatar para Moeda Real (BRL)
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderizar Produtos (Estoque e Promoções)
function renderCars(filter = "todos") {
    const grid = document.getElementById("cars-grid");
    const promosContainer = document.getElementById("promos-container");

    // Filtrar estoque
    const filteredCars = filter === "todos" 
        ? carsData 
        : carsData.filter(car => car.category === filter);

    grid.innerHTML = filteredCars.map(car => createCarCard(car)).join('');

    // Renderizar promoções na seção dedicada
    const promoCars = carsData.filter(car => car.promo);
    promosContainer.innerHTML = promoCars.map(car => createCarCard(car)).join('');
}

function createCarCard(car) {
    return `
        <div class="car-card bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between group">
            <div class="relative h-56 overflow-hidden">
                <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-sky-400 border border-slate-700">
                    ${car.tag}
                </div>
                <div class="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-700">
                    ${car.year}
                </div>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-white mb-2">${car.name}</h3>
                    <p class="text-xs text-slate-400 mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-gauge text-sky-400"></i> ${car.km} &bull; 
                        <i class="fa-solid fa-bolt text-sky-400 ml-1"></i> ${car.engine}
                    </p>
                </div>
                <div>
                    <div class="flex items-baseline gap-2 mb-4">
                        <span class="text-2xl font-extrabold text-sky-400">${formatCurrency(car.price)}</span>
                        ${car.oldPrice ? `<span class="text-sm text-slate-500 line-through">${formatCurrency(car.oldPrice)}</span>` : ''}
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="addToCart(${car.id})" class="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]">
                            <i class="fa-solid fa-cart-plus"></i> Reservar Carro
                        </button>
                        <a href="https://wa.me/5586998887766?text=Olá%20Pedim,%20tenho%20interesse%20no%20veículo%20${encodeURIComponent(car.name)}%20anunciado%20por%20${formatCurrency(car.price)}." target="_blank" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funções do Carrinho
function addToCart(carId) {
    const car = carsData.find(c => c.id === carId);
    const existing = cart.find(item => item.id === carId);
    
    if (!existing) {
        cart.push({...car, quantity: 1});
    }
    updateCartUI();
    openCart();
}

function removeFromCart(carId) {
    cart = cart.filter(item => item.id !== carId);
    updateCartUI();
}

function updateCartUI() {
    const countEl = document.getElementById("cart-count");
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    countEl.innerText = cart.length;

    if (cart.length === 0) {
        itemsEl.innerHTML = `<div class="text-center py-12 text-slate-500 text-sm">Seu carrinho está vazio.<br>Escolha um modelo no showroom!</div>`;
        totalEl.innerText = formatCurrency(0);
        return;
    }

    let total = 0;
    itemsEl.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="py-4 flex items-center justify-between gap-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover border border-slate-800">
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-white">${item.name}</h4>
                    <span class="text-xs text-sky-400 font-semibold">${formatCurrency(item.price)}</span>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-red-400 transition-colors p-2">
                    <i class="fa-solid fa-trash text-sm"></i>
                </button>
            </div>
        `;
    }).join('');

    totalEl.innerText = formatCurrency(total);
}

function openCart() {
    document.getElementById("cart-drawer").classList.remove("hidden");
}

function closeCart() {
    document.getElementById("cart-drawer").classList.add("hidden");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    renderCars();

    // Filtros
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => {
                b.classList.remove("bg-sky-500", "text-white");
                b.classList.add("bg-slate-900", "text-slate-300");
            });
            e.target.classList.remove("bg-slate-900", "text-slate-300");
            e.target.classList.add("bg-sky-500", "text-white");
            renderCars(e.target.getAttribute("data-filter"));
        });
    });

    // Abrir/Fechar Carrinho
    document.getElementById("cart-btn").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    document.getElementById("cart-backdrop").addEventListener("click", closeCart);

    // Finalizar Pedido via WhatsApp (Pedim)
    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let message = "Olá Pedim! Gostaria de fechar o pedido dos seguintes veículos:\n\n";
        let total = 0;
        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* - ${formatCurrency(item.price)}\n`;
            total += item.price;
        });
        message += `\n*Total do Pedido: ${formatCurrency(total)}*\n\nPor favor, entre em contato para alinharmos a documentação e pagamento!`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5586998887766?text=${encoded}`, '_blank');
    });

    // Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // Formulário de Contato Direto
    document.getElementById("contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("form-name").value;
        const phone = document.getElementById("form-phone").value;
        const model = document.getElementById("form-model").value;
        const msg = document.getElementById("form-msg").value;

        const text = `Olá Pedim! Meu nome é *${name}* (Contato: ${phone}). Tenho interesse no modelo *${model}*.\n\nMensagem: ${msg}`;
        window.open(`https://wa.me/5586998887766?text=${encodeURIComponent(text)}`, '_blank');
    });
});