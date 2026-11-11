const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');

commentForm.addEventListener('submit', function(event) {
  // Evita que a página recarregue ao enviar o formulário
  event.preventDefault();

  const textoComentario = commentInput.value.trim();

  if (textoComentario !== '') {
    // Cria um novo parágrafo para o comentário
    const novoComentario = document.createElement('p');
    novoComentario.innerHTML = `<strong>voce</strong> ${textoComentario}`;

    // Adiciona na lista de comentários
    commentsList.appendChild(novoComentario);

    // Limpa o campo de digitação
    commentInput.value = '';
  }
});