/* ==========================================
   DATABASE & INITIAL STATE
   ========================================== */
const products = [
    {
        id: 1,
        title: "Vestido Midi Seda Rose",
        category: "vestidos",
        price: 389.90,
        oldPrice: 459.90,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        stock: 5,
        rating: 5,
        reviewsCount: 42,
        tag: "Novo",
        description: "Vestido midi em seda acetinada de caimento fluido com decote degagê. Ideal para festas e momentos especiais."
    },
    {
        id: 2,
        title: "Conjunto Alfaiataria Coral",
        category: "conjuntos",
        price: 459.00,
        oldPrice: 520.00,
        image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop",
        stock: 2,
        rating: 4.8,
        reviewsCount: 18,
        tag: "Destaque",
        description: "Conjunto composto por blazer estruturado e calça pantalona de cintura alta em alfaiataria premium."
    },
    {
        id: 3,
        title: "Blazer Oversized Pink Velvet",
        category: "blazers",
        price: 329.90,
        oldPrice: 399.90,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
        stock: 12,
        rating: 4.9,
        reviewsCount: 35,
        tag: "Mais Vendido",
        description: "Blazer moderno oversized com modelagem impecável, botões encapados e forro de cetim."
    },
    {
        id: 4,
        title: "Vestido Longo Plissado Emerald",
        category: "vestidos",
        price: 499.00,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
        stock: 0,
        rating: 5,
        reviewsCount: 29,
        tag: "Esgotado",
        description: "Vestido longo com saia plissada e cinto delicado. Um ícone de elegância e glamour."
    },
    {
        id: 5,
        title: "Camisa de Seda Pura Off-White",
        category: "blusas",
        price: 249.90,
        oldPrice: 289.90,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
        stock: 8,
        rating: 4.7,
        reviewsCount: 14,
        tag: "Clássico",
        description: "Camisa feminina 100% seda com punhos alongados. Versatilidade para o trabalho ou eventos casuais chiques."
    },
    {
        id: 6,
        title: "Cropped Estruturado Magenta",
        category: "blusas",
        price: 189.90,
        oldPrice: 219.90,
        image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop",
        stock: 4,
        rating: 4.9,
        reviewsCount: 22,
        tag: "Tendência",
        description: "Top cropped com decote coração e barbatanas internas que valorizam a silhueta com total conforto."
    }
];

const initialReviews = [
    {
        name: "Camila Pitanga",
        city: "Rio de Janeiro - RJ",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        stars: 5,
        comment: "Comprei o Vestido Seda Rose para o casamento da minha irmã e recebi inúmeros elogios! O tecido é um sonho e chegou super rápido."
    },
    {
        name: "Mariana Rios",
        city: "São Paulo - SP",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
        stars: 5,
        comment: "A qualidade da alfaiataria da Elegante supera marcas internacionais! O atendimento pelo WhatsApp tirou todas as minhas dúvidas de tamanho."
    },
    {
        name: "Beatriz Oliveira",
        city: "Curitiba - PR",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        stars: 5,
        comment: "Minha loja favorita de longe. O embalamento tem um cheirinho delicioso e o caimento das roupas é simplesmente perfeito!"
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('elegante_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('elegante_favs')) || [];
let currentFilter = 'all';
let appliedDiscount = 0;
let userRatingSelect = 5;

/* ==========================================
   DOM ELEMENTS
   ========================================== */
const productsGrid = document.getElementById('products-grid');
const reviewsGrid = document.getElementById('reviews-grid');
const cartBtn = document.getElementById('cart-btn');
const favBtn = document.getElementById('fav-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const favCount = document.getElementById('fav-count');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartDiscount = document.getElementById('cart-discount');
const discountRow = document.getElementById('discount-row');
const discountLabel = document.getElementById('discount-label');
const couponInput = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const closeProductModal = document.getElementById('close-product-modal');
const productModalContent = document.getElementById('product-modal-content');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const toastContainer = document.getElementById('toast-container');

/* ==========================================
   FUNCTIONS & LOGIC
   ========================================== */

// Format Currency
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-bell'}"></i>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// Render Products Grid
function renderProducts() {
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = filtered.map(product => {
        const isFav = favorites.includes(product.id);
        
        // Stock Badge Logic
        let stockBadgeHtml = '';
        if (product.stock === 0) {
            stockBadgeHtml = `<span class="stock-badge stock-out">Esgotado</span>`;
        } else if (product.stock <= 3) {
            stockBadgeHtml = `<span class="stock-badge stock-low">Últimas ${product.stock} unidades</span>`;
        } else {
            stockBadgeHtml = `<span class="stock-badge stock-high">Em Estoque (${product.stock})</span>`;
        }

        return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    ${product.tag ? `<span class="product-badge-tag">${product.tag}</span>` : ''}
                    ${stockBadgeHtml}
                    <button class="fav-btn-card ${isFav ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating">
                        ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
                        <span>(${product.reviewsCount})</span>
                    </div>
                    <div class="product-price-row">
                        <span class="current-price">${formatCurrency(product.price)}</span>
                        ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="add-cart-btn" 
                                ${product.stock === 0 ? 'disabled' : ''} 
                                onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-bag-shopping"></i> 
                            ${product.stock === 0 ? 'Esgotado' : 'Adicionar'}
                        </button>
                        <button class="quick-view-btn" onclick="openProductModal(${product.id})" title="Ver Detalhes">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Reviews Grid
function renderReviews() {
    reviewsGrid.innerHTML = initialReviews.map(rev => `
        <div class="review-card">
            <div class="review-header">
                <img src="${rev.avatar}" alt="${rev.name}" class="avatar">
                <div class="user-info">
                    <h5>${rev.name}</h5>
                    <span>${rev.city}</span>
                </div>
            </div>
            <div class="review-stars">
                ${'<i class="fa-solid fa-star"></i>'.repeat(rev.stars)}
            </div>
            <p class="review-comment">"${rev.comment}"</p>
            <div class="verified-badge">
                <i class="fa-solid fa-circle-check"></i> Compra Verificada
            </div>
        </div>
    `).join('');
}

// Toggle Favorites
function toggleFavorite(productId) {
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        showToast('Removido dos favoritos.');
    } else {
        favorites.push(productId);
        showToast('Adicionado aos favoritos!', 'success');
    }
    localStorage.setItem('elegante_favs', JSON.stringify(favorites));
    updateBadges();
    renderProducts();
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        if (cart[existingIndex].qty < product.stock) {
            cart[existingIndex].qty += 1;
            showToast(`Mais uma unidade de "${product.title}" adicionada!`, 'success');
        } else {
            showToast(`Limite do estoque atingido para este item (${product.stock} un).`, 'info');
            return;
        }
    } else {
        cart.push({ id: product.id, qty: 1 });
        showToast(`"${product.title}" adicionado ao carrinho!`, 'success');
    }

    saveCart();
    openCartDrawer();
}

// Change Quantity in Cart
function updateCartQty(productId, change) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(i => i.id === productId);

    if (!item || !product) return;

    const newQty = item.qty + change;

    if (newQty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    } else if (newQty <= product.stock) {
        item.qty = newQty;
    } else {
        showToast(`Estoque máximo disponível: ${product.stock} peças.`);
        return;
    }

    saveCart();
}

// Save Cart to LocalStorage and UI update
function saveCart() {
    localStorage.setItem('elegante_cart', JSON.stringify(cart));
    updateBadges();
    renderCart();
}

// Render Cart Drawer Content
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>Seu carrinho está vazio.</p>
                <a href="#colecao" onclick="closeCartModal()" class="btn btn-outline" style="margin-top:15px; font-size:0.85rem;">Explorar Peças</a>
            </div>
        `;
        cartSubtotal.textContent = formatCurrency(0);
        cartTotal.textContent = formatCurrency(0);
        discountRow.style.display = 'none';
        return;
    }

    let subtotal = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';

        const itemTotal = product.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${product.title}</h4>
                    <div class="cart-item-price">${formatCurrency(product.price)}</div>
                    <div class="quantity-controls">
                        <button onclick="updateCartQty(${product.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="updateCartQty(${product.id}, -${item.qty})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    const discountValue = subtotal * appliedDiscount;
    const total = subtotal - discountValue;

    cartSubtotal.textContent = formatCurrency(subtotal);
    cartTotal.textContent = formatCurrency(total);

    if (appliedDiscount > 0) {
        discountRow.style.display = 'flex';
        discountLabel.textContent = `${appliedDiscount * 100}%`;
        cartDiscount.textContent = `-${formatCurrency(discountValue)}`;
    } else {
        discountRow.style.display = 'none';
    }
}

// Update Badges Counters
function updateBadges() {
    const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
    cartCount.textContent = totalQty;
    cartDrawerCount.textContent = totalQty;
    favCount.textContent = favorites.length;
}

// Open Product Quick View Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productModalContent.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="modal-product-img">
        <div class="modal-product-details">
            <span class="product-category">${product.category}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 10px;">${product.title}</h2>
            <div class="product-rating" style="margin-bottom: 15px;">
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
                <span>(${product.reviewsCount} avaliações)</span>
            </div>
            <div class="product-price-row">
                <span class="current-price" style="font-size: 1.6rem;">${formatCurrency(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">${product.description}</p>
            <p style="font-size: 0.85rem; font-weight: 600; margin-bottom: 20px;">
                Status: <span style="color: ${product.stock > 0 ? '#2e7d32' : '#c62828'}">${product.stock > 0 ? `Disponível em Estoque (${product.stock} peças)` : 'Esgotado'}</span>
            </p>
            <button class="btn btn-primary" ${product.stock === 0 ? 'disabled' : ''} onclick="addToCart(${product.id}); closeProductModalFunc();">
                <i class="fa-solid fa-bag-shopping"></i> Comprar Agora
            </button>
        </div>
    `;

    productModal.classList.add('active');
}

function closeProductModalFunc() {
    productModal.classList.remove('active');
}

function openCartDrawer() {
    cartModal.classList.add('active');
}

function closeCartModal() {
    cartModal.classList.remove('active');
}

/* ==========================================
   EVENT LISTENERS
   ========================================== */

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Category Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderProducts();
    });
});

// Cart & Fav Modal Triggers
cartBtn.addEventListener('click', openCartDrawer);
closeCart.addEventListener('click', closeCartModal);
closeProductModal.addEventListener('click', closeProductModalFunc);

// Close Modals on Overlay Click
window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCartModal();
    if (e.target === productModal) closeProductModalFunc();
});

// Coupon Handler
applyCouponBtn.addEventListener('click', () => {
    const coupon = couponInput.value.trim().toUpperCase();
    if (coupon === 'ELEGANTE10') {
        appliedDiscount = 0.10;
        showToast('Cupom ELEGANTE10 (10% OFF) aplicado com sucesso!', 'success');
    } else if (coupon === 'ELEGANTE15') {
        appliedDiscount = 0.15;
        showToast('Cupom VIP (15% OFF) aplicado com sucesso!', 'success');
    } else {
        showToast('Cupom inválido ou expirado.', 'info');
        appliedDiscount = 0;
    }
    renderCart();
});

// WhatsApp Checkout Simulation
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    let itemsText = cart.map(item => {
        const prod = products.find(p => p.id === item.id);
        return `• ${item.qty}x ${prod.title} (${formatCurrency(prod.price * item.qty)})`;
    }).join('%0A');

    const totalText = cartTotal.textContent;
    const whatsappMsg = `Olá Elegante! Gostaria de finalizar meu pedido:%0A%0A${itemsText}%0A%0ATotal: ${totalText}`;
    
    window.open(`https://wa.me/5511998765432?text=${whatsappMsg}`, '_blank');
});

// Interactive Star Selection for Reviews Form
const starSelect = document.getElementById('star-select');
if (starSelect) {
    const stars = starSelect.querySelectorAll('i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            userRatingSelect = parseInt(star.getAttribute('data-rating'));
            stars.forEach((s, idx) => {
                if (idx < userRatingSelect) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

// Review Form Submit Handler
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('rev-name').value;
        const city = document.getElementById('rev-city').value;
        const comment = document.getElementById('rev-comment').value;

        initialReviews.unshift({
            name,
            city,
            avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
            stars: userRatingSelect,
            comment
        });

        renderReviews();
        reviewForm.reset();
        showToast('Sua avaliação foi publicada com sucesso! Obrigado.', 'success');
    });
}

// FAQ Accordion Handler
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const parent = q.parentElement;
        const isActive = parent.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
        contactForm.reset();
    });
}

// Newsletter Form Handler
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Inscrição realizada! Seu cupom ELEGANTE15 foi enviado para o e-mail.', 'success');
        newsletterForm.reset();
    });
}

/* ==========================================
   INITIALIZATION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderReviews();
    updateBadges();
    renderCart();
});