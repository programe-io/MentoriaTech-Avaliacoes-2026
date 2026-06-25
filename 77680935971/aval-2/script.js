function curtirPost(botao) {
  botao.innerText = "Curtido ❤️";
  botao.style.background = "#ff3e6c";
}

function enviarMensagem(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let resposta = document.getElementById("resposta");

  resposta.innerText = `Obrigado pela mensagem, ${nome}! 🍰 Responderemos em breve.`;
}