
const botao = document.getElementById("enviar");

botao.addEventListener("click", function () {
  const aluno = document.getElementById("aluno").value.trim();
  const atividade = document.getElementById("atividade").value.trim();
  const codigo = document.getElementById("codigo").value.trim();
  const revisado = document.getElementById("revisado").checked;
  const mensagem = document.getElementById("mensagem");

  if (!aluno || !atividade || !codigo) {
    mensagem.style.color = "#f87171";
    mensagem.textContent =
      "Preencha todos os campos antes de continuar.";
    return;
  }

  if (!revisado) {
    mensagem.style.color = "#fbbf24";
    mensagem.textContent =
      "Marque a confirmação de revisão do seu trabalho.";
    return;
  }

  mensagem.style.color = "#4ade80";
  mensagem.textContent =
    "Tudo certo, " + aluno + "! Sua avaliação foi validada. " +
    "Agora compartilhe o projeto com seu professor.";
});
