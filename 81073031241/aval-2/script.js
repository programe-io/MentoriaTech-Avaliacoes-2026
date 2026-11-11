const postInput = document.getElementById('post-input');
const publishButton = document.getElementById('publish-button');
const posts = document.getElementById('posts');

function publishPost() {
  const text = postInput.value.trim();
  if (!text) {
    postInput.focus();
    return;
  }

  const post = document.createElement('article');
  post.className = 'post card';

  const header = document.createElement('div');
  header.className = 'post-header';
  header.innerHTML = `
    <img class="avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" alt="Marina Costa" />
    <div class="post-author"><strong>Marina Costa</strong><span>Agora · <span class="public-icon">●</span></span></div>
    <button class="more-button" aria-label="Mais opções">···</button>
  `;

  const copy = document.createElement('p');
  copy.className = 'post-copy';
  copy.textContent = text;

  const stats = document.createElement('div');
  stats.className = 'post-stats';
  stats.innerHTML = '<span><span class="reaction-badge">♥</span> <span class="like-count">0</span></span><span>0 comentários · 0 compartilhamentos</span>';

  const actions = document.createElement('div');
  actions.className = 'post-actions';
  actions.innerHTML = '<button class="like-button"><span>♡</span> Curtir</button><button><span>◯</span> Comentar</button><button><span>↗</span> Compartilhar</button>';

  post.append(header, copy, stats, actions);
  posts.prepend(post);
  postInput.value = '';
}

publishButton.addEventListener('click', publishPost);
postInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    publishPost();
  }
});

posts.addEventListener('click', (event) => {
  const button = event.target.closest('.like-button');
  if (!button) return;

  const post = button.closest('.post');
  const count = post.querySelector('.like-count');
  const isLiked = button.classList.toggle('liked');
  const currentCount = Number(count.textContent);
  count.textContent = currentCount + (isLiked ? 1 : -1);
  button.querySelector('span').textContent = isLiked ? '♥' : '♡';
});
