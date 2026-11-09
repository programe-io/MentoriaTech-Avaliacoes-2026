// 1. Seleção dos elementos da interface
const botaoPublicar = document.querySelector('.new-post-card button');
const areaTexto = document.querySelector('.new-post-card span');
const containerFeed = document.querySelector('main');

// 2. Função responsável por criar e adicionar uma nova postagem
function criarNovaPublicacao() {
    // Abre uma caixa para o usuário digitar o texto da nova postagem
    const textoDoUsuario = prompt("O que você deseja publicar no seu feed?");
    
    // Validação: impede a publicação se o usuário não digitar nada ou cancelar
    if (!textoDoUsuario || textoDoUsuario.trim() === "") {
        alert("A publicação não pode estar vazia!");
        return;
    }

    // 3. Criação da estrutura semântica via JavaScript (reutilizando a lógica do HTML)
    const novoArticle = document.createElement('article');
    novoArticle.classList.add('post-card');

    // Monta o conteúdo interno exatamente igual ao modelo estruturado na aula
    novoArticle.innerHTML = `
        <div class="post-header">
            <div class="user">
                <div class="avatar">U</div>
                <div class="user-info">
                    <strong>Seu Nome</strong>
                    <span>Agora mesmo</span>
                </div>
            </div>
        </div>
        
        <div class="post-text">
            <p>${textoDoUsuario}</p>
        </div>

        <div class="post-image">
            <img src="https://unsplash.com" alt="Imagem abstrata colorida de nova publicação">
        </div>

        <div class="post-actions">
            <button class="btn-curtir">Curtir</button>
            <button>Comentar</button>
        </div>
    `;

    // 4. Insere a nova postagem no feed (logo abaixo da área de nova publicação)
    const primeiroCardDoFeed = containerFeed.children[1]; 
    containerFeed.insertBefore(novoArticle, primeiroCardDoFeed);

    // 5. Adiciona o evento de curtir especificamente para este novo botão criado
    adicionarEventoCurtir(novoArticle.querySelector('.btn-curtir'));
}

// Função para gerenciar a lógica de curtir/descurtir
function adicionarEventoCurtir(botao) {
    botao.addEventListener('click', function() {
        // Altera visualmente o botão simulando a ação de curtir
        if (botao.style.backgroundColor === 'rgb(40, 167, 69)') { // Cor verde
            botao.style.backgroundColor = '#007bff'; // Volta para o azul padrão
            botao.textContent = 'Curtir';
        } else {
            botao.style.backgroundColor = '#28a745'; // Fica verde ao curtir
            botao.textContent = '✓ Curtido';
        }
    });
}

// 6. Vincula as funções aos eventos de clique da página inicial
botaoPublicar.addEventListener('click', criarNovaPublicacao);

// Aplica a função de curtir em todos os botões já existentes na página carregada
document.querySelectorAll('.post-actions button:nth-child(1)').forEach(botao => {
    adicionarEventoCurtir(botao);
});
