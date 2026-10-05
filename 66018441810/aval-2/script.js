/ ===============================
// PRODUTOS
// ===============================

const products = [
    {
        id: 1,
        name: "Fone Bluetooth Pro",
        category: "Eletrônicos",
        price: 199.90,
        image: "🎧",
        badge: "OFERTA"
    \},
    {
        id: 2,
        name: "Smartwatch X1",
        category: "Eletrônicos",
        price: 349.90,
        image: "⌚",
        badge: "NOVO"
    \},
    {
        id: 3,
        name: "Tênis Urban",
        category: "Moda",
        price: 229.90,
        image: "👟",
        badge: "POPULAR"
    \},
    {
        id: 4,
        name: "Camiseta Premium",
        category: "Moda",
        price: 89.90,
        image: "👕",
        badge: ""
    \},
    {
        id: 5,
        name: "Mochila Minimal",
        category: "Acessórios",
        price: 159.90,
        image: "🎒",
        badge: "NOVO"
    \},
    {
        id: 6,
        name: "Óculos Classic",
        category: "Acessórios",
        price: 119.90,
        image: "🕶️",
        badge: ""
    \},
    {
        id: 7,
        name: "Luminária Smart",
        category: "Casa",
        price: 139.90,
        image: "💡",
        badge: "OFERTA"
    \},
    {
        id: 8,
        name: "Cafeteira Compact",
        category: "Casa",
        price: 299.90,
        image: "☕",
        badge: ""
    \}
];


// ===============================
// ELEMENTOS
// ===============================

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const emptyProducts = document.getElementById("emptyProducts");

const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

const toast = document.getElementById("toast");

const newsletterForm = document.getElementById("newsletterForm");


// ===============================
// CARRINHO
// ===============================

let cart = [];


// ===============================
// FORMATAÇÃO
// ===============================

function formatPrice(price) {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    \});
\}


// ===============================
// RENDERIZAR PRODUTOS
// ===============================

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    if (list.length === 0) {
        emptyProducts.style.display = "block";
        return;
    \}

    emptyProducts.style.display = "none";

    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">

                \${
                    product.badge
                    ? `<span class="product-badge">\${product.badge\}</span>`
                    : ""
                \}

                \${product.image\}

            </div>

            <div class="product-info">

                <span class="product-category">
                    \${product.category\}
                </span>

                <h3 class="product-name">
                    \${product.name\}
                </h3>

                <div class="product-bottom">

                    <strong class="product-price">
                        \${formatPrice(product.price)\}
                    </strong>

                    <button
                        class="add-cart"
                        data-id="\${product.id\}"
                        aria-label="Adicionar ao carrinho"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        productsGrid.appendChild(card);
    \});

    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            addToCart(id);

        \});

    \});
\}


// ===============================
// ADICIONAR AO CARRINHO
// ===============================

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    \} else {
        cart.push({
            ...product,
            quantity: 1
        \});
    \}

    updateCart();

    showToast(`\${product.name\} foi adicionado!`);
\}


// ===============================
// REMOVER DO CARRINHO
// ===============================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
\}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="cart-empty">
                Seu carrinho está vazio.
            </p>
        `;

    \} else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">
                    \${item.image\}
                </div>

                <div class="cart-item-info">

                    <h4>
                        \${item.name\}
                    </h4>

                    <p>
                        \${item.quantity\}x \${formatPrice(item.price)\}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-id="\${item.id\}"
                >
                    ×
                </button>
            `;

            cartItems.appendChild(cartItem);
        \});

        document.querySelectorAll(".remove-item").forEach(button => {

            button.addEventListener("click", () => {

                removeFromCart(
                    Number(button.dataset.id)
                );

            \});

        \});
    \}


    const quantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const total = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = quantity;

    cartTotal.textContent = formatPrice(total);
\}


// ===============================
// ABRIR CARRINHO
// ===============================

function openCart() {

    cartSidebar.classList.add("active");
    overlay.classList.add("active");

\}


// ===============================
// FECHAR CARRINHO
// ===============================

function closeCartSidebar() {

    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");

\}


cartButton.addEventListener("click", openCart);

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

overlay.addEventListener(
    "click",
    closeCartSidebar
);


// ===============================
// FILTRO DE CATEGORIA
// ===============================

categoryFilter.addEventListener("change", () => {

    const category = categoryFilter.value;

    if (category === "Todos") {

        renderProducts(products);

        return;
    \}

    const filtered = products.filter(
        product => product.category === category
    );

    renderProducts(filtered);
\});


// ===============================
// CATEGORIAS
// ===============================

document.querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;

            categoryFilter.value = category;

            const filtered = products.filter(
                product => product.category === category
            );

            renderProducts(filtered);

            document
                .getElementById("produtos")
                .scrollIntoView({
                    behavior: "smooth"
                \});

        \});

    \});


// ===============================
// BUSCA
// ===============================

searchButton.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    \}

\});


searchInput.addEventListener("input", () => {

    const search = searchInput.value
        .toLowerCase()
        .trim();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    renderProducts(filtered);

\});


// ===============================
// OFERTAS
// ===============================

document.getElementById("offerButton")
    .addEventListener("click", () => {

        categoryFilter.value = "Todos";

        renderProducts(products);

        document
            .getElementById("produtos")
            .scrollIntoView({
                behavior: "smooth"
            \});

    \});


// ===============================
// NEWSLETTER
// ===============================

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = newsletterForm
        .querySelector("input")
        .value;

    if (email) {

        showToast(
            "E-mail cadastrado com sucesso!"
        );

        newsletterForm.reset();
    \}

\});


// ===============================
// FINALIZAR COMPRA
// ===============================

document.getElementById("checkout")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast(
                "Seu carrinho está vazio."
            );

            return;
        \}

        showToast(
            "Compra iniciada! 🚀"
        );

    \});


// ===============================
// TOAST
// ===============================

let toastTimeout;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    \}, 2500);

\}


// ===============================
// MENU MOBILE
// ===============================

document.getElementById("menuMobile")
    .addEventListener("click", () => {

        const menu = document.querySelector(".menu");

        if (menu.style.display === "flex") {

            menu.style.display = "";

        \} else {

            menu.style.display = "flex";
            menu.style.position = "absolute";
            menu.style.top = "68px";
            menu.style.left = "0";
            menu.style.right = "0";
            menu.style.padding = "20px";
            menu.style.background = "#fff";
            menu.style.flexDirection = "column";
            menu.style.borderBottom = "1px solid #eee";

        \}

    \});


// ===============================
// INICIALIZAÇÃO
// ===============================

renderProducts();

updateCart();$0