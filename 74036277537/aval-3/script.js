let cart = [];

function openModal() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCart();
}

function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartCount();
    alert(`"${name}" foi adicionado ao carrinho!`);
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('cart-total-display');
    const checkoutSection = document.getElementById('checkout-section');

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #777; text-align: center; padding: 1rem 0;">Seu carrinho está vazio.</p>';
        totalDisplay.style.display = 'none';
        checkoutSection.style.display = 'none';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Qtd: ${item.quantity} x R$ ${item.price.toFixed(2).replace('.', ',')}</small>
                </div>
                <div>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    <button onclick="removeItem(${index})" style="background: none; border: none; color: #b22222; cursor: pointer; margin-left: 10px; font-weight: 600;">Remover</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalDisplay.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    totalDisplay.style.display = 'block';
    checkoutSection.style.display = 'block';
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function finalizeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cep = document.getElementById('cep').value;

    if (!name || !address || !cep) {
        alert('Por favor, preencha todos os campos de entrega.');
        return;
    }

    alert(`Obrigado pela compra, ${name}! Seu pedido na Stride foi gerado com sucesso.`);
    cart = [];
    updateCartCount();
    closeModal();
    
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('cep').value = '';
}