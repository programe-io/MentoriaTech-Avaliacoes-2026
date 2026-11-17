
// ===================================
// ICHAT - REDE SOCIAL DE MENSAGENS
// ===================================

const defaultChats = [
    {
        id: 1,
        name: "Ana Clara",
        avatar: "https://i.pravatar.cc/150?img=47",
        online: true,
        messages: [
            { text: "Oi! Tudo bem? ❤️", type: "received", time: "10:20" },
            { text: "Tudo sim, e você?", type: "sent", time: "10:22" }
        ]
    },
    {
        id: 2,
        name: "Lucas Santos",
        avatar: "https://i.pravatar.cc/150?img=12",
        online: true,
        messages: [
            { text: "Vamos jogar hoje? 🎮", type: "received", time: "09:45" }
        ]
    },
    {
        id: 3,
        name: "Mariana",
        avatar: "https://i.pravatar.cc/150?img=44",
        online: false,
        messages: [
            { text: "Boa noite! 😊", type: "received", time: "Ontem" }
        ]
    },
    {
        id: 4,
        name: "Pedro Henrique",
        avatar: "https://i.pravatar.cc/150?img=11",
        online: true,
        messages: [
            { text: "Me chama depois!", type: "received", time: "Ontem" }
        ]
    }
];

let chats;

try {
    const saved = JSON.parse(localStorage.getItem("ichat_chats"));
    chats = Array.isArray(saved) ? saved : defaultChats;
} catch {
    chats = defaultChats;
}

let activeChat = null;

// ===================================
// ELEMENTOS
// ===================================

const chatList = document.getElementById("chat-list");
const messages = document.getElementById("messages");
const input = document.getElementById("message-input");
const form = document.getElementById("message-form");

// ===================================
// SEGURANÇA DE TEXTO
// ===================================

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// ===================================
// SALVAR CONVERSAS
// ===================================

function saveChats() {
    localStorage.setItem("ichat_chats", JSON.stringify(chats));
}

// ===================================
// HORÁRIO
// ===================================

function getTime() {
    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// ===================================
// MOSTRAR LISTA DE CONVERSAS
// ===================================

function renderChats(filter = "") {

    chatList.innerHTML = "";

    const filtered = chats.filter(chat =>
        chat.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (!filtered.length) {
        chatList.innerHTML = "<p style='padding:20px;color:#888'>Nenhuma conversa encontrada.</p>";
        return;
    }

    filtered.forEach(chat => {

        const lastMessage = chat.messages.at(-1);

        const preview = lastMessage
            ? lastMessage.text
            : "Comece uma conversa";

        const time = lastMessage
            ? lastMessage.time
            : "";

        const item = document.createElement("div");
        item.className = "chat-item";

        item.innerHTML = `
            <img class="avatar"
                src="${escapeHTML(chat.avatar)}"
                alt="Foto de ${escapeHTML(chat.name)}">

            <div class="chat-details">
                <h3>${escapeHTML(chat.name)}</h3>
                <p>${escapeHTML(preview)}</p>
            </div>

            <div class="chat-meta">
                <span>${escapeHTML(time)}</span>
                <br>
                ${chat.online
                    ? '<span class="online">● Online</span>'
                    : ''}
            </div>
        `;

        item.addEventListener("click", () => openChat(chat.id));

        chatList.appendChild(item);

    });

}

// ===================================
// ABRIR CONVERSA
// ===================================

function openChat(id) {

    activeChat = chats.find(chat => chat.id === id);

    if (!activeChat) return;

    document.getElementById("home-screen").classList.add("hidden");

    document.getElementById("conversation-screen").classList.remove("hidden");

    document.getElementById("chat-avatar").src = activeChat.avatar;

    document.getElementById("chat-name").textContent = activeChat.name;

    document.getElementById("chat-status").textContent =
        activeChat.online ? "online" : "offline";

    renderMessages();

}

// ===================================
// MOSTRAR MENSAGENS
// ===================================

function renderMessages() {

    if (!activeChat) return;

    messages.innerHTML = "";

    activeChat.messages.forEach(message => {

        const bubble = document.createElement("div");

        bubble.className = `message ${message.type}`;

        bubble.innerHTML = `
            ${escapeHTML(message.text)}
            <span class="message-time">
                ${escapeHTML(message.time)}
                ${message.type === "sent" ? " ✓✓" : ""}
            </span>
        `;

        messages.appendChild(bubble);

    });

    messages.scrollTop = messages.scrollHeight;

}

// ===================================
// ENVIAR MENSAGEM
// ===================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = input.value.trim();

    if (!text || !activeChat) return;

    activeChat.messages.push({
        text: text,
        type: "sent",
        time: getTime()
    });

    input.value = "";

    saveChats();

    renderMessages();

    renderChats();

});

// ===================================
// VOLTAR PARA CONVERSAS
// ===================================

function goBack() {

    document.getElementById("conversation-screen").classList.add("hidden");

    document.getElementById("home-screen").classList.remove("hidden");

    activeChat = null;

    renderChats();

}

// ===================================
// PESQUISAR CONTATOS
// ===================================

document.getElementById("search").addEventListener("input", function() {

    renderChats(this.value);

});

// ===================================
// NOVA CONVERSA
// ===================================

function newChat() {

    const name = prompt("Digite o nome do contato:");

    if (!name || !name.trim()) return;

    const cleanName = name.trim();

    let existing = chats.find(chat =>
        chat.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existing) {
        openChat(existing.id);
        return;
    }

    const newContact = {
        id: Date.now(),
        name: cleanName,
        avatar: "https://i.pravatar.cc/150?u=" + Date.now(),
        online: false,
        messages: []
    };

    chats.unshift(newContact);

    saveChats();

    renderChats();

    openChat(newContact.id);

}

// ===================================
// MENU INFERIOR
// ===================================

function changeTab(tab) {

    if (tab === "home") {
        goBack();
        return;
    }

    const tabs = {
        status: "Atualizações",
        calls: "Ligações",
        communities: "Comunidades",
        settings: "Configurações"
    };

    alert(tabs[tab] + "\n\nÁrea demonstrativa do iChat.");

}

// ===================================
// INICIALIZAR
// ===================================

renderChats();
