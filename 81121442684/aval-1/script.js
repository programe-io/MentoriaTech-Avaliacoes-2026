
const mensagens = document.querySelector(".mensagens");
const campo = document.querySelector(".entrada input");
const botao = document.querySelector(".entrada button");

function adicionarMensagem(remetente, texto, tipo) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", tipo);

    const nome = document.createElement("strong");
    nome.textContent = remetente + ":";

    mensagem.appendChild(nome);
    mensagem.appendChild(document.createElement("br"));
    mensagem.appendChild(document.createTextNode(texto));

    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function responder(mensagem) {
    const texto = mensagem.toLowerCase();

    if (texto.includes("preço") || texto.includes("preco")) {
        return "Temos camisas a partir de R$ 49,90! Básica: R$ 49,90; Social: R$ 89,90; Esportiva: R$ 59,90.";
    }

    if (texto.includes("tamanho") || texto.includes("medida")) {
        return "Temos tamanhos P, M, G e GG. Qual tamanho você deseja?";
    }

    if (texto.includes("entrega") || texto.includes("frete")) {
        return "Fazemos entregas! Informe seu CEP para consultar as opções e o valor do frete.";
    }

    if (texto.includes("comprar") || texto.includes("pedido")) {
        return "Ótimo! Qual camisa você deseja comprar: Básica, Social ou Esportiva?";
    }

    if (texto.includes("básica") || texto.includes("basica")) {
        return "A Camisa Básica custa R$ 49,90. Qual tamanho você gostaria?";
    }

    if (texto.includes("social")) {
        return "A Camisa Social custa R$ 89,90. Qual tamanho você gostaria?";
    }

    if (texto.includes("esportiva")) {
        return "A Camisa Esportiva custa R$ 59,90. Qual tamanho você gostaria?";
    }

    if (texto.includes("pagamento") || texto.includes("pagar")) {
        return "Para confirmar as formas de pagamento disponíveis, fale com nossa equipe de vendas.";
    }

    if (
        texto.includes("oi") ||
        texto.includes("olá") ||
        texto.includes("ola") ||
        texto.includes("bom dia")
    ) {
        return "Olá! 👋 Bem-vindo à Camisas Store! Como posso ajudar você?";
    }

    if (texto.includes("obrigado") || texto.includes("obrigada")) {
        return "Nós agradecemos! 😊 Estamos à disposição.";
    }

    return "Não entendi muito bem. Você pode perguntar sobre preços, tamanhos, compras ou entregas.";
}

function enviarMensagem() {
    const texto = campo.value.trim();

    if (texto === "") {
        return;
    }

    adicionarMensagem("Você", texto, "cliente");
    campo.value = "";

    // Simula o tempo de resposta da loja
    botao.disabled = true;

    setTimeout(() => {
        const resposta = responder(texto);
        adicionarMensagem("Loja", resposta, "loja");
        botao.disabled = false;
        campo.focus();
    }, 500);
}

botao.addEventListener("click", enviarMensagem);

campo.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        enviarMensagem();
    }
});
