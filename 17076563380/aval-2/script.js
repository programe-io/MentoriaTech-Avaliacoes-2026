// Aguarda o carregamento do DOM para rodar os scripts
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os botões de curtir
  const likeButtons = document.querySelectorAll('.btn-like');

  likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Pega o elemento do contador de curtidas dentro do botão clicado
      const countSpan = button.querySelector('.like-count');
      let currentLikes = parseInt(countSpan.textContent);
      
      // Incrementa e atualiza o valor na tela
      countSpan.textContent = currentLikes + 1;
    });
  });
});