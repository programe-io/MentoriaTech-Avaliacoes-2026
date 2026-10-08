const products = [

    {
        name: "Batom Velvet Rose",
        price: 39.90,
        old: 49.90,
        img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Perfume Floral Bloom",
        price: 89.90,
        old: 119.90,
        img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Sérum Facial Glow",
        price: 59.90,
        old: 74.90,
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Paleta Nude Glam",
        price: 69.90,
        old: 89.90,
        img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Hidratante Corporal",
        price: 34.90,
        old: 44.90,
        img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Gloss Crystal Shine",
        price: 29.90,
        old: 39.90,
        img: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Protetor Solar FPS 50",
        price: 49.90,
        old: 59.90,
        img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Kit Pincéis Beauty",
        price: 45.90,
        old: 59.90,
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Creme Facial Premium",
        price: 74.90,
        old: 99.90,
        img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Máscara de Cílios",
        price: 32.90,
        old: 42.90,
        img: "https://images.unsplash.com/photo-1631730486572-226d1c12a80d?auto=format&fit=crop&w=700&q=85"
    }

];


let cart = [];


/* FORMATAÇÃO DO DINHEIRO */

const money = (value) => {

    return value.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

};


/* MOSTRAR PRODUTOS */

function renderProducts() {

    document.getElementById("productGrid").innerHTML =

        products.map((p, i) => `

            <article class="card">

                <img
                    src="${p.img}"
                    alt="${p.name}"
                    loading="lazy"
                >

                <div class="card-body">

                    <div class="badge">
                        Oferta
                    </div>

                    <h3>
                        ${p.name}
                    </h3>

                    <div class="price">

                        R$ ${money(p.price)}

                        <span class="old">
                            R$ ${money(p.old)}
                        </span>

                    </div>

                    <button
                        class="add"
                        onclick="add(${i})"
                    >
                        Adicionar ao carrinho
                    </button>

                </div>

            </article>

        `).join("");

}


/* ADICIONAR PRODUTO */

function add(i) {

    cart.push(products[i]);

    updateCart();

    document
        .getElementById("cartPanel")
        .classList.add("open");

}


/* REMOVER PRODUTO */

function remove(i) {

    cart.splice(i, 1);

    updateCart();

}


/* ATUALIZAR CARRINHO */

function updateCart() {

    document.getElementById("count").textContent =
        cart.length;


    document.getElementById("cartItems").innerHTML =

        cart.length

            ?

        cart.map((p, i) => `

            <div class="cart-item">

                <img
                    src="${p.img}"
                    alt="${p.name}"
                >

                <div>

                    <b>
                        ${p.name}
                    </b>

                    <br>

                    <small>
                        R$ ${money(p.price)}
                    </small>

                </div>

                <button
                    class="remove"
                    onclick="remove(${i})"
                >
                    ✕
                </button>

            </div>

        `).join("")

            :

        `
            <p style="color:#8b7883">
                Seu carrinho está vazio.
            </p>
        `;


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );


    document.getElementById("total").textContent =
        money(total);

}


/* ABRIR/FECHAR CARRINHO */

function toggleCart() {

    document
        .getElementById("cartPanel")
        .classList.toggle("open");

}


/* FINALIZAR COMPRA */

function finalizar() {

    if (!cart.length) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;

    }


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );


    alert(
        "Pedido preparado! Total: R$ "
        + money(total)
        + "\nEntre em contato pelo WhatsApp para concluir a compra."
    );

}


/* INICIAR SITE */

renderProducts();

updateCart();