const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
  mensagem.textContent = "Código executado com sucesso!";
    mensagem.style.color = "green";
      mensagem.style.fontWeight = "bold";
      });
      