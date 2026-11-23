// Catálogo com 5 Produtos Típicos do Piauí
const products = [
  {
    id: 1,
    name: "Kit Cajuína Cristalina Artesanal (3x 500ml)",
    category: "Bebidas",
    origin: "Teresina / Parnaíba",
    price: 54.90,
    emoji: "🍹",
    bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    description: "Suco de caju clarificado e caramelizado naturalmente, sem adição de açúcares ou conservantes. Patrimônio Cultural do Piauí."
  },
  {
    id: 2,
    name: "Doce de Buriti em Compota (450g)",
    category: "Doces & Mel",
    origin: "Campo Maior",
    price: 28.50,
    emoji: "🥥",
    bg: "linear-gradient(135deg, #ffedd5, #fed7aa)",
    description: "Doce cremoso feito com a polpa pura do buriti colhido nos buritizais piauienses, de sabor marcante e textura aveludada."
  },
  {
    id: 3,
    name: "Mel Silvestre Puro de Picos (500g)",
    category: "Doces & Mel",
    origin: "Picos — Capital do Mel",
    price: 34.00,
    emoji: "🍯",
    bg: "linear-gradient(135deg, #fef9c3, #fef08a)",
    description: "Mel floral de florada nativa do semiárido piauiense, reconhecido internacionalmente pela pureza e aroma intenso."
  },
  {
    id: 4,
    name: "Carne de Sol de Campo Maior Curada (1kg)",
    category: "Gastronomia",
    origin: "Campo Maior",
    price: 68.90,
    emoji: "🥩",
    bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
    description: "Corte nobre bovino salgado e curado na brisa tradicional de Campo Maior, embalado a vácuo para manter maciez e sabor."
  },
  {
    id: 5,
    name: "Pingente em Opala Nobre de Pedro II",
    category: "Artesanato & Joias",
    origin: "Pedro II",
    price: 189.00,
    emoji: "💎",
    bg: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    description: "Joia artesanal lapidada com opala preciosa extraída das únicas minas do gênero no Brasil, em Pedro II."
  }
];

let cart = [];
let selectedCategory = "todos";
let searchTerm = "";
let discountApplied = false;

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === "todos" || p.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-muted);">Nenhum produto encontrado para essa busca.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (prod) => `
      <article class="product-card">
        <div class="product-visual" style="background: ${prod.bg};">
          <span class="origin-pill">📍 ${prod.origin}</span>
          <span>${prod.emoji}</span>
        </div>
        <div class="product-body">
          <span class="product-cat">${prod.category}</span>
          <h3>${prod.name}</h3>
          <p>${prod.description}</p>
          <div class="product-footer">
            <span class="price">${formatBRL(prod.price)}</span>
            <button class="add-btn" onclick="addToCart(${prod.id})">+ Carrinho</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  openCart();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartCountEl = document.getElementById("cartCount");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:40px;">Seu carrinho está vazio.<br/>Escolha um dos 5 produtos típicos do Piauí!</p>`;
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <span class="cart-item-icon">${item.emoji}</span>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>${formatBRL(item.price * item.qty)}</span>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <strong>${item.qty}</strong>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 18.90;
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  document.getElementById("subtotalValue").textContent = formatBRL(subtotal);
  document.getElementById("shippingValue").textContent =
    subtotal >= 150 ? "GRÁTIS" : formatBRL(shipping);

  const discountRow = document.getElementById("discountRow");
  if (discountApplied && subtotal > 0) {
    discountRow.classList.remove("hidden");
    document.getElementById("discountValue").textContent = `- ${formatBRL(discount)}`;
  } else {
    discountRow.classList.add("hidden");
  }

  document.getElementById("totalValue").textContent = formatBRL(total);
}

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("applyCouponBtn").addEventListener("click", () => {
  const code = document.getElementById("couponInput").value.trim().toUpperCase();
  const feedback = document.getElementById("couponFeedback");

  if (code === "PIAUI10") {
    discountApplied = true;
    feedback.style.color = "var(--accent-green)";
    feedback.textContent = "✔ Cupom PIAUI10 aplicado (10% de desconto)!";
    updateCartUI();
  } else {
    feedback.style.color = "#dc2626";
    feedback.textContent = "Cupom inválido. Tente PIAUI10.";
  }
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Adicione pelo menos um produto ao carrinho antes de finalizar.");
    return;
  }

  const totalText = document.getElementById("totalValue").textContent;
  const itemsList = cart.map((i) => `• ${i.qty}x ${i.name}`).join("<br/>");

  document.getElementById("orderSummaryBox").innerHTML = `
    <strong>Resumo do Pedido:</strong><br/>
    ${itemsList}<br/><br/>
    <strong>Total Pago:</strong> ${totalText}
  `;

  closeCart();
  document.getElementById("checkoutModal").classList.add("open");

  cart = [];
  discountApplied = false;
  document.getElementById("couponInput").value = "";
  document.getElementById("couponFeedback").textContent = "";
  updateCartUI();
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("checkoutModal").classList.remove("open");
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    renderProducts();
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

renderProducts();
updateCartUI();