const catalog = [
  {
    id: 1,
    name: "Teclado Mecânico KeyPro 75% RGB",
    category: "Periféricos",
    price: 389.90,
    icon: "⌨️",
    summary: "Switches táteis lubrificados, estrutura em alumínio e conexão tri-mode (USB-C, 2.4GHz e Bluetooth).",
    specs: ["Layout compacto 75% (82 teclas)", "Keycaps PBT Double-Shot", "Hot-swappable para switches 3 e 5 pinos", "Bateria de 4000mAh"]
  },
  {
    id: 2,
    name: "Headset Studio Wireless Pro",
    category: "Áudio",
    price: 549.90,
    icon: "🎧",
    summary: "Cancelamento ativo de ruído híbrido, drivers de 50mm e microfone removível com filtro pop.",
    specs: ["Autonomia de até 50 horas", "Dongle USB-C de baixíssima latência", "Almofadas em espuma viscoelástica", "Compatível com PC, PS5 e Mobile"]
  },
  {
    id: 3,
    name: "Monitor Gamer UltraWide 29\" 144Hz",
    category: "Monitores",
    price: 1399.00,
    icon: "🖥️",
    summary: "Painel IPS Full HD (2560x1080) com tempo de resposta de 1ms e cobertura de 99% sRGB.",
    specs: ["Taxa de atualização de 144Hz", "Suporte FreeSync e G-Sync Compatible", "2x HDMI 2.0 + 1x DisplayPort 1.4", "Ajuste de inclinação e furação VESA"]
  },
  {
    id: 4,
    name: "Mouse Ultraleve ViperX 58g",
    category: "Periféricos",
    price: 279.00,
    icon: "🖱️",
    summary: "Sensor óptico de 26.000 DPI, pés 100% PTFE e cabo paracord flexível para movimentos rápidos.",
    specs: ["Peso ultraleve de apenas 58g", "Switches ópticos com vida útil de 80M cliques", "Polling rate de 1000Hz", "Memória integrada para perfis"]
  },
  {
    id: 5,
    name: "Microfone Condensador USB PodCast",
    category: "Áudio",
    price: 329.90,
    icon: "🎙️",
    summary: "Captação cardioide cristalina com botão mute touch, controle de ganho e tripé metálico incluso.",
    specs: ["Resolução de áudio 24-bit / 96kHz", "Saída P2 para monitoramento sem atraso", "Plug & Play via USB-C", "Filtro anti-ruído interno"]
  },
  {
    id: 6,
    name: "Hub USB-C 7-em-1 Power Delivery",
    category: "Acessórios",
    price: 189.90,
    icon: "🔌",
    summary: "Expanda as conexões do seu notebook com saída HDMI 4K, leitor SD e carregamento rápido de 100W.",
    specs: ["1x HDMI 4K @ 60Hz", "3x USB 3.0 de alta velocidade", "Carregamento Pass-Through 100W", "Carcaça dissipadora em alumínio"]
  }
];

let cart = [];
let activeCategory = "todos";
let searchQuery = "";
let sortOrder = "featured";

function formatCurrency(val) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderCatalog() {
  const grid = document.getElementById("productsGrid");

  let filtered = catalog.filter((item) => {
    const matchesCat = activeCategory === "todos" || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if (sortOrder === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);">Nenhum produto encontrado para os filtros atuais.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (prod) => `
      <article class="card">
        <div class="card-thumb" onclick="openProductDetail(${prod.id})" title="Ver especificações">
          <span class="stock-tag">Em estoque</span>
          <span>${prod.icon}</span>
        </div>
        <div class="card-body">
          <span class="card-cat">${prod.category}</span>
          <h3>${prod.name}</h3>
          <p>${prod.summary}</p>
          <div class="card-price-row">
            <span class="price-tag">${formatCurrency(prod.price)}</span>
            <div class="card-actions">
              <button class="btn-outline" onclick="openProductDetail(${prod.id})">Detalhes</button>
              <button class="btn-add" onclick="addToCart(${prod.id})">+ Carrinho</button>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function openProductDetail(id) {
  const prod = catalog.find((p) => p.id === id);
  if (!prod) return;

  document.getElementById("detailContent").innerHTML = `
    <div style="font-size: 3.5rem; margin-bottom: 10px;">${prod.icon}</div>
    <span class="card-cat">${prod.category}</span>
    <h2 style="margin: 4px 0 10px;">${prod.name}</h2>
    <p style="color: var(--text-muted);">${prod.summary}</p>
    <ul class="specs-list">
      ${prod.specs.map((s) => `<li>${s}</li>`).join("")}
    </ul>
    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid var(--border);">
      <strong style="font-size:1.35rem; color:var(--primary);">${formatCurrency(prod.price)}</strong>
      <button class="btn-primary" onclick="addToCart(${prod.id}); closeDetail();">Adicionar ao Carrinho</button>
    </div>
  `;

  document.getElementById("detailModal").classList.add("open");
}

function closeDetail() {
  document.getElementById("detailModal").classList.remove("open");
}

document.getElementById("closeDetailModal").addEventListener("click", closeDetail);
document.getElementById("detailModal").addEventListener("click", (e) => {
  if (e.target.id === "detailModal") closeDetail();
});

function addToCart(id) {
  const prod = catalog.find((p) => p.id === id);
  if (!prod) return;

  const found = cart.find((item) => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...prod, qty: 1 });
  }

  updateCart();
  openCart();
}

function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  updateCart();
}

function updateCart() {
  const listEl = document.getElementById("cartList");
  const badgeEl = document.getElementById("cartBadge");

  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  badgeEl.textContent = count;

  if (cart.length === 0) {
    listEl.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:40px;">Seu carrinho está vazio.</p>`;
  } else {
    listEl.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-row">
          <span class="cart-row-icon">${item.icon}</span>
          <div class="cart-row-info">
            <h4>${item.name}</h4>
            <span>${formatCurrency(item.price * item.qty)}</span>
          </div>
          <div class="qty-box">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <strong>${item.qty}</strong>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const isPix = document.getElementById("pixDiscountCheck").checked;
  const pixDiscount = isPix ? subtotal * 0.1 : 0;
  const total = subtotal - pixDiscount;

  document.getElementById("subtotalText").textContent = formatCurrency(subtotal);
  const pixRow = document.getElementById("pixRow");

  if (isPix && subtotal > 0) {
    pixRow.classList.remove("hidden");
    document.getElementById("pixDiscountText").textContent = `- ${formatCurrency(pixDiscount)}`;
  } else {
    pixRow.classList.add("hidden");
  }

  document.getElementById("totalText").textContent = formatCurrency(total);
  document.getElementById("installmentsText").textContent =
    total > 0 && !isPix
      ? `ou em até 10x de ${formatCurrency(total / 10)} sem juros`
      : total > 0
      ? "Pagamento à vista com 10% de desconto no PIX"
      : "";
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartBackdrop").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartBackdrop").classList.remove("open");
}

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
document.getElementById("cartBackdrop").addEventListener("click", closeCart);
document.getElementById("pixDiscountCheck").addEventListener("change", updateCart);

document.getElementById("finishOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  const finalTotal = document.getElementById("totalText").textContent;
  alert(`Compra finalizada com sucesso!\nValor total: ${finalTotal}`);
  cart = [];
  document.getElementById("pixDiscountCheck").checked = false;
  updateCart();
  closeCart();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.cat;
    renderCatalog();
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderCatalog();
});

document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortOrder = e.target.value;
  renderCatalog();
});

renderCatalog();
updateCart();