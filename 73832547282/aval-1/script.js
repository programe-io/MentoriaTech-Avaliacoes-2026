// Base de dados dos Livros
const booksData = [
  {
    id: 1,
    title: "O Templo dos Afetos",
    author: "Helena Ramos",
    category: "Romance",
    price: 49.90,
    promoPrice: 34.90,
    stock: 12,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Cartas para o Amor Humano",
    author: "Carlos Drummond",
    category: "Poesia",
    price: 39.90,
    promoPrice: null,
    stock: 5,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "A Arte de Amar e Acolher",
    author: "Erich Fromm",
    category: "Desenvolvimento",
    price: 55.00,
    promoPrice: 39.90,
    stock: 8,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    category: "Clássicos",
    price: 42.00,
    promoPrice: null,
    stock: 15,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    title: "O Jardineiro da Alma",
    author: "Clarice Lispector",
    category: "Ficção",
    price: 45.00,
    promoPrice: null,
    stock: 3,
    isPromo: false,
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    title: "Sonetos de Amor Infinito",
    author: "Vinicius de Moraes",
    category: "Poesia",
    price: 36.00,
    promoPrice: 25.00,
    stock: 20,
    isPromo: true,
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400"
  }
];

let cart = [];

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
  renderPromos();
  renderCart();
  
  // Menu Mobile Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});

// Navegação de Abas
function switchTab(tabId) {
  const tabs = ['home', 'estoque', 'promocao', 'carrinho', 'contato'];
  
  tabs.forEach(tab => {
    const section = document.getElementById(`sec-${tab}`);
    const navBtn = document.getElementById(`nav-${tab}`);
    
    if (section) section.classList.add('hidden');
    if (navBtn) {
      navBtn.classList.remove('bg-amber-100/80', 'text-amber-900', 'font-semibold');
      navBtn.classList.add('text-amber-800');
    }
  });

  const activeSection = document.getElementById(`sec-${tabId}`);
  const activeNav = document.getElementById(`nav-${tabId}`);
  
  if (activeSection) activeSection.classList.remove('hidden');
  if (activeNav) {
    activeNav.classList.add('bg-amber-100/80', 'text-amber-900', 'font-semibold');
  }

  // Esconder menu mobile ao selecionar item
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar Acervo Completo
function renderBooks(booksToRender = booksData) {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  
  grid.innerHTML = booksToRender.map(book => {
    const finalPrice = book.isPromo ? book.promoPrice : book.price;
    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div class="relative aspect-[3/4] overflow-hidden bg-amber-100">
          <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          ${book.isPromo ? `<span class="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Promoção</span>` : ''}
          <span class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <i class="fa-solid fa-boxes-stacked mr-1"></i> ${book.stock} em estoque
          </span>
        </div>
        
        <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div>
            <span class="text-[11px] font-semibold uppercase text-amber-700 tracking-wider">${book.category}</span>
            <h3 class="font-serif font-bold text-lg text-amber-950 group-hover:text-amber-800 transition-colors leading-snug">${book.title}</h3>
            <p class="text-xs text-amber-900/70 mt-1">por ${book.author}</p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-amber-900/5">
            <div>
              ${book.isPromo ? `<span class="text-xs text-amber-900/50 line-through block">R$ ${book.price.toFixed(2)}</span>` : ''}
              <span class="text-lg font-bold text-amber-950">R$ ${finalPrice.toFixed(2)}</span>
            </div>
            <button onclick="addToCart(${book.id})" class="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-900 hover:text-white text-amber-900 font-semibold text-xs transition-colors flex items-center gap-1.5">
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

  const promoBooks = booksData.filter(b => b.isPromo);
  grid.innerHTML = promoBooks.map(book => `
    <div class="bg-white rounded-2xl overflow-hidden border border-rose-900/10 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row p-4 gap-4">
      <img src="${book.cover}" alt="${book.title}" class="w-full sm:w-28 h-36 object-cover rounded-xl">
      <div class="flex flex-col justify-between flex-grow">
        <div>
          <span class="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Oferta Especial</span>
          <h3 class="font-serif font-bold text-base text-amber-950 mt-1">${book.title}</h3>
          <p class="text-xs text-amber-900/70">${book.author}</p>
        </div>
        <div class="mt-3">
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-bold text-rose-700">R$ ${book.promoPrice.toFixed(2)}</span>
            <span class="text-xs text-amber-900/40 line-through">R$ ${book.price.toFixed(2)}</span>
          </div>
          <button onclick="addToCart(${book.id})" class="mt-2 w-full py-2 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-semibold text-xs transition">
            Aproveitar Desconto
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filtro de Livros no Estoque
function filterBooks() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filtered = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || book.category === category;
    return matchesSearch && matchesCategory;
  });

  renderBooks(filtered);
}

// Adicionar ao Carrinho
function addToCart(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;

  const existingItem = cart.find(item => item.id === bookId);
  const currentPrice = book.isPromo ? book.promoPrice : book.price;

  if (existingItem) {
    if (existingItem.quantity < book.stock) {
      existingItem.quantity += 1;
      showToast(`Adicionado mais um exemplar de "${book.title}"`);
    } else {
      showToast(`Limite de estoque atingido!`, true);
      return;
    }
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      price: currentPrice,
      cover: book.cover,
      quantity: 1,
      maxStock: book.stock
    });
    showToast(`"${book.title}" foi adicionado ao carrinho!`);
  }

  updateCartBadge();
  renderCart();
}

// Atualizar Contador do Carrinho
function updateCartBadge() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = count;
}

// Renderizar Carrinho
function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl p-8 border border-amber-900/10 text-center space-y-4">
        <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl">
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <h3 class="font-serif font-bold text-lg text-amber-950">Seu carrinho está vazio</h3>
        <p class="text-sm text-amber-800/70">Navegue pelo acervo e adicione livros para prosseguir.</p>
        <button onclick="switchTab('estoque')" class="px-5 py-2.5 bg-amber-900 text-white text-xs font-bold rounded-xl hover:bg-amber-950 transition">
          Ver Acervo
        </button>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="bg-white p-4 rounded-2xl border border-amber-900/10 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <img src="${item.cover}" alt="${item.title}" class="w-14 h-20 object-cover rounded-lg">
          <div>
            <h4 class="font-serif font-bold text-amber-950 text-sm">${item.title}</h4>
            <span class="text-xs text-amber-800/80">R$ ${item.price.toFixed(2)} un.</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center bg-amber-50 rounded-xl border border-amber-900/10">
            <button onclick="changeQuantity(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center text-amber-900 hover:bg-amber-200/50 rounded-l-xl font-bold text-sm">-</button>
            <span class="w-8 text-center text-xs font-bold text-amber-950">${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)" class="w-8 h-8 flex items-center justify-center text-amber-900 hover:bg-amber-200/50 rounded-r-xl font-bold text-sm">+</button>
          </div>

          <span class="font-bold text-sm text-amber-950 min-w-[70px] text-right">R$ ${itemTotal.toFixed(2)}</span>

          <button onclick="removeFromCart(${item.id})" class="text-rose-600 hover:text-rose-800 p-2">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  updateCartTotals(subtotal);
}

// Alterar Quantidade
function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (delta > 0 && item.quantity >= item.maxStock) {
    showToast(`Limite máximo em estoque atingido`, true);
    return;
  }

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCartBadge();
    renderCart();
  }
}

// Remover do Carrinho
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartBadge();
  renderCart();
  showToast("Item removido do carrinho.");
}

// Atualizar Subtotal e Total
function updateCartTotals(subtotal) {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  
  if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
}

// Finalizar Pedido
function checkout() {
  if (cart.length === 0) {
    showToast("Adicione itens ao carrinho para finalizar!", true);
    return;
  }

  const orderType = document.querySelector('input[name="order-type"]:checked').value;
  const msg = orderType === 'compra' 
    ? "Pedido realizado com sucesso! Enviaremos os detalhes para o seu e-mail." 
    : "Solicitação de empréstimo enviada! Retire seus livros na biblioteca física em até 48h.";

  alert(msg);
  cart = [];
  updateCartBadge();
  renderCart();
  switchTab('home');
}

// Enviar Formulário de Contato
function handleContactSubmit(event) {
  event.preventDefault();
  showToast("Mensagem enviada com sucesso! Responderemos em breve.");
  event.target.reset();
}

// Sistema de Notificação Toast
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.className = `fixed bottom-5 right-5 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 z-50 ${isError ? 'bg-rose-900' : 'bg-amber-900'}`;
  
  toast.classList.remove('translate-y-20', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}