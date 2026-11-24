
const products = [
    {
        name: "Fone Bluetooth",
        price: 89.90,
        category: "Eletrônicos",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        name: "Relógio Moderno",
        price: 129.90,
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        name: "Tênis Casual",
        price: 179.90,
        category: "Moda",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        name: "Óculos de Sol",
        price: 59.90,
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        name: "Câmera Digital",
        price: 499.90,
        category: "Eletrônicos",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        name: "Bolsa Feminina",
        price: 119.90,
        category: "Moda",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        name: "Smartphone",
        price: 899.90,
        category: "Eletrônicos",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        name: "Mochila",
        price: 99.90,
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    }
];

let cart = [];
let currentCategory = "Todos";

function money(value) {
    return value.toFixed(2).replace(".", ",");
}

function renderProducts(list = products) {
    const area = document.getElementById("products");
    area.innerHTML = "";

    if (list.length === 0) {
        area.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    list.forEach((product) => {
        const index = products.indexOf(product);

        area.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <div class="price">R$ ${money(product.price)}</div>
                    <button onclick="addToCart(${index})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

function addToCart(index) {
    cart.push(products[index]);
    updateCart();
}

function updateCart() {
    document.getElementById("count").innerText = cart.length;

    const area = document.getElementById("cart-items");
    area.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        area.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - R$ ${money(item.price)}</span>
                <button class="remove" onclick="removeItem(${index})">
                    Remover
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText = money(total);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cartArea = document.getElementById("cart");

    cartArea.style.display =
        cartArea.style.display === "block" ? "none" : "block";

    cartArea.scrollIntoView({behavior: "smooth"});
}

function filterProducts(category) {
    currentCategory = category;

    const filtered = category === "Todos"
        ? products
        : products.filter(p => p.category === category);

    renderProducts(filtered);
}

function searchProducts() {
    const value = document.getElementById("search")
        .value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value) &&
        (currentCategory === "Todos" || p.category === currentCategory)
    );

    renderProducts(filtered);
}

function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá! Gostaria de fazer este pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name}: R$ ${money(item.price)}\n`;
        total += item.price;
    });

    message += `\nTotal: R$ ${money(total)}`;

    // Coloque aqui o número de WhatsApp da loja.
    const whatsapp = "5586999999999";

    window.open(
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

document.getElementById("search").addEventListener("input", searchProducts);

renderProducts();
updateCart();
