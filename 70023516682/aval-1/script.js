// Jogo de comunicação simples em JavaScript puro

let mensagemOriginal = "";

alert("🎮 Jogo da Comunicação iniciado!");

function iniciarJogo() {
  mensagemOriginal = prompt("Digite uma mensagem secreta:");

  let transmitida = embaralharMensagem(mensagemOriginal);

  alert("📡 Mensagem transmitida (com ruído):\n" + transmitida);

  let tentativa = prompt("🔎 Tente reconstruir a mensagem:");

  if (tentativa === mensagemOriginal) {
    alert("✅ Correto! Comunicação perfeita!");
  } else {
    alert("❌ Erro de comunicação!\nA mensagem correta era: " + mensagemOriginal);
  }

  let jogarNovamente = confirm("Deseja jogar novamente?");
  if (jogarNovamente) {
    iniciarJogo();
  } else {
    alert("👋 Fim do jogo!");
  }
}

// Função que simula ruído na comunicação
function embaralharMensagem(msg) {
  return msg
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// Iniciar jogo
iniciarJogo();