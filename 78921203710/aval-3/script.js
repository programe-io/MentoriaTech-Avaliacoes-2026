
/* LISTA DE CONTATOS */

const contatos = [
    {
        id: 1,
        nome: "Ana Clara",
        foto: "https://i.pravatar.cc/150?img=1",
        ultimaMensagem: "Boa noite ❤️",
        status: "online",
        mensagens: [
            {
                texto: "Oii, tudo bem?",
                tipo: "received",
                hora: "09:10"
            },
            {
                texto: "Tudo sim, e você?",
                tipo: "sent",
                hora: "09:12"
            },
            {
                texto: "Estou com saudades ❤️",
                tipo: "received",
                hora: "09:15"
            }
        ]
    },

    {
        id: 2,
        nome: "Lucas",
        foto: "https://i.pravatar.cc/150?img=3",
        ultimaMensagem: "Bora sair hoje?",
        status: "online",
        mensagens: [
            {
                texto: "Fala, irmão!",
                tipo: "received",
                hora: "08:30"
            },
            {
                texto: "Bora sair hoje?",
                tipo: "received",
                hora: "08:35"
            }
        ]
    },

    {
        id: 3,
        nome: "Marina",
        foto: "https://i.pravatar.cc/150?img=5",
        ultimaMensagem: "Que saudade!",
        status: "visto por último recentemente",
        mensagens: [
            {
                texto: "Amigooo!",
                tipo: "received",
                hora: "08:00"
            },
            {
                texto: "Que saudade!",
                tipo: "received",
                hora: "08:05"
            }
        ]
    },

    {
        id: 4,
        nome: "Pedro",
        foto: "https://i.pravatar.cc/150?img=8",
        ultimaMensagem: "KKKKKK 😂",
        status: "online",
        mensagens: [
            {
                texto: "Olha esse meme KKKKK",
                tipo: "received",
                hora: "07:40"
            },
            {
                texto: "KKKKKK 😂",
                tipo: "sent",
                hora: "07:42"
            }
        ]
    },

    {
        id: 5,
        nome: "Sofia",
        foto: "https://i.pravatar.cc/150?img=9",
        ultimaMensagem: "Te adoro 💗",
        status: "online",
        mensagens: [
            {
                texto: "Você é especial!",
                tipo: "received",
                hora: "07:20"
            },
            {
                texto: "Te adoro 💗",
                tipo: "received",
                hora: "07:22"
            }
        ]
    }
];


let contatoAtual = null;


/* ELEMENTOS */

const contacts = document.getElementById("contacts");

const chatArea = document.getElementById("chatArea");

const app = document.querySelector(".app-container");


/* LISTAR CONTATOS */

function carregarContatos(filtro = "") {

    contacts.innerHTML = "";

    contatos
        .filter(contato =>
            contato.nome.toLowerCase().includes(filtro.toLowerCase())
        )
        .forEach(contato => {

            const div = document.createElement("div");

            div.className =
                "contact " +
                (contatoAtual?.id === contato.id ? "active" : "");

            div.innerHTML = `
                <img src="${contato.foto}" alt="Foto">

                <div class="contact-info">
                    <h6>${contato.nome}</h6>
                    <p>${contato.mensagens.at(-1)?.texto || "Nova conversa"}</p>
                </div>

                <span class="contact-time">
                    ${contato.mensagens.at(-1)?.hora || ""}
                </span>
            `;

            div.addEventListener("click", () => {
                abrirConversa(contato.id);
            });

            contacts.appendChild(div);

        });

}


/* ABRIR CONVERSA */

function abrirConversa(id) {

    contatoAtual = contatos.find(c => c.id === id);

    app.classList.add("chat-open");

    renderizarConversa();

    carregarContatos(
        document.getElementById("searchContact").value
    );

}


/* RENDERIZAR CHAT */

function renderizarConversa() {

    if (!contatoAtual) return;

    chatArea.innerHTML = `

        <div class="chat-header">

            <button class="btn btn-light d-md-none"
            onclick="voltarContatos()">
                <i class="bi bi-arrow-left"></i>
            </button>

            <img src="${contatoAtual.foto}" alt="Foto">

            <div>
                <h6>${contatoAtual.nome}</h6>
                <p>${contatoAtual.status}</p>
            </div>

            <button class="btn btn-light"
            onclick="apagarConversa()">
                <i class="bi bi-trash"></i>
            </button>

        </div>

        <div class="messages" id="messages"></div>

        <form class="message-input" id="messageForm">

            <input
                type="text"
                id="messageText"
                placeholder="Digite uma mensagem..."
                autocomplete="off">

            <button type="submit">
                <i class="bi bi-send-fill"></i>
            </button>

        </form>

    `;

    atualizarMensagens();

    document.getElementById("messageForm")
        .addEventListener("submit", enviarMensagem);

}


/* MOSTRAR MENSAGENS */

function atualizarMensagens() {

    const messages = document.getElementById("messages");

    messages.innerHTML = "";

    contatoAtual.mensagens.forEach(msg => {

        const div = document.createElement("div");

        div.className = `message ${msg.tipo}`;

        const texto = document.createElement("span");
        texto.textContent = msg.texto;

        const hora = document.createElement("small");
        hora.textContent = msg.hora;

        div.appendChild(texto);
        div.appendChild(hora);

        messages.appendChild(div);

    });

    messages.scrollTop = messages.scrollHeight;

}


/* ENVIAR MENSAGEM */

function enviarMensagem(event) {

    event.preventDefault();

    const input = document.getElementById("messageText");

    const texto = input.value.trim();

    if (!texto) return;

    const agora = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    contatoAtual.mensagens.push({
        texto: texto,
        tipo: "sent",
        hora: agora
    });

    input.value = "";

    renderizarConversa();

    carregarContatos();

    /* RESPOSTA AUTOMÁTICA SIMULADA */

    const respostas = [
        "KKKKKK 😂",
        "Verdade!",
        "Entendi ❤️",
        "Opa, tudo bem!",
        "Também acho!",
        "Kkkkk, muito bom!"
    ];

    setTimeout(() => {

        if (!contatoAtual) return;

        contatoAtual.mensagens.push({
            texto: respostas[
                Math.floor(Math.random() * respostas.length)
            ],
            tipo: "received",
            hora: new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            })
        });

        if (contatoAtual.id === idContatoEmResposta) {
            renderizarConversa();
        }

        carregarContatos();

    }, 1500);

    const idContatoEmResposta = contatoAtual.id;

}


/* APAGAR CONVERSA */

function apagarConversa() {

    Swal.fire({
        title: "Apagar conversa?",
        text: "Todas as mensagens desta conversa serão apagadas.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#25d366",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {

            contatoAtual.mensagens = [];

            renderizarConversa();

            carregarContatos();

            Swal.fire(
                "Apagada!",
                "A conversa foi apagada.",
                "success"
            );

        }

    });

}


/* VOLTAR PARA CONTATOS */

function voltarContatos() {

    app.classList.remove("chat-open");

    contatoAtual = null;

    carregarContatos();

}


/* PESQUISAR CONTATOS */

document.getElementById("searchContact")
    .addEventListener("input", function () {

        carregarContatos(this.value);

    });


/* INICIALIZAR */

carregarContatos();

