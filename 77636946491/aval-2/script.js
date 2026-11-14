// BOTÃO DE CURTIR
const likeBtn = document.getElementById('likeBtn');
const likes = document.getElementById('likes');
let liked = false;

likeBtn.addEventListener('click', () => {
  liked = !liked;

  likes.textContent = Number(likes.textContent) + (liked ? 1 : -1);
  likeBtn.classList.toggle('liked', liked);
  likeBtn.setAttribute('aria-pressed', String(liked));
  likeBtn.firstChild.textContent = liked ? '♥ Curtido ' : '♡ Curtir ';
});

// BOTÃO DE COMPARTILHAR
document.getElementById('shareBtn').addEventListener('click', async () => {
  const data = {
    title: 'Vice Feed — GTA VI',
    text: 'Confira esta publicação sobre GTA VI!'
  };

  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) {
      // O compartilhamento pode ser cancelado pelo usuário.
    }
  } else {
    try {
      await navigator.clipboard.writeText(location.href);
      alert('Link copiado!');
    } catch (e) {
      alert('Copie o endereço do site na barra do navegador.');
    }
  }
});

// ADICIONAR COMENTÁRIOS
document.getElementById('commentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.getElementById('commentInput');
  const value = input.value.trim();

  if (!value) return;

  const item = document.createElement('div');
  item.className = 'comment';

  const name = document.createElement('strong');
  name.textContent = '@visitante: ';

  item.append(name, document.createTextNode(value));
  document.getElementById('commentList').appendChild(item);

  input.value = '';
});
