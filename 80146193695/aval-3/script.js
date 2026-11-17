// Função para curtir e descurtir ao clicar no coração
function alternarCurtida(botao) {
  const post = botao.closest('.post');
  const contadorElemento = post.querySelector('.likes-count strong');
  let curtidas = parseInt(contadorElemento.textContent);

  if (botao.textContent === '🤍') {
    botao.textContent = '❤️';
    curtidas++;
  \} else {
    botao.textContent = '🤍';
    curtidas--;
  \}

  contadorElemento.textContent = curtidas;
\}

// Função para curtir ao dar duplo clique na foto
function curtirDuploClique(imagem) {
  const post = imagem.closest('.post');
  const botaoCurtir = post.querySelector('.like-btn');

  if (botaoCurtir.textContent === '🤍') {
    alternarCurtida(botaoCurtir);
  \}
\}

// Função para salvar/favoritar o post
function salvarPost(botao) {
  if (botao.style.opacity === '0.4') {
    botao.style.opacity = '1';
  \} else {
    botao.style.opacity = '0.4';
    alert('Post salvo nos seus itens favoritos!');
  \}
\}

// Função para publicar um novo comentário
function adicionarComentario(evento, formulario) {
  evento.preventDefault(); // Evita que a página recarregue

  const input = formulario.querySelector('input');
  const textoComentario = input.value.trim();

  if (textoComentario !== '') {
    const post = formulario.closest('.post');
    const listaComentarios = post.querySelector('.comments-list');

    const novoComentario = document.createElement('p');
    novoComentario.innerHTML = `<strong>voce</strong> \${textoComentario\}`;

    listaComentarios.appendChild(novoComentario);
    input.value = ''; // Limpa o campo de texto
  \}
\}$0