
const likes = document.querySelectorAll('.like');

likes.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');

    button.textContent =
      button.classList.contains('liked') ? '♥' : '♡';
  });
});

const follow = document.querySelector('.follow');

follow.addEventListener('click', () => {
  if (follow.textContent === 'Seguir') {
    follow.textContent = 'Seguindo ✓';
    follow.style.background = '#333';
    follow.style.color = 'white';
  } else {
    follow.textContent = 'Seguir';
    follow.style.background = '#a6c6a1';
    follow.style.color = '#111';
  }
});

document.querySelectorAll('.comment-btn').forEach(button => {
  button.addEventListener('click', () => {
    const comment = prompt('Escreva seu comentário:');

    if (comment && comment.trim()) {
      alert('Comentário publicado: ' + comment);
    }
  });
});
