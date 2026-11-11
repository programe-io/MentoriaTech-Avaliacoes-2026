// Dados iniciais simulando posts vindos de um banco de dados
const initialPosts = [
    {
        user: "Crypto Analista",
        handle: "@crypto_boss",
        time: "Há 2 horas",
        content: "O Bitcoin acaba de romper uma resistência importante! Se o volume se mantiver, poderemos ver uma nova máxima histórica em breve. Fiquem de olho no gráfico diário. 🚀📈",
        tags: "#Bitcoin #Cripto #Trading",
        likes: 124,
        img: "https://i.pravatar.cc/150?img=12"
    },
    {
        user: "Web3 Developer",
        handle: "@dev_web3",
        time: "Há 5 horas",
        content: "Acabamos de lançar a atualização do nosso Smart Contract na rede Ethereum. Taxas de gás reduzidas em 40%. A escalabilidade está chegando!",
        tags: "#Ethereum #DeFi #SmartContracts",
        likes: 89,
        img: "https://i.pravatar.cc/150?img=33"
    }
];

const postsContainer = document.getElementById('postsContainer');
const postInput = document.getElementById('postInput');
const postBtn = document.getElementById('postBtn');

// Função para criar o HTML de um post
function createPostHTML(post) {
    return `
        <div class="post">
            <div class="post-header">
                <img src="${post.img}" alt="Avatar">
                <div>
                    <div class="post-user">${post.user} <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: normal;">${post.handle}</span></div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-tags">${post.tags}</div>
            <div class="post-footer">
                <button class="action-btn like-btn">
                    <i class="fa-solid fa-heart"></i> <span class="like-count">${post.likes}</span>
                </button>
                <button class="action-btn">
                    <i class="fa-solid fa-comment"></i> Comentar
                </button>
                <button class="action-btn">
                    <i class="fa-solid fa-retweet"></i> Repostar
                </button>
            </div>
        </div>
    `;
}

// Renderiza os posts iniciais na tela
function renderPosts() {
    postsContainer.innerHTML = '';
    initialPosts.forEach(post => {
        postsContainer.innerHTML += createPostHTML(post);
    });
    attachLikeEvents();
}

// Evento para publicar um novo post
postBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    
    if (content !== "") {
        // Cria o objeto do novo post
        const newPost = {
            user: "Satoshi_BR",
            handle: "@satoshi_br",
            time: "Agora mesmo",
            content: content,
            tags: "#Cripto",
            likes: 0,
            img: "https://i.pravatar.cc/150?img=11" // Mesma imagem do usuário logado no Header
        };

        // Adiciona no início da lista (array)
        initialPosts.unshift(newPost);
        
        // Atualiza a tela
        renderPosts();
        
        // Limpa o campo de texto
        postInput.value = '';
    } else {
        alert("Escreva algo antes de publicar!");
    }
});

// Lógica para o botão de curtir (Like)
function attachLikeEvents() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('.like-count');
            let count = parseInt(countSpan.textContent);

            // Alterna a classe 'liked' e atualiza o número
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                count--;
            } else {
                this.classList.add('liked');
                count++;
            }
            countSpan.textContent = count;
        });
    });
}

// Inicia a aplicação renderizando a lista
renderPosts();