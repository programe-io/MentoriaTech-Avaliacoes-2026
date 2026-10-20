// ==========================================
// AURA VERDE - LÓGICA DO CARRINHO E CHECKOUT
// ==========================================

let cart = [];

// Abre o modal do carrinho
function openModal() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCart();
}

// Fecha o modal do carrinho
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Adiciona produtos ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartCount();
    alert(`${name} adicionado ao carrinho com sucesso! 🌱`);
}

// Atualiza o contador de itens no cabeçalho
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;
}

// Renderiza a lista de itens dentro do modal do carrinho
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('cart-total-display');
    const checkoutSection = document.getElementById('checkout-section');

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 1rem 0;">Seu carrinho está vazio.</p>';
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
                    <button onclick="removeItem(${index})" style="background: none; border: none; color: #cc0000; cursor: pointer; margin-left: 10px; font-weight: bold;">Remover</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalDisplay.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    totalDisplay.style.display = 'block';
    checkoutSection.style.display = 'block';
}

// Remove um item específico do carrinho
function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Simula a finalização do pedido e validação do formulário
function finalizeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const cep = document.getElementById('cep').value;

    if (!name || !address || !cep) {
        alert('Por favor, preencha todos os campos de entrega para finalizar a compra.');
        return;
    }

    alert(`Parabéns, ${name}! Sua compra na Aura Verde foi realizada com sucesso. Os detalhes do pedido e o código PIX foram gerados.`);
    
    // Limpa o carrinho e reseta a interface
    cart = [];
    updateCartCount();
    closeModal();
    
    // Limpa os campos do formulário
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('cep').value = '';
}