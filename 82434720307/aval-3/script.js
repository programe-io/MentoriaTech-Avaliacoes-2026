
const products = [
    {
        name: "Cimento",
        category: "Construção",
        description: "Material para diversos tipos de obras.",
        price: 35.00,
        icon: "🧱"
    },
    {
        name: "Tijolo",
        category: "Construção",
        description: "Tijolo para construção de paredes.",
        price: 2.50,
        icon: "🧱"
    },
    {
        name: "Furadeira",
        category: "Ferramentas",
        description: "Furadeira para trabalhos domésticos e profissionais.",
        price: 249.90,
        icon: "🔧"
    },
    {
        name: "Martelo",
        category: "Ferramentas",
        description: "Martelo resistente para diferentes tipos de trabalhos.",
        price: 49.90,
        icon: "🔨"
    },
    {
        name: "Fios elétricos",
        category: "Elétrica",
        description: "Fios para instalações elétricas.",
        price: 89.90,
        icon: "⚡"
    },
    {
        name: "Tubo PVC",
        category: "Hidráulica",
        description: "Tubos para instalações hidráulicas.",
        price: 29.90,
        icon: "🚰"
    }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartElement = document.getElementById("cart");

// Formatação dos preços
function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostrar produtos
function displayProducts(category = "Todos", search = "") {
    productList.innerHTML = "";

    const filtered = products.filter(product => {
        const matchesCategory =
            category === "Todos" || product.category === category;

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    filtered.forEach(product => {
        const index = products.indexOf(product);

        productList.innerHTML += `
            <article class="product">
                <div class="emoji">${product.icon}</div>
                <small>${product.category}</small>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">${formatPrice(product.price)}</span>
                <button onclick="addToCart(${index})">
                    Adicionar ao carrinho
                </button>
            </article>
        `;
    });

    if (filtered.length === 0) {
        productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
    }
}

// Filtros de categorias
document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filters button")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        displayProducts(
            button.dataset.category,
            document.getElementById("search").value
        );
    });
});

// Pesquisa de produtos
document.getElementById("search").addEventListener("input", event => {
    const activeButton = document.querySelector(".filters button.active");
    const category = activeButton
        ? activeButton.dataset.category
        : "Todos";

    displayProducts(category, event.target.value);
});

// Adicionar ao carrinho
function addToCart(index) {
    const product = products[index];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    cartElement.classList.add("open");
}

// Atualizar carrinho
function updateCart() {
    const cartItems = document.getElementById("cart-items");

    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;

    if (cart.length === 0) {
        cartItems.innerHTML = "Seu carrinho está vazio.";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} x ${formatPrice(item.price)}
                </div>

                <button onclick="removeFromCart(${index})">
                    Remover
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        formatPrice(total);
}

// Remover produto
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Abrir e fechar carrinho
document.getElementById("cart-button").addEventListener("click", () => {
    cartElement.classList.add("open");
});

document.getElementById("close-cart").addEventListener("click", () => {
    cartElement.classList.remove("open");
});

// Finalizar pedido
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Pedido registrado! Entre em contato com nossa equipe.");

    cart = [];
    updateCart();
    cartElement.classList.remove("open");
});

// Menu mobile
document.getElementById("menu-button").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("show");
});

// Fechar menu ao clicar em um link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector("nav").classList.remove("show");
    });
});

// Formulário de contato
document.getElementById("contact-form").addEventListener("submit", event => {
    event.preventDefault();

    alert("Mensagem enviada com sucesso!");

    event.target.reset();
});

// Inicialização
displayProducts();

document.querySelector('.filters button[data-category="Todos"]')
    .classList.add("active");

updateCart();
