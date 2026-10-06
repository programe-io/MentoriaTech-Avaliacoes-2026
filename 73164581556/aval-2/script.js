// ========================================
// CARRINHO
// ========================================

let cart = [];


// ========================================
// ADICIONAR PRODUTO
// ========================================

function addCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(
        "👟 " +
        name +
        " foi adicionado ao carrinho!"
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


    // Atualiza a quantidade
    cartCount.textContent = cart.length;


    // Se estiver vazio
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒

                <p>
                    Seu carrinho está vazio.
                </p>
            </div>
        `;

        cartTotal.textContent = "0,00";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    // Mostra os produtos
    cart.forEach(function(item, index) {

        total += item.price;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <span>
                    R$ ${item.price
                        .toFixed(2)
                        .replace(".", ",")}
                </span>

            </div>


            <button
                class="remove"
                onclick="removeCart(${index})">

                Remover

            </button>

        `;


        cartItems.appendChild(div);

    });


    // Atualiza o total
    cartTotal.textContent =
        total
        .toFixed(2)
        .replace(".", ",");
}


// ========================================
// REMOVER PRODUTO
// ========================================

function removeCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ========================================
// FINALIZAR COMPRA
// ========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!"
        );

        return;
    }


    let total = 0;


    cart.forEach(function(item) {

        total += item.price;

    });


    alert(
        "🎉 Compra realizada!\n\n" +

        "Total: R$ " +

        total
            .toFixed(2)
            .replace(".", ",") +

        "\n\n" +

        "Obrigado por comprar na " +
        "Pequenos Passos! 👟💖"
    );


    // Limpa o carrinho
    cart = [];

    updateCart();
}


// ========================================
// INICIAR CARRINHO
// ========================================

updateCart();
