
const products = [
  {
    id: 1,
    name: "Macacão Baby Dreams",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"
  },
  {
    id: 2,
    name: "Kit Body Baby",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600"
  },
  {
    id: 3,
    name: "Manta Nuvem",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600"
  },
  {
    id: 4,
    name: "Sapatinho Baby",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"
  },
  {
    id: 5,
    name: "Kit Touca e Meias",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600"
  }
];

let cart = [];

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderProducts() {
  const container = document.getElementById("products");

  container.innerHTML = products.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Produto especial para o seu bebê.</p>
        <p class="price">${money(product.price)}</p>
        <button class="main-button" onclick="addToCart(${product.id})">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  alert("Produto adicionado ao carrinho!");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    renderCart();
  }
}

function getTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function renderCart() {
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>${money(item.price)} cada</p>
          <p>
            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            ${item.quantity}
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </p>
        </div>
        <div>
          <strong>${money(item.price * item.quantity)}</strong>
          <p><button onclick="removeFromCart(${item.id})">Remover</button></p>
        </div>
      </div>
    `).join("");
  }

  document.getElementById("cart-count").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cart-total").textContent = money(getTotal());

  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const container = document.getElementById("checkout-items");

  if (cart.length === 0) {
    container.innerHTML = "<p>Nenhum produto selecionado.</p>";
  } else {
    container.innerHTML = cart.map(item => `
      <div class="summary-item">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>
    `).join("");
  }

  document.getElementById("checkout-total").textContent = money(getTotal());
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
  document.getElementById("cart-overlay").classList.toggle("active");
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Adicione algum produto ao carrinho antes de finalizar.");
    return;
  }

  document.getElementById("cart").classList.remove("active");
  document.getElementById("cart-overlay").classList.remove("active");

  document.getElementById("checkout").classList.add("visible");
  renderCheckoutSummary();

  document.getElementById("checkout").scrollIntoView({
    behavior: "smooth"
  });
}

document.getElementById("checkout-form").addEventListener("submit", function(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  const cep = document.getElementById("customer-cep").value.trim();
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !email || !phone || !address || !cep || !payment) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const order = {
    number: "BABY-" + Date.now().toString().slice(-8),
    customer: name,
    email,
    phone,
    address,
    cep,
    payment: payment.value,
    total: getTotal(),
    products: cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    notes: document.getElementById("customer-notes").value,
    date: new Date().toLocaleString("pt-BR")
  };

  // Demonstração local: o pedido não é enviado a uma loja ou instituição financeira.
  document.getElementById("order-number").textContent = order.number;
  document.getElementById("order-payment").textContent = order.payment;
  document.getElementById("order-total").textContent = money(order.total);

  document.getElementById("checkout").classList.remove("visible");
  document.getElementById("confirmation").classList.add("visible");

  cart = [];
  renderCart();
  this.reset();

  document.getElementById("confirmation").scrollIntoView({
    behavior: "smooth"
  });
});

function newPurchase() {
  document.getElementById("confirmation").classList.remove("visible");
  document.getElementById("checkout").classList.remove("visible");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

renderProducts();
renderCart();
