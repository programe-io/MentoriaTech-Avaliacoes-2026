// MODO NOTURNO
const btn = document.getElementById('theme-btn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  btn.textContent = document.body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Noturno';
});

// CURTIR - AGORA FUNCIONA 100%
document.querySelectorAll('.like-btn').forEach(button => {
  const span = button.querySelector('span');
  let count = 0;
  button.addEventListener('click', () => {
    count++;
    span.textContent = count;
    button.style.background = '#ffcdd2';
    button.style.transform = 'scale(1.1)';
    setTimeout(() => button.style.transform = 'scale(1)', 150);
  });
});

// FRASE SECRETA
document.querySelectorAll('.quote-btn').forEach(button => {
  button.addEventListener('click', () => {
    const secret = button.closest('article').querySelector('.secret');
    const isVisible = secret.style.display === 'block';
    secret.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? '🕸️ Ver frase' : '🙈 Esconder frase';
  });
});