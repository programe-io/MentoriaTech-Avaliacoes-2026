// Base de dados dos produtos do feed
const products = [
    {
        id: 1,
        title: "Vestido Midi Floral Primavera",
        category: "vestidos",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
        description: "Vestido leve e fluido com estampa floral exclusiva. Perfeito para dias ensolarados e passeios ao ar livre."
    },
    {
        id: 2,
        title: "Casaco Trench Coat Minimalista",
        category: "casacos",
        price: 349.90,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
        description: "Casaco elegante de alfaiataria com cinto ajustável. Peça versátil e sofisticada para qualquer estação."
    },
    {
        id: 3,
        title: "Bota Couro Cano Curto",
        category: "calcados",
        price: 279.90,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
        description: "Bota em couro legítimo com salto confortável e acabamento impecável. Sofisticação e durabilidade."
    },
    {
        id: 4,
        title: "Conjunto Alfaiataria Modern",
        category: "vestidos",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        description: "Conjunto composto por blazer leve e calça de corte reto. Ideal para produções elegantes de trabalho ou lazer."
    },
    {
        id: 5,
        title: "Bolsa Transversal Couro Chic",
        category: "acessorios",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
        description: "Bolsa compacta com alça ajustável e detalhes em metal dourado. Praticidade com muito estilo."
    }
];

let cart = [];
let currentProduct = null;

// Elementos do DOM
const feedContainer = document.getElementById('feedContainer');
const filterChips = document.querySelectorAll('.filter-chip');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartBadge = document.getElementById('cartBadge');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');

const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalAddToCart = document.getElementById('modalAddToCart');

// Renderizar o Feed
function renderFeed(filter = 'all') {
    feedContainer.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    if (filteredProducts.length === 0) {
        feedContainer.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 40px 0;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Loja">
                    <div class="post-user-info">
                        <h4>chicfeed_store</h4>
                        <span>Coleção Exclusiva</span>
                    </div>
                </div>
                <button class="post-options"><i class="fa-solid fa-ellipsis"></i></button>
            </div>
            <div class="post-image-container" onclick="openModal(${product.id})">
                <img src="${product.image}" alt="${product.title}">
                <div class="post-tag-badge">Ver Detalhes</div>
            </div>
            <div class="post-actions">
                <div class="post-actions-left">
                    <button onclick="toggleLike(this)"><i class="fa-regular fa-heart"></i></button>
                    <button onclick="openModal(${product.id})"><i class="fa-regular fa-comment"></i></button>
                    <button onclick="shareProduct('${product.title}')"><i class="fa-regular fa-paper-plane"></i></button>
                </div>
                <button onclick="toggleSave(this)"><i class="fa-regular fa-bookmark"></i></button>
            </div>
            <div class="post-content">
                <div class="post-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <div class="post-desc"><span>${product.title}</span> - ${product.description}</div>
                <button class="buy-now-btn" onclick="openModal(${product.id})">Comprar Agora</button>
            </div>
        `;
        feedContainer.appendChild(postCard);
    });
}

// Filtros de Categoria
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        renderFeed(filter);
    });
});

// Ações de Curtir e Salvar Post
function toggleLike(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#e91e63';
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = 'inherit';
    }
}

function toggleSave(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

function shareProduct(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Confira este look incrível na ChicFeed!`,
            url: window.location.href,
        }).catch(() => {});
    } else {
        alert(`Link do produto "${title}" copiado para a área de transferência!`);
    }
}

// Modal do Produto
function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    modalImg.src = currentProduct.image;
    modalTitle.textContent = currentProduct.title;
    modalPrice.textContent = `R$ ${currentProduct.price.toFixed(2).replace('.', ',')}`;
    modalDesc.textContent = currentProduct.description;

    productModal.classList.add('open');
    overlay.classList.add('open');
}

closeModal.addEventListener('click', () => {
    productModal.classList.remove('open');
    overlay.classList.remove('open');
});

// Seleção de tamanho no Modal
const sizeOpts = document.querySelectorAll('.size-opt');
sizeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        sizeOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
    });
});

// Adicionar ao Carrinho pelo Modal
modalAddToCart.addEventListener('click', () => {
    if (!currentProduct) return;
    
    const activeSize = document.querySelector('.size-opt.active').textContent;
    
    const itemInCart = cart.find(item => item.id === currentProduct.id && item.size === activeSize);
    
    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({
            ...currentProduct,
            size: activeSize,
            quantity: 1
        });
    }

    updateCartUI();
    productModal.classList.remove('open');
    cartDrawer.classList.add('open');
});

// Controle do Carrinho Drawer
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    overlay.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('open');
});

overlay.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    productModal.classList.remove('open');
    overlay.classList.remove('open');
});

// Atualizar UI do Carrinho
function updateCartUI() {
    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Sua sacola está vazia.</p>';
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <span>Tam: ${item.size} | Qtd: ${item.quantity}</span>
                <p style="font-weight: 700; margin-top: 4px;">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sua sacola está vazia!');
        return;
    }
    alert('Compra finalizada com sucesso! Agradecemos a preferência pela nossa loja.');
    cart = [];
    updateCartUI();
    cartDrawer.classList.remove('open');
    overlay.classList.remove('open');
});

// Inicialização
renderFeed();