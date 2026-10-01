const products = [

    {
        id: 1,
        title: "Nevermind",
        artist: "Nirvana",
        genre: "grunge",
        genreName: "Grunge",
        price: 59.90,
        cover: "cover-grunge"
    },

    {
        id: 2,
        title: "Ten",
        artist: "Pearl Jam",
        genre: "grunge",
        genreName: "Grunge",
        price: 64.90,
        cover: "cover-grunge"
    },

    {
        id: 3,
        title: "Dirt",
        artist: "Alice in Chains",
        genre: "grunge",
        genreName: "Grunge",
        price: 69.90,
        cover: "cover-grunge"
    },

    {
        id: 4,
        title: "Back in Black",
        artist: "AC/DC",
        genre: "hard-rock",
        genreName: "Hard Rock",
        price: 54.90,
        cover: "cover-hard-rock"
    },

    {
        id: 5,
        title: "Appetite for Destruction",
        artist: "Guns N' Roses",
        genre: "hard-rock",
        genreName: "Hard Rock",
        price: 64.90,
        cover: "cover-hard-rock"
    },

    {
        id: 6,
        title: "Hysteria",
        artist: "Def Leppard",
        genre: "hard-rock",
        genreName: "Hard Rock",
        price: 49.90,
        cover: "cover-hard-rock"
    },

    {
        id: 7,
        title: "Paranoid",
        artist: "Black Sabbath",
        genre: "heavy-metal",
        genreName: "Heavy Metal",
        price: 59.90,
        cover: "cover-metal"
    },

    {
        id: 8,
        title: "Master of Puppets",
        artist: "Metallica",
        genre: "heavy-metal",
        genreName: "Heavy Metal",
        price: 69.90,
        cover: "cover-metal"
    },

    {
        id: 9,
        title: "The Number of the Beast",
        artist: "Iron Maiden",
        genre: "heavy-metal",
        genreName: "Heavy Metal",
        price: 64.90,
        cover: "cover-metal"
    },

    {
        id: 10,
        title: "Never Mind the Bollocks",
        artist: "Sex Pistols",
        genre: "punk",
        genreName: "Punk Rock",
        price: 52.90,
        cover: "cover-punk"
    },

    {
        id: 11,
        title: "Dookie",
        artist: "Green Day",
        genre: "punk",
        genreName: "Punk Rock",
        price: 49.90,
        cover: "cover-punk"
    },

    {
        id: 12,
        title: "Smash",
        artist: "The Offspring",
        genre: "punk",
        genreName: "Punk Rock",
        price: 47.90,
        cover: "cover-punk"
    },

    {
        id: 13,
        title: "OK Computer",
        artist: "Radiohead",
        genre: "alternative",
        genreName: "Alternative Rock",
        price: 69.90,
        cover: "cover-alternative"
    },

    {
        id: 14,
        title: "The Bends",
        artist: "Radiohead",
        genre: "alternative",
        genreName: "Alternative Rock",
        price: 59.90,
        cover: "cover-alternative"
    },

    {
        id: 15,
        title: "Blood Sugar Sex Magik",
        artist: "Red Hot Chili Peppers",
        genre: "alternative",
        genreName: "Alternative Rock",
        price: 64.90,
        cover: "cover-alternative"
    },

    {
        id: 16,
        title: "Led Zeppelin IV",
        artist: "Led Zeppelin",
        genre: "classic",
        genreName: "Classic Rock",
        price: 59.90,
        cover: "cover-classic"
    },

    {
        id: 17,
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        genre: "classic",
        genreName: "Classic Rock",
        price: 69.90,
        cover: "cover-classic"
    },

    {
        id: 18,
        title: "Sticky Fingers",
        artist: "The Rolling Stones",
        genre: "classic",
        genreName: "Classic Rock",
        price: 54.90,
        cover: "cover-classic"
    }

];


/* =========================================
   ESTADO
========================================= */

let cart = [];


/* =========================================
   ELEMENTOS HTML
========================================= */

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const genreFilter =
    document.getElementById("genreFilter");

const sortFilter =
    document.getElementById("sortFilter");

const cartOverlay =
    document.getElementById("cartOverlay");

const openCartButton =
    document.getElementById("openCart");

const closeCartButton =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const newsletterForm =
    document.getElementById("newsletterForm");


/* =========================================
   FORMATAÇÃO DE PREÇO
========================================= */

function formatPrice(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================
   RENDERIZAR PRODUTOS
========================================= */

function renderProducts(list) {

    productsGrid.innerHTML = "";


    if (list.length === 0) {

        productsGrid.innerHTML = `
            <div class="empty-results">
                <h3>Nenhum disco encontrado.</h3>
                <p>
                    Tente outro artista, álbum ou gênero.
                </p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="
                album-cover
                ${product.cover}
            ">

            </div>


            <div class="album-info">

                <span class="album-genre">
                    ${product.genreName}
                </span>

                <h3>
                    ${product.title}
                </h3>

                <p class="artist">
                    ${product.artist}
                </p>


                <div class="album-bottom">

                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        + ADICIONAR
                    </button>

                </div>

            </div>
        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================
   FILTRAR E ORDENAR
========================================= */

function updateCatalog() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const genre =
        genreFilter.value;


    const sort =
        sortFilter.value;


    let filtered =
        products.filter(product => {

            const matchesSearch =

                product.title
                    .toLowerCase()
                    .includes(search)

                ||

                product.artist
                    .toLowerCase()
                    .includes(search);


            const matchesGenre =

                genre === "todos"

                ||

                product.genre === genre;


            return (
                matchesSearch &&
                matchesGenre
            );

        });


    /* ORDENAÇÃO */

    if (sort === "lowest") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "highest") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );

    }


    renderProducts(filtered);

}


/* =========================================
   EVENTOS DE FILTRO
========================================= */

searchInput.addEventListener(
    "input",
    updateCatalog
);

genreFilter.addEventListener(
    "change",
    updateCatalog
);

sortFilter.addEventListener(
    "change",
    updateCatalog
);


/* =========================================
   BOTÕES DE GÊNERO
========================================= */

const genreButtons =
    document.querySelectorAll(
        ".genre-card"
    );


genreButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const genre =
                button.dataset.genre;


            genreFilter.value =
                genre;


            updateCatalog();


            document
                .getElementById("catalogo")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

productsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".add-cart"
            );


        if (!button) {
            return;
        }


        const productId =
            Number(
                button.dataset.id
            );


        addToCart(productId);

    }
);


/* =========================================
   ADICIONAR
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


/* =========================================
   RENDERIZAR CARRINHO
========================================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Seu carrinho está vazio.
                </p>

                <p>
                    Adicione alguns discos.
                </p>

            </div>

        `;

        return;
    }


    cart.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-cover"></div>


            <div>

                <h4>
                    ${item.title}
                </h4>

                <p>
                    ${item.artist}
                </p>

                <p>
                    ${formatPrice(item.price)}
                </p>


                <div class="quantity">

                    <button
                        data-action="decrease"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="increase"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove"
                data-action="remove"
                data-id="${item.id}"
            >
                ×
            </button>

        `;


        cartItems.appendChild(element);

    });

}


/* =========================================
   CONTROLES DO CARRINHO
========================================= */

cartItems.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.id
            );


        const action =
            button.dataset.action;


        const item =
            cart.find(
                product =>
                    product.id === id
            );


        if (!item) {
            return;
        }


        if (action === "increase") {

            item.quantity++;

        }


        if (action === "decrease") {

            item.quantity--;

            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        product =>
                            product.id !== id
                    );

            }

        }


        if (action === "remove") {

            cart =
                cart.filter(
                    product =>
                        product.id !== id
                );

        }


        updateCart();

    }
);


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function updateCart() {

    renderCart();


    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        formatPrice(total);

}


/* =========================================
   ABRIR CARRINHO
========================================= */

function openCart() {

    cartOverlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   FECHAR CARRINHO
========================================= */

function closeCart() {

    cartOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


openCartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            cartOverlay
        ) {

            closeCart();

        }

    }
);


/* =========================================
   FINALIZAR PEDIDO
========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Seu carrinho está vazio."
            );

            return;
        }


        alert(
            "Pedido realizado com sucesso! " +
            "Este é um projeto demonstrativo."
        );


        cart = [];

        updateCart();

        closeCart();

    }
);


/* =========================================
   NEWSLETTER
========================================= */

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document.getElementById(
                "newsletterEmail"
            ).value;


        alert(
            `E-mail ${email} cadastrado!`
        );


        newsletterForm.reset();

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderProducts(products);

updateCart();