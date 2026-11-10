let botao = document.getElementById("botao");
let mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
  mensagem.textContent = "Você clicou! Obrigada por visitar minha página";
    mensagem.style.color = "#ff1493";
      mensagem.style.fontWeight = "bold";
      });