
const chat = document.getElementById("chat");
const chatToggle = document.getElementById("chat-toggle");
const closeChat = document.getElementById("close-chat");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const messages = document.getElementById("messages");

const cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSection = document.getElementById("cart");

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

// Abrir e fechar o chat
chatToggle.addEventListener("click", () => {
  chat.hidden = !chat.hidden;

  if (!chat.hidden) {
    chatInput.focus();
  }
});

closeChat.addEventListener("click", () => {
  chat.hidden = true;
});

// Mostrar mensagem no chat
function addMessage(text, sender) {
  const message = document.createElement("p");
  message.className =
    sender === "user" ? "user-message" : "bot-message";
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

// Respostas automáticas do atendimento
function getReply(text) {
  const message = text.toLowerCase();

  if (message.includes("preço") || message.includes("preco")) {
    return "Temos tênis por R$ 149,90, sapatos sociais por R$ 199,90, saltos por R$ 179,90 e botas por R$ 229,90. 👟";
  }

  if (message.includes("tênis") || message.includes("tenis")) {
    return "Nosso Tênis Esportivo custa R$ 149,90. É uma opção confortável para o dia a dia!";
  }

  if (message.includes("bota")) {
    return "Nossa Bota Fashion custa R$ 229,90. 🥾";
  }

  if (message.includes("salto")) {
    return "Nosso Salto Alto custa R$ 179,90. 👠";
  }

  if (message.includes("social")) {
    return "Nosso Sapato Social custa R$ 199,90. 👞";
  }

  if (message.includes("carrinho")) {
    return "Para adicionar um sapato, clique no botão 'Adicionar ao carrinho' do produto desejado.";
  }

  if (message.includes("entrega") || message.includes("frete")) {
    return "Para saber o prazo e o valor da entrega, entre em contato com nossa equipe de atendimento.";
  }

  if (
    message.includes("olá") ||
    message.includes("ola") ||
    message.includes("oi")
  ) {
    return "Olá! 😊 Que bom receber você! Está procurando tênis, botas, saltos ou sapatos sociais?";
  }

  return "Obrigado pela mensagem! 😊 Pergunte sobre preços, tênis, botas, saltos ou sapatos sociais.";
}

// Enviar mensagem
chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = chatInput.value.trim();

  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const reply = getReply(text);
  addMessage(reply, "bot");
});

// Pesquisa de sapatos
document.getElementById("search").addEventListener("input", event => {
  const term = event.target.value.toLowerCase();

  document.querySelectorAll(".product").forEach(product => {
    product.hidden = !product.dataset.name
      .toLowerCase()
      .includes(term);
  });
});

// Adicionar ao carrinho
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.name,
      price: Number(button.dataset.price)
    });

    updateCart();
  });
});

// Atualizar carrinho
function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.replaceChildren();

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent = `${item.name} — ${money(item.price)}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = money(total);
}

// Mostrar ou esconder carrinho
document.getElementById("cart-button").addEventListener("click", () => {
  cartSection.hidden = !cartSection.hidden;
});

// Limpar carrinho
document.getElementById("clear-cart").addEventListener("click", () => {
  cart.length = 0;
  updateCart();
});
