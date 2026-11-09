// 1. Mapeamento dos elementos principais da tela
const btnPublish = document.getElementById('btn-publish');
const postInput = document.getElementById('post-input');
const feedContainer = document.getElementById('feed-container');

// 2. Função responsável por criar e publicar um novo post
function criarPublicacao() {
    const textoDoPost = postInput.value.trim();

    // Validação simples: impede publicações em branco
    if (textoDoPost === "") {
        alert("Por favor, digite algo antes de publicar!");
        return;
    }

    // Criando a estrutura do elemento <article> via JS
    const novoPost = document.createElement('article');
    novoPost.classList.add('post-card');

    // Estrutura HTML interna idêntica à do projeto original
    novoPost.innerHTML = `
        <div class="post-header">
            <div class="user">
                <div class="avatar">U</div>
                <div class="user-info">
                    <strong>Seu Nome</strong>
                    <span>agora mesmo</span>
                </div>
            </div>
        </div>
        <div class="post-text">
            <p>${textoDoPost}</p>
        </div>
        <img src="https://picsum.photos" alt="Imagem gerada aleatoriamente">
        <div class="post-actions">
            <button type="button" class="btn-like">Curtir</button>
            <button type="button" class="btn-comment">Comentar</button>
        </div>
    `;

    // Insere o novo post no topo do feed (antes do primeiro filho existente)
    feedContainer.insertBefore(novoPost, feedContainer.firstChild);

    // Limpa o campo de texto após a publicação bem-sucedida
    postInput.value = "";
}

// 3. Ouvinte de evento para o botão de Publicar
btnPublish.addEventListener('click', criarPublicacao);

// 4. Delegação de eventos para os botões de Curtir e Comentar
// Garante que tanto os posts antigos quanto os novos criados dinamicamente funcionem
feedContainer.addEventListener('click', function(event) {
    
    // Interação de Curtir
    if (event.target.classList.contains('btn-like') || event.target.textContent === 'Curtir') {
        const botaoCurtir = event.target;
        
        // Alterna o estado visual e o texto do botão
        if (botaoCurtir.classList.contains('btn-liked')) {
            botaoCurtir.classList.remove('btn-liked');
            botaoCurtir.textContent = 'Curtir';
        } else {
            botaoCurtir.classList.add('btn-liked');
            botaoCurtir.textContent = 'Curtido ✓';
        }
    }

    // Interação de Comentar
    if (event.target.classList.contains('btn-comment') || event.target.textContent === 'Comentar') {
        const comentario = prompt("Digite o seu comentário:");
        if (comentario && comentario.trim() !== "") {
            alert(`Comentário enviado com sucesso: "${comentario}"`);
        }
    }
});
