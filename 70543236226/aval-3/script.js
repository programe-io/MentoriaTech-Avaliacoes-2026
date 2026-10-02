// Base de Dados de Produtos divididos pelas seções pedidas
const products = [
    // Cremes
    { id: 1, name: "Creme de Hidratação Profunda Ultra Nutritiva", category: "cremes", price: 69.90, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "Creme de Pentear Cachos Definidos & Leves", category: "cremes", price: 49.90, image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600" },

    // Shampoo
    { id: 3, name: "Shampoo Detox Purificante Raiz Limpa", category: "shampoo", price: 42.90, image: "https://images.unsplash.com/photo-1585232351913-73eac97b695b?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Shampoo Reconstrução Total Queratina", category: "shampoo", price: 54.90, image: "https://images.unsplash.com/photo-1608248597359-994c633a6962?auto=format&fit=crop&q=80&w=600" },

    // Body Splash para Cabelos
    { id: 5, name: "Body Splash Capilar Brilho de Baunilha", category: "bodysplash", price: 59.90, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600" },
    { id: 6, name: "Body Splash Capilar Flor de Cerejeira & Glow", category: "bodysplash", price: 59.90, image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600" },

    // Condicionador
    { id: 7, name: "Condicionador Selador de Cutículas Extreme", category: "condicionador", price: 45.90, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600" },
    { id: 8, name: "Condicionador Brilho Espelhado Maciez Total", category: "condicionador", price: 48.90, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600" },

    // Toucas de Cetim
    { id: 9, name: "Touca de Cetim Dupla Face Anti-Frizz Rosa", category: "toucas", price: 29.90, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600" },
    { id: 10, name: "Touca de Cetim Regulável Roxa Metálica", category: "toucas", price: 34.90, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600" },

    // Escovas para Cabelos
    { id: 11, name: "Escova Desembaraçadora Flexível Anti-Quebra", category: "escovas", price: 39.90, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600" },
    { id: 12, name: "Escova Modeladora Térmica Cerâmica Pro", category: "escovas", price: 79.90, image: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&q=80&w=600" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    renderCategory('cremes', 'grid-cremes');
    renderCategory('shampoo', 'grid-shampoo');
    renderCategory('bodysplash', 'grid-bodysplash');
    renderCategory('condicionador', 'grid-condicionador');
    renderCategory('toucas', 'grid-toucas');
    renderCategory('escovas', 'grid-escovas');
    updateCartUI();
});

function renderCategory(categoryKey, containerId) {
    const container = document.getElementById(containerId);
    const items = products.filter(p => p.category === categoryKey);

    container.innerHTML = items.map(product => `
        <div class="product-card bg-slate-900 border border-purple-900/30 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div class="relative h-64 overflow-hidden bg-slate-950">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-base text-white mb-3 line-clamp-2">${product.name}</h3>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-purple-900/20">
                    <span class="text-xl font-black text-white">R$ ${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="bg-gradient-to-r from-glowpurple to-glowpink hover:opacity-95 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-purple-500/20 transition flex items-center gap-2">
                        <i class="fa-solid fa-cart-plus"></i> Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`"${product.name}" adicionado à sacola!`);
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

function updateCartUI() {
    const counter = document.getElementById('cart-counter');
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = totalItems;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<div class="text-center py-12 text-slate-500">Sua sacola está vazia.</div>`;
        totalElement.textContent = `R$ 0,00`;
        return;
    }

    let total = 0;
    itemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center gap-4 py-3">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl shadow">
                <div class="flex-1">
                    <h4 class="font-bold text-sm text-white line-clamp-1">${item.name}</h4>
                    <span class="text-xs text-slate-400">R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-red-400 p-2 transition">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        showToast('Sua sacola está vazia!');
        return;
    }
    showToast('Compra finalizada com sucesso! Obrigado.');
    cart = [];
    updateCartUI();
    toggleCart();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}