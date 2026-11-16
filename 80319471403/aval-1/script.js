const formPost = document.getElementById('form-post');
const listaPosts = document.getElementById('lista-posts');
const campoBusca = document.getElementById('campo-busca');

// Adiciona uma nova postagem ao blog
formPost.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const categoria = document.getElementById('categoria').value;
  const conteudo = document.getElementById('conteudo').value;
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  const novoArtigo = document.createElement('article');
  novoArtigo.classList.add('post');

  novoArtigo.innerHTML = `
    <span class="tag">${categoria}</span>
    <h3>${titulo}</h3>
    <small>Publicado em ${dataAtual}</small>
    <p>${conteudo}</p>
    <button class="btn-curtir" onclick="curtirPost(this)">❤️ Curtir (<span>0</span>)</button>
  `;

  listaPosts.prepend(novoArtigo);
  formPost.reset();
});

// Incrementa o contador de curtidas
function curtirPost(botao) {
  const contador = botao.querySelector('span');
  let curtidas = parseInt(contador.textContent);
  contador.textContent = curtidas + 1;
}

// Filtra as postagens pelo título digitado
campoBusca.addEventListener('input', function () {
  const termo = campoBusca.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(function (post) {
    const titulo = post.querySelector('h3').textContent.toLowerCase();
    if (titulo.includes(termo)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
});