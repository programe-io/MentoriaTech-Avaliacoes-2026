/* =========================================================
   DADOS DO FEED
   ========================================================= */
const stories = [
  { user: "seu.story",  img: "https://picsum.photos/id/64/400/700",   avatar: "https://picsum.photos/id/64/100/100",   viewed: false },
  { user: "maria_lua",  img: "https://picsum.photos/id/1027/400/700", avatar: "https://picsum.photos/id/1027/100/100", viewed: false },
  { user: "joao.trip",  img: "https://picsum.photos/id/1015/400/700", avatar: "https://picsum.photos/id/1015/100/100", viewed: false },
  { user: "ana.codes",  img: "https://picsum.photos/id/180/400/700",  avatar: "https://picsum.photos/id/180/100/100",  viewed: false },
  { user: "pedro.fit",  img: "https://picsum.photos/id/1012/400/700", avatar: "https://picsum.photos/id/1012/100/100", viewed: true  },
  { user: "luiza.art",  img: "https://picsum.photos/id/1025/400/700", avatar: "https://picsum.photos/id/1025/100/100", viewed: true  },
  { user: "rafael.dj",  img: "https://picsum.photos/id/1062/400/700", avatar: "https://picsum.photos/id/1062/100/100", viewed: true  },
  { user: "bia.cook",   img: "https://picsum.photos/id/292/400/700",  avatar: "https://picsum.photos/id/292/100/100",  viewed: false }
];

const posts = [
  {
    id: 1,
    user: "maria_lua",
    avatar: "https://picsum.photos/id/1027/100/100",
    location: "Fernando de Noronha, PE",
    image: "https://picsum.photos/id/1018/800/800",
    likes: 1243,
    caption: "Pôr do sol que cura a alma 🌅 #noronha #travel",
    comments: 42,
    time: "2 HORAS ATRÁS"
  },
  {
    id: 2,
    user: "ana.codes",
    avatar: "https://picsum.photos/id/180/100/100",
    location: "Home Office",
    image: "https://picsum.photos/id/180/800/800",
    likes: 892,
    caption: "Setup novo, vida nova 💻✨ Quem mais ama trabalhar de casa?",
    comments: 128,
    time: "5 HORAS ATRÁS"
  },
  {
    id: 3,
    user: "pedro.fit",
    avatar: "https://picsum.photos/id/1012/100/100",
    location: "Academia Power",
    image: "https://picsum.photos/id/1012/800/800",
    likes: 3421,
    caption: "Sem desculpas. Só resultados 💪 #fitness #motivation",
    comments: 215,
    time: "8 HORAS ATRÁS"
  },
  {
    id: 4,
    user: "luiza.art",
    avatar: "https://picsum.photos/id/1025/100/100",
    location: "Atelier São Paulo",
    image: "https://picsum.photos/id/1025/800/800",
    likes: 567,
    caption: "Meu novo melhor amigo 🐾 Adotar é um ato de amor.",
    comments: 73,
    time: "1 DIA ATRÁS"
  }
];

const suggestions = [
  { user: "carol.photo", name: "Carol Mendes",   reason: "Segue você",        avatar: "https://picsum.photos/id/1005/100/100" },
  { user: "thiago.run",  name: "Thiago Alves",   reason: "Segue você",        avatar: "https://picsum.photos/id/1011/100/100" },
  { user: "julia.yoga",  name: "Julia Prado",    reason: "Novo no Instagram", avatar: "https://picsum.photos/id/1013/100/100" },
  { user: "bruno.dev",   name: "Bruno Silva",    reason: "Sugestão para você", avatar: "https://picsum.photos/id/1074/100/100" },
  { user: "camila.bake", name: "Camila Rocha",   reason: "Segue você",        avatar: "https://picsum.photos/id/1027/100/100" }
];

/* =========================================================
   RENDER: STORIES
   ========================================================= */
function renderStories() {
  const storiesEl = document.querySelector('.stories');
  stories.forEach((s, i) => {
    const el = document.createElement('article');
    el.className = 'story';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.innerHTML = `
      <div class="story-ring ${s.viewed ? 'viewed' : ''}">
        <img src="${s.avatar}" alt="Story de ${s.user}" />
      </div>
      <span>${s.user}</span>
    `;
    el.addEventListener('click', () => openStory(i));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') openStory(i);
    });
    storiesEl.appendChild(el);
  });
}

/* =========================================================
   RENDER: POSTS
   ========================================================= */
function renderPosts() {
  const postsEl = document.getElementById('posts');
  posts.forEach(p => {
    const el = document.createElement('article');
    el.className = 'post';
    el.dataset.id = p.id;
    el.innerHTML = `
      <header class="post-header">
        <div class="avatar"><img src="${p.avatar}" alt="${p.user}" /></div>
        <div class="user-info">
          <div class="username">${p.user}</div>
          <div class="location">${p.location}</div>
        </div>
        <button class="more" aria-label="Mais opções">⋯</button>
      </header>

      <figure class="post-media">
        <img src="${p.image}" alt="Publicação de ${p.user}" />
        <span class="heart-burst" aria-hidden="true">❤</span>
      </figure>

      <div class="post-actions">
        <button class="like-btn" aria-label="Curtir" title="Curtir">🤍</button>
        <button aria-label="Comentar" title="Comentar">💬</button>
        <button aria-label="Compartilhar" title="Compartilhar">📤</button>
        <span class="spacer"></span>
        <button class="save-btn" aria-label="Salvar" title="Salvar">🔖</button>
      </div>

      <p class="post-likes"><span class="likes-count">${p.likes.toLocaleString('pt-BR')}</span> curtidas</p>
      <p class="post-caption"><span class="username">${p.user}</span>${p.caption}</p>
      <p class="post-comments-link">Ver todos os ${p.comments} comentários</p>
      <p class="post-time"><time>${p.time}</time></p>

      <form class="post-add-comment" onsubmit="event.preventDefault();">
        <input type="text" placeholder="Adicione um comentário..." />
        <button type="submit">Publicar</button>
      </form>
    `;
    postsEl.appendChild(el);
    attachPostEvents(el, p);
  });
}

/* =========================================================
   RENDER: SUGESTÕES
   ========================================================= */
function renderSuggestions() {
  const sugEl = document.getElementById('suggestions');
  suggestions.forEach(s => {
    const li = document.createElement('li');
    li.className = 'suggestion';
    li.innerHTML = `
      <img src="${s.avatar}" alt="${s.user}" />
      <div class="info">
        <span class="username">${s.user}</span>
        <span class="reason">${s.reason}</span>
      </div>
      <button class="follow-btn">Seguir</button>
    `;
    const btn = li.querySelector('.follow-btn');
    btn.addEventListener('click', () => {
      const isFollowing = btn.classList.toggle('following');
      btn.textContent = isFollowing ? 'Seguindo' : 'Seguir';
    });
    sugEl.appendChild(li);
  });
}

/* =========================================================
   INTERAÇÕES DOS POSTS
   ========================================================= */
function attachPostEvents(article, postData) {
  const likeBtn = article.querySelector('.like-btn');
  const saveBtn = article.querySelector('.save-btn');
  const likesCount = article.querySelector('.likes-count');
  const media = article.querySelector('.post-media');
  const heart = article.querySelector('.heart-burst');
  const commentInput = article.querySelector('.post-add-comment input');
  const commentBtn = article.querySelector('.post-add-comment button');

  let liked = false;
  let currentLikes = postData.likes;

  function toggleLike() {
    liked = !liked;
    if (liked) {
      likeBtn.textContent = '❤️';
      likeBtn.classList.add('liked');
      currentLikes++;
    } else {
      likeBtn.textContent = '🤍';
      likeBtn.classList.remove('liked');
      currentLikes--;
    }
    likesCount.textContent = currentLikes.toLocaleString('pt-BR');
  }

  likeBtn.addEventListener('click', toggleLike);

  // Duplo clique na imagem = curtir
  media.addEventListener('dblclick', () => {
    if (!liked) toggleLike();
    heart.classList.remove('active');
    void heart.offsetWidth; // reinicia animação
    heart.classList.add('active');
  });

  saveBtn.addEventListener('click', () => {
    const saved = saveBtn.textContent === '🔖';
    saveBtn.textContent = saved ? '📌' : '🔖';
  });

  commentInput.addEventListener('input', () => {
    commentBtn.classList.toggle('active', commentInput.value.trim().length > 0);
  });

  commentBtn.addEventListener('click', () => {
    if (commentInput.value.trim()) {
      alert('Comentário publicado: "' + commentInput.value + '"');
      commentInput.value = '';
      commentBtn.classList.remove('active');
    }
  });
}

/* =========================================================
   MODAL DO STORY
   ========================================================= */
const modal = document.getElementById('storyModal');
const viewerImg = document.getElementById('viewerImg');
const viewerAvatar = document.getElementById('viewerAvatar');
const viewerUser = document.getElementById('viewerUser');
const closeBtn = document.getElementById('closeStory');

let storyTimer = null;

function openStory(index) {
  const s = stories[index];
  viewerImg.src = s.img;
  viewerAvatar.src = s.avatar;
  viewerUser.textContent = s.user;
  modal.classList.add('active');

  // Marca como visualizado
  const storyEls = document.querySelectorAll('.story');
  storyEls[index].querySelector('.story-ring').classList.add('viewed');

  // Fecha automaticamente após 5s
  clearTimeout(storyTimer);
  storyTimer = setTimeout(closeStory, 5000);
}

function closeStory() {
  modal.classList.remove('active');
  clearTimeout(storyTimer);
}

closeBtn.addEventListener('click', closeStory);
modal.addEventListener('click', e => {
  if (e.target === modal) closeStory();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeStory();
});

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderStories();
  renderPosts();
  renderSuggestions();
});