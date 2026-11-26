// Elementos principais
const listaStories = document.getElementById('listaStories');
const listaFeed = document.getElementById('listaFeed');
const gradeExplorar = document.getElementById('gradeExplorar');
const gradePerfil = document.getElementById('gradePerfil');
const inputBusca = document.getElementById('inputBusca');

// Modal de criação
const modalPost = document.getElementById('modalPost');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnFecharModal = document.getElementById('btnFecharModal');
const inputArquivo = document.getElementById('inputArquivo');
const inputUrl = document.getElementById('inputUrl');
const inputLegenda = document.getElementById('inputLegenda');
const previewImagem = document.getElementById('previewImagem');
const btnPublicar = document.getElementById('btnPublicar');

// Stories Viewer
const modalStory = document.getElementById('modalStory');
const storyProgresso = document.getElementById('storyProgresso');
let storyAtualIndex = 0;
let timerStory = null;

// Estado da aplicação
let imagemBase64 = '';
let subabaPerfilAtual = 'posts';

const usuarioLogado = {
  usuario: 'voce.oficial',
  avatar: 'https://unsplash.com'
};

const stories = [
  {
    nome: 'Seu story',
    avatar: usuarioLogado.avatar,
    midia: 'https://unsplash.com',
    texto: 'Codando um clone completo do Instagram! 💻🔥'
  },
  {
    nome: 'ana.dev',
    avatar: 'https://unsplash.com',
    midia: 'https://unsplash.com',
    texto: 'Setup pronto para mais um dia de trabalho ☕'
  },
  {
    nome: 'lucas_foto',
    avatar: 'https://unsplash.com',
    midia: 'https://unsplash.com',
    texto: 'Explorando trilhas novas neste fim de semana 🌲'
  },
  {
    nome: 'mariana.ux',
    avatar: 'https://unsplash.com',
    midia: 'https://unsplash.com',
    texto: 'Paleta de cores nova saindo do forno 🎨'
  }
];

let posts = JSON.parse(localStorage.getItem('instagramCompletoPosts')) || [
  {
    id: 1,
    usuario: 'voce.oficial',
    avatar: usuarioLogado.avatar,
    imagem: 'https://unsplash.com',
    legenda: 'Meu primeiro post no Instagram completo feito em HTML, CSS e JS! 🚀',
    curtidas: 89,
    curtido: false,
    salvo: true,
    seguindo: false,
    comentarios: [{ autor: 'ana.dev', texto: 'Ficou sensacional!' }],
    data: 'Há 1 hora'
  },
  {
    id: 2,
    usuario: 'ana.dev',
    avatar: 'https://unsplash.com',
    imagem: 'https://unsplash.com',
    legenda: 'Café passado e código limpo para começar bem o dia ☕💻',
    curtidas: 142,
    curtido: true,
    salvo: false,
    seguindo: true,
    comentarios: [],
    data: 'Há 3 horas'
  },
  {
    id: 3,
    usuario: 'lucas_foto',
    avatar: 'https://unsplash.com',
    imagem: 'https://unsplash.com',
    legenda: 'A natureza sempre entrega os melhores cenários 🏔️✨',
    curtidas: 310,
    curtido: false,
    salvo: true,
    seguindo: false,
    comentarios: [{ autor: 'mariana.ux', texto: 'Que fotografia linda!' }],
    data: 'Há 6 horas'
  }
];

function salvarDados() {
  localStorage.setItem('instagramCompletoPosts', JSON.stringify(posts));
}

// ================= NAVEGAÇÃO ENTRE ABAS =================
function mudarAba(nomeAba) {
  document.querySelectorAll('.aba').forEach(aba => aba.classList.remove('ativa'));
  document.getElementById(`aba-${nomeAba}`).classList.add('ativa');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('ativa', btn.dataset.aba === nomeAba);
  });

  if (nomeAba === 'explorar') renderizarExplorar();
  if (nomeAba === 'perfil') renderizarPerfil();
}

// ================= MODO ESCURO =================
document.getElementById('btnTema').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ================= STORIES =================
function renderizarStories() {
  listaStories.innerHTML = stories.map((story, index) => `
    <div class="story-item" onclick="abrirStory(${index})">
      <div class="story-borda">
        <img src="${story.avatar}" alt="${story.nome}">
      </div>
      <span class="story-nome">${story.nome}</span>
    </div>
  `).join('');
}

function abrirStory(index) {
  storyAtualIndex = index;
  const story = stories[index];
  if (!story) return fecharStory();

  document.getElementById('storyViewerAvatar').src = story.avatar;
  document.getElementById('storyViewerNome').textContent = story.nome;
  document.getElementById('storyViewerImagem').src = story.midia;
  document.getElementById('storyViewerTexto').textContent = story.texto;

  modalStory.classList.remove('oculto');
  iniciarBarraStory();
}

function iniciarBarraStory() {
  clearInterval(timerStory);
  let largura = 0;
  storyProgresso.style.width = '0%';

  timerStory = setInterval(() => {
    largura += 2;
    storyProgresso.style.width = `${largura}%`;
    if (largura >= 100) {
      proximoStory();
    }
  }, 80); // 4 segundos por story
}

function proximoStory() {
  if (storyAtualIndex + 1 < stories.length) {
    abrirStory(storyAtualIndex + 1);
  } else {
    fecharStory();
  }
}

function fecharStory() {
  clearInterval(timerStory);
  modalStory.classList.add('oculto');
}

// ================= FEED PRINCIPAL =================
function renderizarFeed() {
  listaFeed.innerHTML = posts.map(post => {
    const ehMeuPost = post.usuario === usuarioLogado.usuario;
    const comentariosHTML = post.comentarios.map(c => `
      <div><strong>${c.autor}</strong> ${c.texto}</div>
    `).join('');

    return `
      <article class="post">
        <div class="post-topo">
          <div class="post-autor">
            <img src="${post.avatar}" alt="${post.usuario}">
            <span>${post.usuario}</span>
            ${!ehMeuPost ? `
              <button class="btn-seguir ${post.seguindo ? 'seguindo' : ''}" onclick="alternarSeguir('${post.usuario}')">
                • ${post.seguindo ? 'Seguindo' : 'Seguir'}
              </button>
            ` : ''}
          </div>
          ${ehMeuPost ? `<button class="btn-excluir" onclick="excluirPost(${post.id})" title="Excluir">&times;</button>` : ''}
        </div>

        <div class="post-midia" ondblclick="curtirDuploClique(${post.id}, this)">
          <img src="${post.imagem}" alt="Post">
          <div class="coracao-animado">♥</div>
        </div>

        <div class="post-acoes">
          <div class="acoes-esquerda">
            <button class="btn-icone ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
              ${post.curtido ? '♥' : '♡'}
            </button>
            <button class="btn-icone" onclick="document.getElementById('coment-${post.id}').focus()">💬</button>
          </div>
          <button class="btn-icone" onclick="alternarSalvar(${post.id})">
            ${post.salvo ? '🔖' : '📑'}
          </button>
        </div>

        <div class="post-info">
          <div class="curtidas-texto">${post.curtidas} curtidas</div>
          <div class="legenda-texto"><strong>${post.usuario}</strong> ${post.legenda}</div>
          <div class="comentarios-lista">${comentariosHTML}</div>
          <div class="data-post">${post.data}</div>
        </div>

        <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
          <input type="text" id="coment-${post.id}" placeholder="Adicione um comentário..." required>
          <button type="submit">Publicar</button>
        </form>
      </article>
    `;
  }).join('');
}

// ================= INTERAÇÕES DOS POSTS =================
function alternarCurtida(id) {
  posts = posts.map(p => {
    if (p.id === id) {
      const novo = !p.curtido;
      return { ...p, curtido: novo, curtidas: novo ? p.curtidas + 1 : p.curtidas - 1 };
    }
    return p;
  });
  salvarDados();
  renderizarFeed();
}

function curtirDuploClique(id, el) {
  const coracao = el.querySelector('.coracao-animado');
  coracao.classList.add('ativo');
  setTimeout(() => coracao.classList.remove('ativo'), 600);

  const post = posts.find(p => p.id === id);
  if (post && !post.curtido) alternarCurtida(id);
}

function alternarSalvar(id) {
  posts = posts.map(p => p.id === id ? { ...p, salvo: !p.salvo } : p);
  salvarDados();
  renderizarFeed();
  renderizarPerfil();
}

function alternarSeguir(usuario) {
  posts = posts.map(p => p.usuario === usuario ? { ...p, seguindo: !p.seguindo } : p);
  salvarDados();
  renderizarFeed();
}

function adicionarComentario(e, id) {
  e.preventDefault();
  const input = document.getElementById(`coment-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  posts = posts.map(p => p.id === id
    ? { ...p, comentarios: [...p.comentarios, { autor: usuarioLogado.usuario, texto }] }
    : p
  );
  salvarDados();
  renderizarFeed();
}

function excluirPost(id) {
  if (!confirm('Deseja excluir esta publicação?')) return;
  posts = posts.filter(p => p.id !== id);
  salvarDados();
  renderizarFeed();
  renderizarPerfil();
}

// ================= ABA EXPLORAR =================
function renderizarExplorar(filtro = '') {
  const termo = filtro.toLowerCase();
  const filtrados = posts.filter(p =>
    p.usuario.toLowerCase().includes(termo) ||
    p.legenda.toLowerCase().includes(termo)
  );

  gradeExplorar.innerHTML = filtrados.map(p => `
    <div class="grade-item" onclick="mudarAba('feed')" title="${p.usuario}: ${p.legenda}">
      <img src="${p.imagem}" alt="Explorar">
    </div>
  `).join('');
}

