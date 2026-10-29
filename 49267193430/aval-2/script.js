// Lista inicial de posts simulados
let posts = [
    {
        id: 1,
        author: "Ana Souza",
        initials: "AS",
        time: "Há 5 minutos",
        content: "Criando meu primeiro mini feed social com HTML, CSS e JavaScript puro! Muito legal o resultado. 🚀",
        likes: 3,
        liked: false
    },
    {
        id: 2,
        author: "Carlos Silva",
        initials: "CS",
        time: "Há 2 horas",
        content: "Alguém recomendando algum framework moderno para continuar os estudos?",
        likes: 7,
        liked: true
    }
];

const postInput = document.getElementById('postInput');
const publishBtn = document.getElementById('publishBtn');
const postsList = document.getElementById('postsList');

// Função para renderizar os posts na tela
function renderPosts() {
    postsList.innerHTML = '';

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">${post.initials}</div>
                <div class="post-user-info">
                    <h4>${post.author}</h4>
                    <span>${post.time}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${escapeHTML(post.content)}</p>
            </div>
            <div class="post-footer">
                <button class="like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <i class="${post.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i> 
                    <span>${post.likes}</span> Curtidas
                </button>
            </div>
        `;

        postsList.appendChild(postCard);
    });
}

// Função para publicar um novo post
publishBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    
    if (content === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const newPost = {
        id: Date.now(),
        author: "Você (Usuário)",
        initials: "EU",
        time: "Agora mesmo",
        content: content,
        likes: 0,
        liked: false
    };

    posts.unshift(newPost); // Adiciona no início do array
    postInput.value = ""; // Limpa o campo
    renderPosts();
});

// Função para curtir / descurtir um post
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        if (post.liked) {
            post.likes -= 1;
            post.liked = false;
        } else {
            post.likes += 1;
            post.liked = true;
        }
        renderPosts();
    }
}

// Segurança básica contra injeção de HTML no input
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Inicializa a renderização ao carregar a página
document.addEventListener('DOMContentLoaded', renderPosts);