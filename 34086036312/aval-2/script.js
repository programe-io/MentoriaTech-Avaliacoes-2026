const cartButton = document.getElementById("cartButton");
const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkout = document.getElementById("checkout");

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

let cartProducts = [];

/* =========================
   MENU MOBILE
========================= */

menuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
\});

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    \});
\});

/* =========================
   ABRIR / FECHAR CARRINHO
========================= */

function openCart() {
    cart.classList.add("active");
    cartOverlay.classList.add("active");
\}

function closeCartPanel() {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
\}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
cartOverlay.addEventListener("click", closeCartPanel);

/* =========================
   ADICIONAR PRODUTO
========================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cartProducts.find(
            product => product.name === name
        );

        if (existingProduct) {
            existingProduct.quantity++;
        \} else {
            cartProducts.push({
                name: name,
                price: price,
                quantity: 1
            \});
        \}

        updateCart();

        openCart();

        button.textContent = "✓ Adicionado";

        setTimeout(() => {
            button.textContent = "Adicionar ao carrinho";
        \}, 1200);
    \});

\});

/* =========================
   ATUALIZAR CARRINHO
========================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cartProducts.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

    \} else {

        cartProducts.forEach((product, index) => {

            const item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <div>
                    <h4>\${product.name\}</h4>
                    <p>
                        \${product.quantity\}x
                        R\$ \${product.price.toFixed(2).replace(".", ",")\}
                    </p>
                </div>

                <button
                    class="remove-item"
                    onclick="removeProduct(\${index\})">
                    Remover
                </button>
            `;

            cartItems.appendChild(item);
        \});
    \}

    updateCartTotal();
\}

/* =========================
   REMOVER PRODUTO
========================= */

function removeProduct(index) {

    cartProducts.splice(index, 1);

    updateCart();
\}

/* =========================
   TOTAL
========================= */

function updateCartTotal() {

    let total = 0;
    let quantity = 0;

    cartProducts.forEach(product => {

        total += product.price * product.quantity;
        quantity += product.quantity;

    \});

    cartCount.textContent = quantity;

    cartTotal.textContent =
        `R\$ \${total.toFixed(2).replace(".", ",")\}`;
\}

/* =========================
   FINALIZAR COMPRA
========================= */

checkout.addEventListener("click", () => {

    if (cartProducts.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    \}

    let message = "🛍️ PEDIDO NOVASTORE\\n\\n";

    cartProducts.forEach(product => {

        const subtotal =
            product.price * product.quantity;

        message +=
            `\${product.quantity\}x \${product.name\} - R\$ \${subtotal
                .toFixed(2)
                .replace(".", ",")\}\\n`;
    \});

    const total = cartProducts.reduce(
        (sum, product) =>
            sum + product.price * product.quantity,
        0
    );

    message +=
        `\\nTotal: R\$ \${total.toFixed(2).replace(".", ",")\}`;

    alert(message);

\});

/* =========================
   BOTÃO VER TODOS
========================= */

document.getElementById("showAll").addEventListener("click", () => {

    document.getElementById("produtos").scrollIntoView({
        behavior: "smooth"
    \});$0