// Mini Feed - Interatividade
class MiniFeed {
  constructor() {
    this.feed = document.getElementById('feed');
    this.input = document.getElementById('newPostInput');
    this.publishBtn = document.getElementById('publishBtn');
    this.toast = document.getElementById('toast');
    this.postIdCounter = 100;

    this.init();
  }

  init() {
    // Publicar nova postagem
    this.publishBtn.addEventListener('click', () => this.createPost());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.createPost();
      this.autoResize();
    });
    this.input.addEventListener('input', () => this.autoResize());

    // Ferramentas de inserção rápida
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const insert = btn.dataset.insert;
        this.input.value = this.input.value ? `${this.input.value} ${insert}` : insert + ' ';
        this.input.focus();
        this.autoResize();
      });
    });

    // Delegation para ações do feed
    this.feed.addEventListener('click', (e) => this.handleFeedClick(e));
    this.feed.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
        const post = e.target.closest('.post');
        this.addComment(post);
      }
    });

    // Navegação fake
    document.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        a.classList.add('active');
        this.showToast(a.dataset.view === 'perfil' ? 'Perfil em breve 👤' : 'Você já está no Início');
      });
    });

    this.input.placeholder = this.randomPrompt();
  }

  randomPrompt() {
    const prompts = [
      "Compartilhe algo com seus amigos...",
      "O que você está pensando?",
      "No que você está trabalhando hoje?",
      "Conte uma novidade para o feed...",
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  autoResize() {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 160) + 'px';
  }

  showToast(msg) {
    this.toast.textContent = msg;
    this.toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.toast.classList.remove('show'), 2500);
  }

  createPost() {
    const text = this.input.value.trim();
    if (!text) {
      this.input.focus();
      this.input.style.borderColor = '#ef4444';
      setTimeout(() => this.input.style.borderColor = '', 1200);
      return;
    }

    const article = document.createElement('article');
    article.className = 'post card';
    article.dataset.postId = String(this.postIdCounter++);
    article.style.animationDelay = '0s';

    article.innerHTML = `
      <div class="post-header">
        <div class="user">
          <div class="avatar avatar-me">A</div>
          <div class="user-info">
            <strong>Ana Silva</strong>
            <span>agora mesmo • 🌎</span>
          </div>
        </div>
        <button class="icon-btn more-btn">⋯</button>
      </div>
      <div class="post-text"><p>${this.escapeHtml(text)}</p></div>
      <div class="post-stats">
        <span class="likes-count">0 curtidas</span>
        <span class="comments-count">0 comentários</span>
      </div>
      <div class="post-actions">
        <button class="action-btn like-btn" type="button"><span class="icon">♡</span> Curtir</button>
        <button class="action-btn comment-btn" type="button"><span class="icon">💬</span> Comentar</button>
        <button class="action-btn" type="button"><span class="icon">↗</span> Compartilhar</button>
      </div>
      <div class="comments-area hidden">
        <div class="comment-list"></div>
        <div class="comment-input-row">
          <div class="avatar small">A</div>
          <input type="text" placeholder="Escreva um comentário..." class="comment-input">
          <button class="send-comment">➤</button>
        </div>
      </div>
    `;

    this.feed.prepend(article);
    this.input.value = '';
    this.autoResize();
    this.showToast('Publicado com sucesso! 🎉');

    // Scroll suave até o novo post em mobile
    article.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  handleFeedClick(e) {
    const post = e.target.closest('.post');
    if (!post) return;

    if (e.target.closest('.like-btn')) {
      this.toggleLike(post, e.target.closest('.like-btn'));
    } else if (e.target.closest('.comment-btn')) {
      this.toggleComments(post);
    } else if (e.target.closest('.send-comment')) {
      this.addComment(post);
    } else if (e.target.closest('.more-btn') || e.target.closest('.action-btn:not(.like-btn):not(.comment-btn)')) {
      this.showToast('Recurso em breve 🚧');
    }
  }

  toggleLike(post, btn) {
    const isLiked = btn.classList.toggle('liked');
    const icon = btn.querySelector('.icon');
    const countEl = post.querySelector('.likes-count');
    let count = parseInt(countEl.textContent) || 0;

    if (isLiked) {
      icon.textContent = '♥';
      count++;
      btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 300 });
    } else {
      icon.textContent = '♡';
      count = Math.max(0, count - 1);
    }
    countEl.textContent = `${count} ${count === 1 ? 'curtida' : 'curtidas'}`;
  }

  toggleComments(post) {
    const area = post.querySelector('.comments-area');
    area.classList.toggle('hidden');
    if (!area.classList.contains('hidden')) {
      area.querySelector('.comment-input')?.focus();
    }
  }

  addComment(post) {
    const input = post.querySelector('.comment-input');
    const text = input.value.trim();
    if (!text) return;

    const list = post.querySelector('.comment-list');
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
      <div class="avatar small">A</div>
      <div class="comment-bubble">
        <strong>Ana Silva</strong>
        <p>${this.escapeHtml(text)}</p>
      </div>
    `;
    list.appendChild(div);

    const counter = post.querySelector('.comments-count');
    let n = parseInt(counter.textContent) || 0;
    n++;
    counter.textContent = `${n} ${n === 1 ? 'comentário' : 'comentários'}`;

    input.value = '';
    input.focus();
  }

  escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }
}

document.addEventListener('DOMContentLoaded', () => new MiniFeed());
