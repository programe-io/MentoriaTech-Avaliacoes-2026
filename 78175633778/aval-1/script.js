// Base de dados com exatamente 10 produtos de confecção feminina
const products = [
    {
        id: 1,
        name: "Vestido Midi Romântico Floral",
        category: "Vestidos",
        price: 189.90,
        oldPrice: 229.90,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 2,
        name: "Conjunto Alfaiataria Blazer & Shorts",
        category: "Conjuntos",
        price: 299.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        badge: "Novo",
        isPromo: false
    },
    {
        id: 3,
        name: "Blusa Cetim Alcinha Elegance",
        category: "Blusas",
        price: 89.90,
        oldPrice: 119.90,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 4,
        name: "Calça Pantalona em Linho",
        category: "Calças & Saias",
        price: 159.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
        badge: "Tendência",
        isPromo: false
    },
    {
        id: 5,
        name: "Vestido Longo Festa Plissado",
        category: "Vestidos",
        price: 349.90,
        oldPrice: 399.90,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 6,
        name: "Cropped Manga Longa Bufante",
        category: "Blusas",
        price: 99.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
        badge: "Destaque",
        isPromo: false
    },
    {
        id: 7,
        name: "Saia Midi Envelope em Couro Sintético",
        category: "Calças & Saias",
        price: 139.90,
        oldPrice: 179.90,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 8,
        name: "Conjunto Moletom Chic Inverno",
        category: "Conjuntos",
        price: 249.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        badge: "Novo",
        isPromo: false
    },
    {
        id: 9,
        name: "Vestido Curto Tubinho Party",
        category: "Vestidos",
        price: 169.90,
        oldPrice: 219.90,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 10,
        name: "Blazer Feminino Oversized Rosê",
        category: "Blusas",
        price: 229.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800",
        badge: "Destaque",
        isPromo: false
    }
];

let cart = [];

// Elementos do DOM
const productGrid = document.getElementById('product-grid');
const promoGrid = document.getElementById('promo-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Inicializar Aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, productGrid);
    renderProducts(products.filter(p => p.isPromo), promoGrid);
    setupEventListeners();
});

// Renderizar Produtos em um Grid
function renderProducts(items, container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500 py-8">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-100/60 overflow-hidden flex flex-col group";
        
        card.innerHTML = `
            <div class="relative h-72 overflow-hidden bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow">
                    ${product.badge}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-xs text-rose-600 font-semibold tracking-wide uppercase">${product.category}</span>
                    <h3 class="font-bold text-gray-900 mt-1 font-['Playfair_Display'] text-lg line-clamp-1">${product.name}</h3>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <div>
                        <span class="text-lg font-extrabold text-rose-600">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        ${product.oldPrice ? `<span class="block text-xs text-gray-400 line-through">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Configurar Ouvintes de Eventos
function setupEventListeners() {
    // Abrir/Fechar Carrinho
    cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
    closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.add('hidden');
    });

    // Menu Mobile
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Filtros de Categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            filterBtns.forEach(b => b.className = "filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm bg-white text-gray-600 hover:bg-rose-50");
            
            e.target.classList.add('active-filter');
            e.target.classList.remove('bg-white', 'text-gray-600', 'hover:bg-rose-50');

            const filterValue = e.target.getAttribute('data-filter');
            if (filterValue === 'all') {
                renderProducts(products, productGrid);
            } else {
                const filtered = products.filter(p => p.category === filterValue);
                renderProducts(filtered, productGrid);
            }
        });
    });

    // Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });

    // Finalizar Pedido via WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Sua sacola está vazia!');
            return;
        }
        let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
        let total = 0;
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
            total += item.price * item.quantity;
        });
        message += `\n*Total:* R$ ${total.toFixed(2)}`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/5511998887766?text=${encoded}`, '_blank');
    });
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    cartModal.classList.remove('hidden');
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Atualizar Contador
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Renderizar Itens na Sacola
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-gray-400 py-12 text-sm">Sua sacola está vazia.</p>`;
        cartSubtotal.textContent = 'R$ 0,00';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = "flex items-center gap-4 py-3";
        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-gray-100">
            <div class="flex-1">
                <h4 class="font-semibold text-sm text-gray-900 line-clamp-1">${item.name}</h4>
                <span class="text-xs text-rose-600 font-bold">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <div class="flex items-center gap-2 mt-1.5">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">-</button>
                    <span class="text-xs font-semibold">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">+</button>
                </div>
            </div>
            <button onclick="updateQuantity(${item.id}, -${item.quantity})" class="text-gray-400 hover:text-red-500 text-sm">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}