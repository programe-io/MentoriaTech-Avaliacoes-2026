const toast = document.getElementById('toast');
let toastTimer;
document.getElementById('welcomeDate').textContent = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long', day: 'numeric', month: 'long'
}).format(new Date()).toLocaleUpperCase('pt-BR');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// Likes and saved posts persist in this browser.
document.querySelectorAll('.post-card').forEach((post, index) => {
  const likeButton = post.querySelector('.like-button');
  const saveButton = post.querySelector('.save-button');
  const likeKey = `vibe-liked-${index}`;
  const saveKey = `vibe-saved-${index}`;
  const count = likeButton.querySelector('.like-count');
  count.dataset.original = count.textContent;

  if (localStorage.getItem(likeKey) === 'true') {
    likeButton.classList.add('liked');
    likeButton.querySelector('.heart').textContent = '♥';
    count.textContent = Number(count.dataset.original) + 1;
  }
  if (localStorage.getItem(saveKey) === 'true') {
    saveButton.classList.add('saved');
    saveButton.textContent = '▣';
  }

  likeButton.addEventListener('click', () => {
    const liked = likeButton.classList.toggle('liked');
    const count = likeButton.querySelector('.like-count');
    const original = Number(count.dataset.original || count.textContent);
    count.dataset.original = original;
    count.textContent = original + (liked ? 1 : 0);
    likeButton.querySelector('.heart').textContent = liked ? '♥' : '♡';
    localStorage.setItem(likeKey, String(liked));
  });

  saveButton.addEventListener('click', () => {
    const saved = saveButton.classList.toggle('saved');
    saveButton.textContent = saved ? '▣' : '♧';
    localStorage.setItem(saveKey, String(saved));
    showToast(saved ? 'Publicação salva nos seus favoritos.' : 'Publicação removida dos salvos.');
  });

  post.querySelector('.share-button').addEventListener('click', async () => {
    const author = post.querySelector('.post-author strong').textContent.trim();
    try {
      await navigator.clipboard.writeText(`${author} no Vibe — confira esta publicação!`);
      showToast('Link da publicação copiado!');
    } catch {
      showToast('Compartilhe esta publicação com seus amigos!');
    }
  });

  post.querySelectorAll('.track-play, .play-button').forEach((button) => {
    button.addEventListener('click', () => {
      const playing = button.dataset.playing !== 'true';
      button.dataset.playing = String(playing);
      button.textContent = playing ? 'Ⅱ' : '▶';
      showToast(playing ? 'Prévia musical iniciada.' : 'Prévia pausada.');
    });
  });

  post.querySelector('.comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const message = input.value.trim();
    if (!message) return;
    const comment = document.createElement('div');
    comment.className = 'comments-preview new-comment';
    const author = document.createElement('strong');
    author.textContent = 'luizamartins';
    comment.append(author, document.createTextNode(` ${message}`));
    event.currentTarget.before(comment);
    input.value = '';
    showToast('Comentário publicado!');
  });

  post.querySelector('.view-comments').addEventListener('click', () => {
    post.querySelector('.comment-form input').focus();
  });
});

document.querySelectorAll('.follow-button').forEach((button) => {
  button.addEventListener('click', () => {
    const following = button.classList.toggle('following');
    button.textContent = following ? 'Seguindo' : 'Seguir';
    showToast(following ? 'Artista adicionado à sua lista!' : 'Você deixou de seguir este artista.');
  });
});

const searchInput = document.getElementById('searchInput');
const posts = [...document.querySelectorAll('.post-card')];
const emptyState = document.getElementById('emptyState');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  let visibleCount = 0;
  posts.forEach((post) => {
    const matches = `${post.dataset.artist} ${post.dataset.style} ${post.textContent}`
      .toLocaleLowerCase('pt-BR').includes(query);
    post.hidden = !matches;
    if (matches) visibleCount++;
  });
  emptyState.hidden = visibleCount > 0;
});

const modal = document.getElementById('postModal');
const postText = document.getElementById('postText');
function closeModal() {
  modal.hidden = true;
}
document.getElementById('createPostButton').addEventListener('click', () => {
  modal.hidden = false;
  postText.focus();
});
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
document.getElementById('newPostForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const caption = postText.value.trim();
  if (!caption) return;
  const post = document.createElement('article');
  post.className = 'post-card';
  post.dataset.artist = 'luiza martins';
  post.dataset.style = 'publicação da comunidade';
  const header = document.createElement('div');
  header.className = 'post-header';
  const avatar = document.createElement('div');
  avatar.className = 'avatar avatar-you';
  avatar.textContent = 'L';
  const author = document.createElement('div');
  author.className = 'post-author';
  const name = document.createElement('strong');
  name.textContent = 'Luiza Martins';
  const time = document.createElement('span');
  time.textContent = '@luizamartins · agora';
  author.append(name, time);
  header.append(avatar, author);
  const text = document.createElement('p');
  text.className = 'post-caption';
  text.textContent = caption;
  const actions = document.createElement('div');
  actions.className = 'post-actions';
  actions.innerHTML = '<button class="like-button" aria-label="Curtir publicação"><span class="heart">♡</span> <span class="like-count">0</span></button><button class="comment-button"><span>▢</span> <span>0</span></button><button class="share-button" aria-label="Compartilhar publicação">↗</button><button class="save-button" aria-label="Salvar publicação">♧</button>';
  const commentForm = document.createElement('form');
  commentForm.className = 'comment-form';
  commentForm.innerHTML = '<input aria-label="Escreva um comentário" placeholder="Adicione um comentário..." /><button type="submit">Publicar</button>';
  post.append(header, text, actions, commentForm);

  const newLikeButton = post.querySelector('.like-button');
  newLikeButton.addEventListener('click', () => {
    const liked = newLikeButton.classList.toggle('liked');
    newLikeButton.querySelector('.heart').textContent = liked ? '♥' : '♡';
    newLikeButton.querySelector('.like-count').textContent = liked ? '1' : '0';
  });
  post.querySelector('.save-button').addEventListener('click', (clickEvent) => {
    const saveButton = clickEvent.currentTarget;
    const saved = saveButton.classList.toggle('saved');
    saveButton.textContent = saved ? '▣' : '♧';
    showToast(saved ? 'Publicação salva nos seus favoritos.' : 'Publicação removida dos salvos.');
  });
  post.querySelector('.share-button').addEventListener('click', () => showToast('Compartilhe esta publicação com seus amigos!'));
  commentForm.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const input = commentForm.querySelector('input');
    if (!input.value.trim()) return;
    const comment = document.createElement('div');
    comment.className = 'comments-preview new-comment';
    comment.textContent = `luizamartins ${input.value.trim()}`;
    commentForm.before(comment);
    input.value = '';
    showToast('Comentário publicado!');
  });
  document.getElementById('postsContainer').prepend(post);
  posts.unshift(post);
  closeModal();
  postText.value = '';
  showToast('Sua publicação já está no feed!');
  post.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('.story-item').forEach((story) => {
  story.addEventListener('click', () => showToast(`Story de ${story.dataset.story} — novidades chegando!`));
});
document.getElementById('storiesNext').addEventListener('click', () => {
  document.getElementById('storiesList').scrollBy({ left: 260, behavior: 'smooth' });
});
document.getElementById('suggestionsMore').addEventListener('click', () => showToast('Em breve: mais artistas para descobrir!'));
document.getElementById('playlistButton').addEventListener('click', () => showToast('Sua playlist da semana está sendo preparada!'));
document.getElementById('sortButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const newest = button.dataset.sort !== 'newest';
  button.dataset.sort = String(newest ? 'newest' : 'for-you');
  button.innerHTML = newest ? 'Recentes <span>⌄</span>' : 'Para você <span>⌄</span>';
  const container = document.getElementById('postsContainer');
  [...container.children].reverse().forEach((post) => container.append(post));
});
