// Função para curtir e descurtir a publicação
function curtirPost(botao) {
  const post = botao.closest('.post');
  const contadorElemento = post.querySelector('.likes-count');
  let curtidas = parseInt(contadorElemento.textContent);

  if (botao.textContent === '🤍') {
    botao.textContent = '❤️';
    contadorElemento.textContent = curtidas + 1;
  \} else {
    botao.textContent = '🤍';
    contadorElemento.textContent = curtidas - 1;
  \}
\}

// Função para focar no campo de comentário ao clicar no balão
function focarComentario(botao) {
  const post = botao.closest('.post');
  const inputComentario = post.querySelector('.comment-form input');
  inputComentario.focus();
\}

// Função para adicionar um novo comentário no post
function adicionarComentario(evento, formulario) {
  evento.preventDefault();
  
  const input = formulario.querySelector('input');
  const textoComentario = input.value.trim();

  if (textoComentario !== '') {
    const post = formulario.closest('.post');
    const listaComentarios = post.querySelector('.comments-list');
    
    const novoComentario = document.createElement('p');
    novoComentario.innerHTML = `<strong>lavinny.dev</strong> \${textoComentario\}`;
    
    listaComentarios.appendChild(novoComentario);
    input.value = '';
  \}
\}