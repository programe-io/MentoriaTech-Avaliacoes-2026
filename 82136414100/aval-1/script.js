
const mensagens = document.getElementById("mensagens");
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");

// Adiciona mensagens ao chat
function adicionarMensagem(texto, tipo) {
    const mensagem = document.createElement("div");

    mensagem.classList.add("msg", tipo);
    mensagem.textContent = texto;

    mensagens.appendChild(mensagem);
    mensagens.scrollTop = mensagens.scrollHeight;
}

// Respostas automáticas do atendimento
function responder(pergunta) {
    const texto = pergunta.toLowerCase();

    if (
        texto.includes("oi") ||
        texto.includes("olá") ||
        texto.includes("ola") ||
        texto.includes("bom dia")
    ) {
        return "Olá! 🐎 Bem-vindo à HorseVendas! Você quer comprar um cavalo, vender seu animal ou consultar preços?";
    }

    if (
        texto.includes("comprar") ||
        texto.includes("quero um cavalo")
    ) {
        return "Ótimo! 🐴 Qual raça você procura? Temos opções como Quarto de Milha, Mangalarga Marchador e Pônei. Qual é sua preferência?";
    }

    if (
        texto.includes("vender") ||
        texto.includes("anunciar")
    ) {
        return "Você quer anunciar seu cavalo? Informe a raça, idade, cidade e preço desejado para preparar seu anúncio.";
    }

    if (
        texto.includes("preço") ||
        texto.includes("preco") ||
        texto.includes("valor") ||
        texto.includes("quanto custa")
    ) {
        return "O preço varia conforme raça, idade, treinamento, saúde e linhagem. 🐎 Qual raça você deseja consultar?";
    }

    if (
        texto.includes("quarto de milha")
    ) {
        return "🐎 Quarto de Milha: muito procurado para esportes e trabalho no campo. Consulte o vendedor para saber os preços e os animais disponíveis.";
    }

    if (
        texto.includes("mangalarga")
    ) {
        return "🐴 Mangalarga Marchador: conhecido por sua marcha confortável. Você procura um animal para passeio, criação ou trabalho?";
    }

    if (
        texto.includes("pônei") ||
        texto.includes("ponei")
    ) {
        return "🐴 Temos interesse em ajudar você a encontrar um pônei adequado. Qual é a finalidade da compra e em qual cidade você está?";
    }

    if (
        texto.includes("cidade") ||
        texto.includes("localização") ||
        texto.includes("localizacao")
    ) {
        return "📍 Informe sua cidade e estado para facilitar a busca por vendedores de cavalos na sua região.";
    }

    if (
        texto.includes("obrigado") ||
        texto.includes("obrigada")
    ) {
        return "Por nada! 😊 A HorseVendas agradece seu contato. Estamos aqui para ajudar!";
    }

    return "Obrigado por entrar em contato com a HorseVendas! 🐎 Você deseja comprar, vender, consultar preços ou conhecer as raças disponíveis?";
}

// Envia a mensagem digitada
function enviarMensagem() {
    const texto = entrada.value.trim();

    if (texto === "") {
        return;
    }

    adicionarMensagem(texto, "usuario");
    entrada.value = "";

    const resposta = responder(texto);

    setTimeout(function() {
        adicionarMensagem(resposta, "bot");
    }, 400);
}

// Envio pelo formulário
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    enviarMensagem();
});

// Botões de atendimento rápido
function respostaRapida(texto) {
    adicionarMensagem(texto, "usuario");

    setTimeout(function() {
        adicionarMensagem(responder(texto), "bot");
    }, 400);
}

// Seleção de cavalos
function escolherCavalo(nome) {
    const texto = "Quero saber mais sobre " + nome;

    adicionarMensagem(texto, "usuario");

    setTimeout(function() {
        adicionarMensagem(responder(texto), "bot");
    }, 400);
}
