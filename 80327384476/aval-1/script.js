const formPost = document.getElementById('form-post');
const feed = document.getElementById('feed');

// Adiciona uma nova publicação ao feed
formPost.addEventListener('submit', function(event) {
  event.preventDefault();

  const autor = document.getElementById('autor').value;
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const horario = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novoPost = document.createElement('article');
  novoPost.classList.add('post');

  novoPost.innerHTML = `
    <div class="post-header">
      <h3>${titulo}</h3>
      <span class="meta">Por <strong>${autor}</strong> • às ${horario}</span>
    </div>
    <p>${conteudo}</p>
    <div class="post-actions">
      <button class="btn-curtir" onclick="curtirPost(this)">❤️ Curtir (<span>0</span>)</button>
    </div>
  `;

  // Insere o novo post no topo do feed
  feed.prepend(novoPost);

  // Limpa os campos do formulário
  formPost.reset();
});

// Função para curtir ou descurtir um post
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