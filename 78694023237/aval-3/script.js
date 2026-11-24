
const app = document.querySelector(".app");
const contactList = document.getElementById("contactList");
const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const messageForm = document.getElementById("messageForm");
const searchInput = document.getElementById("search");
const chatName = document.getElementById("chatName");
const chatAvatar = document.getElementById("chatAvatar");
const chatStatus = document.getElementById("chatStatus");
const backBtn = document.getElementById("backBtn");

let currentContactId = null;

// Contactes de demonstração
const defaultContacts = [
  {
    id: 1,
    name: "Ana Silva",
    emoji: "👩🏻",
    status: "online",
    messages: [
      { text: "Olá! Tudo bem? 😊", sent: false, time: "10:20" },
      { text: "Tudo ótimo! E contigo?", sent: true, time: "10:21" },
      { text: "Também estou bem!", sent: false, time: "10:22" }
    ]
  },
  {
    id: 2,
    name: "João Pedro",
    emoji: "👨🏽",
    status: "online",
    messages: [
      { text: "Vamos jogar mais tarde?", sent: false, time: "09:15" }
    ]
  },
  {
    id: 3,
    name: "Maria",
    emoji: "👩🏼",
    status: "visto recentemente",
    messages: [
      { text: "Manda as fotos depois 📸", sent: false, time: "Ontem" }
    ]
  },
  {
    id: 4,
    name: "Grupo Família",
    emoji: "👨‍👩‍👧‍👦",
    status: "4 participantes",
    messages: [
      { text: "Almoço domingo confirmado!", sent: false, time: "Ontem" }
    ]
  },
  {
    id: 5,
    name: "Pedro",
    emoji: "🧑🏻",
    status: "offline",
    messages: [
      { text: "Obrigado pela ajuda!", sent: false, time: "Segunda" }
    ]
  }
];

// Carregar conversas guardadas
let contacts;

try {
  const saved = localStorage.getItem("zapweb_contacts");
  contacts = saved ? JSON.parse(saved) : defaultContacts;
} catch {
  contacts = defaultContacts;
}

function saveContacts() {
  localStorage.setItem("zapweb_contacts", JSON.stringify(contacts));
}

// Mostrar lista de contactos
function renderContacts(filter = "") {
  contactList.innerHTML = "";

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(contact => {
    const lastMessage = contact.messages.at(-1);
    const item = document.createElement("div");

    item.className = "contact";
    if (contact.id === currentContactId) {
      item.classList.add("active");
    }

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = contact.emoji;

    const info = document.createElement("div");
    info.className = "contact-info";

    const name = document.createElement("h3");
    name.textContent = contact.name;

    const preview = document.createElement("p");
    preview.textContent = lastMessage ? lastMessage.text : "Nova conversa";

    info.append(name, preview);

    const time = document.createElement("span");
    time.className = "contact-time";
    time.textContent = lastMessage ? lastMessage.time : "";

    item.append(avatar, info, time);

    item.addEventListener("click", () => openChat(contact.id));
    contactList.appendChild(item);
  });
}

// Abrir conversa
function openChat(id) {
  const contact = contacts.find(c => c.id === id);
  if (!contact) return;

  currentContactId = id;

  welcome.hidden = true;
  chat.hidden = false;

  chatName.textContent = contact.name;
  chatAvatar.textContent = contact.emoji;
  chatStatus.textContent = contact.status;

  renderMessages(contact);
  renderContacts(searchInput.value);

  app.classList.add("chat-open");
  messageInput.focus();
}

// Renderizar mensagens
function renderMessages(contact) {
  messages.innerHTML = "";

  contact.messages.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = "message " + (msg.sent ? "sent" : "received");

    const text = document.createElement("span");
    text.textContent = msg.text;

    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = msg.time;

    bubble.append(text, time);
    messages.appendChild(bubble);
  });

  messages.scrollTop = messages.scrollHeight;
}

// Enviar mensagem
messageForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text || currentContactId === null) return;

  const contact = contacts.find(c => c.id === currentContactId);
  if (!contact) return;

  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  contact.messages.push({
    text: text,
    sent: true,
    time: time
  });

  messageInput.value = "";
  saveContacts();
  renderMessages(contact);
  renderContacts(searchInput.value);
});

// Pesquisa
searchInput.addEventListener("input", function() {
  renderContacts(this.value);
});

// Voltar no telemóvel
backBtn.addEventListener("click", () => {
  app.classList.remove("chat-open");
});

// Criar nova conversa
document.getElementById("newChat").addEventListener("click", () => {
  const name = prompt("Nome do novo contacto:");

  if (!name || !name.trim()) return;

  const contact = {
    id: Date.now(),
    name: name.trim(),
    emoji: "👤",
    status: "novo contacto",
    messages: []
  };

  contacts.unshift(contact);
  saveContacts();
  renderContacts();
  openChat(contact.id);
});

// Emojis
document.getElementById("emojiBtn").addEventListener("click", () => {
  const emoji = prompt("Escolhe um emoji:", "😊");

  if (emoji) {
    messageInput.value += emoji;
    messageInput.focus();
  }
});

// Anexar ficheiro
const fileInput = document.getElementById("fileInput");

document.getElementById("attachBtn").addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file || currentContactId === null) return;

  const contact = contacts.find(c => c.id === currentContactId);
  if (!contact) return;

  const now = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  contact.messages.push({
    text: "📎 Ficheiro enviado: " + file.name,
    sent: true,
    time: now
  });

  saveContacts();
  renderMessages(contact);
  renderContacts(searchInput.value);
  fileInput.value = "";
});

// Inicializar
renderContacts();
