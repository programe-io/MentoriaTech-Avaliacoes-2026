const toast = document.getElementById('toast');
const createDialog = document.getElementById('createDialog');
const searchDialog = document.getElementById('searchDialog');
const storyDialog = document.getElementById('storyDialog');
let toastTimer;
let activeStory = 0;
const storyNames = [...document.querySelectorAll('.story-item')].map((item) => item.dataset.story);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function openCreateDialog() {
  createDialog.showModal();
}

document.getElementById('newPostNav').addEventListener('click', openCreateDialog);
document.getElementById('mobileCreate').addEventListener('click', openCreateDialog);
document.getElementById('closeDialog').addEventListener('click', () => createDialog.close());
createDialog.addEventListener('click', (event) => {
  if (event.target === createDialog) createDialog.close();
});

document.getElementById('createForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const caption = document.getElementById('postCaption').value.trim();
  if (!caption) return;

  const post = document.createElement('article');
  post.className = 'post-card';
  post.dataset.author = 'seu.perfil';
  post.dataset.search = `seu perfil ${caption.toLowerCase()}`;
  post.innerHTML = `
    <header class="post-header"><span class="avatar avatar-you">EU</span><div class="post-user"><strong>seu.perfil</strong><small>Agora mesmo</small></div><button class="more-button" aria-label="Mais opções">•••</button></header>
    <div class="post-art new-post-art" role="img" aria-label="Sua nova publicação"><span class="new-caption">um novo momento</span><span class="art-credit">COMPARTILHADO AGORA</span></div>
    <div class="post-actions"><div class="action-group"><button class="action-button like-button" aria-label="Curtir publicação">♡</button><button class="action-button comment-focus" aria-label="Comentar">◯</button><button class="action-button share-button" aria-label="Compartilhar">➤</button></div><button class="action-button save-button" aria-label="Salvar publicação">♧</button></div>
    <div class="post-copy"><p class="likes"><strong class="like-count">0</strong> curtidas</p><p><strong>seu.perfil</strong> ${escapeHTML(caption)}</p><button class="comments-toggle">Ver comentários</button><div class="comments-list"></div><form class="comment-form"><input type="text" placeholder="Adicione um comentário..." aria-label="Seu comentário" maxlength="120" /><button type="submit">Publicar</button></form></div>`;
  document.getElementById('feedPosts').prepend(post);
  document.getElementById('postCaption').value = '';
  createDialog.close();
  showToast('Sua publicação foi compartilhada ✨');
  post.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

document.addEventListener('click', (event) => {
  const likeButton = event.target.closest('.like-button');
  if (likeButton) {
    const count = likeButton.closest('.post-card').querySelector('.like-count');
    const wasLiked = likeButton.classList.toggle('liked');
    likeButton.textContent = wasLiked ? '♥' : '♡';
    likeButton.setAttribute('aria-label', wasLiked ? 'Descurtir publicação' : 'Curtir publicação');
    const value = Number(count.textContent.replace(/\D/g, '')) + (wasLiked ? 1 : -1);
    count.textContent = value.toLocaleString('pt-BR');
  }

  const saveButton = event.target.closest('.save-button');
  if (saveButton) {
    const saved = saveButton.classList.toggle('saved');
    saveButton.textContent = saved ? '♧' : '♧';
    showToast(saved ? 'Publicação salva' : 'Publicação removida dos salvos');
  }

  const followButton = event.target.closest('.follow-button');
  if (followButton) {
    const following = followButton.classList.toggle('following');
    followButton.textContent = following ? 'Seguindo' : 'Seguir';
    showToast(following ? 'Agora você está seguindo esse perfil' : 'Você deixou de seguir esse perfil');
  }

  const commentButton = event.target.closest('.comment-focus');
  if (commentButton) commentButton.closest('.post-card').querySelector('.comment-form input').focus();

  const toggleComments = event.target.closest('.comments-toggle');
  if (toggleComments) {
    const list = toggleComments.nextElementSibling;
    list.classList.toggle('comments-expanded');
    toggleComments.textContent = list.classList.contains('comments-expanded') ? 'Ocultar comentários' : 'Ver comentários';
  }

  if (event.target.closest('.share-button')) {
    const post = event.target.closest('.post-card');
    const text = `Veja esta publicação de ${post.dataset.author}`;
    if (navigator.share) navigator.share({ title: 'lumora', text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast('Link da publicação copiado'));
    else showToast('Compartilhe este momento com alguém ✨');
  }

  const storyItem = event.target.closest('.story-item');
  if (storyItem) {
    activeStory = storyNames.indexOf(storyItem.dataset.story);
    openStory();
  }
});

document.addEventListener('submit', (event) => {
  if (!event.target.matches('.comment-form')) return;
  event.preventDefault();
  const input = event.target.querySelector('input');
  const value = input.value.trim();
  if (!value) return;
  const list = event.target.previousElementSibling;
  const comment = document.createElement('p');
  comment.className = 'comment-line';
  const name = document.createElement('strong');
  name.textContent = 'seu.perfil ';
  comment.append(name, document.createTextNode(value));
  list.append(comment);
  list.classList.add('comments-expanded');
  event.target.closest('.post-copy').querySelector('.comments-toggle').textContent = 'Ocultar comentários';
  input.value = '';
});

function openStory() {
  document.getElementById('storyName').textContent = storyNames[activeStory] || 'story';
  storyDialog.showModal();
}

document.getElementById('closeStory').addEventListener('click', () => storyDialog.close());
document.getElementById('nextStory').addEventListener('click', () => {
  activeStory = (activeStory + 1) % storyNames.length;
  openStory();
});
storyDialog.addEventListener('click', (event) => {
  if (event.target === storyDialog) storyDialog.close();
});

document.getElementById('searchNav').addEventListener('click', () => {
  searchDialog.showModal();
  document.getElementById('searchInput').focus();
});
document.getElementById('closeSearch').addEventListener('click', () => searchDialog.close());
searchDialog.addEventListener('click', (event) => {
  if (event.target === searchDialog) searchDialog.close();
});
document.getElementById('searchForm').addEventListener('submit', (event) => event.preventDefault());
document.getElementById('searchInput').addEventListener('input', (event) => {
  const normalized = event.target.value.trim().toLocaleLowerCase('pt-BR');
  let visible = 0;
  document.querySelectorAll('.post-card').forEach((post) => {
    const searchText = `${post.dataset.search} ${post.textContent}`.toLocaleLowerCase('pt-BR');
    const matches = !normalized || searchText.includes(normalized);
    post.classList.toggle('hidden-post', !matches);
    if (matches) visible++;
  });
  if (normalized && visible === 0) showToast('Nenhuma publicação encontrada');
  else if (normalized) showToast(`${visible} publicação(ões) encontrada(s)`);
  else showToast('Mostrando todas as publicações');
});

document.getElementById('feedFilter').addEventListener('click', (event) => {
  const label = event.currentTarget.querySelector('span');
  label.textContent = label.textContent === 'Recentes' ? 'Para você' : 'Recentes';
  showToast(label.textContent === 'Recentes' ? 'Feed organizado por publicações recentes' : 'Feed personalizado para você');
});

document.getElementById('allStories').addEventListener('click', () => showToast('Você está em dia com os stories ✨'));
document.getElementById('seeAllSuggestions').addEventListener('click', () => showToast('Novas sugestões chegam em breve'));
document.getElementById('moreButton').addEventListener('click', () => showToast('Mais opções em breve'));

document.addEventListener('click', (event) => {
  if (event.target.closest('.more-button')) showToast('Mais opções da publicação');
  if (event.target.closest('.inline-more')) showToast('Legenda completa exibida');
});
