// LISTA DE PRODUTOS PRINCIPAIS
const products = [
    {
        id: 1,
        name: "Corrente de Aço Inox Grumet 10mm",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Pulseira Masculina em Couro e Prata",
        price: 99.90,
        image: "https://images.unsplash.com/photo-1611591475751-2485542bbf06?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Anel Solitário de Aço Abridor Caveira",
        price: 119.90,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Cordão Masculino Baiano em Aço",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
    }
];

// LISTA DE PRODUTOS EM PROMOÇÃO
const promoProducts = [
    {
        id: 5,
        name: "Kit Corrente + Pulseira Aço Escovado",
        price: 219.90,
        oldPrice: 299.90,
        image: "https://images.unsplash.com/photo-1620656798719-e58de99f1f4d?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Pulseira de Aço Retangular Minimalista",
        price: 79.90,
        oldPrice: 129.90,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"
    }
];

// CARRINHO DE COMPRAS (ESTADO)
let cart = [];

// ELEMENTOS DOM
const productListEl = document.getElementById('product-list');
const promoListEl = document.getElementById('promo-list');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCounter = document.getElementById('cart-counter');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// RENDERIZAR CATÁLOGO DE PRODUTOS
function renderProducts() {
    productListEl.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <button class="btn-primary" onclick="addToCart(${product.id}, 'main')">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');
}

// RENDERIZAR PROMOÇÕES
function renderPromos() {
    promoListEl.innerHTML = promoProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        R$ ${product.price.toFixed(2).replace('.', ',')} 
                        <span style="font-size: 0.85rem; color: #a0a0a5; text-decoration: line-through; margin-left: 8px;">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="addToCart(${product.id}, 'promo')">Aproveitar Oferta</button>
            </div>
        </div>
    `).join('');
}

// ADICIONAR AO CARRINHO
function addToCart(id, type) {
    let allProducts = [...products, ...promoProducts];
    let product = allProducts.find(p => p.id === id);

    let existingItem = cart.find(item => item.id === id);
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    
    // Abre automaticamente o carrinho ao adicionar
    cartModal.classList.add('active');
}

// REMOVER ITEM DO CARRINHO
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// ATUALIZAR INTERFACE DO CARRINHO
function updateCart() {
    cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
        cartTotalPrice.textContent = "R$ 0,00";
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-card">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>R$ ${item.price.toFixed(2).replace('.', ',')} (x${item.quantity})</span>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// EVENTOS DE ABERTURA E FECHAMENTO DO CARRINHO
openCartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if(e.target === cartModal) cartModal.classList.remove('active');
});

// FINALIZAR PEDIDO VIA WHATSAPP
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá! Gostaria de fazer o pedido dos seguintes itens na *ENB Estilos*:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\n*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*`;

    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
});

// FORMULÁRIO DE CONTATO
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso para a ENB Estilos. Retornaremos em breve.`);
    contactForm.reset();
});

// INICIALIZAR APLICAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPromos();
});