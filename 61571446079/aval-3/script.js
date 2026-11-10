// Seleciona o botão de curtir
const btnLike = document.querySelector('button');

// Adiciona o evento de clique para alternar o coração
btnLike.addEventListener('click', () => {
  btnLike.textContent = btnLike.textContent === '🤍' ? '❤️' : '🤍';
});