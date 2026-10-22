
const mensagens = document.getElementById("mensagens");
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");

const produtos = {
    "camisa básica": "R$ 39,90",
    "camisa polo": "R$ 59,90",
    "camisa estampada": "R$ 49,90"
};

function adicionarMensagem(texto, tipo) {
    const div = document.createElement("div");
    div.className = "msg " + tipo;
    div.textContent = texto;

    mensagens.appendChild(div);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function escolherProduto(nome) {
    adicionarMensagem("Quero saber mais sobre " + nome, "usuario");

    const chave = nome.toLowerCase();
    const preco = produtos[chave];

    adicionarMensagem(
        nome + "\nPreço: " + preco +
        "\n\nTemos interesse em ajudar você a comprar! " +
        "Qual tamanho você deseja: P, M, G ou GG?",
        "bot"
    );
}

function responder(texto) {
    const pergunta = texto.toLowerCase();

    if (
        pergunta.includes("oi") ||
        pergunta.includes("olá") ||
        pergunta.includes("ola")
    ) {
        return "Olá! 👕 Bem-vindo à CamisaStore! Você procura uma camisa básica, polo ou estampada?";
    }

    if (
        pergunta.includes("preço") ||
        pergunta.includes("preco") ||
        pergunta.includes("valor")
    ) {
        return "Confira nossos modelos:\n\n👕 Camisa básica: R$ 39,90\n👔 Camisa polo: R$ 59,90\n🎽 Camisa estampada: R$ 49,90\n\nQual modelo você deseja?";
    }

    if (
        pergunta.includes("tamanho") ||
        pergunta.includes("tamanhos")
    ) {
        return "📏 Trabalhamos com os tamanhos P, M, G e GG como opções demonstrativas. Qual tamanho você procura? Consulte a disponibilidade antes de comprar.";
    }

    if (
        pergunta.includes("comprar") ||
        pergunta.includes("pedido")
    ) {
        return "🛍️ Vamos preparar seu pedido! Escolha um modelo, informe o tamanho e diga a cor que você deseja.";
    }

    if (pergunta.includes("básica") || pergunta.includes("basica")) {
        return "👕 Camisa básica por R$ 39,90. Qual tamanho e cor você prefere?";
    }

    if (pergunta.includes("polo")) {
        return "👔 Camisa polo por R$ 59,90. Qual tamanho e cor você prefere?";
    }

    if (pergunta.includes("estampada")) {
        return "🎽 Camisa estampada por R$ 49,90. Você prefere qual tamanho?";
    }

    if (
        pergunta.includes("p") ||
        pergunta.includes("m") ||
        pergunta.includes("g") ||
        pergunta.includes("gg")
    ) {
        return "Anotado! 😊 Agora informe o modelo e a cor da camisa para continuar seu pedido.";
    }

    if (
        pergunta.includes("obrigado") ||
        pergunta.includes("obrigada")
    ) {
        return "Obrigado pela preferência! 💜 A CamisaStore agradece sua visita.";
    }

    return "😊 Posso ajudar com modelos, preços, tamanhos e compras. O que você gostaria de saber?";
}

function enviarMensagem() {
    const texto = entrada.value.trim();

    if (!texto) return;

    adicionarMensagem(texto, "usuario");
    entrada.value = "";

    setTimeout(() => {
        adicionarMensagem(responder(texto), "bot");
    }, 400);
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    enviarMensagem();
});

function respostaRapida(texto) {
    adicionarMensagem(texto, "usuario");

    setTimeout(() => {
        adicionarMensagem(responder(texto), "bot");
    }, 400);
}
