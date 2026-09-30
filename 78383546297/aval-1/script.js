const products = [
    {
        id: 1,
        name: "Midnight Orchid Elixir",
        category: "perfume",
        price: 389.90,
        oldPrice: 459.90,
        isPromo: true,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
        description: "Fragrância marcante com orquídea negra e baunilha."
    },
    {
        id: 2,
        name: "Royal Amber Gold",
        category: "perfume",
        price: 449.90,
        oldPrice: 529.90,
        isPromo: true,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
        description: "Notas ambaradas e especiarias refinadas de luxo."
    },
    {
        id: 3,
        name: "Serum Facial Neon Glow",
        category: "cosmetico",
        price: 189.90,
        oldPrice: 229.90,
        isPromo: true,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        description: "Ácido hialurônico e vitamina C para viço instantâneo."
    },
    {
        id: 4,
        name: "Celestial Blue Homme",
        category: "perfume",
        price: 329.90,
        oldPrice: null,
        isPromo: false,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
        description: "Notas aquáticas revigorantes e sândalo elegante."
    },
    {
        id: 5,
        name: "Velvet Rose Intense",
        category: "perfume",
        price: 359.90,
        oldPrice: 399.90,
        isPromo: true,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
        description: "Rosa damascena envolta em almíscar sedutor."
    },
    {
        id: 6,
        name: "Kit Skincare Gold Radiance",
        category: "cosmetico",
        price: 299.90,
        oldPrice: null,
        isPromo: false,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
        description: "Conjunto completo com creme nutritivo e tônico."
    },
    {
        id: 7,
        name: "Solaris Citrus Splash",
        category: "perfume",
        price: 279.90,
        oldPrice: null,
        isPromo: false,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
        description: "Energia cítrica vibrante com tangerina siciliana."
    },
    {
        id: 8,
        name: "Creme Corporal Silk Body",
        category: "cosmetico",
        price: 149.90,
        oldPrice: 179.90,
        isPromo: true,
        image: "https://images.unsplash.com/photo-1608248597359-97422f9863e4?q=80&w=800&auto=format&fit=crop",
        description: "Hidratação profunda com micropartículas iluminadoras."
    },
    {
        id: 9,
        name: "Mystic Woods Noir",
        category: "perfume",
        price: 419.90,
        oldPrice: null,
        isPromo: false,
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
        description: "Madeiras nobres com cedro e vetiver intenso."
    },
    {
        id: 10,
        name: "Batom Matte Velvet Ruby",
        category: "cosmetico",
        price: 89.90,
        oldPrice: null,
        isPromo: false,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
        description: "Alta fixação com acabamento aveludado luxuoso."
    }
];

let cart = [];
let currentCategory = 'todos';

// Renderização inicial ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    renderPromos();
});

// Alternar Menu Mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Renderizar Produtos no Estoque
function renderProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400">Nenhum produto encontrado.</div>`;
        return;
    }

    items.forEach(product => {
        grid.innerHTML += `
            <div class="bg-darkCard rounded-3xl border border-purple-900/40 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-neonMagenta transition duration-300">
                <div class="relative overflow-hidden h-52 bg-darkBg">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/150f2d/a855f7?text=Luxo'">
                    <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-darkBg/80 backdrop-blur-md text-neonPurple border border-purple-500/30">
                        ${product.category}
                    </span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 class="font-bold text-lg text-white group-hover:text-neonMagenta transition">${product.name}</h3>
                        <p class="text-xs text-gray-400 mt-1 line-clamp-2">${product.description}</p>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-purple-900/30">
                        <div>
                            <span class="text-xs text-gray-500 line-through ${product.oldPrice ? '' : 'hidden'}">R$ ${product.oldPrice ? product.oldPrice.toFixed(2).replace('.', ',') : ''}</span>
                            <div class="text-base font-extrabold text-neonMagenta">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                        </div>
                        <button onclick="addToCart(${product.id})" class="p-3 rounded-xl bg-gradient-to-r from-neonPurple to-neonMagenta text-white shadow-neon hover:opacity-90 transition">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Renderizar Promoções
function renderPromos() {
    const promoGrid = document.getElementById('promo-grid');
    const promoItems = products.filter(p => p.isPromo);
    promoGrid.innerHTML = '';

    promoItems.forEach(product => {
        promoGrid.innerHTML += `
            <div class="bg-darkCard rounded-3xl border border-neonGold/30 overflow-hidden shadow-neon-gold flex flex-col justify-between group">
                <div class="relative overflow-hidden h-60 bg-darkBg">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/150f2d/f59e0b?text=Promocao'">
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-neonGold text-darkBg shadow-md">
                        Oferta
                    </span>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 class="font-bold text-xl text-white group-hover:text-neonGold transition">${product.name}</h3>
                        <p class="text-xs text-gray-300 mt-1">${product.description}</p>
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-purple-900/30">
                        <div>
                            <span class="text-xs text-gray-400 line-through">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                            <div class="text-lg font-extrabold text-neonGold">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                        </div>
                        <button onclick="addToCart(${product.id})" class="px-4 py-2 rounded-xl bg-neonGold text-darkBg font-bold hover:bg-goldHover transition shadow-neon-gold text-sm">
                            <i class="fa-solid fa-cart-plus mr-1"></i> Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filtrar por Categoria
function setCategory(cat) {
    currentCategory = cat;
    
    // Atualizar classes visuais dos botões de filtro
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.className = "cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-darkBg border border-purple-900/60 text-gray-300 hover:text-white hover:border-neonPurple transition";
    });
    event.target.className = "cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-neonPurple to-neonMagenta text-white shadow-neon transition";

    filterProducts();
}

// Filtrar Produtos por Busca e Categoria
function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    let filtered = products;

    if (currentCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (query.trim() !== '') {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    renderProducts(filtered);
}

// Abrir/Fechar Carrinho
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showCustomModal("Adicionado!", `${product.name} foi adicionado ao seu carrinho.`, "fa-bag-shopping");
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    container.innerHTML = '';
    let totalItems = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 text-sm">Seu carrinho está vazio.</div>`;
        badge.classList.remove('scale-100');
        badge.classList.add('scale-0');
        badge.innerText = '0';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;

            container.innerHTML += `
                <div class="flex items-center justify-between bg-darkBg p-3 rounded-2xl border border-purple-900/30">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-xl">
                    <div class="flex-1 ml-3">
                        <h4 class="text-sm font-bold text-white">${item.name}</h4>
                        <span class="text-xs text-neonMagenta font-semibold">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-darkCard border border-purple-900 flex items-center justify-center text-xs hover:border-neonMagenta">-</button>
                        <span class="text-xs font-bold">${item.quantity}</span>
                        <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-darkCard border border-purple-900 flex items-center justify-center text-xs hover:border-neonMagenta">+</button>
                    </div>
                </div>
            `;
        });

        badge.innerText = totalItems;
        badge.classList.remove('scale-0');
        badge.classList.add('scale-100');
    }

    subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Atualizar Quantidade no Carrinho
function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        updateCartUI();
    }
}

// Finalizar Compra
function checkout() {
    if (cart.length === 0) {
        showCustomModal("Carrinho Vazio", "Adicione itens ao carrinho antes de finalizar a compra.", "fa-triangle-exclamation");
        return;
    }
    toggleCart();
    cart = [];
    updateCartUI();
    showCustomModal("Pedido Realizado!", "Obrigado por comprar na Essência Neon! Seu pedido foi processado com sucesso.", "fa-circle-check");
}

// Manipular Formulário de Contato
function handleContactSubmit(e) {
    e.preventDefault();
    e.target.reset();
    showCustomModal("Mensagem Enviada!", "Recebemos sua mensagem e entraremos em contato em breve.", "fa-paper-plane");
}

// Manipular Newsletter
function handleNewsletter(e) {
    e.preventDefault();
    e.target.reset();
    showCustomModal("Inscrição Concluída!", "Você foi cadastrado na nossa newsletter com sucesso.", "fa-envelope-open-text");
}

// Exibir Modal Customizado
function showCustomModal(title, message, iconClass) {
    const modal = document.getElementById('custom-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = message;
    document.getElementById('modal-icon').innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    modal.classList.remove('hidden');
}

// Fechar Modal Customizado
function closeCustomModal() {
    document.getElementById('custom-modal').classList.add('hidden');
}