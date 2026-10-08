// Dados de 10 produtos de moda feminina com imagens do Unsplash
const products = [
    {
        id: 1,
        name: "Vestido Longo Fuchsia Glamour",
        price: 459.90,
        category: "Vestidos",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        tag: "Mais Vendido"
    },
    {
        id: 2,
        name: "Conjunto Alfaiataria Violeta",
        price: 589.90,
        category: "Alfaiataria",
        image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800",
        tag: "Novo"
    },
    {
        id: 3,
        name: "Blazer Oversized Pink Neon",
        price: 349.90,
        category: "Casacos",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
        tag: "Promoção"
    },
    {
        id: 4,
        name: "Vestido Midi Cetim Magenta",
        price: 399.90,
        category: "Vestidos",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        tag: "Exclusivo"
    },
    {
        id: 5,
        name: "Calça Pantalona Luxo Dourada",
        price: 289.90,
        category: "Calças",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
        tag: ""
    },
    {
        id: 6,
        name: "Top Cropped Drapeado Roxo",
        price: 159.90,
        category: "Blusas",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        tag: "Novo"
    },
    {
        id: 7,
        name: "Saia Midi Plissada Metalizada",
        price: 279.90,
        category: "Saias",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
        tag: "Promoção"
    },
    {
        id: 8,
        name: "Macacão Elegance Velvet Roxo",
        price: 499.90,
        category: "Macacão",
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800",
        tag: "Limitado"
    },
    {
        id: 9,
        name: "Jaqueta Bomber Estampa Luxo",
        price: 419.90,
        category: "Casacos",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
        tag: ""
    },
    {
        id: 10,
        name: "Vestido Curto Festa Brilho",
        price: 529.90,
        category: "Vestidos",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
        tag: "Destaque"
    }
];

let cart = [];

// Renderizar produtos no catálogo
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
            <div class="relative h-80 overflow-hidden bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/400x500/e60073/ffffff?text=L%27%C3%89l%C3%A9gance'">
                ${product.tag ? `<span class="absolute top-3 left-3 bg-magenta-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">${product.tag}</span>` : ''}
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">${product.category}</span>
                    <h3 class="font-bold text-gray-900 text-lg mt-1 group-hover:text-magenta-600 transition-colors">${product.name}</h3>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-xl font-extrabold text-gray-900">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button onclick="addToCart(${product.id})" class="p-3 bg-magenta-50 hover:bg-magenta-600 text-magenta-600 hover:text-white rounded-xl transition-colors font-bold shadow-sm flex items-center space-x-1">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Feedback visual rápido no contador
    const counter = document.getElementById('cart-counter');
    counter.classList.add('scale-125');
    setTimeout(() => counter.classList.remove('scale-125'), 200);
}

// Atualizar quantidade de um item no carrinho
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

// Atualizar interface do carrinho (contador e modal)
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-counter').innerText = totalItems;

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fa-solid fa-bag-shopping text-4xl mb-3 text-gray-300"></i>
                <p class="text-sm font-medium">Seu carrinho está vazio.</p>
            </div>
        `;
        cartTotalContainer.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-bold text-sm text-gray-900">${item.name}</h4>
                    <p class="text-magenta-600 font-bold text-sm mt-1">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold">-</button>
                        <span class="text-sm font-bold text-gray-800">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartTotalContainer.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Abrir/Fechar Modal do Carrinho
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// Menu mobile toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Fechar menu mobile ao clicar em algum link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Simulação de envio do formulário de contato
function handleContactSubmit(event) {
    event.preventDefault();
    alertCustom('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

// Simulação de newsletter
function subscribeNewsletter() {
    alertCustom('Obrigada por se inscrever em nossa newsletter!');
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alertCustom('Seu carrinho está vazio!');
        return;
    }
    alertCustom('Compra simulada com sucesso! Obrigado por escolher L\'Élégance.');
    cart = [];
    updateCartUI();
    toggleCartModal();
}

// Notificação flutuante customizada
function alertCustom(message) {
    const div = document.createElement('div');
    div.className = 'fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 transition-all font-medium text-sm border border-magenta-500/30';
    div.innerText = message;
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// Inicializar catálogo ao carregar a página
window.onload = renderProducts;