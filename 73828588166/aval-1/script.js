// LISTA DOS 10 PRODUTOS DE ROUPAS VARIADAS
const products = [
    {
        id: 1,
        name: "Terno Slim Alfaiataria Azul",
        category: "terno",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
        description: "Terno completo com corte slim italiano, tecido resistente a amassados e acabamento de alto padrão."
    },
    {
        id: 2,
        name: "Camisa Social Branca Premium",
        category: "camisa",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
        description: "Camisa social 100% algodão egípcio, colarinho estruturado e caimento impecável."
    },
    {
        id: 3,
        name: "Jaqueta de Couro Executiva",
        category: "casaco",
        price: 649.90,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        description: "Jaqueta de couro legítimo com forro térmico acolchoado e bolsos internos seguros."
    },
    {
        id: 4,
        name: "Calça Chino Bege Casual",
        category: "calca",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        description: "Calça chino em sarja com elastano, garantindo conforto e liberdade de movimento no dia a dia."
    },
    {
        id: 5,
        name: "Blazer Sport Fino Cinza",
        category: "terno",
        price: 529.90,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        description: "Blazer versátil ideal para ocasiões semi-formais, combinando perfeitamente com calças jeans ou chino."
    },
    {
        id: 6,
        name: "Camisa Polo Azul Marinho",
        category: "camisa",
        price: 149.90,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
        description: "Camisa polo piquet de alta durabilidade, toque macio e excelente retenção de cor."
    },
    {
        id: 7,
        name: "Sobretudo Clássico Preto",
        category: "casaco",
        price: 799.90,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
        description: "Sobretudo elegante em mistura de lã, perfeito para dias frios com muito estilo e sofisticação."
    },
    {
        id: 8,
        name: "Calça Jeans Dark Slim",
        category: "calca",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1542272604-787c96355dca?auto=format&fit=crop&w=600&q=80",
        description: "Calça jeans com lavagem escura e modelagem slim fit. Versátil para qualquer ocasião casual."
    },
    {
        id: 9,
        name: "Bermuda Alfaiataria Khaki",
        category: "bermuda",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        description: "Bermuda em tecido leve de alfaiataria, ideal para dias quentes sem perder a elegância."
    },
    {
        id: 10,
        name: "Jaqueta Bomber Casual Verde",
        category: "casaco",
        price: 389.90,
        image: "https://images.unsplash.com/photo-1548883354-7622d03927e1?auto=format&fit=crop&w=600&q=80",
        description: "Jaqueta bomber moderna com punhos elásticos e design urbano contemporâneo."
    }
];

// ESTADO DO CARRINHO
let cart = [];

// ELEMENTOS DOM
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');
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
            <div class="product-img-wrapper">
                <span class="product-tag">${capitalize(product.category)}</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <div class="product-buttons">
                    <button class="btn btn-outline" onclick="openModal(${product.id})">Detalhes</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Comprar</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// FILTROS
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderProducts(filter);
    });
});

// ADICIONAR AO CARRINHO
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    openCartDrawer();
}

// ATUALIZAR CARRINHO
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">Seu carrinho está vazio.</p>`;
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')} (x${item.quantity})</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    cartCount.textContent = totalCount;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// REMOVER DO CARRINHO
window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// ABRIR/FECHAR CARRINHO
function openCartDrawer() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCartDrawer() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
}

cartBtn.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

// MODAL DE DETALHES DO PRODUTO
window.openModal = function(id) {
    const product = products.find(p => p.id === id);
    modalBody.innerHTML = `
        <div class="modal-body-grid">
            <img src="${product.image}" alt="${product.name}">
            <div class="modal-details">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p>${product.description}</p>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); closeModal();">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
    productModal.classList.add('open');
}

function closeModal() {
    productModal.classList.remove('open');
}

closeModalBtn.addEventListener('click', closeModal);
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
});

// FINALIZAR PEDIDO
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Pedido finalizado com sucesso na Samuel Confecções! Obrigado pela preferência.');
    cart = [];
    updateCart();
    closeCartDrawer();
});

// FORMULÁRIO DE CONTATO
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// INICIALIZAR PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
});