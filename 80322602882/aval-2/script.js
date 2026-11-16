const btnPublicar = document.getElementById('btnPublicar');
const textoPost = document.getElementById('textoPost');
const listaPosts = document.getElementById('listaPosts');

// Criar nova publicação
btnPublicar.addEventListener('click', () => {
  const texto = textoPost.value.trim();
  
  if (texto === '') {
    alert('Escreva algo antes de publicar!');
    return;
  }

  const novoPost = document.createElement('article');
  novoPost.classList.add('post');

  novoPost.innerHTML = `
    <div class="post-header">
      <strong>@voce</strong>
      <span>Agora mesmo</span>
    </div>
    <p class="post-conteudo">${texto}</p>
    <div class="post-acoes">
      <button class="btn-curtir" onclick="curtirPost(this)">❤️ Curtir (<span>0</span>)</button>
    </div>
    <div class="comentarios">
      <div class="lista-comentarios"></div>
      <div class="form-comentario">
        <input type="text" placeholder="Escreva um comentário...">
        <button onclick="comentarPost(this)">Enviar</button>
      </div>
    </div>
  `;

  listaPosts.prepend(novoPost);
  textoPost.value = '';
});

// Função para curtir/descurtir
function curtirPost(botao) {
  const contador = botao.querySelector('span');
  let curtidas = parseInt(contador.textContent);

  if (botao.classList.contains('curtido')) {
    curtidas--;
    botao.classList.remove('curtido');
  } else {
    curtidas++;
    botao.classList.add('curtido');
  }

  contador.textContent = curtidas;
}

// Função para adicionar comentário
function comentarPost(botao) {
  const form = botao.parentElement;
  const input = form.querySelector('input');
  const textoComentario = input.value.trim();

  if (textoComentario === '') return;

  const listaComentarios = form.previousElementSibling;
  const novoComentario = document.createElement('p');
  novoComentario.innerHTML = `<strong>@voce:</strong> ${textoComentario}`;

  listaComentarios.appendChild(novoComentario);
  input.value = '';
}