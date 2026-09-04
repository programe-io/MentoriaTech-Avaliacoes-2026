// Controle da Gaveta do Carrinho
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

function toggleCart() {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Lógica de Adicionar Produtos ao Carrinho
let cart = [];

const addButtons = document.querySelectorAll('.btn-add');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));

        // Verifica se o item já está no carrinho
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartUI();
        
        // Abre o carrinho automaticamente ao adicionar
        if (!cartDrawer.classList.contains('active')) {
            toggleCart();
        }
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Sua sacola está vazia.</p>';
        cartCount.textContent = '0';
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item-row');
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity}x <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span></p>
            </div>
            <button class="remove-item" onclick="removeItem(${index})"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartCount.textContent = totalItems;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}