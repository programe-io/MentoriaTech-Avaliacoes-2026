const portrait = 'https://randomuser.me/api/portraits/men/32.jpg';
const wallpaper = 'https://media.512pixels.net/downloads/macos-wallpapers-6k/11-Big-Sur-Color-Day-6k.jpg';
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
const posts = document.querySelector('#posts');
const caption = 'Aprendendo layout responsivo com Tailwind CSS! 🎨 O segredo é começar pelo mobile e ir expandindo. #TailwindCSS #WebDev';
posts.innerHTML = Array.from({length:3}, (_, i) => `<article class="post" data-id="${i}">
<header class="post-header"><span class="avatar-ring"><img src="${portrait}" alt="Foto de frojho_dev"></span><div class="post-author"><strong>CETI_DrJoaoCarvalho</strong><span>Parnaíba, Pí</span></div><button class="post-more" aria-label="Opções da publicação" data-notice="Publicação de CETI_DrJoaoCarvalho · Dom Expedito Lopes, PI">···</button></header>
<img class="post-image" src="${wallpaper}" alt="Papel de parede abstrato com ondas em azul, roxo, rosa e laranja" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
<div class="post-content"><div class="post-actions"><button class="like" aria-label="Curtir" aria-pressed="false">${icon('heart')}</button><button class="comment" aria-label="Comentar">${icon('comment')}</button><button class="share" aria-label="Compartilhar">${icon('send')}</button><button class="save" aria-label="Salvar publicação" aria-pressed="false">${icon('bookmark')}</button></div><p class="likes">1.234 curtidas</p><p class="caption"><strong>CETI_DrJoaoCarvalho</strong> ${caption}</p><button class="comments-link">Ver todos os <span class="comment-count">42</span> comentários</button><p class="timestamp">Há 2 horas</p></div></article>`).join('');
const userRow = () => `<div class="suggested-user"><img src="${portrait}" alt="Foto de joao"><div class="profile-name"><strong>CETI_DrJoaoCarvalho</strong><span>Sugerido para você</span></div><button class="blue follow" aria-pressed="false">Seguir</button></div>`;
document.querySelector('#suggested-users').innerHTML = userRow().repeat(3);
let toastTimer;
function notify(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.hidden = true, 3000); }
let selectedPost;
const dialog = document.querySelector('#comments-dialog');
const comments = new Map();
function openComments(post) { selectedPost = post; document.querySelector('#comment-list').replaceChildren(); (comments.get(post.dataset.id) || []).forEach(addComment); dialog.showModal(); }
function addComment(text) { const p = document.createElement('p'); const strong = document.createElement('strong'); strong.textContent = 'frojho_dev '; p.append(strong, document.createTextNode(text)); document.querySelector('#comment-list').append(p); }
document.addEventListener('click', async event => {
 const button = event.target.closest('button'); if (!button) return;
 if (button.dataset.notice) notify(button.dataset.notice);
 const post = button.closest('.post');
 if (button.classList.contains('like')) { const active = button.classList.toggle('active'); button.setAttribute('aria-pressed',active); button.setAttribute('aria-label',active?'Descurtir':'Curtir'); post.querySelector('.likes').textContent = `${active?'1.235':'1.234'} curtidas`; }
 if (button.classList.contains('save')) { const active = button.classList.toggle('active'); button.setAttribute('aria-pressed',active); notify(active?'Publicação salva.':'Publicação removida dos salvos.'); }
 if (button.classList.contains('comment') || button.classList.contains('comments-link')) openComments(post);
 if (button.classList.contains('share')) { try { await navigator.clipboard.writeText(location.href); notify('Link copiado!'); } catch { notify('Link da publicação: '+location.href); } }
 if (button.classList.contains('follow')) { const following = button.getAttribute('aria-pressed') !== 'true'; button.setAttribute('aria-pressed',following); button.textContent = following?'Seguindo':'Seguir'; }
});
document.querySelector('.mobile-menu').addEventListener('click', event => { const menu = document.querySelector('.menu-panel'); menu.hidden = !menu.hidden; event.currentTarget.setAttribute('aria-expanded',!menu.hidden); });
document.querySelector('#show-saved').addEventListener('click', () => { const saved = [...document.querySelectorAll('.post')].filter(post => post.querySelector('.save.active')); notify(saved.length ? `${saved.length} publicação(ões) salva(s).` : 'Você ainda não salvou publicações.'); if(saved.length) saved[0].scrollIntoView({behavior:'smooth',block:'center'}); });
document.querySelector('#see-all').addEventListener('click', event => { const expanded = event.currentTarget.textContent === 'Ver Menos'; document.querySelector('#suggested-users').innerHTML = userRow().repeat(expanded?3:6); event.currentTarget.textContent = expanded?'Ver Tudo':'Ver Menos'; });
document.querySelector('#search-button').addEventListener('click', () => document.querySelector('#search-input').focus());
document.querySelector('#search-input').addEventListener('input', event => { const match = ('frojho_dev '+caption).toLowerCase().includes(event.target.value.toLowerCase()); document.querySelectorAll('.post').forEach(post => post.hidden = !match); document.querySelector('#empty-state').hidden = match; });
document.querySelector('#comment-form').addEventListener('submit', event => { event.preventDefault(); const input = document.querySelector('#new-comment'); const text = input.value.trim(); if(!text) return; const list = comments.get(selectedPost.dataset.id) || []; list.push(text); comments.set(selectedPost.dataset.id,list); addComment(text); selectedPost.querySelector('.comment-count').textContent = 42 + list.length; input.value = ''; });
dialog.addEventListener('click', event => { if(event.target === dialog) { const box = dialog.getBoundingClientRect(); if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) dialog.close(); } });