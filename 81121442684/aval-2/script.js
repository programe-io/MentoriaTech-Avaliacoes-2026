
const mensagens = document.querySelector(".mensagens");
const entrada = document.querySelector(".entrada input");
const botaoEnviar = document.querySelector(".entrada button");

// Adicionar mensagem ao chat
function adicionarMensagem(texto, tipo) {
  const mensagem = document.createElement("div");
  mensagem.classList.add("mensagem", tipo);
  mensagem.textContent = texto;

  mensagens.appendChild(mensagem);
  mensagens.scrollTop = mensagens.scrollHeight;
}

// Respostas automáticas da loja
function responder(texto) {
  const pergunta = texto.toLowerCase();

  if (
    pergunta.includes("oi") ||
    pergunta.includes("olá") ||
    pergunta.includes("ola")
  ) {
    return "Olá! 👋 Bem-vindo à nossa loja de calções!";
  }

  if (pergunta.includes("preço") || pergunta.includes("preco")) {
    return "Temos calções a partir de R$ 39,90. 🩳";
  }

  if (pergunta.includes("modelo") || pergunta.includes("calção") ||
      pergunta.includes("calcoes") || pergunta.includes("calções")) {
    return "Temos calção desportivo por R$ 39,90, casual por R$ 49,90 e premium por R$ 69,90!";
  }

  if (pergunta.includes("tamanho")) {
    return "Temos tamanhos P, M, G e GG. Consulte a disponibilidade!";
  }

  if (pergunta.includes("entrega") || pergunta.includes("frete")) {
    return "Fazemos pedidos para entrega! Consulte o valor e o prazo com a loja.";
  }

  if (pergunta.includes("comprar") || pergunta.includes("pedido")) {
    return "Ótimo! 🛍️ Escolha um modelo e informe o tamanho desejado.";
  }

  if (pergunta.includes("obrigado") || pergunta.includes("obrigada")) {
    return "Nós é que agradecemos! 😊 Volte sempre!";
  }

  return "Obrigado pela mensagem! 😊 Pergunte sobre preços, modelos, tamanhos ou entrega.";
}

// Enviar mensagem
function enviarMensagem() {
  const texto = entrada.value.trim();

  if (texto === "") return;

  adicionarMensagem(texto, "cliente");
  entrada.value = "";

  // Simular resposta da loja
  setTimeout(() => {
    adicionarMensagem(responder(texto), "loja");
  }, 500);
}

// Clique no botão Enviar
botaoEnviar.addEventListener("click", enviarMensagem);

// Enviar também ao pressionar Enter
entrada.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    enviarMensagem();
  }
});

// Comprar um produto
function comprar(nome, preco) {
  adicionarMensagem("Quero comprar: " + nome, "cliente");

  adicionarMensagem(
    "Excelente escolha! 🩳 " + nome +
    " custa R$ " + preco.toFixed(2).replace(".", ",") +
    ". Qual é o tamanho desejado: P, M, G ou GG?",
    "loja"
  );
}
