// DADOS DOS PRODUTOS (Inspirados nas princesas)
const products = [
    {
        id: 1,
        name: "Vestido Lavanda Imperial",
        category: "rapunzel",
        badge: "Rapunzel",
        badgeClass: "badge-rapunzel",
        price: 4890.00,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
        description: "Vestido ballgown em tom lavanda com bordados florais artesanais e saia em camadas de tule cristal."
    },
    {
        id: 2,
        name: "Vestido Cristal da Meia-Noite",
        category: "cinderella",
        badge: "Cinderela",
        badgeClass: "badge-cinderella",
        price: 5200.00,
        image: "https://images.unsplash.com/photo-1594552072238-b8a3da72ae9a?auto=format&fit=crop&w=600&q=80",
        description: "Deslumbrante vestido azul celeste com milhares de cristais aplicados e corpete corset estruturado."
    },
    {
        id: 3,
        name: "Vestido Rubi Real",
        category: "snowwhite",
        badge: "Branca de Neve",
        badgeClass: "badge-snowwhite",
        price: 4500.00,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
        description: "Elegante combinação em vermelho rubi profundo e veludo nobre com detalhes dourados clássicos."
    },
    {
        id: 4,
        name: "Vestido Lírio dos Ventos",
        category: "tiana",
        badge: "Tiana",
        badgeClass: "badge-tiana",
        price: 4950.00,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
        description: "Inspirado na natureza exuberante, em verde esmeralda com aplicações de folhas bordadas a fio de ouro."
    },
    {
        id: 5,
        name: "Vestido Rosa Dourada",
        category: "bela",
        badge: "Bela",
        badgeClass: "badge-bela",
        price: 5500.00,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
        description: "Tom dourado solar reluzente com saia ampla e cauda imponente digna de um baile real."
    },
    {
        id: 6,
        name: "Vestido Torre de Cristal",
        category: "rapunzel",
        badge: "Rapunzel",
        badgeClass: "badge-rapunzel",
        price: 4700.00,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
        description: "Variação romântica em tom lilás suave com mangas bufantes removíveis e brilho estelar."
    }
];

// ESTADO DO CARRINHO
let cart = [];

// ELEMENTOS DOM
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// RENDERIZAR PRODUTOS
function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="product-img-container">
                <span class="badge ${product.badgeClass}">${product.badge}</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// FILTRAGEM POR CATEGORIA
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderProducts(filter);
    });
});

// ADICIONAR AO CARRINHO
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if(product) {
        cart.push(product);
        updateCartUI();
        showNotification(`${product.name} adicionado à sacola!`);
    }
}

// REMOVER DO CARRINHO
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ATUALIZAR INTERFACE DO CARRINHO
function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = '';

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Sua sacola está vazia.</p>';
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span>R$ ${item.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
}

// NOTIFICAÇÃO SIMPLES
function showNotification(msg) {
    const notif = document.createElement('div');
    notif.textContent = msg;
    notif.style.position = 'fixed';
    notif.style.bottom = '30px';
    notif.style.right = '30px';
    notif.style.background = 'var(--gold)';
    notif.style.color = 'var(--bg-color)';
    notif.style.padding = '12px 24px';
    notif.style.borderRadius = '30px';
    notif.style.fontWeight = '600';
    notif.style.zIndex = '3000';
    notif.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// CONTROLE DO MODAL DO CARRINHO
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// FINALIZAR PEDIDO
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert('Sua sacola está vazia.');
        return;
    }
    alert('Pedido / Solicitação de Prova Realizada com Sucesso! Nossa equipe entrará em contato via WhatsApp para confirmar os detalhes.');
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
});

// FORMULÁRIO DE CONTATO
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// INICIALIZAR PÁGINA
renderProducts();