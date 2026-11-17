javascript
// Alternar curtida (coração branco/vermelho) e atualizar contador
function alternarCurtida(botao) {
  const post = botao.closest('.post');
  const contador = post.querySelector('.contador');
  let total = parseInt(contador.innerText);

  if (botao.innerText === '🤍') {
    botao.innerText = '❤️';
    total++;
  } else {
    botao.innerText = '🤍';
    total--;
  }

  contador.innerText = total;
}

// Adicionar um novo comentário abaixo da foto
function comentar(botao) {
  const form = botao.closest('.form-comentario');
  const input = form.querySelector('input');
  const texto = input.value.trim();

  if (texto === '') return;

  const lista = botao.closest('.post-conteudo').querySelector('.lista-comentarios');
  const novoComentario = document.createElement('p');
  novoComentario.innerHTML = `<strong>voce</strong> ${escapeHTML(texto)}`;

  lista.appendChild(novoComentario);
  input.value = '';
}

// Criar uma nova publicação no topo do feed
function adicionarPost() {
  const usuarioInput = document.getElementById('usuario');
  const imagemInput = document.getElementById('imagem-url');
  const legendaInput = document.getElementById('legenda');
  const feed = document.getElementById('feed');

  const usuario = usuarioInput.value.trim() || 'usuario.novo';
  const legenda = legendaInput.value.trim();
  // Se o usuário não colar um link, gera uma imagem aleatória automaticamente
  const imagemUrl = imagemInput.value.trim() || `https://picsum.photos{Date.now()}/600/450`;

  if (legenda === '') {
    alert('Escreva uma legenda antes de compartilhar!');
    return;
  }

  const novoPost = document.createElement('article');
  novoPost.classList.add('post');

  novoPost.innerHTML = `
    <div class="post-header">
      <img class="avatar-mini" src="https://picsum.photos{escapeHTML(usuario)}/60" alt="Avatar">
      <strong>${escapeHTML(usuario)}</strong>
    </div>
    <img class="post-imagem" src="${escapeHTML(imagemUrl)}" alt="Foto da publicação">
    <div class="post-conteudo">
      <div class="post-acoes">
        <button class="btn-like" onclick="alternarCurtida(this)">🤍</button>
        <span>💬</span>
      </div>
      <p class="curtidas">Curtido por <strong class="contador">0</strong> pessoas</p>
      <p class="legenda-texto"><strong>${escapeHTML(usuario)}</strong> ${escapeHTML(legenda)}</p>
      
      <div class="lista-comentarios"></div>
      
      <div class="form-comentario">
        <input type="text" placeholder="Adicione um comentário...">
        <button onclick="comentar(this)">Publicar</button>
      </div>
    </div>
  `;

  feed.prepend(novoPost);

  // Limpa os campos após postar
  imagemInput.value = '';
  legendaInput.value = '';
}

// Evita que tags HTML maliciosas sejam executadas nos textos
function escapeHTML(texto) {
  const div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
}
