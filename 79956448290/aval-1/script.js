document.getElementById('form-post').addEventListener('submit', function(event) {
  event.preventDefault();

  // Pega os valores digitados nos campos
  const titulo = document.getElementById('titulo-post').value;
  const categoria = document.getElementById('categoria-post').value;
  const conteudo = document.getElementById('conteudo-post').value;

  // Cria o elemento do novo post
  const novoArticle = document.createElement('article');
  novoArticle.classList.add('post');

  // Data atual formatada
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  novoArticle.innerHTML = `
    <span class="categoria">${categoria}</span>
    <h3>${titulo}</h3>
    <p class="data">Publicado em ${dataAtual}</p>
    <p>${conteudo}</p>
  `;

  // Adiciona o novo post logo abaixo do título "Últimas Postagens"
  const listaPosts = document.getElementById('lista-posts');
  const tituloSecao = listaPosts.querySelector('h2');
  tituloSecao.insertAdjacentElement('afterend', novoArticle);

  // Limpa o formulário após publicar
  document.getElementById('form-post').reset();
});