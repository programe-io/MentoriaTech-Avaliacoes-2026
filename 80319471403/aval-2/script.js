const btnPublicar = document.getElementById('btn-publicar');
const inputAutor = document.getElementById('autor');
const inputMensagem = document.getElementById('mensagem');
const feed = document.getElementById('feed');

// Postagens iniciais para demonstração
let postagens = [
  {
    id: 1,
    autor: 'Mariana Silva',
    data: 'Hoje às 14:10',
    texto: 'Acabei de publicar meu primeiro projeto web! 🚀 O que acharam do visual?',
    curtidas: 5,
    curtido: false,
    comentarios: ['Ficou excelente, parabéns!', 'Muito organizado!']
  },
  {
    id: 2,
    autor: 'Carlos Eduardo',
    data: 'Hoje às 13:45',
    texto: 'Dica do dia: sempre revisem o HTML, CSS e JS antes de clicar em Publicar no GitHub Pages.',
    curtidas: 3,
    curtido: true,
    comentarios: []
  }
];

function renderizarFeed() {
  feed.innerHTML = '';

  postagens.forEach((post) => {
    const postEl = document.createElement('article');
    postEl.classList.add('post');

    const comentariosHTML = post.comentarios
      .map((c) => `<li>💬 ${c}</li>`)
      .join('');

    postEl.innerHTML = `
      <div class="post-topo">
        <span class="post-autor">@${post.autor}</span>
        <span class="post-data">${post.data}</span>
      </div>
      <p class="post-conteudo">${post.texto}</p>
      <div class="post-acoes">
        <button class="btn-acao btn-curtir ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
          👍 Curtir (${post.curtidas})
        </button>
        <button class="btn-acao btn-excluir" onclick="excluirPost(${post.id})">
          🗑️ Excluir
        </button>
      </div>
      <div class="comentarios-area">
        <ul class="lista-comentarios">${comentariosHTML}</ul>
        <div class="form-comentario">
          <input type="text" id="input-com-${post.id}" placeholder="Escreva um comentário...">
          <button onclick="adicionarComentario(${post.id})">Enviar</button>
        </div>
      </div>
    `;

    feed.appendChild(postEl);
  });
}

btnPublicar.addEventListener('click', () => {
  const autor = inputAutor.value.trim() || 'Anônimo';
  const texto = inputMensagem.value.trim();

  if (!texto) {
    alert('Escreva alguma mensagem antes de publicar!');
    return;
  }

  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novoPost = {
    id: Date.now(),
    autor: autor,
    data: `Hoje às ${horaFormatada}`,
    texto: texto,
    curtidas: 0,
    curtido: false,
    comentarios: []
  };

  postagens.unshift(novoPost);
  inputMensagem.value = '';
  renderizarFeed();
});

function alternarCurtida(id) {
  const post = postagens.find((p) => p.id === id);
  if (post) {
    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderizarFeed();
  }
}

function adicionarComentario(id) {
  const inputCom = document.getElementById(`input-com-${id}`);
  const textoCom = inputCom.value.trim();

  if (textoCom) {
    const post = postagens.find((p) => p.id === id);
    if (post) {
      post.comentarios.push(textoCom);
      renderizarFeed();
    }
  }
}

function excluirPost(id) {
  postagens = postagens.filter((p) => p.id !== id);
  renderizarFeed();
}

renderizarFeed();