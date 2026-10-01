// Aguarda o clique no botão para exibir a mensagem oculta
document.getElementById('botao-acao').addEventListener('click', function() {
  const mensagem = document.getElementById('mensagem');
  
  // Alterna a exibição da mensagem
  if (mensagem.classList.contains('escondido')) {
    mensagem.classList.remove('escondido');
    this.innerText = 'Fechar';
  } else {
    mensagem.classList.add('escondido');
    this.innerText = 'Clique Aqui';
  }
});
