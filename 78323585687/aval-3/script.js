const botao = document.getElementById('botaoMensagem');
 const saida = document.getElementById('saida');
  botao.addEventListener('click', () => {
     saida.textContent = 'Você clicou no botão! Tudo funcionou!';
      });