javascript
// Função para criar e publicar um novo post no feed
function publicarPost() {
  const inputAutor = document.getElementById('autor');
  const inputMensagem = document.getElementById('mensagem');
  const feed = document.getElementById('feed');

  const autor = inputAutor.value.trim();
  const mensagem = inputMensagem.value.trim();

  // Validação simples para evitar posts vazios
  if (autor === '' || mensagem === '') {
    alert('Por favor, preencha seu nome e escreva uma mensagem antes de publicar.');
    return;
  }

  // Pega o horário atual formatado (ex: 10:30)
  const agora = new Date();
  const horaFormatada = agora.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Cria o elemento HTML do novo post
  const novoPost = document.createElement('article');
  novoPost.classList.add('post');

  novoPost.innerHTML = `
    <div class="post-header">
      <strong>${escapeHTML(autor)}</strong>
      <span class="data">Hoje às ${horaFormatada}</span>
    </div>
    <p class="post-texto">${escapeHTML(mensagem)}</p>
    <div class="post-acoes">
      <button class="btn-curtir" onclick="curtirPost(this)">❤️ Curtir (<span>0</span>)</button>
      <button class="btn-excluir" onclick="excluirPost(this)">🗑️ Excluir</button>
    </div>
  `;

  // Adiciona o novo post no topo do feed
  feed.prepend(novoPost);

  // Limpa os campos de texto após publicar
  inputMensagem.value = '';
  inputMensagem.focus();
}

// Função para incrementar o contador de curtidas
function curtirPost(botao) {
  const spanContador = botao.querySelector('span');
  let curtidas = parseInt(spanContador.innerText);
  curtidas++;
  spanContador.innerText = curtidas;
}

// Função para remover o post do feed
function excluirPost(botao) {
  const post = botao.closest('.post');
  post.remove();
}

// Função de segurança para evitar que códigos HTML sejam injetados nos textos
function escapeHTML(texto) {
  const div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
}