const listaStories = document.getElementById('listaStories');
const listaFeed = document.getElementById('listaFeed');
const modalPost = document.getElementById('modalPost');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnFecharModal = document.getElementById('btnFecharModal');
const inputArquivo = document.getElementById('inputArquivo');
const inputUrl = document.getElementById('inputUrl');
const inputLegenda = document.getElementById('inputLegenda');
const btnPublicar = document.getElementById('btnPublicar');

let imagemBase64 = '';

// Dados iniciais dos Stories
const stories = [
  { nome: 'Seu story', foto: 'https://unsplash.com' },
  { nome: 'ana.dev', foto: 'https://unsplash.com' },
  { nome: 'lucas_foto', foto: 'https://unsplash.com' },
  { nome: 'mariana.ux', foto: 'https://unsplash.com' },
  { nome: 'pedro.js', foto: 'https://unsplash.com' }
];

// Carrega posts salvos no navegador ou inicia com exemplos
let posts = JSON.parse(localStorage.getItem('instaFeedClone')) || [
  {
    id: 1,
    usuario: 'ana.dev',
    avatar: 'https://unsplash.com',
    imagem: 'https://unsplash.com',
    legenda: 'Finalizando mais um projeto em HTML, CSS e JavaScript! 💻☕',
    curtidas: 42,
    curtido: false,
    salvo: false,
    comentarios: [
      { autor: 'lucas_foto', texto: 'Ficou incrível!' }
    ],
    data: 'Há 2 horas'
  },
  {
    id: 2,
    usuario: 'lucas_foto',
    avatar: 'https://unsplash.com',
    imagem: 'https://unsplash.com',
    legenda: 'Fim de tarde perfeito na montanha 🏔️✨',
    curtidas: 128,
    curtido: true,
    salvo: true,
    comentarios: [],
    data: 'Há 5 horas'
  }
];

function salvarDados() {
  localStorage.setItem('instaFeedClone', JSON.stringify(posts));
}

function renderizarStories() {
  listaStories.innerHTML = stories.map(story => `
    <div class="story-item">
      <div class="story-borda">
        <img src="${story.foto}" alt="${story.nome}">
      </div>
      <span class="story-nome">${story.nome}</span>
    </div>
  `).join('');
}

function renderizarFeed() {
  listaFeed.innerHTML = '';

  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';

    const comentariosHTML = post.comentarios.map(c => `
      <div><strong>${c.autor}</strong> ${c.texto}</div>
    `).join('');

    article.innerHTML = `
      <div class="post-topo">
        <div class="post-autor">
          <img src="${post.avatar}" alt="${post.usuario}">
          <span>${post.usuario}</span>
        </div>
        <button class="btn-excluir" onclick="excluirPost(${post.id})" title="Excluir">&times;</button>
      </div>

      <div class="post-midia" ondblclick="curtirDuploClique(${post.id}, this)">
        <img src="${post.imagem}" alt="Publicação">
        <div class="coracao-animado">♥</div>
      </div>

      <div class="post-acoes">
        <div class="acoes-esquerda">
          <button class="btn-icone ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
            ${post.curtido ? '♥' : '♡'}
          </button>
          <button class="btn-icone" onclick="focarComentario(${post.id})">💬</button>
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
    `;

    listaFeed.appendChild(article);
  });
}

// Abre e fecha o modal de nova publicação
btnAbrirModal.addEventListener('click', () => modalPost.classList.remove('oculto'));
btnFecharModal.addEventListener('click', () => modalPost.classList.add('oculto'));

// Fecha o modal ao clicar fora da caixa branca
modalPost.addEventListener('click', (e) => {
  if (e.target === modalPost) {
    modalPost.classList.add('oculto');
  }
});

// Lê arquivo de imagem escolhido do computador
inputArquivo.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = () => {
    imagemBase64 = leitor.result;
    inputUrl.value = 'Imagem selecionada do dispositivo';
  };
  leitor.readAsDataURL(arquivo);
});

// Cria e publica um novo post
btnPublicar.addEventListener('click', () => {
  const imagemFinal = imagemBase64 || inputUrl.value.trim();
  const legenda = inputLegenda.value.trim();

  if (!imagemFinal) {
    alert('Por favor, selecione uma foto ou cole uma URL válida.');
    return;
  }

  const novoPost = {
    id: Date.now(),
    usuario: 'voce.oficial',
    avatar: 'https://unsplash.com',
    imagem: imagemFinal,
    legenda: legenda,
    curtidas: 0,
    curtido: false,
    salvo: false,
    comentarios: [],
    data: 'Agora mesmo'
  };

  posts.unshift(novoPost);
  salvarDados();
  renderizarFeed();

  // Reseta o formulário e fecha o modal
  imagemBase64 = '';
  inputArquivo.value = '';
  inputUrl.value = '';
  inputLegenda.value = '';
  modalPost.classList.add('oculto');
});

function alternarCurtida(id) {
  posts = posts.map(post => {
    if (post.id === id) {
      const novoEstado = !post.curtido;
      return {
        ...post,
        curtido: novoEstado,
        curtidas: novoEstado ? post.curtidas + 1 : post.curtidas - 1
      };
    }
    return post;
  });
  salvarDados();
  renderizarFeed();
}

function curtirDuploClique(id, elemento) {
  const coracao = elemento.querySelector('.coracao-animado');
  coracao.classList.add('ativo');
  setTimeout(() => coracao.classList.remove('ativo'), 600);

  const post = posts.find(p => p.id === id);
  if (post && !post.curtido) {
    alternarCurtida(id);
  }
}

function alternarSalvar(id) {
  posts = posts.map(post => post.id === id ? { ...post, salvo: !post.salvo } : post);
  salvarDados();
  renderizarFeed();
}

function adicionarComentario(event, id) {
  event.preventDefault();
  const input = document.getElementById(`coment-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  posts = posts.map(post => {
    if (post.id === id) {
      return {
        ...post,
        comentarios: [...post.comentarios, { autor: 'voce.oficial', texto }]
      };
    }
    return post;
  });

  salvarDados();
  renderizarFeed();
}

function focarComentario(id) {
  document.getElementById(`coment-${id}`).focus();
}

function excluirPost(id) {
  posts = posts.filter(post => post.id !== id);
  salvarDados();
  renderizarFeed();
}

// Inicializa a página
renderizarStories();
renderizarFeed();
