const formNovoPost = document.getElementById('form-novo-post');
const textoPost = document.getElementById('texto-post');
const contadorCaracteres = document.getElementById('contador-caracteres');
const timeline = document.getElementById('timeline');
const limiteMaximo = 280;

// Atualiza o contador de caracteres enquanto o usuário digita
textoPost.addEventListener('input', () => {
  const restantes = limiteMaximo - textoPost.value.length;
  contadorCaracteres.textContent = `${restantes} caracteres restantes`;
  contadorCaracteres.style.color = restantes < 0 ? '#e11d48' : '#65676b';
});

// Configura todas as interações de um post (curtir, comentar e excluir)
function configurarEventosPost(postElemento) {
  const btnCurtir = postElemento.querySelector('.btn-curtir');
  const btnFocarComentario = postElemento.querySelector('.btn-focar-comentario');
  const btnExcluir = postElemento.querySelector('.btn-excluir');
  const formComentario = postElemento.querySelector('.form-comentario');
  const inputComentario = formComentario.querySelector('input');
  const listaComentarios = postElemento.querySelector('.lista-comentarios');

  // Alternar curtida (curtir / descurtir)
  btnCurtir.addEventListener('click', () => {
    const spanContador = btnCurtir.querySelector('span');
    let total = parseInt(spanContador.textContent, 10);

    if (btnCurtir.classList.contains('curtido')) {
      btnCurtir.classList.remove('curtido');
      spanContador.textContent = total - 1;
    } else {
      btnCurtir.classList.add('curtido');
      spanContador.textContent = total + 1;
    }
  });

  // Focar no campo de comentário ao clicar em "Comentar"
  btnFocarComentario.addEventListener('click', () => {
    inputComentario.focus();
  });

  // Adicionar novo comentário
  formComentario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputComentario.value.trim();
    if (!texto) return;

    const novoComentario = document.createElement('li');
    novoComentario.innerHTML = `<strong>Você:</strong> ${texto}`;
    listaComentarios.appendChild(novoComentario);
    inputComentario.value = '';
  });

  // Excluir publicação
  btnExcluir.addEventListener('click', () => {
    postElemento.remove();
  });
}

// Ativa os eventos nos posts iniciais da página
document.querySelectorAll('.post').forEach(configurarEventosPost);

// Publicar um novo post no topo do feed
formNovoPost.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const conteudo = textoPost.value.trim();

  if (!conteudo || conteudo.length > limiteMaximo) return;

  const novoPost = document.createElement('article');
  novoPost.classList.add('card', 'post');

  novoPost.innerHTML = `
    <div class="post-cabecalho">
      <div class="autor-info">
        <div class="avatar">VC</div>
        <div>
          <strong>Você</strong>
          <span class="tempo">Agora mesmo</span>
        </div>
      </div>
      <button class="btn-excluir" type="button" title="Excluir post">🗑️</button>
    </div>

    <p class="post-texto">${conteudo}</p>

    <div class="post-acoes">
      <button class="btn-acao btn-curtir" type="button">❤️ Curtir (<span>0</span>)</button>
      <button class="btn-acao btn-focar-comentario" type="button">💬 Comentar</button>
    </div>

    <div class="secao-comentarios">
      <ul class="lista-comentarios"></ul>
      <form class="form-comentario">
        <input type="text" placeholder="Escreva um comentário..." required>
        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

  timeline.prepend(novoPost);
  configurarEventosPost(novoPost);

  textoPost.value = '';
  contadorCaracteres.textContent = `${limiteMaximo} caracteres restantes`;
});