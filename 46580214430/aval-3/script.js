const btnAbrirModal = document.getElementById('btn-abrir-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const boxNovoPost = document.getElementById('box-novo-post');
const formInstaPost = document.getElementById('form-insta-post');
const instaFeed = document.getElementById('insta-feed');

// Mostrar e ocultar formulário de novo post
btnAbrirModal.addEventListener('click', () => {
  boxNovoPost.classList.toggle('oculto');
});

btnCancelar.addEventListener('click', () => {
  boxNovoPost.classList.add('oculto');
  formInstaPost.reset();
});

// Configurar interações de cada postagem
function inicializarPost(postCard) {
  const btnLike = postCard.querySelector('.btn-like');
  const btnComentar = postCard.querySelector('.btn-comentar');
  const btnSalvar = postCard.querySelector('.btn-salvar');
  const imagemContainer = postCard.querySelector('.post-imagem-container');
  const coracaoAnimado = postCard.querySelector('.coracao-animado');
  const textoLikes = postCard.querySelector('.contagem-likes strong');
  const formComentario = postCard.querySelector('.form-comentario');
  const inputComentario = formComentario.querySelector('input');
  const listaComentarios = postCard.querySelector('.lista-comentarios');

  let curtido = false;
  let totalLikes = parseInt(textoLikes.textContent, 10);

  function atualizarCurtida(forcarCurtir = false) {
    if (forcarCurtir && curtido) return;

    curtido = forcarCurtir ? true : !curtido;
    totalLikes = curtido ? totalLikes + 1 : totalLikes - 1;
    btnLike.textContent = curtido ? '❤️' : '🤍';
    textoLikes.textContent = `${totalLikes} pessoas`;
  }

  // Clique no botão de coração
  btnLike.addEventListener('click', () => atualizarCurtida(false));

  // Clique duplo na foto para curtir com animação
  imagemContainer.addEventListener('dblclick', () => {
    atualizarCurtida(true);
    coracaoAnimado.classList.add('ativo');
    setTimeout(() => {
      coracaoAnimado.classList.remove('ativo');
    }, 650);
  });

  // Botão salvar post
  btnSalvar.addEventListener('click', () => {
    btnSalvar.classList.toggle('salvo');
    btnSalvar.textContent = btnSalvar.classList.contains('salvo') ? '✅' : '🔖';
  });

  // Focar no campo de comentário
  btnComentar.addEventListener('click', () => {
    inputComentario.focus();
  });

  // Publicar comentário
  formComentario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputComentario.value.trim();
    if (!texto) return;

    const item = document.createElement('li');
    item.innerHTML = `<strong>voce_dev</strong> ${texto}`;
    listaComentarios.appendChild(item);
    inputComentario.value = '';
  });
}

// Inicializa os posts existentes
document.querySelectorAll('#insta-feed .card-post').forEach(inicializarPost);

// Criar nova publicação no feed
formInstaPost.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const urlDigitada = document.getElementById('input-imagem').value.trim();
  const legendaDigitada = document.getElementById('input-legenda').value.trim();
  const sementeAleatoria = Math.floor(Math.random() * 1000);
  const urlFinal = urlDigitada || `https://picsum.photos{sementeAleatoria}/600/450`;

  const novoCard = document.createElement('article');
  novoCard.classList.add('card-post');

  novoCard.innerHTML = `
    <div class="post-topo">
      <div class="post-usuario">
        <img src="https://picsum.photos" alt="Avatar">
        <strong>voce_dev</strong>
      </div>
      <span class="pontos">•••</span>
    </div>

    <div class="post-imagem-container">
      <img class="post-foto" src="${urlFinal}" alt="Nova publicação">
      <span class="coracao-animado">❤️</span>
    </div>

    <div class="post-rodape">
      <div class="post-icones">
        <div class="icones-esquerda">
          <button class="btn-icone btn-like" type="button" title="Curtir">🤍</button>
          <button class="btn-icone btn-comentar" type="button" title="Comentar">💬</button>
        </div>
        <button class="btn-icone btn-salvar" type="button" title="Salvar">🔖</button>
      </div>

      <p class="contagem-likes">Curtido por <strong>0 pessoas</strong></p>
      <p class="legenda"><strong>voce_dev</strong> ${legendaDigitada}</p>

      <ul class="lista-comentarios"></ul>

      <form class="form-comentario">
        <input type="text" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </div>
  `;

  instaFeed.prepend(novoCard);
  inicializarPost(novoCard);

  formInstaPost.reset();
  boxNovoPost.classList.add('oculto');
});