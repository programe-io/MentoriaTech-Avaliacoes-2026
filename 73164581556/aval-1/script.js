// ========================================
// CARRINHO DE COMPRAS
// ========================================

let cart = [];


// ========================================
// ADICIONAR PRODUTO AO CARRINHO
// ========================================

function addCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(
        name +
        " foi adicionado ao carrinho! 🛒"
    );
}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Atualiza quantidade de produtos
    cartCount.textContent = cart.length;


    // Se o carrinho estiver vazio
    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        cartTotal.textContent = "0,00";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    // Percorre os produtos
    cart.forEach(function(item) {

        total += item.price;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `
            <span>
                ${item.name}
            </span>

            <strong>
                R$ ${item.price
                    .toFixed(2)
                    .replace(".", ",")}
            </strong>
        `;


        cartItems.appendChild(div);

    });


    // Atualiza o preço total
    cartTotal.textContent =
        total.toFixed(2).replace(".", ",");
}


// ========================================
// FINALIZAR COMPRA
// ========================================

function checkout() {

    // Verifica se o carrinho está vazio

    if (cart.length === 0) {

        alert(
            "Seu carrinho está vazio! 🛒"
        );

        return;
    }


    // Mensagem de confirmação

    alert(
        "Obrigado pela sua compra! 💖\n\n" +
        "Esta é uma demonstração de loja."
    );
}
