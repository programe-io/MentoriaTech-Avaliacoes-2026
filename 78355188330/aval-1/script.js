const products = [
    { id: 1, name: "Vestido Floral Verão", price: 189.90, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
    { id: 2, name: "Blazer Soft Pink", price: 250.00, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
    { id: 3, name: "Saia Midi Plissada", price: 120.00, img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" },
];

let cart = JSON.parse(localStorage.getItem('shop-cart')) || [];

const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');

// Renderizar Produtos
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
};

function updateCart() {
    localStorage.setItem('shop-cart', JSON.stringify(cart));
    cartCount.innerText = cart.length;
    renderCartModal();
}

function renderCartModal() {
    const cartItems = document.getElementById('cart-items');
    const totalValue = document.getElementById('cart-total-value');
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">❌</button>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalValue.innerText = total.toFixed(2);
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Lógica do Modal
const modal = document.getElementById("cart-modal");
document.getElementById("cart-btn").onclick = () => modal.style.display = "block";
document.querySelector(".close").onclick = () => modal.style.display = "none";

renderProducts();
updateCart();