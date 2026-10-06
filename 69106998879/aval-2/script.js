const products = [
    { id: 1, name: "Kit Óleo Sintético 5W30 + Filtros", price: 249.90, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Amortecedor Esportivo Dianteiro", price: 580.00, image: "https://images.unsplash.com/photo-1635771295955-a50d279a0b94?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Multimídia Android Auto 9 Polegadas", price: 1199.00, image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Par de Faróis de Milha LED Ultra", price: 189.50, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80" }
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const openCart = document.getElementById('openCart');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');

function renderProducts() {
    productsGrid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
                <button class="buy-btn" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');
}

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    alert(`${product.name} adicionado ao carrinho!`);
};

function updateCart() {
    cartCount.textContent = cart.length;
    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p>O carrinho está vazio.</p>`;
        cartTotalPrice.textContent = "R$ 0,00";
        return;
    }

    let total = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');
    
    cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCart();
};

openCart.addEventListener('click', () => cartModal.style.display = 'flex');
closeCart.addEventListener('click', () => cartModal.style.display = 'none');

window.finalizarCompra = function() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra simulada com sucesso! Obrigado por escolher a SpeedParts.");
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', renderProducts);