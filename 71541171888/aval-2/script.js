function mostrarMensagem() {
  const mensagens = [
    "Você é capaz de conquistar seus sonhos!",
    "Continue estudando!",
    "Seu futuro depende do seu esforço hoje!",
    "Nunca desista dos seus objetivos!"
  ];

  const random = Math.floor(Math.random() * mensagens.length);
  document.getElementById("mensagem").innerText = mensagens[random];
}