
const products = [
  {
    id: 1,
    name: "Batom Matte",
    category: "Lábios",
    description: "Cor intensa e acabamento aveludado",
    price: 39.90,
    emoji: "💄",
    tag: "Mais vendido",
    reviews: 128
  },
  {
    id: 2,
    name: "Paleta de Sombras",
    category: "Olhos",
    description: "12 cores para criar seu look",
    price: 79.90,
    emoji: "🎨",
    tag: "Favorito",
    reviews: 97
  },
  {
    id: 3,
    name: "Base Líquida",
    category: "Pele",
    description: "Cobertura confortável e natural",
    price: 69.90,
    emoji: "🧴",
    tag: "Novidade",
    reviews: 74
  },
  {
    id: 4,
    name: "Máscara de Cílios",
    category: "Olhos",
    description: "Volume e definição para o olhar",
    price: 49.90,
    emoji: "🖤",
    tag: "Queridinho",
    reviews: 110
  },
  {
    id: 5,
    name: "Blush Rosado",
    category: "Pele",
    description: "Um toque de cor e luminosidade",
    price: 34.90,
    emoji: "🌸",
    tag: "Destaque",
    reviews: 62
  },
  {
    id: 6,
    name: "Gloss Labial",
    category: "Lábios",
    description: "Brilho delicado e confortável",
    price: 29.90,
    emoji: "💋",
    tag: "Novo",
    reviews: 83
  },
  {
    id: 7,
    name: "Pincel de Maquiagem",
    category: "Pele",
    description: "Aplicação macia e uniforme",
    price: 24.90,
    emoji: "🖌️",
    tag: "Essencial",
    reviews: 51
  },
  {
    id: 8,
    name: "Delineador",
    category: "Olhos",
    description: "Traço preciso para destacar o olhar",
    price: 32.90,
    emoji: "✒️",
    tag: "Favorito",
    reviews: 68
  }
];

const cart = [];
let activeCategory = "Todos";

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

// Mostrar produtos na tela
function renderProducts() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const filtered = products.filter(product => {
    const matchesCategory =
      activeCategory === "Todos" ||
      product.category === activeCategory;

    const text = (
      product.name + " " +
      product.description + " " +
      product.category
    ).toLocaleLowerCase("pt-BR");

    return matchesCategory && text.includes(query);
  });

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-art">
        <span class="product-tag">${product.tag}</span>
        <span class="emoji">${product.emoji}</span>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>

        <div class="rating">
          ★★★★★ <span>(${product.reviews})</span>
        </div>

        <p class="product-price">${money(product.price)}</p>

        <button class="add-button" data-add="${product.id}">
          🛒 Adicionar
        </button>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
}

// Adicionar produto ao carrinho
function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1
    });
  }

  renderCart();

  const product = products.find(item => item.id === id);
  showToast(product.name + " adicionado ao carrinho!");
}

// Alterar quantidade
function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart.splice(cart.indexOf(item), 1);
  }

  renderCart();
}

// Remover produto
function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  renderCart();
}

// Atualizar carrinho e total
function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);

  const container = document.getElementById("cartItems");

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="cart-empty">
        Seu carrinho está vazio.<br>
        Que tal escolher algo lindo? ♡
      </p>
    `;
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return `
      <div class="cart-item">
        <div class="cart-item-art">${product.emoji}</div>

        <div>
          <h3>${product.name}</h3>
          <p>${money(product.price)}</p>

          <div class="quantity">
            <button data-change="${product.id}"
              data-amount="-1">−</button>

            <span>${item.quantity}</span>

            <button data-change="${product.id}"
              data-amount="1">+</button>
          </div>
        </div>

        <button class="remove-item"
          data-remove="${product.id}">×</button>
      </div>
    `;
  }).join("");
}

// Abrir e fechar carrinho
function showCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("visible");
  cartPanel.setAttribute("aria-hidden", "false");
}

function hideCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("visible");
  cartPanel.setAttribute("aria-hidden", "true");
}

// Mensagem temporária
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// Clique nos botões de adicionar
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
  }
});

// Botões de quantidade e remoção
document.getElementById("cartItems")
  .addEventListener("click", event => {
    const change = event.target.closest("[data-change]");
    const remove = event.target.closest("[data-remove]");

    if (change) {
      changeQuantity(
        Number(change.dataset.change),
        Number(change.dataset.amount)
      );
    }

    if (remove) {
      removeFromCart(Number(remove.dataset.remove));
    }
  });

// Filtrar por categoria
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();
  });
});

// Pesquisa de produtos
searchInput.addEventListener("input", renderProducts);

// Eventos do carrinho
document.getElementById("openCart")
  .addEventListener("click", showCart);

document.getElementById("closeCart")
  .addEventListener("click", hideCart);

overlay.addEventListener("click", hideCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideCart();
});

// Menu para celular
document.getElementById("menuToggle")
  .addEventListener("click", () => {
    document.getElementById("navMenu")
      .classList.toggle("open");
  });

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu")
      .classList.remove("open");
  });
});

// Formulário de novidades
document.getElementById("newsletterForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("emailInput")
      .value.trim();

    document.getElementById("formMessage").textContent =
      `Obrigada! O e-mail ${email} foi inscrito nesta demonstração.`;

    event.target.reset();
  });

// Finalizar compra demonstrativa
document.getElementById("checkoutButton")
  .addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Adicione um produto antes de finalizar.");
      return;
    }

    showToast(
      "Demonstração: a compra não foi enviada."
    );
  });

// Ano automático no rodapé
document.getElementById("year").textContent =
  new Date().getFullYear();

// Inicializar o site
renderProducts();
renderCart();
