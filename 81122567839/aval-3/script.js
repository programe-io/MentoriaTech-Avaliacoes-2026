
"use strict";

// Produtos demonstrativos da Bella Beauty.
// Substitua os nomes, preços e imagens pelos produtos reais da loja.

const products = [
  {
    id: 1,
    name: "Batom Velvet",
    category: "Maquiagem",
    price: 39.90,
    description: "Cor intensa com acabamento sofisticado.",
    tag: "Mais vendido",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Sérum Glow",
    category: "Skincare",
    price: 69.90,
    description: "Um toque especial na sua rotina facial.",
    tag: "Favorito",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Essência Floral",
    category: "Perfumes",
    price: 119.90,
    description: "Uma fragrância para momentos especiais.",
    tag: "Novidade",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Máscara Nutritiva",
    category: "Cabelos",
    price: 54.90,
    description: "Cuidado e maciez para os seus fios.",
    tag: "",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Blush Rosé",
    category: "Maquiagem",
    price: 44.90,
    description: "Um toque natural de cor e luminosidade.",
    tag: "",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Creme Hidratante",
    category: "Skincare",
    price: 59.90,
    description: "Um momento de cuidado e hidratação.",
    tag: "",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Perfume Elegance",
    category: "Perfumes",
    price: 149.90,
    description: "Elegância em cada detalhe.",
    tag: "",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Óleo Capilar",
    category: "Cabelos",
    price: 49.90,
    description: "Acabamento luminoso para os seus cabelos.",
    tag: "",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  }
];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");

let cart = loadCart();
let toastTimer;

// Formatação de valores em reais.
function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Carrega apenas um carrinho válido do armazenamento local.
function loadCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("bellaBeautyCart") || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved
      .filter(item =>
        item &&
        Number.isInteger(item.id) &&
        products.some(product => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        item.quantity <= 99
      )
      .map(item => ({
        id: item.id,
        quantity: item.quantity
      }));
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("bellaBeautyCart", JSON.stringify(cart));
  } catch {
    showToast("Não foi possível salvar o carrinho neste navegador.");
  }
}

// Renderiza os produtos do catálogo.
function renderProducts(category = "Todos") {
  const filtered = category === "Todos"
    ? products
    : products.filter(product => product.category === category);

  productGrid.replaceChildren();

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      img.style.display = "none";
      imageBox.style.background =
        "linear-gradient(135deg, #f1dfda, #fbf6f1)";
    }, { once: true });

    imageBox.appendChild(img);

    if (product.tag) {
      const tag = document.createElement("span");
      tag.className = "product-tag";
      tag.textContent = product.tag;
      imageBox.appendChild(tag);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "product-category";
    categoryLabel.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "add-button";
    button.textContent = "Adicionar à sacola";
    button.type = "button";
    button.addEventListener("click", () => addToCart(product.id));

    info.append(
      categoryLabel,
      title,
      description,
      price,
      button
    );

    card.append(imageBox, info);
    productGrid.appendChild(card);
  });
}

// Filtros das categorias.
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

// Adiciona produtos ao carrinho.
function addToCart(productId) {
  const item = cart.find(entry => entry.id === productId);

  if (item) {
    if (item.quantity >= 99) {
      showToast("Limite de quantidade atingido.");
      return;
    }

    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast("Produto adicionado à sua sacola! ♡");
}

// Altera a quantidade ou remove o produto.
function changeQuantity(productId, amount) {
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== productId);
  } else if (item.quantity > 99) {
    item.quantity = 99;
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

// Atualiza os itens, contador e subtotal.
function renderCart() {
  cartItems.replaceChildren();

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "Sua sacola está vazia. Que tal explorar nossos produtos?";
    cartItems.appendChild(empty);
    return;
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = formatPrice(product.price * item.quantity);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Diminuir quantidade");
    minus.addEventListener("click", () => changeQuantity(product.id, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Aumentar quantidade");
    plus.addEventListener("click", () => changeQuantity(product.id, 1));

    controls.append(minus, quantity, plus);
    details.append(title, price, controls);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "Remover";
    remove.addEventListener("click", () => removeFromCart(product.id));

    row.append(details, remove);
    cartItems.appendChild(row);
  });
}

// Abre e fecha o carrinho.
function openCart() {
  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");
  document.getElementById("close-cart").focus();
}

function closeCart() {
  cartOverlay.hidden = true;
  document.body.classList.remove("cart-open");
  document.getElementById("open-cart").focus();
}

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", event => {
  if (event.target === cartOverlay) closeCart();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !cartOverlay.hidden) {
    closeCart();
  }
});

// Mensagem temporária para o cliente.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Demonstração do formulário de newsletter.
// Não envia os dados para um servidor.
document.getElementById("newsletter-form").addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-message");

  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }

  message.textContent =
    "Demonstração: formulário validado! O cadastro real precisa de integração.";
  email.value = "";
});

// Checkout demonstrativo: não simula aprovação de pagamento.
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Adicione algum produto antes de continuar.");
    return;
  }

  showToast("Checkout ainda precisa ser integrado a um provedor de pagamento.");
});

// Inicialização.
document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
