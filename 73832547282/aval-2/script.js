// Base de Dados dos Produtos do Cardápio / Estoque
const productsData = [
  {
    id: 1,
    title: "Espresso Sol da Primavera",
    desc: "Café especial com notas de mel e acidez cítrica equilibrada.",
    category: "Quentes",
    price: 8.50,
    promoPrice: null,
    stock: 45,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Iced Mocha Caramelo",
    desc: "Café gelado com calda de caramelo, leite cremoso e chantilly.",
    category: "Gelados",
    price: 18.00,
    promoPrice: 14.50,
    stock: 20,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Croissant Folhado Dourado",
    desc: "Croissant artesanal amanteigado de fermentação natural.",
    category: "Salgados",
    price: 14.00,
    promoPrice: 11.00,
    stock: 12,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Grãos Torrados Especiais (250g)",
    desc: "Grãos de café especial torrados semanalmente para preparar em casa.",
    category: "Quentes",
    price: 38.00,
    promoPrice: null,
    stock: 15,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    title: "Cappuccino Italiano",
    desc: "Espresso, leite vaporizado e uma camada generosa de espuma fina.",
    category: "Quentes",
    price: 12.50,
    promoPrice: null,
    stock: 30,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    title: "Combo Primavera Feliz",
    desc: "1 Cappuccino + 1 Croissant Amanteigado + 1 Fatia de Bolo.",
    category: "Doces",
    price: 32.00,
    promoPrice: 24.90,
    stock: 10,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
  }
];

let cart = [];

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderPromos();
  renderCart();
});

// Alternar Abas
function switchTab(tabId) {
  const tabs = ['home', 'estoque', 'promocao', 'carrinho', 'contato'];
  
  tabs.forEach(tab => {
    const section = document.getElementById(`sec-${tab}`);
    const navBtn = document.getElementById(`nav-${tab}`);
    
    if (section) section.classList.add('hidden');
    if (navBtn) {
      navBtn.classList.remove('bg-amber-300', 'text-amber-950', 'font-semibold');
      navBtn.classList.add('text-amber-100');
    }
  });

  const activeSection = document.getElementById(`sec-${tabId}`);
  const activeNav = document.getElementById(`nav-${tabId}`);
  
  if (activeSection) activeSection.classList.remove('hidden');
  if (activeNav) {
    activeNav.classList.add('bg-amber-300', 'text-amber-950', 'font-semibold');
  }

  // Fechar menu mobile se aberto
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Renderizar Cardápio / Estoque
function renderProducts(itemsToRender = productsData) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  grid.innerHTML = itemsToRender.map(item => {
    const finalPrice = item.isPromo ? item.promoPrice : item.price;
    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div class="relative aspect-[4/3] overflow-hidden bg-amber-100">
          <img src="${item.cover}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          ${item.isPromo ? `<span class="absolute top-3 left-3 bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Promoção</span>` : ''}
          <span class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <i class="fa-solid fa-boxes-stacked mr-1"></i> ${item.stock} dispo.
          </span>
        </div>
        
        <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div>
            <span class="text-[11px] font-semibold uppercase text-amber-800 tracking-wider">${item.category}</span>
            <h3 class="font-serif font-bold text-lg text-amber-950 leading-snug">${item.title}</h3>
            <p class="text-xs text-stone-500 mt-1">${item.desc}</p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-stone-100">
            <div>
              ${item.isPromo ? `<span class="text-xs text-stone-400 line-through block">R$ ${item.price.toFixed(2)}</span>` : ''}
              <span class="text-lg font-bold text-amber-950">R$ ${finalPrice.toFixed(2)}</span>
            </div>
            <button onclick="addToCart(${item.id})" class="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-900 hover:text-white text-amber-950 font-semibold text-xs transition-colors flex items-center gap-1.5">
              <i class="fa-solid fa-plus"></i> Adicionar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Renderizar Promoções
function renderPromos() {
  const grid = document.getElementById('promo-grid');
  if (!grid) return;

  const promoItems = productsData.filter(p => p.isPromo);
  grid.innerHTML = promoItems.map(item => `
    <div class="bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row p-4 gap-4">
      <img src="${item.cover}" alt="${item.title}" class="w-full sm:w-28 h-32 object-cover rounded-xl">
      <div class="flex flex-col justify-between flex-grow">
        <div>
          <span class="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Combo Promocional</span>
          <h3 class="font-serif font-bold text-base text-amber-950 mt-1">${item.title}</h3>
          <p class="text-xs text-stone-500 line-clamp-2">${item.desc}</p>
        </div>
        <div class="mt-3">
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-bold text-amber-900">R$ ${item.promoPrice.toFixed(2)}</span>
            <span class="text-xs text-stone-400 line-through">R$ ${item.price.toFixed(2)}</span>
          </div>
          <button onclick="addToCart(${item.id})" class="mt-2 w-full py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs transition">
            Adicionar Oferta
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filtrar Produtos
function filterMenu() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filtered = productsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

// Carrinho de Compras
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  const price = product.isPromo ? product.promoPrice : product.price;

  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
      showToast(`+1 ${product.title} no carrinho`);
    } else {
      showToast(`Limite do estoque atingido!`, true);
      return;
    }
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: price,
      cover: product.cover,
      quantity: 1,
      maxStock: product.stock
    });
    showToast(`"${product.title}" adicionado ao pedido!`);
  }

  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = count;
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto text-2xl">
          <i class="fa-solid fa-mug-hot"></i>
        </div>
        <h3 class="font-serif font-bold text-lg text-amber-950">Seu pedido está vazio</h3>
        <p class="text-sm text-stone-500">Escolha algo delicioso em nosso cardápio para começar.</p>
        <button onclick="switchTab('estoque')" class="px-5 py-2.5 bg-amber-900 text-white text-xs font-bold rounded-xl hover:bg-amber-950 transition">
          Ver Cardápio
        </button>
      </div>
    `;
    updateTotals(0);
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="bg-white p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <img src="${item.cover}" alt="${item.title}" class="w-14 h-14 object-cover rounded-xl">
          <div>
            <h4 class="font-serif font-bold text-amber-950 text-sm">${item.title}</h4>
            <span class="text-xs text-stone-500">R$ ${item.price.toFixed(2)} un.</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center bg-stone-100 rounded-xl border border-stone-200">
            <button onclick="changeQty(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center text-stone-800 hover:bg-stone-200 rounded-l-xl font-bold text-sm">-</button>
            <span class="w-8 text-center text-xs font-bold text-stone-900">${item.quantity}</span>
            <button onclick="changeQty(${item.id}, 1)" class="w-8 h-8 flex items-center justify-center text-stone-800 hover:bg-stone-200 rounded-r-xl font-bold text-sm">+</button>
          </div>

          <span class="font-bold text-sm text-amber-950 min-w-[70px] text-right">R$ ${itemTotal.toFixed(2)}</span>

          <button onclick="removeItem(${item.id})" class="text-rose-600 hover:text-rose-800 p-2">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  updateTotals(subtotal);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (delta > 0 && item.quantity >= item.maxStock) {
    showToast("Estoque máximo atingido para este item", true);
    return;
  }

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    updateCartBadge();
    renderCart();
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartBadge();
  renderCart();
  showToast("Item removido do pedido.");
}

function updateTotals(subtotal) {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
}

function checkout() {
  if (cart.length === 0) {
    showToast("Adicione itens ao seu pedido primeiro!", true);
    return;
  }

  const orderType = document.querySelector('input[name="order-type"]:checked').value;
  const msg = orderType === 'entrega' 
    ? "Pedido confirmado! Nosso entregador já está a caminho do seu endereço." 
    : "Pedido enviado para a cozinha! Seu café estará pronto para retirada em instantes.";

  alert(msg);
  cart = [];
  updateCartBadge();
  renderCart();
  switchTab('home');
}

function handleContactSubmit(e) {
  e.preventDefault();
  showToast("Mensagem enviada para nossa equipe!");
  e.target.reset();
}

function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.className = `fixed bottom-5 right-5 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 z-50 ${isError ? 'bg-rose-900' : 'bg-amber-900'}`;
  
  toast.classList.remove('translate-y-20', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}