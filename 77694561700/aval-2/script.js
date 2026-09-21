
const TEAM_COLORS = {
  "Flamengo":"#E4032E", "Palmeiras":"#0B7A3E", "Corinthians":"#2B2B2B",
  "São Paulo":"#7B0323", "Grêmio":"#1565C0", "Seleção":"#CFA100"
};

let posts = [
  {
    id: cryptoId(), name:"Marina Duarte", team:"Palmeiras",
    text:"Que jogada coletiva no segundo tempo! O time construiu a jogada com muita paciência antes de finalizar. ⚽🟢",
    time:"há 12 min", likes:34, liked:false,
    comments:[{name:"Rafael", text:"Foi o melhor gol do Brasileirão até agora!"}]
  },
  {
    id: cryptoId(), name:"Bruno Aceves", team:"Flamengo",
    text:"Torcida lotou o Maracanã até nas cadeiras mais altas hoje. Atmosfera incrível para o clássico. 🔥",
    time:"há 27 min", likes:58, liked:false,
    comments:[{name:"Juliana", text:"Eu estava lá, foi surreal 🙌"}, {name:"Pedro", text:"Melhor público do ano"}]
  },
  {
    id: cryptoId(), name:"Time CAMPO", team:"Seleção",
    text:"A comissão técnica confirmou a lista de convocados para os próximos amistosos. Três novidades chamam atenção.",
    time:"há 40 min", likes:91, liked:false,
    comments:[]
  },
  {
    id: cryptoId(), name:"Ícaro Lemos", team:"Corinthians",
    text:"Defesa sólida hoje, quase não sofremos chances claras. Precisamos manter essa consistência nos próximos jogos.",
    time:"há 1 h", likes:21, liked:false,
    comments:[{name:"Ana", text:"Concordo, o sistema defensivo evoluiu bastante"}]
  },
  {
    id: cryptoId(), name:"Sofia Brandão", team:"São Paulo",
    text:"Aquele gol de falca no ângulo ainda está passando na minha cabeça. Que categoria! 🏆",
    time:"há 2 h", likes:47, liked:false,
    comments:[]
  }
];

let activeFilter = "Todos";

function cryptoId(){ return Math.random().toString(36).slice(2,10); }
function initials(name){
  return name.trim().split(/\s+/).slice(0,2).map(w=>w[0].toUpperCase()).join('');
}
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderFeed(){
  const feed = document.getElementById('feed');
  const visible = posts.filter(p => activeFilter === "Todos" || p.team === activeFilter);

  if(visible.length === 0){
    feed.innerHTML = `<div class="empty-state">Nenhuma publicação de ${escapeHtml(activeFilter)} ainda. Seja o primeiro a publicar! ⚽</div>`;
    return;
  }

  feed.innerHTML = visible.map(p => `
    <article class="post" style="--team-color:${TEAM_COLORS[p.team] || 'var(--grass)'}" data-id="${p.id}">
      <div class="post-head">
        <div class="avatar">${initials(p.name)}</div>
        <div class="post-meta">
          <div class="post-name">${escapeHtml(p.name)}</div>
          <div class="post-sub"><span class="team-badge">${escapeHtml(p.team)}</span> · ${p.time}</div>
        </div>
        ${p.own ? `<button class="delete-btn" data-action="delete" aria-label="Excluir publicação">×</button>` : ''}
      </div>
      <div class="post-text">${escapeHtml(p.text)}</div>
      <div class="post-actions">
        <button class="like-btn ${p.liked ? 'liked':''}" data-action="like">${p.liked ? '⚽' : '🤍'} <span>${p.likes}</span></button>
        <button data-action="comment">💬 <span>${p.comments.length}</span></button>
        <button data-action="share">↗ Compartilhar</button>
      </div>
      <div class="comments" data-role="comments">
        ${p.comments.map(c => `
          <div class="comment-item">
            <div class="c-avatar">${initials(c.name)}</div>
            <div><b>${escapeHtml(c.name)}</b>${escapeHtml(c.text)}</div>
          </div>
        `).join('')}
        <div class="comment-form">
          <input type="text" placeholder="Escreva um comentário..." data-role="comment-input">
          <button data-action="send-comment">Enviar</button>
        </div>
      </div>
    </article>
  `).join('');
}

const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeBtn.textContent = isDark ? '☀️ Claro' : '🌙 Escuro';
});
const nameInput = document.getElementById('nameInput');
const teamInput = document.getElementById('teamInput');
const postText = document.getElementById('postText');
const charCount = document.getElementById('charCount');
const publishBtn = document.getElementById('publishBtn');

postText.addEventListener('input', () => {
  const remaining = 220 - postText.value.length;
  charCount.textContent = remaining + ' caracteres restantes';
  publishBtn.disabled = postText.value.trim().length === 0;
});

document.querySelectorAll('.quick-tags button').forEach(btn => {
  btn.addEventListener('click', () => {
    postText.value += btn.dataset.emoji;
    postText.dispatchEvent(new Event('input'));
    postText.focus();
  });
});

publishBtn.addEventListener('click', () => {
  const text = postText.value.trim();
  if(!text) return;
  const name = nameInput.value.trim() || 'Torcedor';
  const team = teamInput.value;

  posts.unshift({
    id: cryptoId(), name, team, text, time:'agora mesmo',
    likes:0, liked:false, comments:[], own:true
  });

  postText.value = '';
  charCount.textContent = '220 caracteres restantes';
  publishBtn.disabled = true;
  activeFilter = "Todos";
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.team === "Todos"));
  renderFeed();
  showToast('Publicado com sucesso! ⚽');
});


document.getElementById('filters').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if(!chip) return;
  activeFilter = chip.dataset.team;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  renderFeed();
});


document.getElementById('feed').addEventListener('click', (e) => {
  const article = e.target.closest('.post');
  if(!article) return;
  const id = article.dataset.id;
  const post = posts.find(p => p.id === id);
  const action = e.target.closest('[data-action]')?.dataset.action;

  if(action === 'like'){
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
  } else if(action === 'comment'){
    article.querySelector('[data-role="comments"]').classList.toggle('open');
  } else if(action === 'share'){
    showToast('Link copiado para a área de transferência! 🔗');
  } else if(action === 'delete'){
    posts = posts.filter(p => p.id !== id);
    renderFeed();
  } else if(action === 'send-comment'){
    const input = article.querySelector('[data-role="comment-input"]');
    const text = input.value.trim();
    if(!text) return;
    post.comments.push({name: nameInput.value.trim() || 'Torcedor', text});
    renderFeed();
    const newArticle = document.querySelector(`.post[data-id="${id}"]`);
    newArticle.querySelector('[data-role="comments"]').classList.add('open');
  }
});

document.getElementById('feed').addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && e.target.dataset.role === 'comment-input'){
    e.target.closest('.post').querySelector('[data-action="send-comment"]').click();
  }
});

let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

renderFeed();