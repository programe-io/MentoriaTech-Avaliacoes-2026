let senhaCorreta = 2008;
let tentativasRestantes = 3;

const botao = document.getElementById("btnEntrar");

botao.addEventListener("click", function () {
  let senhaDigitada = Number(document.getElementById("senha").value);
  let mensagem = document.getElementById("mensagem");

  if (tentativasRestantes > 0) {
    if (senhaDigitada === senhaCorreta) {
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
        document.getElementById("senha").disabled = true;
        botao.disabled = true;
      }
    }
  }
});