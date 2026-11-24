let chatAtual = "Ana";

const respostas = {
    Ana: [
        "Que legal! 😊",
        "Entendi!",
        "Também acho isso 😄",
        "Depois me conta mais!",
        "Hahaha 😂"
    ],

    Lucas: [
        "Sim, vou!",
        "Pode deixar 👍",
        "Beleza!",
        "Nos vemos lá 😎"
    ],

    Mariana: [
        "Eu também adorei ❤️",
        "Ficou muito legal!",
        "Depois te mando mais fotos 😊"
    ],

    João: [
        "Combinado!",
        "Até amanhã 👋",
        "Boa noite!"
    ]
};


/* ABRIR CHAT */

function abrirChat(nome) {

    chatAtual = nome;

    document.getElementById("contactName").textContent = nome;

    const status = document.getElementById("contactStatus");

    status.textContent = "online";

    const chats = document.querySelectorAll(".chat");

    chats.forEach(chat => {
        chat.classList.remove("active");

        if (chat.innerText.includes(nome)) {
            chat.classList.add("active");
        }
    });

    const messages = document.getElementById("messages");

    messages.innerHTML = `
        <div class="date">HOJE</div>
        <div class="message received">
            <span>${getMensagemInicial(nome)}</span>
            <small>13:45</small>
        </div>
    `;

    carregarMensagens();

    document.getElementById("messageInput").focus();
}


/* MENSAGEM INICIAL */

function getMensagemInicial(nome) {

    const mensagens = {
        Ana: "Oi! Tudo bem? 😊",
        Lucas: "Você vai hoje?",
        Mariana: "Amei essa foto! ❤️",
        João: "Até amanhã!"
    };

    return mensagens[nome] || "Olá! 👋";
}


/* ENVIAR */

function enviarMensagem() {

    const input = document.getElementById("messageInput");

    const texto = input.value.trim();

    if (texto === "") return;

    adicionarMensagem(texto, "sent");

    input.value = "";

    atualizarPreview(texto);

    salvarMensagens();

    setTimeout(responderAutomaticamente, 1000);
}


/* ENTER */

document.getElementById("messageInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        enviarMensagem();
    }

});


/* ADICIONAR MENSAGEM */

function adicionarMensagem(texto, tipo) {

    const messages = document.getElementById("messages");

    const mensagem = document.createElement("div");

    mensagem.className = "message " + tipo;

    const hora = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    mensagem.innerHTML = `
        <span>${texto}</span>
        <small>${hora}${tipo === "sent" ? " ✓✓" : ""}</small>
    `;

    messages.appendChild(mensagem);

    messages.scrollTop = messages.scrollHeight;
}


/* RESPOSTA AUTOMÁTICA */

function responderAutomaticamente() {

    const lista = respostas[chatAtual] || ["Ok! 😊"];

    const resposta =
        lista[Math.floor(Math.random() * lista.length)];

    adicionarMensagem(resposta, "received");

    atualizarPreview(resposta);

    salvarMensagens();
}


/* PREVIEW */

function atualizarPreview(texto) {

    const preview = document.getElementById("preview-" + chatAtual);

    if (preview) {
        preview.textContent = texto;
    }
}


/* EMOJIS */

function mostrarEmojis() {

    const painel = document.getElementById("emojiPanel");

    painel.style.display =
        painel.style.display === "grid"
            ? "none"
            : "grid";
}


function adicionarEmoji(emoji) {

    const input = document.getElementById("messageInput");

    input.value += emoji;

    input.focus();
}


/* ANEXAR */

function anexarArquivo() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*,.pdf,.doc,.docx";

    input.click();

    input.onchange = function() {

        if (input.files.length > 0) {

            const arquivo = input.files[0];

            adicionarMensagem(
                "📎 " + arquivo.name,
                "sent"
            );

            salvarMensagens();
        }
    };
}


/* PESQUISA */

function pesquisarConversas() {

    const termo =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const chats = document.querySelectorAll(".chat");

    chats.forEach(chat => {

        const nome =
            chat
                .querySelector("strong")
                .textContent
                .toLowerCase();

        chat.style.display =
            nome.includes(termo)
                ? "flex"
                : "none";
    });
}


/* MENU */

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.style.display =
        menu.style.display === "flex"
            ? "none"
            : "flex";
}


/* LIMPAR */

function limparConversa() {

    const confirmacao =
        confirm("Deseja limpar esta conversa?");

    if (!confirmacao) return;

    document.getElementById("messages").innerHTML = `
        <div class="date">HOJE</div>
    `;

    localStorage.removeItem("chat_" + chatAtual);

    abrirMenu();
}


/* NOVO CHAT */

function novoChat() {

    const nome = prompt(
        "Digite o nome do novo contato:"
    );

    if (!nome || nome.trim() === "") return;

    const lista =
        document.getElementById("chatList");

    const div =
        document.createElement("div");

    div.className = "chat";

    div.onclick = function() {
        abrirChat(nome);
    };

    div.innerHTML = `
        <div class="avatar purple">👤</div>

        <div class="chat-info">

            <div class="chat-top">
                <strong>${nome}</strong>
                <small>agora</small>
            </div>

            <p id="preview-${nome}">
                Nova conversa
            </p>

        </div>
    `;

    lista.prepend(div);

    abrirChat(nome);
}


/* CONFIGURAÇÕES */

function abrirConfiguracoes() {

    alert(
        "⚙️ Configurações\n\n" +
        "• Perfil\n" +
        "• Privacidade\n" +
        "• Notificações\n" +
        "• Aparência\n" +
        "• Conversas"
    );
}


/* CONTATO */

function verContato() {

    alert(
        "👤 " + chatAtual +
        "\n\nStatus: online\n" +
        "Conversa protegida"
    );

    abrirMenu();
}


/* PESQUISAR MENSAGEM */

function pesquisarMensagem() {

    const palavra =
        prompt("Digite uma palavra para procurar:");

    if (!palavra) return;

    const mensagens =
        document.querySelectorAll(".message");

    let encontrou = false;

    mensagens.forEach(msg => {

        if (
            msg.innerText
                .toLowerCase()
                .includes(palavra.toLowerCase())
        ) {

            msg.style.outline =
                "3px solid #00a884";

            encontrou = true;

        } else {

            msg.style.outline = "none";
        }
    });

    if (!encontrou) {
        alert("Nenhuma mensagem encontrada.");
    }
}


/* SALVAR */

function salvarMensagens() {

    const mensagens =
        document.getElementById("messages").innerHTML;

    localStorage.setItem(
        "chat_" + chatAtual,
        mensagens
    );
}


/* CARREGAR */

function carregarMensagens() {

    const mensagens =
        localStorage.getItem(
            "chat_" + chatAtual
        );

    if (mensagens) {

        document.getElementById(
            "messages"
        ).innerHTML = mensagens;
    }
}


/* FECHAR PAINÉIS */

document.addEventListener("click", function(event) {

    const emojiPanel =
        document.getElementById("emojiPanel");

    const emojiButton =
        document.querySelector(".emoji-btn");

    if (
        !emojiPanel.contains(event.target) &&
        !emojiButton.contains(event.target)
    ) {
        emojiPanel.style.display = "none";
    }

});