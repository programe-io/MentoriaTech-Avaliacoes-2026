ocument.querySelectorAll('.like-button').forEach((button) => {
  button.addEventListener('click', () => {
    const post = button.closest('.post');
    const likes = post.querySelector('.likes strong');
    const wasLiked = button.getAttribute('aria-pressed') === 'true';
    const count = Number(likes.textContent.match(/[\d.]+/)[0].replace('.', ''));

    button.setAttribute('aria-pressed', String(!wasLiked));
    button.classList.toggle('liked', !wasLiked);
    likes.textContent = `${(count + (wasLiked ? -1 : 1)).toLocaleString('pt-BR')} curtidas`;
  });
});

document.querySelectorAll('.bookmark-button').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(saved));
    button.classList.toggle('saved', saved);
    button.setAttribute('aria-label', saved ? 'Remover dos salvos' : 'Salvar publicação');
  });
});

document.querySelectorAll('.comment-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    const comment = input.value.trim();
    if (!comment) return;

    const caption = form.closest('.post-content').querySelector('.caption');
    const newComment = document.createElement('p');
    newComment.className = 'caption';
    newComment.innerHTML = `<strong>seu.perfil</strong> ${escapeHTML(comment)}`;
    caption.insertAdjacentElement('afterend', newComment);
    input.value = '';
  });
});

document.querySelectorAll('.follow-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent.trim() === 'Seguir') {
      button.textContent = 'Seguindo';
      button.style.color = '#262626';
    } else if (button.textContent.trim() === 'Seguindo') {
      button.textContent = 'Seguir';
      button.style.color = '';
    }
  });
});

function escapeHTML(value) {
  const element = document.createElement('span');
  element.textContent = value;
  return element.innerHTML;
}
