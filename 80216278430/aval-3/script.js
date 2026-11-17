
let contatoAtual = "Ana";

const conversas = {
    Ana: [
        { texto: "Oii! Tudo bem? 💜", tipo: "received" },
        { texto: "Oi Ana! Tudo sim e você?", tipo: "sent" },
        { texto: "Estou ótima! ❤️", tipo: "received" }
    ],
    Lucas: [
        { texto: "Vamos sair hoje?", tipo: "received" }
    ],
    Julia: [
        { texto: "Adorei a foto! 😍", tipo: "received" }
    ],
    Pedro: [
        { texto: "Bom dia! ☀️", tipo: "received" }
    ],
    Mariana: [
        { texto: "Até amanhã ❤️", tipo: "received" }
    ],
    Gabriel: [
        { texto: "Me chama depois!", tipo: "received" }
    ]
};

const respostas = {
    Ana: [
        "Oii amiga! 💜",
        "Que legal! Me conta mais!",
        "Também acho! ❤️",
        "Kkkkk verdade!",
        "Estou com saudades!"
    ],
    Lucas: [
        "Bora sim! 😎",
        "Que horas?",
        "Fechado!",
        "Kkkkk pode deixar!"
    ],
    Julia: [
        "Amei conversar com você!",
        "Você é incrível! 💜",
        "Vamos marcar alguma coisa?"
    ],
    Pedro: [
        "Tudo certo por aqui!",
        "Kkkkk verdade!",
        "Depois te conto!"
    ],
    Mariana: [
        "Também te adoro! ❤️",
        "Combinado!",
        "Até mais!"
    ],
    Gabriel: [
        "Pode deixar!",
        "Estou online!",
        "Beleza 😁"
    ]
};

function mostrarMensagens() {
    const area = document.getElementById("mensagens");

    area.innerHTML = "";

    conversas[contatoAtual].forEach(msg => {
        const div = document.createElement("div");

        div.className = "message " + msg.tipo;

        const texto = document.createElement("span");
        texto.textContent = msg.texto;

        const horario = document.createElement("span");
        horario.className = "time";
        horario.textContent = msg.hora || horaAtual();

        div.appendChild(texto);
        div.appendChild(horario);

        area.appendChild(div);
    });

    area.scrollTop = area.scrollHeight;
}

function horaAtual() {
    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function abrirChat(nome, emoji) {
    contatoAtual = nome;

    document.getElementById("nomeContato").textContent = nome;
    document.getElementById("fotoContato").textContent = emoji;

    document.querySelectorAll(".contact").forEach(c => {
        c.classList.remove("active");

        if (c.querySelector("strong").textContent === nome) {
            c.classList.add("active");
        }
    });

    mostrarMensagens();
}

document.getElementById("formMensagem")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const campo = document.getElementById("mensagem");
    const texto = campo.value.trim();

    if (!texto) return;

    conversas[contatoAtual].push({
        texto: texto,
        tipo: "sent",
        hora: horaAtual()
    });

    campo.value = "";
    mostrarMensagens();

    // Simula uma resposta do contato
    const contato = contatoAtual;

    setTimeout(() => {
        if (contato !== contatoAtual) {
            // A resposta será exibida ao abrir a conversa
        }

        const lista = respostas[contato];

        const resposta = lista[
            Math.floor(Math.random() * lista.length)
        ];

        conversas[contato].push({
            texto: resposta,
            tipo: "received",
            hora: horaAtual()
        });

        if (contato === contatoAtual) {
            mostrarMensagens();
        }

        atualizarPrevia(contato, resposta);

    }, 1200);
});

function atualizarPrevia(nome, texto) {
    document.querySelectorAll(".contact").forEach(c => {
        if (c.querySelector("strong").textContent === nome) {
            c.querySelector("p").textContent = texto;
        }
    });
}

function verStatus(nome) {
    if (nome === "Seu status") {
        alert("Aqui você poderá publicar seu próprio status! 💜");
        return;
    }

    const status = {
        Ana: "Oi gente! 💜 Aproveitando o dia!",
        Lucas: "Um dia incrível! 😎",
        Julia: "Espalhando alegria! ✨"
    };

    alert(nome + ": " + (status[nome] || "Novo status!"));
}

// Pesquisa de contatos
document.getElementById("pesquisa")
.addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".contact").forEach(c => {
        const nome = c.querySelector("strong")
        .textContent.toLowerCase();

        c.style.display = nome.includes(busca)
            ? "flex"
            : "none";
    });
});

// Abre a conversa inicial
mostrarMensagens();
