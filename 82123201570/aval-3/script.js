
const WHATSAPP_NUMBER = "5511999999999";
// Troque pelo seu número com código do Brasil e DDD.

const products = [
  {
    id: 1,
    name: "Camiseta Essential Preta",
    category: "Camisetas",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Camiseta Premium Branca",
    category: "Camisetas",
    price: 44.90,
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4d4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Bermuda Casual Bege",
    category: "Bermudas",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Bermuda Urbana Preta",
    category: "Bermudas",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Calça Jeans Masculina",
    category: "Calças",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Tênis Urban",
    category: "Calçados",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];
let categorySelected = "Todos";

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartOverlay = document.getElementById("cart-overlay");

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderProducts() {
  const filteredProducts = categorySelected === "Todos"
    ? products
    : products.filter(p => p.category === categorySelected);

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="add-button" data-add="${product.id}">
          ADICIONAR À SACOLA +
        </button>
      </div>
    </article>
  `).join("");
}

// Filtrar produtos por categoria
document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  categorySelected = button.dataset.category;

  document.querySelectorAll(".filter").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

// Adicionar produtos à sacola
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const product = products.find(
    p => p.id === Number(button.dataset.add)
  );

  if (!product) return;

  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
});

// Atualizar carrinho
function renderCart() {
  cartCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Sua sacola está vazia.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price)}</p>
        <div class="quantity-controls">
          <button data-minus="${item.id}" aria-label="Diminuir">−</button>
          <span>${item.quantity}</span>
          <button data-plus="${item.id}" aria-label="Aumentar">+</button>
        </div>
      </div>
      <button class="remove-button" data-remove="${item.id}">
        Remover
      </button>
    </article>
  `).join("");
}

// Aumentar, diminuir ou remover itens
cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) {
    const item = cart.find(p => p.id === Number(minus.dataset.minus));
    if (item) item.quantity--;

    cart = cart.filter(p => p.quantity > 0);
  }

  if (plus) {
    const item = cart.find(p => p.id === Number(plus.dataset.plus));
    if (item) item.quantity++;
  }

  if (remove) {
    cart = cart.filter(p => p.id !== Number(remove.dataset.remove));
  }

  renderCart();
});

// Abrir e fechar sacola
document.getElementById("open-cart").addEventListener("click", () => {
  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");
});

function closeCart() {
  cartOverlay.hidden = true;
  document.body.classList.remove("cart-open");
}

document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("continue-shopping").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", event => {
  if (event.target === cartOverlay) closeCart();
});

// Finalizar pedido pelo WhatsApp
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Adicione produtos à sacola antes de continuar.");
    return;
  }

  if (!/^55\d{10,11}$/.test(WHATSAPP_NUMBER)) {
    alert("Configure seu número de WhatsApp no arquivo script.js.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const order = cart.map(item =>
    `${item.name} - ${item.quantity} unidade(s) - ${formatPrice(item.price * item.quantity)}`
  ).join("\n");

  const message =
    `Olá, Urban Men! Quero fazer um pedido:\n\n${order}\n\n` +
    `Total dos produtos: ${formatPrice(total)}\n\n` +
    "Gostaria de confirmar o estoque, o frete e o pagamento.";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Ano do rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Inicializar a loja
renderProducts();
renderCart();
