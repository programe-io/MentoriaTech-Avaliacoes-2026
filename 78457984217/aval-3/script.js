const campo = document.getElementById("texto");
const mensagens = document.getElementById("mensagens");

function adicionarMensagem(texto, classe) {
    const mensagem = document.createElement("div");

    mensagem.className = "mensagem " + classe;
    mensagem.textContent = texto;

    mensagens.appendChild(mensagem);

    mensagens.scrollTop = mensagens.scrollHeight;
}

function responder(texto) {
    const mensagem = texto.toLowerCase();

    if (mensagem.includes("oi") || mensagem.includes("olá")) {
        return "Olá! 😃 Que bom conversar com você!";
    }

    if (mensagem.includes("nome")) {
        return "Meu nome é CyberBot! 🤖";
    }

    if (mensagem.includes("tudo bem")) {
        return "Estou funcionando perfeitamente! E você?";
    }

    if (mensagem.includes("hora")) {
        return "Agora são " +
            new Date().toLocaleTimeString("pt-BR");
    }

    if (mensagem.includes("data")) {
        return "Hoje é " +
            new Date().toLocaleDateString("pt-BR");
    }

    if (mensagem.includes("ajuda")) {
        return "Você pode perguntar meu nome, a hora, a data ou dizer oi!";
    }

    if (mensagem.includes("obrigado")) {
        return "Por nada! Sempre que precisar, estarei aqui! ❤️";
    }

    if (mensagem.includes("tchau")) {
        return "Até logo! Foi ótimo conversar com você! 👋";
    }

    return "Interessante! 😎 Ainda estou aprendendo a responder isso.";
}

function enviar() {
    const texto = campo.value.trim();

    if (!texto) return;

    adicionarMensagem(texto, "usuario");

    campo.value = "";

    setTimeout(() => {
        const resposta = responder(texto);
        adicionarMensagem(resposta, "bot");
    }, 500);
}

campo.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enviar();
    }
});