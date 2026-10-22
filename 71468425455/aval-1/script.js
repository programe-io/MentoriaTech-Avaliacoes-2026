
const WHATSAPP_NUMBER = "5511999999999";

// Edite os produtos, valores, categorias e fotos nesta lista.
const products = [
  {
    id: 1,
    name: "Vestido Aurora",
    category: "vestidos",
    price: 289.90,
    description: "Elegância fluida para ocasiões especiais.",
    tag: "MAIS VENDIDO",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Vestido Serena",
    category: "vestidos",
    price: 319.90,
    description: "Silhueta delicada e atemporal.",
    tag: "NOVO",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Blusa Essência",
    category: "blusas",
    price: 149.90,
    description: "Minimalismo para todos os dias.",
    tag: "",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Conjunto Siena",
    category: "conjuntos",
    price: 379.90,
    description: "Sofisticação em perfeita harmonia.",
    tag: "EXCLUSIVO",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Bolsa Élise",
    category: "acessorios",
    price: 229.90,
    description: "Um detalhe que transforma o look.",
    tag: "",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Blusa Amélie",
    category: "blusas",
    price: 169.90,
    description: "Leveza, conforto e delicadeza.",
    tag: "NOVO",
    image: "https://images.unsplash.com/photo-1564257577-1a6e9c1d3c6b?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Conjunto Verona",
    category: "conjuntos",
    price: 399.90,
    description: "Um clássico para momentos especiais.",
    tag: "",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Bolsa Noa",
    category: "acessorios",
    price: 199.90,
    description: "Design discreto e acabamento elegante.",
    tag: "",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85"
  }
];

const productGrid = document.getElementById("productGrid");
const productTotal = document.getElementById("productTotal");
const cartCount = document.getElementById("cartCount");
const cartTitleCount = document.getElementById("cartTitleCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

let activeCategory = "todos";
let cart = [];
let toastTimeout;

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function renderProducts() {
  const visibleProducts = products.filter(product =>
    activeCategory === "todos" ||
    product.category === activeCategory
  );

  productTotal.textContent =
    `${visibleProducts.length} ${visibleProducts.length === 1 ? "peça" : "peças"}`;

  if (!visibleProducts.length) {
    productGrid.innerHTML =
      '<p class="empty-products">Nenhum produto encontrado nesta categoria.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${product.tag
          ? `<span class="product-tag">${product.tag}</span>`
          : ""}
        <button
          class="quick-add"
          data-add="${product.id}"
          aria-label="Adicionar ${product.name} à sacola"
        >
          ADICIONAR À SACOLA +
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">${money(product.price)}</p>
      </div>
    </article>
  `).join("");
}

// Filtrar produtos.
document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts();
});

// Adicionar produtos à sacola.
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} adicionada à sacola.`);
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);
  renderCart();
  showToast("Produto removido da sacola.");
}

function renderCart() {
  const quantity = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = quantity;
  cartTitleCount.textContent = `(${quantity})`;
  cartTotal.textContent = money(total);

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Sua sacola está esperando por você.</p>';
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
      <button
        class="remove-item"
        data-remove="${item.id}"
        aria-label="Remover ${item.name}"
      >×</button>
    </article>
  `).join("");
}

// Controles de quantidade e remoção.
cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) changeQuantity(Number(minus.dataset.minus), -1);
  if (plus) changeQuantity(Number(plus.dataset.plus), 1);
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

// Abrir e fechar a sacola.
function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("visible");
  document.body.classList.add("cart-open");
  cartPanel.setAttribute("aria-hidden", "false");
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("visible");
  document.body.classList.remove("cart-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

// Menu para celulares.
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Finalização pelo WhatsApp.
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Adicione pelo menos um produto à sacola.");
    return;
  }

  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    showToast("Configure o número de WhatsApp da loja no script.js.");
    return;
  }

  const orderLines = cart.map(item =>
    `• ${item.name} x${item.quantity} — ${money(item.price * item.quantity)}`
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message = [
    "Olá! Gostaria de fazer um pedido na ÉLORA Atelier.",
    "",
    ...orderLines,
    "",
    `*Total dos produtos: ${money(total)}*`,
    "",
    "Gostaria de confirmar a disponibilidade e as opções de entrega e pagamento."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// Link de WhatsApp no rodapé.
document.getElementById("whatsappLink").addEventListener("click", event => {
  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    event.preventDefault();
    showToast("Configure o WhatsApp da loja no arquivo script.js.");
    return;
  }

  event.currentTarget.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

// Formulário demonstrativo de novidades.
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("newsletterEmail").value.trim();
  if (!email) return;

  document.getElementById("newsletterMessage").textContent =
    "Obrigada pelo interesse! Este formulário ainda precisa ser conectado a um serviço de cadastro.";

  event.currentTarget.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
