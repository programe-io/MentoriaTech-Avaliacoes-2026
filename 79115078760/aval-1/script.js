
// ================================
// PRODUTOS DA LOJA
// ================================

const products = [
    {
        id: 1,
        name: "Headset Gamer RGB",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
    },
    {
        id: 2,
        name: "Mouse Gamer RGB",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
    },
    {
        id: 3,
        name: "Teclado Mecânico",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    },
    {
        id: 4,
        name: "Controle Gamer",
        price: 199.90,
        image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500"
    },
    {
        id: 5,
        name: "Monitor Gamer",
        price: 1299.90,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
    },
    {
        id: 6,
        name: "Cadeira Gamer",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500"
    }
];

let cart = [];

// ================================
// FORMATAÇÃO DE PREÇO
// ================================

function formatPrice(price) {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ================================
// MOSTRAR PRODUTOS
// ================================

function showProducts(list = products) {

    const productList = document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = "";

    list.forEach(product => {

        productList.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>

                <button class="btn"
                    onclick="addToCart(${product.id})">
                    ADICIONAR AO CARRINHO
                </button>

            </div>
        `;

    });

}

// ================================
// ADICIONAR AO CARRINHO
// ================================

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

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

// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";

    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;
        quantityTotal += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name}
                    (x${item.quantity})
                </span>

                <span>
                    ${formatPrice(subtotal)}

                    <button onclick="removeItem(${item.id})">
                        ❌
                    </button>
                </span>

            </div>
        `;

    });

    totalElement.innerHTML = `
        Total: ${formatPrice(total)}
        <br>
        <small>Produtos: ${quantityTotal}</small>
    `;

}

// ================================
// REMOVER PRODUTO
// ================================

function removeItem(id) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();

}

// ================================
// LIMPAR CARRINHO
// ================================

function clearCart() {

    cart = [];

    updateCart();

}

// ================================
// PESQUISAR PRODUTOS
// ================================

function searchProducts() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    showProducts(filtered);

}

// ================================
// FINALIZAR COMPRA
// ================================

function checkout() {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    alert(
        "PEDIDO REALIZADO COM SUCESSO!\n\n" +
        "Total: " + formatPrice(total) +
        "\n\nObrigado por comprar na GTA 6 STORE!"
    );

    clearCart();

}

// ================================
// INICIALIZAR LOJA
// ================================

document.addEventListener("DOMContentLoaded", () => {

    showProducts();

    updateCart();

});
