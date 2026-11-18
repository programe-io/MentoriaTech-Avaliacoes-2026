// Seleciona o botão e o título da página
const botao = document.querySelector('button');
const titulo = document.querySelector('h1');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function() {
  // Exibe um alerta na tela
  alert('Você clicou no botão!');
  
  // Altera o texto e a cor do título
  titulo.textContent = 'Texto alterado com JavaScript!';
  titulo.style.color = '#27ae60';
});