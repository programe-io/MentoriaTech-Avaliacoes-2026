const senhaCorreta = "1234";
let tentativas = 0;
const maxTentativas = 3;

function verificarSenha() {
  const input = document.getElementById("senha");
  const mensagem = document.getElementById("mensagem");
  const senhaDigitada = input.value;

  if (tentativas >= maxTentativas) {
    mensagem.textContent = "Acesso bloqueado!";
    mensagem.className = "mensagem erro";
    return;
  }

  if (senhaDigitada === senhaCorreta) {
    mensagem.textContent = "Bem-vindo! Acesso permitido.";
    mensagem.className = "mensagem sucesso";
  } else {
    tentativas++;
    const restantes = maxTentativas - tentativas;

    if (restantes > 0) {
      mensagem.textContent = "Senha incorreta! Tentativas restantes: " + restantes;
      mensagem.className = "mensagem erro";
    } else {
      mensagem.textContent = "Acesso bloqueado! Número máximo de tentativas excedido.";
      mensagem.className = "mensagem erro";
    }
  }

  input.value = "";
  input.focus();
}