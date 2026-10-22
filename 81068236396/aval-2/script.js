const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function addPost(text) {
  const post = document.createElement('article');
  post.className = 'post panel';
  post.dataset.search = `${text} marina alves`;

  const header = document.createElement('div');
  header.className = 'post-header';
  header.innerHTML = '<div class="avatar avatar-main">MA</div><div class="post-author"><h3>Marina Alves</h3><p>@marinaalves · agora · <span>◎</span></p></div><button class="more-button" aria-label="Mais opções">···</button>';

  const copy = document.createElement('p');
  copy.className = 'post-copy';
  copy.textContent = text;

  const meta = document.createElement('div');
  meta.className = 'post-meta';
  meta.innerHTML = '<span>💜 <b class="like-count">0</b></span><span>Seja a primeira pessoa a comentar</span>';

  const actions = document.createElement('div');
  actions.className = 'post-actions';
  actions.innerHTML = '<button class="like-button">♡ <span>Curtir</span></button><button class="comment-button">▢ <span>Comentar</span></button><button class="share-button">↗ <span>Compartilhar</span></button>';

  const commentArea = document.createElement('div');
  commentArea.className = 'comment-area';
  commentArea.innerHTML = '<input type="text" placeholder="Escreva um comentário..." /><button>Enviar</button>';

  post.append(header, copy, meta, actions, commentArea);
  document.getElementById('posts').prepend(post);
  applySearch();
}

const searchInput = document.getElementById('searchInput');

function applySearch() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const posts = [...document.querySelectorAll('#posts .post')];
  let visible = 0;

  posts.forEach((post) => {
    const matches = !query || `${post.dataset.search || ''} ${post.textContent}`.toLocaleLowerCase('pt-BR').includes(query);
    post.hidden = !matches;
    if (matches) visible++;
  });

  document.getElementById('emptyState').style.display = visible ? 'none' : 'block';
}

searchInput.addEventListener('input', applySearch);

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.id === 'publishButton') {
    const input = document.getElementById('postInput');
    const text = input.value.trim();
    if (!text) {
      input.focus();
      showToast('Escreva algo antes de publicar.');
      return;
    }
    addPost(text);
    input.value = '';
    showToast('Sua publicação foi compartilhada!');
    return;
  }

  if (button.classList.contains('like-button')) {
    const post = button.closest('.post');
    const count = post.querySelector('.like-count');
    const liked = button.classList.toggle('liked');
    button.innerHTML = `${liked ? '♥' : '♡'} <span>${liked ? 'Curtido' : 'Curtir'}</span>`;
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
  }

  if (button.classList.contains('comment-button')) {
    const area = button.closest('.post').querySelector('.comment-area');
    area.classList.toggle('open');
    if (area.classList.contains('open')) area.querySelector('input').focus();
  }

  if (button.closest('.comment-area') && button.textContent.trim() === 'Enviar') {
    const input = button.parentElement.querySelector('input');
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    const comment = document.createElement('p');
    comment.className = 'user-comment';
    comment.innerHTML = '<strong>Marina Alves</strong> ';
    comment.append(document.createTextNode(input.value.trim()));
    button.closest('.post').insertBefore(comment, button.parentElement);
    showToast('Comentário adicionado!');
    input.value = '';
    button.parentElement.classList.remove('open');
  }

  if (button.classList.contains('share-button')) {
    const post = button.closest('.post');
    const text = post.querySelector('.post-copy')?.textContent || 'Confira esta publicação!';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast('Link da publicação copiado!')).catch(() => showToast('Publicação pronta para compartilhar!'));
    } else {
      showToast('Publicação pronta para compartilhar!');
    }
  }

  if (button.classList.contains('follow-button')) {
    const following = button.classList.toggle('following');
    button.textContent = following ? '✓' : '+';
    showToast(following ? 'Você começou a seguir esta pessoa.' : 'Você deixou de seguir esta pessoa.');
  }

  if (button.classList.contains('poll-option')) {
    showToast('Seu voto foi registrado!');
  }

  if (button.classList.contains('play-button')) {
    const playing = button.textContent === '▶';
    button.textContent = playing ? 'Ⅱ' : '▶';
    showToast(playing ? 'Playlist em reprodução.' : 'Reprodução pausada.');
  }

  if (button.id === 'eventButton') {
    const interested = button.dataset.interested !== 'true';
    button.dataset.interested = interested;
    button.innerHTML = interested ? '✓ Você vai <span>→</span>' : 'Tenho interesse <span>→</span>';
    showToast(interested ? 'Você demonstrou interesse no evento.' : 'Interesse removido.');
  }

  if (button.dataset.type) showToast(`Opção de ${button.dataset.type.toLowerCase()} selecionada.`);
});

document.getElementById('postInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') document.getElementById('publishButton').click();
});

document.getElementById('searchInput').addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    event.currentTarget.focus();
  }
});

document.querySelectorAll('.poll-option').forEach((option) => {
  option.addEventListener('click', () => {
    option.parentElement.querySelectorAll('.poll-option').forEach((item) => item.classList.remove('chosen'));
    option.classList.add('chosen');
  });
});
