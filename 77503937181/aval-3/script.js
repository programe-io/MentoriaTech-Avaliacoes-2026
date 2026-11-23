document.addEventListener('DOMContentLoaded', () => {
  const btnPublicar = document.getElementById('btn-publicar');
  const postInput = document.getElementById('post-input');
  const imageInput = document.getElementById('image-input');
  const feedContainer = document.getElementById('feed-container');

  // Criar nova postagem no perfil de Kayllow
  btnPublicar.addEventListener('click', () => {
    const texto = postInput.value.trim();
    const imagemUrl = imageInput.value.trim();

    if (texto === '' && imagemUrl === '') {
      alert('Escreva algo ou insira o link de uma imagem antes de publicar!');
      return;
    }

    const novoPost = document.createElement('article');
    novoPost.classList.add('post');

    // Cabeçalho do post
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    postHeader.innerHTML = `
      <div class="avatar">K</div>
      <div class="user-info">
        <strong>Kayllow</strong>
        <span>agora mesmo</span>
      </div>
    `;
    novoPost.appendChild(postHeader);

    // Texto seguro contra caracteres especiais
    if (texto !== '') {
      const paragrafo = document.createElement('p');
      paragrafo.classList.add('post-text');
      paragrafo.textContent = texto;
      novoPost.appendChild(paragrafo);
    }

    // Imagem com tratamento de erro caso a URL seja inválida
    if (imagemUrl !== '') {
      const img = document.createElement('img');
      img.src = imagemUrl;
      img.alt = 'Imagem publicada por Kayllow';
      img.classList.add('post-image');
      img.onerror = () => {
        img.remove();
        alert('Não foi possível carregar a imagem. Verifique se o link termina em .jpg, .png ou similar.');
      };
      novoPost.appendChild(img);
    }

    // Botões de ação e área de comentários
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('post-actions');
    actionsDiv.innerHTML = `
      <button type="button" class="btn-curtir">Curtir (<span>0</span>)</button>
      <button type="button" class="btn-comentar">Comentar</button>
    `;
    novoPost.appendChild(actionsDiv);

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');
    commentsSection.style.display = 'none';
    commentsSection.innerHTML = `
      <div class="comments-list"></div>
      <div class="comment-form">
        <input type="text" class="comment-input" placeholder="Escreva um comentário...">
        <button type="button" class="btn-enviar-comentario">Enviar</button>
      </div>
    `;
    novoPost.appendChild(commentsSection);

    // Adiciona no topo do feed e limpa os campos
    feedContainer.prepend(novoPost);
    postInput.value = '';
    imageInput.value = '';
  });

  // Delegação de eventos para Curtir, Abrir Comentários e Enviar Comentário
  feedContainer.addEventListener('click', (event) => {
    const target = event.target;

    // Botão Curtir (ou o span dentro dele)
    const btnCurtir = target.closest('.btn-curtir');
    if (btnCurtir) {
      const contadorSpan = btnCurtir.querySelector('span');
      let curtidas = parseInt(contadorSpan.textContent, 10) || 0;

      if (btnCurtir.classList.contains('curtido')) {
        btnCurtir.classList.remove('curtido');
        contadorSpan.textContent = curtidas - 1;
      } else {
        btnCurtir.classList.add('curtido');
        contadorSpan.textContent = curtidas + 1;
      }
      return;
    }

    // Botão Comentar (abre/fecha caixa)
    const btnComentar = target.closest('.btn-comentar');
    if (btnComentar) {
      const post = btnComentar.closest('.post');
      const commentsSection = post.querySelector('.comments-section');
      const isHidden = commentsSection.style.display === 'none';

      commentsSection.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        commentsSection.querySelector('.comment-input').focus();
      }
      return;
    }

    // Botão Enviar Comentário
    const btnEnviar = target.closest('.btn-enviar-comentario');
    if (btnEnviar) {
      enviarComentario(btnEnviar.closest('.comment-form'));
    }
  });

  // Permitir enviar comentário apertando Enter
  feedContainer.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('comment-input')) {
      event.preventDefault();
      enviarComentario(event.target.closest('.comment-form'));
    }
  });

  function enviarComentario(form) {
    const input = form.querySelector('.comment-input');
    const textoComentario = input.value.trim();

    if (textoComentario === '') return;

    const commentsList = form.previousElementSibling;
    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comment-item');

    const autor = document.createElement('strong');
    autor.textContent = 'Kayllow: ';

    const conteudo = document.createTextNode(textoComentario);

    novoComentario.appendChild(autor);
    novoComentario.appendChild(conteudo);
    commentsList.appendChild(novoComentario);

    input.value = '';
  }
});