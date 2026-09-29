const products = [
    // Videogames
    { id: 1, title: 'Console PlayStation 5 Slim 1TB Standard Sony', category: 'Videogames', price: 3799.00, originalPrice: 4299.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=PlayStation+5', condition: 'Novo', full: true, rating: 4.9 },
    { id: 2, title: 'Console Xbox Series X 1TB Microsoft Preto', category: 'Videogames', price: 3899.00, originalPrice: 4499.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Xbox+Series+X', condition: 'Novo', full: true, rating: 4.8 },
    { id: 3, title: 'Console Nintendo Switch OLED 64GB Neon Joy-Con', category: 'Videogames', price: 2199.00, originalPrice: 2599.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Nintendo+Switch', condition: 'Novo', full: true, rating: 4.9 },
    
    // Televisões
    { id: 4, title: 'Smart TV 55" OLED 4K UHD LG evo C3 WebOS', category: 'Televisões', price: 4899.00, originalPrice: 5999.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Smart+TV+OLED+55', condition: 'Novo', full: true, rating: 5.0 },
    { id: 5, title: 'Smart TV LED 50" 4K UHD Samsung Crystal UHD', category: 'Televisões', price: 2299.00, originalPrice: 2799.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Smart+TV+LED+50', condition: 'Novo', full: true, rating: 4.7 },

    // Livros
    { id: 6, title: 'Box Trilogia O Senhor dos Anéis + Pôster Exclusivo', category: 'Livros', price: 119.90, originalPrice: 159.90, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Senhor+dos+Aneis', condition: 'Novo', full: true, rating: 4.9 },
    { id: 7, title: 'Livro: Hábitos Atômicos - James Clear (Best-seller)', category: 'Livros', price: 42.90, originalPrice: 59.90, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Habitos+Atomicos', condition: 'Novo', full: true, rating: 4.8 },

    // Móveis
    { id: 8, title: 'Sofá 3 Lugares Retrátil e Reclinável Suede Amaciado', category: 'Móveis', price: 1299.00, originalPrice: 1699.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Sofa+Retratil', condition: 'Novo', full: false, rating: 4.6 },
    { id: 9, title: 'Mesa de Jantar 6 Lugares Tampo de Vidro e Cadeiras', category: 'Móveis', price: 1899.00, originalPrice: 2399.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Mesa+de+Jantar', condition: 'Novo', full: false, rating: 4.5 },
    { id: 10, title: 'Cadeira Gamer Ergonômica Reclinável com Almofadas', category: 'Móveis', price: 799.00, originalPrice: 1099.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Cadeira+Gamer', condition: 'Novo', full: true, rating: 4.7 },

    // Roupas
    { id: 11, title: 'Kit com 3 Camisetas Básicas 100% Algodão Premium', category: 'Roupas', price: 119.90, originalPrice: 159.90, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Kit+Camisetas', condition: 'Novo', full: true, rating: 4.8 },
    { id: 12, title: 'Calça Jeans Masculina Slim Confortável Stretch', category: 'Roupas', price: 139.90, originalPrice: 189.90, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Calca+Jeans', condition: 'Novo', full: true, rating: 4.6 },
    { id: 13, title: 'Jaqueta Puffer Masculina Forrada Impermeável', category: 'Roupas', price: 259.00, originalPrice: 349.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Jaqueta+Puffer', condition: 'Novo', full: true, rating: 4.7 },

    // Eletrodomésticos
    { id: 14, title: 'Geladeira Frost Free Brastemp Duplex 375L Inox', category: 'Eletrodomésticos', price: 3199.00, originalPrice: 3799.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Geladeira+Frost+Free', condition: 'Novo', full: false, rating: 4.9 },
    { id: 15, title: 'Air Fryer Digital Mondial Grand Family 5L Inox', category: 'Eletrodomésticos', price: 499.00, originalPrice: 699.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Air+Fryer+5L', condition: 'Novo', full: true, rating: 4.9 },
    { id: 16, title: 'Máquina de Lavar Roupas 12kg Brastemp com Ciclo Tira Manchas', category: 'Eletrodomésticos', price: 2199.00, originalPrice: 2699.00, img: 'https://placehold.co/300x300/f1f5f9/1a4185?text=Lavadora+12kg', condition: 'Novo', full: false, rating: 4.8 }
];

let cart = [];
let wishlist = [products[0], products[3]];
let currentSelectedProduct = null;

window.onload = function() {
    renderProducts(products);
    renderWishlist();
    updateCartBadge();
};

function switchTab(tabName) {
    document.querySelectorAll('.tab-view').forEach(el => el.classList.add('hidden'));
    if (tabName === 'home') {
        document.getElementById('homeView').classList.remove('hidden');
    } else if (tabName === 'profile') {
        document.getElementById('profileView').classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchProfileSub(subName) {
    document.querySelectorAll('.profile-subtab').forEach(el => el.classList.add('hidden'));
    ['subBtnInfo', 'subBtnOrders', 'subBtnAddresses', 'subBtnWishlist'].forEach(id => {
        document.getElementById(id).className = "py-3 px-4 text-sm font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent";
    });

    if (subName === 'info') {
        document.getElementById('subInfo').classList.remove('hidden');
        document.getElementById('subBtnInfo').className = "py-3 px-4 text-sm font-bold border-b-2 border-amarelouBlue text-amarelouBlue";
    } else if (subName === 'orders') {
        document.getElementById('subOrders').classList.remove('hidden');
        document.getElementById('subBtnOrders').className = "py-3 px-4 text-sm font-bold border-b-2 border-amarelouBlue text-amarelouBlue";
    } else if (subName === 'addresses') {
        document.getElementById('subAddresses').classList.remove('hidden');
        document.getElementById('subBtnAddresses').className = "py-3 px-4 text-sm font-bold border-b-2 border-amarelouBlue text-amarelouBlue";
    } else if (subName === 'wishlist') {
        document.getElementById('subWishlist').classList.remove('hidden');
        document.getElementById('subBtnWishlist').className = "py-3 px-4 text-sm font-bold border-b-2 border-amarelouBlue text-amarelouBlue";
    }
}

function filterByCategory(category) {
    switchTab('home');
    const titleEl = document.getElementById('productSectionTitle');
    if (category === 'Todos') {
        titleEl.innerText = "Produtos em Destaque";
        renderProducts(products);
    } else {
        titleEl.innerText = "Categoria: " + category;
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered.length > 0 ? filtered : products);
    }
}

function handleSearch(e) {
    if (e.key === 'Enter') {
        executeSearch();
    }
}

function executeSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    switchTab('home');
    const filtered = products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    document.getElementById('productSectionTitle').innerText = `Resultados para: "${query}"`;
    renderProducts(filtered);
}

function renderProducts(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<div class="col-span-4 text-center py-12 text-slate-500 font-medium">Nenhum produto encontrado para esta busca.</div>';
        return;
    }
    list.forEach(p => {
        const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const formattedPrice = p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        const formattedOrig = p.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-slate-200 flex flex-col justify-between group overflow-hidden cursor-pointer";
        card.onclick = () => openProductModal(p);

        card.innerHTML = `
            <div>
                <div class="relative bg-slate-50 p-4 h-52 flex items-center justify-center overflow-hidden">
                    <img src="${p.img}" alt="${p.title}" class="h-full object-contain group-hover:scale-105 transition duration-300">
                    <button onclick="event.stopPropagation(); toggleWishlist(${p.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:text-rose-600 transition">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <div class="p-4 space-y-2">
                    <div class="text-[10px] text-slate-400 line-through">R$ ${formattedOrig}</div>
                    <div class="flex items-baseline gap-2">
                        <span class="text-xl font-extrabold text-slate-900">R$ ${formattedPrice}</span>
                        <span class="text-xs font-extrabold text-amarelouGreen">${discount}% OFF</span>
                    </div>
                    ${p.full ? '<div class="flex items-center gap-1 text-xs font-extrabold text-amarelouGreen"><i class="fa-solid fa-bolt text-[10px]"></i> FULL EXPRESS</div>' : ''}
                    <p class="text-xs text-slate-800 line-clamp-2 leading-relaxed font-medium">${p.title}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <span class="text-[11px] text-amarelouGreen font-bold">Frete Grátis</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    document.getElementById('wishlistCount').innerText = wishlist.length;
    container.innerHTML = '';
    if (wishlist.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-500 font-medium">Nenhum produto favorito.</p>';
        return;
    }
    wishlist.forEach(p => {
        const formattedPrice = p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        const item = document.createElement('div');
        item.className = "border rounded-xl p-3 flex gap-3 items-center bg-white shadow-sm";
        item.innerHTML = `
            <img src="${p.img}" class="w-16 h-16 object-contain bg-slate-50 rounded p-1">
            <div class="flex-grow">
                <h5 class="text-xs font-bold line-clamp-1 text-slate-900">${p.title}</h5>
                <p class="text-sm font-extrabold text-slate-900 mt-1">R$ ${formattedPrice}</p>
                <button onclick="addToCartFromWish(${p.id})" class="text-[11px] text-amarelouBlue font-bold hover:underline mt-1">Adicionar ao carrinho</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('hidden');
    renderCartItems();
}

function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<div class="text-center py-12 text-slate-400"><i class="fa-solid fa-cart-shopping text-4xl mb-2"></i><p class="text-sm font-medium">Seu carrinho está vazio</p></div>';
        document.getElementById('cartTotalPrice').innerText = 'R$ 0,00';
        document.getElementById('cartCountHeader').innerText = '0';
        document.getElementById('cartBadge').innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const formattedPrice = (item.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        const row = document.createElement('div');
        row.className = "flex items-center justify-between py-3";
        row.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${item.img}" class="w-12 h-12 object-contain bg-slate-50 rounded p-1">
                <div>
                    <h4 class="text-xs font-bold text-slate-900 line-clamp-1">${item.title}</h4>
                    <p class="text-xs text-slate-500">Qtd: ${item.qty} x R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div class="text-right flex items-center gap-3">
                <span class="text-xs font-bold text-slate-900">R$ ${formattedPrice}</span>
                <button onclick="removeFromCart(${index})" class="text-slate-400 hover:text-red-500"><i class="fa-solid fa-trash text-xs"></i></button>
            </div>
        `;
        list.appendChild(row);
    });

    const formattedTotal = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('cartTotalPrice').innerText = `R$ ${formattedTotal}`;
    document.getElementById('cartCountHeader').innerText = cart.reduce((acc, i) => acc + i.qty, 0);
    document.getElementById('cartBadge').innerText = cart.reduce((acc, i) => acc + i.qty, 0);
}

function addToCart(product) {
    const found = cart.find(i => i.id === product.id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartBadge();
    showToast('Produto adicionado ao carrinho com sucesso!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCartItems();
    updateCartBadge();
}

function updateCartBadge() {
    const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
    document.getElementById('cartBadge').innerText = totalQty;
}

function openProductModal(product) {
    currentSelectedProduct = product;
    document.getElementById('modalImg').src = product.img;
    document.getElementById('modalTitle').innerText = product.title;
    document.getElementById('modalCondition').innerText = product.condition;
    document.getElementById('modalPrice').innerText = `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('modalOriginalPrice').innerText = `R$ ${product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('modalInstallment').innerText = (product.price / 12).toFixed(2).replace('.', ',');
    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function addCurrentProductToCart() {
    if (currentSelectedProduct) {
        addToCart(currentSelectedProduct);
        closeProductModal();
        toggleCart();
    }
}

function buyNowCurrentProduct() {
    if (currentSelectedProduct) {
        addToCart(currentSelectedProduct);
        closeProductModal();
        openCheckoutModal();
    }
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Adicione produtos ao carrinho antes de finalizar!');
        return;
    }
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    document.getElementById('checkoutTotal').innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('cartDrawer').classList.add('hidden');
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

function finalizePurchase() {
    closeCheckoutModal();
    cart = [];
    updateCartBadge();
    showToast('Pedido realizado com sucesso! Obrigado por comprar no Amarelou!');
    switchTab('profile');
    switchProfileSub('orders');
}

function openLocationModal() {
    document.getElementById('locationModal').classList.remove('hidden');
}

function closeLocationModal() {
    document.getElementById('locationModal').classList.add('hidden');
}

function saveLocation() {
    const cep = document.getElementById('cepInput').value;
    if (cep.length < 8) {
        showToast('Informe um CEP válido.');
        return;
    }
    closeLocationModal();
    showToast('Endereço de entrega atualizado com sucesso!');
}

function toggleWishlist(productId) {
    const p = products.find(item => item.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removido dos favoritos.');
    } else {
        wishlist.push(p);
        showToast('Adicionado aos favoritos!');
    }
    renderWishlist();
}

function addToCartFromWish(productId) {
    const p = products.find(item => item.id === productId);
    addToCart(p);
    toggleCart();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}