// LISTA DE PRODUTOS NORMAIS
const products = [
    { id: 1, name: "Bola de Futebol Pro Strike", price: 199.90, image: "[https://images.unsplash.com/photo-1614632537456-c48395562777?auto=format&fit=crop&w=500&q=80](https://images.unsplash.com/photo-1614632537456-c48395562777?auto=format&fit=crop&w=500&q=80)" },
    { id: 2, name: "Bola de Basquete Neon Master", price: 159.90, image: "[https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80](https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80)" },
    { id: 3, name: "Bola de Vôlei Beach Gold", price: 129.90, image: "[https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=500&q=80](https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=500&q=80)" }
];

// LISTA DE PRODUTOS EM PROMOÇÃO
const promoProducts = [
    { id: 4, name: "Bola de Futebol Society Flash", price: 119.90, image: "[https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80)" },
    { id: 5, name: "Bola de Basquete Street Pro", price: 99.90, image: "[https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=500&q=80](https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=500&q=80)" }
];

let cart = [];

// RENDERIZAR PRODUTOS NA TELA
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    const promoGrid = document.getElementById('promo-grid');

    // Renderizar Produtos Normais
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <button class="btn-buy" onclick="addToCart(${product.id}, 'normal')">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');

    // Renderizar Promoções
    promoGrid.innerHTML = promoProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <button class="btn-buy" onclick="addToCart(${product.id}, 'promo')">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');
}

// ADICIONAR AO CARRINHO
function addToCart(id, type) {
    let allProducts = [...products, ...promoProducts];
    let product = allProducts.find(p => p.id === id);

    cart.push(product);
    updateCart();
}

// REMOVER DO CARRINHO
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ATUALIZAR INTERFACE DO CARRINHO
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
        cartTotalPrice.innerText = "R$ 0,00";
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');

    cartTotalPrice.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// FINALIZAR COMPRA
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada com sucesso! Obrigado por escolher a SphereX.");
    cart = [];
    updateCart();
    document.getElementById('cart-modal').classList.remove('active');
}

// CONTROLE DO MODAL DO CARRINHO
const cartModal = document.getElementById('cart-modal');
document.getElementById('open-cart').addEventListener('click', () => {
    cartModal.classList.add('active');
});
document.getElementById('close-cart').addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Inicializar a aplicação carregando os produtos
window.onload = renderProducts;