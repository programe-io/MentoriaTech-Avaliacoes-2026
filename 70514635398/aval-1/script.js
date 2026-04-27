let senhaCorreta = "6784";
let tentativasRestantes = 3;

function validarSenha() {
  let tentativa = document.getElementById("senha").value;
  let mensagem = document.getElementById("mensagem");

  if (tentativasRestantes <= 0) {
    mensagem.textContent = "Acesso bloqueado!";
    mensagem.className = "mensagem erro";
    return;
  }

  if (tentativa === senhaCorreta) {
    mensagem.textContent = "Bem-vindo! Acesso permitido.";
    mensagem.className = "mensagem sucesso";
  } else {
    tentativasRestantes--;

    if (tentativasRestantes > 0) {
      mensagem.textContent = "Senha incorreta! Tentativas restantes: " + tentativasRestantes;
      mensagem.className = "mensagem erro";
    } else {
      mensagem.textContent = "Acesso bloqueado! Número máximo de tentativas excedido.";
      mensagem.className = "mensagem erro";
    }
  }

  document.getElementById("senha").value = "";
}