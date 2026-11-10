
const products = [
    {
        id: 1,
        name: "Fone Bluetooth",
        price: 89.90,
        image: "https://placehold.co/300x200?text=Fone"
    },
    {
        id: 2,
        name: "Relógio Digital",
        price: 129.90,
        image: "https://placehold.co/300x200?text=Relogio"
    },
    {
        id: 3,
        name: "Tênis Esportivo",
        price: 199.90,
        image: "https://placehold.co/300x200?text=Tenis"
    },
    {
        id: 4,
        name: "Mochila",
        price: 99.90,
        image: "https://placehold.co/300x200?text=Mochila"
    },
    {
        id: 5,
        name: "Controle Gamer",
        price: 149.90,
        image: "https://placehold.co/300x200?text=Controle"
    },
    {
        id: 6,
        name: "Caixa de Som",
        price: 79.90,
        image: "https://placehold.co/300x200?text=Som"
    }
];

let cart = [];

const productArea = document.getElementById("products");
const cartItems = document.getElementById("cartItems");

function renderProducts(list = products) {
    productArea.innerHTML = "";

    if (list.length === 0) {
        productArea.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    list.forEach(product => {
        productArea.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2).replace(".", ",")}</p>
                <button onclick="addToCart(${product.id})">
                    Adicionar ao carrinho
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    document.getElementById("cartCount").textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = "Seu carrinho está vazio.";
    } else {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} - R$ ${item.price.toFixed(2).replace(".", ",")}</span>
                    <button class="remove" onclick="removeFromCart(${index})">
                        Remover
                    </button>
                </div>
            `;
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

document.getElementById("search").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    renderProducts(filtered);
});

document.getElementById("cartButton").addEventListener("click", function() {
    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
});

function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    alert(
        "Pedido realizado como demonstração!\n" +
        "Total: R$ " + total.toFixed(2).replace(".", ",") +
        "\nObrigado por comprar na YURE STORE!"
    );

    cart = [];
    updateCart();
}

renderProducts();
