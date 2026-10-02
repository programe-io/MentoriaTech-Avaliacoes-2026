// Base de Dados de Produtos com variações de cores vibrantes e controle de estoque
const products = [
    {
        id: 1,
        name: "Tênis Neon Shock Pink",
        category: "neon",
        price: 349.90,
        rating: 4.9,
        reviewsCount: 128,
        stock: 5, // Estoque baixo
        colors: [
            { name: "Pink Shock", hex: "#ff007f", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
            { name: "Acid Lime", hex: "#39ff14", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "Tênis Urban Cyber Violet",
        category: "casual",
        price: 299.90,
        rating: 4.8,
        reviewsCount: 95,
        stock: 14,
        colors: [
            { name: "Cyber Violet", hex: "#b026ff", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
            { name: "Electric Cyan", hex: "#00f0ff", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "Tênis Runner Solar Flare",
        category: "esporte",
        price: 389.90,
        rating: 5.0,
        reviewsCount: 210,
        stock: 3, // Estoque baixo
        colors: [
            { name: "Solar Orange", hex: "#ff5e00", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop" },
            { name: "Neon Pink", hex: "#ff007f", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 4,
        name: "Tênis Street Acid Green",
        category: "neon",
        price: 319.90,
        rating: 4.7,
        reviewsCount: 76,
        stock: 22,
        colors: [
            { name: "Acid Lime", hex: "#39ff14", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop" },
            { name: "Cyber Violet", hex: "#b026ff", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 5,
        name: "Tênis Daily Glow Cyan",
        category: "casual",
        price: 279.90,
        rating: 4.6,
        reviewsCount: 54,
        stock: 8,
        colors: [
            { name: "Electric Cyan", hex: "#00f0ff", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop" },
            { name: "Solar Orange", hex: "#ff5e00", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 6,
        name: "Tênis Pro Speed Neon",
        category: "esporte",
        price: 419.90,
        rating: 4.9,
        reviewsCount: 142,
        stock: 4, // Estoque baixo
        colors: [
            { name: "Pink Shock", hex: "#ff007f", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
            { name: "Acid Lime", hex: "#39ff14", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop" }
        ]
    }
];

let cart = [];

// Estado selecionado de cores ativas por produto
const activeColors = {};
products.forEach(p => {
    activeColors[p.id] = 0; // Inicia com a primeira cor
});

const productsGrid = document.getElementById("productsGrid");
const cartModal = document.getElementById("cartModal");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

// Renderizar Produtos
function renderProducts(productsToRender) {
    productsGrid.innerHTML = "";

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum tênis encontrado.</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const selectedColorIndex = activeColors[product.id];
        const currentColor = product.colors[selectedColorIndex];

        // Mensagem de Estoque
        let stockClass = "";
        let stockText = `${product.stock} em estoque`;
        if (product.stock <= 5) {
            stockClass = "low";
            stockText = `⚠️ Últimas ${product.stock} unidades!`;
        }

        // Criar bolinhas de cores
        let colorDotsHTML = "";
        product.colors.forEach((col, index) => {
            const activeClass = index === selectedColorIndex ? "active" : "";
            colorDotsHTML += `<div class="color-dot ${activeClass}" style="background-color: ${col.hex};" onclick="changeColor(${product.id}, ${index})" title="${col.name}"></div>`;
        });

        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <div class="product-image">
                <span class="stock-badge ${stockClass}">${stockText}</span>
                <img id="img-${product.id}" src="${currentColor.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="rating-box">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating} (${product.reviewsCount} avaliações)</span>
                </div>
                <div class="color-picker">
                    <span>Cor:</span>
                    ${colorDotsHTML}
                </div>
                <div class="product-footer">
                    <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Mudar Cor do Tênis Interativamente
window.changeColor = function(productId, colorIndex) {
    activeColors[productId] = colorIndex;
    const product = products.find(p => p.id === productId);
    const imgElement = document.getElementById(`img-${productId}`);
    if (imgElement && product) {
        imgElement.src = product.colors[colorIndex].image;
        // Atualiza classes das bolinhas de cor
        renderProducts(getFilteredProducts());
    }
};

// Filtragem por Categoria
let currentCategory = "all";
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-filter");
        renderProducts(getFilteredProducts());
    });
});

// Busca por Nome
searchInput.addEventListener("input", () => {
    renderProducts(getFilteredProducts());
});

function getFilteredProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    return products.filter(product => {
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
}

// Adicionar ao Carrinho
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const selectedColor = product.colors[activeColors[productId]];

    const cartItemIndex = cart.findIndex(item => item.id === productId && item.color === selectedColor.name);

    if (cartItemIndex > -1) {
        cart[cartItemIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor.name,
            image: selectedColor.image,
            quantity: 1
        });
    }

    updateCartUI();
    openCartModal();
};

// Atualizar Carrinho UI
function updateCartUI() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
        cartTotal.textContent = "R$ 0,00";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px;">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <span>Cor: ${item.color} | Qtd: ${item.quantity}</span>
                </div>
            </div>
            <div>
                <span style="font-weight: 600; font-size: 14px; margin-right: 10px;">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                <button onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover Item do Carrinho
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// Abrir/Fechar Carrinho
function openCartModal() {
    cartModal.classList.add("open");
}

openCartBtn.addEventListener("click", openCartModal);
closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("open");
});

// Finalizar Compra
window.checkout = function() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("🎉 Pedido realizado com sucesso! Obrigado por comprar na VibeStride. Suas cores vibrantes estão a caminho!");
    cart = [];
    updateCartUI();
    cartModal.classList.remove("open");
};

// Inicializar aplicação
renderProducts(products);