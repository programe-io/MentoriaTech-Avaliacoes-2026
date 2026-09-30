// Lista com 10 produtos de confecções femininas de alta qualidade
const products = [
    {
        id: 1,
        name: "Vestido Midi Plissado Magenta",
        category: "vestido",
        price: 289.90,
        oldPrice: 359.90,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        badge: "Mais Vendido",
        isPromo: true
    },
    {
        id: 2,
        name: "Blusa de Seda Estampada Floral",
        category: "blusa",
        price: 149.90,
        oldPrice: 199.90,
        image: "https://images.unsplash.com/photo-1551163943-3f6a8559131f?auto=format&fit=crop&q=80&w=800",
        badge: "Novo",
        isPromo: false
    },
    {
        id: 3,
        name: "Calça Alfaiataria Roxo Real",
        category: "calca",
        price: 249.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
        badge: "Tendência",
        isPromo: true
    },
    {
        id: 4,
        name: "Conjunto Blazer & Shorts Coral",
        category: "conjunto",
        price: 389.90,
        oldPrice: 450.00,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        badge: "Exclusivo",
        isPromo: true
    },
    {
        id: 5,
        name: "Saia Midi Satim Dourada",
        category: "saia",
        price: 179.90,
        oldPrice: 219.90,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
        badge: "Destaque",
        isPromo: false
    },
    {
        id: 6,
        name: "Vestido Longo Festa Genuíno",
        category: "vestido",
        price: 499.90,
        oldPrice: 599.90,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
        badge: "Luxo",
        isPromo: true
    },
    {
        id: 7,
        name: "Blusa Cropped Ombro a Ombro",
        category: "blusa",
        price: 119.90,
        oldPrice: 159.90,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
        badge: "Verão",
        isPromo: false
    },
    {
        id: 8,
        name: "Calça Pantalona Elegance",
        category: "calca",
        price: 269.90,
        oldPrice: 320.00,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
        badge: "Clássico",
        isPromo: false
    },
    {
        id: 9,
        name: "Conjunto Cropped e Saia Midi",
        category: "conjunto",
        price: 319.90,
        oldPrice: 399.90,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
        badge: "Promoção",
        isPromo: true
    },
    {
        id: 10,
        name: "Vestido Casual Chic Gola V",
        category: "vestido",
        price: 219.90,
        oldPrice: 269.90,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
        badge: "Casual",
        isPromo: false
    }
];

let cart = [];

// Alternância de abas do menu
function switchTab(tabId) {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(sec => sec.classList.add('hidden'));

    const targetSection = document.getElementById(`section-${tabId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Atualizar links ativos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('text-brand-magenta', 'font-bold'));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Alternar visibilidade do menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Renderizar produtos na grade
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (productsToRender.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-100 flex flex-col group";
        
        card.innerHTML = `
            <div class="relative overflow-hidden aspect-[4/5] bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    ${product.badge}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-xs text-gray-400 uppercase tracking-wider">${product.category}</span>
                    <h3 class="font-serif font-bold text-gray-900 text-lg mt-1 mb-2 group-hover:text-brand-magenta transition-colors">${product.name}</h3>
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-xl font-bold gradient-text">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        ${product.oldPrice ? `<span class="text-sm text-gray-400 line-through">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    </div>
                    <button onclick="addToCart(${product.id})" class="w-full py-3 rounded-xl bg-rose-50 text-brand-magenta hover:bg-brand-magenta hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                        <i class="fa-solid fa-bag-shopping"></i> Adicionar à Sacola
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filtrar produtos por categoria
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-magenta', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-rose-100');
    });

    event.target.classList.remove('bg-white', 'text-gray-700', 'border', 'border-rose-100');
    event.target.classList.add('bg-brand-magenta', 'text-white', 'shadow-sm');

    if (category === 'todos') {
        renderProducts(products, 'product-grid');
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered, 'product-grid');
    }
}

// Carrinho de Compras
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`"${product.name}" adicionada à sacola!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const countBadge = document.getElementById('cart-count-badge');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.innerText = totalItems;
        badge.classList.remove('scale-0');
        badge.classList.add('scale-100');
    } else {
        badge.classList.remove('scale-100');
        badge.classList.add('scale-0');
    }

    countBadge.innerText = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fa-solid fa-bag-shopping text-4xl mb-3 text-rose-200"></i>
                <p>Sua sacola está vazia.</p>
            </div>
        `;
        subtotalEl.innerText = 'R$ 0,00';
        totalEl.innerText = 'R$ 0,00';
        return;
    }

    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = "flex items-center py-4 space-x-4";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-xl border border-rose-100">
            <div class="flex-1">
                <h4 class="font-serif font-bold text-gray-900 text-sm">${item.name}</h4>
                <p class="text-brand-magenta font-bold text-sm mt-1">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <div class="flex items-center space-x-3 mt-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold">-</button>
                    <span class="text-sm font-semibold">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500 p-2"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(itemEl);
    });

    subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Notificações Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.innerText = message;

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Checkout e Formulários
function checkout() {
    if (cart.length === 0) {
        alert('Sua sacola está vazia!');
        return;
    }
    alert('Redirecionando para o ambiente de pagamento seguro...');
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

function handleNewsletter(event) {
    event.preventDefault();
    alert('Inscrição realizada com sucesso! Verifique seu e-mail para resgatar seu cupom.');
    event.target.reset();
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, 'product-grid');
    const promoProducts = products.filter(p => p.isPromo);
    renderProducts(promoProducts, 'promo-grid');
});