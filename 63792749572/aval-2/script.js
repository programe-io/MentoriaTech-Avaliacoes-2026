const postInput = document.getElementById('postInput');
const postButton = document.getElementById('postButton');
const feedTimeline = document.getElementById('feedTimeline');

postButton.addEventListener('click', function() {
  const text = postInput.value.trim();
  
  if (text === '') {
    alert('Por favor, digite alguma coisa antes de publicar!');
    return;
  }
  
  // Cria a estrutura do novo post
  const newPost = document.createElement('div');
  newPost.className = 'post';
  
  const postText = document.createElement('p');
  postText.className = 'post-text';
  postText.textContent = text;
  
  const postTime = document.createElement('span');
  postTime.className = 'post-time';
  postTime.textContent = 'Postado agora mesmo';
  
  // Monta o elemento
  newPost.appendChild(postText);
  newPost.appendChild(postTime);
  
  // Adiciona o novo post no topo do feed
  feedTimeline.insertBefore(newPost, feedTimeline.firstChild);
  
  // Limpa o campo de texto
  postInput.value = '';
});