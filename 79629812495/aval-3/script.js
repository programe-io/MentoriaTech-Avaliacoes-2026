
let conversaAtual = "João";

const historico = {
    João: [
        { texto: "Oi, tudo bem?", tipo: "recebida" },
        { texto: "Tudo sim! E você?", tipo: "enviada" },
        { texto: "Estou bem também!", tipo: "recebida" }
    ],
    Maria: [
        { texto: "Vamos sair hoje?", tipo: "recebida" }
    ],
    Pedro: [
        { texto: "Até amanhã!", tipo: "recebida" }
    ],
    Ana: [
        { texto: "Bom dia!", tipo: "recebida" }
    ]
};

function abrirChat(nome) {
    conversaAtual = nome;

    document.getElementById("nomeChat").textContent = nome;
    document.getElementById("avatarChat").textContent =
        nome.charAt(0);

    document.querySelectorAll(".contato").forEach(contato => {
        contato.classList.toggle(
            "ativo",
            contato.querySelector("h3").textContent === nome
        );
    });

    mostrarMensagens();
}

function mostrarMensagens() {
    const area = document.getElementById("mensagens");
    area.innerHTML = "";

    historico[conversaAtual].forEach(msg => {
        const div = document.createElement("div");
        div.className = msg.tipo;
        div.textContent = msg.texto;
        area.appendChild(div);
    });

    area.scrollTop = area.scrollHeight;
}

function enviarMensagem() {
    const input = document.getElementById("mensagem");
    const texto = input.value.trim();

    if (texto === "") return;

    historico[conversaAtual].push({
        texto: texto,
        tipo: "enviada"
    });

    mostrarMensagens();
    input.value = "";
    input.focus();
}

document.getElementById("mensagem")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

document.getElementById("pesquisa")
.addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".contato").forEach(contato => {
        const nome = contato.querySelector("h3")
            .textContent.toLowerCase();

        contato.style.display = nome.includes(busca)
            ? "flex" : "none";
    });
});
