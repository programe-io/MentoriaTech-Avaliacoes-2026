const btnPublicar = document.getElementById('btnPublicar');
const postInput = document.getElementById('postInput');
const feedContainer = document.getElementById('feedContainer');

btnPublicar.addEventListener('click', function() {
    const textoPost = postInput.value.trim();
    
    if (textoPost === '') {
        alert('Escreva alguma coisa antes de publicar!');
        return;
    }

    // Criar o novo card de postagem dinamicamente
    const novoCard = document.createElement('div');
    novoCard.classList.add('feed-card');
    
    novoCard.innerHTML = `
        <div class="feed-header">
            <div class="avatar">M</div>
            <div class="feed-user-details">
                <strong>Maria</strong>
                <span class="time">Agora mesmo</span>
            </div>
        </div>
        <p class="feed-text">${textoPost}</p>
        <div class="feed-actions">
            <button class="action-btn">Curtir</button>
            <button class="action-btn">Comentar</button>
        </div>
    `;

    // Adicionar o post no topo do feed
    feedContainer.prepend(novoCard);

    // Limpar a caixa de texto
    postInput.value = '';
});