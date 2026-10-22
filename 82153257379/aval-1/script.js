
const products = [
  {
    id: 1,
    name: "Tênis Urban",
    category: "Moda",
    price: 189.90,
    badge: "MAIS VENDIDO",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Relógio Classic",
    category: "Acessórios",
    price: 149.90,
    badge: "ELEGANTE",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Fone Wave",
    category: "Tecnologia",
    price: 229.90,
    badge: "TECNOLOGIA",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Óculos Vision",
    category: "Acessórios",
    price: 99.90,
    badge: "TENDÊNCIA",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  }
];

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

let cart = [];
let toastTimer;

const grid = document.getElementById("product-grid");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");

function renderProducts(category = "Todos") {
  const filtered = category === "Todos"
    ? products
    : products.filter(product => product.category === category);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">${money(product.price)}</p>
        <button
          class="add-button"
          data-add="${product.id}"
        >+ Adicionar ao carrinho</button>
      </div>
    </article>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} adicionado ao carrinho!`);
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += amount;
  cart = cart.filter(product => product.quantity > 0);

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = count;
  cartTotal.textContent = money(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>🛍️</p>
        <br>
        Seu carrinho está vazio.<br>
        Que tal explorar nossos produtos?
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${money(item.price * item.quantity)}</p>
        <div class="quantity-controls">
          <button data-minus="${item.id}" aria-label="Diminuir">−</button>
          <span>${item.quantity}</span>
          <button data-plus="${item.id}" aria-label="Aumentar">+</button>
        </div>
      </div>
      <button class="remove-button" data-remove="${item.id}">
        Remover
      </button>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  document.body.classList.add("cart-open");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  document.body.classList.remove("cart-open");
}

document.querySelector(".filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts(button.dataset.category);
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});

cartItems.addEventListener("click", event => {
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");

  if (plus) changeQuantity(Number(plus.dataset.plus), 1);
  if (minus) changeQuantity(Number(minus.dataset.minus), -1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

document.getElementById("cart-button")
  .addEventListener("click", openCart);

document.getElementById("close-cart")
  .addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

document.getElementById("checkout-button")
  .addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Adicione produtos antes de continuar.");
      return;
    }

    showToast("Checkout ainda não configurado. Conecte um meio de pagamento.");
  });

document.getElementById("year").textContent =
  new Date().getFullYear();

renderProducts();
renderCart();
