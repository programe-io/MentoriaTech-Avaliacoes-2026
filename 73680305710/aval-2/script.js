// BANCO DE DADOS DE PRODUTOS COM CORES VIBRANTES E IMAGENS REAIS
const products = [
    {
        id: 1,
        name: "Camisa Flamengo Home 2026",
        category: "nacional",
        price: 299.99,
        stock: 12,
        rating: 4.9,
        reviewsCount: 128,
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
        description: "Manto sagrado rubro-negro com design moderno, tecnologia dry-max de absorção e escudo bordado em alta definição."
    },
    {
        id: 2,
        name: "Camisa Real Madrid Home 2026",
        category: "internacional",
        price: 349.99,
        stock: 5,
        rating: 5.0,
        reviewsCount: 215,
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80",
        description: "A clássica camisa branca dos merengues com detalhes dourados vibrantes. Conforto absoluto para torcer ou jogar."
    },
    {
        id: 3,
        name: "Camisa Seleção Brasileira Home",
        category: "selecao",
        price: 319.99,
        stock: 2,
        rating: 4.8,
        reviewsCount: 94,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
        description: "Amarelinha tradicional com texturas inspiradas na fauna brasileira e detalhes verdes vibrantes na gola."
    },
    {
        id: 4,
        name: "Camisa Barcelona Home 2026",
        category: "internacional",
        price: 349.99,
        stock: 15,
        rating: 4.7,
        reviewsCount: 82,
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
        description: "As tradicionais listras blaugranas em tons vibrantes e tecido ultra leve para alto desempenho."
    },
    {
        id: 5,
        name: "Camisa Palmeiras Home 2026",
        category: "nacional",
        price: 299.99,
        stock: 8,
        rating: 4.9,
        reviewsCount: 110,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
        description: "Verde esmeralda vibrante com estampa geométrica exclusiva da temporada atual."
    },
    {
        id: 6,
        name: "Camisa Seleção Argentina Home",
        category: "selecao",
        price: 319.99,
        stock: 4,
        rating: 4.9,
        reviewsCount: 150,
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80",
        description: "Alviceleste campeã com detalhes dourados comemorativos e excelente respirabilidade."
    }
];

let cart = [];
let selectedSize = 'G';

// ELEMENTOS DOM
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// RENDERIZAR PRODUTOS
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--gray); padding: 40px;">Nenhuma camisa encontrada.</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const isLowStock = product.stock <= 5;
        const stockText = isLowStock ? `Últimas ${product.stock} peças` : `Estoque: ${product.stock}`;
        const stockClass = isLowStock ? 'stock-badge low' : 'stock-badge';

        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="product-img-container">
                <span class="${stockClass}">${stockText}</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.toUpperCase()}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating} (${product.reviewsCount} avaliações)</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-details" onclick="openProductModal(${product.id})">Detalhes</button>
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
        if (filter === 'todos') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            renderProducts(filtered);
        }
    });
});

// BUSCA EM TEMPO REAL
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    renderProducts(filtered);
});

// MODAL DE DETALHES
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalBody.innerHTML = `
        <div class="modal-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <span class="product-category">${product.category.toUpperCase()}</span>
            <h3>${product.name}</h3>
            <div class="product-rating" style="margin-bottom: 10px;">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating} / 5.0 (${product.reviewsCount} avaliações)</span>
            </div>
            <div class="modal-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 15px;">${product.description}</p>
            
            <div class="size-selector">
                <label>Selecione o Tamanho:</label>
                <div class="sizes">
                    <div class="size-option" onclick="selectSize('P', this)">P</div>
                    <div class="size-option" onclick="selectSize('M', this)">M</div>
                    <div class="size-option selected" onclick="selectSize('G', this)">G</div>
                    <div class="size-option" onclick="selectSize('GG', this)">GG</div>
                </div>
            </div>

            <button class="btn-add-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
    `;
    productModal.style.display = 'flex';
}

function selectSize(size, element) {
    selectedSize = size;
    document.querySelectorAll('.size-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === productModal) productModal.style.display = 'none';
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// CARRINHO DE COMPRAS
openCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    renderCartItems();
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItemIndex = cart.findIndex(item => item.id === id && item.size === selectedSize);

    if (cartItemIndex > -1) {
        cart[cartItemIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            size: selectedSize,
            quantity: 1
        });
    }

    updateCartCount();
    productModal.style.display = 'none';
    alert('Camisa adicionada ao carrinho com sucesso!');
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--gray); margin-top: 20px;">Seu carrinho está vazio.</p>`;
        cartTotal.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartElement = document.createElement('div');
        cartElement.classList.add('cart-item');
        cartElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Tam: ${item.size} | Qtd: ${item.quantity}</p>
                <p style="font-weight: 700; color: var(--primary-dark);">R$ ${itemTotal.toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartElement);
    });

    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada com sucesso! Obrigado por comprar na FutStore.');
    cart = [];
    updateCartCount();
    cartModal.style.display = 'none';
});

// INICIALIZAR A PÁGINA
renderProducts(products);