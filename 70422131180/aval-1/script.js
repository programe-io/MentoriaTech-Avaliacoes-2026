let senhaCorreta = "6767";
let tentativas = 3;

function verificar() {
  let senha = document.getElementById("senha").value;
  let msg = document.getElementById("msg");

  if (tentativas <= 0) {
    msg.innerHTML = "🚫 Acesso bloqueado!";
    return;
  }

  if (senha === senhaCorreta) {
    msg.innerHTML = "✅ Acesso liberado! Bem-vindo!";
  } else {
    tentativas--;

    if (tentativas > 0) {
      msg.innerHTML = "❌ Senha incorreta! Tentativas restantes: " + tentativas;
    } else {
      msg.innerHTML = "🚫 Acesso bloqueado!";
    }
  }
}