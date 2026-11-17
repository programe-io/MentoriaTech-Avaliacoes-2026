
let contatoAtual = "";

function abrirChat(nome) {
    contatoAtual = nome;

    document.getElementById("nomeContato").innerText =
        "💬 " + nome;

    document.getElementById("mensagens").innerHTML = "";
}

function enviarMensagem() {
    const campo = document.getElementById("mensagem");
    const texto = campo.value.trim();

    if (texto === "") {
        return;
    }

    if (contatoAtual === "") {
        alert("Escolha um contato primeiro!");
        return;
    }

    const mensagens = document.getElementById("mensagens");

    const balao = document.createElement("div");
    balao.className = "balao";
    balao.textContent = texto;

    mensagens.appendChild(balao);

    campo.value = "";
    mensagens.scrollTop = mensagens.scrollHeight;
}

document.getElementById("mensagem")
.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

document.getElementById("pesquisa")
.addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".contato").forEach(contato => {
        contato.style.display =
            contato.innerText.toLowerCase().includes(busca)
            ? "flex" : "none";
    });
});
