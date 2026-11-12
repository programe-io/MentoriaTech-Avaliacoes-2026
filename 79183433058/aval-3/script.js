// 1. Funcionalidade de Curtir (Coração e Duplo Clique na Foto)
const botoesCurtir = document.querySelectorAll('.left-actions .fa-heart');

botoesCurtir.forEach((coracao) => {
  const cardPost = coracao.closest('.post-card');
  const fotoPost = cardPost.querySelector('.post-image img');
  const textoCurtidas = cardPost.querySelector('.likes');

  // Extrai o número inicial de curtidas do texto
  let curtidasAtuais = parseInt(textoCurtidas.textContent.replace(/\\D/g, '')) || 100;

  function alternarCurtida() {
    if (coracao.classList.contains('liked')) {
      // Descurtir
      coracao.classList.remove('liked', 'fa-solid');
      coracao.classList.add('fa-regular');
      curtidasAtuais--;
    \} else {
      // Curtir
      coracao.classList.add('liked', 'fa-solid');
      coracao.classList.remove('fa-regular');
      curtidasAtuais++;
    \}
    textoCurtidas.innerHTML = `Curtido por <strong>lourencofilho_oficial</strong> e <strong>outras \${curtidasAtuais\} pessoas</strong>`;
  \}

  // Clica no ícone de coração
  coracao.addEventListener('click', alternarCurtida);

  // Duplo clique na imagem para curtir
  fotoPost.addEventListener('dblclick', () => {
    if (!coracao.classList.contains('liked')) {
      alternarCurtida();
    \}
  \});
\});

// 2. Funcionalidade de Salvar Post (Bandeirinha)
const botoesSalvar = document.querySelectorAll('.post-actions .fa-bookmark');

botoesSalvar.forEach((salvar) => {
  salvar.addEventListener('click', () => {
    if (salvar.classList.contains('fa-regular')) {
      salvar.classList.remove('fa-regular');
      salvar.classList.add('fa-solid');
    \} else {
      salvar.classList.remove('fa-solid');
      salvar.classList.add('fa-regular');
    \}
  \});
\});

// 3. Botões "Seguir" na Barra Lateral
const botoesSeguir = document.querySelectorAll('.follow-link');

botoesSeguir.forEach((botao) => {
  botao.addEventListener('click', (evento) => {
    evento.preventDefault();
    if (botao.textContent === 'Seguir') {
      botao.textContent = 'Seguindo';
      botao.style.color = '#262626';
    \} else {
      botao.textContent = 'Seguir';
      botao.style.color = '#0095f6';
    \}
  \});
\});

// 4. Barra de Pesquisa (Filtra postagens pela legenda)
const campoPesquisa = document.querySelector('.search-box input');
const postagens = document.querySelectorAll('.post-card');

if (campoPesquisa) {
  campoPesquisa.addEventListener('input', (evento) => {
    const termo = evento.target.value.toLowerCase();

    postagens.forEach((post) => {
      const conteudo = post.textContent.toLowerCase();
      post.style.display = conteudo.includes(termo) ? 'block' : 'none';
    \});
  \});$0