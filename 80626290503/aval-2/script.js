const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// Likes, saves, comments and sharing.
document.querySelectorAll('.like-button').forEach((button) => {
  button.addEventListener('click', () => {
    const post = button.closest('.post');
    const count = post.querySelector('.like-count');
    const liked = button.classList.toggle('liked');
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
    button.querySelector('span').textContent = liked ? '♥' : '♡';
  });
});

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '▣' : '▱';
    showToast(saved ? 'Publicação salva nos seus favoritos.' : 'Publicação removida dos salvos.');
    if (savedOnly) filterPosts();
  });
});

document.querySelectorAll('.comment-button').forEach((button) => {
  button.addEventListener('click', () => {
    const form = button.closest('.post').querySelector('.comment-form');
    form.classList.toggle('visible');
    if (form.classList.contains('visible')) form.querySelector('input').focus();
  });
});

document.querySelectorAll('.comment-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    if (!input.value.trim()) return;
    const comment = document.createElement('div');
    comment.className = 'new-comment';
    comment.style.cssText = 'padding:9px 0 3px 35px;color:#626579;font-size:10px;line-height:1.5';
    const name = document.createElement('strong');
    name.textContent = 'Luiza Martins ';
    comment.append(name, document.createTextNode(input.value.trim()));
    form.before(comment);
    input.value = '';
    showToast('Comentário publicado!');
  });
});

document.querySelectorAll('.share-button').forEach((button) => {
  button.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Lumivora', text: 'Olha esta publicação no Lumivora!' }); }
      catch (error) { if (error.name !== 'AbortError') showToast('Não foi possível compartilhar agora.'); }
    } else {
      showToast('Publicação pronta para compartilhar!');
    }
  });
});

// Feed tabs show the matching mix of posts.
let savedOnly = false;
document.querySelectorAll('.feed-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.feed-tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    savedOnly = false;
    filterPosts();
  });
});

const searchInput = document.getElementById('searchInput');
function filterPosts() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const activeFilter = document.querySelector('.feed-tab.active').dataset.filter;
  document.querySelectorAll('.post').forEach((post) => {
    const matchesSearch = !query || `${post.dataset.search} ${post.innerText}`.toLocaleLowerCase('pt-BR').includes(query);
    const matchesTab = activeFilter === 'all' || activeFilter === post.dataset.category;
    const matchesSaved = !savedOnly || Boolean(post.querySelector('.save-button.saved'));
    post.hidden = !matchesSearch || !matchesTab || !matchesSaved;
  });
  updateEmptyState();
}

function updateEmptyState() {
  const visiblePosts = [...document.querySelectorAll('.post')].some((post) => !post.hidden);
  document.getElementById('emptyState').hidden = visiblePosts;
  document.querySelector('.load-more').hidden = !visiblePosts;
}

searchInput.addEventListener('input', filterPosts);
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape') {
    document.getElementById('storyModal').classList.remove('open');
    document.getElementById('storyModal').setAttribute('aria-hidden', 'true');
    if (typeof closeCompose === 'function') closeCompose();
    searchInput.blur();
  }
});

// Mobile search expands inside the top bar.
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('click', () => {
  if (window.innerWidth <= 760) {
    searchBox.classList.add('search-open');
    searchInput.focus();
  }
});
searchInput.addEventListener('blur', () => {
  if (!searchInput.value && window.innerWidth <= 760) searchBox.classList.remove('search-open');
});

// Open an in-page composer so creating a post does not use browser prompts.
const composeModal = document.getElementById('composeModal');
const postText = document.getElementById('postText');
function openCompose(context = '') {
  composeModal.classList.add('open');
  composeModal.setAttribute('aria-hidden', 'false');
  postText.placeholder = context ? `Compartilhe ${context.toLowerCase()} com a comunidade...` : 'O que você gostaria de compartilhar?';
  postText.focus();
}
function closeCompose() {
  composeModal.classList.remove('open');
  composeModal.setAttribute('aria-hidden', 'true');
}

document.getElementById('composeForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const text = postText.value.trim();
  if (!text) return;
  const post = document.createElement('article');
  post.className = 'post card-surface';
  post.dataset.category = 'following';
  post.dataset.search = text.toLocaleLowerCase('pt-BR');
  post.innerHTML = `
    <div class="post-header"><div class="avatar avatar-luiza">L</div><div class="post-author"><strong>Luiza Martins</strong><span>@luizamartins · agora · <span class="public-icon">◎</span></span></div><button class="more-button" aria-label="Mais opções">···</button></div>
    <p class="post-copy"></p>
    <div class="post-meta"><span>💜 <b class="like-count">0</b> curtidas</span><span><b>0</b> comentários · <b>0</b> compartilhamentos</span></div>
    <div class="post-actions"><button class="like-button"><span>♡</span> Curtir</button><button class="comment-button"><span>▢</span> Comentar</button><button class="share-button"><span>↗</span> Compartilhar</button><button class="save-button" aria-label="Salvar publicação">▱</button></div>
    <form class="comment-form"><div class="avatar avatar-luiza small-avatar">L</div><input placeholder="Escreva um comentário..." aria-label="Escreva um comentário"><button>Enviar</button></form>`;
  post.querySelector('.post-copy').textContent = text;
  document.getElementById('posts').prepend(post);
  postText.value = '';
  closeCompose();
  searchInput.value = '';
  document.querySelector('.feed-tab[data-filter="all"]').click();
  showToast('Sua publicação foi compartilhada!');
  post.scrollIntoView({ behavior: 'smooth', block: 'center' });
  bindPostActions(post);
});

document.querySelector('#composeModal .modal-close').addEventListener('click', closeCompose);
document.querySelector('#composeModal .modal-backdrop').addEventListener('click', closeCompose);

function bindPostActions(post) {
  post.querySelector('.more-button').addEventListener('click', () => showToast('Mais opções da publicação em breve.'));
  post.querySelector('.like-button').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const liked = button.classList.toggle('liked');
    const count = post.querySelector('.like-count');
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
    button.querySelector('span').textContent = liked ? '♥' : '♡';
  });
  post.querySelector('.save-button').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '▣' : '▱';
    showToast(saved ? 'Publicação salva nos seus favoritos.' : 'Publicação removida dos salvos.');
    if (savedOnly) filterPosts();
  });
  post.querySelector('.comment-button').addEventListener('click', () => {
    const form = post.querySelector('.comment-form');
    form.classList.toggle('visible');
    if (form.classList.contains('visible')) form.querySelector('input').focus();
  });
  post.querySelector('.comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input');
    if (!input.value.trim()) return;
    const comment = document.createElement('div');
    comment.style.cssText = 'padding:9px 0 3px 35px;color:#626579;font-size:10px;line-height:1.5';
    const name = document.createElement('strong');
    name.textContent = 'Luiza Martins ';
    comment.append(name, document.createTextNode(input.value.trim()));
    form.before(comment);
    input.value = '';
    showToast('Comentário publicado!');
  });
  post.querySelector('.share-button').addEventListener('click', () => showToast('Publicação pronta para compartilhar!'));
}

document.getElementById('publishButton').addEventListener('click', () => openCompose());
document.getElementById('composerPrompt').addEventListener('click', () => openCompose());
document.getElementById('mobileCreate').addEventListener('click', () => openCompose());
document.querySelectorAll('[data-compose]').forEach((button) => {
  button.addEventListener('click', () => openCompose(button.dataset.compose));
});

// Story viewer.
const storyModal = document.getElementById('storyModal');
function closeStory() {
  storyModal.classList.remove('open');
  storyModal.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('.story-item').forEach((story) => {
  story.addEventListener('click', () => {
    document.getElementById('storyModalTitle').textContent = story.dataset.story;
    storyModal.classList.add('open');
    storyModal.setAttribute('aria-hidden', 'false');
  });
});
document.querySelector('#storyModal .modal-close').addEventListener('click', closeStory);
document.querySelector('#storyModal .modal-backdrop').addEventListener('click', closeStory);
document.getElementById('allStories').addEventListener('click', () => {
  document.querySelector('.story-item:not(.add-story)').click();
});

// Follow suggestions and small page actions.
document.querySelectorAll('.follow-button').forEach((button) => {
  button.addEventListener('click', () => {
    const following = button.classList.toggle('following');
    button.textContent = following ? '✓' : '＋';
    showToast(following ? 'Agora você está seguindo essa pessoa!' : 'Você deixou de seguir essa pessoa.');
  });
});
document.getElementById('eventButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const interested = button.dataset.interested !== 'true';
  button.dataset.interested = interested;
  button.innerHTML = interested ? '✓ Você tem interesse' : 'Tenho interesse <span>→</span>';
  showToast(interested ? 'Encontro adicionado aos seus eventos!' : 'Interesse removido do evento.');
});
document.getElementById('customizeButton').addEventListener('click', () => showToast('Seu feed está personalizado para você.'));

// Make secondary controls respond with useful actions or feedback.
document.querySelectorAll('.more-button').forEach((button) => {
  button.addEventListener('click', () => showToast('Mais opções da publicação em breve.'));
});
document.querySelectorAll('.mobile-search').forEach((button) => {
  button.addEventListener('click', () => {
    searchBox.classList.add('search-open');
    searchInput.focus();
  });
});
document.querySelectorAll('.play-button').forEach((button) => {
  button.addEventListener('click', () => {
    const playing = button.dataset.playing !== 'true';
    button.dataset.playing = String(playing);
    button.textContent = playing ? 'Ⅱ' : '▶';
    showToast(playing ? 'Reproduzindo a playlist.' : 'Playlist pausada.');
  });
});

document.querySelectorAll('.top-actions .icon-button:not(.mobile-search), .profile-mini').forEach((button) => {
  button.addEventListener('click', () => {
    const label = button.getAttribute('aria-label');
    showToast(label === 'Mensagens' ? 'Você não tem novas mensagens.' :
      label === 'Notificações' ? 'Você está em dia com as notificações.' : 'Perfil de Luiza Martins.');
  });
});

document.querySelectorAll('.main-nav .nav-link, .mobile-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = link.getAttribute('href');
    if (destination === '#inicio' || destination === '#perfil') {
      if (destination === '#perfil') {
        event.preventDefault();
        showToast('Perfil de Luiza Martins.');
      }
      return;
    }
    event.preventDefault();
    if (destination === '#descobrir') {
      document.querySelector('.feed-tab[data-filter="popular"]').click();
      document.getElementById('posts').scrollIntoView({ behavior: 'smooth' });
    } else if (destination === '#salvos') {
      savedOnly = true;
      document.querySelectorAll('.feed-tab').forEach((tab) => tab.classList.remove('active'));
      document.querySelector('.feed-tab[data-filter="all"]').classList.add('active');
      filterPosts();
      document.getElementById('posts').scrollIntoView({ behavior: 'smooth' });
    } else if (destination === '#mensagens') {
      showToast('Você não tem novas mensagens.');
    } else if (destination === '#eventos') {
      document.getElementById('eventButton').scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Confira o próximo encontro da comunidade.');
    } else {
      showToast('Esse espaço estará disponível em breve.');
    }
  });
});

document.querySelectorAll('.trend-item').forEach((trend) => {
  trend.addEventListener('click', (event) => {
    event.preventDefault();
    searchInput.value = trend.querySelector('b').textContent.replace(/^#/, '');
    document.querySelector('.feed-tab[data-filter="all"]').click();
    searchInput.dispatchEvent(new Event('input'));
    document.getElementById('posts').scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('.sidebar-section .section-heading button').addEventListener('click', () => {
  showToast('A criação de espaços estará disponível em breve.');
});
document.querySelector('.sidebar-section > .text-button').addEventListener('click', () => {
  showToast('Você já está vendo seus espaços favoritos.');
});
document.querySelectorAll('.right-card-heading > button, .trend-more, .people-more').forEach((button) => {
  button.addEventListener('click', () => showToast('Mais novidades em breve.'));
});
document.querySelectorAll('.space-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast(`Espaço “${link.childNodes[1].textContent.trim()}” selecionado.`);
  });
});
