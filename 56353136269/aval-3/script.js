const btnPublicar = document.getElementById('btn-publicar');
const postInput = document.getElementById('post-input');
const imageInput = document.getElementById('image-input');
const feedContainer = document.getElementById('feed-container');

// Criar nova postagem no perfil de Ariadna
btnPublicar.addEventListener('click', () => {
  const texto = postInput.value.trim();
  const imagemUrl = imageInput.value.trim();

  if (texto === '' && imagemUrl === '') {
    alert('Escreva algo ou insira o link de uma imagem antes de publicar!');
    return;
  }

  const novoPost = document.createElement('article');
  novoPost.classList.add('post');

  const imagemHTML = imagemUrl
    ? `<img src="${imagemUrl}" alt="Imagem publicada por Ariadna" class="post-image">`
    : '';

  novoPost.innerHTML = `
    <div class="post-header">
      <div class="avatar">A</div>
      <div class="user-info">
        <strong>Ariadna</strong>
        <span>agora mesmo</span>
      </div>
    </div>

    ${texto ? `<p class="post-text">${texto}</p>` : ''}
    ${imagemHTML}

    <div class="post-actions">
      <button class="btn-curtir" onclick="curtirPost(this)">Curtir (<span>0</span>)</button>
      <button class="btn-comentar" onclick="toggleComentarios(this)">Comentar</button>
    </div>

    <div class="comments-section" style="display: none;">
      <div class="comments-list"></div>
      <div class="comment-form">
        <input type="text" placeholder="Escreva um comentário...">
        <button onclick="adicionarComentario(this)">Enviar</button>
      </div>
    </div>
  `;

  // Adiciona a nova postagem no topo do feed
  feedContainer.prepend(novoPost);

  // Limpa os campos
  postInput.value = '';
  imageInput.value = '';
});

// Alternar curtida e atualizar contador
function curtirPost(botao) {
  const contadorSpan = botao.querySelector('span');
  let curtidas = parseInt(contadorSpan.textContent);

  if (botao.classList.contains('curtido')) {
    botao.classList.remove('curtido');
    contadorSpan.textContent = curtidas - 1;
  } else {
    botao.classList.add('curtido');
    contadorSpan.textContent = curtidas + 1;
  }
}

// Exibir ou ocultar a caixa de comentários
function toggleComentarios(botao) {
  const post = botao.closest('.post');
  const commentsSection = post.querySelector('.comments-section');
  
  if (commentsSection.style.display === 'none') {
    commentsSection.style.display = 'block';
    commentsSection.querySelector('input').focus();
  } else {
    commentsSection.style.display = 'none';
  }
}

// Adicionar comentário como Ariadna
function adicionarComentario(botao) {
  const form = botao.closest('.comment-form');
  const input = form.querySelector('input');
  const textoComentario = input.value.trim();

  if (textoComentario === '') return;

  const commentsList = form.previousElementSibling;
  const novoComentario = document.createElement('div');
  novoComentario.classList.add('comment-item');
  novoComentario.innerHTML = `<strong>Ariadna:</strong> ${textoComentario}`;

  commentsList.appendChild(novoComentario);
  input.value = '';
}