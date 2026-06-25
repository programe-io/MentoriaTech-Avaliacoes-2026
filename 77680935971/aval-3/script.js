function curtirPost(botao) {
  botao.innerText = "Curtido ❤️";
  botao.style.background = "#a29bfe";
}

function enviarMensagem(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let resposta = document.getElementById("resposta");

  resposta.innerText = `Obrigado pela mensagem, ${nome}! 🎵 Em breve entraremos em contato.`;
}