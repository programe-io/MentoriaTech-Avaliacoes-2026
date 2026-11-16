const btnTraje = document.getElementById('btn-traje');
const btnPublicar = document.getElementById('btn-publicar');
const feedPosts = document.getElementById('feed-posts');
const filtroBtns = document.querySelectorAll('.filtro-btn');

// Alternar Tema Simbionte
btnTraje.addEventListener('click', () => {
  document.body.classList.toggle('simbionte');
  btnTraje.textContent = document.body.classList.contains('simbionte') 
    ? 'Modo Clássico 🔴' 
    : 'Modo Simbionte ⚫';
});

// Publicar nova notícia no blog
btnPublicar.addEventListener('click', () => {
  const titulo = document.getElementById('post-titulo').value.trim();
  const categoria = document.getElementById('post-categoria').value;
  const conteudo = document.getElementById('post-conteudo').value.trim();

  if (!titulo || !conteudo) {
    alert('Preencha o título e o conteúdo da notícia!');
    return;
  }

  const novoPost = document.createElement('article');
  novoPost.classList.add('post-card');
  novoPost.setAttribute('data-categoria', categoria);

  novoPost.innerHTML = `
    <div class="post-meta">
      <span class="badge">${categoria}</span>
      <span class="data">Agora mesmo</span>
    </div>
    <h2>${titulo}</h2>
    <p>${conteudo}</p>
    <button class="btn-like">❤️ Curtir (<span>0</span>)</button>
  `;

  feedPosts.prepend(novoPost);

  // Limpar campos
  document.getElementById('post-titulo').value = '';
  document.getElementById('post-conteudo').value = '';
});

// Sistema de curtidas (funciona também para posts novos)
feedPosts.addEventListener('click', (e) => {
  const btnLike = e.target.closest('.btn-like');
  if (btnLike) {
    const span = btnLike.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
  }
});

// Filtrar postagens por categoria
filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const categoriaSelecionada = btn.getAttribute('data-cat');
    const posts = document.querySelectorAll('.post-card');

    posts.forEach(post => {
      if (categoriaSelecionada === 'Todos' || post.getAttribute('data-categoria') === categoriaSelecionada) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
});
