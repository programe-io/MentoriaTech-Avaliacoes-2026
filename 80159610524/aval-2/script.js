function criarPost() {
  const input = document.getElementById('post-input');
  const texto = input.value.trim();
  
  if (texto === "") {
    alert("Por favor, digite algo antes de publicar!");
    return;
  \}
  
  const wrapper = document.getElementById('posts-wrapper');
  
  // Cria o elemento do novo post
  const novoPost = document.createElement('div');
  novoPost.className = 'post-card';
  
  novoPost.innerHTML = `
    <div class="post-header">
      <img src="https://unsplash.com" alt="Avatar" class="avatar">
      <div>
        <span class="username">Você</span>
        <span class="post-time">Agora mesmo</span>
      </div>
    </div>
    <div class="post-content">
      <p>\${texto\}</p>
    </div>
    <div class="post-actions">
      <button class="action-btn" onclick="alternarCurtida(this)">
        ❤️ <span class="like-count">0</span> Curtidas
      </button>
    </div>
  `;
  
  // Adiciona o novo post no topo do feed
  wrapper.insertBefore(novoPost, wrapper.firstChild);
  
  // Limpa o campo de texto
  input.value = "";
\}

function alternarCurtida(botao) {
  const contador = botao.querySelector('.like-count');
  let curtidas = parseInt(contador.innerText);
  
  if (botao.classList.contains('active')) {
    curtidas--;
    botao.classList.remove('active');
  \} else {
    curtidas++;
    botao.classList.add('active');
  \}
  
  contador.innerText = curtidas;
\}$0