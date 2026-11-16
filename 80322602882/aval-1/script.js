function publicarPost() {
  const tituloInput = document.getElementById('titulo-post');
  const conteudoInput = document.getElementById('conteudo-post');
  const listaPosts = document.getElementById('lista-posts');

  const titulo = tituloInput.value.trim();
  const conteudo = conteudoInput.value.trim();

  if (titulo === '' || conteudo === '') {
    alert('Por favor, preencha o título e o conteúdo!');
    return;
  }

  const novoArticle = document.createElement('article');
  novoArticle.className = 'post';

  novoArticle.innerHTML = `
    <h3>${titulo}</h3>
    <span class="data">Publicado agora mesmo</span>
    <p>${conteudo}</p>
    <button class="btn-curtir" onclick="curtir(this)">Curtir (<span>0</span>)</button>
  `;

  listaPosts.prepend(novoArticle);

  tituloInput.value = '';
  conteudoInput.value = '';
}

function curtir(botao) {
  const span = botao.querySelector('span');
  let curtidas = parseInt(span.innerText);
  curtidas++;
  span.innerText = curtidas;
}