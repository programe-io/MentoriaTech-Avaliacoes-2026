
const products = [
  {
    id: 1,
    name: "Oversized Essential",
    category: "camisetas",
    description: "Camiseta oversized • Preto",
    price: 129.90,
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Urban Heavy Hoodie",
    category: "moletons",
    description: "Moletom premium • Street fit",
    price: 249.90,
    tag: "DROP 001",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Graphic Identity",
    category: "camisetas",
    description: "Camiseta estampada • Unissex",
    price: 149.90,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Street Signature Cap",
    category: "acessorios",
    description: "Boné urbano • Ajustável",
    price: 89.90,
    tag: "EXCLUSIVE",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = [];

const grid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const drawerCount = document.getElementById("drawer-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const drawer = document.getElementById("cart-drawer");
const backdrop = document.getElementById("cart-backdrop");
const toast = document.getElementById("toast");

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderProducts(category = "todos") {
  const filtered = category === "todos"
    ? products
    : products.filter(product => product.category === category);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>

        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button
            class="add-button"
            data-add="${product.id}"
            aria-label="Adicionar ${product.name} à sacola"
          >+</button>
        </div>
      </div>
    </article>
  `).join("");
}

// Filtros da coleção
document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts(button.dataset.filter);
});

// Adicionar produtos
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const id = Number(button.dataset.add);
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} adicionado à sacola!`);
});

// Renderizar carrinho
function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = quantity;
  drawerCount.textContent = `(${quantity})`;
  cartTotal.textContent = money(total);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">Sua sacola está vazia.<br>
      Explore a coleção VYRON.</p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">

      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${money(item.price)}</p>

        <div class="cart-item-actions">
          <button data-decrease="${item.id}"
            aria-label="Diminuir quantidade">−</button>

          <span>${item.quantity}</span>

          <button data-increase="${item.id}"
            aria-label="Aumentar quantidade">+</button>

          <button class="remove" data-remove="${item.id}">
            REMOVER
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Alterar quantidades ou remover itens
cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  const id = Number(
    button.dataset.increase ||
    button.dataset.decrease ||
    button.dataset.remove
  );

  const item = cart.find(product => product.id === id);
  if (!item) return;

  if (button.hasAttribute("data-increase")) {
    item.quantity++;
  }

  if (button.hasAttribute("data-decrease")) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(product => product.id !== id);
    }
  }

  if (button.hasAttribute("data-remove")) {
    cart = cart.filter(product => product.id !== id);
  }

  renderCart();
});

// Abrir e fechar sacola
function openCart() {
  drawer.classList.add("open");
  backdrop.classList.add("visible");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  document.getElementById("close-cart").focus();
}

function closeCart() {
  drawer.classList.remove("open");
  backdrop.classList.remove("visible");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
}

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

// Menu para celulares
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Avisos na tela
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Newsletter: demonstração visual, sem envio de dados
document.getElementById("newsletter-form")
  .addEventListener("submit", event => {
    event.preventDefault();

    document.getElementById("newsletter-message").textContent =
      "Formulário demonstrativo. Conecte um serviço de e-mail para ativar as inscrições.";

    event.target.reset();
  });

// Finalização demonstrativa
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Sua sacola está vazia.");
    return;
  }

  showToast("Checkout ainda não configurado. Nenhum pedido foi enviado.");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
