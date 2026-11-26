const textoPost = document.getElementById('textoPost');
const imagemPost = document.getElementById('imagemPost');
const btnPublicar = document.getElementById('btnPublicar');
const listaFeed = document.getElementById('listaFeed');

// Carrega posts salvos ou inicia com um post de boas-vindas
let posts = JSON.parse(localStorage.getItem('meuFeedPessoal')) || [
  {
    id: 1,
    autor: 'Você',
    data: 'Agora mesmo',
    texto: 'Bem-vindo ao seu feed pessoal! Escreva algo acima para começar.',
    imagem: '',
    curtidas: 0,
    curtido: false
  }
];

function salvarPosts() {
  localStorage.setItem('meuFeedPessoal', JSON.stringify(posts));
}

function formatarData() {
  const agora = new Date();
  return agora.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderizarFeed() {
  listaFeed.innerHTML = '';

  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';

    const imagemHTML = post.imagem
      ? `<img src="${post.imagem}" alt="Imagem do post" class="post-imagem" onerror="this.style.display='none'">`
      : '';

    article.innerHTML = `
      <div class="post-cabecalho">
        <div class="autor-info">
          <div class="avatar">EU</div>
          <div>
            <strong>${post.autor}</strong>
            <div class="data-post">${post.data}</div>
          </div>
        </div>
        <button class="btn-excluir" onclick="excluirPost(${post.id})">Excluir</button>
      </div>
      <p class="post-texto">${post.texto}</p>
      ${imagemHTML}
      <div class="post-rodape">
        <button class="btn-curtir ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
          ♥ ${post.curtidas} ${post.curtidas === 1 ? 'Curtida' : 'Curtidas'}
        </button>
      </div>
    `;

    listaFeed.appendChild(article);
  });
}

btnPublicar.addEventListener('click', () => {
  const texto = textoPost.value.trim();
  const imagem = imagemPost.value.trim();

  if (!texto && !imagem) return;

  const novoPost = {
    id: Date.now(),
    autor: 'Você',
    data: formatarData(),
    texto: texto,
    imagem: imagem,
    curtidas: 0,
    curtido: false
  };

  posts.unshift(novoPost);
  salvarPosts();
  renderizarFeed();

  textoPost.value = '';
  imagemPost.value = '';
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

  salvarPosts();
  renderizarFeed();
}

function excluirPost(id) {
  posts = posts.filter(post => post.id !== id);
  salvarPosts();
  renderizarFeed();
}

// Renderiza o feed ao abrir a página
renderizarFeed();
