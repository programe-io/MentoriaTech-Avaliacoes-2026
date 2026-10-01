// BANCO DE DADOS DE PRODUTOS E ESTOQUE
let productsData = [
    { id: "1", name: "Lily Absolu", category: "Floral", volume: "75ml", price: 249.90, stock: 12, statusClass: "in" },
    { id: "2", name: "Malbec Noir", category: "Amadeirado", volume: "100ml", price: 199.90, stock: 8, statusClass: "warning" },
    { id: "3", name: "Floratta Red", category: "Frutal", volume: "75ml", price: 149.90, stock: 20, statusClass: "in" },
    { id: "4", name: "Elysée Blanc", category: "Chypre", volume: "50ml", price: 279.90, stock: 5, statusClass: "critical" }
];

let cart = [];

// ELEMENTOS DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const stockSearch = document.getElementById('stock-search');
const stockTableBody = document.getElementById('stock-table-body');
const reviewForm = document.getElementById('review-form');
const reviewsGrid = document.getElementById('reviews-grid');
const contactForm = document.getElementById('contact-form');

// ABRIR / FECHAR CARRINHO
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// ADICIONAR AO CARRINHO (BOTÕES DO CATÁLOGO E TABELA)
document.querySelectorAll('.add-to-cart, .quick-add').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        let id, name, price;

        if (card) {
            id = card.getAttribute('data-id');
            name = card.getAttribute('data-name');
            price = parseFloat(card.getAttribute('data-price'));
        } else {
            id = e.target.getAttribute('data-id');
            const product = productsData.find(p => p.id === id);
            name = product.name;
            price = product.price;
        }

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
    cartModal.classList.add('active');
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Sua sacola está vazia.</p>';
        cartCount.textContent = '0';
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h5>${item.name} (${item.quantity}x)</h5>
                <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCount.textContent = count;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// FINALIZAR PEDIDO VIA WHATSAPP
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sua sacola está vazia!');
        return;
    }

    let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
        total += item.price * item.quantity;
    });

    message += `\n*Total do Pedido: R$ ${total.toFixed(2)}*\n\nAguardo instruções de pagamento e frete!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511998887766?text=${encodedMessage}`, '_blank');
});

// FILTRAR ESTOQUE EM TEMPO REAL
stockSearch.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    renderStockTable(filtered);
});

function renderStockTable(data) {
    stockTableBody.innerHTML = '';
    if (data.length === 0) {
        stockTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">Nenhum perfume encontrado.</td></tr>`;
        return;
    }

    data.forEach(p => {
        let statusText = `Disponível (${p.stock} un.)`;
        if (p.stock <= 5) statusText = `Crítico (${p.stock} un.)`;
        else if (p.stock <= 10) statusText = `Baixo Estoque (${p.stock} un.)`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${p.volume}</td>
            <td><span class="badge-stock ${p.statusClass}">${statusText}</span></td>
            <td><button class="btn-sm quick-add" data-id="${p.id}" onclick="addToCart('${p.id}', '${p.name}', ${p.price})">Comprar</button></td>
        `;
        stockTableBody.appendChild(tr);
    });
}

// ADICIONAR NOVA AVALIAÇÃO DINAMICAMENTE
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewer-name').value;
    const product = document.getElementById('reviewed-product').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    const text = document.getElementById('review-text').value;

    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const starsHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <div class="review-header">
            <div class="user-avatar"><span>${initials}</span></div>
            <div>
                <h4>${name}</h4>
                <div class="stars">${starsHTML}</div>
            </div>
        </div>
        <p>"${text}"</p>
        <span class="review-product">Comprou: ${product}</span>
    `;

    reviewsGrid.prepend(reviewCard);
    reviewForm.reset();
    alert('Obrigado! Sua avaliação foi publicada com sucesso.');
});

// FORMULÁRIO DE CONTATO
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Nossa central entrará em contato em breve.');
    contactForm.reset();
});