
const products = [
    {
        id: 1,
        name: "Fone Bluetooth",
        category: "Eletrônicos",
        price: 129.90,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Relógio Moderno",
        category: "Acessórios",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Tênis Casual",
        category: "Moda",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Óculos de Sol",
        category: "Acessórios",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 5,
        name: "Smartphone",
        category: "Eletrônicos",
        price: 1299.90,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 6,
        name: "Jaqueta Fashion",
        category: "Moda",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
        id: 7,
        name: "Bolsa Feminina",
        category: "Acessórios",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 8,
        name: "Câmera Digital",
        category: "Eletrônicos",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    }
];

let cart = [];
let currentCategory = "Todos";

const grid = document.getElementById("products-grid");
const search = document.getElementById("search");

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostrar produtos
function renderProducts() {
    const term = search.value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesCategory =
            currentCategory === "Todos" ||
            product.category === currentCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(term);

        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    filtered.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="price">
                        ${formatPrice(product.price)}
                    </div>

                    <button class="add-button"
                        onclick="addToCart(${product.id})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

// Filtrar categorias
function filterProducts(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderProducts();
}

// Pesquisar
search.addEventListener("input", renderProducts);

// Adicionar ao carrinho
function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " adicionado ao carrinho!");
}

// Remover produto
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    const cartItems = document.getElementById("cart-items");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = totalItems;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)} x ${item.quantity}</p>
                </div>

                <button class="remove-button"
                    onclick="removeFromCart(${item.id})">
                    Remover
                </button>
            </div>
        `;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        formatPrice(total);
}

// Abrir e fechar carrinho
function toggleCart() {
    document.getElementById("cart").classList.toggle("open");

    document.getElementById("cart-overlay")
        .classList.toggle("open");
}

// Finalizar pedido no WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const telefone = "5511999999999";

    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

    cart.forEach(item => {
        mensagem += `${item.name} - Quantidade: ${item.quantity}\n`;
        mensagem += `Preço: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    mensagem += `Total do pedido: ${formatPrice(total)}`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}

// Inicializar
renderProducts();
updateCart();
