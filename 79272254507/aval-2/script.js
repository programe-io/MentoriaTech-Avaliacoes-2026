// 1. Mapeamento e Seleção dos elementos do HTML que vamos interagir
const publishBtn = document.getElementById('publish-btn');
const postInput = document.getElementById('post-input');
const feedContainer = document.getElementById('feed-container');

// 2. Evento Ouvinte (Listener) monitorando o clique no botão "Publicar"
publishBtn.addEventListener('click', function() {
    // Captura o texto digitado e remove espaços em branco extras nas pontas
    const postTextContent = postInput.value.trim();

    // Validação básica: se o usuário não digitou nada, avisa e interrompe a função
    if (postTextContent === "") {
        alert("Por favor, escreva algo antes de publicar!");
        return; 
    }

    // 3. Manipulação do DOM: Construção dinâmica do novo card de postagem
    const newPostCard = document.createElement('article');
    newPostCard.classList.add('post-card');

    // Injeção da estrutura HTML necessária usando Template Literals (Crase)
    newPostCard.innerHTML = `
        <header class="post-header">
            <div class="user">
                <div class="avatar" style="background-color: #1877f2; color: #fff;">U</div>
                <div class="user-info">
                    <strong>Seu Nome</strong>
                    <span>agora mesmo</span>
                </div>
            </div>
        </header>
        
        <p class="post-text">${postTextContent}</p>
        
        <div class="post-actions">
            <button type="button" class="like-btn">Curtir</button>
            <button type="button">Comentar</button>
        </div>
    `;

    // 4. Inserção no Feed: Adiciona a nova publicação no topo do feedContainer
    feedContainer.prepend(newPostCard);

    // 5. Reset: Limpa a caixa de texto para a próxima postagem
    postInput.value = "";
});

// 6. Funcionalidade Bônus: Evento para fazer o botão "Curtir" funcionar dinamicamente
// Usamos delegação de eventos para garantir que posts novos também possam ser curtidos
feedContainer.addEventListener('click', function(event) {
    // Verifica se o elemento clicado possui a classe "like-btn"
    if (event.target.classList.contains('like-btn')) {
        const targetButton = event.target;
        
        // Alterna (liga/desliga) a classe CSS de curtido
        targetButton.classList.toggle('liked');
        
        // Altera o texto de feedback visual
        if (targetButton.classList.contains('liked')) {
            targetButton.textContent = '👍 Curtido';
        } else {
            targetButton.textContent = 'Curtir';
        }
    }
});
