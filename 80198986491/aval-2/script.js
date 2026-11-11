const inputAutor = document.getElementById('autor');
const inputConteudo = document.getElementById('conteudo');
const btnPublicar = document.getElementById('btn-publicar');
const listaPosts = document.getElementById('lista-posts');

// Postagens iniciais de exemplo
let posts = [
  {
    id: 1,
    autor: 'Carlos Mendes',
    hora: 'Agora mesmo',
    texto: 'Bem-vindo ao nosso Mini Feed Social! Teste criar uma nova postagem acima.',
    curtidas: 3,
    curtido: false
  },
  {
    id: 2,
    autor: 'Mariana Costa',
    hora: 'Há 10 min',
    texto: 'Desenvolvendo projetos com HTML, CSS e JavaScript puro!',
    curtidas: 7,
    curtido: true
  }
];

function renderizarFeed() {
  listaPosts.innerHTML = '';

  posts.forEach((post) => {
    const postDiv = document.createElement('article');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
      <div class="post-cabecalho">
        <span class="post-autor">${post.autor}</span>
        <span class="post-hora">${post.hora}</span>
      </div>
      <p class="post-texto">${post.texto}</p>
      <div class="post-acoes">
        <button class="btn-acao btn-curtir ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
          ❤️ Curtir (${post.curtidas})
        </button>
        <button class="btn-acao btn-excluir" onclick="excluirPost(${post.id})">
          🗑️ Excluir
        </button>
      </div>
    `;

    listaPosts.appendChild(postDiv);
  });
}

function adicionarPost() {
  const autor = inputAutor.value.trim() || 'Usuário Anônimo';
  const texto = inputConteudo.value.trim();

  if (texto === '') {
    alert('Por favor, escreva algo antes de publicar.');
    return;
  }

  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novoPost = {
    id: Date.now(),
    autor: autor,
    hora: `Hoje às ${horaFormatada}`,
    texto: texto,
    curtidas: 0,
    curtido: false
  };

  posts.unshift(novoPost);
  inputConteudo.value = '';
  renderizarFeed();
}

function alternarCurtida(id) {
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderizarFeed();
  }
}

function excluirPost(id) {
  posts = posts.filter((p) => p.id !== id);
  renderizarFeed();
}

btnPublicar.addEventListener('click', adicionarPost);