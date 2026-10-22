
const mensagens = document.getElementById("mensagens");
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");

const produtos = {
    "tênis esportivo": "R$ 149,90",
    "sapato social": "R$ 199,90",
    "sandália": "R$ 69,90"
};

function adicionarMensagem(texto, tipo) {
    const div = document.createElement("div");
    div.className = "msg " + tipo;
    div.textContent = texto;

    mensagens.appendChild(div);
    mensagens.scrollTop = mensagens.scrollHeight;
}

function escolherProduto(nome) {
    adicionarMensagem(
        "Quero saber mais sobre " + nome,
        "usuario"
    );

    adicionarMensagem(
        nome + "\nPreço: " + produtos[nome.toLowerCase()] +
        "\n\nQual número você calça? Temos opções demonstrativas do 35 ao 44. Consulte a disponibilidade do modelo.",
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
        return "Olá! 👟 Bem-vindo à ShoeStore! Você procura tênis esportivo, sapato social ou sandália?";
    }

    if (
        pergunta.includes("preço") ||
        pergunta.includes("preco") ||
        pergunta.includes("valor")
    ) {
        return "Confira nossos modelos:\n\n👟 Tênis esportivo: R$ 149,90\n👞 Sapato social: R$ 199,90\n🩴 Sandália: R$ 69,90\n\nQual deles você deseja?";
    }

    if (
        pergunta.includes("tamanho") ||
        pergunta.includes("número") ||
        pergunta.includes("numero")
    ) {
        return "📏 Temos numerações demonstrativas do 35 ao 44. Qual número você calça? A disponibilidade precisa ser confirmada.";
    }

    if (
        pergunta.includes("comprar") ||
        pergunta.includes("pedido")
    ) {
        return "🛍️ Vamos começar sua compra! Escolha um modelo e informe o número que você calça e a cor desejada.";
    }

    if (
        pergunta.includes("tênis") ||
        pergunta.includes("tenis")
    ) {
        return "👟 Tênis esportivo por R$ 149,90. Qual numeração e cor você prefere?";
    }

    if (pergunta.includes("social")) {
        return "👞 Sapato social por R$ 199,90. Você prefere preto ou marrom? Informe também sua numeração.";
    }

    if (pergunta.includes("sandália") || pergunta.includes("sandalia")) {
        return "🩴 Sandália por R$ 69,90. Qual número você procura?";
    }

    if (
        pergunta.includes("preto") ||
        pergunta.includes("marrom") ||
        pergunta.includes("branco")
    ) {
        return "Ótima escolha! 😊 Anotei a cor desejada. Qual modelo e numeração você quer consultar?";
    }

    if (
        pergunta.includes("obrigado") ||
        pergunta.includes("obrigada")
    ) {
        return "Obrigado pela preferência! 💙 A ShoeStore agradece sua visita.";
    }

    return "😊 Posso ajudar com modelos, preços, numerações e compras. O que você gostaria de saber?";
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
