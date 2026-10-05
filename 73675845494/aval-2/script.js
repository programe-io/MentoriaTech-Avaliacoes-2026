// Base de Produtos de Futebol Reais com Imagens Autênticas do Unsplash
const products = [
    {
        id: 1,
        name: "Camisa Real Madrid Home 24/25",
        category: "internacionais",
        price: 179.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800",
        promo: true,
        tag: "Mais Vendida"
    },
    {
        id: 2,
        name: "Camisa Flamengo Home 2024",
        category: "nacionais",
        price: 159.90,
        oldPrice: 269.90,
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800",
        promo: true,
        tag: "Oferta Relâmpago"
    },
    {
        id: 3,
        name: "Camisa Seleção Brasileira 2002 (Retrô)",
        category: "retro",
        price: 189.90,
        oldPrice: 319.90,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
        promo: true,
        tag: "Clássico Retrô"
    },
    {
        id: 4,
        name: "Camisa FC Barcelona Home 24/25",
        category: "internacionais",
        price: 179.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
        promo: false,
        tag: "Novo"
    },
    {
        id: 5,
        name: "Camisa Corinthians Home 2024",
        category: "nacionais",
        price: 159.90,
        oldPrice: 269.90,
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800",
        promo: false,
        tag: "Nacional"
    },
    {
        id: 6,
        name: "Camisa AC Milan Home 24/25",
        category: "internacionais",
        price: 179.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1511886929373-071d3fc6252e?auto=format&fit=crop&q=80&w=800",
        promo: true,
        tag: "Destaque"
    },
    {
        id: 7,
        name: "Camisa Palmeiras Home 2024",
        category: "nacionais",
        price: 159.90,
        oldPrice: 269.90,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
        promo: false,
        tag: "Nacional"
    },
    {
        id: 8,
        name: "Camisa Manchester City Home 24/25",
        category: "internacionais",
        price: 179.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
        promo: false,
        tag: "Premier League"
    }
];

// Estado do Carrinho
let cart = [];

// Elementos do DOM
const productsGrid = document.getElementById('products-grid');
const promosGrid = document.getElementById('promos-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, productsGrid);
    renderProducts(products.filter(p => p.promo), promosGrid);
    setupEventListeners();
});

// Renderizar Produtos nos Containers
function renderProducts(items, container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = `<p class="text-slate-500 text-sm col-span-full text-center py-8">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card bg-[#131A18] border border-emerald-900/40 rounded-2xl overflow-hidden flex flex-col justify-between group";
        
        card.innerHTML = `
            <div class="relative overflow-hidden h-64 bg-[#0B0F0E]">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 left-3 bg-[#00FF66] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md">${product.tag}</span>
            </div>
            <div class="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <h3 class="font-bold text-white text-base group-hover:text-[#00FF66] transition">${product.name}</h3>
                    <div class="mt-3 flex items-center gap-2">
                        <span class="text-xs font-semibold text-slate-400 uppercase">Tamanho:</span>
                        <div class="flex gap-1.5 size-selector-${product.id}">
                            <button onclick="selectSize(${product.id}, 'P')" class="size-btn-${product.id} size-P w-7 h-7 rounded text-xs font-bold border border-emerald-900/60 bg-[#0B0F0E] text-slate-300 hover:border-[#00FF66] transition">P</button>
                            <button onclick="selectSize(${product.id}, 'M')" class="size-btn-${product.id} size-M w-7 h-7 rounded text-xs font-bold border border-emerald-900/60 bg-[#0B0F0E] text-slate-300 hover:border-[#00FF66] transition active-size" data-selected="true">M</button>
                            <button onclick="selectSize(${product.id}, 'G')" class="size-btn-${product.id} size-G w-7 h-7 rounded text-xs font-bold border border-emerald-900/60 bg-[#0B0F0E] text-slate-300 hover:border-[#00FF66] transition">G</button>
                            <button onclick="selectSize(${product.id}, 'GG')" class="size-btn-${product.id} size-GG w-7 h-7 rounded text-xs font-bold border border-emerald-900/60 bg-[#0B0F0E] text-slate-300 hover:border-[#00FF66] transition">GG</button>
                        </div>
                    </div>
                </div>
                <div class="mt-5 pt-4 border-t border-emerald-950/60 flex items-center justify-between">
                    <div>
                        <span class="text-xs text-slate-400 line-through">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                        <p class="text-[#00FF66] font-black text-lg">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-[#00FF66] hover:bg-emerald-400 text-black font-extrabold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 shadow-md shadow-[#00FF66]/10">
                        <i class="fa-solid fa-cart-plus"></i> Comprar
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Definir tamanho 'M' como padrão visual para novos cards renderizados
    items.forEach(product => {
        const defaultBtn = document.querySelector(`.size-btn-${product.id}.size-M`);
        if(defaultBtn) {
            defaultBtn.classList.add('bg-[#00FF66]', 'text-black', 'border-[#00FF66]');
            defaultBtn.classList.remove('bg-[#0B0F0E]', 'text-slate-300');
        }
    });
}

// Controle de Seleção de Tamanho por Produto
const selectedSizes = {};
function selectSize(productId, size) {
    selectedSizes[productId] = size;
    const buttons = document.querySelectorAll(`.size-btn-${productId}`);
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#00FF66]', 'text-black', 'border-[#00FF66]');
        btn.classList.add('bg-[#0B0F0E]', 'text-slate-300');
    });
    const activeBtn = document.querySelector(`.size-btn-${productId}.size-${size}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-[#00FF66]', 'text-black', 'border-[#00FF66]');
        activeBtn.classList.remove('bg-[#0B0F0E]', 'text-slate-300');
    }
}

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = selectedSizes[productId] || 'M'; // Padrão M caso não tenha clicado
    
    // Verificar se já existe o mesmo produto e tamanho no carrinho
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }

    updateCartUI();
    openCart();
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 text-slate-500 space-y-2">
                <i class="fa-solid fa-cart-shopping text-4xl text-emerald-900/60"></i>
                <p class="text-sm font-medium">Seu carrinho está vazio.</p>
            </div>
        `;
        cartSubtotal.textContent = "R$ 0,00";
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = "py-4 flex items-center gap-4";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl bg-[#0B0F0E] border border-emerald-900/40">
            <div class="flex-1">
                <h4 class="font-bold text-white text-sm line-clamp-1">${item.name}</h4>
                <p class="text-xs text-[#00FF66] font-semibold mt-0.5">Tamanho: ${item.size}</p>
                <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-extrabold text-white">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    <div class="flex items-center gap-2 bg-[#0B0F0E] border border-emerald-900/50 rounded-lg px-2 py-1">
                        <button onclick="changeQuantity(${index}, -1)" class="text-slate-400 hover:text-white text-xs px-1"><i class="fa-solid fa-minus"></i></button>
                        <span class="text-xs font-bold text-white">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="text-slate-400 hover:text-white text-xs px-1"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="text-slate-500 hover:text-red-400 transition p-1"><i class="fa-solid fa-trash-can text-sm"></i></button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// Alterar Quantidade no Carrinho
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Remover Item do Carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Abrir e Fechar Carrinho
function openCart() {
    cartDrawer.classList.remove('hidden');
}
function closeCart() {
    cartDrawer.classList.add('hidden');
}

// Configuração de Event Listeners e Filtros
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    // Menu Mobile Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu mobile ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Filtros de Categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-[#00FF66]', 'text-black'));
            filterBtns.forEach(b => b.classList.add('bg-[#131A18]', 'text-slate-300'));
            
            e.target.classList.add('active', 'bg-[#00FF66]', 'text-black');
            e.target.classList.remove('bg-[#131A18]', 'text-slate-300');

            const filter = e.target.getAttribute('data-filter');
            if (filter === 'all') {
                renderProducts(products, productsGrid);
            } else {
                renderProducts(products.filter(p => p.category === filter), productsGrid);
            }
        });
    });

    // Finalizar Pedido via WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = "⚽ *NOVO PEDIDO - GOLPE BAIXO* ⚽\n\n";
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${index + 1}. *${item.name}*\n   Tamanho: ${item.size} | Qtd: ${item.quantity} | Valor: R$ ${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
        });

        message += `💰 *TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n\nPor favor, gostaria de prosseguir com o pagamento e entrega!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "5511999999999"; // Substitua pelo número real se necessário
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    // Formulário de Contato
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const msg = document.getElementById('contact-msg').value;

        const text = `💬 *CONTATO SITE - GOLPE BAIXO*\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Mensagem:* ${msg}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/5511999999999?text=${encodedText}`, '_blank');
    });
}