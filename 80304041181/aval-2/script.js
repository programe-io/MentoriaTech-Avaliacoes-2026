const inputAutor = document.getElementById('autor');
const inputMensagem = document.getElementById('mensagem');
const btnPublicar = document.getElementById('btn-publicar');
const feed = document.getElementById('feed');

// Postagens iniciais de exemplo
let posts = [
  {
    id: 1,
    autor: 'Ana Silva',
    texto: 'Acabei de publicar meu primeiro projeto web! 🚀',
    hora: 'Agora mesmo',
    curtidas: 3,
    curtido: false
  },
  {
    id: 2,
    autor: 'Carlos Mendes',
    texto: 'Estudando manipulação do DOM com JavaScript puro. Muito bom!',
    hora: 'Há 10 min',
    curtidas: 5,
    curtido: true
  }
];

function renderizarFeed() {
  feed.innerHTML = '';

  posts.forEach((post) => {
    const postEl = document.createElement('article');
    postEl.classList.add('post');

    postEl.innerHTML = `
      <div class="post-cabecalho">
        <span class="post-autor">${post.autor}</span>
        <span class="post-hora">${post.hora}</span>
      </div>
      <p class="post-texto">${post.texto}</p>
      <div class="post-acoes">
        <button class="btn-acao btn-curtir ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
          👍 Curtir (${post.curtidas})
        </button>
        <button class="btn-acao btn-excluir" onclick="excluirPost(${post.id})">
          🗑️ Excluir
        </button>
      </div>
    `;

    feed.appendChild(postEl);
  });
}

function adicionarPost() {
  const autor = inputAutor.value.trim() || 'Usuário Anônimo';
  const texto = inputMensagem.value.trim();

  if (texto === '') {
    alert('Por favor, escreva alguma mensagem antes de publicar.');
    return;
  }

  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novoPost = {
    id: Date.now(),
    autor: autor,
    texto: texto,
    hora: `Hoje às ${horaFormatada}`,
    curtidas: 0,
    curtido: false
  };

  posts.unshift(novoPost);
  inputMensagem.value = '';
  renderizarFeed();
}

function alternarCurtida(id) {
  const post = posts.find((item) => item.id === id);
  if (post) {
    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderizarFeed();
  }
}

function excluirPost(id) {
  posts = posts.filter((item) => item.id !== id);
  renderizarFeed();
}

btnPublicar.addEventListener('click', adicionarPost);

// Inicializa o feed na tela
renderizarFeed();