// Curtir / Descurtir a publicação
const likeBtn = document.querySelector('.post-body button');
let liked = false;

if (likeBtn) {
  likeBtn.addEventListener('click', () => {
    liked = !liked;
    likeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => likeBtn.style.transform = 'scale(1)', 150);
    likeBtn.innerText = liked ? '❤️' : '🤍';
  });
}

// Adicionar comentário via aviso/prompt rápido
const commentBtn = document.querySelectorAll('.post-body button')[1];
if (commentBtn) {
  commentBtn.addEventListener('click', () => {
    const texto = prompt('Digite seu comentário:');
    if (texto) {
      alert(`Comentário publicado: "${texto}"`);
    }
  });
}