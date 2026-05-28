// --- Sistema de Curtidas ---
let likes = 0;
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

likeBtn.addEventListener('click', () => {
    likes++;
    likeCount.textContent = likes;
    
    // Efeito simples de clique no botão
    likeBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 100);
});


// --- Sistema de Comentários ---
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

commentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar ao enviar o formulário

    // Pega os valores digitados
    const nameInput = document.getElementById('userName');
    const textInput = document.getElementById('commentText');

    // Cria a estrutura do novo comentário na tela
    const commentCard = document.createElement('div');
    commentCard.classList.add('comment-card');

    commentCard.innerHTML = `
        <strong>👤 ${nameInput.value}</strong>
        <p>${textInput.value}</p>
    `;

    // Adiciona o comentário no topo da lista de comentários
    commentsList.prepend(commentCard);

    // Limpa o formulário para o próximo comentário
    nameInput.value = '';
    textInput.value = '';
});