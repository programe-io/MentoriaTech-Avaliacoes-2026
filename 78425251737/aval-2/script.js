
// GAMEZONE - INTERAÇÕES

const cards = document.querySelectorAll('.game-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = '0.3s';
  });
});

const buttons = document.querySelectorAll('.game-card button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.parentElement.querySelector('h3').textContent;

    alert('Você escolheu jogar: ' + name);
  });
});

const login = document.querySelector('.login');

login.addEventListener('click', () => {
  alert('Bem-vindo à GameZone!');
});

console.log('GameZone carregada com sucesso!');
