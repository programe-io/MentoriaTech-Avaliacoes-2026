
const pessoas = [
    {
        nome: "Ana",
        foto: "https://randomuser.me/api/portraits/women/1.jpg",
        mensagens: [
            ["Oii amiga! 💜", "received"],
            ["Tudo bem com você?", "received"]
        ]
    },
    {
        nome: "Lucas",
        foto: "https://randomuser.me/api/portraits/men/2.jpg",
        mensagens: [
            ["Vamos sair hoje? 😎", "received"]
        ]
    },
    {
        nome: "Julia",
        foto: "https://randomuser.me/api/portraits/women/3.jpg",
        mensagens: [
            ["Amiga, tenho uma novidade!", "received"]
        ]
    },
    {
        nome: "Pedro",
        foto: "https://randomuser.me/api/portraits/men/4.jpg",
        mensagens: [
            ["Bom dia! ☀️", "received"]
        ]
    },
    {
        nome: "Mariana",
        foto: "https://randomuser.me/api/portraits/women/5.jpg",
        mensagens: [
            ["Saudades de você ❤️", "received"]
        ]
    },
    {
        nome: "Gabriel",
        foto: "https://randomuser.me/api/portraits/men/6.jpg",
        mensagens: [
            ["Está por aí?", "received"]
        ]
    },
    {
        nome: "Beatriz",
        foto: "https://randomuser.me/api/portraits/women/7.jpg",
        mensagens: [
            ["Vamos fazer alguma coisa?", "received"]
        ]
    },
    {
        nome: "Rafael",
        foto: "https://randomuser.me/api/portraits/men/8.jpg",
        mensagens: [
            ["Oi! Como foi seu dia?", "received"]
        ]
    },
    {
        nome: "Sofia",
        foto: "https://randomuser.me/api/portraits/women/9.jpg",
        mensagens: [
            ["Amei sua foto! 😍", "received"]
        ]
    },
    {
        nome: "Miguel",
        foto: "https://randomuser.me/api/portraits/men/10.jpg",
        mensagens: [
            ["Depois vamos conversar!", "received"]
        ]
    }
];

let contatoAtual = 0;

const respostas = [
    "Oii! 💜",
    "Tudo bem sim!",
    "Kkkkk verdade 😂",
    "Que legal!",
    "Também acho! ❤️",
    "Me conta mais!",
    "Estou com saudades!",
    "Vamos sim! 😍",
    "Combinado!",
    "Hahaha adorei!"
];

function hora() {
    return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Criar lista de contatos
function carregarContatos() {
    const lista = document.getElementById("contatos");
    lista.innerHTML = "";

    pessoas.forEach((pessoa, indice) => {
        const div = document.createElement("div");
        div.className = "contact";

        div.innerHTML = `
            <img src="${pessoa.foto}" alt="Foto de perfil">
            <div>
                <strong>${pessoa.nome}</strong>
                <p class="previa"></p>
            </div>
        `;

        div.addEventListener("click", () => abrirChat(indice));

        lista.appendChild(div);
    });
}

// Abrir conversa
function abrirChat(indice) {
    contatoAtual = indice;

    const pessoa = pessoas[indice];

    document.getElementById("nomeContato").textContent = pessoa.nome;
    document.getElementById("fotoContato").src = pessoa.foto;
    document.getElementById("statusContato").textContent = "Online";

    document.querySelectorAll(".contact").forEach((c, i) => {
        c.classList.toggle("active", i === indice);
    });

    mostrarMensagens();
}

// Mostrar mensagens
function mostrarMensagens() {
    const area = document.getElementById("mensagens");
    area.innerHTML = "";

    const pessoa = pessoas[contatoAtual];

    pessoa.mensagens.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + msg.tipo;

        const texto = document.createElement("div");
        texto.textContent = msg.texto;

        const horario = document.createElement("span");
        horario.className = "time";
        horario.textContent = msg.hora || hora();

        div.appendChild(texto);
        div.appendChild(horario);
        area.appendChild(div);
    });

    area.scrollTop = area.scrollHeight;
}

// Enviar mensagem
document.getElementById("formMensagem")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const campo = document.getElementById("mensagem");
    const texto = campo.value.trim();

    if (!texto) return;

    const pessoa = pessoas[contatoAtual];

    pessoa.mensagens.push({
        texto: texto,
        tipo: "sent",
        hora: hora()
    });

    campo.value = "";

    mostrarMensagens();
    atualizarContatos();

    const indiceResposta = contatoAtual;

    // Resposta automática
    setTimeout(() => {
        const resposta = respostas[
            Math.floor(Math.random() * respostas.length)
        ];

        pessoas[indiceResposta].mensagens.push({
            texto: resposta,
            tipo: "received",
            hora: hora()
        });

        atualizarContatos();

        if (contatoAtual === indiceResposta) {
            mostrarMensagens();
        }

    }, 1500);
});

// Atualizar prévias
function atualizarContatos() {
    document.querySelectorAll(".contact").forEach((div, i) => {
        const mensagens = pessoas[i].mensagens;
        const ultima = mensagens[mensagens.length - 1];

        div.querySelector(".previa").textContent = ultima
            ? ultima.texto
            : "Nenhuma mensagem";
    });
}

// Pesquisar pessoas
document.getElementById("pesquisa")
.addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".contact").forEach((div, i) => {
        div.style.display = pessoas[i].nome
            .toLowerCase()
            .includes(busca) ? "flex" : "none";
    });
});

// Inicializar
carregarContatos();
abrirChat(0);
atualizarContatos();
