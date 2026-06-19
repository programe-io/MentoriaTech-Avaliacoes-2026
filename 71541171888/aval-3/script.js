function mostrarMensagem() {
  const mensagens = [
    "Recomendação: Ouça um sertanejo hoje!",
    "Recomendação: Assista uma série de ficção científica!",
    "Recomendação: Veja um filme de ação!",
    "Recomendação: Escute um forró animado!"
  ];

  const random = Math.floor(Math.random() * mensagens.length);
  document.getElementById("mensagem").innerText = mensagens[random];
}