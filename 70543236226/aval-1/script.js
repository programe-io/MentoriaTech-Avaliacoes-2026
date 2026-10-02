// Base de Dados de Livros (Estoque Dinâmico)
const books = [
    {
        id: 1,
        title: "O Trono de Vidro e Sombras",
        author: "Sarah J. Maas",
        category: "fantasia",
        price: 59.90,
        oldPrice: 79.90,
        stock: 12,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        promo: true
    },
    {
        id: 2,
        title: "A Química do Amor Eterno",
        author: "Ali Hazelwood",
        category: "romance",
        price: 44.90,
        oldPrice: 59.90,
        stock: 5,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        promo: true
    },
    {
        id: 3,
        title: "Clean Code & Arquitetura Limpa",
        author: "Robert C. Martin",
        category: "tecnologia",
        price: 89.90,
        oldPrice: 119.90,
        stock: 8,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
        promo: false
    },
    {
        id: 4,
        title: "Hábitos Atômicos na Prática",
        author: "James Clear",
        category: "desenvolvimento",
        price: 39.90,
        oldPrice: 49.90,
        stock: 15,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
        promo: true
    },
    {
        id: 5,
        title: "O Império dos Dragões Celestiais",
        author: "R.F. Kuang",
        category: "fantasia",
        price: 64.90,
        oldPrice: 84.90,
        stock: 3,
        image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
        promo: false
    },
    {
        id: 6,
        title: "JavaScript Definitivo & Node.js",
        author: "David Flanagan",
        category: "tecnologia",
        price: 99.90,
        oldPrice: 139.90,
        stock: 6,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
        promo: false
    }
];

let cart = [];

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(books);
    renderPromos();
    renderStockTable();
    updateCartUI();
});

// Renderizar Catálogo com Filtros
function renderBooks(booksToRender) {
    const grid = document.getElementById('books-grid');
    if (booksToRender.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500">Nenhum livro encontrado.</div>`;
        return;
    }

    grid.innerHTML = booksToRender.map(book => `
        <div class="book-card bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div class="relative h-64 overflow-hidden bg-slate-950">
                <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                ${book.promo ? '<span class="absolute top-3 left-3 bg-juhorange text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">PROMOÇÃO</span>' : ''}
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <span class="text-xs uppercase tracking-wider text-juhpurple font-semibold">${book.category}</span>
                    <h3 class="font-bold text-lg text-white mt-1 mb-1 line-clamp-1">${book.title}</h3>
                    <p class="text-slate-400 text-sm mb-4">${book.author}</p>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div>
                        <span class="text-xs text-slate-500 line-through block">R$ ${book.oldPrice.toFixed(2)}</span>
                        <span class="text-lg font-extrabold text-white">R$ ${book.price.toFixed(2)}</span>
                    </div>
                    <button onclick="addToCart(${book.id})" class="bg-juhpurple hover:bg-purple-600 text-white p-3 rounded-xl transition shadow-md shadow-purple-500/20">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtrar Livros (Busca e Categoria)
function filterBooks() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    const filtered = books.filter(book => {
        const matchesQuery = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || book.category === category;
        return matchesQuery && matchesCategory;
    });

    renderBooks(filtered);
}

// Renderizar Promoções
function renderPromos() {
    const promoGrid = document.getElementById('promo-grid');
    const promoBooks = books.filter(b => b.promo);

    promoGrid.innerHTML = promoBooks.map(book => `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-4 items-center">
            <img src="${book.image}" alt="${book.title}" class="w-24 h-32 object-cover rounded-xl shadow-md">
            <div class="flex-1">
                <span class="bg-juhorange/10 text-juhorange text-xs font-bold px-2 py-0.5 rounded border border-juhorange/20">Oferta Especial</span>
                <h4 class="font-bold text-base text-white mt-2 mb-1 line-clamp-1">${book.title}</h4>
                <p class="text-slate-400 text-xs mb-3">${book.author}</p>
                <div class="flex items-center gap-2">
                    <span class="text-sm font-extrabold text-white">R$ ${book.price.toFixed(2)}</span>
                    <span class="text-xs text-slate-500 line-through">R$ ${book.oldPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar Tabela de Estoque
function renderStockTable() {
    const tbody = document.getElementById('stock-table-body');
    tbody.innerHTML = books.map(book => `
        <tr class="hover:bg-slate-800/40 transition">
            <td class="py-4 px-6 font-medium text-white flex items-center gap-3">
                <img src="${book.image}" class="w-10 h-10 rounded-lg object-cover">
                ${book.title}
            </td>
            <td class="py-4 px-6 text-slate-400 capitalize">${book.category}</td>
            <td class="py-4 px-6 text-slate-200">R$ ${book.price.toFixed(2)}</td>
            <td class="py-4 px-6">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${book.stock > 5 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}">
                    ${book.stock > 0 ? `${book.stock} disponíveis` : 'Esgotado'}
                </span>
            </td>
            <td class="py-4 px-6 text-right">
                <button onclick="addToCart(${book.id})" ${book.stock === 0 ? 'disabled' : ''} class="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                    Comprar
                </button>
            </td>
        </tr>
    `).join('');
}

// Carrinho de Compras (Adicionar, Atualizar, Remover)
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.stock <= 0) {
        showToast('Livro esgotado no estoque!');
        return;
    }

    // Deduz do estoque geral
    book.stock--;
    renderStockTable();

    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    updateCartUI();
    showToast(`"${book.title}" adicionado ao carrinho!`);
}

function removeFromCart(bookId) {
    const index = cart.findIndex(item => item.id === bookId);
    if (index !== -1) {
        const item = cart[index];
        // Retorna ao estoque
        const book = books.find(b => b.id === bookId);
        if (book) book.stock += item.quantity;

        cart.splice(index, 1);
        renderStockTable();
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
        itemsContainer.innerHTML = `<div class="text-center py-12 text-slate-500">Seu carrinho está vazio.</div>`;
        totalElement.textContent = `R$ 0,00`;
        return;
    }

    let total = 0;
    itemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center gap-4 py-3">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded-xl shadow">
                <div class="flex-1">
                    <h4 class="font-bold text-sm text-white line-clamp-1">${item.title}</h4>
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
        showToast('Seu carrinho está vazio!');
        return;
    }
    showToast('Compra finalizada com sucesso! Obrigado.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Notificações Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}

// Formulário de Contato
function handleContact(e) {
    e.preventDefault();
    showToast('Mensagem enviada com sucesso! Retornaremos em breve.');
    e.target.reset();
}