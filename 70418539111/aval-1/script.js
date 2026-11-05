
const products = [
    {
        id: 1,
        name: "Camiseta Premium Preta",
        category: "Camisetas",
        price: 79.90,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 2,
        name: "Camiseta Oversized",
        category: "Camisetas",
        price: 99.90,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600"
    },
    {
        id: 3,
        name: "Camisa Social Masculina",
        category: "Camisas",
        price: 139.90,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600"
    },
    {
        id: 4,
        name: "Camisa Casual",
        category: "Camisas",
        price: 119.90,
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=600"
    },
    {
        id: 5,
        name: "Calça Jeans Masculina",
        category: "Calças",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
    },
    {
        id: 6,
        name: "Calça Casual",
        category: "Calças",
        price: 129.90,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600"
    },
    {
        id: 7,
        name: "Tênis Casual",
        category: "Calçados",
        price: 199.90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 8,
        name: "Tênis Esportivo",
        category: "Calçados",
        price: 229.90,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"
    },
    {
        id: 9,
        name: "Relógio Masculino",
        category: "Acessórios",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600"
    },
    {
        id: 10,
        name: "Óculos Masculino",
        category: "Acessórios",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 11,
        name: "Jaqueta Masculina",
        category: "Camisas",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },
    {
        id: 12,
        name: "Mochila Urbana",
        category: "Acessórios",
        price: 149.90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    }
];

let cart = [];

const whatsappNumber = "5586999999999";

// Formatar preços
function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostrar produtos
function displayProducts(category = "Todos") {
    const container = document.getElementById("products");

    const filtered = category === "Todos"
        ? products
        : products.filter(product => product.category === category);

    container.innerHTML = filtered.map(product => `
        <article class="product-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">
                <p class="category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    ADICIONAR AO CARRINHO
                </button>
            </div>
        </article>
    `).join("");
}

// Filtrar produtos
function filterProducts(category, button) {
    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    displayProducts(category);
}

// Adicionar produto
function addToCart(id) {
    const product = products.find(p => p.id === id);

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

// Atualizar carrinho
function updateCart() {
    const container = document.getElementById("cart-items");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = totalItems;

    if (cart.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price * item.quantity)}</p>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>

                    <button
                        class="remove"
                        onclick="removeItem(${item.id})"
                    >✕</button>
                </div>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cart-total").textContent =
        formatPrice(total);
}

// Alterar quantidade
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

// Remover produto
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);

    updateCart();
}

// Abrir e fechar carrinho
function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");

    document.getElementById("overlay").classList.toggle("open");
}

// Finalizar pedido
function checkout() {
    if (cart.length === 0) {
        alert("Adicione produtos ao carrinho primeiro!");
        return;
    }

    let message = "Olá! Gostaria de realizar um pedido na FASHION MEN.\n\n";

    cart.forEach(item => {
        message += `Produto: ${item.name}\n`;
        message += `Quantidade: ${item.quantity}\n`;
        message += `Preço: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `TOTAL DO PEDIDO: ${formatPrice(total)}\n\n`;
    message += "Gostaria de receber as informações para pagamento via Pix.\n";
    message += "Aguardo confirmação do pedido!";

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// Contato WhatsApp
function contactWhatsApp() {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
}

// Inicialização
displayProducts();
updateCart();
