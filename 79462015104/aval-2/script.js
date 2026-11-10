// Seleção de elementos principais
const publishBtn = document.getElementById('publish-btn');
const postText = document.getElementById('post-text');
const postImageInput = document.getElementById('post-image-input');
const postsFeed = document.getElementById('posts-feed');

// Função para criar nova publicação dinamicamente
publishBtn.addEventListener('click', () => {
    const textValue = postText.value.trim();
    const imageFile = postImageInput.files[0];

    if (textValue === "" && !imageFile) {
        alert("Escreva algo ou adicione uma imagem para publicar!");
        return;
    }

    // Criar URL temporária caso tenha imagem anexada
    let imageUrl = "";
    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    }

    // Criar elemento da nova postagem
    const newPost = document.createElement('article');
    newPost.classList.add('post-card');
    
    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar do usuário">
            <div class="post-user-info">
                <h4>Ana Souza</h4>
                <span>Agora mesmo</span>
            </div>
        </div>
        <div class="post-content">
            <p>${textValue}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="Imagem da publicação" class="post-img">` : ''}
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn"><i class="fa-regular fa-thumbs-up"></i> Curtir (<span class="like-count">0</span>)</button>
            <button class="action-btn"><i class="fa-regular fa-comment"></i> Comentar</button>
            <button class="action-btn"><i class="fa-solid fa-share"></i> Compartilhar</button>
        </div>
    `;

    // Inserir o post no topo do feed
    postsFeed.prepend(newPost);

    // Limpar os campos após a postagem
    postText.value = "";
    postImageInput.value = "";

    // Adicionar escuta de evento de curtida ao novo botão criado
    attachLikeEvent(newPost.querySelector('.like-btn'));
});

// Função para gerenciar cliques no botão de Curtir (delega para todos os posts)
function attachLikeEvent(btn) {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const countSpan = btn.querySelector('.like-count');
        let count = parseInt(countSpan.textContent);

        if (btn.classList.contains('liked')) {
            btn.classList.remove('liked');
            icon.classList.replace('fa-solid', 'fa-regular');
            countSpan.textContent = count - 1;
        } else {
            btn.classList.add('liked');
            icon.classList.replace('fa-regular', 'fa-solid');
            countSpan.textContent = count + 1;
        }
    });
}

// Inicializar eventos de curtir nos posts estáticos iniciais
document.querySelectorAll('.like-btn').forEach(btn => {
    attachLikeEvent(btn);
});