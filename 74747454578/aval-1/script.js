
const WHATSAPP_NUMBER = "5511999999999";

// Produtos de demonstração: personalize nomes, preços e fotos.
const products = [
  {
    id: 1,
    name: "Camiseta Essential",
    category: "camisetas",
    price: 89.90,
    description: "Básica, versátil e confortável.",
    tag: "MAIS VENDIDO",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Camiseta Oversized",
    category: "camisetas",
    price: 119.90,
    description: "Modelagem ampla e contemporânea.",
    tag: "NOVO",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Camisa Urban",
    category: "camisas",
    price: 159.90,
    description: "Elegância casual para qualquer ocasião.",
    tag: "",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Calça Essential",
    category: "calcas",
    price: 189.90,
    description: "Corte moderno e visual minimalista.",
    tag: "",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Jaqueta Premium",
    category: "jaquetas",
    price: 279.90,
    description: "Personalidade e sofisticação.",
    tag: "DESTAQUE",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Camisa Linho",
    category: "camisas",
    price: 179.90,
    description: "Leveza e estilo para dias especiais.",
    tag: "NOVO",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Tênis Minimal",
    category: "acessorios",
    price: 249.90,
    description: "Um clássico para completar o visual.",
    tag: "",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Relógio Classic",
    category: "acessorios",
    price: 219.90,
    description: "Detalhes discretos e marcantes.",
    tag: "",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85"
  }
];

const $ = id => document.getElementById(id);

const productGrid = $("productGrid");
const productCount = $("productCount");
const cartPanel = $("cartPanel");
const overlay = $("overlay");
const cartItems = $("cartItems");
const toast = $("toast");

let activeCategory = "todos";
let cart = [];
let toastTimer;

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2500);
}

function renderProducts() {
  const filtered = products.filter(product =>
    activeCategory === "todos" ||
    product.category === activeCategory
  );

  productCount.textContent =
    `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}`;

  if (filtered.length === 0) {
    productGrid.innerHTML =
      '<p class="empty-products">Nenhum produto nesta categoria.</p>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-photo">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${product.tag
          ? `<span class="product-tag">${product.tag}</span>`
          : ""}
        <button
          class="add-button"
          data-add="${product.id}"
          aria-label="Adicionar ${product.name} à sacola"
        >ADICIONAR À SACOLA +</button>
      </div>
      <div class="product-details">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">${money(product.price)}</p>
      </div>
    </article>
  `).join("");
}

// Filtros por categoria.
$("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

// Adicionar produtos à sacola.
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

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
  showToast(`${product.name} adicionado à sacola.`);
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  renderCart();
  showToast("Produto removido.");
}

function renderCart() {
  const quantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  $("cartCount").textContent = quantity;
  $("cartHeadingCount").textContent = `(${quantity})`;
  $("cartTotal").textContent = money(total);

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Sua sacola está vazia. Explore nossa coleção.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${money(item.price)}</p>
        <div class="quantity-controls">
          <button data-minus="${item.id}" aria-label="Diminuir quantidade">−</button>
          <span>${item.quantity}</span>
          <button data-plus="${item.id}" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <button class="remove-button" data-remove="${item.id}" aria-label="Remover produto">×</button>
    </article>
  `).join("");
}

// Quantidades e remoção.
cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) changeQuantity(Number(minus.dataset.minus), -1);
  if (plus) changeQuantity(Number(plus.dataset.plus), 1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

// Abrir e fechar sacola.
function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("visible");
  document.body.classList.add("cart-open");
  cartPanel.setAttribute("aria-hidden", "false");
  $("closeCart").focus();
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("visible");
  document.body.classList.remove("cart-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

$("openCart").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

// Menu para celulares.
$("menuToggle").addEventListener("click", () => {
  $("nav").classList.toggle("open");
});

$("nav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    $("nav").classList.remove("open");
  });
});

// Número de WhatsApp: código do país + DDD + número.
function validWhatsApp() {
  return /^\d{12,13}$/.test(WHATSAPP_NUMBER);
}

function openWhatsApp(message) {
  if (!validWhatsApp()) {
    showToast("Configure o número da loja no arquivo script.js.");
    return;
  }

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

$("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Adicione um produto antes de finalizar.");
    return;
  }

  const lines = cart.map(item =>
    `- ${item.name} | Quantidade: ${item.quantity} | ${money(item.price * item.quantity)}`
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message = [
    "Olá! Quero fazer um pedido na VÉRTICE MEN.",
    "",
    ...lines,
    "",
    `Total dos produtos: ${money(total)}`,
    "",
    "Gostaria de confirmar tamanhos, disponibilidade, entrega e pagamento."
  ].join("\n");

  openWhatsApp(message);
});

$("contactButton").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp("Olá! Gostaria de conhecer os produtos da VÉRTICE MEN.");
});

$("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
