/* =====================================================
   DADOS
===================================================== */
const ARTS = [
  { g:'linear-gradient(135deg,#f6d365,#fda085)', e:'🌅' },
  { g:'linear-gradient(135deg,#a1c4fd,#c2e9fb)', e:'🏔️' },
  { g:'linear-gradient(135deg,#d4fc79,#96e6a1)', e:'🌿' },
  { g:'linear-gradient(135deg,#fbc2eb,#a6c1ee)', e:'🌸' },
  { g:'linear-gradient(135deg,#ffecd2,#fcb69f)', e:'🍰' },
  { g:'linear-gradient(135deg,#84fab0,#8fd3f4)', e:'🐬' },
  { g:'linear-gradient(135deg,#5ee7df,#b490ca)', e:'🌌' },
  { g:'linear-gradient(135deg,#f093fb,#f5576c)', e:'🎨' }
];

const ME = { author:'Você', handle:'@voce', initials:'VC', av:['#6c5ce7','#a855f7'] };

const state = {
  posts: [
    {
      id: 1,
      author: 'Marina Costa',
      handle: '@marina.costa',
      initials: 'MC',
      av: ['#f97316', '#ec4899'],
      time: 'há 12 min',
      text: 'Bom dia, pessoal! 🌞\nComecei o dia com uma caminhada no parque e a energia já está lá em cima. Recomendo demais: 30 minutinhos fazem uma diferença enorme no humor.',
      art: ARTS[0],
      likes: 128, liked: false, saved: false, open: false,
      comments: [
        { author:'Rafael Lima', initials:'RL', av:['#0ea5e9','#22d3ee'], text:'Que inveja boa! Preciso voltar a caminhar.' },
        { author:'Ana Beatriz', initials:'AB', av:['#22c55e','#14b8a6'], text:'Vou tentar amanhã cedo 😍' }
      ]
    },
    {
      id: 2,
      author: 'Rafael Lima',
      handle: '@rafa.lima',
      initials: 'RL',
      av: ['#0ea5e9', '#22d3ee'],
      time: 'há 1 h',
      text: 'Terminei hoje a refatoração de um projeto antigo aqui na empresa. Saí de 3.200 linhas para 900 e o carregamento ficou 4x mais rápido. 🚀\n\nLição do dia: código limpo não é vaidade, é economia de tempo no futuro.',
      art: null,
      likes: 342, liked: true, saved: false, open: false,
      comments: [
        { author:'Diego Alves', initials:'DA', av:['#8b5cf6','#ec4899'], text:'Isso é satisfatório demais de ver!' }
      ]
    },
    {
      id: 3,
      author: 'Ana Beatriz',
      handle: '@anabea',
      initials: 'AB',
      av: ['#22c55e', '#14b8a6'],
      time: 'há 3 h',
      text: 'Testei uma receita nova de bolo de cenoura com cobertura de chocolate e ficou PERFEITA. 🍰\nQuem quiser eu mando o link da receita!',
      art: ARTS[4],
      likes: 891, liked: false, saved: true, open: false,
      comments: [
        { author:'Marina Costa', initials:'MC', av:['#f97316','#ec4899'], text:'Manda sim! Quero fazer no fim de semana.' },
        { author:'Thiago Gomes', initials:'TG', av:['#0ea5e9','#22d3ee'], text:'Bolo de cenoura é o melhor bolo, ponto.' }
      ]
    },
    {
      id: 4,
      author: 'Lucas Ferreira',
      handle: '@lucas.dev',
      initials: 'LF',
      av: ['#f59e0b', '#ef4444'],
      time: 'há 5 h',
      text: 'Dica rápida para quem está começando em programação: não tente aprender tudo de uma vez.\n\nEscolha uma coisa, faça um projetinho pequeno do começo ao fim, e só depois vá para a próxima. Consistência ganha de intensidade. 💪',
      art: null,
      likes: 2104, liked: false, saved: false, open: false,
      comments: []
    }
  ]
};

/* =====================================================
   UTILITÁRIOS
===================================================== */
const feed = document.getElementById('feed');
const toastEl = document.getElementById('toast');
let toastTimer;

function esc(str){
  return String(str).replace(/[&<>"']/g, c => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
  ));
}

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
}

/* =====================================================
   TEMPLATES
===================================================== */
function commentHTML(c){
  return `
    <div class="comment">
      <div class="avatar small" style="background:linear-gradient(135deg,${c.av[0]},${c.av[1]})">${esc(c.initials)}</div>
      <div class="comment-body">
        <span class="comment-author">${esc(c.author)}</span>${esc(c.text)}
      </div>
    </div>`;
}

function postHTML(p){
  const media = p.art
    ? `<div class="post-media" style="background:${p.art.g}"><span>${p.art.e}</span></div>`
    : '';

  return `
  <article class="post card" data-id="${p.id}">
    <div class="post-head">
      <div class="avatar" style="background:linear-gradient(135deg,${p.av[0]},${p.av[1]})">${esc(p.initials)}</div>
      <div class="post-meta">
        <div class="post-author">${esc(p.author)}</div>
        <div class="post-sub">${esc(p.handle)} · ${esc(p.time)}</div>
      </div>
      <button class="more-btn" data-action="more" aria-label="Mais opções">
        <svg class="icon"><use href="#i-more"/></svg>
      </button>
    </div>

    <p class="post-text">${esc(p.text)}</p>
    ${media}

    <div class="post-actions">
      <button class="action ${p.liked ? 'liked' : ''}" data-action="like">
        <svg class="icon"><use href="#i-heart"/></svg>
        <span class="like-count">${p.likes}</span>
      </button>
      <button class="action" data-action="comments">
        <svg class="icon"><use href="#i-comment"/></svg>
        <span class="comment-count">${p.comments.length}</span>
      </button>
      <button class="action" data-action="share">
        <svg class="icon"><use href="#i-share"/></svg>
        <span>Compartilhar</span>
      </button>
      <button class="action ${p.saved ? 'saved' : ''}" data-action="save" aria-label="Salvar">
        <svg class="icon"><use href="#i-bookmark"/></svg>
      </button>
    </div>

    <div class="comments ${p.open ? 'open' : ''}">
      <div class="comment-list">${p.comments.map(commentHTML).join('')}</div>
      <form class="comment-form" data-action="comment-form">
        <input type="text" placeholder="Escreva um comentário..." autocomplete="off" maxlength="300">
        <button type="submit" aria-label="Enviar comentário">
          <svg class="icon" style="width:18px;height:18px"><use href="#i-send"/></svg>
        </button>
      </form>
    </div>
  </article>`;
}

/* =====================================================
   RENDER INICIAL
===================================================== */
feed.innerHTML = state.posts.map(postHTML).join('');

/* =====================================================
   INTERAÇÕES DO FEED (delegação de eventos)
===================================================== */
function getPostFromEl(el){
  const postEl = el.closest('.post');
  if (!postEl) return {};
  const post = state.posts.find(p => p.id === Number(postEl.dataset.id));
  return { postEl, post };
}

feed.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;

  const { postEl, post } = getPostFromEl(el);
  if (!post) return;

  switch (el.dataset.action) {

    case 'like': {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      el.classList.toggle('liked', post.liked);
      el.querySelector('.like-count').textContent = post.likes;
      if (post.liked){
        el.classList.remove('pop');
        void el.offsetWidth;
        el.classList.add('pop');
      }
      break;
    }

    case 'comments': {
      post.open = !post.open;
      postEl.querySelector('.comments').classList.toggle('open', post.open);
      if (post.open){
        postEl.querySelector('.comment-form input').focus();
      }
      break;
    }

    case 'save': {
      post.saved = !post.saved;
      el.classList.toggle('saved', post.saved);
      toast(post.saved ? 'Post salvo nos seus itens 🔖' : 'Post removido dos salvos');
      break;
    }

    case 'share': {
      const url = location.href.split('#')[0] + '#post-' + post.id;
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).catch(() => {});
      }
      toast('Link do post copiado! 🔗');
      break;
    }

    case 'more': {
      toast('Mais opções em breve 😉');
      break;
    }
  }
});

/* Envio de comentário */
feed.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-action="comment-form"]');
  if (!form) return;
  e.preventDefault();

  const input = form.querySelector('input');
  const text = input.value.trim();
  if (!text) return;

  const { postEl, post } = getPostFromEl(form);
  if (!post) return;

  const comment = { author: ME.author, initials: ME.initials, av: ME.av, text };
  post.comments.push(comment);

  postEl.querySelector('.comment-list').insertAdjacentHTML('beforeend', commentHTML(comment));
  postEl.querySelector('.comment-count').textContent = post.comments.length;

  input.value = '';
  input.focus();
});

/* =====================================================
   COMPOSER
===================================================== */
const composerText = document.getElementById('composer-text');
const publishBtn   = document.getElementById('publish-btn');
const mediaBox     = document.getElementById('composer-media');
let pendingArt = null;

function autoGrow(el){
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 220) + 'px';
}

function updatePublishState(){
  publishBtn.disabled = composerText.value.trim() === '' && !pendingArt;
}

function setArt(art){
  pendingArt = art;
  if (!art){
    mediaBox.hidden = true;
    mediaBox.innerHTML = '';
    mediaBox.style.background = '';
  } else {
    mediaBox.hidden = false;
    mediaBox.style.background = art.g;
    mediaBox.innerHTML =
      `<span>${art.e}</span>
       <button type="button" class="remove-media" id="remove-media" aria-label="Remover imagem">✕</button>`;
  }
  updatePublishState();
}

composerText.addEventListener('input', () => {
  autoGrow(composerText);
  updatePublishState();
});

composerText.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') publish();
});

document.getElementById('btn-photo').addEventListener('click', () => {
  const art = ARTS[Math.floor(Math.random() * ARTS.length)];
  setArt(art);
});

document.getElementById('btn-emoji').addEventListener('click', () => {
  composerText.value += ' 😄';
  composerText.focus();
  autoGrow(composerText);
  updatePublishState();
});

mediaBox.addEventListener('click', (e) => {
  if (e.target.id === 'remove-media') setArt(null);
});

function publish(){
  const text = composerText.value.trim();
  if (!text && !pendingArt) return;

  const post = {
    id: Date.now(),
    author: ME.author,
    handle: ME.handle,
    initials: ME.initials,
    av: ME.av,
    time: 'agora mesmo',
    text: text || '📷',
    art: pendingArt,
    likes: 0,
    liked: false,
    saved: false,
    open: false,
    comments: []
  };

  state.posts.unshift(post);
  feed.insertAdjacentHTML('afterbegin', postHTML(post));

  composerText.value = '';
  composerText.style.height = 'auto';
  setArt(null);
  updatePublishState();

  toast('Publicado com sucesso! 🎉');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

publishBtn.addEventListener('click', publish);

/* =====================================================
   BOTÕES "SEGUIR"
===================================================== */
document.querySelectorAll('.btn-follow').forEach(btn => {
  btn.addEventListener('click', () => {
    const following = btn.classList.toggle('following');
    btn.textContent = following ? 'Seguindo' : 'Seguir';
    toast(following ? 'Você começou a seguir esta pessoa 👥' : 'Deixou de seguir');
  });
});

/* =====================================================
   NAVEGAÇÃO SUPERIOR
===================================================== */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});